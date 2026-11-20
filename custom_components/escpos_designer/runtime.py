"""Objects the loaded integration shares between the websocket API and the services."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any

from homeassistant.config_entries import ConfigEntry

from .const import (
    CONF_HISTORY_SIZE,
    CONF_REQUIRE_ADMIN,
    DEFAULT_HISTORY_SIZE,
    DEFAULT_REQUIRE_ADMIN,
)
from .templates import describe, history_record, is_builtin, is_history, summarize

if TYPE_CHECKING:
    from .rendering import DesignRenderer
    from .storage import DesignStorage


@dataclass(slots=True)
class DesignerData:
    """Everything a loaded entry owns."""

    storage: DesignStorage
    renderer: DesignRenderer
    builtin: dict[str, dict[str, Any]]
    history_size: int = DEFAULT_HISTORY_SIZE
    thumbnails: dict[tuple[str, str, str], str] = field(default_factory=dict)

    def find(self, template_id: str) -> dict[str, Any] | None:
        """A template by id: built-in, stored, or an entry of the print history."""
        if is_history(template_id):
            entry = self.storage.get_history(template_id)
            return history_record(entry) if entry else None
        if is_builtin(template_id):
            return self.builtin.get(template_id)
        return self.storage.get(template_id)

    def library(self, language: str) -> dict[str, Any]:
        """Everything the gallery shows: all templates plus the recent and favorite lists."""
        records = {**self.builtin, **self.storage.templates}
        return {
            "templates": [summarize(tid, record, language) for tid, record in records.items()],
            "recent": [tid for tid in self.storage.recent if tid in records],
            "favorites": [tid for tid in self.storage.favorites if tid in records],
            "history": [
                summarize(entry["id"], history_record(entry), language)
                for entry in self.storage.history
            ],
        }

    def describe(self, template_id: str, language: str) -> dict[str, Any] | None:
        record = self.find(template_id)
        return describe(template_id, record, language) if record else None


type DesignerConfigEntry = ConfigEntry[DesignerData]


def require_admin(entry: ConfigEntry) -> bool:
    """Whether only administrators may use the designer (the default)."""
    return bool(entry.options.get(CONF_REQUIRE_ADMIN, DEFAULT_REQUIRE_ADMIN))


def history_size(entry: ConfigEntry) -> int:
    """How many printed designs to remember (0 turns the history off)."""
    return int(entry.options.get(CONF_HISTORY_SIZE, DEFAULT_HISTORY_SIZE))
