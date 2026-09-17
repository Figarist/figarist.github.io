# Baseline and verification record

Date: 2026-09-15. Source: `1350ff7e1334a00306403a4f1190ce2e60ba27cf`.
Scope: repository and local checks.

## Implemented baseline

- `65f0213`: homepage restructuring and expanded tutoring destinations.
- `1e8c13a`: archive alternates and link integrity.
- `049c001`, `ddd05d7`, `756694b`: custom domain, metadata, deployment checks.
- `0962efd`, `4d6c2c2`: planning documents, not CRO implementation.
- `6b22c31`, `667f10b`, `1350ff7`: draft, vendor and artifact cleanup.

| Area | Source observation |
| --- | --- |
| Domain | sivochka.com in CNAME/config |
| Tutoring | Overview + five directions; four locale datasets |
| Order | Conditions before cases/profile/reviews in tutoring layout |
| Reviews | Carousel with published/ready/permission filters |
| Counts | settings.yml: 11 BUKI + 7 Association |
| Profile | Published; four translations; degree, two named badges, award |
| Experience | verified_facts.experience has no published numeric entry |
| Policies | 1000 UAH, 60 minutes, paid first lesson, Zoom |
| Ages | Shared minimum 6; recommendations need author input |
| Optional material | No portrait or published student case |
| Hero project | Image and project link in tutoring layout |

Task statuses live only in [the backlog](IMPLEMENTATION_CHECKLIST.md).

## Local checks earlier in this conversation

After a clean build at the baseline:
- Site checks: PASS, 28 checked pages, 24 tutoring routes.
- Link audit: 105 HTML files, 6240 references, zero errors.
- Gzip sizes reported: script 5818 bytes, CSS 17112 bytes.
- Readiness: zero structural errors; portrait and cases pending.

An initial build retained an obsolete generated testpost and failed an old-origin
check. Cleaning generated output and rebuilding resolved it. Counts and sizes are
snapshots, not fixed targets. These are local results, not deployed verification.

## Limits

No new live browser review, deployment verification, accessibility certification
or conversion measurement was performed for this documentation work. The previous
report mixed source findings with unsourced behavior/market claims; these are
removed from active guidance.

Local main matched the stored origin/main at review time. No remote fetch was
performed; this does not establish the current remote head.

## Documentation consolidation

Validate Markdown links, diff whitespace and source-only scope. Earlier prose is
recoverable from Git at `4d6c2c2`. Append future evidence with task IDs, date,
revision (or uncommitted), command/browser steps, result and limitations.
Do not mark a local implementation as deployed.

Documentation validation on 2026-09-15 (uncommitted): all 9 docs Markdown files
checked; 21 relative Markdown links resolve; git diff --check passes. Scope is
Markdown only (9 modified files and 2 new documents), with no runtime/source-data
changes. No build rerun was needed for excluded documentation. The content guide
was corrected against the current schema and review component, including all five
case directions, cross-locale original reviews and the source_only display limit.

## UX-01–04 and UX-07 Implementation & Verification

- Tasks: UX-01, UX-02, UX-03, UX-04, UX-07
- Date: 2026-09-15
- Revision: uncommitted (working directory on top of `168bb0e`)
- Changed files:
  - `_layouts/tutoring.html`
  - `_includes/tutoring-testimonials.html`
  - `_includes/tutoring-contact.html`
  - `_sass/_tutoring.scss`
  - `script.js`
  - `_data/{en,uk,ru,ko}/strings.yml`
  - `_includes/head.html`
  - `sitemap.xml`
  - `docs/IMPLEMENTATION_CHECKLIST.md`
  - `docs/VERIFICATION_REPORT_2026-09-15.md`
- Executed automated commands:
  - `bundle exec ruby scripts/test_tutoring_content.rb` (PASS: all content gates and records valid)
  - `bundle exec ruby scripts/test_tutoring_build.rb` (PASS: isolated build fixture checks pass)
  - `node scripts/test_service_worker.cjs` (PASS: service worker caching and navigation)
  - `bundle exec ruby scripts/verify_author_ready.rb` (PASS: 0 structural errors, 2 optional items pending author)
  - `$env:JEKYLL_ENV = 'production'; bundle exec jekyll build --destination _site` (PASS in 30.02s)
  - `bundle exec ruby scripts/test_site.rb` (PASS: 28 pages, 24 routes, budgets: script.js 2702 gzip bytes / 20480, styles.css 17250 gzip bytes / 30720)
  - Raw JS size check: 7481 bytes <= 20480 bytes limit
  - `bundle exec ruby scripts/audit_links.rb` (PASS: 105 pages, 6360 link references, 0 errors)
  - `git diff --check` (PASS: 0 whitespace/syntax errors)
