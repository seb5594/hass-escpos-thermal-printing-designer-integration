# Architecture

The integration has three layers that only know each other through small interfaces.

```
 Browser                        Home Assistant                         Printer
┌───────────────┐  websocket  ┌─────────────────────────┐  services  ┌────────────────────┐
│ panel (Lit +  │────────────▶│ websocket_api, services │───────────▶│ escpos_printer     │
│ Material Web) │◀────────────│ storage, printing       │ print_image│ (original or fork) │
└───────────────┘   preview   │  ┌───────────────────┐  │            └────────────────────┘
                              │  │ rendering.py      │  │
                              │  │ Jinja + todo data │  │
                              │  └─────────┬─────────┘  │
                              │  ┌─────────▼─────────┐  │
                              │  │ designer/ engine  │  │  pure Python + Pillow
                              │  └───────────────────┘  │
                              └─────────────────────────┘
```

## The design engine (`designer/`)

No Home Assistant imports, so it is easy to test and reason about. A render has three steps:

1. **Validate** (`schema.py`): turns a raw document into a complete one with defaults. Voluptuous schemas, one per element type.
2. **Resolve** (`resolve.py`, `markup.py`): everything that depends on the outside world is passed in: the current time, a function that renders template strings and the items of todo lists. Dates, Markdown scripts, lists and stickers expand into a handful of primitive elements: `text`, `divider`, `qr`, `barcode`, `image`, `spacer`.
3. **Draw** (`renderer.py`, `text_layout.py`, `widgets.py`): every element becomes a grayscale block, the blocks are stacked, framed and converted to a 1-bit image.

Text layout (`text_layout.py`) breaks runs into words and wraps them, draws without anti-aliasing so thresholds don't fray the glyphs, handles bold (stroke), italic (shear), underline, strikethrough and inverted text, and falls back to another font for characters a font lacks. Barcodes are encoded in `codes.py` and checked against the reference output of the `python-barcode` library.

## The Home Assistant layer

| Module | Responsibility |
|--------|----------------|
| `config_flow.py`, `dependency.py` | Setup dialog, detection of the printer integration, Repairs issues |
| `rendering.py` | Renders template strings once each in the event loop, fetches todo items, draws in the executor |
| `printing.py`, `printers.py` | Finds printers (device registry) and sends the image to `escpos_printer.print_image` |
| `storage.py`, `templates.py` | User templates, favorites and recent designs (`.storage`), the built-in gallery |
| `websocket_api.py` | The commands the panel uses; checks the user's rights |
| `services.py` | `print_template` and `print_todo_list` |
| `panel.py` | Serves the bundle and registers the sidebar panel |

Why an image? The printer integration supports network, USB, Bluetooth and serial printers with different codepages. A rendered bitmap prints identically on all of them and lifts every limit of text mode: fonts, mixed sizes within a line, emoji, QR codes and pictures.

## The panel (`frontend/`)

A Lit app using Material Web components, themed from Home Assistant's CSS variables. `panel.js` owns navigation; `gallery-view` and `editor-view` are the two screens; the components in `components/` are small and receive everything through properties. The editor keeps the document, a snapshot-based undo history and a debounced preview request; the preview is the server's PNG, so it is always exact. The bundle is built with esbuild and committed.

## Decisions worth knowing

- **Administrators only by default.** Templates can read states, so the websocket commands check `is_admin` unless the option allows everyone.
- **Templates are rendered once per distinct string**, in the event loop, before the CPU-heavy drawing moves to the executor.
- **Built-in templates carry a document per language** instead of language switches inside templates, so editing one in your language shows plain text.
- **No extra runtime dependency beyond `qrcode`.** Barcodes are encoded in-house; Pillow ships with Home Assistant.
