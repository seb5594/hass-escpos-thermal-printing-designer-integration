// Every language must have the same keys as English, and every key the code uses must exist.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import de from "../src/i18n/de.js";
import en from "../src/i18n/en.js";

const SOURCE = join(dirname(fileURLToPath(import.meta.url)), "../src");

function sourceFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".js") ? [path] : [];
  });
}

test("German has exactly the keys of English", () => {
  assert.deepEqual(Object.keys(de).sort(), Object.keys(en).sort());
});

test("no text is empty", () => {
  for (const [name, dictionary] of Object.entries({ en, de })) {
    for (const [key, text] of Object.entries(dictionary)) assert.ok(text.trim(), `${name}: ${key}`);
  }
});

test("placeholders match between languages", () => {
  const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
  for (const key of Object.keys(en)) {
    if (/\{\{/.test(en[key])) continue; // Jinja examples, not placeholders
    assert.deepEqual(placeholders(de[key]), placeholders(en[key]), key);
  }
});

test("every statically referenced key exists", () => {
  const used = new Set();
  for (const file of sourceFiles(SOURCE)) {
    if (file.includes("i18n")) continue;
    for (const match of readFileSync(file, "utf8").matchAll(/\bt\(\s*"([a-zA-Z0-9_.]+)"/g)) used.add(match[1]);
  }
  const missing = [...used].filter((key) => !(key in en));
  assert.deepEqual(missing, []);
});
