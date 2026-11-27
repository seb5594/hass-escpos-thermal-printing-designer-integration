// A design is scaled onto the printer it is printed on.
import assert from "node:assert/strict";
import { test } from "node:test";
import { fitToPrinter } from "../src/model.js";

const roll = { width: 384, label_height: null };
const d11s = { width: 96, label_height: 240 };
const design = (width, height = null, rotate = 0) => ({ paper: { width, height }, options: { rotate }, elements: [] });

test("a label printer gets a fixed canvas, whatever the design size", () => {
  assert.deepEqual(fitToPrinter(design(384, 192), d11s), { fit: { width: 96, height: 240 }, adapted: true });
});

test("a design already sized for the label needs nothing", () => {
  assert.equal(fitToPrinter(design(96, 240), d11s).adapted, false);
  assert.equal(fitToPrinter(design(240, 96, 90), d11s).adapted, false);
});

test("a roll printer only limits the width", () => {
  assert.deepEqual(fitToPrinter(design(576, 192), roll), { fit: { width: 384, height: null }, adapted: true });
  assert.equal(fitToPrinter(design(384), roll).adapted, false);
  assert.equal(fitToPrinter(design(240), roll).adapted, false);
});

test("an unknown printer needs nothing", () => {
  assert.deepEqual(fitToPrinter(design(384), { width: null }), { fit: null, adapted: false });
  assert.equal(fitToPrinter(design(384), undefined).adapted, false);
});
