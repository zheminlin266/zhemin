# zhemin.ltd

This repository contains the source for [zhemin.ltd](https://www.zhemin.ltd/), a bilingual personal website by Zhemin Lin. The site brings together a concise biography, research projects, essays, and curated recommendations. It is designed as a quiet reading space for notes on technology, consumer businesses, investing, and questions worth revisiting.

## Stack

- Next.js App Router
- React
- MDX for long-form content
- Static generation with bilingual Chinese and English routes

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Run the test suite:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

The build runs the tests automatically.

## Content conventions

- Register every article or recommendation in `app/content/registry.mjs` with its route, date, bilingual title, and description.
- Maintain both `content.cn.mdx` and `content.en.mdx` files for published content.
- Provide page wrappers for the English route and its `/cn` counterpart.
- Store local images in `public/`, add accurate alt text, and register their intrinsic dimensions in `app/content/image-dimensions.mjs`.

For Moments, put original JPEGs in one of the ignored `Moments/Wuyishan/`, `Moments/Wanlvhu/`, `Moments/New Zealand/`, `Moments/Australia/`, or `Moments/Tibet/` folders, then run `node scripts/prepare-moments.mjs`. This generates EXIF-free WebP thumbnails, full-resolution JPEG album images with location metadata removed, and `app/content/moment-images.json` under `public/moments/`. Add bilingual descriptions for new photos in `app/content/moments.mjs` and run `npm test` before publishing. Do not commit the original photos.

English pages use unprefixed routes, with Chinese pages under `/cn`, for example `/articles/example` and `/cn/articles/example`.

## Visual rules

New or adjusted interface work should follow [`Visual Rules.md`](./Visual_Rules.md), which documents the site's typography, layout, colors, components, interaction, motion, and accessibility conventions.
