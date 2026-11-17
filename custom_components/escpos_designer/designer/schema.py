"""The design document: its shape, limits and validation.

A design is a plain JSON-style dict, so it can be stored, sent over the
websocket and edited by hand. :func:`normalize_document` validates one, fills
every default and drops unknown keys, so the rest of the engine can rely on a
complete structure.

Elements (``elements`` is rendered top to bottom)::

    text      rich text made of runs, each with its own font, size and style
    markdown  Markdown/HTML-flavoured script, expanded into the elements below
    datetime  the current (or shifted) date and time in a chosen format
    list      a checklist/bullet list, static or read from a todo entity
    divider   a decorative line
    qr        a QR code
    barcode   a Code 128, Code 39 or EAN-13 barcode
    image     an uploaded picture
    sticker   one big emoji
    spacer    empty vertical space
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from .fonts import DEFAULT_FONT, FONT_IDS

MAX_ELEMENTS = 200
MAX_TEXT_LENGTH = 5000
MAX_RUNS = 100
MAX_LIST_ITEMS = 300
MAX_IMAGE_DATA_URI = 600_000
MIN_PAPER_WIDTH = 64
MAX_PAPER_WIDTH = 1024
MAX_PAPER_HEIGHT = 4096
DEFAULT_PAPER_WIDTH = 384  # 58 mm paper at 203 dpi

ALIGNMENTS = ("left", "center", "right")
FRAME_STYLES = ("none", "line", "double", "rounded", "dashed", "dotted", "brackets", "ticket")
DIVIDER_STYLES = ("solid", "dashed", "dotted", "double", "wave", "zigzag", "stars", "hearts")
LIST_STYLES = ("checkbox", "bullet", "dash", "numbered", "none")
BARCODE_KINDS = ("code128", "code39", "ean13")
QR_LEVELS = ("L", "M", "Q", "H")
CUT_MODES = ("none", "partial", "full")
DITHER_MODES = ("threshold", "floyd-steinberg")
ROTATIONS = (0, 90, 180, 270)


class DocumentError(ValueError):
    """The document is invalid; the message says where and why."""


def _int(low: int, high: int) -> vol.All:
    return vol.All(vol.Coerce(int), vol.Range(min=low, max=high))


def _float(low: float, high: float) -> vol.All:
    return vol.All(vol.Coerce(float), vol.Range(min=low, max=high))


_TEXT = vol.All(vol.Coerce(str), vol.Length(max=MAX_TEXT_LENGTH))
_BOOL = vol.Coerce(bool)

# Appearance shared by text runs, lists, dates and the markdown base style.
_STYLE: dict[Any, Any] = {
    vol.Optional("font", default=DEFAULT_FONT): vol.In(FONT_IDS),
    vol.Optional("size", default=24): _int(8, 240),
    vol.Optional("bold", default=False): _BOOL,
    vol.Optional("italic", default=False): _BOOL,
    vol.Optional("underline", default=False): _BOOL,
    vol.Optional("strike", default=False): _BOOL,
    vol.Optional("invert", default=False): _BOOL,
}

# Layout shared by every element.
_BLOCK: dict[Any, Any] = {
    vol.Optional("id"): vol.All(vol.Coerce(str), vol.Length(max=64)),
    vol.Optional("align", default="left"): vol.In(ALIGNMENTS),
    vol.Optional("margin_top", default=0): _int(0, 200),
    vol.Optional("margin_bottom", default=0): _int(0, 200),
    vol.Optional("hidden", default=False): _BOOL,
}

_RUN = vol.Schema({vol.Required("text"): _TEXT, **_STYLE}, extra=vol.REMOVE_EXTRA)

_LIST_ITEM = vol.Schema(
    {
        vol.Required("text"): _TEXT,
        vol.Optional("done", default=False): _BOOL,
        vol.Optional("note", default=""): _TEXT,
    },
    extra=vol.REMOVE_EXTRA,
)


def _list_item(value: Any) -> dict[str, Any]:
    """Accept a bare string as shorthand for ``{"text": ...}``."""
    return _LIST_ITEM({"text": value} if isinstance(value, str) else value)  # type: ignore[no-any-return]


_LIST_SOURCE = vol.Schema(
    {
        vol.Optional("kind", default="static"): vol.In(("static", "todo")),
        vol.Optional("items", default=list): vol.All([_list_item], vol.Length(max=MAX_LIST_ITEMS)),
        vol.Optional("entity_id", default=""): vol.All(vol.Coerce(str), vol.Length(max=255)),
        vol.Optional("include_completed", default=False): _BOOL,
        vol.Optional("limit", default=MAX_LIST_ITEMS): _int(1, MAX_LIST_ITEMS),
    },
    extra=vol.REMOVE_EXTRA,
)

_ELEMENT_FIELDS: dict[str, dict[Any, Any]] = {
    "text": {
        vol.Optional("runs", default=list): vol.All([_RUN], vol.Length(max=MAX_RUNS)),
        vol.Optional("line_spacing", default=1.15): _float(0.8, 3.0),
        # Drawn in front of the first line; wrapped lines are indented behind it.
        vol.Optional("bullet", default=""): vol.All(vol.Coerce(str), vol.Length(max=8)),
    },
    "markdown": {
        vol.Optional("source", default=""): _TEXT,
        **{key: value for key, value in _STYLE.items() if key != "invert"},
    },
    "datetime": {
        vol.Optional("format", default="%d.%m.%Y"): vol.All(vol.Coerce(str), vol.Length(max=80)),
        vol.Optional("prefix", default=""): _TEXT,
        vol.Optional("suffix", default=""): _TEXT,
        vol.Optional("offset_days", default=0): _int(-3650, 3650),
        vol.Optional("offset_hours", default=0): _int(-24 * 366, 24 * 366),
        **_STYLE,
    },
    "list": {
        vol.Optional("source", default=lambda: _LIST_SOURCE({})): _LIST_SOURCE,
        vol.Optional("style", default="checkbox"): vol.In(LIST_STYLES),
        vol.Optional("empty_text", default=""): _TEXT,
        vol.Optional("show_notes", default=True): _BOOL,
        vol.Optional("line_spacing", default=1.2): _float(0.8, 3.0),
        **{key: value for key, value in _STYLE.items() if key != "invert"},
    },
    "divider": {
        vol.Optional("style", default="solid"): vol.In(DIVIDER_STYLES),
        vol.Optional("thickness", default=2): _int(1, 12),
        vol.Optional("width_pct", default=100): _int(10, 100),
    },
    "qr": {
        vol.Optional("data", default=""): _TEXT,
        vol.Optional("size_pct", default=60): _int(10, 100),
        vol.Optional("level", default="M"): vol.In(QR_LEVELS),
        vol.Optional("caption", default=""): _TEXT,
        vol.Optional("caption_font", default=DEFAULT_FONT): vol.In(FONT_IDS),
        vol.Optional("caption_size", default=20): _int(8, 80),
    },
    "barcode": {
        vol.Optional("kind", default="code128"): vol.In(BARCODE_KINDS),
        vol.Optional("data", default=""): _TEXT,
        vol.Optional("height", default=90): _int(20, 400),
        vol.Optional("module_width", default=2): _int(1, 6),
        vol.Optional("show_text", default=True): _BOOL,
    },
    "image": {
        vol.Optional("data", default=""): vol.All(
            vol.Coerce(str), vol.Length(max=MAX_IMAGE_DATA_URI)
        ),
        vol.Optional("width_pct", default=100): _int(5, 100),
        vol.Optional("dither", default="floyd-steinberg"): vol.In(DITHER_MODES),
        vol.Optional("threshold", default=128): _int(1, 254),
    },
    "sticker": {
        vol.Optional("emoji", default="😀"): vol.All(vol.Coerce(str), vol.Length(min=1, max=32)),
        vol.Optional("size", default=96): _int(16, 400),
    },
    "spacer": {vol.Optional("height", default=16): _int(1, 800)},
}

ELEMENT_TYPES: tuple[str, ...] = tuple(_ELEMENT_FIELDS)
_ELEMENT_SCHEMAS = {
    element_type: vol.Schema(
        {vol.Required("type"): element_type, **_BLOCK, **fields}, extra=vol.REMOVE_EXTRA
    )
    for element_type, fields in _ELEMENT_FIELDS.items()
}


def normalize_element(value: Any) -> dict[str, Any]:
    """Validate one element (also used for elements a script expands into)."""
    return _element(value)


def _element(value: Any) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise vol.Invalid("an element must be an object")
    element_type = value.get("type")
    if element_type not in _ELEMENT_SCHEMAS:
        raise vol.Invalid(f"unknown element type {element_type!r}; use one of {ELEMENT_TYPES}")
    return _ELEMENT_SCHEMAS[element_type](value)  # type: ignore[no-any-return]


_PAPER = vol.Schema(
    {
        vol.Optional("width", default=DEFAULT_PAPER_WIDTH): _int(MIN_PAPER_WIDTH, MAX_PAPER_WIDTH),
        # A fixed height turns the design into a label of that exact size.
        vol.Optional("height", default=None): vol.Any(None, _int(16, MAX_PAPER_HEIGHT)),
    },
    extra=vol.REMOVE_EXTRA,
)

_FRAME = vol.Schema(
    {
        vol.Optional("style", default="none"): vol.In(FRAME_STYLES),
        vol.Optional("thickness", default=3): _int(1, 12),
        vol.Optional("padding", default=10): _int(0, 80),
    },
    extra=vol.REMOVE_EXTRA,
)

_OPTIONS = vol.Schema(
    {
        vol.Optional("cut", default="partial"): vol.In(CUT_MODES),
        vol.Optional("feed", default=2): _int(0, 30),
        vol.Optional("rotate", default=0): vol.All(vol.Coerce(int), vol.In(ROTATIONS)),
        vol.Optional("mirror", default=False): _BOOL,
        vol.Optional("invert", default=False): _BOOL,
        vol.Optional("margin", default=8): _int(0, 80),
    },
    extra=vol.REMOVE_EXTRA,
)

_DOCUMENT = vol.Schema(
    {
        vol.Optional("name", default=""): vol.All(vol.Coerce(str), vol.Length(max=80)),
        vol.Optional("paper", default=lambda: _PAPER({})): _PAPER,
        vol.Optional("frame", default=lambda: _FRAME({})): _FRAME,
        vol.Optional("options", default=lambda: _OPTIONS({})): _OPTIONS,
        vol.Optional("elements", default=list): vol.All([_element], vol.Length(max=MAX_ELEMENTS)),
    },
    extra=vol.REMOVE_EXTRA,
)


def normalize_document(raw: Any) -> dict[str, Any]:
    """Validate ``raw`` and return the complete document, or raise :class:`DocumentError`."""
    if not isinstance(raw, dict):
        raise DocumentError("a design must be an object")
    try:
        return _DOCUMENT(raw)  # type: ignore[no-any-return]
    except vol.Invalid as err:
        path = ".".join(str(part) for part in err.path)
        raise DocumentError(f"{path}: {err.error_message}" if path else err.error_message) from err
