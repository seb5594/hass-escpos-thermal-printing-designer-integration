import { LitElement, css, html } from "lit";
import "@material/web/dialog/dialog.js";
import "@material/web/button/text-button.js";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import { EMOJI_CATEGORIES } from "../emoji-data.js";
import { layoutStyles, themeTokens } from "../theme.js";

/** A dialog with a grid of emoji. Fires `emoji-picked` with `{emoji}` and closes. */
export class EdEmojiPicker extends LitElement {
  static properties = {
    t: { attribute: false },
    open: { type: Boolean, reflect: true },
    _category: { state: true },
  };

  constructor() {
    super();
    this.open = false;
    this._category = 0;
  }

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        max-width: min(520px, calc(100vw - 32px));
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
        gap: 2px;
        max-height: 46vh;
        overflow: auto;
      }
      .grid button {
        font-size: 1.6rem;
        line-height: 1;
        padding: 6px 0;
        border: 0;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
        font-family: "Noto Emoji", "Segoe UI Emoji", "Apple Color Emoji", sans-serif;
      }
      .grid button:hover,
      .grid button:focus-visible {
        background: var(--md-sys-color-secondary-container);
        outline: none;
      }
      md-tabs {
        --md-primary-tab-container-color: transparent;
      }
    `,
  ];

  _pick(emoji) {
    this.dispatchEvent(new CustomEvent("emoji-picked", { detail: { emoji }, bubbles: true, composed: true }));
    this._close();
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
  }

  render() {
    const { t } = this;
    return html`<md-dialog .open=${this.open} @closed=${(event) => event.target === event.currentTarget && this._close()}>
      <div slot="headline">${t("emoji.title")}</div>
      <div slot="content">
        <md-tabs @change=${(event) => (this._category = event.target.activeTabIndex)}>
          ${EMOJI_CATEGORIES.map(
            (category, index) =>
              html`<md-primary-tab ?active=${index === this._category} aria-label=${category.id}
                >${category.label}</md-primary-tab
              >`,
          )}
        </md-tabs>
        <div class="grid" role="listbox">
          ${EMOJI_CATEGORIES[this._category].emoji.map(
            (emoji) => html`<button type="button" @click=${() => this._pick(emoji)}>${emoji}</button>`,
          )}
        </div>
      </div>
      <div slot="actions"><md-text-button @click=${this._close}>${t("common.close")}</md-text-button></div>
    </md-dialog>`;
  }
}
customElements.define("ed-emoji-picker", EdEmojiPicker);
