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
| Frozen-string compatibility patch | Verified | Single named plugin patch; stable contract unchanged |
| HTMLProofer 5.2.2 | Verified locally as dependency | CI command is wired; Windows run is blocked by missing `libcurl.dll` |
| GitHub Pages action maintenance | Verified locally | YAML and command-order review; live run remains unverified until push |
| Polyglot 1.14.0 migration | Deferred | Rolled back because contract changed four Workshop archive HTML outputs and Doctor still failed; `Gemfile` is pinned to verified 1.5.1 |
| Selective SEO plugin update and new audit tooling | Deferred | Not started after the Polyglot stop condition |
