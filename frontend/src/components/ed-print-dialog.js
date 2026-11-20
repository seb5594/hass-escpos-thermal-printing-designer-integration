import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-button.js";
import "@material/web/button/text-button.js";
import "@material/web/dialog/dialog.js";
import "@material/web/progress/linear-progress.js";
import * as icons from "../icons.js";
import { errorMessage } from "../api.js";
import { debounce, entityOptions, variableDefaults } from "../model.js";
import { controlStyles, selectField, sliderField, switchField, textField } from "../controls.js";
import "./ed-icon.js";
import "./ed-preview.js";
import { layoutStyles, themeTokens } from "../theme.js";

/**
 * "Print" dialog: asks for the template's variables and the printer, shows the final
 * result and prints. Fires `printed` ({template_id}) after a successful print.
 */
export class EdPrintDialog extends LitElement {
  static properties = {
    t: { attribute: false },
    hass: { attribute: false },
    api: { attribute: false },
    status: { attribute: false },
    open: { type: Boolean, reflect: true },
    document: { attribute: false },
    templateId: { type: String },
    variables: { attribute: false },
    name: { type: String },
    _values: { state: true },
    _printer: { state: true },
    _copies: { state: true },
    _preview: { state: true },
    _loading: { state: true },
    _busy: { state: true },
    _error: { state: true },
  };

  constructor() {
    super();
    this.open = false;
    this._copies = 1;
    this._refresh = debounce(() => this._loadPreview(), 250);
  }

  static styles = [
    themeTokens,
    layoutStyles,
    controlStyles,
    css`
      md-dialog {
        --md-dialog-container-color: var(--ed-surface);
        width: min(960px, 100vw);
        max-width: 100vw;
        max-height: calc(100dvh - 24px - var(--ed-bottom-inset));
      }
      .body {
        display: grid;
        grid-template-columns: minmax(260px, 340px) 1fr;
        gap: 20px;
        min-height: 320px;
      }
      .body > * {
        min-width: 0;
      }
      @media (max-width: 720px) {
        .body {
          grid-template-columns: minmax(0, 1fr);
        }
        ed-preview {
          min-height: 280px;
        }
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      ed-preview {
        height: 100%;
        min-height: 320px;
      }
      .alert {
        display: flex;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
        font-size: 0.875rem;
      }
      .alert ed-icon {
        color: var(--md-sys-color-error);
        flex: none;
      }
      a {
        color: var(--ed-primary);
      }
    `,
  ];

  willUpdate(changed) {
    if (changed.has("open") && this.open) {
      this._values = variableDefaults(this.variables, this.hass);
      this._printer = this.status?.printers?.[0]?.id ?? "";
      this._copies = 1;
      this._error = "";
      this._loadPreview();
    }
  }

  async _loadPreview() {
    if (!this.open) return;
    this._loading = true;
    try {
      this._preview = await this.api.preview(this.document, this._values);
      this._error = "";
    } catch (error) {
      this._error = errorMessage(error);
    } finally {
      this._loading = false;
    }
  }

  _setValue(key, value) {
    this._values = { ...this._values, [key]: value };
    this._refresh();
  }

  async _print() {
    this._busy = true;
    this._error = "";
    try {
      await this.api.print({
        document: this.document,
        variables: this._values,
        copies: this._copies,
        name: this.name ?? "",
        variable_defs: this.variables ?? [],
        ...(this._printer ? { printer: this._printer } : {}),
        ...(this.templateId ? { template_id: this.templateId } : {}),
      });
      this.dispatchEvent(new CustomEvent("printed", { detail: { template_id: this.templateId }, bubbles: true, composed: true }));
      this._close();
    } catch (error) {
      this._error = errorMessage(error);
    } finally {
      this._busy = false;
    }
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }));
  }

  _variableField(variable) {
    const { t } = this;
    const label = variable.label || variable.key;
    const value = this._values?.[variable.key] ?? "";
    switch (variable.type) {
      case "multiline":
        return textField(label, value, (next) => this._setValue(variable.key, next), { multiline: true, rows: 8 });
      case "number":
        return textField(label, String(value), (next) => this._setValue(variable.key, next === "" ? "" : Number(next)), { type: "number" });
      case "boolean":
        return switchField(label, value === true || value === "true", (next) => this._setValue(variable.key, next));
      case "date":
        return textField(label, value, (next) => this._setValue(variable.key, next), { type: "date" });
      case "todo":
        return selectField(label, value, [{ value: "", label: t("print.choose_list") }, ...entityOptions(this.hass, "todo", variable.hints)], (next) => this._setValue(variable.key, next));
      case "entity":
        return selectField(label, value, [{ value: "", label: t("print.choose_entity") }, ...entityOptions(this.hass, variable.domain, variable.hints)], (next) => this._setValue(variable.key, next));
      default:
        return textField(label, value, (next) => this._setValue(variable.key, next));
    }
  }

  render() {
    const { t, status } = this;
    const printers = status?.printers ?? [];
    const noPrinter = !printers.length;
    return html`<md-dialog .open=${this.open} @closed=${(event) => event.target === event.currentTarget && this._close()}>
      <div slot="headline">${t("print.title")}</div>
      <div slot="content" class="body">
        <div class="form">
          ${noPrinter
            ? html`<div class="alert"><ed-icon .path=${icons.printerAlert}></ed-icon>
                <span>${t("print.no_printer")}
                  <a href=${status?.printer_integration?.add_printer_url ?? "/config/integrations"} target="_top">${t("print.add_printer")}</a></span></div>`
            : selectField(
                t("print.printer"),
                this._printer,
                printers.map((printer) => ({ value: printer.id, label: printer.name })),
                (value) => (this._printer = value),
              )}
          ${(this.variables ?? []).map((variable) => this._variableField(variable))}
          ${sliderField(t("print.copies"), this._copies, { min: 1, max: 5 }, (value) => (this._copies = value))}
          ${this._error ? html`<div class="alert"><ed-icon .path=${icons.alert}></ed-icon><span>${this._error}</span></div>` : nothing}
        </div>
        <ed-preview .t=${t} .preview=${this._preview} .loading=${this._loading} .fixedHeight=${Boolean(this.document?.paper?.height)}></ed-preview>
      </div>
      ${this._busy ? html`<md-linear-progress slot="actions" indeterminate style="width:100%"></md-linear-progress>` : nothing}
      <div slot="actions">
        <md-text-button @click=${this._close}>${t("common.cancel")}</md-text-button>
        <md-filled-button ?disabled=${noPrinter || this._busy} @click=${this._print}>
          <ed-icon slot="icon" .path=${icons.printer}></ed-icon>${t("print.print")}
        </md-filled-button>
      </div>
    </md-dialog>`;
  }
}
customElements.define("ed-print-dialog", EdPrintDialog);
