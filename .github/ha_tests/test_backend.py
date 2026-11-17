"""Storage, websocket API, services and printing inside a real Home Assistant."""

from __future__ import annotations

import base64
from io import BytesIO
from unittest.mock import patch

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import device_registry as dr
from PIL import Image
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_mock_service,
)

from custom_components.escpos_designer.const import DOMAIN
from custom_components.escpos_designer.services import bind_todo_list
from custom_components.escpos_designer.storage import MAX_RECENT
from custom_components.escpos_designer.templates import (
    TemplateError,
    localize,
    normalize_template,
)

TEXT_DESIGN = {
    "elements": [
        {"type": "text", "runs": [{"text": "Hello {{ vars.who }}", "size": 30}], "align": "center"}
    ]
}


def template(name="Greeting", **extra):
    return {
        "name": name,
        "document": TEXT_DESIGN,
        "variables": [{"key": "who", "default": "world"}],
        **extra,
    }


@pytest.fixture
async def designer(hass: HomeAssistant):
    """The designer set up on top of a pretend printer integration."""
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


@pytest.fixture
def printer(hass: HomeAssistant):
    """A configured printer with a device, plus the recorded ``print_image`` calls."""
    entry = MockConfigEntry(domain="escpos_printer", title="Kitchen printer")
    entry.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={("escpos_printer", "kitchen")},
        name="Kitchen printer",
    )
    calls = async_mock_service(hass, "escpos_printer", "print_image")
    with patch(f"custom_components.{DOMAIN}.dependency.async_get_integration"):
        yield device, calls


@pytest.fixture
async def client(hass, hass_ws_client, designer):
    return await hass_ws_client(hass)


async def call(client, command, **payload):
    await client.send_json_auto_id({"type": f"{DOMAIN}/{command}", **payload})
    return await client.receive_json()


def png_size(encoded: str) -> tuple[int, int]:
    return Image.open(BytesIO(base64.b64decode(encoded))).size


class TestTemplates:
    def test_localize(self):
        names = {"en": "Shopping", "de": "Einkauf"}
        assert localize(names, "de") == "Einkauf"
        assert localize(names, "de-AT") == "Einkauf"
        assert localize(names, "fr") == "Shopping"
        assert localize({"fr": "Courses"}, "de") == "Courses"
        assert localize("plain", "de") == "plain"
        assert localize({}, "de") == ""

    def test_invalid_records(self):
        with pytest.raises(TemplateError):
            normalize_template("nope")
        with pytest.raises(TemplateError, match="name"):
            normalize_template({"document": {}})
        with pytest.raises(TemplateError, match="document"):
            normalize_template({"name": "x", "document": {"elements": [{"type": "x"}]}})
        with pytest.raises(TemplateError, match="key"):
            normalize_template({"name": "x", "document": {}, "variables": [{"key": "Bad Key"}]})

    def test_bind_todo_list(self):
        document = normalize_template(
            {
                "name": "x",
                "document": {"elements": [{"type": "list", "source": {"kind": "todo"}}]},
            }
        )["document"]
        bound = bind_todo_list(document, "todo.groceries", True)
        assert bound["elements"][0]["source"]["entity_id"] == "todo.groceries"
        assert bound["elements"][0]["source"]["include_completed"] is True
        assert document["elements"][0]["source"]["entity_id"] == ""  # the original is untouched

    def test_bind_todo_list_needs_a_todo_list(self):
        with pytest.raises(ServiceValidationError):
            bind_todo_list(normalize_template(template())["document"], "todo.x", False)


class TestSetup:
    async def test_builtin_gallery_is_loaded(self, hass, designer):
        assert "builtin:shopping_list" in designer.runtime_data.builtin

    async def test_services_are_registered_once(self, hass, designer):
        assert hass.services.has_service(DOMAIN, "print_template")
        assert hass.services.has_service(DOMAIN, "print_todo_list")


