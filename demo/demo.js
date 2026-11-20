// Runs the real design engine in the browser (Pyodide) and feeds it to the panel,
// so the demo previews exactly what a printer would receive.
import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs";

const REPOSITORY = "https://github.com/seb5594/hass-escpos-thermal-printing-designer-integration";
const TEXTS = {
  en: {
    loading: "Loading the design engine…",
    hint: "About 15 MB on the first visit, then it comes from the cache.",
    notice: "Live demo – nothing is sent to a printer, “Print” saves a PNG instead.",
    install: "Install via HACS",
    failed: "The demo could not be started. Please reload the page.",
  },
  de: {
    loading: "Der Design-Engine wird geladen …",
    hint: "Beim ersten Besuch rund 15 MB, danach kommt sie aus dem Cache.",
    notice: "Live-Demo – es wird nichts an einen Drucker gesendet, „Drucken“ speichert stattdessen ein PNG.",
    install: "Per HACS installieren",
    failed: "Die Demo konnte nicht gestartet werden. Bitte lade die Seite neu.",
  },
};
const states = (entries) =>
  Object.fromEntries(entries.map(([id, name]) => [id, { state: "on", attributes: { friendly_name: name } }]));
const SAMPLE_STATES = states([
  ["weather.forecast_home", "Forecast Home"],
  ["weather.openweathermap", "OpenWeatherMap"],
  ["todo.shopping_list", "Shopping list"],
  ["todo.chores", "Chores"],
]);

const params = new URLSearchParams(location.search);
const language = params.get("lang") ?? (navigator.language.startsWith("de") ? "de" : "en");
const text = TEXTS[language] ?? TEXTS.en;
const byId = (id) => document.getElementById(id);

function applyTheme() {
  const dark = params.get("theme") ? params.get("theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.className = dark ? "dark" : "light";
}

function download(pngBase64) {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${pngBase64}`;
  link.download = `escpos-print-${Date.now()}.png`;
  link.click();
}

async function startEngine() {
  const [pyodide, archive, config] = await Promise.all([
    loadPyodide(),
    fetch("engine.zip").then((response) => response.arrayBuffer()),
    fetch("demo-config.json").then((response) => response.json()),
  ]);
  await pyodide.loadPackage(["pillow", "jinja2"]);
  pyodide.unpackArchive(archive, "zip", { extractDir: "/engine" });
  pyodide.runPython("import sys\nsys.path.insert(0, '/engine')");
  const backend = pyodide.pyimport("backend");
  backend.VERSION = config.version;
  return backend.dispatch;
}

function createHass(dispatch) {
  return {
    language,
    states: SAMPLE_STATES,
    async callWS(message) {
      await new Promise((resolve) => setTimeout(resolve)); // let the page paint before the engine blocks it
      const reply = JSON.parse(dispatch(JSON.stringify(message)));
      if (reply.error) throw reply.error;
      if (message.type.endsWith("/print")) download(reply.result.image);
      return reply.result;
    },
  };
}

async function main() {
  document.documentElement.lang = language;
  applyTheme();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
  byId("boot-text").textContent = text.loading;
  byId("boot-hint").textContent = text.hint;
  const notice = byId("notice");
  notice.hidden = false;
  notice.append(text.notice, " ");
  notice.insertAdjacentHTML("beforeend", `<a href="${REPOSITORY}" target="_blank" rel="noopener noreferrer">${text.install}</a>`);

  try {
    const [dispatch] = await Promise.all([startEngine(), import("./panel.js")]);
    const panel = document.createElement("escpos-designer-panel");
    panel.narrow = innerWidth < 870;
    panel.hass = createHass(dispatch);
    panel.style.setProperty("--ed-footer-peek", `${notice.offsetHeight}px`); // the editor fits below the notice
    document.body.append(panel);
    byId("boot").hidden = true;
  } catch (error) {
    console.error(error);
    byId("boot-text").textContent = text.failed;
    document.querySelector(".spinner").hidden = true;
  }
}

main();
