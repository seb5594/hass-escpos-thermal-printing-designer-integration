import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-button.js";
import "@material/web/button/text-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/progress/linear-progress.js";
import { DesignerApi, errorMessage } from "./api.js";
import "./components/ed-footer.js";
import "./components/ed-icon.js";
import "./components/ed-print-dialog.js";
import { createTranslator } from "./i18n/index.js";
import * as icons from "./icons.js";
import { STARTERS, uid } from "./model.js";
import { layoutStyles, themeTokens } from "./theme.js";
import "./views/editor-view.js";
import "./views/gallery-view.js";

const TOAST_MS = 3500;

/** The sidebar panel: header, the gallery or the editor, and the footer. */
export class EscposDesignerPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean },
    route: { attribute: false },
    panel: { attribute: false },
    _status: { state: true },
    _library: { state: true },
    _view: { state: true },
    _template: { state: true },
    _toast: { state: true },
    _fatal: { state: true },
    _deleting: { state: true },
    _printing: { state: true },
  };

  constructor() {
    super();
    this._view = "gallery";
    this.api = new DesignerApi(() => this.hass);
    this._language = "";
    this._t = createTranslator("en");
  }

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        background: var(--ed-background);
        --ed-header-height: 56px;
      }
      main {
        flex: 1;
      }
      header {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        height: var(--ed-header-height);
        padding: 0 12px;
        background: var(--app-header-background-color, var(--ed-surface));
        color: var(--app-header-text-color, var(--ed-text));
        border-bottom: 1px solid var(--ed-line);
      }
      header h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 400;
      }
      header ed-icon.logo {
        color: var(--ed-primary);
      }
      .toast {
        position: fixed;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        z-index: 20;
        max-width: calc(100vw - 32px);
        padding: 12px 20px;
        border-radius: 12px;
        background: var(--ed-text);
        color: var(--ed-surface);
        box-shadow: 0 4px 16px rgb(0 0 0 / 30%);
      }
      .toast.error {
        background: var(--md-sys-color-error);
        color: #fff;
      }
      .fatal {
        max-width: 520px;
        margin: 64px auto;
        padding: 24px;
        text-align: center;
        line-height: 1.5;
      }
      .fatal ed-icon {
        --ed-icon-size: 48px;
        color: var(--md-sys-color-error);
      }
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
      }
    `,
  ];

  get t() {
    const language = this.hass?.language ?? "en";
    if (language !== this._language) {
      this._language = language;
      this._t = createTranslator(language);
    }
    return this._t;
  }

  firstUpdated() {
    this._bootstrap();
  }

  async _bootstrap() {
    try {
      const [status, library] = await Promise.all([this.api.status(), this.api.library()]);
      this._status = status;
      this._library = library;
    } catch (error) {
      this._fatal = error?.code ?? "failed";
      this._fatalMessage = errorMessage(error);
    }
  }

  async _refreshLibrary() {
    try {
      this._library = await this.api.library();
      this._status = { ...this._status, ...(await this.api.status()) };
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  _notify(message, isError = false) {
    this._toast = { message, isError };
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => (this._toast = undefined), TOAST_MS);
  }

  // --- navigation ---------------------------------------------------------------------

  async _open(id, { asCopy = false } = {}) {
    try {
      const template = await this.api.getTemplate(id);
      this._template = asCopy
        ? { ...template, id: undefined, builtin: false, name: `${template.name} (${this.t("gallery.copy")})`, isNew: true }
        : template;
      this._view = "editor";
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  _startNew(starterId) {
    const starter = STARTERS.find((item) => item.id === starterId) ?? STARTERS[0];
    this._template = {
      id: undefined,
      builtin: false,
      isNew: true,
      name: "",
      description: "",
      category: "custom",
      tags: [],
      variables: [],
      document: starter.build(),
    };
    this._view = "editor";
  }

  async _save(detail) {
    try {
      const saved = await this.api.saveTemplate(detail.template, detail.templateId);
      this.renderRoot.querySelector("editor-view")?.markSaved(saved);
      this._template = { ...this._template, id: saved.id };
      this._notify(this.t("toast.saved"));
      await this._refreshLibrary();
      this.renderRoot.querySelector("gallery-view")?.refreshThumbnails([saved.id]);
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  async _toggleFavorite(id) {
    try {
      const { favorite } = await this.api.toggleFavorite(id);
      const favorites = new Set(this._library.favorites);
      favorite ? favorites.add(id) : favorites.delete(id);
      this._library = { ...this._library, favorites: [...favorites] };
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  async _confirmDelete() {
    const { id } = this._deleting;
    this._deleting = undefined;
    try {
      await this.api.deleteTemplate(id);
      this._notify(this.t("toast.deleted"));
      await this._refreshLibrary();
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  async _printFromGallery(id) {
    try {
      this._printing = await this.api.getTemplate(id);
    } catch (error) {
      this._notify(errorMessage(error), true);
    }
  }

  _toggleMenu() {
    this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  // --- rendering --------------------------------------------------------------------------

  _body() {
    const { t } = this;
    if (this._fatal) {
      return html`<div class="fatal">
        <ed-icon .path=${icons.alert}></ed-icon>
        <h2>${t(`fatal.${this._fatal}.title`) === `fatal.${this._fatal}.title` ? t("fatal.failed.title") : t(`fatal.${this._fatal}.title`)}</h2>
        <p>${this._fatal === "failed" ? this._fatalMessage : t(`fatal.${this._fatal}.text`)}</p>
      </div>`;
    }
    if (!this._status || !this._library) return html`<md-linear-progress indeterminate></md-linear-progress>`;
    if (this._view === "editor") {
      return html`<editor-view
        .t=${t}
        .hass=${this.hass}
        .api=${this.api}
        .status=${this._status}
        .template=${this._template}
        @back=${() => { this._view = "gallery"; this._refreshLibrary(); }}
        @save=${(event) => this._save(event.detail)}
        @printed=${() => this._notify(this.t("toast.printed"))}
      ></editor-view>`;
    }
    return html`<gallery-view
      .t=${t}
      .api=${this.api}
      .status=${this._status}
      .library=${this._library}
      @open-template=${(event) => this._open(event.detail.id)}
      @duplicate-template=${(event) => this._open(event.detail.id, { asCopy: true })}
      @print-template=${(event) => this._printFromGallery(event.detail.id)}
      @new-design=${(event) => this._startNew(event.detail.starter)}
      @toggle-favorite=${(event) => this._toggleFavorite(event.detail.id)}
      @delete-template=${(event) => (this._deleting = event.detail)}
    ></gallery-view>`;
  }

  render() {
    const { t } = this;
    return html`
      <header>
        ${this.narrow
          ? html`<md-icon-button aria-label=${t("common.menu")} @click=${this._toggleMenu}><ed-icon .path=${icons.menu}></ed-icon></md-icon-button>`
          : nothing}
        <ed-icon class="logo" .path=${icons.printer}></ed-icon>
        <h1>${t("app.title")}</h1>
      </header>
      <main>${this._body()}</main>
      <ed-footer .t=${t} .version=${this._status?.version}></ed-footer>
      ${this._printing
        ? html`<ed-print-dialog
            .t=${t}
            .hass=${this.hass}
            .api=${this.api}
            .status=${this._status}
            .open=${true}
            .document=${this._printing.document}
            .templateId=${this._printing.builtin ? "" : this._printing.id}
            .variables=${this._printing.variables}
            @closed=${() => (this._printing = undefined)}
            @printed=${() => this._notify(this.t("toast.printed"))}
          ></ed-print-dialog>`
        : nothing}
      <md-dialog .open=${Boolean(this._deleting)} @closed=${(event) => event.target === event.currentTarget && (this._deleting = undefined)}>
        <div slot="headline">${t("delete.title")}</div>
        <div slot="content">${t("delete.text", { name: this._deleting?.name ?? "" })}</div>
        <div slot="actions">
          <md-text-button @click=${() => (this._deleting = undefined)}>${t("common.cancel")}</md-text-button>
          <md-filled-button @click=${this._confirmDelete}>${t("common.delete")}</md-filled-button>
        </div>
      </md-dialog>
      ${this._toast ? html`<div class="toast ${this._toast.isError ? "error" : ""}" role="status">${this._toast.message}</div>` : nothing}
    `;
  }
}

customElements.define("escpos-designer-panel", EscposDesignerPanel);
