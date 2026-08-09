import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { imageDimensions } from "../app/content/image-dimensions.mjs";
import {
  createEntryMetadata,
  entries,
  entryPath,
  getEntry,
  homePath,
} from "../app/content/registry.mjs";

const localImagePattern = /!\[([^\]]*)\]\((\/[^\s)\"]+)(?:\s+\"[^\"]*\")?\)/g;

async function exists(path) {
  await access(path);
  return true;
}

test("content registry has unique bilingual routes and complete page files", async () => {
  const [chineseLayout, englishLayout] = await Promise.all([
    readFile("app/(cn)/layout.js", "utf8"),
    readFile("app/(en)/layout.js", "utf8"),
  ]);
  assert.ok(chineseLayout.includes('<html lang="zh-CN"'));
  assert.ok(englishLayout.includes('<html lang="en"'));

  const paths = entries.flatMap((entry) => [entryPath(entry, "cn"), entryPath(entry, "en")]);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(homePath("cn"), "/");
  assert.equal(homePath("en"), "/en");

  for (const entry of entries) {
    assert.equal(getEntry(entry.section, entry.slug), entry);
    const chinesePagePath = `app/(cn)/${entry.section}/${entry.slug}/page.js`;
    const englishPagePath = `app/(en)/en/${entry.section}/${entry.slug}/page.js`;
    const [chinesePage, englishPage] = await Promise.all([
      readFile(chinesePagePath, "utf8"),
      readFile(englishPagePath, "utf8"),
    ]);
    const registryLookup = `getEntry(\"${entry.section}\", \"${entry.slug}\")`;
    assert.ok(chinesePage.includes(registryLookup), `${chinesePagePath} references the wrong registry entry`);
    assert.ok(englishPage.includes(registryLookup), `${englishPagePath} references the wrong registry entry`);
    assert.ok(chinesePage.includes(`content.cn.mdx`), `${chinesePagePath} references the wrong language`);
    assert.ok(englishPage.includes(`content.en.mdx`), `${englishPagePath} references the wrong language`);

    for (const language of ["cn", "en"]) {
      const metadata = createEntryMetadata(entry, language);
      assert.equal(metadata.alternates.canonical, entryPath(entry, language));
      assert.equal(metadata.alternates.languages["zh-CN"], entryPath(entry, "cn"));
      assert.equal(metadata.alternates.languages.en, entryPath(entry, "en"));
    }
  }
});

test("published bilingual MDX is structured and references durable local assets", async () => {
  for (const entry of entries) {
    const directory = `app/${entry.section}/${entry.slug}`;
    const [chinese, english] = await Promise.all([
      readFile(`${directory}/content.cn.mdx`, "utf8"),
      readFile(`${directory}/content.en.mdx`, "utf8"),
    ]);

    for (const [language, content] of [["cn", chinese], ["en", english]]) {
      assert.ok(content.trim().length > 0, `${directory} is missing ${language} content`);
      assert.doesNotMatch(content, /prod-files-secure|X-Amz-Signature/);
      assert.doesNotMatch(content.trimStart(), /^---(?:\r?\n|$)/, `${directory} starts with an unused divider`);

      const firstHeading = content.match(/^#{1,6} /m)?.[0].trim();
      if (firstHeading) assert.equal(firstHeading, "##", `${directory} skips the first article heading level in ${language}`);

      for (const match of content.matchAll(localImagePattern)) {
        const [, alt, path] = match;
        assert.ok(alt.trim(), `${path} is missing alternative text`);
        await exists(`public${path}`);
        assert.ok(imageDimensions[path], `${path} is missing intrinsic dimensions`);
      }
    }
  }
});
