# Website improvement backlog

Updated: 2026-09-18. Baseline: `1350ff7`. [Work hub](README.md).
This is the only task status register.

Statuses: **Ready**, **Needs author**, **Implemented**, **Verified**, **Deferred**.
Verified requires relevant evidence beyond a successful build.
Dependencies block only the affected task.

| ID | Priority | Status | Task | Completion evidence |
| --- | --- | --- | --- | --- |
| UX-01 | P0 | Verified | Move cases/profile/reviews before conditions | Overview and course order checked; empty cases leave no gap |
| UX-02 | P0 | Verified | Compact source-linked evidence near Hero CTA | Existing facts only; four locales; no overflow at 360px |
| UX-03 | P0 | Verified | Visible first-contact guidance | Localized copy; Telegram prefill and tracking retained |
| UX-04 | P1 | Verified | Three initially visible review cards | Exact text and attribution; remaining reviews accessible; mobile/keyboard checks |
| UX-05 | P1 | Needs author | Direction-specific age recommendations | DEC-01 answered; overview, courses and FAQ consistent in four locales |
| UX-06 | P1 | Needs author | First genuine case, then two more | DEC-02 supplied; actual schema and publication gates pass |
| UX-07 | P1 | Verified | Compact lesson conditions | Existing terms accessible; semantic layout; keyboard/mobile checks |
| BLOG-01 | P1 | Verified | Quadrilingual technical blog content sync | Spaceship & Minecraft translated across EN, UK, RU, KO; 0 missing translations; search.json indexed; 105 pages 0 link errors |
| NAV-01 | P2 | Verified | Merge Education hub into the localized Workshop | Workshop copy, education architecture removal, localized legacy redirects and link audit verified |
| TRAFFIC-01 | P2 | Needs author | External profile destinations | DEC-06 authorization; correct localized URLs read back |
| SEO-01 | P2 | Needs author | Search Console submission | DEC-06 access/authorization; recorded outcome |
| CONTENT-01 | P3 | Deferred | Optional portrait and later videos | Actual assets, permission and localized alt text |
| EXP-01 | P3 | Deferred | Diaspora copy or introductory call | DEC-04/05 answered; supported service terms |

## Delivery order

First delivery: UX-01–03. Second delivery: UX-04/07.
UX-02 can use the degree and accurately named badges already in data; no portrait
or age decision is required.

UX-04 editorial candidates: review-3, review-2, review-1. Inspect actual IDs and
sources first. Keep other published reviews accessible. Never call the combined
total “18 on BUKI”. UX-07 may use a compact grid or native details/summary for
secondary information; price and access to cancellation/payment terms remain clear.

No conversion uplift is established. Track implementation quality separately
from later visitor and inquiry outcomes.

NAV-01 decision: Education is merged into Workshop; localized legacy routes are
preserved through redirects to the matching localized Workshop page.

## Updating status

For each ID record changed files, observed behavior, checks, evidence location,
remaining limits and source revision (or “uncommitted”). Keep author-dependent
tasks open while completing independent work. Follow [release checks](deployment_guide.md).

## Jekyll hardening status (2026-09-18)

This engineering package is independent of the author-dependent backlog above.

| Work item | Status | Evidence and limit |
| --- | --- | --- |
| Ruby/Bundler runtime policy | Verified | `.ruby-version`, CI runtime check, Ruby 3.4.8 local build |
| Git-derived `last_modified_at` history | Verified | Full-vs-shallow experiment, `test_last_modified_history.rb`, CI `fetch-depth: 0` |
| Dead sitemap dependency and ignored minifier option | Verified | Stable contract comparison and site/link gates |
| Polyglot read lifecycle | Verified | Doctor passes locally and in Linux CI via after_init preparation; obsolete frozen-string patch removed |
| HTMLProofer 5.2.2 | Verified in CI | Linux run passed; Windows run still requires local `libcurl.dll` |
| GitHub Pages action maintenance | Verified live | Current Node 24 action majors; build, deploy and live-domain jobs passed on GitHub-hosted runners |
| Polyglot 1.14.0 migration | Verified | Doctor, 6+2 pagination, regression, browser and deployment gates passed; live run 35352425957; see POLYGLOT_MIGRATION_2026-09-18.md |
| `jekyll-seo-tag` 2.9.0 migration | Verified live | Canonical/OG/JSON-LD, sitemap, search and PWA contracts unchanged; Twitter/social-image regression checks and live run 35354239246 passed |
| Dependency freshness sweep | Verified live | All resolved gems current; Ruby advisory audit clean; vendored assets, browser rendering and live run 35356518797 passed |
| Ruby 4 runtime migration | Deferred | Ruby 4.0.7 is newer than the supported 3.4 line, but current Jekyll dependencies warn about removed stdlib gems and Windows `fiddle 1.1.8` requires an unavailable libffi toolchain; migrate separately |
