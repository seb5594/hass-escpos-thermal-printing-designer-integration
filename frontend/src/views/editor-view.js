import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/text-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/tabs/primary-tab.js";
import "@material/web/tabs/tabs.js";
import * as icons from "../icons.js";
import { errorMessage } from "../api.js";
import { History, createElement, debounce, moveItem, uid, variableDefaults } from "../model.js";
import "../components/ed-element-list.js";
import "../components/ed-icon.js";
import "../components/ed-inspector.js";
import "../components/ed-preview.js";
import "../components/ed-print-dialog.js";
import "../components/ed-settings.js";
import { layoutStyles, themeTokens } from "../theme.js";

const WIDE = 1000;
const MEDIUM = 640;
const COALESCE_MS = 700;

/**
 * The designer itself. Owns the document being edited with undo/redo, keeps the
 * live preview in sync and offers save and print. Fires `back` and `save`.
 */
export class EditorView extends LitElement {
  static properties = {
    t: { attribute: false },
    hass: { attribute: false },
    api: { attribute: false },
    status: { attribute: false },
    template: { attribute: false },
    _meta: { state: true },
    _document: { state: true },
    _selected: { state: true },
    _tab: { state: true },
    _leftTab: { state: true },
    _layout: { state: true },
    _preview: { state: true },
    _previewError: { state: true },
    _loading: { state: true },
    _dirty: { state: true },
    _printOpen: { state: true },
    _leaveOpen: { state: true },
  };

