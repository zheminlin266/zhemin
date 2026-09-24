import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const collections = [
  { folder: "Wuyishan", slug: "wuyishan" },
  { folder: "Wanlvhu", slug: "wanlvhu" },
  { folder: "New Zealand", slug: "new-zealand" },
  { folder: "Australia", slug: "australia" },
  { folder: "Tibet", slug: "tibet" },
];
const catalog = [];
const previousCatalog = JSON.parse(await readFile("app/content/moment-images.json", "utf8"));

function orientationExif(orientation) {
  if (!orientation || orientation === 1) return null;
  const payload = Buffer.alloc(32);
  payload.write("Exif\0\0", 0, "binary");
  payload.write("II", 6, "ascii");
  payload.writeUInt16LE(42, 8);
  payload.writeUInt32LE(8, 10);
  payload.writeUInt16LE(1, 14);
  payload.writeUInt16LE(0x0112, 16);
  payload.writeUInt16LE(3, 18);
  payload.writeUInt32LE(1, 20);
  payload.writeUInt16LE(orientation, 24);
  const segment = Buffer.alloc(4 + payload.length);
  segment[0] = 0xff;
  segment[1] = 0xe1;
  segment.writeUInt16BE(payload.length + 2, 2);
  payload.copy(segment, 4);
  return segment;
}

// Drop metadata-bearing JPEG APP segments while preserving the compressed image scan byte-for-byte.
function stripLocationMetadata(jpeg, orientation) {
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8) throw new Error("Expected a JPEG image");
  const parts = [jpeg.subarray(0, 2)];
  const safeOrientation = orientationExif(orientation);
  let insertedOrientation = false;
  let offset = 2;

  while (offset < jpeg.length) {
    const markerStart = offset;
    if (jpeg[offset++] !== 0xff) throw new Error("Invalid JPEG marker sequence");
    while (jpeg[offset] === 0xff) offset++;
    const marker = jpeg[offset++];

    if (marker === 0xda) {
      if (safeOrientation && !insertedOrientation) parts.push(safeOrientation);
      parts.push(jpeg.subarray(markerStart));
      return Buffer.concat(parts);
    }

    if (marker === 0xd9 || marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      parts.push(jpeg.subarray(markerStart, offset));
      continue;
    }

    if (offset + 2 > jpeg.length) throw new Error("Truncated JPEG segment length");
    const length = jpeg.readUInt16BE(offset);
    const end = offset + length;
    if (length < 2 || end > jpeg.length) throw new Error("Invalid JPEG segment length");

    const keep = marker === 0xe0 || marker === 0xe2 || marker === 0xee;
    if (marker === 0xe1 && safeOrientation && !insertedOrientation) {
      parts.push(safeOrientation);
      insertedOrientation = true;
    } else if (keep || (marker < 0xe0 || marker > 0xef) && marker !== 0xfe) {
      parts.push(jpeg.subarray(markerStart, end));
    }
    offset = end;
  }

  throw new Error("JPEG has no image scan");
}

async function removeAsset(url) {
  if (!url.startsWith("/moments/")) throw new Error(`Unexpected generated asset URL: ${url}`);
  const file = path.join("public", ...url.slice(1).split("/"));
  await unlink(file).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
}

for (const { folder, slug } of collections) {
  const sourceDirectory = path.join("Moments", folder);
  const destination = path.join("public", "moments", slug);
  const originalsDirectory = path.join(destination, "original");
  await Promise.all([mkdir(destination, { recursive: true }), mkdir(originalsDirectory, { recursive: true })]);
  const files = (await readdir(sourceDirectory)).filter((file) => /\.jpe?g$/i.test(file)).sort();
  if (!files.length) throw new Error(`No photos in ${sourceDirectory}`);
  const photos = [];

  for (const file of files) {
    const name = path.parse(file).name;
    const id = slug === "wuyishan" || slug === "wanlvhu"
      ? name // Keep existing photo URLs and anchors stable.
      : `p-${createHash("sha256").update(file).digest("hex").slice(0, 12)}`;
    const input = path.join(sourceDirectory, file);
    const thumb = `${id}-thumb.webp`;
    const original = `${id}.jpg`;
    const metadata = await sharp(input).metadata();
    const oriented = [5, 6, 7, 8].includes(metadata.orientation);
    const width = oriented ? metadata.height : metadata.width;
    const height = oriented ? metadata.width : metadata.height;
    const thumbnailHeight = width / height >= 2.5 ? 720 : 600;
    const thumbnail = await sharp(input)
      .rotate()
      .resize({ height: thumbnailHeight, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(destination, thumb));

    const sourceBytes = await readFile(input);
    const publishedOriginal = stripLocationMetadata(sourceBytes, metadata.orientation);
    await writeFile(path.join(originalsDirectory, original), publishedOriginal);

    photos.push({
      id,
      name,
      thumb: `/moments/${slug}/${thumb}`,
      src: `/moments/${slug}/original/${original}`,
      width,
      height,
      thumbWidth: thumbnail.width,
      thumbHeight: thumbnail.height,
    });
  }

  catalog.push({ slug, photos });
  console.log(`${folder}: ${photos.length} full-resolution photos prepared`);
}

for (const current of catalog) {
  const previous = previousCatalog.find(({ slug }) => slug === current.slug)?.photos ?? [];
  const currentById = new Map(current.photos.map((photo) => [photo.id, photo]));
  for (const oldPhoto of previous) {
    const next = currentById.get(oldPhoto.id);
    if (!next || oldPhoto.src !== next.src) await removeAsset(oldPhoto.src);
    if (!next) await removeAsset(oldPhoto.thumb);
  }

  const originalsDirectory = path.join("public", "moments", current.slug, "original");
  const currentOriginals = new Set(current.photos.map((photo) => path.basename(photo.src)));
  for (const file of await readdir(originalsDirectory)) {
    if (currentOriginals.has(file)) continue;
    if (!/^[-\w]+\.jpg$/i.test(file)) throw new Error(`Unexpected original asset: ${file}`);
    await unlink(path.join(originalsDirectory, file));
  }
}

await writeFile("app/content/moment-images.json", `${JSON.stringify(catalog, null, 2)}\n`);
