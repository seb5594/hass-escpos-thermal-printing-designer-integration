import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import * as icons from "../icons.js";
import { DATE_FORMATS, SIZE_PRESETS, elementHasAlign, pictureToDataUri } from "../model.js";
import {
  choiceChips,
  choiceIcons,
  controlStyles,
  selectField,
  sliderField,
  switchField,
  textField,
  toggleButton,
} from "../controls.js";
import "./ed-icon.js";
import "./ed-emoji-picker.js";
import "./ed-run-editor.js";
import { layoutStyles, themeTokens } from "../theme.js";

const DIVIDER_STYLES = ["solid", "dashed", "dotted", "double", "wave", "zigzag", "stars", "hearts"];
const LIST_STYLES = ["checkbox", "bullet", "dash", "numbered", "none"];
const BARCODE_KINDS = ["code128", "code39", "ean13"];
const QR_PRESETS = {
  link: "https://example.com",
  wifi: "WIFI:T:WPA;S:NetworkName;P:Password;;",
  contact: "BEGIN:VCARD\nVERSION:3.0\nFN:Name\nTEL:+49 123 456789\nEMAIL:name@example.com\nEND:VCARD",
  phone: "tel:+49123456789",
  email: "mailto:name@example.com",
  text: "Hello!",
};
const DATE_OFFSETS = [
  ["today", 0],
  ["tomorrow", 1],
  ["week", 7],
  ["two_weeks", 14],
  ["month", 30],
  ["year", 365],
];
const MARKDOWN_SNIPPETS = [
  ["heading", "# "],
  ["bold", "**bold**"],
  ["italic", "*italic*"],
  ["checkbox", "- [ ] "],
  ["bullet", "- "],
  ["divider", "\n---\n"],
  ["center", "<center>\ntext\n</center>"],
  ["qr", "[[qr:https://example.com]]"],
  ["barcode", "[[barcode:code128:12345]]"],
];

/**
 * Edits one element. Fires `element-change` with `{patch}`; the editor merges the
 * patch into the element and re-renders the preview.
 */
export class EdInspector extends LitElement {
  static properties = {
    t: { attribute: false },
    hass: { attribute: false },
    element: { attribute: false },
    fonts: { attribute: false },
    variables: { attribute: false },
    _emojiOpen: { state: true },
    _snippetTarget: { state: true },
  };

  static styles = [
    themeTokens,
    layoutStyles,
    controlStyles,
    css`
      :host {
        display: block;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 0.8125rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ed-text-muted);
      }
      .hint {
        font-size: 0.8125rem;
        color: var(--ed-text-muted);
        line-height: 1.4;
      }
      .style-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2px;
      }
      .picture {
        max-width: 100%;
        max-height: 140px;
        image-rendering: auto;
        border: 1px solid var(--ed-line);
        border-radius: 8px;
        background: #fff;
      }
      details {
        border: 1px solid var(--ed-line);
        border-radius: 12px;
        padding: 8px 12px;
      }
      details summary {
        cursor: pointer;
        color: var(--ed-text-muted);
        font-size: 0.875rem;
      }
      code {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        background: var(--ed-container);
        padding: 1px 5px;
        border-radius: 6px;
      }
      table.syntax {
        border-collapse: collapse;
        font-size: 0.8125rem;
        margin-top: 8px;
      }
      table.syntax td {
        padding: 3px 12px 3px 0;
        vertical-align: top;
      }
    `,
  ];

  _patch(patch) {
    this.dispatchEvent(new CustomEvent("element-change", { detail: { patch }, bubbles: true, composed: true }));
  }

  _patchSource(patch) {
    this._patch({ source: { ...this.element.source, ...patch } });
  }

  _fontOptions() {
    return this.fonts.map((font) => ({ value: font.id, label: font.label }));
  }

