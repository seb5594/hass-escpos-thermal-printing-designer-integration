"""Turn the Markdown/HTML-flavoured script into design elements.

Block syntax (one source line per printed line)::

    # Big heading         ## Heading         ### Small heading
    - bullet              - [ ] open task    - [x] done task    1. numbered
    > quote
    ---  solid line   ===  double line   ***  stars   ...  dots   ~~~  wave
    <center> ... </center>   <right> ... </right>   (also on a single line)
    [[qr:https://example.com]]   [[barcode:code128:12345]]   [[space:24]]

Inline syntax::

    **bold**  *italic*  __bold__  _italic_  ~~strike~~  ++underline++
    ==inverted==  `mono`
    <b> <i> <u> <s> <mark> <big> <small> <size=40> <font=script> ... closing tags

A backslash escapes the next character (``\\*``).
"""

from __future__ import annotations

import re
from typing import Any

from .fonts import FONT_IDS, MONO_FONT
from .schema import ALIGNMENTS

_HEADING_SCALE = {1: 1.9, 2: 1.45, 3: 1.2}
_DIVIDER_MARKERS = {
    "---": "solid",
    "===": "double",
    "***": "stars",
    "...": "dotted",
    "~~~": "wave",
}
_TASK_RE = re.compile(r"^\s*[-*+]\s+\[( |x|X)\]\s+(.*)$")
_BULLET_RE = re.compile(r"^\s*[-*+]\s+(.*)$")
_NUMBERED_RE = re.compile(r"^\s*(\d+)[.)]\s+(.*)$")
_DIRECTIVE_RE = re.compile(r"^\s*\[\[\s*(qr|barcode|space)\s*:\s*(.*?)\s*\]\]\s*$")
_ALIGN_TAG_RE = re.compile(r"^\s*<(left|center|right)>(.*?)(?:</\1>)?\s*$", re.IGNORECASE)
_TAG_RE = re.compile(r"<(/?)(b|i|u|s|mark|big|small|size|font)(?:=([\w-]+))?>", re.IGNORECASE)
_DELIMITERS = ("**", "__", "~~", "++", "==", "*", "_", "`")
_DELIMITER_STYLE = {
    "**": "bold",
    "__": "bold",
    "*": "italic",
    "_": "italic",
    "~~": "strike",
    "++": "underline",
    "==": "invert",
}


def compile_markdown(source: str, base: dict[str, Any]) -> list[dict[str, Any]]:
    """Compile ``source`` into elements; ``base`` holds font/size/bold/italic/... defaults."""
    elements: list[dict[str, Any]] = []
    align = "left"
    for line in source.split("\n"):
        stripped = line.strip()
        if not stripped:
            elements.append({"type": "spacer", "height": max(4, int(base["size"] * 0.5))})
            continue
        if stripped.lower() in {f"<{a}>" for a in ALIGNMENTS}:
            align = stripped[1:-1].lower()
            continue
        if stripped.lower() in {f"</{a}>" for a in ALIGNMENTS}:
            align = "left"
            continue
        content, line_align = line, align
        if match := _ALIGN_TAG_RE.match(line):
            content, line_align = match.group(2), match.group(1).lower()
        elements.append(_compile_line(content, base, line_align))
    return elements


def _compile_line(line: str, base: dict[str, Any], align: str) -> dict[str, Any]:
    stripped = line.strip()
    if stripped in _DIVIDER_MARKERS:
        return {"type": "divider", "style": _DIVIDER_MARKERS[stripped], "align": align}
    if match := _DIRECTIVE_RE.match(line):
        return _compile_directive(match.group(1), match.group(2), align)
    block = _compile_list_or_quote(line, stripped, base, align)
    if block is not None:
        return block
    heading = len(stripped) - len(stripped.lstrip("#"))
    if 1 <= heading <= 3 and stripped[heading : heading + 1] == " ":
        scaled = {
            **base,
            "bold": True,
            "size": min(240, round(base["size"] * _HEADING_SCALE[heading])),
        }
        return _text_line(stripped[heading + 1 :], scaled, align)
    return _text_line(line.rstrip(), base, align)


def _compile_list_or_quote(
    line: str, stripped: str, base: dict[str, Any], align: str
) -> dict[str, Any] | None:
    """Compile task, bullet, numbered and quote lines; ``None`` for anything else."""
    if match := _TASK_RE.match(line):
        return _list_line(match.group(2), base, align, "checkbox", done=match.group(1) != " ")
    if match := _BULLET_RE.match(line):
        return _list_line(match.group(1), base, align, "bullet")
    if match := _NUMBERED_RE.match(line):
        return _list_line(match.group(2), base, align, "numbered", number=int(match.group(1)))
    if stripped.startswith(">"):
        quote = {**base, "italic": True}
        return _text_line(stripped.lstrip("> ").strip(), quote, align, bullet="▎")
    return None


