"""The websocket commands the designer panel talks to.

Every command checks that the designer is set up and that the user may use it
(administrators only unless the option allows everyone), then delegates to the
runtime objects. Designs that fail validation answer with ``invalid_design``.
"""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError

from .const import (
    ADD_PRINTER_URL,
    DOMAIN,
    PRINTER_HACS_URL,
    PRINTER_REPOSITORY_URL,
)
from .dependency import async_get_printer_integration_status
from .designer import DocumentError, font_catalog
from .designer.schema import ELEMENT_TYPES
from .printers import DEFAULT_WIDTH, list_printers
from .printing import async_print_design
from .runtime import DesignerData, require_admin
from .templates import TemplateError, document_for, is_builtin, variable_defaults

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry

type Handler = Callable[
    [HomeAssistant, websocket_api.ActiveConnection, dict[str, Any], DesignerData],
    Awaitable[None],
]

PAPER_PRESETS = (
    {"id": "58mm", "width": 384, "height": None},
    {"id": "80mm", "width": 576, "height": None},
    {"id": "label_30x14", "width": 240, "height": 112},
    {"id": "label_40x30", "width": 320, "height": 240},
    {"id": "label_50x30", "width": 400, "height": 240},
    {"id": "label_50x80", "width": 400, "height": 640},
)
_VARIABLES = vol.Optional("variables", default=dict)


def _command(
    command: str, schema: dict[Any, Any] | None = None
) -> Callable[[Handler], Callable[..., Awaitable[None]]]:
    """Register ``handler`` as ``escpos_designer/<command>`` with access checks."""

    def decorator(handler: Handler) -> Callable[..., Awaitable[None]]:
        @websocket_api.websocket_command(
            {
                vol.Required("type"): f"{DOMAIN}/{command}",
                vol.Optional("language"): str,
                **(schema or {}),
            }
        )
        @websocket_api.async_response
        @wraps(handler)
        async def wrapper(
            hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
        ) -> None:
            entry = _loaded_entry(hass)
            if entry is None:
                connection.send_error(msg["id"], "not_loaded", "The designer is not set up.")
                return
            if require_admin(entry) and not connection.user.is_admin:
                connection.send_error(msg["id"], "unauthorized", "Administrator access required.")
                return
            try:
                await handler(hass, connection, msg, entry.runtime_data)
            except (DocumentError, TemplateError) as err:
                connection.send_error(msg["id"], "invalid_design", str(err))
            except HomeAssistantError as err:
                connection.send_error(msg["id"], "failed", str(err))

        return wrapper

    return decorator


def _loaded_entry(hass: HomeAssistant) -> ConfigEntry[DesignerData] | None:
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        return entry
    return None


def _language(hass: HomeAssistant, msg: dict[str, Any]) -> str:
    return str(msg.get("language") or hass.config.language)


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register every command (called once from ``async_setup``)."""
    for command in (
        ws_status,
        ws_library,
        ws_get_template,
        ws_save_template,
        ws_delete_template,
        ws_toggle_favorite,
        ws_preview,
        ws_thumbnails,
        ws_print,
    ):
        websocket_api.async_register_command(hass, command)


@_command("status")
async def ws_status(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Versions, the printer integration's state, printers, fonts and paper presets."""
    from homeassistant.loader import async_get_integration  # noqa: PLC0415

    status = await async_get_printer_integration_status(hass)
    integration = await async_get_integration(hass, DOMAIN)
    connection.send_result(
        msg["id"],
        {
            "version": str(integration.version),
            "language": _language(hass, msg),
            "printer_integration": {
                "installed": status.installed,
                "printer_count": status.printer_count,
                "hacs_url": PRINTER_HACS_URL,
                "repository_url": PRINTER_REPOSITORY_URL,
                "add_printer_url": ADD_PRINTER_URL,
            },
            "printers": list_printers(hass),
            "fonts": font_catalog(),
            "element_types": list(ELEMENT_TYPES),
            "paper_presets": list(PAPER_PRESETS),
            "default_width": DEFAULT_WIDTH,
        },
    )


