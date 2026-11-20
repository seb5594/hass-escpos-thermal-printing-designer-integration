// The default of an entity or to-do variable adapts to the entities of the installation.
import assert from "node:assert/strict";
import { test } from "node:test";
import { entityOptions, variableDefaults } from "../src/model.js";

const state = (name) => ({ attributes: { friendly_name: name } });
const hass = {
  states: {
    "todo.chores": state("Chores"),
    "todo.einkaufsliste": state("Einkaufsliste"),
    "weather.forecast_home": state("Forecast Home"),
    "weather.openweathermap": state("OpenWeatherMap"),
  },
};
const shopping = { key: "list", type: "todo", default: "todo.shopping_list", hints: ["shopping", "einkauf"] };

test("a to-do variable finds the list by its name", () => {
  assert.equal(variableDefaults([shopping], hass).list, "todo.einkaufsliste");
});

test("an existing default is kept", () => {
  const present = { ...shopping, default: "todo.chores" };
  assert.equal(variableDefaults([present], hass).list, "todo.chores");
});

test("a to-do variable without a match keeps its default", () => {
  assert.equal(variableDefaults([shopping], { states: { "todo.chores": state("Chores") } }).list, "todo.shopping_list");
});

test("an entity variable falls back to the first entity of its domain", () => {
  const weather = { key: "w", type: "entity", domain: "weather", default: "weather.home" };
  assert.equal(variableDefaults([weather], hass).w, "weather.forecast_home");
});

test("matching entities are offered first", () => {
  assert.equal(entityOptions(hass, "todo", ["einkauf"])[0].value, "todo.einkaufsliste");
});
