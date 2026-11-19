"""Resolve a design into plain elements: templates filled in, scripts expanded.

Resolving is the only step that needs outside data, so everything it needs is
passed in: the current time, a function that renders template strings and the
items of the todo lists the design refers to. That keeps the engine free of
Home Assistant and easy to test.
"""

from __future__ import annotations

from collections.abc import Callable, Mapping
from datetime import datetime, timedelta
from typing import Any

from .calendar_names import format_datetime
from .markup import compile_markdown
from .schema import normalize_element

TemplateRenderer = Callable[[str], str]
TodoItems = Mapping[str, list[dict[str, Any]]]

_STYLE_KEYS = ("font", "size", "bold", "italic", "underline", "strike", "invert")
_TEMPLATE_MARKERS = ("{{", "{%", "{#")


def has_template(text: str) -> bool:
    """True if ``text`` contains Jinja syntax."""
    return any(marker in text for marker in _TEMPLATE_MARKERS)


def resolve_elements(
    doc: dict[str, Any],
    *,
    now: datetime,
    language: str,
    render_template: TemplateRenderer,
    todo_items: TodoItems,
) -> list[dict[str, Any]]:
    """Return the visible elements of ``doc`` as primitive, template-free elements."""
    resolver = _Resolver(now, language, render_template, todo_items)
    resolved: list[dict[str, Any]] = []
    for element in doc["elements"]:
        if not element["hidden"]:
            resolved.extend(resolver.resolve(element))
    return resolved


class _Resolver:
    def __init__(
        self, now: datetime, language: str, render_template: TemplateRenderer, todo_items: TodoItems
    ) -> None:
        self._now = now
        self._language = language
        self._render = render_template
        self._todo_items = todo_items

    def text(self, value: str) -> str:
        return self._render(value) if has_template(value) else value

    def resolve(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        handler = getattr(self, f"_{element['type']}", None)
        return handler(element) if handler else [element]

    def _text(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        runs = [{**run, "text": self.text(run["text"])} for run in element["runs"]]
        return [{**element, "runs": runs, "bullet": self.text(element["bullet"])}]

    def _markdown(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        base = {key: element[key] for key in _STYLE_KEYS if key in element}
        base.setdefault("invert", False)
        compiled = compile_markdown(self.text(element["source"]), base)
        result = []
        for part in compiled:
            part.setdefault("align", element["align"] if part["type"] != "spacer" else "left")
            if part.get("align") == "left":
                part["align"] = element["align"]
            result.append(normalize_element(part))
        _apply_margins(result, element)
        return result

    def _datetime(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        moment = self._now + timedelta(days=element["offset_days"], hours=element["offset_hours"])
        text = (
            self.text(element["prefix"])
            + format_datetime(moment, element["format"], self._language)
            + self.text(element["suffix"])
        )
        run = {"text": text, **{key: element[key] for key in _STYLE_KEYS}}
        return [_text_element(element, [run])]

    def _sticker(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        run = {
            "text": element["emoji"],
            "font": "sans",
            "size": element["size"],
            "bold": False,
            "italic": False,
            "underline": False,
            "strike": False,
            "invert": False,
        }
        return [_text_element(element, [run], line_spacing=1.0)]

    def _list(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        items = self._list_items(element["source"])
        if not items:
            empty = self.text(element["empty_text"])
            if not empty:
                return []
            style = {key: element[key] for key in _STYLE_KEYS if key in element}
            return [_text_element(element, [{"text": empty, "invert": False, **style}])]
        result: list[dict[str, Any]] = []
        for number, item in enumerate(items, start=1):
            result.extend(self._list_item(element, item, number))
        _apply_margins(result, element)
        return result

    def _list_item(
        self, element: dict[str, Any], item: dict[str, Any], number: int
    ) -> list[dict[str, Any]]:
        style = {key: element[key] for key in _STYLE_KEYS if key in element}
        style["invert"] = False
        done_style = {**style, "strike": True} if item["done"] else style
        bullet = {
            "checkbox": "☑" if item["done"] else "☐",
            "bullet": "•",
            "dash": "–",
            "numbered": f"{number}.",
            "none": "",
        }[element["style"]]
        parts = [
            _text_element(
                element,
                [{"text": self.text(item["text"]), **done_style}],
                bullet=bullet,
                line_spacing=element["line_spacing"],
            )
        ]
        note = self.text(item.get("note", ""))
        if note and element["show_notes"]:
            small = {**style, "size": max(8, round(style["size"] * 0.72)), "italic": True}
            parts.append(
                _text_element(
                    element,
                    [{"text": note, **small}],
                    bullet=" " * 3 if bullet else "",
                    line_spacing=element["line_spacing"],
                )
            )
        return parts

    def _list_items(self, source: dict[str, Any]) -> list[dict[str, Any]]:
        if source["kind"] == "todo":
            items = list(self._todo_items.get(self.text(source["entity_id"]), []))
            if not source["include_completed"]:
                items = [item for item in items if not item.get("done")]
        else:
            items = [dict(item) for item in source["items"]]
        return [
            {"text": item["text"], "done": bool(item.get("done")), "note": item.get("note", "")}
            for item in items[: source["limit"]]
        ]

    def _qr(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        return [
            {
                **element,
                "data": self.text(element["data"]),
                "caption": self.text(element["caption"]),
            }
        ]

    def _barcode(self, element: dict[str, Any]) -> list[dict[str, Any]]:
        return [{**element, "data": self.text(element["data"])}]


def _text_element(
    source: dict[str, Any],
    runs: list[dict[str, Any]],
    *,
    bullet: str = "",
    line_spacing: float = 1.15,
) -> dict[str, Any]:
    return normalize_element(
        {
            "type": "text",
            "runs": runs,
            "bullet": bullet,
            "line_spacing": line_spacing,
            "align": source["align"],
            "margin_top": source["margin_top"],
            "margin_bottom": source["margin_bottom"],
        }
    )


def _apply_margins(parts: list[dict[str, Any]], element: dict[str, Any]) -> None:
    """Keep the element's own top/bottom margin around the expanded parts."""
    if parts:
        parts[0]["margin_top"] += element["margin_top"]
        parts[-1]["margin_bottom"] += element["margin_bottom"]
