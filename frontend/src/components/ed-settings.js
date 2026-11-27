import { LitElement, css, html, nothing } from "lit";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/iconbutton/icon-button.js";
import * as icons from "../icons.js";
import { PAPER_FALLBACK, startPaper } from "../model.js";
import { choiceChips, controlStyles, selectField, sliderField, switchField, textField } from "../controls.js";
import "./ed-icon.js";
import { layoutStyles, themeTokens } from "../theme.js";

const CATEGORIES = ["custom", "shopping", "todo", "qr", "love", "label", "food", "receipt", "fun"];
const FRAME_STYLES = ["none", "line", "double", "rounded", "dashed", "dotted", "brackets", "ticket", "hearts", "stars"];
const CUT_MODES = ["none", "partial", "full"];
const VARIABLE_TYPES = ["text", "multiline", "number", "boolean", "date", "todo", "entity"];

/**
 * Settings of the whole design: its name and category, the paper, the frame,
 * print options and the variables that are asked for before printing.
 * Fires `meta-change` ({patch}) and `document-change` ({section, patch}).
 */
export class EdSettings extends LitElement {
  static properties = {
    t: { attribute: false },
    meta: { attribute: false },
    document: { attribute: false },
    status: { attribute: false },
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
        margin-bottom: 24px;
      }
      h3 {
        font-size: 0.8125rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--ed-text-muted);
      }
      .variable {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        border: 1px solid var(--ed-line);
        border-radius: 14px;
      }
      .hint {
        font-size: 0.8125rem;
        color: var(--ed-text-muted);
        line-height: 1.4;
        margin: 0;
      }
    `,
  ];

  _meta(patch) {
    this.dispatchEvent(new CustomEvent("meta-change", { detail: { patch }, bubbles: true, composed: true }));
  }

  _doc(section, patch) {
    this.dispatchEvent(new CustomEvent("document-change", { detail: { section, patch }, bubbles: true, composed: true }));
  }

  _setVariable(index, patch) {
    this._meta({ variables: this.meta.variables.map((variable, i) => (i === index ? { ...variable, ...patch } : variable)) });
  }

  _addVariable() {
    const taken = new Set(this.meta.variables.map((variable) => variable.key));
    let number = this.meta.variables.length + 1;
    while (taken.has(`value${number}`)) number += 1;
    this._meta({ variables: [...this.meta.variables, { key: `value${number}`, type: "text", label: "", default: "" }] });
  }

  _paper() {
    const { t, document: doc, status } = this;
    const presets = status?.paper_presets ?? PAPER_FALLBACK;
    const same = (paper) => paper && paper.width === doc.paper.width && (paper.height ?? null) === (doc.paper.height ?? null);
    const printers = (status?.printers ?? []).filter((printer) => printer.width);
    const options = [
      ...presets.map((preset) => ({ value: preset.id, label: t(`paper.${preset.id}`) })),
      ...printers.map((printer) => ({ value: `printer:${printer.id}`, label: t("settings.for_printer", { name: printer.name }) })),
      { value: "custom", label: t("paper.custom") },
    ];
    const current =
      printers.find((printer) => same(startPaper(printer))) ? `printer:${printers.find((printer) => same(startPaper(printer))).id}` : presets.find(same)?.id;
    return html`<section>
      <h3>${t("settings.paper")}</h3>
      ${choiceChips(options, current ?? "custom", (value) => {
        const printer = printers.find((item) => `printer:${item.id}` === value);
        const preset = presets.find((item) => item.id === value);
        if (printer) this._doc("paper", startPaper(printer));
        else if (preset) this._doc("paper", { width: preset.width, height: preset.height });
        else this._doc("paper", { height: doc.paper.height ?? 240 });
      })}
      <div class="field-pair">
        ${textField(t("settings.width"), String(doc.paper.width), (value) => this._doc("paper", { width: Number(value) || 384 }), { type: "number", suffix: "px" })}
        ${textField(t("settings.height"), doc.paper.height ? String(doc.paper.height) : "", (value) => this._doc("paper", { height: Number(value) || null }), { type: "number", suffix: "px" })}
      </div>
      <p class="hint">${t("settings.height_hint")}</p>
      ${sliderField(t("settings.margin"), doc.options.margin, { min: 0, max: 40, step: 2, suffix: " px" }, (value) => this._doc("options", { margin: value }))}
    </section>`;
  }

  render() {
    const { t, meta, document: doc } = this;
    return html`
      <section>
        <h3>${t("settings.design")}</h3>
        ${textField(t("settings.name"), meta.name, (value) => this._meta({ name: value }))}
        ${textField(t("settings.description"), meta.description, (value) => this._meta({ description: value }), { multiline: true, rows: 2 })}
        ${selectField(
          t("settings.category"),
          meta.category,
          CATEGORIES.map((category) => ({ value: category, label: t(`category.${category}`) })),
          (value) => this._meta({ category: value }),
        )}
      </section>

      ${this._paper()}

      <section>
        <h3>${t("settings.frame")}</h3>
        ${choiceChips(
          FRAME_STYLES.map((style) => ({ value: style, label: t(`frame.${style}`) })),
          doc.frame.style,
          (value) => this._doc("frame", { style: value }),
        )}
        ${doc.frame.style !== "none"
          ? html`<div class="field-pair">
              ${sliderField(t("settings.frame_thickness"), doc.frame.thickness, { min: 1, max: 8 }, (value) => this._doc("frame", { thickness: value }))}
              ${sliderField(t("settings.frame_padding"), doc.frame.padding, { min: 0, max: 40, step: 2 }, (value) => this._doc("frame", { padding: value }))}
            </div>`
          : nothing}
      </section>

      <section>
        <h3>${t("settings.printing")}</h3>
        ${choiceChips(
          CUT_MODES.map((mode) => ({ value: mode, label: t(`cut.${mode}`) })),
          doc.options.cut,
          (value) => this._doc("options", { cut: value }),
        )}
        ${sliderField(t("settings.feed"), doc.options.feed, { min: 0, max: 12 }, (value) => this._doc("options", { feed: value }))}
        ${selectField(
          t("settings.rotate"),
          doc.options.rotate,
          [0, 90, 180, 270].map((degrees) => ({ value: degrees, label: `${degrees}°` })),
          (value) => this._doc("options", { rotate: Number(value) }),
        )}
        ${switchField(t("settings.mirror"), doc.options.mirror, (value) => this._doc("options", { mirror: value }))}
        ${switchField(t("settings.invert"), doc.options.invert, (value) => this._doc("options", { invert: value }))}
      </section>

      <section>
        <h3>${t("settings.variables")}</h3>
        <p class="hint">${t("settings.variables_hint")}</p>
        ${meta.variables.map(
          (variable, index) => html`<div class="variable">
            <div class="field-pair">
              ${textField(t("settings.variable.key"), variable.key, (value) => this._setVariable(index, { key: value.toLowerCase().replace(/[^a-z0-9_]/g, "_") }), { supporting: `{{ vars.${variable.key} }}` })}
              ${selectField(t("settings.variable.type"), variable.type, VARIABLE_TYPES.map((type) => ({ value: type, label: t(`variable.${type}`) })), (value) => this._setVariable(index, { type: value }))}
            </div>
            ${variable.type === "entity"
              ? textField(t("settings.variable.domain"), variable.domain ?? "", (value) => this._setVariable(index, { domain: value.toLowerCase().replace(/[^a-z_]/g, "") }), { supporting: t("settings.variable.domain_hint") })
              : nothing}
            ${textField(t("settings.variable.label"), typeof variable.label === "string" ? variable.label : "", (value) => this._setVariable(index, { label: value }))}
            ${textField(t("settings.variable.default"), String(variable.default ?? ""), (value) => this._setVariable(index, { default: value }))}
            <div class="row">
              <span class="grow"></span>
              <md-icon-button aria-label=${t("common.delete")} title=${t("common.delete")} @click=${() => this._meta({ variables: meta.variables.filter((_, i) => i !== index) })}>
                <ed-icon .path=${icons.remove}></ed-icon>
              </md-icon-button>
            </div>
          </div>`,
        )}
        <md-filled-tonal-button @click=${this._addVariable}>
          <ed-icon slot="icon" .path=${icons.plus}></ed-icon>${t("settings.variable.add")}
        </md-filled-tonal-button>
      </section>
    `;
  }
}
customElements.define("ed-settings", EdSettings);