  constructor() {
    super();
    this._history = new History();
    this._lastRecord = 0;
    this._layout = "wide";
    this._tab = "elements";
    this._leftTab = "elements";
    this._selected = 0;
    this._token = 0;
    this._refresh = debounce(() => this._loadPreview(), 250);
    this._observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      this._layout = width >= WIDE ? "wide" : width >= MEDIUM ? "medium" : "narrow";
    });
    this._onKey = (event) => this._keyboard(event);
  }

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: calc(100dvh - var(--ed-header-height, 56px) - var(--ed-footer-peek, 0px));
        min-height: 560px;
        padding: 0 12px calc(8px + var(--ed-bottom-inset, 0px));
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 0;
      }
      .bar md-outlined-text-field {
        flex: 1;
        min-width: 0;
        --md-outlined-text-field-container-shape: 28px;
      }
      .bar .label-btn {
        display: none;
      }
      :host([layout="wide"]) .bar .label-btn,
      :host([layout="medium"]) .bar .label-btn {
        display: inline-flex;
      }
      :host([layout="wide"]) .bar .icon-btn,
      :host([layout="medium"]) .bar .icon-btn {
        display: none;
      }
      .dirty {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--ed-primary);
        flex: none;
      }
      .workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        gap: 12px;
      }
      :host([layout="wide"]) .workspace {
        grid-template-columns: 340px minmax(0, 1fr) 360px;
      }
      :host([layout="medium"]) .workspace {
        grid-template-columns: minmax(300px, 380px) minmax(0, 1fr);
      }
      :host([layout="narrow"]) .workspace {
        grid-template-columns: minmax(0, 1fr);
      }
      .pane {
        min-height: 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--ed-line);
        border-radius: var(--ed-radius);
        background: var(--ed-surface);
        overflow: hidden;
      }
      .pane.preview {
        flex: 1;
        background: transparent;
        border: 0;
      }
      .scroll {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      md-tabs {
        --md-primary-tab-container-color: transparent;
        flex: none;
      }
      .pane-title {
        padding: 14px 16px 0;
        font-weight: 500;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._observer.observe(this);
    window.addEventListener("keydown", this._onKey);
  }

  disconnectedCallback() {
    this._observer.disconnect();
    window.removeEventListener("keydown", this._onKey);
    this._refresh.cancel();
    super.disconnectedCallback();
  }

  willUpdate(changed) {
    if (changed.has("template") && this.template) this._load(this.template);
    if (changed.has("_layout")) this.setAttribute("layout", this._layout);
  }

  _load(template) {
    this._meta = {
      id: template.id,
      builtin: Boolean(template.builtin),
      name: template.name,
      description: template.description ?? "",
      category: template.category ?? "custom",
      tags: template.tags ?? [],
      variables: structuredClone(template.variables ?? []),
    };
    this._document = structuredClone(template.document);
    this._document.elements = this._document.elements.map((element) => ({ id: element.id ?? uid(), ...element }));
    this._selected = this._document.elements.length ? 0 : -1;
    this._history.clear();
    this._dirty = Boolean(template.isNew);
    this._tab = "elements";
    this._leftTab = "elements";
    this._loadPreview();
  }

  // --- document edits --------------------------------------------------------

  _commit(updater) {
    const now = Date.now();
    if (now - this._lastRecord > COALESCE_MS) this._history.record(this._document);
    this._lastRecord = now;
    this._document = updater(structuredClone(this._document));
    this._dirty = true;
    this._refresh();
  }

  _patchElement(index, patch) {
    this._commit((doc) => {
      Object.assign(doc.elements[index], patch);
      return doc;
    });
  }

  _undo() {
    const previous = this._history.undo(this._document);
    if (previous) this._restore(previous);
  }

  _redo() {
    const next = this._history.redo(this._document);
    if (next) this._restore(next);
  }

  _restore(document) {
    this._document = document;
    this._selected = Math.min(this._selected, document.elements.length - 1);
    this._lastRecord = 0;
    this._dirty = true;
    this._refresh();
  }

  _keyboard(event) {
    if (!(event.ctrlKey || event.metaKey) || event.target.closest?.("md-dialog")) return;
    const key = event.key.toLowerCase();
    if (key === "z") {
      event.preventDefault();
      event.shiftKey ? this._redo() : this._undo();
    } else if (key === "y") {
      event.preventDefault();
      this._redo();
    } else if (key === "s") {
      event.preventDefault();
      this._save();
    }
  }

  _add(type) {
    this._history.record(this._document);
    this._lastRecord = 0;
    const element = createElement(type);
    this._document = { ...this._document, elements: [...this._document.elements, element] };
    this._selected = this._document.elements.length - 1;
    this._dirty = true;
    if (this._layout !== "wide") this._tab = "properties";
    this._refresh();
  }

  _remove(index) {
    this._commit((doc) => {
      doc.elements.splice(index, 1);
      return doc;
    });
    this._selected = Math.min(this._selected, this._document.elements.length - 1);
  }

  _duplicate(index) {
    this._commit((doc) => {
      doc.elements.splice(index + 1, 0, { ...structuredClone(doc.elements[index]), id: uid() });
      return doc;
    });
    this._selected = index + 1;
  }

  _move(from, to) {
    this._commit((doc) => {
      doc.elements = moveItem(doc.elements, from, to);
      return doc;
    });
    if (this._selected === from) this._selected = to;
  }

  _documentSection(section, patch) {
    this._commit((doc) => {
      doc[section] = { ...doc[section], ...patch };
      return doc;
    });
  }

  // --- preview, save, print ------------------------------------------------------

  async _loadPreview() {
    const token = ++this._token;
    this._loading = true;
    try {
      const result = await this.api.preview(this._document, variableDefaults(this._meta.variables, this.hass));
      if (token !== this._token) return;
      this._preview = result;
      this._previewError = "";
    } catch (error) {
      if (token === this._token) this._previewError = errorMessage(error);
    } finally {
      if (token === this._token) this._loading = false;
    }
  }

  _save() {
    this.dispatchEvent(
      new CustomEvent("save", {
        detail: {
          templateId: this._meta.builtin ? undefined : this._meta.id,
          template: {
            name: this._meta.name || this.t("editor.untitled"),
            description: this._meta.description,
            category: this._meta.category,
            tags: this._meta.tags,
            variables: this._meta.variables,
            document: { ...this._document, name: this._meta.name },
          },
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** Called by the panel once the template was stored. */
  markSaved(saved) {
    this._meta = { ...this._meta, id: saved.id, builtin: false };
    this._dirty = false;
  }

  _back() {
    if (this._dirty) this._leaveOpen = true;
    else this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }));
  }

  // --- rendering --------------------------------------------------------------------

  /** A tab bar over `names`; the chosen tab lives in the state property called `key`. */
  _tabs(names, key) {
    const { t } = this;
    const current = this[key];
    return html`<md-tabs @change=${(event) => (this[key] = names[event.target.activeTabIndex])}>
      ${names.map((name) => html`<md-primary-tab ?active=${current === name}>${t(`editor.tab.${name}`)}</md-primary-tab>`)}
    </md-tabs>`;
  }

  _elementsPane() {
    return html`<div class="scroll">
      <ed-element-list
        .t=${this.t}
        .elements=${this._document.elements}
        .selected=${this._selected}
        @select=${(event) => {
          this._selected = event.detail.index;
          if (this._layout !== "wide") this._tab = "properties";
        }}
        @add=${(event) => this._add(event.detail.type)}
        @move=${(event) => this._move(event.detail.from, event.detail.to)}
        @duplicate=${(event) => this._duplicate(event.detail.index)}
        @remove=${(event) => this._remove(event.detail.index)}
        @toggle-hidden=${(event) => this._patchElement(event.detail.index, { hidden: !this._document.elements[event.detail.index].hidden })}
      ></ed-element-list>
    </div>`;
  }

  _propertiesPane() {
    return html`<div class="scroll">
      <ed-inspector
        .t=${this.t}
        .hass=${this.hass}
        .fonts=${this.status?.fonts ?? []}
        .variables=${this._meta.variables}
        .element=${this._document.elements[this._selected]}
        @element-change=${(event) => this._patchElement(this._selected, event.detail.patch)}
      ></ed-inspector>
    </div>`;
  }

  _settingsPane() {
    return html`<div class="scroll">
      <ed-settings
        .t=${this.t}
        .status=${this.status}
        .meta=${this._meta}
        .document=${this._document}
        @meta-change=${(event) => {
          this._meta = { ...this._meta, ...event.detail.patch };
          this._dirty = true;
          if ("variables" in event.detail.patch) this._refresh();
        }}
        @document-change=${(event) => this._documentSection(event.detail.section, event.detail.patch)}
      ></ed-settings>
    </div>`;
  }

  _previewPane() {
    return html`<div class="pane preview">
      <ed-preview .t=${this.t} .preview=${this._preview} .loading=${this._loading} .error=${this._previewError}
        .fixedHeight=${Boolean(this._document.paper.height)}></ed-preview>
    </div>`;
  }

  _workspace() {
    const panes = () => ({
      elements: this._elementsPane(),
      properties: this._propertiesPane(),
      settings: this._settingsPane(),
      preview: this._previewPane(),
    });

    if (this._layout === "wide") {
      const left = this._leftTab === "settings" ? "settings" : "elements";
      const selected = this._document.elements[this._selected];
      return html`
        <div class="pane">${this._tabs(["elements", "settings"], "_leftTab")}${panes()[left]}</div>
        ${this._previewPane()}
        <div class="pane"><div class="pane-title">${this.t("editor.tab.properties")}${selected ? html` · ${this.t(`element.${selected.type}`)}` : nothing}</div>${this._propertiesPane()}</div>`;
    }
    if (this._layout === "medium") {
      const names = ["elements", "properties", "settings"];
      const shown = names.includes(this._tab) ? this._tab : "elements";
      return html`<div class="pane">${this._tabs(names, "_tab")}${panes()[shown]}</div>${this._previewPane()}`;
    }
    const names = ["elements", "properties", "preview", "settings"];
    return html`<div class="pane">${this._tabs(names, "_tab")}${panes()[this._tab]}</div>`;
  }

  _leaveDialog() {
    const { t } = this;
    return html`<md-dialog .open=${this._leaveOpen} @closed=${(event) => event.target === event.currentTarget && (this._leaveOpen = false)}>
      <div slot="headline">${t("editor.leave.title")}</div>
      <div slot="content">${t("editor.leave.text")}</div>
      <div slot="actions">
        <md-text-button @click=${() => (this._leaveOpen = false)}>${t("common.cancel")}</md-text-button>
        <md-text-button @click=${() => { this._leaveOpen = false; this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true })); }}>${t("editor.leave.discard")}</md-text-button>
        <md-filled-button @click=${() => { this._leaveOpen = false; this._save(); this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true })); }}>${t("editor.leave.save")}</md-filled-button>
      </div>
    </md-dialog>`;
  }

  render() {
    if (!this._document) return nothing;
    const { t } = this;
    return html`
      <div class="bar">
        <md-icon-button aria-label=${t("common.back")} title=${t("common.back")} @click=${this._back}><ed-icon .path=${icons.back}></ed-icon></md-icon-button>
        <md-outlined-text-field
          placeholder=${t("editor.untitled")}
          .value=${this._meta.name}
          aria-label=${t("settings.name")}
          @input=${(event) => { this._meta = { ...this._meta, name: event.target.value }; this._dirty = true; }}
        ></md-outlined-text-field>
        ${this._dirty ? html`<span class="dirty" title=${t("editor.unsaved")}></span>` : nothing}
        <md-icon-button aria-label=${t("editor.undo")} title="${t("editor.undo")} (Ctrl+Z)" ?disabled=${!this._history.canUndo} @click=${this._undo}><ed-icon .path=${icons.undo}></ed-icon></md-icon-button>
        <md-icon-button aria-label=${t("editor.redo")} title="${t("editor.redo")} (Ctrl+Y)" ?disabled=${!this._history.canRedo} @click=${this._redo}><ed-icon .path=${icons.redo}></ed-icon></md-icon-button>
        <md-filled-tonal-button class="label-btn" @click=${this._save}><ed-icon slot="icon" .path=${icons.save}></ed-icon>${t("editor.save")}</md-filled-tonal-button>
        <md-icon-button class="icon-btn" aria-label=${t("editor.save")} title=${t("editor.save")} @click=${this._save}><ed-icon .path=${icons.save}></ed-icon></md-icon-button>
        <md-filled-button class="label-btn" @click=${() => (this._printOpen = true)}><ed-icon slot="icon" .path=${icons.printer}></ed-icon>${t("editor.print")}</md-filled-button>
        <md-icon-button class="icon-btn" aria-label=${t("editor.print")} title=${t("editor.print")} @click=${() => (this._printOpen = true)}><ed-icon .path=${icons.printer}></ed-icon></md-icon-button>
      </div>
      <div class="workspace">${this._workspace()}</div>
      <ed-print-dialog
        .t=${t}
        .hass=${this.hass}
        .api=${this.api}
        .status=${this.status}
        .open=${this._printOpen}
        .document=${this._document}
        .templateId=${this._meta.builtin ? "" : (this._meta.id ?? "")}
        .variables=${this._meta.variables}
        .name=${this._meta.name}
        @closed=${() => (this._printOpen = false)}
        @printed=${(event) => this.dispatchEvent(new CustomEvent("printed", { detail: event.detail, bubbles: true, composed: true }))}
      ></ed-print-dialog>
      ${this._leaveDialog()}
    `;
  }
}
customElements.define("editor-view", EditorView);
