import { LitElement, css, html } from "lit";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/iconbutton/icon-button.js";
import * as icons from "../icons.js";
import { RUN_DEFAULTS, SIZE_PRESETS } from "../model.js";
import { controlStyles, selectField, textField, toggleButton } from "../controls.js";
import "./ed-icon.js";
import "./ed-emoji-picker.js";
import { layoutStyles, themeTokens } from "../theme.js";

/**
 * Edits the segments ("runs") of a text element. Every segment has its own text,
 * font, size and style, so one line can mix a script heading, bold words and a heart.
 * Fires `runs-change` with `{runs}`.
 */
export class EdRunEditor extends LitElement {
  static properties = {
    t: { attribute: false },
    runs: { attribute: false },
    fonts: { attribute: false },
    _emojiFor: { state: true },
  };

  static styles = [
    themeTokens,
    layoutStyles,
    controlStyles,
    css`
      :host {
        display: block;
      }
      .run {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        margin-bottom: 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
      }
      .run-head {
        display: flex;
        align-items: center;
        gap: 2px;
        flex-wrap: wrap;
      }
      .run-head .index {
        font-size: 0.75rem;
        color: var(--ed-text-muted);
        margin-right: 6px;
      }
      .selects {
        display: grid;
        grid-template-columns: 1fr 120px;
        gap: 10px;
      }
      .preview-chip {
        font-size: 0.75rem;
        color: var(--ed-text-muted);
      }
    `,
  ];

  _emit(runs) {
    this.dispatchEvent(new CustomEvent("runs-change", { detail: { runs }, bubbles: true, composed: true }));
  }

  _patch(index, patch) {
    this._emit(this.runs.map((run, position) => (position === index ? { ...run, ...patch } : run)));
  }

  _remove(index) {
    const runs = this.runs.filter((_, position) => position !== index);
    this._emit(runs.length ? runs : [{ text: "", ...RUN_DEFAULTS }]);
  }

  _add() {
    const last = this.runs.at(-1) ?? RUN_DEFAULTS;
    this._emit([...this.runs, { ...last, text: "" }]);
  }

  _insertEmoji(emoji) {
    const index = this._emojiFor;
    if (index === undefined) return;
    this._patch(index, { text: this.runs[index].text + emoji });
  }

  _renderRun(run, index) {
    const { t } = this;
    const sizes = SIZE_PRESETS.includes(run.size) ? SIZE_PRESETS : [...SIZE_PRESETS, run.size].sort((a, b) => a - b);
    return html`<div class="run">
      <div class="run-head">
        <span class="index">${t("runs.segment")} ${index + 1}</span>
        ${toggleButton(icons.bold, t("runs.bold"), run.bold, (value) => this._patch(index, { bold: value }))}
        ${toggleButton(icons.italic, t("runs.italic"), run.italic, (value) => this._patch(index, { italic: value }))}
        ${toggleButton(icons.underline, t("runs.underline"), run.underline, (value) =>
          this._patch(index, { underline: value }),
        )}
        ${toggleButton(icons.strike, t("runs.strike"), run.strike, (value) => this._patch(index, { strike: value }))}
        ${toggleButton(icons.invert, t("runs.invert"), run.invert, (value) => this._patch(index, { invert: value }))}
        <span class="grow"></span>
        <md-icon-button aria-label=${t("runs.emoji")} title=${t("runs.emoji")} @click=${() => (this._emojiFor = index)}>
          <ed-icon .path=${icons.emoji}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${t("common.delete")} title=${t("common.delete")} @click=${() => this._remove(index)}>
          <ed-icon .path=${icons.remove}></ed-icon>
        </md-icon-button>
      </div>
      ${textField(t("runs.text"), run.text, (value) => this._patch(index, { text: value }), {
        multiline: true,
        rows: 2,
      })}
      <div class="selects">
        ${selectField(
          t("runs.font"),
          run.font,
          this.fonts.map((font) => ({ value: font.id, label: font.label })),
          (value) => this._patch(index, { font: value }),
        )}
        ${selectField(
          t("runs.size"),
          run.size,
          sizes.map((size) => ({ value: size, label: String(size) })),
          (value) => this._patch(index, { size: Number(value) }),
        )}
      </div>
    </div>`;
  }

  render() {
    const { t } = this;
    return html`
      ${this.runs.map((run, index) => this._renderRun(run, index))}
      <md-filled-tonal-button @click=${this._add}>
        <ed-icon slot="icon" .path=${icons.plus}></ed-icon>${t("runs.add")}
      </md-filled-tonal-button>
      <ed-emoji-picker
        .t=${t}
        .open=${this._emojiFor !== undefined}
        @emoji-picked=${(event) => this._insertEmoji(event.detail.emoji)}
        @closed=${() => (this._emojiFor = undefined)}
      ></ed-emoji-picker>
    `;
  }
}
customElements.define("ed-run-editor", EdRunEditor);