  _sizeOptions(current) {
    const sizes = SIZE_PRESETS.includes(current) ? SIZE_PRESETS : [...SIZE_PRESETS, current].sort((a, b) => a - b);
    return sizes.map((size) => ({ value: size, label: String(size) }));
  }

  // --- shared pieces ------------------------------------------------------

  _alignChips() {
    const { t, element } = this;
    return choiceIcons(
      [
        { value: "left", icon: icons.alignLeft, title: t("inspector.align.left") },
        { value: "center", icon: icons.alignCenter, title: t("inspector.align.center") },
        { value: "right", icon: icons.alignRight, title: t("inspector.align.right") },
      ],
      element.align,
      (value) => this._patch({ align: value }),
    );
  }

  _styleControls(element) {
    const { t } = this;
    return html`
      <div class="field-pair">
        ${selectField(t("runs.font"), element.font, this._fontOptions(), (value) => this._patch({ font: value }))}
        ${selectField(t("runs.size"), element.size, this._sizeOptions(element.size), (value) =>
          this._patch({ size: Number(value) }),
        )}
      </div>
      <div class="style-row">
        ${toggleButton(icons.bold, t("runs.bold"), element.bold, (value) => this._patch({ bold: value }))}
        ${toggleButton(icons.italic, t("runs.italic"), element.italic, (value) => this._patch({ italic: value }))}
        ${"underline" in element
          ? toggleButton(icons.underline, t("runs.underline"), element.underline, (value) =>
              this._patch({ underline: value }),
            )
          : nothing}
        ${"strike" in element
          ? toggleButton(icons.strike, t("runs.strike"), element.strike, (value) => this._patch({ strike: value }))
          : nothing}
        ${"invert" in element
          ? toggleButton(icons.invert, t("runs.invert"), element.invert, (value) => this._patch({ invert: value }))
          : nothing}
      </div>
    `;
  }

  // --- element types ---------------------------------------------------------

  _text(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      <ed-run-editor
        .t=${t}
        .runs=${element.runs}
        .fonts=${this.fonts}
        @runs-change=${(event) => this._patch({ runs: event.detail.runs })}
      ></ed-run-editor>
      <p class="hint">${t("inspector.template_hint")}</p>
      ${sliderField(t("inspector.line_spacing"), element.line_spacing ?? 1.15, { min: 0.8, max: 2, step: 0.05 }, (value) =>
        this._patch({ line_spacing: value }),
      )}
    </section>`;
  }

  _insertSnippet(snippet) {
    const field = this.renderRoot.querySelector("#markdown-source");
    if (!field) return;
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    field.setRangeText(snippet, start, end, "end");
    this._patch({ source: field.value });
    field.focus();
  }

  _markdown(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      <md-outlined-text-field
        id="markdown-source"
        type="textarea"
        rows="10"
        label=${t("inspector.markdown.source")}
        .value=${element.source}
        style="--md-outlined-text-field-input-text-font: ui-monospace, Menlo, Consolas, monospace"
        @input=${(event) => this._patch({ source: event.target.value })}
      ></md-outlined-text-field>
      <md-chip-set>
        ${MARKDOWN_SNIPPETS.map(
          ([key, snippet]) =>
            html`<md-assist-chip label=${t(`inspector.markdown.snippet.${key}`)} @click=${() => this._insertSnippet(snippet)}></md-assist-chip>`,
        )}
        <md-assist-chip label=${t("inspector.markdown.snippet.emoji")} @click=${() => (this._snippetTarget = "markdown")}>
          <ed-icon slot="icon" .path=${icons.emoji}></ed-icon>
        </md-assist-chip>
      </md-chip-set>
      <div class="field-pair">
        ${selectField(t("runs.font"), element.font, this._fontOptions(), (value) => this._patch({ font: value }))}
        ${selectField(t("runs.size"), element.size, this._sizeOptions(element.size), (value) =>
          this._patch({ size: Number(value) }),
        )}
      </div>
      <details>
        <summary>${t("inspector.markdown.syntax")}</summary>
        <table class="syntax">
          ${[
            ["# Title", "inspector.markdown.help.heading"],
            ["**bold** *italic* ~~strike~~", "inspector.markdown.help.inline"],
            ["++underline++ ==inverted==", "inspector.markdown.help.more_inline"],
            ["- [ ] task   - [x] done", "inspector.markdown.help.tasks"],
            ["---  ===  ***  ...  ~~~", "inspector.markdown.help.dividers"],
            ["&lt;center&gt; … &lt;/center&gt;", "inspector.markdown.help.align"],
            ["&lt;size=40&gt; &lt;font=script&gt;", "inspector.markdown.help.tags"],
            ["[[qr:text]]  [[barcode:code128:123]]", "inspector.markdown.help.codes"],
            ["{{ states('sensor.x') }}", "inspector.markdown.help.templates"],
          ].map(
            ([code, key]) =>
              html`<tr><td><code .innerHTML=${code}></code></td><td>${t(key)}</td></tr>`,
          )}
        </table>
      </details>
    </section>`;
  }

