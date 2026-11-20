import { LitElement, css, html } from "lit";
import "@material/web/button/outlined-button.js";
import { layoutStyles, themeTokens } from "../theme.js";

export const LINKS = {
  repository: "https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration",
  integrations: "https://github.com/seb5594/Home-Assistant-Integrations",
  apps: "https://github.com/seb5594/Home-Assistant-Apps",
  support: "https://paypal.me/seb5594",
};

/** Credit line, three link buttons and the installed version. */
export class EdFooter extends LitElement {
  static properties = { t: { attribute: false }, version: { type: String }, fab: { type: Boolean } };

  static styles = [
    themeTokens,
    layoutStyles,
    css`
      :host {
        display: block;
      }
      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 24px 16px calc(32px + var(--ed-bottom-inset));
        text-align: center;
        font-size: 0.875rem;
      }
      :host([fab]) footer {
        padding-bottom: calc(96px + var(--ed-bottom-inset));
      }
      a.credit {
        color: var(--ed-text-muted);
        text-decoration: none;
      }
      a.credit:hover {
        color: var(--ed-primary);
        text-decoration: underline;
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      .version {
        color: var(--ed-text-muted);
        font-size: 0.75rem;
      }
    `,
  ];

  render() {
    const { t } = this;
    return html`<footer>
      <a class="credit" href=${LINKS.repository} target="_blank" rel="noopener noreferrer"
        >${t("footer.credit")}<br />${t("footer.made_with")}</a
      >
      <div class="links">
        <md-outlined-button href=${LINKS.integrations} target="_blank" rel="noopener noreferrer"
          >${t("footer.integrations")}</md-outlined-button
        >
        <md-outlined-button href=${LINKS.apps} target="_blank" rel="noopener noreferrer"
          >${t("footer.apps")}</md-outlined-button
        >
        <md-outlined-button href=${LINKS.support} target="_blank" rel="noopener noreferrer"
          >${t("footer.support")}</md-outlined-button
        >
      </div>
      ${this.version ? html`<div class="version">${t("footer.version")} ${this.version}</div>` : ""}
    </footer>`;
  }
}
customElements.define("ed-footer", EdFooter);
