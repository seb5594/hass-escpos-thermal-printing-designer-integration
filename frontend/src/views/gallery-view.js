import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/text-button.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/dialog/dialog.js";
import "@material/web/fab/fab.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import "@material/web/progress/linear-progress.js";
import "@material/web/textfield/outlined-text-field.js";
import * as icons from "../icons.js";
import { STARTERS } from "../model.js";
import "../components/ed-icon.js";
import { layoutStyles, themeTokens } from "../theme.js";

const CATEGORIES = ["shopping", "todo", "qr", "love", "label", "food", "receipt", "fun"];
const THUMBNAIL_BATCH = 24;
const STARTER_ICONS = { text: icons.text, markdown: icons.markdown, datetime: icons.datetime, list: icons.list };

/**
 * Home of the designer: search and filter the templates, jump to the last designs,
 * and start something new. Fires `open-template`, `print-template`, `new-design`,
 * `toggle-favorite`, `delete-template` and `duplicate-template`.
 */
export class GalleryView extends LitElement {
  static properties = {
    t: { attribute: false },
    api: { attribute: false },
    status: { attribute: false },
    library: { attribute: false },
    _query: { state: true },
    _category: { state: true },
    _newOpen: { state: true },
    _thumbs: { state: true },
    _menuFor: { state: true },
  };

