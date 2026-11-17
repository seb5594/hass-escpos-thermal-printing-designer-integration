"""Detect the ESC/POS Thermal Printer integration and guide the user to it.

The designer prints through the ``escpos_printer`` integration, either the
original or any fork that keeps its domain and services. This module answers
two questions: is it installed, and is at least one printer configured?
It also keeps the matching Repairs issues in sync.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

from homeassistant.helpers import issue_registry as ir
from homeassistant.loader import IntegrationNotFound, async_get_integration

from .const import (
    DOMAIN,
    ISSUE_NO_PRINTER_CONFIGURED,
    ISSUE_PRINTER_INTEGRATION_MISSING,
    PRINTER_DOMAIN,
    PRINTER_HACS_URL,
    PRINTER_REPOSITORY_URL,
)

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant


@dataclass(frozen=True, slots=True)
class PrinterIntegrationStatus:
    """What is known about the printer integration right now."""

    installed: bool
    printer_entries: tuple[ConfigEntry, ...] = ()

    @property
    def printer_count(self) -> int:
        return len(self.printer_entries)

    @property
    def ready(self) -> bool:
        """True when the designer can actually print something."""
        return self.installed and self.printer_count > 0


async def async_get_printer_integration_status(hass: HomeAssistant) -> PrinterIntegrationStatus:
    """Check whether the printer integration is installed and has printers."""
    try:
        await async_get_integration(hass, PRINTER_DOMAIN)
    except IntegrationNotFound:
        return PrinterIntegrationStatus(installed=False)
    entries = tuple(hass.config_entries.async_entries(PRINTER_DOMAIN))
    return PrinterIntegrationStatus(installed=True, printer_entries=entries)


async def async_sync_dependency_issues(hass: HomeAssistant) -> PrinterIntegrationStatus:
    """Create or clear the Repairs issues that mirror the current status."""
    status = await async_get_printer_integration_status(hass)
    _set_issue(
        hass,
        ISSUE_PRINTER_INTEGRATION_MISSING,
        active=not status.installed,
        learn_more_url=PRINTER_HACS_URL,
    )
    _set_issue(
        hass,
        ISSUE_NO_PRINTER_CONFIGURED,
        active=status.installed and status.printer_count == 0,
        learn_more_url=PRINTER_REPOSITORY_URL,
    )
    return status


def _set_issue(hass: HomeAssistant, issue_id: str, *, active: bool, learn_more_url: str) -> None:
    if not active:
        ir.async_delete_issue(hass, DOMAIN, issue_id)
        return
    ir.async_create_issue(
        hass,
        DOMAIN,
        issue_id,
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key=issue_id,
        translation_placeholders={"hacs_url": PRINTER_HACS_URL},
        learn_more_url=learn_more_url,
    )
