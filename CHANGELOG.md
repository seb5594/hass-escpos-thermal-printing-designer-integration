# Changelog

Versions follow `YYYY.MM.DD[.BUILD]`: the first build of a day has no suffix.

## Unreleased

- A live demo on GitHub Pages runs the real design engine in the browser (no printer; "Print" saves a PNG).

## 2026.11.20

- Fixed the editor on phones: the Preview and Design tabs showed nothing.
- Fixed the gallery on phones: cards keep their full title, the card actions open in a dialog that can't be cut off, and the footer credit breaks into two lines.
- Dialogs and buttons keep clear of the system navigation bar on phones; the print dialog no longer runs off the screen.
- New **Entity** value type: the print dialog offers a dropdown of matching entities (for example every weather entity) and preselects the first one.
- Weather texts use `state_translated()` and follow the Home Assistant language.
- New **Recently printed** filter: the last prints (10 by default, configurable) with their values, to print again or save as a template.
- New frame styles `hearts` and `stars`.
- 19 new designs: love letter with hearts, birthday card, thank-you note, invitation, quote card, family note, weather, sticker chart, daily planner, packing list, recipe card, meal plan, name badge, plant tag and parcel label.
- Long-text values get a larger input field.
- Four more shopping lists (market, bold, with write-in lines, with store and budget). Shopping lists preselect the to-do list whose name looks like a shopping list.

## 2026.11.19.1

- Your own designs can be selected in the gallery and deleted, one or many at once.
- Fixed the card menu being clipped on phones, which made "Delete" unreachable.

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
