import { LitElement, css, html, nothing } from "lit";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/progress/linear-progress.js";
import * as icons from "../icons.js";
import "./ed-icon.js";
import { layoutStyles, themeTokens } from "../theme.js";

const ZOOM_STEPS = [0.5, 0.75, 1, 1.5, 2];
const KNOWN_WARNINGS = new Set(["content_overflow", "design_too_tall"]);

/** The live preview: the design exactly as the printer prints it, on a strip of paper. */
export class EdPreview extends LitElement {
  static properties = {
    t: { attribute: false },
    preview: { attribute: false },
    loading: { type: Boolean },
    error: { type: String },
    fixedHeight: { type: Boolean },
    _zoom: { state: true },
  };

  constructor() {
    super();
    this._zoom = 1;
  }

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        color: var(--ed-text-muted);
        font-size: 0.8125rem;
      }
      .stage {
        flex: 1;
        overflow: auto;
        padding: 20px 12px 32px;
        background:
          radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--ed-text) 10%, transparent) 1px, transparent 0)
          0 0 / 18px 18px;
        border-radius: var(--ed-radius);
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .paper {
        background: #fff;
        box-shadow:
          0 1px 2px rgb(0 0 0 / 20%),
          0 8px 24px rgb(0 0 0 / 18%);
        line-height: 0;
        max-width: none;
        position: relative;
      }
      .paper.continuous {
        /* torn paper edge at the top and bottom of a receipt */
        --tear: 6px;
        padding: var(--tear) 0;
        clip-path: polygon(
          0 var(--tear), 2% 0, 4% var(--tear), 6% 0, 8% var(--tear), 10% 0, 12% var(--tear), 14% 0,
          16% var(--tear), 18% 0, 20% var(--tear), 22% 0, 24% var(--tear), 26% 0, 28% var(--tear),
          30% 0, 32% var(--tear), 34% 0, 36% var(--tear), 38% 0, 40% var(--tear), 42% 0, 44% var(--tear),
          46% 0, 48% var(--tear), 50% 0, 52% var(--tear), 54% 0, 56% var(--tear), 58% 0, 60% var(--tear),
          62% 0, 64% var(--tear), 66% 0, 68% var(--tear), 70% 0, 72% var(--tear), 74% 0, 76% var(--tear),
          78% 0, 80% var(--tear), 82% 0, 84% var(--tear), 86% 0, 88% var(--tear), 90% 0, 92% var(--tear),
          94% 0, 96% var(--tear), 98% 0, 100% var(--tear), 100% calc(100% - var(--tear)),
          98% 100%, 96% calc(100% - var(--tear)), 94% 100%, 92% calc(100% - var(--tear)), 90% 100%,
          88% calc(100% - var(--tear)), 86% 100%, 84% calc(100% - var(--tear)), 82% 100%,
          80% calc(100% - var(--tear)), 78% 100%, 76% calc(100% - var(--tear)), 74% 100%,
          72% calc(100% - var(--tear)), 70% 100%, 68% calc(100% - var(--tear)), 66% 100%,
          64% calc(100% - var(--tear)), 62% 100%, 60% calc(100% - var(--tear)), 58% 100%,
          56% calc(100% - var(--tear)), 54% 100%, 52% calc(100% - var(--tear)), 50% 100%,
          48% calc(100% - var(--tear)), 46% 100%, 44% calc(100% - var(--tear)), 42% 100%,
          40% calc(100% - var(--tear)), 38% 100%, 36% calc(100% - var(--tear)), 34% 100%,
          32% calc(100% - var(--tear)), 30% 100%, 28% calc(100% - var(--tear)), 26% 100%,
          24% calc(100% - var(--tear)), 22% 100%, 20% calc(100% - var(--tear)), 18% 100%,
          16% calc(100% - var(--tear)), 14% 100%, 12% calc(100% - var(--tear)), 10% 100%,
          8% calc(100% - var(--tear)), 6% 100%, 4% calc(100% - var(--tear)), 2% 100%, 0 calc(100% - var(--tear))
        );
      }
      .paper.label {
        border-radius: 6px;
      }
      img {
        display: block;
        image-rendering: pixelated;
      }
      .placeholder {
        color: var(--ed-text-muted);
        padding: 48px 16px;
        text-align: center;
        line-height: 1.4;
      }
      .messages {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        font-size: 0.8125rem;
      }
      .message {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        padding: 8px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--md-sys-color-error) 12%, var(--ed-surface));
      }
      .message ed-icon {
        --ed-icon-size: 18px;
        color: var(--md-sys-color-error);
      }
      md-linear-progress {
        width: 100%;
        --md-linear-progress-track-height: 3px;
      }
      .spacer {
        flex: 1;
      }
    `,
  ];

  _zoomBy(direction) {
    const index = ZOOM_STEPS.indexOf(this._zoom);
    const next = ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, Math.max(0, index + direction))];
    this._zoom = next;
  }

  _warningText(warning) {
    const { t } = this;
    return KNOWN_WARNINGS.has(warning.message) ? t(`preview.warning.${warning.message}`) : warning.message;
  }

  render() {
    const { t, preview } = this;
    const messages = [
      ...(preview?.warnings ?? []).map((warning) => this._warningText(warning)),
      ...(preview?.template_errors ?? []).map((error) => `${t("preview.template_error")}: ${error}`),
      ...(this.error ? [this.error] : []),
    ];
    return html`
      <div class="toolbar">
        <span>${preview ? `${preview.width} × ${preview.height} px` : ""}</span>
        <span class="spacer"></span>
        <md-icon-button aria-label=${t("preview.zoom_out")} title=${t("preview.zoom_out")} @click=${() => this._zoomBy(-1)}>
          <ed-icon .path=${icons.zoomOut}></ed-icon>
        </md-icon-button>
        <span>${Math.round(this._zoom * 100)}%</span>
        <md-icon-button aria-label=${t("preview.zoom_in")} title=${t("preview.zoom_in")} @click=${() => this._zoomBy(1)}>
          <ed-icon .path=${icons.zoomIn}></ed-icon>
        </md-icon-button>
      </div>
      ${this.loading ? html`<md-linear-progress indeterminate></md-linear-progress>` : nothing}
      <div class="stage">
        ${preview
          ? html`<div class="paper ${this.fixedHeight ? "label" : "continuous"}">
              <img
                alt=${t("preview.alt")}
                src="data:image/png;base64,${preview.image}"
                width=${preview.width * this._zoom}
                height=${preview.height * this._zoom}
              />
            </div>`
          : html`<div class="placeholder">${this.error ? "" : t("preview.empty")}</div>`}
      </div>
      ${messages.length
        ? html`<div class="messages">
            ${messages.map(
              (message) =>
                html`<div class="message"><ed-icon .path=${icons.alert}></ed-icon><span>${message}</span></div>`,
            )}
          </div>`
        : nothing}
    `;
  }
}
customElements.define("ed-preview", EdPreview);
