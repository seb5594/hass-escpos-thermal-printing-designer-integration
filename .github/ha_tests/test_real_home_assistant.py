"""The integration inside a genuine Home Assistant core.

They need Home Assistant and pytest-homeassistant-custom-component. The shared
engine installs both for every release the Compatibility workflow lists; to run them
locally: python .engine/.scripts/ha_matrix.py run 2026.9.4
"""

from pathlib import Path
from unittest.mock import patch

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

from homeassistant.config_entries import ConfigEntryState
from homeassistant.helpers import issue_registry as ir
from homeassistant.loader import IntegrationNotFound
from pytest_homeassistant_custom_component.common import MockConfigEntry

DOMAIN = next((Path(__file__).resolve().parents[2] / "custom_components").iterdir()).name
PRINTER_DOMAIN = "escpos_printer"
GET_INTEGRATION = f"custom_components.{DOMAIN}.dependency.async_get_integration"


@pytest.fixture
def printer_integration_installed():
    """Pretend the ESC/POS Thermal Printer integration is installed."""
    with patch(GET_INTEGRATION):
        yield


@pytest.fixture
def printer_integration_missing():
    """Pretend the ESC/POS Thermal Printer integration is not installed."""
    with patch(GET_INTEGRATION, side_effect=IntegrationNotFound(PRINTER_DOMAIN)) as mock:
        yield mock


async def test_user_flow_creates_the_single_entry_and_refuses_a_second(
    hass, printer_integration_installed
):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "form"
    assert result["step_id"] == "user"
    assert result["description_placeholders"] == {"printer_count": "0"}
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] == "create_entry"
    await hass.async_block_till_done()
    again = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert again["type"] == "abort" and again["reason"] == "single_instance_allowed"


async def test_user_flow_counts_the_configured_printers(hass, printer_integration_installed):
    MockConfigEntry(domain=PRINTER_DOMAIN, title="Kitchen").add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["description_placeholders"] == {"printer_count": "1"}


async def test_missing_printer_integration_leads_the_user_to_hacs(
    hass, printer_integration_missing
):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
    assert result["type"] == "form"
    assert result["step_id"] == "install_printer_integration"
    assert (
        "my.home-assistant.io/redirect/hacs_repository"
        in result["description_placeholders"]["hacs_url"]
    )

    # Submitting before the install keeps the user on the same step with a hint.
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["step_id"] == "install_printer_integration"
    assert result["errors"] == {"base": "printer_integration_missing"}

    # After installing and restarting, "Submit" moves on to the normal setup.
    printer_integration_missing.side_effect = None
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["step_id"] == "user"


async def test_entry_loads_and_unloads(hass, printer_integration_installed):
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    assert entry.state is ConfigEntryState.LOADED
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_repair_issue_asks_for_the_missing_printer_integration(
    hass, printer_integration_missing
):
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)

    registry = ir.async_get(hass)
    issue = registry.async_get_issue(DOMAIN, "printer_integration_missing")
    assert issue is not None
    assert issue.learn_more_url.startswith("https://my.home-assistant.io/redirect/hacs_repository")
    assert registry.async_get_issue(DOMAIN, "no_printer_configured") is None


async def test_repair_issue_asks_for_a_printer_and_clears_once_one_exists(
    hass, printer_integration_installed
):
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    registry = ir.async_get(hass)
    assert registry.async_get_issue(DOMAIN, "no_printer_configured") is not None
    assert registry.async_get_issue(DOMAIN, "printer_integration_missing") is None

    MockConfigEntry(domain=PRINTER_DOMAIN).add_to_hass(hass)
    await hass.config_entries.async_reload(entry.entry_id)
    assert registry.async_get_issue(DOMAIN, "no_printer_configured") is None


async def test_options_flow_saves_the_choices(hass, printer_integration_installed):
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["step_id"] == "init"
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"show_in_sidebar": False, "require_admin": False}
    )
    assert result["type"] == "create_entry"
    assert entry.options == {"show_in_sidebar": False, "require_admin": False}