def _compile_directive(name: str, value: str, align: str) -> dict[str, Any]:
    if name == "qr":
        return {"type": "qr", "data": value, "align": align}
    if name == "space":
        return {"type": "spacer", "height": _to_int(value, 16)}
    kind, _, data = value.partition(":")
    return {"type": "barcode", "kind": kind.strip().lower(), "data": data.strip(), "align": align}


def _to_int(value: str, default: int) -> int:
    try:
        return max(1, min(800, int(value)))
    except ValueError:
        return default


def _text_line(text: str, style: dict[str, Any], align: str, *, bullet: str = "") -> dict[str, Any]:
    element: dict[str, Any] = {
        "type": "text",
        "runs": parse_inline(text, style),
        "align": align,
    }
    if bullet:
        element["bullet"] = bullet
    return element


def _list_line(
    text: str,
    base: dict[str, Any],
    align: str,
    mark: str,
    *,
    done: bool = False,
    number: int = 0,
) -> dict[str, Any]:
    glyph = {"checkbox": "☑" if done else "☐", "bullet": "•", "numbered": f"{number}."}[mark]
    return _text_line(text, base, align, bullet=glyph)


def parse_inline(text: str, base: dict[str, Any]) -> list[dict[str, Any]]:
    """Split ``text`` into runs, applying the inline markers on top of ``base``."""
    style = {key: base[key] for key in ("font", "size", "bold", "italic", "underline", "strike")}
    style["invert"] = bool(base.get("invert", False))
    runs: list[dict[str, Any]] = []
    buffer: list[str] = []
    state: dict[str, Any] = {"code": False, "stack": []}

    def flush() -> None:
        if buffer:
            runs.append({"text": "".join(buffer), **style})
            buffer.clear()

    index = 0
    while index < len(text):
        char = text[index]
        if char == "\\" and index + 1 < len(text):
            buffer.append(text[index + 1])
            index += 2
            continue
        if char == "<" and (tag := _TAG_RE.match(text, index)):
            flush()
            _apply_tag(style, base, state["stack"], tag)
            index = tag.end()
            continue
        delimiter = _delimiter_at(text, index, in_code=state["code"])
        if delimiter:
            flush()
            _toggle_delimiter(style, base, state, delimiter)
            index += len(delimiter)
            continue
        buffer.append(char)
        index += 1
    flush()
    return runs or [{"text": "", **style}]


def _delimiter_at(text: str, index: int, *, in_code: bool) -> str | None:
    """Return the style marker starting at ``index`` if it acts as one there."""
    if in_code:
        return "`" if text[index] == "`" else None
    for delimiter in _DELIMITERS:
        if not text.startswith(delimiter, index):
            continue
        if delimiter in ("_", "__"):
            before = text[index - 1] if index else " "
            after = text[index + len(delimiter) : index + len(delimiter) + 1] or " "
            if before.isalnum() and after.isalnum():
                return None  # snake_case_word, not emphasis
        return delimiter
    return None


def _toggle_delimiter(
    style: dict[str, Any], base: dict[str, Any], state: dict[str, Any], delimiter: str
) -> None:
    if delimiter == "`":
        state["code"] = not state["code"]
        style["font"] = MONO_FONT if state["code"] else base["font"]
        return
    key = _DELIMITER_STYLE[delimiter]
    style[key] = not style[key]


def _apply_tag(
    style: dict[str, Any], base: dict[str, Any], stack: list[tuple[str, Any]], tag: re.Match[str]
) -> None:
    closing, name, argument = tag.group(1) == "/", tag.group(2).lower(), tag.group(3)
    key = {
        "b": "bold",
        "i": "italic",
        "u": "underline",
        "s": "strike",
        "mark": "invert",
        "big": "size",
        "small": "size",
        "size": "size",
        "font": "font",
    }[name]
    if closing:
        for position in range(len(stack) - 1, -1, -1):
            if stack[position][0] == key:
                style[key] = stack.pop(position)[1]
                return
        style[key] = base.get(key, style[key])
        return
    stack.append((key, style[key]))
    if key in ("bold", "italic", "underline", "strike", "invert"):
        style[key] = True
    elif name == "big":
        style["size"] = min(240, round(style["size"] * 1.4))
    elif name == "small":
        style["size"] = max(8, round(style["size"] * 0.7))
    elif name == "size" and argument and argument.isdigit():
        style["size"] = max(8, min(240, int(argument)))
    elif name == "font" and argument in FONT_IDS:
        style["font"] = argument
