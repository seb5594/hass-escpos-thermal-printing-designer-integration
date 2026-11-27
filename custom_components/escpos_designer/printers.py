"""Find the printers of the ESC/POS Thermal Printer integration."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.helpers import device_registry as dr

from .const import PRINTER_DOMAIN

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)
DEFAULT_WIDTH = 384


def list_printers(hass: HomeAssistant) -> list[dict[str, Any]]:
    """The configured printers with the device id used to address them."""
    registry = dr.async_get(hass)
    printers = []
    for entry in hass.config_entries.async_entries(PRINTER_DOMAIN):
        devices = dr.async_entries_for_config_entry(registry, entry.entry_id)
        device_id = devices[0].id if devices else None
        printers.append(
            {
                "id": device_id or entry.entry_id,
                "device_id": device_id,
                "name": (devices[0].name_by_user or devices[0].name) if devices else entry.title,
                "width": _printer_width(hass, entry),
                "label_height": _label_height(entry),
                "connection": entry.data.get("connection_type"),
            }
        )
    return printers


def _printer_width(hass: HomeAssistant, entry: ConfigEntry) -> int | None:
    """Pixel width of the printer's paper, if the integration can tell."""
    adapter = getattr(getattr(entry, "runtime_data", None), "adapter", None)
    getter = getattr(adapter, "get_profile_pixel_width", None)
    if getter is None:
        return None
    try:
        width = getter(hass)
    except Exception as err:  # the adapter belongs to another integration
        _LOGGER.debug("Could not read the paper width of %s: %s", entry.title, err)
        return None
    return int(width) if isinstance(width, int) and width > 0 else None


def _label_height(entry: ConfigEntry) -> int | None:
    """Dots along the feed of one label, for label printers (else ``None``)."""
    adapter = getattr(getattr(entry, "runtime_data", None), "adapter", None)
    getter = getattr(adapter, "get_profile_label_height", None)
    if getter is None:
        return None
    try:
        height = getter()
    except Exception as err:  # older versions of the printer integration have no such method
        _LOGGER.debug("Could not read the label height of %s: %s", entry.title, err)
        return None
    return int(height) if isinstance(height, int) and height > 0 else None


def resolve_device_ids(hass: HomeAssistant, requested: list[str] | None) -> list[str]:
    """The printers to print on: the requested ones, or the only one there is."""
    printers = list_printers(hass)
    known = {printer["device_id"] for printer in printers if printer["device_id"]}
    if requested:
        unknown = [device for device in requested if device not in known]
        if unknown:
            raise ValueError(f"unknown printer: {', '.join(unknown)}")
        return requested
    if len(known) == 1:
        return list(known)
    raise ValueError("select a printer" if known else "no printer is set up")
