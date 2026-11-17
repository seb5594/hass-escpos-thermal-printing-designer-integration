# Contributing

Thanks for helping out. Bug reports and ideas are welcome as issues; for code changes please open a pull request from a `feature/<name>` branch.

## Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install pytest-homeassistant-custom-component pillow "qrcode>=7.4.2,<9" ruff
cd frontend && npm install
```

## Checks

```bash
ruff format . && ruff check .
pytest                       # engine, backend, blueprints, templates
cd frontend && npm test      # translation checks
cd frontend && npm run build # rebuild the committed bundle after changing frontend/src
```

CI runs the same tests against every Home Assistant release from the minimum in `hacs.json`.

## Conventions

- Code, comments and commit messages are in English; keep functions small and name things for the reader.
- Versions follow `YYYY.MM.DD.BUILD` in `custom_components/escpos_designer/manifest.json`; add a line to `CHANGELOG.md` with every change.
- Every user-visible text exists in English and German (`strings.json`, `translations/`, `frontend/src/i18n/`). The tests fail when a key is missing.
- A new element type needs its schema (`designer/schema.py`), a resolver or renderer, an editor in `ed-inspector.js`, texts in both languages, tests and an entry in [`docs/document-format.md`](docs/document-format.md).

## Trying the panel without Home Assistant

See [`frontend/README.md`](frontend/README.md); `python frontend/dev/server.py` serves the panel with the real engine behind it.
