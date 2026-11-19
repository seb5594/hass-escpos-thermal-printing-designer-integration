"""Static checks that need no Home Assistant installation."""

import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COMPONENT = next((ROOT / "custom_components").iterdir())


def _key_paths(node, prefix=""):
    """All dotted key paths of a nested dict, e.g. ``config.step.user.title``."""
    if not isinstance(node, dict):
        return {prefix}
    paths = set()
    for key, child in node.items():
        paths |= _key_paths(child, f"{prefix}.{key}" if prefix else key)
    return paths


class IntegrationLayout(unittest.TestCase):
    def test_manifest_domain_matches_folder_and_constants(self):
        manifest = json.loads((COMPONENT / "manifest.json").read_text())
        self.assertEqual(manifest["domain"], COMPONENT.name)
        self.assertIn(f'DOMAIN = "{COMPONENT.name}"', (COMPONENT / "const.py").read_text())

    def test_translations_mirror_strings(self):
        strings = json.loads((COMPONENT / "strings.json").read_text())
        english = json.loads((COMPONENT / "translations/en.json").read_text())
        self.assertEqual(strings, english)

    def test_every_translation_has_the_keys_of_english(self):
        english = _key_paths(json.loads((COMPONENT / "translations/en.json").read_text()))
        for path in (COMPONENT / "translations").glob("*.json"):
            with self.subTest(language=path.stem):
                self.assertEqual(english, _key_paths(json.loads(path.read_text())))

    def test_version_follows_the_date_scheme(self):
        manifest = json.loads((COMPONENT / "manifest.json").read_text())
        self.assertRegex(manifest["version"], r"^\d{4}\.\d{2}\.\d{2}(\.\d+)?$")


if __name__ == "__main__":
    unittest.main()
