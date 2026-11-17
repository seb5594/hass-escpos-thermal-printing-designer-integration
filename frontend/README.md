# Designer panel

The web app behind the **Printer Designer** sidebar entry. It is written with [Lit](https://lit.dev) and [Material Web](https://material-web.dev) and bundled into a single file, `custom_components/escpos_designer/frontend/escpos-designer-panel.js`, which is committed so HACS users need no build step.

```bash
cd frontend
npm install
npm run build    # bundle the panel
npm run watch    # rebuild on every change
npm test         # translation checks
```

## Try it without Home Assistant

The dev server answers the panel's websocket commands with the real design engine, so every preview is exact:

```bash
npm run build
python frontend/dev/server.py     # needs Pillow, voluptuous and qrcode
```

Open <http://localhost:8765/?lang=de&theme=dark>. Home Assistant templates are not available there; `{{ vars.name }}` works through a simple substitution.

## Layout

| Path | What lives there |
|------|------------------|
| `src/panel.js` | The sidebar panel: header, routing between gallery and editor, toasts |
| `src/views/` | `gallery-view` (templates, search, recent designs) and `editor-view` (the designer) |
| `src/components/` | Preview, element list, inspector, rich-text segment editor, settings, print dialog, emoji picker, footer |
| `src/model.js` | Element factories, undo history and other document helpers |
| `src/api.js` | The websocket commands |
| `src/i18n/` | English and German texts |
