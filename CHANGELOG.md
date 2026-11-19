# Changelog

Versions follow `YYYY.MM.DD[.BUILD]`: the first build of a day has no suffix.

## 2026.11.19

- First release.
- Documentation: README in English and German with screenshots, scripting guide, template guide, document format, architecture notes and contributing guide.
- Gallery cards have a menu entry that copies the template id.
- Blueprints: print any template or the shopping list from a script, a best-before label script, and automations for to-do lists on any trigger, the Wi-Fi guest card and a good-morning note.
- Template gallery: 20 designs in English and German - shopping and to-do lists, Wi-Fi and contact QR cards, love letters, best-before, freezer and medicine labels, receipts and more - each with fill-in values.
- Characters a font doesn't have are drawn with a fallback font.
- Backend: template storage with favorites and the last ten designs, websocket API for the panel, printing through the ESC/POS Thermal Printer integration, the `print_template` and `print_todo_list` services.
- Design engine: rich text with per-segment fonts and styles, Markdown/HTML scripting, emoji, QR codes, barcodes, pictures, dividers, frames.
- Project set up: config flow that checks for the ESC/POS Thermal Printer integration and points to HACS when it is missing, Repairs hints, English and German translations.
