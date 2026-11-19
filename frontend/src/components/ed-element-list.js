import { LitElement, css, html } from "lit";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import * as icons from "../icons.js";
import { ELEMENT_TYPES, plainText } from "../model.js";
import "./ed-icon.js";
import { layoutStyles, themeTokens } from "../theme.js";

const TYPE_ICONS = {
  text: icons.text,
  markdown: icons.markdown,
  datetime: icons.datetime,
  list: icons.list,
  divider: icons.divider,
  qr: icons.qr,
  barcode: icons.barcode,
  image: icons.image,
  sticker: icons.emoji,
  spacer: icons.spacer,
};

/**
 * The stack of elements of a design. Fires `select`, `add`, `move`, `duplicate`,
 * `remove` and `toggle-hidden` events; the editor owns the actual document.
 */
export class EdElementList extends LitElement {
  static properties = {
    t: { attribute: false },
    elements: { attribute: false },
    selected: { type: Number },
    _dragFrom: { state: true },
    _dragOver: { state: true },
  };

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: block;
      }
      ul {
        list-style: none;
        margin: 0 0 12px;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      li {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
        cursor: pointer;
        user-select: none;
      }
      li:hover {
        border-color: color-mix(in srgb, var(--ed-primary) 50%, var(--ed-line));
      }
      li[selected] {
        border-color: var(--ed-primary);
        background: var(--md-sys-color-secondary-container);
      }
      li[hidden-element] .label {
        opacity: 0.45;
        text-decoration: line-through;
      }
      li[drop-target] {
        outline: 2px dashed var(--ed-primary);
      }
      .type-icon {
        color: var(--ed-primary);
      }
      .label {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        line-height: 1.25;
        padding: 6px 4px;
      }
      .label small {
        color: var(--ed-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .actions {
        display: none;
        flex: none;
      }
      li:hover .actions,
      li[selected] .actions,
      li:focus-within .actions {
        display: flex;
      }
      .actions md-icon-button {
        --md-icon-button-icon-size: 18px;
        --md-icon-button-state-layer-height: 32px;
        --md-icon-button-state-layer-width: 32px;
      }
      .empty {
        text-align: center;
        padding: 24px 12px;
        color: var(--ed-text-muted);
      }
      .add {
        position: relative;
      }
    `,
  ];

  _emit(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  _drop(event, to) {
    event.preventDefault();
    if (this._dragFrom !== undefined && this._dragFrom !== to) this._emit("move", { from: this._dragFrom, to });
    this._dragFrom = undefined;
    this._dragOver = undefined;
  }

  _row(element, index) {
    const { t } = this;
    const content = plainText(element);
    return html`<li
      ?selected=${index === this.selected}
      ?hidden-element=${element.hidden}
      ?drop-target=${this._dragOver === index}
      draggable="true"
      @click=${() => this._emit("select", { index })}
      @dragstart=${() => (this._dragFrom = index)}
      @dragover=${(event) => {
        event.preventDefault();
        this._dragOver = index;
      }}
      @dragleave=${() => (this._dragOver = undefined)}
      @drop=${(event) => this._drop(event, index)}
      @dragend=${() => {
        this._dragFrom = undefined;
        this._dragOver = undefined;
      }}
    >
      <ed-icon class="type-icon" .path=${TYPE_ICONS[element.type]}></ed-icon>
      <span class="label">
        <span>${t(`element.${element.type}`)}</span>
        <small>${content || t("element.empty")}</small>
      </span>
      <span class="actions" @click=${(event) => event.stopPropagation()}>
        <md-icon-button aria-label=${t("list.move_up")} title=${t("list.move_up")} ?disabled=${index === 0} @click=${() => this._emit("move", { from: index, to: index - 1 })}>
          <ed-icon .path=${icons.arrowUp}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${t("list.move_down")} title=${t("list.move_down")} ?disabled=${index === this.elements.length - 1} @click=${() => this._emit("move", { from: index, to: index + 1 })}>
          <ed-icon .path=${icons.arrowDown}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${t("list.visibility")} title=${t("list.visibility")} @click=${() => this._emit("toggle-hidden", { index })}>
          <ed-icon .path=${element.hidden ? icons.hide : icons.show}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${t("list.duplicate")} title=${t("list.duplicate")} @click=${() => this._emit("duplicate", { index })}>
          <ed-icon .path=${icons.copy}></ed-icon>
        </md-icon-button>
        <md-icon-button aria-label=${t("common.delete")} title=${t("common.delete")} @click=${() => this._emit("remove", { index })}>
          <ed-icon .path=${icons.remove}></ed-icon>
        </md-icon-button>
      </span>
    </li>`;
  }

  render() {
    const { t } = this;
    return html`
      ${this.elements.length
        ? html`<ul>${this.elements.map((element, index) => this._row(element, index))}</ul>`
        : html`<div class="empty">${t("list.empty")}</div>`}
      <div class="add">
        <md-filled-tonal-button id="add-button" @click=${() => (this.renderRoot.querySelector("#add-menu").open = !this.renderRoot.querySelector("#add-menu").open)}>
          <ed-icon slot="icon" .path=${icons.plus}></ed-icon>${t("list.add")}
        </md-filled-tonal-button>
        <md-menu id="add-menu" anchor="add-button">
          ${ELEMENT_TYPES.map(
            (type) =>
              html`<md-menu-item @click=${() => this._emit("add", { type })}>
                <ed-icon slot="start" .path=${TYPE_ICONS[type]}></ed-icon>
                <div slot="headline">${t(`element.${type}`)}</div>
                <div slot="supporting-text">${t(`element.${type}.hint`)}</div>
              </md-menu-item>`,
          )}
        </md-menu>
      </div>
    `;
  }
}
customElements.define("ed-element-list", EdElementList);