  _datetime(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      ${choiceChips(
        DATE_FORMATS.map((format) => ({ value: format, label: format })),
        element.format,
        (value) => this._patch({ format: value }),
      )}
      ${textField(t("inspector.datetime.format"), element.format, (value) => this._patch({ format: value }), {
        supporting: t("inspector.datetime.format_hint"),
      })}
      <div class="field-pair">
        ${textField(t("inspector.datetime.prefix"), element.prefix, (value) => this._patch({ prefix: value }))}
        ${textField(t("inspector.datetime.suffix"), element.suffix, (value) => this._patch({ suffix: value }))}
      </div>
      <h3>${t("inspector.datetime.shift")}</h3>
      ${choiceChips(
        DATE_OFFSETS.map(([key, days]) => ({ value: days, label: t(`inspector.datetime.offset.${key}`) })),
        element.offset_days,
        (value) => this._patch({ offset_days: value }),
      )}
      ${sliderField(t("inspector.datetime.days"), element.offset_days, { min: -30, max: 365, step: 1 }, (value) =>
        this._patch({ offset_days: value }),
      )}
      <h3>${t("inspector.appearance")}</h3>
      ${this._styleControls(element)}
    </section>`;
  }

  _todoOptions() {
    const { t } = this;
    const states = Object.keys(this.hass?.states ?? {}).filter((id) => id.startsWith("todo."));
    const options = states.map((id) => ({ value: id, label: `${this.hass.states[id].attributes.friendly_name ?? id}` }));
    for (const variable of this.variables ?? []) {
      if (variable.type === "todo") {
        options.push({ value: `{{ vars.${variable.key} }}`, label: `${t("inspector.list.from_variable")}: ${variable.label || variable.key}` });
      }
    }
    const current = this.element.source.entity_id;
    if (current && !options.some((option) => option.value === current)) options.unshift({ value: current, label: current });
    options.unshift({ value: "", label: t("inspector.list.choose") });
    return options;
  }

  static _itemsToText(items) {
    return items
      .map((item) => `${item.done ? "[x] " : ""}${item.text}${item.note ? ` | ${item.note}` : ""}`)
      .join("\n");
  }

  static _textToItems(text) {
    return text
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const done = /^\s*\[x\]\s*/i.test(line);
        const [main, ...note] = line.replace(/^\s*\[( |x)\]\s*/i, "").split("|");
        return { text: main.trim(), done, note: note.join("|").trim() };
      });
  }

  _list(element) {
    const { t } = this;
    const { source } = element;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      ${choiceChips(
        [
          { value: "todo", label: t("inspector.list.kind.todo") },
          { value: "static", label: t("inspector.list.kind.static") },
        ],
        source.kind,
        (value) => this._patchSource({ kind: value }),
      )}
      ${source.kind === "todo"
        ? html`${selectField(t("inspector.list.entity"), source.entity_id ?? "", this._todoOptions(), (value) =>
              this._patchSource({ entity_id: value }),
            )}
            ${switchField(t("inspector.list.include_completed"), source.include_completed, (value) =>
              this._patchSource({ include_completed: value }),
            )}`
        : html`${textField(
            t("inspector.list.items"),
            EdInspector._itemsToText(source.items),
            (value) => this._patchSource({ items: EdInspector._textToItems(value) }),
            { multiline: true, rows: 6, supporting: t("inspector.list.items_hint") },
          )}`}
      ${textField(t("inspector.list.empty_text"), element.empty_text ?? "", (value) => this._patch({ empty_text: value }))}
      <h3>${t("inspector.appearance")}</h3>
      ${choiceChips(
        LIST_STYLES.map((style) => ({ value: style, label: t(`inspector.list.style.${style}`) })),
        element.style,
        (value) => this._patch({ style: value }),
      )}
      ${this._styleControls(element)}
    </section>`;
  }

