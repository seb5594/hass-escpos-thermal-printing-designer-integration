# Design document format

A design is plain JSON, so it can be stored, versioned and edited by hand. The designer validates every document and fills in defaults, so a minimal document is enough. Unknown keys are ignored.

```json
{
  "name": "Best before",
  "paper": {"width": 320, "height": 240},
  "frame": {"style": "rounded", "thickness": 3, "padding": 8},
  "options": {"cut": "partial", "feed": 2, "margin": 8},
  "elements": [
    {"type": "text", "align": "center", "runs": [{"text": "{{ vars.name }}", "font": "display", "size": 48}]},
    {"type": "divider", "style": "dashed"}
  ]
}
```

## Document

| Key | Values | Default |
|-----|--------|---------|
| `paper.width` | 64–1024 dots (384 is a 58 mm roll, 576 an 80 mm roll) | 384 |
| `paper.height` | `null` for a continuous roll, or 16–4096 dots for a fixed-size label | `null` |
| `frame.style` | `none`, `line`, `double`, `rounded`, `dashed`, `dotted`, `brackets`, `ticket` | `none` |
| `frame.thickness`, `frame.padding` | 1–12, 0–80 | 3, 10 |
| `options.cut` | `none`, `partial`, `full` | `partial` |
| `options.feed` | 0–30 lines after printing | 2 |
| `options.rotate` | 0, 90, 180, 270 | 0 |
| `options.mirror`, `options.invert` | booleans | `false` |
| `options.margin` | 0–80 | 8 |
| `elements` | up to 200 elements, drawn top to bottom | `[]` |

## Elements

Every element has `type` and these common keys: `align` (`left`, `center`, `right`), `margin_top`, `margin_bottom` (0–200) and `hidden`.

Text style keys, used by runs, dates and lists: `font`, `size` (8–240), `bold`, `italic`, `underline`, `strike`, `invert`.

| `type` | Keys |
|--------|------|
| `text` | `runs`: list of `{text, <style keys>}`; `line_spacing` 0.8–3; `bullet` |
| `markdown` | `source`, `font`, `size`, `bold`, `italic`, `underline`, `strike` |
| `datetime` | `format` (strftime, with `%A %a %B %b` in your language), `prefix`, `suffix`, `offset_days`, `offset_hours`, style keys |
| `list` | `source`: `{kind: "static", items: [...]}` or `{kind: "todo", entity_id, include_completed, limit}`; `style`: `checkbox`, `bullet`, `dash`, `numbered`, `none`; `empty_text`; `show_notes`; style keys |
| `divider` | `style`: `solid`, `dashed`, `dotted`, `double`, `wave`, `zigzag`, `stars`, `hearts`; `thickness` 1–12; `width_pct` 10–100 |
| `qr` | `data`, `size_pct` 10–100, `level` `L`/`M`/`Q`/`H`, `caption`, `caption_font`, `caption_size` |
| `barcode` | `kind` (`code128`, `code39`, `ean13`), `data`, `height`, `module_width`, `show_text` |
| `image` | `data` (a `data:image/...;base64,` URI), `width_pct`, `dither` (`floyd-steinberg`, `threshold`), `threshold` |
| `sticker` | `emoji`, `size` |
| `spacer` | `height` |

List items are `{text, done, note}` objects or plain strings.

Any string may contain Home Assistant template syntax (`{{ ... }}`). The values of a template's fill-in variables are available as `vars.<name>`.

## Templates

A template wraps a document with metadata:

```json
{
  "name": {"en": "Best-before label", "de": "Mindesthaltbarkeits-Etikett"},
  "description": {"en": "...", "de": "..."},
  "category": "food",
  "tags": ["label", "mhd"],
  "variables": [
    {"key": "days", "type": "number", "label": {"en": "Keeps for (days)", "de": "Haltbar (Tage)"}, "default": 7}
  ],
  "document": {},
  "documents": {"de": {}}
}
```

`documents` holds a document per language; `document` is the fallback. Names, descriptions, labels and defaults can be a plain value or an object with one entry per language. The built-in templates live in [`builtin_templates/`](../custom_components/escpos_designer/builtin_templates).
