import assert from "node:assert/strict";
import test from "node:test";
import { copyEmailAddress, EMAIL_ADDRESS } from "../app/email-copy.mjs";

test("email copy uses the Clipboard API and falls back when it is unavailable", async () => {
  let clipboardValue = null;
  await copyEmailAddress({
    clipboard: { writeText: async (value) => { clipboardValue = value; } },
    fallback: () => false,
  });
  assert.equal(clipboardValue, EMAIL_ADDRESS);

  let fallbackValue = null;
  await copyEmailAddress({
    clipboard: { writeText: async () => { throw new Error("denied"); } },
    fallback: (value) => { fallbackValue = value; return true; },
  });
  assert.equal(fallbackValue, EMAIL_ADDRESS);
});

test("email copy reports failure when neither copy method works", async () => {
  await assert.rejects(
    copyEmailAddress({ clipboard: null, fallback: () => false }),
    /Unable to copy/,
  );
});
