/** Small Lit template helpers for the Material form controls the inspector uses. */
import { html, nothing } from "lit";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/select/outlined-select.js";
import "@material/web/select/select-option.js";
import "@material/web/slider/slider.js";
import "@material/web/switch/switch.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/iconbutton/icon-button.js";
import "./components/ed-icon.js";

/** A dropdown. `options` is a list of `{value, label}`; `onChange(value)` gets the choice. */
export function selectField(label, value, options, onChange) {
  return html`<md-outlined-select
    label=${label}
    .value=${String(value)}
    @change=${(event) => onChange(event.target.value)}
  >
    ${options.map(
      (option) =>
        html`<md-select-option value=${String(option.value)} ?selected=${String(option.value) === String(value)}>
          <div slot="headline">${option.label}</div>
        </md-select-option>`,
    )}
  </md-outlined-select>`;
}

/** A text input. Pass `{multiline, rows, mono, suffix, type, supporting}` as `opts`. */
export function textField(label, value, onInput, opts = {}) {
  return html`<md-outlined-text-field
    label=${label}
    .value=${value ?? ""}
    type=${opts.multiline ? "textarea" : (opts.type ?? "text")}
    rows=${opts.rows ?? 2}
    suffix-text=${opts.suffix ?? nothing}
    supporting-text=${opts.supporting ?? nothing}
    placeholder=${opts.placeholder ?? nothing}
    style=${opts.mono ? "--md-outlined-text-field-input-text-font: ui-monospace, Menlo, Consolas, monospace" : nothing}
    @input=${(event) => onInput(event.target.value)}
  ></md-outlined-text-field>`;
}

/** A labelled slider with its current value. */
export function sliderField(label, value, { min, max, step = 1, suffix = "" }, onInput) {
  return html`<div class="slider-field">
    <div class="slider-head"><span>${label}</span><strong>${value}${suffix}</strong></div>
    <md-slider
      min=${min}
      max=${max}
      step=${step}
      .value=${Number(value)}
      @input=${(event) => onInput(Number(event.target.value))}
    ></md-slider>
  </div>`;
}

/** A switch with a label to its right. */
export function switchField(label, selected, onChange) {
  return html`<label class="switch-field">
    <md-switch ?selected=${selected} @change=${(event) => onChange(event.target.selected)}></md-switch>
    <span>${label}</span>
  </label>`;
}

/**
 * A single choice shown as chips. Options are `{value, label?, icon?}`;
 * the selected one is highlighted.
 */
export function choiceChips(options, value, onChange) {
  return html`<md-chip-set>
    ${options.map(
      (option) =>
        html`<md-filter-chip
          label=${option.label ?? ""}
          title=${option.title ?? option.label ?? ""}
          ?selected=${option.value === value}
          @click=${(event) => {
            event.preventDefault();
            onChange(option.value);
          }}
        >
          ${option.icon ? html`<ed-icon slot="icon" .path=${option.icon}></ed-icon>` : nothing}
        </md-filter-chip>`,
    )}
  </md-chip-set>`;
}

/** A single choice shown as a row of icon buttons (alignment and the like). */
export function choiceIcons(options, value, onChange) {
  return html`<div class="icon-choice">
    ${options.map(
      (option) => html`<md-icon-button
        aria-label=${option.title}
        title=${option.title}
        ?selected=${option.value === value}
        @click=${() => onChange(option.value)}
      >
        <ed-icon .path=${option.icon}></ed-icon>
      </md-icon-button>`,
    )}
  </div>`;
}

/** An icon button that toggles; used for bold, italic and friends. */
export function toggleButton(icon, label, selected, onToggle) {
  return html`<md-icon-button
    toggle
    aria-label=${label}
    title=${label}
    ?selected=${selected}
    @click=${(event) => {
      event.preventDefault();
      onToggle(!selected);
    }}
  >
    <ed-icon .path=${icon}></ed-icon>
    <ed-icon slot="selected" .path=${icon}></ed-icon>
  </md-icon-button>`;
}

/** Styles for the helpers above; include them in every component that uses them. */
import { css } from "lit";
export const controlStyles = css`
  .slider-field {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .slider-head {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--ed-text-muted);
  }
  .slider-head strong {
    color: var(--ed-text);
    font-weight: 500;
  }
  md-slider {
    width: 100%;
    margin: 0;
  }
  .switch-field {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .field-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .icon-choice {
    display: flex;
    gap: 4px;
  }
  md-icon-button[selected] {
    --md-icon-button-icon-color: var(--md-sys-color-primary);
    background: var(--md-sys-color-secondary-container);
    border-radius: 50%;
  }
`;
