"""Development server: the panel in a plain browser, backed by the real design engine.

    npm run build
    python frontend/dev/server.py        # then open http://localhost:8765/?lang=de&theme=dark

Answers the same websocket commands as the integration (see ``backend.py``).
Run it with an interpreter that can import Pillow, voluptuous, qrcode and jinja2.
"""

from __future__ import annotations

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from backend import ROOT, dispatch

PORT = 8765
BUNDLE = ROOT / "custom_components/escpos_designer/frontend/escpos-designer-panel.js"
INDEX = Path(__file__).with_name("index.html")


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
        message = self.rfile.read(int(self.headers["Content-Length"])).decode()
        self._send(dispatch(message).encode(), "application/json")


if __name__ == "__main__":
    print(f"Designer dev server on http://localhost:{PORT}/")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
