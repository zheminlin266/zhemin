import assert from "node:assert/strict";
import test from "node:test";
import { nextTheme, shouldHideControls } from "../app/preferences.mjs";

test("theme control toggles in both directions", () => {
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme("dark"), "light");
});

test("site controls hide only after the scroll threshold", () => {
  assert.equal(shouldHideControls(64), false);
  assert.equal(shouldHideControls(65), true);
});
