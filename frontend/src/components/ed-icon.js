import { LitElement, css, html, svg } from "lit";

/** An inline Material Design icon: `<ed-icon .path=${icons.plus}></ed-icon>`. */
export class EdIcon extends LitElement {
  static properties = { path: { type: String } };

  static styles = css`
    :host {
      display: inline-flex;
      width: var(--ed-icon-size, 24px);
      height: var(--ed-icon-size, 24px);
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;

  render() {
    return html`<svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${this.path}></path>`}</svg>`;
  }
}
customElements.define("ed-icon", EdIcon);
