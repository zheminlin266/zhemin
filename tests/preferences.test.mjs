import assert from "node:assert/strict";
import test from "node:test";
import { languageFromStorage, nextLanguage, nextTheme } from "../app/preferences.mjs";

test("language and theme controls toggle in both directions", () => {
  assert.equal(nextLanguage("cn"), "en");
  assert.equal(nextLanguage("en"), "cn");
  assert.equal(nextTheme("light"), "dark");
  assert.equal(nextTheme("dark"), "light");
});

test("stored language accepts English and safely falls back to Chinese", () => {
  assert.equal(languageFromStorage("en"), "en");
  assert.equal(languageFromStorage("cn"), "cn");
  assert.equal(languageFromStorage("unexpected"), "cn");
  assert.equal(languageFromStorage(null), "cn");
});
