/**
 * Design documents on the client: element factories, editing helpers and the
 * undo history. The server validates and fills in every default, so a client
 * document only needs the fields it actually changed.
 */

export const uid = () => Math.random().toString(36).slice(2, 10);

export const RUN_DEFAULTS = Object.freeze({
  font: "sans",
  size: 24,
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  invert: false,
});

export const SIZE_PRESETS = [16, 20, 24, 32, 40, 56, 80];

export const DATE_FORMATS = ["%d.%m.%Y", "%A, %d. %B", "%d.%m.%Y %H:%M", "%H:%M", "%Y-%m-%d", "%B %Y"];

export const PAPER_FALLBACK = [
  { id: "58mm", width: 384, height: null },
  { id: "80mm", width: 576, height: null },
  { id: "label_30x14", width: 240, height: 112 },
  { id: "label_40x30", width: 320, height: 240 },
];

const ELEMENT_FACTORIES = {
  text: () => ({ runs: [{ text: "", ...RUN_DEFAULTS }], align: "left" }),
  markdown: () => ({ source: "# Hello\n**Bold**, *italic* and ~~strike~~", font: "sans", size: 24 }),
  datetime: () => ({ format: "%d.%m.%Y", prefix: "", suffix: "", offset_days: 0, align: "center", ...RUN_DEFAULTS }),
  list: () => ({
    source: { kind: "static", items: [{ text: "First" }, { text: "Second" }] },
    style: "checkbox",
    font: "sans",
    size: 24,
  }),
  divider: () => ({ style: "solid", thickness: 2, width_pct: 100 }),
  qr: () => ({ data: "https://", size_pct: 60, level: "M", caption: "", align: "center" }),
  barcode: () => ({ kind: "code128", data: "12345678", height: 90, module_width: 2, show_text: true, align: "center" }),
  image: () => ({ data: "", width_pct: 100, dither: "floyd-steinberg", threshold: 128, align: "center" }),
  sticker: () => ({ emoji: "😀", size: 96, align: "center" }),
  spacer: () => ({ height: 16 }),
};

export const ELEMENT_TYPES = Object.keys(ELEMENT_FACTORIES);

/** A new element of `type` with sensible starting values. */
export function createElement(type, overrides = {}) {
  return { id: uid(), type, ...ELEMENT_FACTORIES[type](), ...overrides };
}

export function blankDocument(overrides = {}) {
  return {
    name: "",
    paper: { width: 384, height: null },
    frame: { style: "none", thickness: 3, padding: 10 },
    options: { cut: "partial", feed: 2, rotate: 0, mirror: false, invert: false, margin: 8 },
    elements: [],
    ...overrides,
  };
}

/** The starting points offered when creating a new design. */
export const STARTERS = [
  {
    id: "blank",
    icon: "text",
    build: () => blankDocument({ elements: [createElement("text", { align: "center" })] }),
  },
  {
    id: "markdown",
    icon: "markdown",
    build: () =>
      blankDocument({
        elements: [
          createElement("markdown", {
            source: "<center>\n# Title ❤️\n</center>\n---\n- [ ] First task\n- [ ] Second task\n---\n**Bold**, *italic*, ~~strike~~ and ==inverted==",
          }),
        ],
      }),
  },
  {
    id: "label",
    icon: "datetime",
    build: () =>
      blankDocument({
        paper: { width: 320, height: 240 },
        frame: { style: "rounded", thickness: 3, padding: 8 },
        elements: [createElement("text", { align: "center", runs: [{ text: "Label", ...RUN_DEFAULTS, size: 40, font: "display" }] })],
      }),
  },
  {
    id: "receipt80",
    icon: "list",
    build: () => blankDocument({ paper: { width: 576, height: null }, elements: [createElement("text")] }),
  },
];

export function elementHasAlign(type) {
  return !["divider", "spacer", "list"].includes(type);
}

