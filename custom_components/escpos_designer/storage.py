"""Persistence of the user's templates, favorites and recent designs."""

from __future__ import annotations

from datetime import UTC, datetime
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.storage import Store

from .designer import normalize_document
from .templates import (
    HISTORY_PREFIX,
    MAX_TEMPLATES,
    TemplateError,
    new_template_id,
    normalize_template,
    normalize_variables,
)

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

STORAGE_KEY = "escpos_designer"
STORAGE_VERSION = 1
MAX_RECENT = 10


class DesignStorage:
    """Templates the user saved, plus the lists the dialog shows."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._templates: dict[str, dict[str, Any]] = {}
        self._recent: list[str] = []
        self._favorites: list[str] = []
        self._history: list[dict[str, Any]] = []

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self._templates = data.get("templates", {})
        self._recent = data.get("recent", [])
        self._favorites = data.get("favorites", [])
        self._history = data.get("history", [])

    @property
    def templates(self) -> dict[str, dict[str, Any]]:
        return self._templates

    @property
    def recent(self) -> list[str]:
        """Ids of the last designs saved or printed, newest first (built-in ones included)."""
        return list(self._recent)

    @property
    def favorites(self) -> list[str]:
        return list(self._favorites)

    @property
    def history(self) -> list[dict[str, Any]]:
        """The last printed designs, newest first."""
        return list(self._history)

    def get_history(self, template_id: str) -> dict[str, Any] | None:
        return next((entry for entry in self._history if entry["id"] == template_id), None)

    def add_history(
        self,
        *,
        name: str,
        document: dict[str, Any],
        variables: list[dict[str, Any]],
        values: dict[str, Any],
        limit: int,
    ) -> None:
        """Remember a print, dropping the oldest ones beyond ``limit`` (0 turns the history off)."""
        if limit <= 0:
            self.clear_history()
            return
        self._history.insert(
            0,
            {
                "id": f"{HISTORY_PREFIX}{new_template_id()}",
                "name": name[:80] or document.get("name") or "",
                "printed_at": _now(),
                "document": normalize_document(document),
                "variables": normalize_variables(variables),
                "values": {str(key): value for key, value in values.items()},
            },
        )
        del self._history[limit:]
        self._schedule_save()

    def delete_history(self, entry_id: str) -> bool:
        before = len(self._history)
        self._history = [entry for entry in self._history if entry["id"] != entry_id]
        if len(self._history) == before:
            return False
        self._schedule_save()
        return True

    def clear_history(self) -> None:
        if self._history:
            self._history.clear()
            self._schedule_save()

    def get(self, template_id: str) -> dict[str, Any] | None:
        return self._templates.get(template_id)

    def save(
        self, raw: dict[str, Any], template_id: str | None = None
    ) -> tuple[str, dict[str, Any]]:
        """Validate and store a template, returning its id and record.

        Saving over an unknown id or a built-in template stores a new copy.
        """
        record = normalize_template(raw)
        existing = None if template_id is None else self._templates.get(template_id)
        if existing is None:
            if len(self._templates) >= MAX_TEMPLATES:
                raise TemplateError(f"at most {MAX_TEMPLATES} templates can be stored")
            template_id = new_template_id()
        assert template_id is not None
        record["created_at"] = existing["created_at"] if existing else _now()
        record["updated_at"] = _now()
        self._templates[template_id] = record
        self.touch(template_id, save=False)
        self._schedule_save()
        return template_id, record

    def delete(self, template_id: str) -> bool:
        if self._templates.pop(template_id, None) is None:
            return False
        for items in (self._recent, self._favorites):
            if template_id in items:
                items.remove(template_id)
        self._schedule_save()
        return True

    def touch(self, template_id: str, *, save: bool = True) -> None:
        """Move a design to the front of the recent list."""
        if template_id in self._recent:
            self._recent.remove(template_id)
        self._recent.insert(0, template_id)
        del self._recent[MAX_RECENT:]
        if save:
            self._schedule_save()

    def toggle_favorite(self, template_id: str) -> bool:
        """Flip the favorite flag and return the new state."""
        if template_id in self._favorites:
            self._favorites.remove(template_id)
            favorite = False
        else:
            self._favorites.append(template_id)
            favorite = True
        self._schedule_save()
        return favorite

    def _schedule_save(self) -> None:
        self._store.async_delay_save(self._snapshot, delay=1)

    def _snapshot(self) -> dict[str, Any]:
        return {
            "templates": self._templates,
            "recent": self._recent,
            "favorites": self._favorites,
            "history": self._history,
        }

    async def async_flush(self) -> None:
        """Write pending changes now (used when the integration unloads)."""
        await self._store.async_save(self._snapshot())


def _now() -> str:
    return datetime.now(UTC).isoformat(timespec="seconds")