@_command("library")
async def ws_library(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """All templates (cards only) with the recent and favorite lists."""
    connection.send_result(msg["id"], data.library(_language(hass, msg)))


@_command("get_template", {vol.Required("template_id"): str})
async def ws_get_template(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """One template with its design and variables."""
    template = data.describe(msg["template_id"], _language(hass, msg))
    if template is None:
        connection.send_error(msg["id"], "not_found", "Template not found.")
        return
    connection.send_result(msg["id"], template)


@_command("save_template", {vol.Required("template"): dict, vol.Optional("template_id"): str})
async def ws_save_template(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Store a template. Saving a built-in one creates a copy of it."""
    template_id, _record = data.storage.save(msg["template"], msg.get("template_id"))
    data.thumbnails.clear()
    description = data.describe(template_id, _language(hass, msg))
    connection.send_result(msg["id"], description)


@_command("delete_template", {vol.Required("template_id"): str})
async def ws_delete_template(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Delete one of the user's templates; built-in ones can't be deleted."""
    template_id = msg["template_id"]
    if is_builtin(template_id) or not data.storage.delete(template_id):
        connection.send_error(msg["id"], "not_found", "Template not found.")
        return
    connection.send_result(msg["id"], {"deleted": template_id})


@_command("toggle_favorite", {vol.Required("template_id"): str})
async def ws_toggle_favorite(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Star or un-star a template."""
    if data.find(msg["template_id"]) is None:
        connection.send_error(msg["id"], "not_found", "Template not found.")
        return
    connection.send_result(
        msg["id"], {"favorite": data.storage.toggle_favorite(msg["template_id"])}
    )


@_command("preview", {vol.Required("document"): dict, _VARIABLES: dict})
async def ws_preview(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Render a design exactly as it would print and return it as a PNG."""
    output = await data.renderer.async_render(
        msg["document"], msg["variables"], language=_language(hass, msg)
    )
    import base64  # noqa: PLC0415

    connection.send_result(
        msg["id"],
        {
            "image": base64.b64encode(output.to_png()).decode("ascii"),
            "width": output.image.width,
            "height": output.image.height,
            "warnings": output.warnings,
            "template_errors": output.template_errors,
        },
    )


@_command("thumbnails", {vol.Required("template_ids"): [str]})
async def ws_thumbnails(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Small previews for the gallery cards (cached until a template changes)."""
    import base64  # noqa: PLC0415

    language = _language(hass, msg)
    result: dict[str, str] = {}
    for template_id in msg["template_ids"][:60]:
        record = data.find(template_id)
        if record is None:
            continue
        key = (template_id, record.get("updated_at") or "", language)
        if key not in data.thumbnails:
            output = await data.renderer.async_render(
                document_for(record, language),
                variable_defaults(record, language),
                language=language,
            )
            data.thumbnails[key] = base64.b64encode(output.to_png()).decode("ascii")
        result[template_id] = data.thumbnails[key]
    connection.send_result(msg["id"], result)


@_command(
    "print",
    {
        vol.Required("document"): dict,
        _VARIABLES: dict,
        vol.Optional("printer"): str,
        vol.Optional("copies", default=1): vol.All(int, vol.Range(min=1, max=10)),
        vol.Optional("template_id"): str,
    },
)
async def ws_print(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    data: DesignerData,
) -> None:
    """Print a design on the chosen printer."""
    report = await async_print_design(
        hass,
        data.renderer,
        msg["document"],
        variables=msg["variables"],
        device_ids=[msg["printer"]] if msg.get("printer") else None,
        copies=msg["copies"],
    )
    if (template_id := msg.get("template_id")) and data.find(template_id):
        data.storage.touch(template_id)
    connection.send_result(msg["id"], report)
