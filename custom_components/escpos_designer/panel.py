"""The sidebar panel: serves the bundled web app and registers it with Home Assistant."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig

from .const import (
    CONF_SHOW_IN_SIDEBAR,
    DEFAULT_SHOW_IN_SIDEBAR,
    DOMAIN,
    PANEL_ELEMENT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_PATH,
)
from .runtime import require_admin

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

FRONTEND_DIR = Path(__file__).resolve().parent / "frontend"
PANEL_MODULE = "escpos-designer-panel.js"
_STATIC_REGISTERED = f"{DOMAIN}_static_registered"


async def async_register_panel(hass: HomeAssistant, entry: ConfigEntry, version: str) -> None:
    """Serve the bundle and add the panel; ``version`` busts the browser cache on updates."""
    if not hass.data.get(_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_PATH, str(FRONTEND_DIR), cache_headers=True)]
        )
        hass.data[_STATIC_REGISTERED] = True

    in_sidebar = entry.options.get(CONF_SHOW_IN_SIDEBAR, DEFAULT_SHOW_IN_SIDEBAR)
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=PANEL_ELEMENT,
        frontend_url_path=PANEL_URL_PATH,
        module_url=f"{STATIC_URL_PATH}/{PANEL_MODULE}?v={version}",
        sidebar_title=PANEL_TITLE if in_sidebar else None,
        sidebar_icon=PANEL_ICON if in_sidebar else None,
        require_admin=require_admin(entry),
        config={},
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Take the panel out of the sidebar."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