class TestWebsocket:
    async def test_status(self, client, printer):
        reply = await call(client, "status")
        result = reply["result"]
        assert result["printer_integration"]["printer_count"] == 1
        assert result["printers"][0]["name"] == "Kitchen printer"
        assert {font["id"] for font in result["fonts"]} >= {"sans", "script", "handwriting"}
        assert "markdown" in result["element_types"]
        assert result["version"]

    async def test_builtin_names_follow_the_requested_language(self, client):
        def name(library):
            return next(
                c["name"] for c in library["templates"] if c["id"] == "builtin:shopping_list"
            )

        assert name((await call(client, "library", language="de"))["result"]) == "Einkaufsliste"
        assert name((await call(client, "library", language="en"))["result"]) == "Shopping list"
        assert name((await call(client, "library", language="fr"))["result"]) == "Shopping list"

    async def test_builtin_templates_come_in_the_requested_language(self, client):
        german = (
            await call(
                client, "get_template", template_id="builtin:best_before_label", language="de"
            )
        )["result"]
        english = (
            await call(
                client, "get_template", template_id="builtin:best_before_label", language="en"
            )
        )["result"]
        assert german["variables"][0]["default"] == "Tomatensauce"
        assert english["variables"][0]["default"] == "Tomato sauce"
        assert german["variables"][0]["label"] == "Produkt"
        assert german["document"] != english["document"]
        assert german["variables"][1]["default"] == 7  # plain defaults stay as they are

    async def test_thumbnails_follow_the_language(self, client):
        ids = ["builtin:best_before_label"]
        german = (await call(client, "thumbnails", template_ids=ids, language="de"))["result"]
        english = (await call(client, "thumbnails", template_ids=ids, language="en"))["result"]
        assert german != english

    async def test_library_save_get_delete(self, client):
        saved = (await call(client, "save_template", template=template()))["result"]
        assert saved["name"] == "Greeting" and not saved["builtin"]

        library = (await call(client, "library"))["result"]
        ids = [card["id"] for card in library["templates"]]
        assert saved["id"] in ids and "builtin:shopping_list" in ids
        assert library["recent"][0] == saved["id"]

        fetched = (await call(client, "get_template", template_id=saved["id"]))["result"]
        assert fetched["document"]["elements"][0]["type"] == "text"
        assert fetched["variables"][0]["label"] == "who"

        assert (await call(client, "delete_template", template_id=saved["id"]))["success"]
        gone = await call(client, "get_template", template_id=saved["id"])
        assert gone["error"]["code"] == "not_found"

    async def test_updating_keeps_the_id(self, client):
        first = (await call(client, "save_template", template=template()))["result"]
        second = (
            await call(
                client, "save_template", template=template("Renamed"), template_id=first["id"]
            )
        )["result"]
        assert second["id"] == first["id"] and second["name"] == "Renamed"

    async def test_saving_a_builtin_makes_a_copy(self, client):
        copy = (
            await call(
                client,
                "save_template",
                template=template("My list"),
                template_id="builtin:shopping_list",
            )
        )["result"]
        assert copy["id"] != "builtin:shopping_list" and not copy["builtin"]

    async def test_builtin_templates_cannot_be_deleted(self, client):
        reply = await call(client, "delete_template", template_id="builtin:shopping_list")
        assert reply["error"]["code"] == "not_found"

    async def test_invalid_template_is_reported(self, client):
        reply = await call(
            client,
            "save_template",
            template={"name": "x", "document": {"elements": [{"type": "x"}]}},
        )
        assert reply["error"]["code"] == "invalid_design"

    async def test_recent_list_is_capped(self, client):
        for number in range(MAX_RECENT + 3):
            await call(client, "save_template", template=template(f"T{number}"))
        library = (await call(client, "library"))["result"]
        assert len(library["recent"]) == MAX_RECENT

    async def test_favorites(self, client):
        assert (await call(client, "toggle_favorite", template_id="builtin:shopping_list"))[
            "result"
        ] == {"favorite": True}
        assert (await call(client, "library"))["result"]["favorites"] == ["builtin:shopping_list"]
        assert (await call(client, "toggle_favorite", template_id="builtin:shopping_list"))[
            "result"
        ] == {"favorite": False}
        assert (await call(client, "toggle_favorite", template_id="nope"))["error"][
            "code"
        ] == "not_found"

    async def test_preview_renders_templates_with_variables(self, client):
        plain = (
            await call(client, "preview", document=TEXT_DESIGN, variables={"who": "Sebastian"})
        )["result"]
        assert plain["width"] == 384 and plain["height"] > 20
        assert png_size(plain["image"]) == (plain["width"], plain["height"])
        assert plain["template_errors"] == []

    async def test_preview_reports_template_errors_inline(self, client):
        document = {"elements": [{"type": "text", "runs": [{"text": "{{ 1 / 0 }}"}]}]}
        result = (await call(client, "preview", document=document))["result"]
        assert result["template_errors"]

    async def test_preview_of_a_broken_design(self, client):
        reply = await call(client, "preview", document={"paper": {"width": 1}})
        assert reply["error"]["code"] == "invalid_design"

    async def test_preview_reads_todo_lists(self, hass, client):
        async def get_items(call: ServiceCall):
            return {
                "todo.shop": {
                    "items": [
                        {"summary": "Milk", "status": "needs_action"},
                        {"summary": "Eggs", "status": "completed"},
                    ]
                }
            }

        hass.services.async_register(
            "todo", "get_items", get_items, supports_response=SupportsResponse.ONLY
        )
        document = {
            "elements": [{"type": "list", "source": {"kind": "todo", "entity_id": "todo.shop"}}]
        }
        open_only = (await call(client, "preview", document=document))["result"]
        document["elements"][0]["source"]["include_completed"] = True
        with_done = (await call(client, "preview", document=document))["result"]
        assert with_done["height"] > open_only["height"]
        assert open_only["warnings"] == []

    async def test_missing_todo_list_is_a_warning_not_a_failure(self, client):
        document = {
            "elements": [{"type": "list", "source": {"kind": "todo", "entity_id": "todo.missing"}}]
        }
        result = (await call(client, "preview", document=document))["result"]
        assert any("todo.missing" in w["message"] for w in result["warnings"])

    async def test_thumbnails_are_cached(self, client, designer):
        first = (await call(client, "thumbnails", template_ids=["builtin:shopping_list", "nope"]))[
            "result"
        ]
        assert list(first) == ["builtin:shopping_list"]
        assert designer.runtime_data.thumbnails
        second = (await call(client, "thumbnails", template_ids=["builtin:shopping_list"]))[
            "result"
        ]
        assert second == first

    async def test_non_admins_are_refused_by_default(
        self, hass, hass_ws_client, designer, hass_read_only_access_token
    ):
        client = await hass_ws_client(hass, hass_read_only_access_token)
        reply = await call(client, "status")
        assert reply["error"]["code"] == "unauthorized"

    async def test_non_admins_can_be_allowed(
        self, hass, hass_ws_client, designer, hass_read_only_access_token
    ):
        hass.config_entries.async_update_entry(designer, options={"require_admin": False})
        await hass.async_block_till_done()
        client = await hass_ws_client(hass, hass_read_only_access_token)
        assert (await call(client, "status"))["success"]

    async def test_unloaded_designer_answers_politely(self, hass, hass_ws_client, designer):
        await hass.config_entries.async_unload(designer.entry_id)
        client = await hass_ws_client(hass)
        assert (await call(client, "status"))["error"]["code"] == "not_loaded"


