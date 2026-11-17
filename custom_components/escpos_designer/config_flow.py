"""Config and options flow of the ESC/POS Thermal Printer Designer."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback

from .const import (
    CONF_REQUIRE_ADMIN,
    CONF_SHOW_IN_SIDEBAR,
    DEFAULT_REQUIRE_ADMIN,
    DEFAULT_SHOW_IN_SIDEBAR,
    DOMAIN,
    HACS_URL,
    NAME,
    PRINTER_HACS_URL,
    PRINTER_REPOSITORY_URL,
)
from .dependency import async_get_printer_integration_status


class EscposDesignerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Set up the designer; points the user to the printer integration if it is missing."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Confirm the setup, or ask for the printer integration first."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        status = await async_get_printer_integration_status(self.hass)
        if not status.installed:
            return await self.async_step_install_printer_integration()

        if user_input is not None:
            return self.async_create_entry(title=NAME, data={})
        return self.async_show_form(
            step_id="user",
            description_placeholders={"printer_count": str(status.printer_count)},
        )

    async def async_step_install_printer_integration(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Send the user to HACS; "Submit" checks again after the install and restart."""
        errors: dict[str, str] = {}
        if user_input is not None:
            status = await async_get_printer_integration_status(self.hass)
            if status.installed:
                return await self.async_step_user()
            errors["base"] = "printer_integration_missing"

        return self.async_show_form(
            step_id="install_printer_integration",
            errors=errors,
            description_placeholders={
                "hacs_url": PRINTER_HACS_URL,
                "repository_url": PRINTER_REPOSITORY_URL,
                "hacs_docs_url": HACS_URL,
            },
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Return the options flow."""
        return EscposDesignerOptionsFlow()


class EscposDesignerOptionsFlow(OptionsFlow):
    """Panel visibility and access."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_SHOW_IN_SIDEBAR,
                    default=options.get(CONF_SHOW_IN_SIDEBAR, DEFAULT_SHOW_IN_SIDEBAR),
                ): bool,
                vol.Required(
                    CONF_REQUIRE_ADMIN,
                    default=options.get(CONF_REQUIRE_ADMIN, DEFAULT_REQUIRE_ADMIN),
                ): bool,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
