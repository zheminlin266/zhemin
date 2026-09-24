import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";
import { createMomentMetadata, getMoment, momentPath, moments } from "../app/content/moments.mjs";

function hasGpsPointer(exif) {
  if (!exif) return false;
  const base = 6;
  const littleEndian = exif.toString("ascii", base, base + 2) === "II";
  const read16 = (offset) => littleEndian ? exif.readUInt16LE(offset) : exif.readUInt16BE(offset);
  const read32 = (offset) => littleEndian ? exif.readUInt32LE(offset) : exif.readUInt32BE(offset);
  const directory = base + read32(base + 4);
  const entries = read16(directory);
  for (let index = 0; index < entries; index++) {
    if (read16(directory + 2 + index * 12) === 0x8825) return true;
  }
  return false;
}

test("Moments collections appear in the requested order", () => {
  assert.deepEqual(moments.map(({ slug }) => slug), ["wuyishan", "wanlvhu", "new-zealand", "australia", "tibet"]);
  assert.deepEqual(moments.map(({ photos }) => photos.length), [46, 12, 3, 3, 8]);
});

for (const collection of moments) {
  test(`${collection.label.en} has accessible thumbnails and full-resolution, GPS-free album photos`, async () => {
    assert.equal(getMoment(collection.slug), collection);
    assert.ok(collection.photos.length > 0);
    assert.equal(new Set(collection.photos.map(({ id }) => id)).size, collection.photos.length);
    const generated = (await readdir(`public/moments/${collection.slug}`)).filter((file) => file.endsWith(".webp"));
    const originals = await readdir(`public/moments/${collection.slug}/original`);
    assert.equal(generated.length, collection.photos.length, `${collection.slug} contains obsolete WebP originals`);
    assert.equal(originals.length, collection.photos.length, `${collection.slug} contains obsolete or missing JPEG originals`);
    for (const photo of collection.photos) {
      assert.ok(photo.alt.cn && photo.alt.en, `${photo.id} needs descriptions in both languages`);
      assert.equal(photo.thumbHeight, photo.width / photo.height >= 2.5 ? 720 : 600, `${photo.id} has the wrong homepage thumbnail height`);
      await access(`public${photo.thumb}`);
      const thumbnail = await sharp(`public${photo.thumb}`).metadata();
      assert.equal(thumbnail.width, photo.thumbWidth);
      assert.equal(thumbnail.height, photo.thumbHeight);
      assert.equal(thumbnail.exif, undefined, `${photo.thumb} contains EXIF metadata`);

      await access(`public${photo.src}`);
      const original = await sharp(`public${photo.src}`).metadata();
      assert.equal(original.format, "jpeg");
      const orientationSwapsDimensions = [5, 6, 7, 8].includes(original.orientation);
      assert.equal(orientationSwapsDimensions ? original.height : original.width, photo.width);
      assert.equal(orientationSwapsDimensions ? original.width : original.height, photo.height);
      assert.ok(!hasGpsPointer(original.exif), `${photo.src} contains a GPS metadata pointer`);
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
