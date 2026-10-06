import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";
import robots from "../app/robots.js";
import sitemap from "../app/sitemap.js";
import { createMomentMetadata, moments } from "../app/content/moments.mjs";
import {
  createEntryJsonLd,
  createEntryMetadata,
  createHomeJsonLd,
  createHomeMetadata,
  entries,
  SITE_URL,
} from "../app/content/registry.mjs";

const pageMetadata = ["en", "cn"].flatMap((language) => [
  createHomeMetadata(language),
  ...entries.map((entry) => createEntryMetadata(entry, language)),
  ...moments.map((collection) => createMomentMetadata(collection, language)),
]);

test("canonical, sitemap, robots and reciprocal language links agree on the final host", () => {
  assert.equal(SITE_URL, "https://www.zhemin.ltd");
  assert.deepEqual(robots().rules, { userAgent: "*", allow: "/" });
  assert.equal(robots().sitemap, `${SITE_URL}/sitemap.xml`);
  const pages = sitemap();
  const byUrl = new Map(pages.map((page) => [page.url, page]));
  assert.equal(byUrl.size, pageMetadata.length);

  for (const metadata of pageMetadata) {
    const canonical = new URL(metadata.alternates.canonical, SITE_URL).href;
    const page = byUrl.get(canonical);
    assert.ok(page, `${canonical} is missing from the sitemap`);
    assert.equal(new URL(metadata.openGraph.url, SITE_URL).href, canonical);
    assert.equal(metadata.alternates.languages["x-default"], metadata.alternates.languages.en);
    assert.equal(Object.hasOwn(page, "lastModified"), false);
    for (const [language, path] of Object.entries(metadata.alternates.languages)) {
      const url = new URL(path, SITE_URL);
      assert.equal(url.origin, SITE_URL);
      assert.equal(page.alternates.languages[language], url.href);
      assert.deepEqual(byUrl.get(url.href)?.alternates, page.alternates);
    }
  }
});

test("share images exist with accurate dimensions and translated descriptions", async () => {
  const dimensions = new Map();
  for (const metadata of pageMetadata) {
    assert.deepEqual(metadata.twitter.images, metadata.openGraph.images);
    assert.equal(metadata.openGraph.images.length, 1);
    const image = metadata.openGraph.images[0];
    const url = new URL(image.url);
    assert.equal(url.origin, SITE_URL);
    assert.ok(image.alt.trim());
    const path = url.pathname === "/icon.png" ? "app/icon.png" : `public${url.pathname}`;
    if (!dimensions.has(path)) dimensions.set(path, await sharp(path).metadata());
    assert.equal(image.width, dimensions.get(path).width, path);
    assert.equal(image.height, dimensions.get(path).height, path);
  }

  for (const collection of moments) {
    for (const language of ["cn", "en"]) {
      const image = createMomentMetadata(collection, language).openGraph.images[0];
      assert.equal(new URL(image.url).pathname, collection.photos[0].thumb);
      assert.equal(image.alt, collection.photos[0].alt[language]);
    }
  }
});

test("article metadata does not infer authors or dates, or describe the icon as article content", async () => {
  const originalEntries = JSON.stringify(entries);
  for (const entry of entries) {
    for (const language of ["cn", "en"]) {
      const metadata = createEntryMetadata(entry, language);
      const jsonLd = createEntryJsonLd(entry, language);
      assert.equal(jsonLd["@type"], "Article");
      assert.equal(jsonLd.headline, entry.title[language]);
      assert.equal(jsonLd.mainEntityOfPage, new URL(metadata.alternates.canonical, SITE_URL).href);
      for (const value of [metadata, metadata.openGraph, jsonLd]) {
        for (const key of ["author", "authors", "creator", "datePublished", "dateModified", "publishedTime", "modifiedTime"]) {
          assert.equal(Object.hasOwn(value, key), false, `${entry.slug}: unexpected ${key}`);
        }
      }

      const content = await readFile(`app/${entry.section}/${entry.slug}/content.${language}.mdx`, "utf8");
      const firstImage = content.match(/!\[([^\]]*)\]\((\/[^\s)\"]+)/);
      const shareImage = metadata.openGraph.images[0];
      if (firstImage) {
        assert.equal(new URL(shareImage.url).pathname, firstImage[2]);
        assert.equal(shareImage.alt, firstImage[1]);
        assert.equal(jsonLd.image, shareImage.url);
      } else {
        assert.equal(new URL(shareImage.url).pathname, "/icon.png");
        assert.equal(Object.hasOwn(jsonLd, "image"), false);
      }
    }
  }
  assert.equal(JSON.stringify(entries), originalEntries, "metadata generation must not mutate content records");
});

test("both homepages identify the same website and person without assigning article authorship", () => {
  const people = [];
  for (const language of ["cn", "en"]) {
    const graph = createHomeJsonLd(language)["@graph"];
    assert.equal(graph.length, 2);
    const website = graph.find((node) => node["@type"] === "WebSite");
    const person = graph.find((node) => node["@type"] === "Person");
    assert.equal(website.url, `${SITE_URL}/`);
    assert.equal(person.url, `${SITE_URL}/`);
    assert.equal(website.about["@id"], person["@id"]);
    assert.deepEqual(person.sameAs, ["https://x.com/zheminlin", "https://github.com/zheminlin266"]);
    assert.ok(graph.every((node) => !Object.hasOwn(node, "author")));
    people.push(person);
  }
  assert.deepEqual(people[0], people[1]);
});
