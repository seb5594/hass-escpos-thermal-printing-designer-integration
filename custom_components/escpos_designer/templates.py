"""Design templates: the stored record, the built-in gallery and localized text.

A template is a design plus the metadata the gallery needs and optional
*variables*, the blanks a user fills in before printing (a Wi-Fi name, a
todo list, a date). Names, descriptions and variable labels may be given as a
plain string or as ``{"en": ..., "de": ...}``.
"""

from __future__ import annotations

import json
import uuid
from pathlib import Path
from typing import Any

import voluptuous as vol

from .designer import DocumentError, normalize_document

BUILTIN_DIR = Path(__file__).resolve().parent / "builtin_templates"
BUILTIN_PREFIX = "builtin:"
HISTORY_PREFIX = "history:"
CATEGORIES = ("shopping", "todo", "qr", "love", "label", "food", "receipt", "fun", "custom")
VARIABLE_TYPES = ("text", "multiline", "number", "boolean", "select", "date", "todo", "entity")
MAX_TEMPLATES = 300
DEFAULT_LANGUAGE = "en"

_LOCALIZED = vol.Any(
    # A dict has to be tried first: ``vol.Coerce(str)`` would turn it into its repr.
    vol.Schema({vol.Coerce(str): vol.All(str, vol.Length(max=200))}),
    vol.All(str, vol.Length(max=200)),
)

_VARIABLE = vol.Schema(
    {
        vol.Required("key"): vol.All(vol.Coerce(str), vol.Match(r"^[a-z][a-z0-9_]{0,31}$")),
        vol.Optional("type", default="text"): vol.In(VARIABLE_TYPES),
        vol.Optional("label", default=""): _LOCALIZED,
        # A default may differ per language, e.g. the example product of a label.
        vol.Optional("default", default=""): vol.Any(
            vol.Schema({vol.Coerce(str): vol.Any(str, int, float, bool)}), str, int, float, bool
        ),
        vol.Optional("options", default=list): [vol.All(vol.Coerce(str), vol.Length(max=80))],
        # For ``entity`` variables: only entities of this domain are offered (e.g. ``weather``).
        # Words that identify the wanted entity (e.g. ``shopping``, ``einkauf``): a
        # missing default is replaced by the entity whose id or name contains one.
        vol.Optional("hints", default=list): vol.All(
            [vol.All(vol.Coerce(str), vol.Length(max=40))], vol.Length(max=8)
        ),
        vol.Optional("domain", default=""): vol.All(vol.Coerce(str), vol.Match(r"^[a-z_]{0,40}$")),
    },
    extra=vol.REMOVE_EXTRA,
)

_VARIABLES = vol.All([_VARIABLE], vol.Length(max=12))

_TEMPLATE = vol.Schema(
    {
        vol.Required("name"): _LOCALIZED,
        vol.Optional("description", default=""): _LOCALIZED,
        vol.Optional("category", default="custom"): vol.In(CATEGORIES),
        vol.Optional("tags", default=list): vol.All(
            [vol.All(vol.Coerce(str), vol.Length(max=40))], vol.Length(max=12)
        ),
        vol.Optional("variables", default=list): _VARIABLES,
        vol.Required("document"): dict,
        # Built-in templates ship a document per language; ``document`` is the fallback.
        vol.Optional("documents", default=dict): {vol.Coerce(str): dict},
    },
    extra=vol.REMOVE_EXTRA,
)


class TemplateError(ValueError):
    """A template record is invalid."""


def normalize_template(raw: Any) -> dict[str, Any]:
    """Validate a template record, including its design document."""
    if not isinstance(raw, dict):
        raise TemplateError("a template must be an object")
    try:
        record = _TEMPLATE(raw)
        record["document"] = normalize_document(record["document"])
        record["documents"] = {
            language: normalize_document(document)
            for language, document in record["documents"].items()
        }
    except vol.Invalid as err:
        path = ".".join(str(part) for part in err.path)
        raise TemplateError(f"{path}: {err.error_message}" if path else err.error_message) from err
    except DocumentError as err:
        raise TemplateError(f"document.{err}") from err
    return record


