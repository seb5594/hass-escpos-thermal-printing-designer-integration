"""The design engine: validate a design, resolve it and draw it.

It has no Home Assistant dependency; everything it needs from outside (the
time, template rendering, todo items) is passed in.

    doc = normalize_document(raw)
    result = render_design(doc, now=..., language="de", render_template=..., todo_items={})
    result.image  # a 1-bit Pillow image, exactly what gets printed
"""

from __future__ import annotations

from datetime import datetime

from .fit import MAX_FIT_SIZE, fit_to_canvas
from .fonts import font_catalog
from .renderer import RenderResult, render_document
from .resolve import TemplateRenderer, TodoItems, has_template, resolve_elements
from .schema import (
    DocumentError,
    normalize_document,
)

__all__ = [
    "MAX_FIT_SIZE",
    "DocumentError",
    "RenderResult",
    "fit_to_canvas",
    "font_catalog",
    "has_template",
    "normalize_document",
    "render_design",
]


def render_design(
    doc: dict,
    *,
    now: datetime,
    language: str = "en",
    render_template: TemplateRenderer = lambda text: text,
    todo_items: TodoItems | None = None,
) -> RenderResult:
    """Resolve a normalized ``doc`` and render it."""
    elements = resolve_elements(
        doc,
        now=now,
        language=language,
        render_template=render_template,
        todo_items=todo_items or {},
    )
    return render_document(doc, elements)