export function plainText(element) {
  switch (element.type) {
    case "text":
      return element.runs.map((run) => run.text).join("");
    case "markdown":
      return element.source.split("\n").find((line) => line.trim()) ?? "";
    case "datetime":
      return `${element.prefix || ""}${element.format}`;
    case "list":
      return element.source.kind === "todo"
        ? element.source.entity_id
        : element.source.items.map((item) => item.text).join(", ");
    case "qr":
    case "barcode":
      return element.data;
    case "sticker":
      return element.emoji;
    default:
      return "";
  }
}

/** Move an item inside an array (returns a new array). */
export function moveItem(items, from, to) {
  if (to < 0 || to >= items.length || from === to) return items;
  const copy = [...items];
  copy.splice(to, 0, copy.splice(from, 1)[0]);
  return copy;
}

const matchesHint = (option, hints) => {
  const haystack = `${option.value} ${option.label}`.toLowerCase();
  return hints.some((hint) => haystack.includes(hint.toLowerCase()));
};

/** The entities of one domain as dropdown options: name matches for `hints` first, then by name. */
export function entityOptions(hass, domain, hints = []) {
  return Object.entries(hass?.states ?? {})
    .filter(([id]) => id.startsWith(`${domain}.`))
    .map(([id, state]) => ({ value: id, label: state.attributes.friendly_name ?? id }))
    .sort((a, b) => matchesHint(b, hints) - matchesHint(a, hints) || a.label.localeCompare(b.label));
}

/**
 * The default value of every variable a template declares. An entity or to-do variable whose
 * default doesn't exist in this installation starts with the entity that matches its hints
 * (a shopping list is found by name); plain entity variables fall back to the first of the domain.
 */
export function variableDefaults(variables = [], hass) {
  return Object.fromEntries(
    variables.map(({ key, type, domain, hints = [], default: value }) => {
      const entityDomain = type === "todo" ? "todo" : type === "entity" ? domain : "";
      if (entityDomain && !hass?.states?.[value]) {
        const options = entityOptions(hass, entityDomain, hints);
        const best = options.find((option) => matchesHint(option, hints)) ?? (type === "entity" ? options[0] : undefined);
        return [key, best?.value ?? value ?? ""];
      }
      return [key, value ?? ""];
    }),
  );
}

/** Snapshot-based undo/redo. */
export class History {
  constructor(limit = 60) {
    this._limit = limit;
    this._past = [];
    this._future = [];
  }

  get canUndo() {
    return this._past.length > 0;
  }

  get canRedo() {
    return this._future.length > 0;
  }

  /** Remember `snapshot` as the state before a change. */
  record(snapshot) {
    this._past.push(structuredClone(snapshot));
    if (this._past.length > this._limit) this._past.shift();
    this._future = [];
  }

  undo(current) {
    if (!this.canUndo) return null;
    this._future.push(structuredClone(current));
    return this._past.pop();
  }

  redo(current) {
    if (!this.canRedo) return null;
    this._past.push(structuredClone(current));
    return this._future.pop();
  }

  clear() {
    this._past = [];
    this._future = [];
  }
}

/** Returns a function that waits `delay` ms after its last call before running `fn`. */
export function debounce(fn, delay) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}

/** Scale and grayscale a picture file client-side so it embeds compactly. */
export async function pictureToDataUri(file, maxWidth = 576) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

/**
 * How the finished design is scaled onto the chosen printer, as `{ fit, adapted }`.
 * A label printer has a fixed canvas (printhead width x label length), a roll printer only a
 * width. `fit` is sent along with preview and print; the server scales the image down onto it.
 * `adapted` says whether that changes anything. An unknown printer needs nothing.
 */
export function fitToPrinter(document, printer) {
  const width = printer?.width;
  if (!width) return { fit: null, adapted: false };
  const { paper, options = {} } = document;
  const turned = (options.rotate ?? 0) % 180 !== 0;
  const designWidth = turned ? paper.height : paper.width;
  const designHeight = turned ? paper.width : paper.height;
  const label = printer.label_height;
  if (label) {
    const same = [designWidth, designHeight].join() === [width, label].join();
    return { fit: { width, height: label }, adapted: !same };
  }
  return { fit: { width, height: null }, adapted: Boolean(designWidth) && designWidth > width };
}
