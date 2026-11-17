"""The shipped blueprints must load in Home Assistant and only call services that exist."""

import inspect
import re
from pathlib import Path

import pytest

pytest.importorskip("pytest_homeassistant_custom_component")

import yaml
from homeassistant.components.blueprint import models, schemas
from homeassistant.util.yaml import load_yaml_dict

ROOT = Path(__file__).resolve().parents[2]
BLUEPRINTS = sorted((ROOT / "blueprints").rglob("*.yaml"))
SERVICES = yaml.safe_load((ROOT / "custom_components/escpos_designer/services.yaml").read_text())
_TAKES_SCHEMA = "schema" in inspect.signature(models.Blueprint.__init__).parameters
SOURCE_PREFIX = (
    "https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration/blob/main/"
)


def _inputs(blueprint_data):
    """All input names, including those inside collapsible sections."""
    names = set()
    for name, value in blueprint_data["blueprint"]["input"].items():
        if isinstance(value, dict) and "input" in value:
            names.update(value["input"])
        else:
            names.add(name)
    return names


def test_there_are_blueprints():
    assert len(BLUEPRINTS) >= 5


@pytest.mark.parametrize("path", BLUEPRINTS, ids=lambda p: str(p.relative_to(ROOT)))
class TestBlueprint:
    def test_home_assistant_accepts_it(self, path):
        data = load_yaml_dict(str(path))
        # Newer Home Assistant versions want the schema passed in.
        extra = {"schema": schemas.BLUEPRINT_SCHEMA} if _TAKES_SCHEMA else {}
        blueprint = models.Blueprint(data, expected_domain=path.parent.parent.name, **extra)
        assert blueprint.metadata["author"] == "seb5594"
        assert blueprint.name and blueprint.metadata["description"]

    def test_every_input_is_used_and_every_reference_exists(self, path):
        text = path.read_text()
        declared = _inputs(yaml.safe_load(re.sub(r"!input", "", text)))
        referenced = set(re.findall(r"!input\s+(\w+)", text))
        assert referenced == declared

    def test_source_url_points_at_the_file(self, path):
        data = load_yaml_dict(str(path))
        expected = SOURCE_PREFIX + str(path.relative_to(ROOT))
        assert data["blueprint"]["source_url"] == expected

    def test_every_input_has_a_name_and_a_selector(self, path):
        data = yaml.safe_load(re.sub(r"!input", "", path.read_text()))
        for name, value in data["blueprint"]["input"].items():
            children = value.get("input", {name: value})
            for child_name, child in children.items():
                assert child.get("name"), child_name
                assert "selector" in child, child_name

    def test_only_existing_designer_services_are_called(self, path):
        called = set(re.findall(r"action:\s+escpos_designer\.(\w+)", path.read_text()))
        assert called and called <= set(SERVICES)

    def test_built_in_template_ids_exist(self, path):
        from custom_components.escpos_designer.templates import load_builtin_templates  # noqa: PLC0415

        known = load_builtin_templates()
        for template_id in re.findall(r"builtin:\w+", path.read_text()):
            assert template_id in known, template_id