  _divider(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.appearance")}</h3>
      ${choiceChips(
        DIVIDER_STYLES.map((style) => ({ value: style, label: t(`inspector.divider.style.${style}`) })),
        element.style,
        (value) => this._patch({ style: value }),
      )}
      ${sliderField(t("inspector.divider.thickness"), element.thickness, { min: 1, max: 8 }, (value) =>
        this._patch({ thickness: value }),
      )}
      ${sliderField(t("inspector.divider.width"), element.width_pct, { min: 10, max: 100, step: 5, suffix: " %" }, (value) =>
        this._patch({ width_pct: value }),
      )}
    </section>`;
  }

  _qr(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      <md-chip-set>
        ${Object.entries(QR_PRESETS).map(
          ([key, data]) =>
            html`<md-assist-chip label=${t(`inspector.qr.preset.${key}`)} @click=${() => this._patch({ data })}></md-assist-chip>`,
        )}
      </md-chip-set>
      ${textField(t("inspector.qr.data"), element.data, (value) => this._patch({ data: value }), {
        multiline: true,
        rows: 3,
        mono: true,
        supporting: t("inspector.template_hint"),
      })}
      ${textField(t("inspector.qr.caption"), element.caption, (value) => this._patch({ caption: value }))}
      <h3>${t("inspector.appearance")}</h3>
      ${sliderField(t("inspector.qr.size"), element.size_pct, { min: 20, max: 100, step: 5, suffix: " %" }, (value) =>
        this._patch({ size_pct: value }),
      )}
      ${selectField(
        t("inspector.qr.level"),
        element.level,
        ["L", "M", "Q", "H"].map((level) => ({ value: level, label: `${level} - ${t(`inspector.qr.level_${level}`)}` })),
        (value) => this._patch({ level: value }),
      )}
    </section>`;
  }

