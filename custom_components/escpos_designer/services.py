"""Services other automations can call: print a saved template or a todo list."""

from __future__ import annotations

import copy
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .printing import async_print_design

if TYPE_CHECKING:
    from .runtime import DesignerData

SERVICE_PRINT_TEMPLATE = "print_template"
SERVICE_PRINT_TODO_LIST = "print_todo_list"
DEFAULT_TODO_TEMPLATE = "builtin:shopping_list"

_PRINTER_FIELDS = {
    vol.Optional("device_id"): vol.All(cv.ensure_list, [cv.string]),
    vol.Optional("copies", default=1): vol.All(vol.Coerce(int), vol.Range(min=1, max=10)),
}
PRINT_TEMPLATE_SCHEMA = vol.Schema(
    {
        vol.Required("template_id"): cv.string,
        vol.Optional("variables", default=dict): dict,
        **_PRINTER_FIELDS,
    }
)
PRINT_TODO_LIST_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Optional("template_id", default=DEFAULT_TODO_TEMPLATE): cv.string,
        vol.Optional("include_completed", default=False): cv.boolean,
        **_PRINTER_FIELDS,
    }
)


def _data(hass: HomeAssistant) -> DesignerData:
    for entry in hass.config_entries.async_loaded_entries(DOMAIN):
        return entry.runtime_data  # type: ignore[no-any-return]
    raise ServiceValidationError(translation_domain=DOMAIN, translation_key="not_set_up")


def _template_document(data: DesignerData, template_id: str) -> dict[str, Any]:
    record = data.find(template_id)
    if record is None:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="template_not_found",
            translation_placeholders={"template_id": template_id},
        )
    return record["document"]  # type: ignore[no-any-return]


def bind_todo_list(
    document: dict[str, Any], entity_id: str, include_completed: bool
) -> dict[str, Any]:
    """Copy ``document`` with every todo list element pointing at ``entity_id``.

    Raises :class:`ServiceValidationError` if the template has no todo list to bind.
    """
    bound = copy.deepcopy(document)
    lists = [
        element
        for element in bound["elements"]
        if element["type"] == "list" and element["source"]["kind"] == "todo"
    ]
    if not lists:
        raise ServiceValidationError(
            translation_domain=DOMAIN, translation_key="template_has_no_todo_list"
        )
    for element in lists:
        element["source"].update(entity_id=entity_id, include_completed=include_completed)
    return bound


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Register the services (called once from ``async_setup``)."""

    async def print_template(call: ServiceCall) -> None:
        data = _data(hass)
        template_id = call.data["template_id"]
        record = data.find(template_id)
        document = _template_document(data, template_id)
        defaults = {v["key"]: v["default"] for v in (record or {}).get("variables", [])}
        await async_print_design(
            hass,
            data.renderer,
            document,
            variables={**defaults, **call.data["variables"]},
            device_ids=call.data.get("device_id"),
            copies=call.data["copies"],
        )
        data.storage.touch(template_id)

    async def print_todo_list(call: ServiceCall) -> None:
        data = _data(hass)
        template_id = call.data["template_id"]
        document = bind_todo_list(
            _template_document(data, template_id),
            call.data["entity_id"],
            call.data["include_completed"],
        )
        await async_print_design(
            hass,
            data.renderer,
            document,
            variables={},
            device_ids=call.data.get("device_id"),
            copies=call.data["copies"],
        )
        data.storage.touch(template_id)

    hass.services.async_register(
        DOMAIN, SERVICE_PRINT_TEMPLATE, print_template, schema=PRINT_TEMPLATE_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_PRINT_TODO_LIST, print_todo_list, schema=PRINT_TODO_LIST_SCHEMA
    )
