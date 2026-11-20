"""ESC/POS Thermal Printer Designer for Home Assistant."""

from __future__ import annotations

from typing import TYPE_CHECKING

from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .const import DOMAIN
from .dependency import async_sync_dependency_issues
from .panel import async_register_panel, async_remove_panel
from .rendering import DesignRenderer
from .runtime import DesignerConfigEntry, DesignerData, history_size
from .services import async_register_services
from .storage import DesignStorage
from .templates import load_builtin_templates
from .websocket_api import async_register_commands

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the websocket commands and services once."""
    async_register_commands(hass)
    async_register_services(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: DesignerConfigEntry) -> bool:
    """Set up the designer from a config entry."""
    await async_sync_dependency_issues(hass)

    storage = DesignStorage(hass)
    await storage.async_load()
    builtin = await hass.async_add_executor_job(load_builtin_templates)
    entry.runtime_data = DesignerData(
        storage, DesignRenderer(hass), builtin, history_size=history_size(entry)
    )

    integration = await async_get_integration(hass, DOMAIN)
    await async_register_panel(hass, entry, str(integration.version))
    entry.async_on_unload(lambda: async_remove_panel(hass))

    entry.async_on_unload(entry.add_update_listener(_async_reload_on_options_change))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: DesignerConfigEntry) -> bool:
    """Unload the config entry, saving what is pending."""
    await entry.runtime_data.storage.async_flush()
    return True


async def _async_reload_on_options_change(hass: HomeAssistant, entry: DesignerConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
