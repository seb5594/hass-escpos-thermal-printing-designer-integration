"""Send a rendered design to the ESC/POS Thermal Printer integration."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN, PRINTER_DOMAIN
from .printers import resolve_device_ids

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .rendering import DesignRenderer

PRINT_SERVICE = "print_image"
MAX_COPIES = 10


async def async_print_design(
    hass: HomeAssistant,
    renderer: DesignRenderer,
    document: dict[str, Any],
    *,
    variables: dict[str, Any] | None = None,
    device_ids: list[str] | None = None,
    copies: int = 1,
    fit: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Render ``document`` and print it ``copies`` times; returns a short report."""
    if not hass.services.has_service(PRINTER_DOMAIN, PRINT_SERVICE):
        raise HomeAssistantError(
            translation_domain=DOMAIN, translation_key="printer_integration_unavailable"
        )
    try:
        targets = resolve_device_ids(hass, device_ids)
    except ValueError as err:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="printer_not_selected",
            translation_placeholders={"reason": str(err)},
        ) from err

    output = await renderer.async_render(document, variables, fit=fit)
    if output.template_errors:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="template_error",
            translation_placeholders={"error": output.template_errors[0]},
        )

    image = output.to_data_uri()
    copies = max(1, min(copies, MAX_COPIES))
    for _ in range(copies):
        await hass.services.async_call(
            PRINTER_DOMAIN,
            PRINT_SERVICE,
            {
                "image": image,
                "device_id": targets,
                "align": "center",
                "dither": "none",
                "cut": output.options["cut"],
                "feed": output.options["feed"],
            },
            blocking=True,
        )
    return {
        "printers": targets,
        "copies": copies,
        "width": output.image.width,
        "height": output.image.height,
        "warnings": output.warnings,
    }
