# zhemin.ltd

Source for [zhemin.ltd](https://www.zhemin.ltd/), Zhemin Lin's bilingual personal site. It features projects, essays, photo albums (Moments), and recommendations. English pages live at `/`; Chinese pages use `/cn`.

Built with Next.js App Router, React, and MDX.

## Structure

- `app/(en)/` and `app/(cn)/` — English and Chinese routes.
- `app/content/registry.mjs` — homepage copy and article/recommendation index; bilingual MDX lives in `app/articles/` and `app/recommendations/`.
- `app/content/moments.mjs` and `moment-images.json` — album labels, photo descriptions, and image catalog.
- `app/components/` — shared site and gallery components.
- `public/` — published images; `scripts/prepare-moments.mjs` prepares album images from ignored local originals.
- `tests/` — Node.js tests.

## Develop

```bash
npm ci
npm run dev
```

Run `npm test` to check changes or `npm run build` to check and build the site.

## Content

Register articles and recommendations in `app/content/registry.mjs`, with `content.en.mdx` and `content.cn.mdx` under their respective directories. Add image dimensions in `app/content/image-dimensions.mjs` and follow [Visual_Rules.md](./Visual_Rules.md) for UI changes.

Moments has five albums: Wuyishan, Wanlvhu, AUS/NZ (澳新), Tibet, and Cloud (云). Album pages live at `/moments/<slug>` and `/cn/moments/<slug>`. Place source JPEGs under the ignored `Moments/` directory in `Wuyishan/`, `Wanlvhu/`, `AUS-NZ/`, `Tibet/`, or `Cloud/`, then run:

```bash
node scripts/prepare-moments.mjs
```

Existing New Zealand photos precede Australia photos in the combined `aus-nz` album. Cloud JPEG filenames are numeric (e.g. `6.jpg`, `6.5.jpg`, `10.jpg`) and are sorted by number. The script writes WebP thumbnails, full-resolution JPEGs without location metadata, and `app/content/moment-images.json`. Add bilingual alt text in `app/content/moments.mjs`; never commit the source photos in `Moments/`.

## Search metadata

`SITE_URL` is `https://www.zhemin.ltd`, matching the production redirect target. Canonicals, bilingual alternates (with English as `x-default`), structured data, robots, and the sitemap use this origin. The homepage identifies the website and its owner; article metadata does not infer authorship. Month-only dates remain visible but are not expanded into publication dates or sitemap modification timestamps.

For entries with images, set `shareImage` to the first body image with the same bilingual alt text. Metadata uses its registered dimensions; entries without body images use the site icon for sharing, without identifying it as an article image. Homepages use the existing portrait and albums use their first photo's thumbnail. `tests/seo.test.mjs` checks language links, image assets, attribution, and date handling as part of `npm test`.

After an approved deployment, submit `https://www.zhemin.ltd/sitemap.xml` in the main site's Google Search Console and Bing Webmaster Tools properties. Check the selected canonical and crawl status, then review brand searches and available AI-search reports after 7, 28, and 56 days. Dashboard verification, submission, and production deployment require separate authorization.