- Browser observations (Chrome/Edge local preview at `http://localhost:4005/`):
  - Desktop (1280px / 1300px):
    - Section order verified: hero -> directions -> trust -> profile -> reviews -> conditions -> FAQ -> video -> contact panel.
    - Hero proof strip renders cleanly: Pedagogical Master's degree link with tooltip, Unity Junior Programmer badge (Credly link), Unity Essentials badge (Credly link), BUKI 11 reviews (BUKI link), Association 7 reviews (Association link), and snapshot label.
    - First contact friendly hint visible below Hero actions in all 4 locales.
    - Empty student cases render nothing, leaving zero gap.
    - Testimonials: 3 responsive cards visible immediately (review-3 Yevgen, review-2 Angela, review-1 Nadia).
    - Native details summary "Показати більше відгуків (15)" smoothly expands remaining 15 reviews into matching card layout.
    - Conditions: 3-column card grid displays format/duration, price/payment (FOP, equivalents, order), rescheduling/cancellation. Secondary details (platform, first lesson, technical requirements for Unity/Python/Scratch, homework, progress) expand cleanly under `<details>`.
  - Tablet (768px):
    - Hero proof strip wraps without clipping.
    - Testimonial cards transition to 2-column grid.
    - Conditions cards and details adjust smoothly.
  - Mobile (360px):
    - Zero horizontal overflow.
    - Proof strip pills wrap into neat rows.
    - Testimonial cards and conditions cards stack into 1 column.
    - Sticky mobile CTA bar displays price and Telegram action without blocking page content.
  - Course page (`/uk/tutoring/unity/`):
    - Unity course hero aside, topics, examples, and process steps render intact with matching lower section order.
  - Localization:
    - EN, RU, KO checked: degree title, contact hint, details summaries, and testimonials render with proper typography and no Cyrillic leaks in non-Ukrainian locales.
  - Screenshots saved to `qa-screenshots/`:
    - `tutoring_uk_desktop_hero_*.png`
    - `tutoring_uk_desktop_proof_directions_*.png`
    - `tutoring_uk_desktop_reviews_initial_*.png`
    - `tutoring_uk_desktop_testimonials_expanded_*.png`
    - `tutoring_uk_desktop_conditions_*.png`
    - `tutoring_uk_desktop_conditions_expanded_*.png`
    - `tutoring_uk_tablet_hero_*.png`
    - `tutoring_uk_tablet_reviews_*.png`
    - `tutoring_uk_mobile_hero_*.png`
    - `tutoring_en_desktop_*.png`, `tutoring_ru_desktop_*.png`, `tutoring_ko_desktop_*.png`
- Results and limitations:
  - UX-01–04 and UX-07 are fully implemented and verified locally in browser and CI test suite.
  - Dead carousel code (~35 lines) removed from `script.js`, reducing bundle size without breaking any selectors.
  - Author decisions (portrait, genuine student cases, direction age recommendations) remain open as documented in `AUTHOR_ACTION_GUIDE.md` and do not affect this completed package.
  - Local verification only; no push or deployment performed.

## BLOG-01 Quadrilingual Technical Blog Content Sync & Verification

- Task: BLOG-01
- Date: 2026-09-17
- Revision: uncommitted
- Changed files:
  - `_posts/2026-03-01-jekyll-spaceship-hub-architecture-en.md` (NEW)
  - `_posts/2026-03-01-jekyll-spaceship-hub-architecture-ru.md` (NEW)
  - `_posts/2026-03-01-jekyll-spaceship-hub-architecture-ko.md` (NEW)
  - `_posts/2026-02-26-minecraft-python-ru.md` (NEW)
  - `_posts/2026-02-26-minecraft-python-ko.md` (NEW)
  - `docs/IMPLEMENTATION_CHECKLIST.md`
  - `docs/VERIFICATION_REPORT_2026-09-15.md`
- Executed automated commands:
  - `$env:JEKYLL_ENV = 'production'; bundle exec jekyll build --destination _site` (PASS in 7.69s)
  - `bundle exec ruby scripts/test_site.rb` (PASS: 28 pages, 24 routes, canonicals, hreflang alternates)
  - `bundle exec ruby scripts/audit_links.rb` (PASS: 105 HTML pages, 6398 link references, 0 errors)
  - `node scripts/test_service_worker.cjs` (PASS: service worker routing & cache)
  - `bundle exec ruby scripts/test_tutoring_content.rb` (PASS)
  - `git diff --check` (PASS: 0 whitespace/syntax errors)
- Observations:
  - All 8 localized post URLs (`/blog/`, `/uk/blog/`, `/ru/blog/`, `/ko/blog/` for both Spaceship and Minecraft) render with native localized headings and text.
  - Warning banner (`banner--translation-warning`) eliminated across all 4 languages.
  - All 4 blog index feeds display 2 published cards in native language without empty fallback states.
  - `search.json` across all 4 locales includes both articles with localized title and excerpt.
  - Legacy redirect route `/blog/test/` preserved across all 4 locales.
