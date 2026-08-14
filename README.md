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
- Provide lightweight page wrappers for the Chinese route and its `/en` counterpart.
- Store local images in `public/`, add accurate alt text, and register their intrinsic dimensions in `app/content/image-dimensions.mjs`.

Chinese pages keep the existing URL structure. English pages use the same path below `/en`, for example `/articles/example` and `/en/articles/example`.

## Visual rules

New or adjusted interface work should follow [`Visual Rules.md`](./Visual_Rules.md), which documents the site's typography, layout, colors, components, interaction, motion, and accessibility conventions.