class TestPrinting:
    async def test_print_sends_the_image_to_the_printer(self, client, printer):
        device, calls = printer
        reply = await call(
            client,
            "print",
            document=TEXT_DESIGN,
            variables={"who": "you"},
            printer=device.id,
            copies=2,
        )
        assert reply["success"], reply
        assert len(calls) == 2
        data = calls[0].data
        assert data["device_id"] == [device.id]
        assert data["image"].startswith("data:image/png;base64,")
        assert (data["cut"], data["feed"], data["dither"]) == ("partial", 2, "none")
        sent = Image.open(BytesIO(base64.b64decode(data["image"].split(",", 1)[1])))
        assert sent.width == 384 and sent.mode == "1"

    async def test_single_printer_is_used_automatically(self, client, printer):
        _device, calls = printer
        assert (await call(client, "print", document=TEXT_DESIGN))["success"]
        assert len(calls) == 1

    async def test_printing_touches_the_recent_list(self, client, printer):
        saved = (await call(client, "save_template", template=template("A")))["result"]
        await call(client, "save_template", template=template("B"))
        await call(client, "print", document=TEXT_DESIGN, template_id=saved["id"])
        assert (await call(client, "library"))["result"]["recent"][0] == saved["id"]

    async def test_unknown_printer(self, client, printer):
        reply = await call(client, "print", document=TEXT_DESIGN, printer="nope")
        assert reply["error"]["code"] == "failed" and "unknown printer" in reply["error"]["message"]

    async def test_no_printer_integration(self, client):
        reply = await call(client, "print", document=TEXT_DESIGN)
        assert reply["error"]["code"] == "failed"
        assert "isn't available" in reply["error"]["message"]

    async def test_two_printers_need_a_choice(self, hass, client, printer):
        entry = MockConfigEntry(domain="escpos_printer", title="Office")
        entry.add_to_hass(hass)
        dr.async_get(hass).async_get_or_create(
            config_entry_id=entry.entry_id,
            identifiers={("escpos_printer", "office")},
            name="Office",
        )
        reply = await call(client, "print", document=TEXT_DESIGN)
        assert "select a printer" in reply["error"]["message"]

    async def test_template_errors_stop_the_print(self, client, printer):
        _device, calls = printer
        document = {"elements": [{"type": "text", "runs": [{"text": "{{ 1 / 0 }}"}]}]}
        reply = await call(client, "print", document=document)
        assert reply["error"]["code"] == "failed" and not calls


