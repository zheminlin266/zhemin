import { readdir, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
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

for (const { folder, slug } of collections) {
  const sourceDirectory = path.join("Moments", folder);
  const destination = path.join("public", "moments", slug);
  await mkdir(destination, { recursive: true });
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
    const full = `${id}.webp`;
    // rotate() applies camera orientation; sharp strips EXIF (including GPS) by default.
    const image = await sharp(input).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(destination, full));
    const thumbnailHeight = image.width / image.height >= 2.5 ? 720 : 600;
    const thumbnail = await sharp(input).rotate().resize({ height: thumbnailHeight, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(destination, thumb));
    photos.push({ id, name, thumb: `/moments/${slug}/${thumb}`, src: `/moments/${slug}/${full}`, width: image.width, height: image.height, thumbWidth: thumbnail.width, thumbHeight: thumbnail.height });
  }

  catalog.push({ slug, photos });
  console.log(`${folder}: ${photos.length} photos prepared`);
}

for (const current of catalog) {
  const currentIds = new Set(current.photos.map(({ id }) => id));
  for (const { id } of previousCatalog.find(({ slug }) => slug === current.slug)?.photos ?? []) {
    if (currentIds.has(id)) continue;
    if (!/^[\w-]+$/.test(id)) throw new Error(`Unsafe generated photo ID: ${id}`);
    for (const suffix of ["-thumb.webp", ".webp"]) {
      await unlink(path.join("public", "moments", current.slug, `${id}${suffix}`));
    }
  }
}

await writeFile("app/content/moment-images.json", `${JSON.stringify(catalog, null, 2)}\n`);
