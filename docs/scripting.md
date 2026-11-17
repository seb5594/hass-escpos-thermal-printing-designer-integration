# Scripting guide

The **Markdown script** element lets you write a design as text. It understands a small, forgiving subset of Markdown plus a few HTML-style tags, and expands into the same elements you could add by hand. The script is processed after [Home Assistant templates](https://www.home-assistant.io/docs/configuration/templating/), so `{{ ... }}` works inside it.

One line of the script is one printed line; blank lines become a small gap.

## Blocks

| Write | Result |
|-------|--------|
| `# Title` / `## Title` / `### Title` | Bold heading in three sizes |
| `- item` or `* item` | Bullet |
| `- [ ] task` / `- [x] done` | Checkbox, empty or checked |
| `1. step` | Numbered item (keeps your number) |
| `> quote` | Italic line with a bar in front |
| `---` | Solid line |
| `===` | Double line |
| `***` | A row of stars |
| `...` | Dotted line |
| `~~~` | Wave |
| `[[qr:https://example.com]]` | QR code |
| `[[barcode:code128:12345]]` | Barcode (`code128`, `code39`, `ean13`) |
| `[[space:24]]` | 24 pixels of empty space |

Align lines with `<left>`, `<center>` and `<right>`, either around several lines or on a single line:

```markdown
<center>
# Title
Subtitle
</center>
<right>Page 1</right>
```

## Inline styles

| Write | Result |
|-------|--------|
| `**bold**` or `__bold__` | **Bold** |
| `*italic*` or `_italic_` | *Italic* |
| `~~strike~~` | ~~Strikethrough~~ |
| `++underline++` | Underline |
| `==inverted==` | White on black |
| `` `code` `` | Monospace |
| `<b>`, `<i>`, `<u>`, `<s>`, `<mark>` | Bold, italic, underline, strikethrough, inverted |
| `<big>`…`</big>` / `<small>`…`</small>` | 40 % larger / 30 % smaller |
| `<size=40>`…`</size>` | An exact pixel size |
| `<font=script>`…`</font>` | Another font |

Styles can be combined and nested: `**bold and *italic***`. A backslash prints the next character as it is: `\*`.
Underscores inside words (`snake_case`) are left alone.

### Fonts

`sans`, `mono`, `serif`, `typewriter`, `vintage`, `elegant`, `display`, `handwriting` and `script`. Characters a font doesn't have, such as ♥ in a handwriting font, are drawn with a fallback font, and emoji use the bundled monochrome emoji font.

## Example

```markdown
<center>
<font=script><size=56>Happy Birthday</size></font>
{{ vars.name }} 🎉
</center>
---
==Plans for today==
- [ ] Cake 🎂
- [ ] Presents 🎁
[[barcode:code128:{{ now().strftime('%Y%m%d') }}]]
```

## Things to know

- Pictures, frames and paper settings belong to the design, not the script.
- A QR code or barcode that cannot be drawn (too much data, characters the barcode doesn't support) is replaced by a warning in the preview; the rest of the design still renders.
- Use the **Syntax overview** under the script field in the designer for a quick reminder.
