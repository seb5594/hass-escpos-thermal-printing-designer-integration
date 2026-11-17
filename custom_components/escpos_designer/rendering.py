"""Render a design inside Home Assistant: Jinja templates, todo lists, off-loop drawing."""

from __future__ import annotations

import base64
import logging
from dataclasses import dataclass, field
from io import BytesIO
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError, TemplateError
from homeassistant.helpers.template import Template
from homeassistant.util import dt as dt_util

from .designer import has_template, normalize_document, render_design

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from PIL import Image

_LOGGER = logging.getLogger(__name__)
MAX_TEMPLATE_STRINGS = 400


@dataclass(slots=True)
class RenderOutput:
    """The result of rendering a design."""

    image: Image.Image
    warnings: list[dict[str, Any]] = field(default_factory=list)
    template_errors: list[str] = field(default_factory=list)
    options: dict[str, Any] = field(default_factory=dict)  # the design's cut/feed/... options

    def to_png(self) -> bytes:
        buffer = BytesIO()
        self.image.save(buffer, format="PNG", optimize=True)
        return buffer.getvalue()

    def to_data_uri(self) -> str:
        return "data:image/png;base64," + base64.b64encode(self.to_png()).decode("ascii")


def collect_template_strings(node: Any, found: set[str]) -> None:
    """Gather every string in ``node`` that contains Jinja syntax."""
    if isinstance(node, str):
        if has_template(node) and not node.startswith("data:"):
            found.add(node)
    elif isinstance(node, dict):
        for value in node.values():
            collect_template_strings(value, found)
    elif isinstance(node, list):
        for value in node:
            collect_template_strings(value, found)


class DesignRenderer:
    """Turns a design document and its variables into a printable image."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass

    async def async_render(
        self,
        document: dict[str, Any],
        variables: dict[str, Any] | None = None,
        *,
        language: str | None = None,
    ) -> RenderOutput:
        """Render ``document``; template problems are reported, not raised."""
        doc = normalize_document(document)
        language = language or self._hass.config.language
        values = dict(variables or {})
        errors: list[str] = []

        rendered = self._render_templates(doc, {**values, "vars": values}, errors)
        todo_items, todo_warnings = await self._fetch_todo_items(doc, rendered)

        result = await self._hass.async_add_executor_job(
            lambda: render_design(
                doc,
                now=dt_util.now().replace(tzinfo=None),
                language=language,
                render_template=lambda text: rendered.get(text, text),
                todo_items=todo_items,
            )
        )
        return RenderOutput(
            result.image, [*result.warnings, *todo_warnings], errors, doc["options"]
        )

    def _render_templates(
        self, doc: dict[str, Any], variables: dict[str, Any], errors: list[str]
    ) -> dict[str, str]:
        """Render every template string once; the engine looks the results up."""
        strings: set[str] = set()
        collect_template_strings(doc, strings)
        if len(strings) > MAX_TEMPLATE_STRINGS:
            raise HomeAssistantError("The design contains too many templates.")
        rendered: dict[str, str] = {}
        for text in strings:
            try:
                rendered[text] = Template(text, self._hass).async_render(
                    variables, parse_result=False
                )
            except TemplateError as err:
                message = str(err)
                errors.append(message)
                rendered[text] = f"[{message}]"
        return rendered

    async def _fetch_todo_items(
        self, doc: dict[str, Any], rendered: dict[str, str]
    ) -> tuple[dict[str, list[dict[str, Any]]], list[dict[str, Any]]]:
        """Read the items of every todo entity a list element points at."""
        entity_ids = {
            rendered.get(element["source"]["entity_id"], element["source"]["entity_id"])
            for element in doc["elements"]
            if element["type"] == "list" and element["source"]["kind"] == "todo"
        }
        items: dict[str, list[dict[str, Any]]] = {}
        warnings: list[dict[str, Any]] = []
        for entity_id in sorted(entity for entity in entity_ids if entity):
            try:
                response = await self._hass.services.async_call(
                    "todo",
                    "get_items",
                    {"entity_id": entity_id},
                    blocking=True,
                    return_response=True,
                )
            except HomeAssistantError as err:
                _LOGGER.debug("Could not read %s: %s", entity_id, err)
                warnings.append({"element": None, "message": f"todo list {entity_id}: {err}"})
                continue
            items[entity_id] = [
                {
                    "text": item.get("summary", ""),
                    "done": item.get("status") == "completed",
                    "note": item.get("description") or "",
                }
                for item in (response or {}).get(entity_id, {}).get("items", [])
            ]
        return items, warnings
