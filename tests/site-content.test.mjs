import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const bilingualPages = [
  "app/articles/three-questions",
  "app/articles/lucky-companies",
  "app/articles/copper-supply-demand",
  "app/articles/pendle-industry",
  "app/articles/pendle-market-observation",
  "app/articles/blockchain-and-time",
  "app/recommendations/mental-models",
  "app/recommendations/concentration-diversification",
  "app/recommendations/zhang-yao",
];

test("every published entry has Chinese and English content without expiring Notion image URLs", async () => {
  for (const directory of bilingualPages) {
    const [chinese, english] = await Promise.all([
      readFile(`${directory}/content.cn.mdx`, "utf8"),
      readFile(`${directory}/content.en.mdx`, "utf8"),
    ]);

    assert.ok(chinese.trim().length > 0, `${directory} is missing Chinese content`);
    assert.ok(english.trim().length > 0, `${directory} is missing English content`);
    assert.doesNotMatch(chinese + english, /prod-files-secure|X-Amz-Signature/);
  }
});
