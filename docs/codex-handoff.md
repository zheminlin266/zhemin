# Codex Cloud handoff

Repository: [zheminlin266/zhemin](https://github.com/zheminlin266/zhemin), default
branch `main`. This repository serves the bilingual personal site at
`https://www.zhemin.ltd`: English at `/`, Chinese at `/cn`.

The linked Agora and Metals sites are separate projects. The Metals pagination
work in [indexing-2026-10-23.md](./indexing-2026-10-23.md) belongs to the
`Copper_Gold_Silver_Info` repository, not this app.

## Start here

Read [AGENTS.md](../AGENTS.md), [README.md](../README.md), and
[Visual_Rules.md](../Visual_Rules.md). Before changing Next.js code, read the
relevant installed guide under `node_modules/next/dist/docs/`.

| Work | Entry point |
| --- | --- |
| Routes | `app/(en)/` and `app/(cn)/` |
| Homepage copy and content index | [registry.mjs](../app/content/registry.mjs) |
| Bilingual article and recommendation bodies | `app/articles/` and `app/recommendations/` |
| Albums, alt text, and image catalog | [moments.mjs](../app/content/moments.mjs), [moment-images.json](../app/content/moment-images.json) |
| Shared UI and styles | `app/components/`, [globals.css](../app/globals.css) |
| Validation | `tests/`, [CI workflow](../.github/workflows/ci.yml) |
| Hosting and DNS | [codex-cloud-access.md](./codex-cloud-access.md) |

Keep the production `SITE_URL`, bilingual routes, and existing design conventions
when working in a preview or cloud environment.

## Runtime and commands

Run commands from the repository root. Use Node.js **22.x** to match CI and
**npm 11.9.0** as declared in [package.json](../package.json). Install the locked
dependencies with `npm ci`; setup must not upgrade packages or rewrite the lockfile.
Development, tests, and builds require no application secrets, database, Vercel
login, or DNSPod access.

Install script, after selecting the runtime:

```bash
npm ci
```

Development startup:

```bash
npm run dev -- --hostname 0.0.0.0
```

Validation, matching CI:

```bash
npm audit --omit=dev
npm run build
```

`npm run build` runs `npm test` through `prebuild`. Use `npm test` for a standalone
test run. After building, use `npm run start -- --hostname 0.0.0.0` to check the
production server. The default port is 3000. Stop the development server before
building; both use `.next/`.

## Network access

Use the cloud environment's **Package managers** preset and additionally allow:

| Host | Reason |
| --- | --- |
| `mirrors.cloud.tencent.com` | Tarball URLs already in `package-lock.json`, including native Next.js and sharp packages |
| `fonts.googleapis.com` | IBM Plex Sans stylesheet fetched by `next/font/google` |
| `fonts.gstatic.com` | Font files fetched during compilation |

Test a fresh `npm ci` and build with these settings. A cached local build does
not prove a new cloud task can download its dependencies and fonts. Only add
production hosts when a task needs to query them.

## Assets and local state

- Published images, audio, and the image catalog are already in Git. Normal
  development and builds use those files directly.
- `Moments/` contains ignored source JPEGs kept on the Windows machine. Keep a
  separate backup. Do not run `scripts/prepare-moments.mjs` during cloud setup:
  it needs the complete source folders, regenerates assets, and prunes stale
  published files. Arrange access to the complete originals before photo work;
  commit the generated assets and metadata, never the source directory.
- `.next/`, `node_modules/`, `.vercel/`, tool caches, browser sessions, and local
  CLI credentials are not the handoff. Install dependencies afresh and configure
  service access separately when needed.
- Personal skills on the local computer do not sync to cloud environments. Put
  any required reusable project instructions in the repository. Current project
  setup depends on the documented npm commands, not a personal skill.

## Acceptance and release boundary

In a fresh cloud workspace, run `npm ci`, the audit, and the build above. Start
the production server and check:

- `/`, `/cn`, the English and Chinese copper supply-demand articles, and both
  `/moments/wuyishan` and `/cn/moments/wuyishan`: HTTP 200 with expected content.
- Album thumbnails, full-size photos, and music files load; check actual media
  playback and responsive UI in an available browser when changing those flows.
- `/robots.txt` and `/sitemap.xml`: HTTP 200; metadata still uses the production
  origin. `/en` redirects to `/`; an unknown route returns HTTP 404.

Record the tested Git SHA, runtime versions, command results, and any checks that
could not run. Review and publish the prepared cloud environment only after
setup succeeds, then verify a new task starts with the expected configuration.
Environment state does not replace committed and pushed source control.

Use `codex/*` branches for changes. Follow [AGENTS.md](../AGENTS.md) for external
writes and releases; retain the existing Vercel `zhemin` project. Check the
current Git deployment integration before pushing or merging. Credentials and
deployment/DNS authorization do not transfer with this document.

## Preparation baseline: 2026-10-27

The preparation branch starts from GitHub `main` commit
[`a6ef634`](https://github.com/zheminlin266/zhemin/commit/a6ef634a8d08e7e6a218f0a244fc2f74b06931c0).
Local validation on Node.js 24.14.0 / npm 11.9.0 passed 22 tests, the production
build (39 generated pages/endpoints), and the dependency audit (zero reported
vulnerabilities). The [baseline GitHub CI run](https://github.com/zheminlin266/zhemin/actions/runs/39930515209)
passed on Ubuntu with Node.js 22.x on 2026-10-23.

These are historical preparation results, not a Codex Cloud acceptance result.
Cloud creation, runtime/network configuration, fresh installation, and acceptance
are still pending. Local handoff files must be committed and pushed through an
authorized workflow before a GitHub checkout can receive them.

Official references: [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments)
and [AGENTS.md discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md#how-codex-discovers-guidance).
