"""Shared fixtures for the tests that run inside a real Home Assistant core."""

import sys
from pathlib import Path

import pytest
from homeassistant.setup import async_setup_component

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# pytest-homeassistant-custom-component ships its own ``custom_components``
# package; add this repository's folder to it so both are discovered.
import custom_components

_REPO_COMPONENTS = str(ROOT / "custom_components")
if _REPO_COMPONENTS not in custom_components.__path__:
    custom_components.__path__.insert(0, _REPO_COMPONENTS)


@pytest.fixture(autouse=True)
def _enable_custom_integrations(enable_custom_integrations):
    """Let Home Assistant discover ``custom_components/`` of this repository."""
    yield


@pytest.fixture(autouse=True)
async def _core_dependencies_loaded(hass):
    """Treat the UI-related core dependencies as set up, but keep the web server real.

    The designer depends on ``frontend`` and ``panel_custom``, which pull in the
    large frontend wheel; the tests never render a page, so skip loading them.
    ``http`` and ``websocket_api`` are needed for real: some harnesses mark every
    core dependency as loaded without setting it up, so undo that when needed.
    """
    hass.config.components.update({"frontend", "panel_custom"})
    if getattr(hass, "http", None) is None:
        hass.config.components.difference_update({"http", "websocket_api"})
        assert await async_setup_component(hass, "http", {})
    yield
