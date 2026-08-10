import assert from "node:assert/strict";
import test from "node:test";
import { nextTheme } from "../app/preferences.mjs";

test("theme control toggles in both directions", () => {
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme("dark"), "light");
});
