# Polyglot 1.14.0 migration

Supersedes the deferred pilot in the architecture audit. Independent production
builds established that the four Workshop HTML differences were serialization
changes: removal of redundant Content-Type metadata and whitespace/void-tag
formatting. Normalized DOM comparisons were equal; links and texts unchanged.
The exact route allowlist is `polyglot_1_14_contract_allowlist.json`.

Only Polyglot was updated and pinned, including its lock checksum. Upstream now
duplicates output itself, so the frozen-string patch was removed. The new
`polyglot_read_lifecycle.rb` prepares missing language state at initialization
for Doctor's direct site read. No diagnostic checks are suppressed.

An eight-post-per-language fixture exposed a pre-existing pagination path bug:
`/blog/blog/page/2/`. The relative suffix is now `/page/:num/`, producing
`/blog/page/2/` and matching localized variants. Current published routes do not
change because the site has only two posts per locale.

## Verification

- Production build: PASS, 31.863 seconds.
- Doctor: PASS, Everything looks fine.
- Pagination: PASS, eight posts per locale split 6+2, no duplicates, omissions
  or language leaks; localized next/previous links correct.
- NAV-01, tutoring content/build, site metadata/budgets, Git history and service
  worker tests: PASS. Link audit: 105 HTML pages, 5942 references, zero errors.
- Contract: 105 routes, 48 sitemap URLs, eight redirects, four search indexes,
  46 precache entries. Only four approved HTML changes; no SEO, search, route,
  sitemap-location, precache-URL or asset-size changes. Warning logs were not
  supplied to either capture and were not evaluated by this comparison.
- Browser: all four Workshop locales at widths 390 and 1280, no overflow, two
  posts each, correct canonical and five hreflang links. Desktop/mobile
  screenshots inspected; mobile menu opened; all four Education redirects work.
- Author readiness: zero structural errors; portrait and student cases pending.

Doctor and pagination are now required CI steps. Linux HTMLProofer and live
deployment checks run in the publication workflow. Windows HTMLProofer still
requires local libcurl. External accessibility certification is not claimed.

Upstream: https://github.com/untra/polyglot/releases/tag/1.14.0

## Publication evidence

Source commit `e0982ba`; lock metadata correction `0273b55`.
The first CI run stopped before build because the lock retained Polyglot's old
Jekyll requirement. `bundle update jekyll-polyglot --conservative` corrected it
to `jekyll (>= 4.0, >= 3.0)` without changing other package versions. Frozen
installation then passed locally and in CI.

[Run 35352425957](https://github.com/Figarist/figarist.github.io/actions/runs/35352425957)
passed build (including Doctor, pagination and Linux HTMLProofer), Pages deploy,
and live verification of 48 sitemap URLs and domain redirects. CI used Ruby
3.4.10; local validation used 3.4.8, both within the declared 3.4.x policy.
All four live Education routes were also opened in a browser and reached the
matching Workshop with correct heading/canonical and two post links each.
