// Renders assets/icon.svg into the PNG files Home Assistant expects in brand/.
// Usage: node scripts/render_brand.mjs   (needs Playwright with Chromium)
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "custom_components/escpos_designer/brand");
const iconSvg = readFileSync(resolve(root, "assets/icon.svg"), "utf8");
mkdirSync(outDir, { recursive: true });

const lockup = (textColor, subColor) => `
<div style="display:flex;align-items:center;gap:28px;height:256px;font-family:'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif">
  <div style="width:224px;height:224px">${iconSvg.replace('width="512" height="512"', 'width="224" height="224"')}</div>
  <div style="line-height:1.02">
    <div style="font-size:78px;font-weight:800;letter-spacing:-2px;color:${textColor}">ESC/POS</div>
    <div style="font-size:78px;font-weight:300;letter-spacing:-1px;color:${subColor}">Designer</div>
  </div>
</div>`;

const jobs = [
  { file: "icon", html: iconSvg, width: 256, height: 256 },
  { file: "logo", html: lockup("#1b2733", "#0b6fd6"), width: 640, height: 256 },
  { file: "dark_logo", html: lockup("#ffffff", "#7fd0ff"), width: 640, height: 256 },
];

const browser = await chromium.launch();
for (const { file, html, width, height } of jobs) {
  for (const scale of [1, 2]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
    await page.setContent(
      `<body style="margin:0;background:transparent"><div style="width:${width}px;height:${height}px">${html.replace(
        /<svg /,
        `<svg style="width:100%;height:100%" `,
      )}</div></body>`,
    );
    const name = scale === 1 ? `${file}.png` : `${file}@2x.png`;
    await page.screenshot({ path: resolve(outDir, name), omitBackground: true });
    await page.close();
  }
}
await browser.close();
