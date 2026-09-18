# Figarist website

Source for [figarist.com](https://figarist.com): Ihor Sivochka's multilingual
personal website, tutoring profile and technical workshop. Jekyll generates a
static site that GitHub Actions verifies and publishes to GitHub Pages.

The public interface supports English, Ukrainian, Russian and Korean. Source
code and technical documentation are maintained in English.

## Site areas

- Personal profile and selected projects
- Tutoring services, approach and contact routes
- Workshop posts under `/blog/`
- Category and tag archives
- Local search, feed and offline/PWA support

The former Education hub is intentionally retired. Its four localized routes
redirect to the matching Workshop page. Existing education posts and their
category/tag archives remain available.

## Current baseline

| Area | Version or policy |
| --- | --- |
| Runtime | Ruby 3.4.x, Bundler 4.0.7 |
| Generator | Jekyll 4.4.1 |
| Localization | jekyll-polyglot 1.14.0 |
| SEO | jekyll-seo-tag 2.9.0 plus project-specific metadata checks |
| Content | Markdown, Liquid, Sass, Mermaid and MathJax |
| Verification | Ruby regression scripts, HTMLProofer and bundler-audit |
| Delivery | GitHub Actions and GitHub Pages |

Ruby 3.4 is an intentional support policy. Ruby 4 migration is deferred until
its standard-library and Windows native dependency changes can pass an isolated
compatibility pilot and the complete generated-site contract. See the
[Ruby 4 decision](docs/deployment_guide.md#ruby-4-decision).

## Local development

Requirements:

- Ruby 3.4.x
- the Bundler version recorded in `Gemfile.lock`
- Node.js for service-worker tests

Install dependencies and start a loopback-only development server:

```powershell
bundle install
bundle exec jekyll serve --config _config.yml,_config_dev.yml --host 127.0.0.1
```

Open `http://127.0.0.1:4000/`.

Build the production artifact with:

```powershell
$env:JEKYLL_ENV = 'production'
bundle exec jekyll build --destination _site
```

WEBrick is used only for local preview. The deployed website is static and does
not expose a Ruby application server.

## Verification

A successful Jekyll build is only one gate. Before publication, the project
checks content rules, multilingual pagination, metadata, canonical and hreflang
relationships, sitemap output, search indexes, redirects, PWA routes, link
integrity, dependency advisories and bundle budgets.

The complete local sequence is maintained in the
[build and release guide](docs/deployment_guide.md#source-and-production-checks).
Useful focused checks include:

```powershell
bundle exec jekyll doctor
bundle exec ruby scripts/test_polyglot_pagination.rb
bundle exec ruby scripts/test_nav_01.rb
bundle exec ruby scripts/test_vendor_assets.rb
node scripts/test_service_worker.cjs
```

HTMLProofer treats generated HTML, internal links, fragments, images and scripts
as deployment-blocking. External HTTP probes are advisory because third-party
availability and bot policies are outside the site's deployment contract.

## Repository map

```text
_data/          localized interface copy and structured content
_includes/      reusable Liquid components
_layouts/       page and post templates
_plugins/       project-specific Jekyll behavior
_posts/         Workshop posts in four locale variants
_sass/          design system and component styles
assets/         fonts, images and vendored browser libraries
scripts/        content, build, route, SEO, PWA and live-site checks
docs/           implementation, operations and verification documentation
```

Generated `_site/` output is not source. The `docs/` directory is excluded from
the deployed Jekyll artifact but remains public repository content.

## Content and localization

Localized posts are maintained as matching EN, UK, RU and KO files with stable
permalinks. Navigation labels, subtitles and interface strings live in `_data/`.
Canonical URLs, hreflang relationships, sitemap entries and search indexes are
covered by regression tests; do not infer their correctness from build success.

For tutoring content, start with the
[content editing guide](docs/tutoring-content-guide.md). Decisions that require
owner confirmation are tracked in the
[author action guide](docs/AUTHOR_ACTION_GUIDE.md).

## Deployment

Pushes to `main` run the complete build, test, Pages deployment and live-domain
verification workflow. Publication should happen only after reviewing the scoped
diff and local gates. Operational details and recovery guidance are in the
[deployment guide](docs/deployment_guide.md).

Do not commit private correspondence, consent records, credentials, generated
QA captures or local verification manifests.

## Documentation

Use the [documentation index](docs/README.md) as the starting point.

- [Implementation checklist](docs/IMPLEMENTATION_CHECKLIST.md) — canonical task status
- [Verification report](docs/VERIFICATION_REPORT_2026-09-15.md) — dated evidence and limits
- [Dependency freshness audit](docs/DEPENDENCY_FRESHNESS_AUDIT_2026-09-18.md) — dependency policy
- [Polyglot migration plan](docs/POLYGLOT_MIGRATION_2026-09-18.md) — multilingual upgrade evidence
- [SEO plugin migration plan](docs/SEO_TAG_MIGRATION_2026-09-18.md) — SEO compatibility evidence
- [Project context](project_context.md) — product and architecture context

Historical reports describe the state at the time they were written. For current
behavior, prefer source code, the lockfile, CI workflow, canonical checklist and
the latest dated verification addendum.
