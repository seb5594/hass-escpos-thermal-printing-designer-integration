"""The panel's websocket commands without Home Assistant.

Used by the development server and by the browser demo (running in Pyodide). It
keeps templates in memory and renders with the real design engine. Home Assistant
templates are not available here; templates run in a plain Jinja environment that
knows ``vars``, ``now()``, ``timedelta`` and stand-ins for ``states()``,
``state_translated()`` and ``state_attr()``.
"""

from __future__ import annotations

import base64
import json
import sys
from datetime import datetime, timedelta
from io import BytesIO
from pathlib import Path

from jinja2 import Environment, StrictUndefined

# The folder that contains ``custom_components`` (the repository, or the demo's unpacked engine).
ROOT = next(
    parent for parent in Path(__file__).resolve().parents if (parent / "custom_components").is_dir()
)
sys.path.insert(0, str(ROOT))

from custom_components.escpos_designer.designer import (  # noqa: E402
    DocumentError,
    font_catalog,
    normalize_document,
    render_design,
)
from custom_components.escpos_designer.templates import (  # noqa: E402
    TemplateError,
    describe,
    document_for,
    history_record,
    is_builtin,
    is_history,
    load_builtin_templates,
    new_template_id,
    normalize_template,
    normalize_variables,
    summarize,
    variable_defaults,
)

# Shown in the footer; the demo build fills in the integration's version.
VERSION = "dev"
REPOSITORY_URL = "https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration"
TODO_ITEMS = {
    "todo.shopping_list": [
        {"text": "Milk", "done": False, "note": "2 liters"},
        {"text": "Bread", "done": False, "note": ""},
        {"text": "Tomatoes 🍅", "done": False, "note": "the red ones"},
        {"text": "Coffee ☕", "done": True, "note": ""},
    ]
}
PRINTERS = [
    {
        "id": "kitchen",
        "device_id": "kitchen",
        "name": "Demo printer (saves a PNG)",
        "width": 384,
        "connection": "bluetooth",
    }
]
PAPER_PRESETS = [
    {"id": "58mm", "width": 384, "height": None},
    {"id": "80mm", "width": 576, "height": None},
    {"id": "label_30x14", "width": 240, "height": 112},
    {"id": "label_40x30", "width": 320, "height": 240},
    {"id": "label_50x30", "width": 400, "height": 240},
    {"id": "label_50x80", "width": 400, "height": 640},
]

builtin = load_builtin_templates()
stored: dict[str, dict] = {}
recent: list[str] = []
favorites: list[str] = []
history: list[dict] = []
HISTORY_LIMIT = 10


def find(template_id: str) -> dict | None:
    if is_history(template_id):
        entry = next((item for item in history if item["id"] == template_id), None)
        return history_record(entry) if entry else None
    return builtin.get(template_id) or stored.get(template_id)


def png_b64(image) -> str:
    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    return base64.b64encode(buffer.getvalue()).decode()


JINJA = Environment(undefined=StrictUndefined)
JINJA.globals.update(
    now=datetime.now,
    timedelta=timedelta,
    states=lambda entity_id: "sunny" if str(entity_id).startswith("weather.") else "unknown",
    state_translated=lambda entity_id: (
        "Sonnig" if str(entity_id).startswith("weather.") else "unbekannt"
    ),
    state_attr=lambda entity_id, attribute: 18 if attribute == "temperature" else None,
)


def render(document: dict, variables: dict, language: str):
    values = {**variables}

    def fill(text: str) -> str:
        try:
            return JINJA.from_string(text).render(vars=values, **values)
        except Exception as err:  # shown inline, like a template error in Home Assistant
            return f"[{err}]"

    return render_design(
        normalize_document(document),
        now=datetime.now(),
        language=language,
        render_template=fill,
        todo_items=TODO_ITEMS,
    )


def _status(_msg: dict, language: str) -> dict:
    return {
        "version": VERSION,
        "language": language,
        "printer_integration": {
            "installed": True,
            "printer_count": len(PRINTERS),
            "hacs_url": REPOSITORY_URL,
            "repository_url": REPOSITORY_URL,
            "add_printer_url": "#",
        },
        "printers": PRINTERS,
        "fonts": font_catalog(),
        "paper_presets": PAPER_PRESETS,
    }


