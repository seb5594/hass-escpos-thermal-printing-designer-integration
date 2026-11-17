"""ESC/POS Thermal Printer Designer for Home Assistant."""

from __future__ import annotations

from typing import TYPE_CHECKING

from .dependency import async_sync_dependency_issues

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the designer from a config entry."""
    await async_sync_dependency_issues(hass)
    entry.async_on_unload(entry.add_update_listener(_async_reload_on_options_change))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload the config entry."""
    return True


async def _async_reload_on_options_change(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
