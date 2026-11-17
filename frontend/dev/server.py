"""Development server: the panel in a plain browser, backed by the real design engine.

    npm run build
    python frontend/dev/server.py        # then open http://localhost:8765/?lang=de&theme=dark

It answers the same websocket commands as the integration, keeps templates in
memory and renders previews with the real engine. Home Assistant templates are
not available here; ``{{ vars.name }}`` is replaced by a simple substitution.
Run it with an interpreter that can import Pillow, voluptuous and qrcode.
"""

from __future__ import annotations

import base64
import json
import re
import sys
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
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
    is_builtin,
    load_builtin_templates,
    new_template_id,
    normalize_template,
    summarize,
)

PORT = 8765
BUNDLE = ROOT / "custom_components/escpos_designer/frontend/escpos-designer-panel.js"
INDEX = Path(__file__).with_name("index.html")
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
        "name": "Kitchen printer",
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


def find(template_id: str) -> dict | None:
    return builtin.get(template_id) or stored.get(template_id)


def png_b64(image) -> str:
    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    return base64.b64encode(buffer.getvalue()).decode()


def render(document: dict, variables: dict, language: str):
    values = {**variables}

    def fill(text: str) -> str:
        return re.sub(r"\{\{\s*vars\.(\w+)\s*\}\}", lambda m: str(values.get(m.group(1), "")), text)

    return render_design(
        normalize_document(document),
        now=datetime.now(),
        language=language,
        render_template=fill,
        todo_items=TODO_ITEMS,
    )


def handle(msg: dict) -> dict:
    command = msg["type"].split("/", 1)[1]
    language = msg.get("language", "en")
    if command == "status":
        return {
            "version": "dev",
            "language": language,
            "printer_integration": {
                "installed": True,
                "printer_count": 1,
                "hacs_url": "https://example.invalid/hacs",
                "repository_url": "https://github.com/cognitivegears/ha-escpos-thermal-printer",
                "add_printer_url": "#",
            },
            "printers": PRINTERS,
            "fonts": font_catalog(),
            "paper_presets": PAPER_PRESETS,
        }
    if command == "library":
        records = {**builtin, **stored}
        return {
            "templates": [summarize(tid, rec, language) for tid, rec in records.items()],
            "recent": [tid for tid in recent if tid in records],
            "favorites": [tid for tid in favorites if tid in records],
        }
    if command == "get_template":
        record = find(msg["template_id"])
        if record is None:
            raise LookupError("Template not found.")
        return describe(msg["template_id"], record, language)
    if command == "save_template":
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
    if command == "delete_template":
        if is_builtin(msg["template_id"]) or stored.pop(msg["template_id"], None) is None:
            raise LookupError("Template not found.")
        return {"deleted": msg["template_id"]}
    if command == "toggle_favorite":
        tid = msg["template_id"]
        favorites.remove(tid) if tid in favorites else favorites.append(tid)
        return {"favorite": tid in favorites}
    if command == "preview":
        result = render(msg["document"], msg.get("variables", {}), language)
        return {
            "image": png_b64(result.image),
            "width": result.image.width,
            "height": result.image.height,
            "warnings": result.warnings,
            "template_errors": [],
        }
    if command == "thumbnails":
        out = {}
        for tid in msg["template_ids"]:
            record = find(tid)
            if record:
                defaults = {v["key"]: v["default"] for v in record["variables"]}
                out[tid] = png_b64(render(record["document"], defaults, language).image)
        return out
    if command == "print":
        result = render(msg["document"], msg.get("variables", {}), language)
        result.image.save("/tmp/escpos_designer_last_print.png")
        return {
            "printers": ["kitchen"],
            "copies": msg.get("copies", 1),
            "width": result.image.width,
            "height": result.image.height,
            "warnings": result.warnings,
        }
    raise LookupError(f"unknown command {command}")


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args) -> None:  # keep the console quiet
        pass

    def _send(self, body: bytes, content_type: str, status: int = 200) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        if self.path.startswith("/escpos-designer-panel.js"):
            self._send(BUNDLE.read_bytes(), "text/javascript")
        else:
            self._send(INDEX.read_bytes(), "text/html; charset=utf-8")

    def do_POST(self) -> None:
        msg = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        try:
            payload = {"result": handle(msg)}
        except (DocumentError, TemplateError) as err:
            payload = {"error": {"code": "invalid_design", "message": str(err)}}
        except LookupError as err:
            payload = {"error": {"code": "not_found", "message": str(err)}}
        self._send(json.dumps(payload).encode(), "application/json")


if __name__ == "__main__":
    print(f"Designer dev server on http://localhost:{PORT}/")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