def _library(_msg: dict, language: str) -> dict:
    records = {**builtin, **stored}
    return {
        "templates": [summarize(tid, rec, language) for tid, rec in records.items()],
        "recent": [tid for tid in recent if tid in records],
        "favorites": [tid for tid in favorites if tid in records],
        "history": [summarize(e["id"], history_record(e), language) for e in history],
    }


def _get_template(msg: dict, language: str) -> dict:
    record = find(msg["template_id"])
    if record is None:
        raise LookupError("Template not found.")
    return describe(msg["template_id"], record, language)


def _save_template(msg: dict, language: str) -> dict:
    record = normalize_template(msg["template"])
    template_id = msg.get("template_id")
    if template_id not in stored:
        template_id = new_template_id()
    stored[template_id] = record
    if template_id in recent:
        recent.remove(template_id)
    recent.insert(0, template_id)
    del recent[10:]
    return describe(template_id, record, language)


def _delete_template(msg: dict, _language: str) -> dict:
    template_id = msg["template_id"]
    if is_history(template_id):
        before = len(history)
        history[:] = [entry for entry in history if entry["id"] != template_id]
        removed = len(history) < before
    else:
        removed = not is_builtin(template_id) and stored.pop(template_id, None) is not None
    if not removed:
        raise LookupError("Template not found.")
    return {"deleted": template_id}


def _toggle_favorite(msg: dict, _language: str) -> dict:
    template_id = msg["template_id"]
    if template_id in favorites:
        favorites.remove(template_id)
    else:
        favorites.append(template_id)
    return {"favorite": template_id in favorites}


def _preview(msg: dict, language: str) -> dict:
    result = render(msg["document"], msg.get("variables", {}), language)
    return {
        "image": png_b64(result.image),
        "width": result.image.width,
        "height": result.image.height,
        "warnings": result.warnings,
        "template_errors": [],
    }


def _thumbnails(msg: dict, language: str) -> dict:
    thumbnails = {}
    for template_id in msg["template_ids"]:
        record = find(template_id)
        if record:
            result = render(
                document_for(record, language), variable_defaults(record, language), language
            )
            thumbnails[template_id] = png_b64(result.image)
    return thumbnails


def _print(msg: dict, language: str) -> dict:
    result = render(msg["document"], msg.get("variables", {}), language)
    history.insert(
        0,
        {
            "id": f"history:{new_template_id()}",
            "name": msg.get("name") or "",
            "printed_at": datetime.now().isoformat(timespec="seconds"),
            "document": normalize_document(msg["document"]),
            "variables": normalize_variables(msg.get("variable_defs", [])),
            "values": msg.get("variables", {}),
        },
    )
    del history[HISTORY_LIMIT:]
    return {
        "printers": [PRINTERS[0]["id"]],
        "copies": msg.get("copies", 1),
        "width": result.image.width,
        "height": result.image.height,
        "warnings": result.warnings,
        # Nothing can be printed here; the demo hands the picture to the visitor instead.
        "image": png_b64(result.image),
    }


COMMANDS = {
    "status": _status,
    "library": _library,
    "get_template": _get_template,
    "save_template": _save_template,
    "delete_template": _delete_template,
    "toggle_favorite": _toggle_favorite,
    "preview": _preview,
    "thumbnails": _thumbnails,
    "print": _print,
}


def handle(msg: dict) -> dict:
    command = msg["type"].split("/", 1)[1]
    if command not in COMMANDS:
        raise LookupError(f"unknown command {command}")
    return COMMANDS[command](msg, msg.get("language", "en"))


def dispatch(message_json: str) -> str:
    """Answer one websocket message (JSON in, JSON out), like the integration would."""
    try:
        payload = {"result": handle(json.loads(message_json))}
    except (DocumentError, TemplateError) as err:
        payload = {"error": {"code": "invalid_design", "message": str(err)}}
    except LookupError as err:
        payload = {"error": {"code": "not_found", "message": str(err)}}
    return json.dumps(payload)
