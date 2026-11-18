# Peakism

Brand, license and web presence for **Peakism** — an independent, for-profit software studio.

Mark: `∧` · Contact: 84sofik@gmail.com

## Layout

| Path | What it is |
| --- | --- |
| `LICENSE` | Peakism Proprietary License 1.0 — the org-wide license |
| `brand/mark.svg` | the `∧` mark |
| `site/` | public "under construction" page — Cloudflare Pages and GitHub Pages |
| `private/` | password-protected internal dashboard — Cloudflare Worker |

## Deploy

Public page:

```bash
npx wrangler pages deploy site --project-name peakism --branch main
```

Private dashboard (`private/` holds its own `wrangler.toml`):

```bash
cd private
npx wrangler secret put PEAKISM_USER
npx wrangler secret put PEAKISM_PASS
npx wrangler deploy
```

Both need `CLOUDFLARE_API_TOKEN` and use account `1777002bf434878092e51eda7270ee97`.

## Licensing

Owned code is licensed under the Peakism Proprietary License 1.0 (see `LICENSE`).
Forks and third-party components keep their upstream terms — GPL-3.0 repos cannot be
relicensed unilaterally, and MIT/Unlicense forks must keep their upstream notices.
That is recorded in the private dashboard, not negotiated per repo.

This README is not legal advice.
