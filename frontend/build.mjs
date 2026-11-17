// Bundles the panel into one ES module inside the integration folder.
// Usage: npm run build   (or: npm run watch)
import { build, context } from "esbuild";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const options = {
  entryPoints: [resolve(root, "src/main.js")],
  outfile: resolve(root, "../custom_components/escpos_designer/frontend/escpos-designer-panel.js"),
  bundle: true,
  format: "esm",
  target: "es2022",
  minify: true,
  legalComments: "none",
  banner: {
    js: "/* ESC/POS Thermal Printer Designer panel - MIT License - https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration */",
  },
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const watcher = await context({ ...options, minify: false, sourcemap: "inline" });
  await watcher.watch();
} else {
  await build(options);
}
