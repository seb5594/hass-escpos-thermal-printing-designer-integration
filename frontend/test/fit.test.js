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

import { fitScale, fitsPrinter, startPaper } from "../src/model.js";

test("designs that suit a label printer are labels of about its size", () => {
  assert.equal(fitsPrinter({ width: 240, height: 96 }, d11s), true);
  assert.equal(fitsPrinter({ width: 320, height: 240 }, d11s), false); // would shrink to 40 %
  assert.equal(fitScale({ width: 384, height: null }, d11s), 0); // an endless roll design
});

test("designs that suit a roll printer are at most as wide as it", () => {
  assert.equal(fitsPrinter({ width: 384, height: null }, roll), true);
  assert.equal(fitsPrinter({ width: 576, height: null }, roll), true); // 67 %
  assert.equal(fitsPrinter({ width: 800, height: null }, roll), false);
  assert.equal(fitsPrinter({ width: 800, height: null }, undefined), true);
});

test("new designs start in the size of the printer", () => {
  assert.deepEqual(startPaper(d11s), { width: 240, height: 96 });
  assert.deepEqual(startPaper(roll), { width: 384, height: null });
  assert.equal(startPaper(undefined), null);
});
