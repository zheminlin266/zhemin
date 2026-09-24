import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";
import { createMomentMetadata, getMoment, momentPath, moments } from "../app/content/moments.mjs";

test("Moments collections appear in the requested order", () => {
  assert.deepEqual(moments.map(({ slug }) => slug), ["wuyishan", "wanlvhu", "new-zealand", "australia", "tibet"]);
  assert.deepEqual(moments.map(({ photos }) => photos.length), [47, 12, 3, 9, 8]);
});

for (const collection of moments) {
  test(`${collection.label.en} has accessible, GPS-free thumbnails and album photos`, async () => {
    assert.equal(getMoment(collection.slug), collection);
    assert.ok(collection.photos.length > 0);
    assert.equal(new Set(collection.photos.map(({ id }) => id)).size, collection.photos.length);
    const generated = (await readdir(`public/moments/${collection.slug}`)).filter((file) => file.endsWith(".webp"));
    assert.equal(generated.length, collection.photos.length * 2, `${collection.slug} contains obsolete photos`);
    for (const photo of collection.photos) {
      assert.ok(photo.alt.cn && photo.alt.en, `${photo.id} needs descriptions in both languages`);
      assert.equal(photo.thumbHeight, photo.width / photo.height >= 2.5 ? 720 : 600, `${photo.id} has the wrong homepage thumbnail height`);
      for (const [url, width, height] of [[photo.thumb, photo.thumbWidth, photo.thumbHeight], [photo.src, photo.width, photo.height]]) {
        await access(`public${url}`);
        const metadata = await sharp(`public${url}`).metadata();
        assert.equal(metadata.width, width);
        assert.equal(metadata.height, height);
        assert.equal(metadata.exif, undefined, `${url} contains original EXIF metadata`);
      }
    }
    for (const language of ["en", "cn"]) {
      const path = momentPath(collection.slug, language);
      const metadata = createMomentMetadata(collection, language);
      assert.equal(metadata.alternates.canonical, path);
      assert.equal(metadata.alternates.languages["zh-CN"], momentPath(collection.slug, "cn"));
      assert.equal(metadata.alternates.languages.en, momentPath(collection.slug, "en"));
    }
  });
}
