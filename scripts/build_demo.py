"""Assemble the GitHub Pages demo into ``_site/``.

    python scripts/build_demo.py

The site is static: the panel bundle, the design engine as a zip for Pyodide and a
small page that wires them together. Needs nothing but the standard library.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INTEGRATION = ROOT / "custom_components" / "escpos_designer"
SITE = ROOT / "_site"
ENGINE_PARTS = ("designer", "fonts", "builtin_templates")
# Pure-Python packages the engine imports; Pyodide ships Pillow and Jinja2 itself.
VENDORED = ("voluptuous", "qrcode>=7.4.2,<9")


def engine_files() -> list[tuple[Path, str]]:
    """The files the browser needs, as (source, path inside the zip)."""
    base = "custom_components/escpos_designer"
    files = [(ROOT / "frontend/dev/backend.py", "backend.py")]
    files.append((INTEGRATION / "templates.py", f"{base}/templates.py"))
    for part in ENGINE_PARTS:
        for path in sorted((INTEGRATION / part).rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts:
                files.append((path, f"{base}/{path.relative_to(INTEGRATION).as_posix()}"))
    return files


def vendor_packages(target: Path) -> None:
    """Download the pure-Python dependencies so the page never has to ask PyPI."""
    command = [
        sys.executable,
        "-m",
        "pip",
        "install",
        "--quiet",
        "--no-deps",
        "--target",
        str(target),
    ]
    subprocess.run([*command, *VENDORED], check=True)


def build_engine_zip(target: Path) -> None:
    with (
        tempfile.TemporaryDirectory() as vendor,
        zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive,
    ):
        vendor_dir = Path(vendor)
        vendor_packages(vendor_dir)
        for path in sorted(vendor_dir.rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts and path.suffix != ".pyc":
                archive.write(path, path.relative_to(vendor_dir).as_posix())
        # Empty package markers: the engine does not need Home Assistant.
        archive.writestr("custom_components/__init__.py", "")
        archive.writestr("custom_components/escpos_designer/__init__.py", "")
        for source, name in engine_files():
            archive.write(source, name)


def main() -> None:
    shutil.rmtree(SITE, ignore_errors=True)
    SITE.mkdir()
    shutil.copy(ROOT / "demo/index.html", SITE / "index.html")
    shutil.copy(ROOT / "demo/demo.js", SITE / "demo.js")
    shutil.copy(INTEGRATION / "frontend/escpos-designer-panel.js", SITE / "panel.js")
    icon = INTEGRATION / "brand" / "icon.png"
    if icon.exists():
        shutil.copy(icon, SITE / "icon.png")
    build_engine_zip(SITE / "engine.zip")
    version = json.loads((INTEGRATION / "manifest.json").read_text(encoding="utf-8"))["version"]
    (SITE / "demo-config.json").write_text(json.dumps({"version": version}), encoding="utf-8")
    (SITE / ".nojekyll").write_text("", encoding="utf-8")
    size = sum(path.stat().st_size for path in SITE.iterdir() if path.is_file())
    print(f"Demo for {version} written to {SITE} ({size / 1_000_000:.1f} MB)")


if __name__ == "__main__":
    main()
