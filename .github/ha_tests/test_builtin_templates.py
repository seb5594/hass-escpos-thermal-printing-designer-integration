"""Every template that ships with the integration must load and render cleanly."""

import json

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

from homeassistant.core import SupportsResponse

from custom_components.escpos_designer.rendering import DesignRenderer
from custom_components.escpos_designer.templates import (
    BUILTIN_DIR,
    CATEGORIES,
    document_for,
    load_builtin_templates,
    variable_defaults,
)

TEMPLATES = load_builtin_templates()
LANGUAGES = ("en", "de")


@pytest.fixture(autouse=True)
def todo_lists(hass):
    """Pretend every to-do list holds a few items, one of them completed."""

    async def get_items(call):
        return {
            call.data["entity_id"]: {
                "items": [
                    {"summary": "Milk", "status": "needs_action", "description": "2 liters"},
                    {"summary": "Bread", "status": "needs_action"},
                    {"summary": "Coffee", "status": "completed"},
                ]
            }
        }

    hass.services.async_register(
        "todo", "get_items", get_items, supports_response=SupportsResponse.ONLY
    )


def test_the_gallery_is_not_empty_and_covers_the_main_uses():
    assert len(TEMPLATES) >= 15
    covered = {record["category"] for record in TEMPLATES.values()}
    assert {"shopping", "todo", "qr", "love", "label", "food", "receipt"} <= covered


@pytest.mark.parametrize("template_id", TEMPLATES)
def test_metadata_is_complete_and_translated(template_id):
    record = TEMPLATES[template_id]
    assert record["category"] in CATEGORIES
    for field in ("name", "description"):
        assert set(record[field]) >= {"en", "de"}, field
        assert all(text.strip() for text in record[field].values())
    assert record["tags"]
    for variable in record["variables"]:
        label = variable["label"]
        assert label and (isinstance(label, str) or set(label) >= {"en", "de"})


@pytest.mark.parametrize("template_id", TEMPLATES)
def test_every_variable_is_used_and_every_used_variable_exists(template_id):
    import re  # noqa: PLC0415

    record = TEMPLATES[template_id]
    declared = {variable["key"] for variable in record["variables"]}
    for language in LANGUAGES:
        text = json.dumps(document_for(record, language), ensure_ascii=False)
        used = set(re.findall(r"vars\.(\w+)", text))
        assert used == declared, (language, used ^ declared)


def test_file_names_match_the_ids():
    assert {f"builtin:{path.stem}" for path in BUILTIN_DIR.glob("*.json")} == set(TEMPLATES)


@pytest.mark.parametrize("language", LANGUAGES)
@pytest.mark.parametrize("template_id", TEMPLATES)
async def test_renders_cleanly_with_its_defaults(hass, template_id, language):
    record = TEMPLATES[template_id]
    document = document_for(record, language)
    result = await DesignRenderer(hass).async_render(
        document, variable_defaults(record, language), language=language
    )
    assert result.template_errors == []
    assert result.warnings == []
    assert result.image.mode == "1"
    assert result.image.width == document["paper"]["width"]
    if document["paper"]["height"]:
        assert result.image.height == document["paper"]["height"]
    assert result.image.histogram()[0] > 200  # something is printed


async def test_german_documents_differ_from_english_ones(hass):
    record = TEMPLATES["builtin:best_before_label"]
    english = await DesignRenderer(hass).async_render(
        document_for(record, "en"), variable_defaults(record, "en"), language="en"
    )
    german = await DesignRenderer(hass).async_render(
        document_for(record, "de"), variable_defaults(record, "de"), language="de"
    )
    assert english.image.tobytes() != german.image.tobytes()


async def test_todo_templates_print_the_items(hass):
    record = TEMPLATES["builtin:shopping_list"]
    with_items = await DesignRenderer(hass).async_render(
        record["document"], variable_defaults(record, "en")
    )
    empty = await DesignRenderer(hass).async_render(
        record["document"], {**variable_defaults(record, "en"), "list": ""}
    )
    assert with_items.image.height > empty.image.height