def normalize_variables(raw: Any) -> list[dict[str, Any]]:
    """Validate a list of variable definitions."""
    try:
        return _VARIABLES(raw)  # type: ignore[no-any-return]
    except vol.Invalid as err:
        raise TemplateError(f"variables: {err.error_message}") from err


def new_template_id() -> str:
    """A fresh id for a user template."""
    return uuid.uuid4().hex[:12]


def is_builtin(template_id: str) -> bool:
    return template_id.startswith(BUILTIN_PREFIX)


def is_history(template_id: str) -> bool:
    return template_id.startswith(HISTORY_PREFIX)


def history_record(entry: dict[str, Any]) -> dict[str, Any]:
    """Present a printed design as a template whose variables default to what was printed."""
    values = entry.get("values", {})
    variables = [
        {**variable, "default": values.get(variable["key"], variable["default"])}
        for variable in entry.get("variables", [])
    ]
    return {
        "name": entry["name"],
        "description": "",
        "category": "history",
        "tags": [],
        "variables": variables,
        "document": entry["document"],
        "documents": {},
        "updated_at": entry["printed_at"],
        "printed_at": entry["printed_at"],
    }


def localize(value: Any, language: str) -> str:
    """Pick ``language`` (or the base language, or English, or anything) from a localized value."""
    if isinstance(value, str):
        return value
    if not value:
        return ""
    base = language.split("-", maxsplit=1)[0].lower()
    for key in (language, base, DEFAULT_LANGUAGE):
        if key in value:
            return str(value[key])
    return str(next(iter(value.values())))


def document_for(record: dict[str, Any], language: str) -> dict[str, Any]:
    """The design to use for ``language`` (the template's own, or its default)."""
    documents = record.get("documents") or {}
    for key in (language, language.split("-", maxsplit=1)[0].lower()):
        if key in documents:
            return documents[key]  # type: ignore[no-any-return]
    return record["document"]  # type: ignore[no-any-return]


def variable_defaults(record: dict[str, Any], language: str) -> dict[str, Any]:
    """The starting value of every variable of ``record`` in ``language``."""
    defaults: dict[str, Any] = {}
    for variable in record["variables"]:
        default = variable["default"]
        defaults[variable["key"]] = (
            localize(default, language) if isinstance(default, dict) else default
        )
    return defaults


def summarize(template_id: str, record: dict[str, Any], language: str) -> dict[str, Any]:
    """The gallery card of a template (no document)."""
    paper = record["document"]["paper"]
    return {
        "id": template_id,
        "builtin": is_builtin(template_id),
        "history": is_history(template_id),
        "printed_at": record.get("printed_at"),
        "name": localize(record["name"], language),
        "description": localize(record.get("description", ""), language),
        "category": record["category"],
        "tags": record["tags"],
        "paper": paper,
        "has_variables": bool(record["variables"]),
        "updated_at": record.get("updated_at"),
    }


def describe(template_id: str, record: dict[str, Any], language: str) -> dict[str, Any]:
    """A template with its design and localized variables, ready for the editor."""
    defaults = variable_defaults(record, language)
    variables = [
        {**v, "label": localize(v["label"], language) or v["key"], "default": defaults[v["key"]]}
        for v in record["variables"]
    ]
    return {
        **summarize(template_id, record, language),
        "variables": variables,
        "document": document_for(record, language),
    }


def load_builtin_templates() -> dict[str, dict[str, Any]]:
    """Read and validate the gallery that ships with the integration (blocking)."""
    templates: dict[str, dict[str, Any]] = {}
    for path in sorted(BUILTIN_DIR.glob("*.json")):
        templates[f"{BUILTIN_PREFIX}{path.stem}"] = normalize_template(
            json.loads(path.read_text(encoding="utf-8"))
        )
    return templates
