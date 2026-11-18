# Peaqism

Brand, license and web presence for **Peaqism** — an independent, for-profit software studio.

Mark: `∧` · Contact: 84sofik@gmail.com

## Layout

| Path | What it is |
| --- | --- |
| `LICENSE` | Peaqism Proprietary License 1.0 — the org-wide license |
| `brand/mark.svg` | the `∧` mark |
| `site/` | public "under construction" page — Cloudflare Pages and GitHub Pages |
| `private/` | password-protected internal dashboard — Cloudflare Worker |

## Deploy

Public page:

```bash
npx wrangler pages deploy site --project-name peaqism --branch main
```

Private dashboard (`private/` holds its own `wrangler.toml`):

```bash
cd private
npx wrangler secret put PEAQISM_USER
npx wrangler secret put PEAQISM_PASS
npx wrangler deploy
```

Both need `CLOUDFLARE_API_TOKEN` and use account `1777002bf434878092e51eda7270ee97`.

## Domains

| Address | Where it comes from |
| --- | --- |
| `peaqism.pages.dev` | Cloudflare Pages, project `peaqism` |
| `peaqism.github.io/peaqism` | GitHub Pages, org repo |
| `peaqism-private.sofikuw.workers.dev` | Cloudflare Worker, password-gated |
| `peaqism.runs-on.dev` | claimed 2026-11-18 — `A` + `MX` + `TXT`, PR 461 |

`peaqism.runs-on.dev` is a free subdomain from the [runs-on.dev](https://runs-on.dev)
registry. It was chosen over is-a.dev, is-a-good.dev, rweb.site and foo.ng because
those either ban commercial use or only allow one record type, while runs-on.dev
accepts `A` + `MX` + `TXT` on the same name, which is what a mail-capable address
needs. The claim lives in `domains/peaqism.json` in that registry.

Once merged:

1. GitHub Pages → `peaqism/peaqism` → custom domain `peaqism.runs-on.dev` (the `A` records already point there).
2. Add `peaqism.runs-on.dev` at [ImprovMX](https://improvmx.com) and create the alias — the `MX` records are already published.
3. `peaqism.dev` / `.com` stay the real long-term purchase; this is a stopgap that costs nothing.

## Licensing

Owned code is licensed under the Peaqism Proprietary License 1.0 (see `LICENSE`).
Forks and third-party components keep their upstream terms — GPL-3.0 repos cannot be
relicensed unilaterally, and MIT/Unlicense forks must keep their upstream notices.
That is recorded in the private dashboard, not negotiated per repo.

This README is not legal advice.