class TestServices:
    async def test_print_template_service_uses_defaults_and_overrides(
        self, hass, designer, printer
    ):
        _device, calls = printer
        saved, _ = designer.runtime_data.storage.save(template())
        await hass.services.async_call(
            DOMAIN,
            "print_template",
            {"template_id": saved, "variables": {"who": "me"}},
            blocking=True,
        )
        assert len(calls) == 1

    async def test_unknown_template(self, hass, designer, printer):
        with pytest.raises(ServiceValidationError, match="no template"):
            await hass.services.async_call(
                DOMAIN, "print_template", {"template_id": "nope"}, blocking=True
            )

    async def test_print_todo_list_service(self, hass, designer, printer):
        _device, calls = printer

        async def get_items(call: ServiceCall):
            return {"todo.shop": {"items": [{"summary": "Milk", "status": "needs_action"}]}}

        hass.services.async_register(
            "todo", "get_items", get_items, supports_response=SupportsResponse.ONLY
        )
        await hass.services.async_call(
            DOMAIN, "print_todo_list", {"entity_id": "todo.shop", "copies": 3}, blocking=True
        )
        assert len(calls) == 3

    async def test_print_todo_list_needs_a_template_with_a_list(self, hass, designer, printer):
        saved, _ = designer.runtime_data.storage.save(template())
        with pytest.raises(ServiceValidationError, match="no todo list"):
            await hass.services.async_call(
                DOMAIN,
                "print_todo_list",
                {"entity_id": "todo.shop", "template_id": saved},
                blocking=True,
            )

    async def test_service_failure_without_printer_integration(self, hass, designer):
        with pytest.raises(HomeAssistantError, match="isn't available"):
            await hass.services.async_call(
                DOMAIN, "print_todo_list", {"entity_id": "todo.shop"}, blocking=True
            )


class TestStorage:
    async def test_templates_survive_a_reload(self, hass, designer):
        saved, _ = designer.runtime_data.storage.save(template("Keep me"))
        assert await hass.config_entries.async_reload(designer.entry_id)
        assert designer.runtime_data.storage.get(saved)["name"] == "Keep me"

    async def test_deleting_cleans_the_lists(self, designer):
        storage = designer.runtime_data.storage
        saved, _ = storage.save(template())
        storage.toggle_favorite(saved)
        assert storage.delete(saved) and not storage.delete(saved)
        assert saved not in storage.recent and saved not in storage.favorites


class TestPanel:
    async def test_panel_is_registered_and_removed(self, hass, designer):
        panels = hass.data["frontend_panels"]
        panel = panels["escpos-designer"]
        assert panel.sidebar_title == "Printer Designer"
        assert panel.sidebar_icon == "mdi:printer-pos-edit"
        assert panel.require_admin is True
        assert panel.config["_panel_custom"]["name"] == "escpos-designer-panel"
        custom = panel.config["_panel_custom"]
        module = custom.get("module_url") or custom.get("js_url")
        assert module.startswith("/escpos_designer_static/escpos-designer-panel.js?v=")
        await hass.config_entries.async_unload(designer.entry_id)
        assert "escpos-designer" not in panels

    async def test_options_control_sidebar_and_access(self, hass, designer):
        hass.config_entries.async_update_entry(
            designer, options={"show_in_sidebar": False, "require_admin": False}
        )
        await hass.async_block_till_done()
        panel = hass.data["frontend_panels"]["escpos-designer"]
        assert panel.sidebar_title is None and panel.sidebar_icon is None
        assert panel.require_admin is False

    def test_the_bundle_ships_with_the_integration(self):
        from custom_components.escpos_designer.panel import FRONTEND_DIR, PANEL_MODULE  # noqa: PLC0415

        bundle = FRONTEND_DIR / PANEL_MODULE
        assert bundle.is_file() and bundle.stat().st_size > 100_000


class TestDocumentation:
    def test_the_format_guide_mentions_every_element_type_and_option(self):
        from pathlib import Path  # noqa: PLC0415

        from custom_components.escpos_designer.designer.schema import (  # noqa: PLC0415
            ELEMENT_TYPES,
            FRAME_STYLES,
        )

        guide = (Path(__file__).resolve().parents[2] / "docs/document-format.md").read_text()
        for element_type in ELEMENT_TYPES:
            assert f"`{element_type}`" in guide, element_type
        for style in FRAME_STYLES:
            assert f"`{style}`" in guide, style

    def test_the_template_guide_lists_every_built_in_template(self):
        from pathlib import Path  # noqa: PLC0415

        from custom_components.escpos_designer.templates import load_builtin_templates  # noqa: PLC0415

        guide = (Path(__file__).resolve().parents[2] / "docs/templates.md").read_text()
        for template_id in load_builtin_templates():
            assert f"`{template_id}`" in guide, template_id
