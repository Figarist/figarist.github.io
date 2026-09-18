# jekyll-seo-tag 2.9.0 migration evidence

Date: 2026-09-18  
Scope: `jekyll-seo-tag` 2.8.0 to 2.9.0 only, plus the directly required metadata correction and regression coverage.

## Decision

Accept 2.9.0 and constrain the direct dependency to `~> 2.9`. The isolated
candidate preserved the site's routing and indexability contracts while adding
the upstream Twitter and article metadata improvements.

## Required correction

Version 2.9.0 resolves page-relative image paths. The tutoring fallback image
was stored without a leading slash, so nested routes would have produced nested
social-image URLs. The fallback is now `/assets/images/games/dish-of-chaos-cover.png`.
Generated social metadata therefore remains
`https://sivochka.com/assets/images/games/dish-of-chaos-cover.png` on every
tutoring route.

## Contract result

- Routes added/removed: none.
- Canonical, Open Graph and JSON-LD semantic changes: none.
- Sitemap URLs added/removed: none.
- Localized search changes: none.
- Service-worker precache changes: none.
- Size-budget changes: none.
- Intended markup changes: `twitter:description`, name-based Twitter title and
  image metadata, and article modified-time support from 2.9.0.

## Local verification

- `bundle exec jekyll doctor`: PASS.
- Polyglot pagination test: PASS, 8 posts per locale and 6+2 pagination.
- Tutoring content/build tests: PASS.
- Author readiness: 0 structural errors; portrait and published student cases
  remain two expected author-content decisions.
- Clean production build: PASS.
- Git-history last-modified test: PASS.
- Site contract: PASS, 28 pages and 24 tutoring routes.
- Link audit: PASS, 105 HTML pages, 5,942 references, 0 errors.
- New SEO regression checks: every sitemap page has matching Open Graph and
  Twitter descriptions, correct name-based Twitter tags, a same-origin HTTPS
  social image and a corresponding generated local image target.

## Live verification

- GitHub Actions run
  [35354239246](https://github.com/Figarist/figarist.github.io/actions/runs/35354239246):
  build, Linux HTMLProofer, deploy and live-domain jobs PASS.
- The live tutoring page emits `twitter:description`, name-based Twitter title
  and image tags, and the correct root social-image URL.
- A live article emits a valid `article:modified_time` value.
- Windows HTMLProofer remains unavailable locally because the native
  `libcurl.dll` runtime is absent; the authoritative Linux CI gate passed.

## Upstream source

- [jekyll-seo-tag releases](https://github.com/jekyll/jekyll-seo-tag/releases)
