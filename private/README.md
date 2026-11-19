# peakism — operational notes

Internal. Not linked from the public page, not part of the public story.

## Structure

Privately held, for-profit. Earnings are shared among the holders.

A GitHub org cannot hold money, sign contracts, or distribute anything — it is
only a namespace. So before any revenue exists, this needs a real entity
(company or partnership) and a written holder agreement covering: who holds
what percentage, how distributions are decided, what happens when someone
leaves, and who signs. Public wording stays vague until then; a public
"profits are shared with holders" claim with no entity behind it is an
unsecured promise.

## What runs where

| Thing | Address | Host |
| --- | --- | --- |
| Public page | https://peakism.pages.dev | Cloudflare Pages, project `peakism`, folder `docs/` |
| Public page (mirror) | https://peakism-co.github.io/peakism/ | GitHub Pages, this repo |
| Dashboard | https://peakism-private.sofikuw.workers.dev | Cloudflare Worker, Basic Auth |

Cloudflare account `1777002bf434878092e51eda7270ee97`, workers.dev subdomain
`sofikuw`.

## Deploy

Both need `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Public page:

```bash
npx wrangler pages deploy docs --project-name peakism --branch main
```

Dashboard — `private/` holds its own `wrangler.toml`:

```bash
cd private
npx wrangler secret put PEAKISM_USER
npx wrangler secret put PEAKISM_PASS
npx wrangler deploy
```

Credentials live in `.secrets/private-credentials.txt` (mode 600, gitignored).

## Dashboard behaviour

`private/src/worker.js` checks the `Authorization` header with a constant-time
compare, then serves `private/public/` through the `ASSETS` binding with
`run_worker_first = true`.

It sends `Cache-Control`, `CDN-Cache-Control` and
`Cloudflare-CDN-Cache-Control: no-store` on the authorised response. Without
the two CDN headers, workers.dev served a stale copy of the gated page from the
edge — two different versions alternating between requests. Do not remove them.

## Licensing map

| Repo | Licence |
| --- | --- |
| `peakism-co/peakism` | Peakism 1.0 |
| `sofikuw/MOSS` | Peakism 1.0 |
| `sofikuw/Reve` | Peakism 1.0 |
| `sofikuw/anImestream-extensions` | Peakism 1.0 |
| `sofikuw/commit` | Peakism 1.0 |
| `sofikuw/anImestream` | GPL-3.0 — upstream fork |
| `sofikuw/Risk`, `sofikuw/claim` | MIT — upstream |
| `sofikuw/PrimeThermal-…` | none — upstream |
| `sofikuw`, `sofikuw.github.io`, `Apex-Cleaner`, `C`, `creamy-base`, `Cloud-1` | no licence file, by choice |

Reve and MOSS were relicensed from GPL-3.0 in November 2026. Every commit in
both is the owner's, so nothing needed contributor permission. Copies already
published under GPL-3.0 keep those rights; only new versions are proprietary.

## Domains

No free subdomain was claimed. is-a.dev and is-a-good.dev forbid commercial use;
rweb.site and foo.ng allow only a single CNAME; open-domains left GitHub for a
web dashboard; vexr.dev warns mail will not work on its subdomains. The studio
is registering its own domain instead.