  _barcode(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      ${choiceChips(
        BARCODE_KINDS.map((kind) => ({ value: kind, label: t(`inspector.barcode.kind.${kind}`) })),
        element.kind,
        (value) => this._patch({ kind: value }),
      )}
      ${textField(t("inspector.barcode.data"), element.data, (value) => this._patch({ data: value }), {
        mono: true,
        supporting: t(`inspector.barcode.hint.${element.kind}`),
      })}
      ${sliderField(t("inspector.barcode.height"), element.height, { min: 30, max: 240, step: 5, suffix: " px" }, (value) =>
        this._patch({ height: value }),
      )}
      ${sliderField(t("inspector.barcode.module"), element.module_width, { min: 1, max: 4 }, (value) =>
        this._patch({ module_width: value }),
      )}
      ${switchField(t("inspector.barcode.show_text"), element.show_text, (value) => this._patch({ show_text: value }))}
    </section>`;
  }

  async _pickPicture(event) {
    const [file] = event.target.files;
    if (!file) return;
    this._patch({ data: await pictureToDataUri(file) });
    event.target.value = "";
  }

  _image(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      ${element.data ? html`<img class="picture" alt="" src=${element.data} />` : html`<p class="hint">${t("inspector.image.none")}</p>`}
      <input id="picture" type="file" accept="image/*" hidden @change=${this._pickPicture} />
      <md-filled-tonal-button @click=${() => this.renderRoot.querySelector("#picture").click()}>
        <ed-icon slot="icon" .path=${icons.image}></ed-icon>${t("inspector.image.choose")}
      </md-filled-tonal-button>
      <h3>${t("inspector.appearance")}</h3>
      ${sliderField(t("inspector.image.width"), element.width_pct, { min: 10, max: 100, step: 5, suffix: " %" }, (value) =>
        this._patch({ width_pct: value }),
      )}
      ${choiceChips(
        [
          { value: "floyd-steinberg", label: t("inspector.image.dither") },
          { value: "threshold", label: t("inspector.image.threshold") },
        ],
        element.dither,
        (value) => this._patch({ dither: value }),
      )}
      ${element.dither === "threshold"
        ? sliderField(t("inspector.image.level"), element.threshold, { min: 20, max: 235, step: 5 }, (value) =>
            this._patch({ threshold: value }),
          )
        : nothing}
    </section>`;
  }

  _sticker(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.content")}</h3>
      <md-filled-tonal-button @click=${() => (this._emojiOpen = true)}>
        <span slot="icon" style="font-size:1.4rem;line-height:1">${element.emoji}</span>${t("inspector.sticker.choose")}
      </md-filled-tonal-button>
      ${textField(t("inspector.sticker.emoji"), element.emoji, (value) => this._patch({ emoji: value }))}
      ${sliderField(t("runs.size"), element.size, { min: 32, max: 300, step: 4, suffix: " px" }, (value) =>
        this._patch({ size: value }),
      )}
    </section>`;
  }

  _spacer(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.appearance")}</h3>
      ${sliderField(t("inspector.spacer.height"), element.height, { min: 2, max: 200, step: 2, suffix: " px" }, (value) =>
        this._patch({ height: value }),
      )}
    </section>`;
  }

  // --- layout ------------------------------------------------------------------

  _layout(element) {
    const { t } = this;
    return html`<section>
      <h3>${t("inspector.layout")}</h3>
      ${elementHasAlign(element.type) ? this._alignChips() : nothing}
      <div class="field-pair">
        ${sliderField(t("inspector.margin_top"), element.margin_top ?? 0, { min: 0, max: 60, step: 2, suffix: " px" }, (value) =>
          this._patch({ margin_top: value }),
        )}
        ${sliderField(t("inspector.margin_bottom"), element.margin_bottom ?? 0, { min: 0, max: 60, step: 2, suffix: " px" }, (value) =>
          this._patch({ margin_bottom: value }),
        )}
      </div>
      ${switchField(t("inspector.hidden"), element.hidden, (value) => this._patch({ hidden: value }))}
    </section>`;
  }

  _onEmoji(emoji) {
    if (this._snippetTarget === "markdown") this._insertSnippet(emoji);
    else this._patch({ emoji });
  }

  render() {
    const { element, t } = this;
    if (!element) return html`<p class="hint">${t("inspector.nothing_selected")}</p>`;
    return html`
      ${this[`_${element.type}`](element)} ${this._layout(element)}
      <ed-emoji-picker
        .t=${t}
        .open=${this._emojiOpen || this._snippetTarget === "markdown"}
        @emoji-picked=${(event) => this._onEmoji(event.detail.emoji)}
        @closed=${() => {
          this._emojiOpen = false;
          this._snippetTarget = undefined;
        }}
      ></ed-emoji-picker>
    `;
  }
}
customElements.define("ed-inspector", EdInspector);
