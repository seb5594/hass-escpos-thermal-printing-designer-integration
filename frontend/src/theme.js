import { css } from "lit";

/**
 * Material 3 tokens for @material/web, taken from the active Home Assistant
 * theme so the panel follows light/dark mode and custom themes.
 */
export const themeTokens = css`
  :host {
    --ed-primary: var(--primary-color, #03a9f4);
    --ed-surface: var(--card-background-color, #fff);
    --ed-background: var(--primary-background-color, #fafafa);
    --ed-container: var(--secondary-background-color, #f2f2f2);
    --ed-text: var(--primary-text-color, #212121);
    --ed-text-muted: var(--secondary-text-color, #727272);
    --ed-line: var(--divider-color, #e0e0e0);
    --ed-radius: 16px;

    --md-sys-color-primary: var(--ed-primary);
    --md-sys-color-on-primary: var(--text-primary-color, #fff);
    --md-sys-color-primary-container: color-mix(in srgb, var(--ed-primary) 20%, var(--ed-surface));
    --md-sys-color-on-primary-container: var(--ed-text);
    --md-sys-color-secondary: var(--ed-primary);
    --md-sys-color-secondary-container: color-mix(in srgb, var(--ed-primary) 18%, var(--ed-surface));
    --md-sys-color-on-secondary-container: var(--ed-text);
    --md-sys-color-surface: var(--ed-surface);
    --md-sys-color-surface-dim: var(--ed-container);
    --md-sys-color-surface-container: var(--ed-container);
    --md-sys-color-surface-container-low: var(--ed-container);
    --md-sys-color-surface-container-high: var(--ed-container);
    --md-sys-color-surface-container-highest: var(--ed-container);
    --md-sys-color-on-surface: var(--ed-text);
    --md-sys-color-on-surface-variant: var(--ed-text-muted);
    --md-sys-color-outline: color-mix(in srgb, var(--ed-text) 45%, transparent);
    --md-sys-color-outline-variant: var(--ed-line);
    --md-sys-color-error: var(--error-color, #db4437);
    --md-sys-color-on-error: #fff;
    --md-sys-color-scrim: #000;
    --md-sys-color-shadow: #000;
    --md-ref-typeface-brand: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    --md-ref-typeface-plain: var(--paper-font-body1_-_font-family, Roboto, system-ui, sans-serif);
    color: var(--ed-text);
    font-family: var(--md-ref-typeface-plain);
  }
`;

/** Small layout helpers shared by the views. */
export const layoutStyles = css`
  * {
    box-sizing: border-box;
  }
  .card {
    background: var(--ed-surface);
    border: 1px solid var(--ed-line);
    border-radius: var(--ed-radius);
  }
  .muted {
    color: var(--ed-text-muted);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .wrap {
    flex-wrap: wrap;
  }
  h2,
  h3 {
    margin: 0;
    font-weight: 500;
  }
  md-outlined-text-field,
  md-outlined-select {
    width: 100%;
    min-width: 0;
  }
  md-slider {
    min-width: 0;
  }
`;