  constructor() {
    super();
    this._query = "";
    this._category = "all";
    this._newOpen = false;
    this._thumbs = {};
    this._requested = new Set();
  }

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: block;
        padding: 0 16px 96px;
        max-width: 1400px;
        margin: 0 auto;
      }
      .banner {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 16px 20px;
        margin: 8px 0 16px;
        border-radius: var(--ed-radius);
        background: var(--md-sys-color-secondary-container);
      }
      .banner.warn {
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
      }
      .banner .text {
        flex: 1;
        min-width: 0;
        line-height: 1.4;
      }
      .banner strong {
        display: block;
        font-weight: 500;
      }
      .banner ed-icon {
        --ed-icon-size: 32px;
        flex: none;
        color: var(--ed-primary);
      }
      .toolbar {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: sticky;
        top: 0;
        z-index: 1;
        padding: 12px 0 8px;
        background: var(--ed-background);
      }
      .toolbar md-outlined-text-field {
        --md-outlined-text-field-container-shape: 28px;
      }
      md-chip-set {
        overflow-x: auto;
        flex-wrap: nowrap;
        scrollbar-width: none;
      }
      h2 {
        font-size: 1.0625rem;
        margin: 20px 0 10px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
        gap: 14px;
      }
      .recent {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
      }
      .recent .card {
        flex: 0 0 150px;
      }
      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--ed-line);
        border-radius: var(--ed-radius);
        background: var(--ed-surface);
        cursor: pointer;
        transition: box-shadow 0.15s, border-color 0.15s;
      }
      .card:hover,
      .card:focus-within {
        border-color: var(--ed-primary);
        box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
      }
      .thumb {
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--ed-container);
        padding: 10px;
        overflow: hidden;
      }
      .thumb img {
        max-width: 100%;
        max-height: 100%;
        background: #fff;
        box-shadow: 0 1px 6px rgb(0 0 0 / 25%);
        image-rendering: auto;
      }
      .thumb .skeleton {
        width: 60%;
        height: 80%;
        border-radius: 6px;
        background: color-mix(in srgb, var(--ed-text) 8%, transparent);
        animation: pulse 1.4s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.4;
        }
      }
      .info {
        padding: 10px 6px 10px 14px;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .info .title {
        flex: 1;
        min-width: 0;
      }
      .title strong {
        display: block;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title small {
        color: var(--ed-text-muted);
      }
      .info md-icon-button {
        --md-icon-button-icon-size: 20px;
        --md-icon-button-state-layer-height: 36px;
        --md-icon-button-state-layer-width: 36px;
      }
      .star-on {
        color: #f9a825;
      }
      md-fab {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 1;
      }
      .empty {
        text-align: center;
        padding: 48px 16px;
        color: var(--ed-text-muted);
      }
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        width: min(640px, 100vw);
      }
      .starters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }
      .starter {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        padding: 14px;
        text-align: left;
        font: inherit;
        color: var(--ed-text);
        border: 1px solid var(--ed-line);
        border-radius: 14px;
        background: var(--ed-surface);
        cursor: pointer;
      }
      .starter:hover {
        border-color: var(--ed-primary);
        background: var(--md-sys-color-secondary-container);
      }
      .starter ed-icon {
        color: var(--ed-primary);
      }
      .starter small {
        color: var(--ed-text-muted);
      }
      .recent-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
      }
      .recent-list button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 10px;
        border: 0;
        border-radius: 12px;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .recent-list button:hover {
        background: var(--md-sys-color-secondary-container);
      }
      .recent-list img {
        width: 36px;
        height: 36px;
        object-fit: contain;
        background: #fff;
        border: 1px solid var(--ed-line);
      }
      @media (max-width: 520px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .banner {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ];

  updated(changed) {
    if (changed.has("library") && this.library) this._loadThumbnails();
  }

  async _loadThumbnails() {
    const missing = this.library.templates.map((card) => card.id).filter((id) => !this._requested.has(id));
    for (let index = 0; index < missing.length; index += THUMBNAIL_BATCH) {
      const batch = missing.slice(index, index + THUMBNAIL_BATCH);
      batch.forEach((id) => this._requested.add(id));
      try {
        this._thumbs = { ...this._thumbs, ...(await this.api.thumbnails(batch)) };
      } catch {
        batch.forEach((id) => this._requested.delete(id));
      }
    }
  }

  /** Forget cached thumbnails, e.g. after a template was saved. */
  refreshThumbnails(ids) {
    for (const id of ids) {
      this._requested.delete(id);
      delete this._thumbs[id];
    }
    this._loadThumbnails();
  }

  _emit(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  _visible() {
    const { library, _query: query, _category: category, t } = this;
    const needle = query.trim().toLowerCase();
    return library.templates
      .filter((card) => {
        if (category === "favorites" && !library.favorites.includes(card.id)) return false;
        if (category === "mine" && card.builtin) return false;
        if (CATEGORIES.includes(category) && card.category !== category) return false;
        if (!needle) return true;
        return [card.name, card.description, t(`category.${card.category}`), ...card.tags].join(" ").toLowerCase().includes(needle);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _card(card, { compact = false } = {}) {
    const { t, library } = this;
    const favorite = library.favorites.includes(card.id);
    const thumb = this._thumbs[card.id];
    const menuId = `menu-${card.id.replace(/[^a-z0-9]/gi, "-")}`;
    return html`<div class="card" tabindex="0" @click=${() => this._emit("open-template", { id: card.id })}
      @keydown=${(event) => event.key === "Enter" && this._emit("open-template", { id: card.id })}>
      <div class="thumb">
        ${thumb ? html`<img alt="" loading="lazy" src="data:image/png;base64,${thumb}" />` : html`<div class="skeleton"></div>`}
      </div>
      <div class="info">
        <div class="title"><strong>${card.name}</strong>${compact ? nothing : html`<small>${t(`category.${card.category}`)}</small>`}</div>
        ${compact
          ? nothing
          : html`<md-icon-button aria-label=${t("gallery.favorite")} title=${t("gallery.favorite")}
                @click=${(event) => { event.stopPropagation(); this._emit("toggle-favorite", { id: card.id }); }}>
                <ed-icon class=${favorite ? "star-on" : ""} .path=${favorite ? icons.star : icons.starOutline}></ed-icon>
              </md-icon-button>
              <span style="position:relative" @click=${(event) => event.stopPropagation()}>
                <md-icon-button id=${menuId} aria-label=${t("gallery.more")} @click=${() => (this._menuFor = this._menuFor === card.id ? undefined : card.id)}>
                  <ed-icon .path=${icons.more}></ed-icon>
                </md-icon-button>
                <md-menu .open=${this._menuFor === card.id} anchor=${menuId} @closed=${() => (this._menuFor = undefined)}>
                  <md-menu-item @click=${() => this._emit("open-template", { id: card.id })}><ed-icon slot="start" .path=${icons.edit}></ed-icon><div slot="headline">${t("gallery.edit")}</div></md-menu-item>
                  <md-menu-item @click=${() => this._emit("print-template", { id: card.id })}><ed-icon slot="start" .path=${icons.printer}></ed-icon><div slot="headline">${t("gallery.print")}</div></md-menu-item>
                  <md-menu-item @click=${() => this._emit("copy-id", { id: card.id })}><ed-icon slot="start" .path=${icons.copyId}></ed-icon><div slot="headline">${t("gallery.copy_id")}</div></md-menu-item>
                  <md-menu-item @click=${() => this._emit("duplicate-template", { id: card.id })}><ed-icon slot="start" .path=${icons.copy}></ed-icon><div slot="headline">${t("gallery.duplicate")}</div></md-menu-item>
                  ${card.builtin ? nothing : html`<md-menu-item @click=${() => this._emit("delete-template", { id: card.id, name: card.name })}><ed-icon slot="start" .path=${icons.remove}></ed-icon><div slot="headline">${t("common.delete")}</div></md-menu-item>`}
                </md-menu>
              </span>`}
      </div>
    </div>`;
  }

  _banner() {
    const { t, status } = this;
    const info = status?.printer_integration;
    if (!info) return nothing;
    if (!info.installed) {
      return html`<div class="banner warn">
        <ed-icon .path=${icons.printerAlert}></ed-icon>
        <div class="text"><strong>${t("banner.install.title")}</strong>${t("banner.install.text")}</div>
        <md-filled-button href=${info.hacs_url} target="_blank" rel="noopener noreferrer">
          <ed-icon slot="icon" .path=${icons.download}></ed-icon>${t("banner.install.action")}
        </md-filled-button>
      </div>`;
    }
    if (!info.printer_count) {
      return html`<div class="banner warn">
        <ed-icon .path=${icons.printerAlert}></ed-icon>
        <div class="text"><strong>${t("banner.no_printer.title")}</strong>${t("banner.no_printer.text")}</div>
        <md-filled-tonal-button href=${info.add_printer_url} target="_top">
          <ed-icon slot="icon" .path=${icons.plus}></ed-icon>${t("banner.no_printer.action")}
        </md-filled-tonal-button>
      </div>`;
    }
    return nothing;
  }

  _newDialog() {
    const { t, library } = this;
    const recent = library.recent.map((id) => library.templates.find((card) => card.id === id)).filter(Boolean);
    return html`<md-dialog .open=${this._newOpen} @closed=${(event) => event.target === event.currentTarget && (this._newOpen = false)}>
      <div slot="headline">${t("new.title")}</div>
      <div slot="content">
        <div class="starters">
          ${STARTERS.map(
            (starter) => html`<button class="starter" @click=${() => { this._newOpen = false; this._emit("new-design", { starter: starter.id }); }}>
              <ed-icon .path=${STARTER_ICONS[starter.icon]}></ed-icon>
              <strong>${t(`new.starter.${starter.id}`)}</strong>
              <small>${t(`new.starter.${starter.id}.hint`)}</small>
            </button>`,
          )}
        </div>
        <h2>${t("new.recent")}</h2>
        ${recent.length
          ? html`<div class="recent-list">
              ${recent.map(
                (card) => html`<button @click=${() => { this._newOpen = false; this._emit("open-template", { id: card.id }); }}>
                  ${this._thumbs[card.id] ? html`<img alt="" src="data:image/png;base64,${this._thumbs[card.id]}" />` : html`<ed-icon .path=${icons.history}></ed-icon>`}
                  <span class="grow"><strong>${card.name}</strong><br /><small class="muted">${t(`category.${card.category}`)}</small></span>
                </button>`,
              )}
            </div>`
          : html`<p class="muted">${t("new.recent_empty")}</p>`}
      </div>
      <div slot="actions"><md-text-button @click=${() => (this._newOpen = false)}>${t("common.cancel")}</md-text-button></div>
    </md-dialog>`;
  }

  render() {
    const { t, library } = this;
    if (!library) return html`<md-linear-progress indeterminate></md-linear-progress>`;
    const visible = this._visible();
    const recent = library.recent.map((id) => library.templates.find((card) => card.id === id)).filter(Boolean);
    const showRecent = !this._query && this._category === "all" && recent.length;
    const filters = [
      { id: "all", label: t("gallery.filter.all") },
      { id: "favorites", label: t("gallery.filter.favorites") },
      { id: "mine", label: t("gallery.filter.mine") },
      ...CATEGORIES.map((id) => ({ id, label: t(`category.${id}`) })),
    ];
    return html`
      ${this._banner()}
      <div class="toolbar">
        <md-outlined-text-field placeholder=${t("gallery.search")} .value=${this._query} @input=${(event) => (this._query = event.target.value)}>
          <ed-icon slot="leading-icon" .path=${icons.search}></ed-icon>
        </md-outlined-text-field>
        <md-chip-set>
          ${filters.map(
            (filter) => html`<md-filter-chip label=${filter.label} ?selected=${this._category === filter.id}
              @click=${(event) => { event.preventDefault(); this._category = filter.id; }}></md-filter-chip>`,
          )}
        </md-chip-set>
      </div>
      ${showRecent
        ? html`<h2>${t("gallery.recent")}</h2><div class="recent">${recent.map((card) => this._card(card, { compact: true }))}</div>`
        : nothing}
      <h2>${t("gallery.templates")}</h2>
      ${visible.length
        ? html`<div class="grid">${visible.map((card) => this._card(card))}</div>`
        : html`<div class="empty">${t("gallery.empty")}</div>`}
      <md-fab variant="primary" label=${t("new.fab")} @click=${() => (this._newOpen = true)}>
        <ed-icon slot="icon" .path=${icons.plus}></ed-icon>
      </md-fab>
      ${this._newDialog()}
    `;
  }
}
customElements.define("gallery-view", GalleryView);
