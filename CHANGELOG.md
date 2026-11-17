# Changelog

Versions follow `YYYY.MM.DD.BUILD`.

## Unreleased

- Template gallery: 20 designs in English and German - shopping and to-do lists, Wi-Fi and contact QR cards, love letters, best-before, freezer and medicine labels, receipts and more - each with fill-in values.
- Characters a font doesn't have are drawn with a fallback font.
- Backend: template storage with favorites and the last ten designs, websocket API for the panel, printing through the ESC/POS Thermal Printer integration, the `print_template` and `print_todo_list` services.
- Design engine: rich text with per-segment fonts and styles, Markdown/HTML scripting, emoji, QR codes, barcodes, pictures, dividers, frames.
- Project set up: config flow that checks for the ESC/POS Thermal Printer integration and points to HACS when it is missing, Repairs hints, English and German translations.
