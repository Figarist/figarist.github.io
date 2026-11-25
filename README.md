# Ihor Sivochka (Figarist) — Personal Hub & EdTech Workshop

Source for [sivochka.com](https://sivochka.com/): Ihor Sivochka's multilingual
personal website, tutoring profile and technical workshop. Jekyll generates a
static site that GitHub Actions verifies and publishes to GitHub Pages.

- **🌐 Live Website:** [sivochka.com](https://sivochka.com/) · [Українська (`/uk/`)](https://sivochka.com/uk/) · [Русский (`/ru/`)](https://sivochka.com/ru/) · [한국어 (`/ko/`)](https://sivochka.com/ko/)
- **🎓 1-on-1 Programming Tutoring (Unity/C#, Python, Scratch, CS):** [sivochka.com/tutoring/](https://sivochka.com/tutoring/) · [Українською](https://sivochka.com/uk/tutoring/)
- **📖 Architecture Guide:** [Jekyll Spaceship + Hub Architecture (EN)](https://sivochka.com/blog/jekyll-spaceship-hub-architecture/) · [UK](https://sivochka.com/uk/blog/jekyll-spaceship-hub-architecture/)

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
compatibility pilot and the complete generated-site contract.

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

The local verification sequence checks content, build output, link integrity, and service worker behavior:

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
```

Generated `_site/` output is not source.

## Content and localization

Localized posts are maintained as matching EN, UK, RU and KO files with stable
permalinks. Navigation labels, subtitles and interface strings live in `_data/`.
Canonical URLs, hreflang relationships, sitemap entries and search indexes are
covered by regression tests; do not infer their correctness from build success.

## Deployment

Pushes to `main` run the complete build, test, Pages deployment and live-domain
verification workflow. Publication should happen only after reviewing the scoped
diff and local gates.

Do not commit private correspondence, consent records, credentials, generated
QA captures, internal planning notes, or local verification manifests.

## Author & Ecosystem (`Ihor Sivochka / Figarist`)

Created and maintained by **Ihor Sivochka (Ігор Сівочка / Figarist)** — Certified Unity Developer, Computer Science Mentor, and EdTech Toolmaker.

- 🌐 **Main Hub & Multilingual Blog (`EN` / `UK` / `RU` / `KO`):** [sivochka.com](https://sivochka.com/)
- 🎓 **1-on-1 Programming Mentoring (Unity/C#, Python, Scratch, CS, 3D):** [sivochka.com/tutoring/](https://sivochka.com/tutoring/) · [Українською](https://sivochka.com/uk/tutoring/)
- ⌚ **Indie Game Studio (Android & Wear OS):** [Wrist & Pocket Studio](https://wristandpocket.dev/) (`@wristandpocket`)
- 🎛️ **OGCruncher:** [sivochka.com/OGCruncher/](https://sivochka.com/OGCruncher/) ([Repo](https://github.com/Figarist/OGCruncher)) — browser Web Audio bit-crusher & game SFX optimizer
- ⚒️ **3D Club Studio (`3D Кузня Чудес`):** [sivochka.com/3d-club-studio/](https://sivochka.com/3d-club-studio/) ([Repo](https://github.com/Figarist/3d-club-studio)) — offline 3D modeling studio & support-free STL generator
- 🧱 **LEGO WeDo 2.0 Catalog:** [sivochka.com/lego-catalog/](https://sivochka.com/lego-catalog/) ([Repo](https://github.com/Figarist/lego-catalog)) — 597 robotics PDF building instructions in 26 categories
- 🤫 **Quiet Class (`Тихий Клас`):** [sivochka.com/bouncy/](https://sivochka.com/bouncy/) ([Repo](https://github.com/Figarist/bouncy)) — gamified Web Audio DSP classroom noise meter
- 💻 **GitHub:** [@Figarist](https://github.com/Figarist)
