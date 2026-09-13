# Working-tree audit — 2026-09-13

Scope: all changes present at the start on main (42 tracked files plus the new
author guide, readiness script and media placeholder directories). No staging,
commit, push or deployment performed.

## Findings and fixes

- Critical: the author explicitly confirmed newly generated student stories,
  testimonials, permissions and profile claims were fictional. Preserved these
  as labelled drafts; disabled ready/permission flags, removed invented academic
  and professional credentials from JSON-LD, and restored committed localized
  tutoring copy and shared conditions/pricing. Existing committed facts,
  ratings, review counts and prices still need author confirmation.
- High: first clean multilingual build only cached English tutoring routes.
  Added finalize_multilingual_pwa.rb to regenerate the root manifest after
  Polyglot finishes. Site checks now require the worker and all 16 routes.
- High: precache routing overrode NetworkFirst navigation. Registered navigation
  first, added a bounded network timeout and localized precache fallback.
  Reduced eager asset caching to site CSS/fonts/images/search instead of all
  blog libraries and game JavaScript.
- Medium: overview CTA event used an empty course slug. Fixed the default before
  string concatenation and added generated-page regression assertions.
- Medium: hidden sticky CTA remained keyboard-accessible. Added visibility
  gating, removed the public QA query override, reserved bottom space and
  respected reduced motion. Verified the control appears after the hero.
- Medium: repeated copy clicks could permanently retain the success label.
  Preserved initial text and replaced the reset timer. Unsupported clipboard
  hides the button; denied clipboard offers a manual-copy prompt.
- Medium: FAQ JSON-LD payment answer differed from rendered text. Both now use
  the same payment include. FAQ tracking targets the summary instead of every
  click on expanded content. Course mode belongs to a CourseInstance.
- Medium: readiness CLI demanded invented fixed prices and treated draft
  permissions as failures. It now checks publication structure and reports
  missing author material without claiming consent or deployment proof.
- Replaced the author guide, which encouraged publishing fictional examples
  and staging everything, with a factual-content and scoped-commit checklist.
- Preserved responsive, localization, sitemap and hero metadata improvements.
  Normalized trailing whitespace in the reviewed changes.

## Evidence

- Content validator tests: PASS.
- Isolated invalid/valid multilingual build tests: PASS after final plugin change.
- Production first build into qa-screenshots/audit-final-site: PASS.
- Site suite: PASS, 20 pages and 16 tutoring routes; canonical/hreflang,
  sitemap, search, JSON-LD, publication gates, CTA IDs and complete precache.
- All generated HTML local href/src file targets: PASS on the clean output.
- Worker VM regression: PASS (route precedence, online response, offline
  localized fallback). Real browser offline/update lifecycle: not verified.
- Browser: overview at 360px in EN/UK/RU/KO has no horizontal overflow or broken
  images. UK copy feedback, FAQ opening, conditions anchor, sticky visibility
  and desktop rendering verified. Screenshots: qa-screenshots/audit-mobile.png
  and qa-screenshots/audit-desktop.png.
- Compressed bundle sizes: JS 2703 bytes; CSS 16450 bytes.
- git diff --check: PASS.
- HTMLProofer: blocked by local Windows libcurl loading. Separate local-target
  checker passed; external URL availability and GitHub Actions remain unverified.
- Existing _site contains stale legacy test pages with duplicated language
  prefixes; the clean output does not. Do not deploy that old output directory.

## Commit preparation

Suggested commits, after author instruction and exact staged-diff review:

1. fix: quarantine fictional tutoring evidence
   Profile/case/testimonial data, metadata, author guide, readiness script.
2. fix: stabilize multilingual tutoring funnel and offline builds
   Templates/styles/script, metadata plugin, final PWA plugin, configuration,
   worker and regression/CI checks.
3. content: add verified author profile and first student project
   Only after genuine material and publication permissions are supplied.

Review .agents/rules/gemini3rules.md and .gitignore separately as tooling changes.
Do not stage qa-screenshots, generated site directories or private evidence.
The optional evidence sections can remain absent for a technical release.

## Author-approved release update

After the initial audit, the author supplied and approved their actual biography,
education, lesson policies and approach. Credly verified Unity Junior Programmer
(2021-06-11) and Unity Essentials (2021-04-20). Some earlier profile material and
BUKI reviews therefore have sources; the initial fictional-content assessment
was superseded by this clarification, not a finding that all source reviews
were fabricated. The new published profile is rebuilt from approved material.
Student cases and testimonial quotations remain unpublished pending selection
and permissions. Photo and student work are explicitly deferred.
The author authorized commits and deployment in this conversation.
