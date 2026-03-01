---
trigger: always_on
---

# 🤖 FIGARIST SITE: AI AGENT CORE RULES

You are an expert Senior Frontend Architect and Jekyll Developer assisting "Figarist" (an Indie Game Developer & Tech Educator).
READ THESE RULES BEFORE EXECUTING ANY COMMAND.

## 1. THE "EMBEDDED-FIRST" PHILOSOPHY

- **Allowed:** Pure HTML5, CSS3 (Modern native features like Variables, Grid, Flexbox), Vanilla JavaScript, and Liquid (Jekyll).
- **Forbidden:** NO React, NO Vue, NO Tailwind CSS, NO jQuery, NO heavy npm packages.
- **Mindset:** Treat the DOM like a constrained Wear OS smartwatch. Zero unnecessary GC allocations. If something can be done purely in CSS, DO NOT use JavaScript.
- **Legacy Warning:** `assets/js/locale.js` was a **DEPRECATED** file from a pre-Polyglot era (now deleted). It used the old `figarist_ui_lang` localStorage key and JS-based class toggling. Do **NOT** recreate it. The current language system is fully handled by Polyglot + inline `<script>` blocks in `head.html` and `header.html` (using `preferred_lang` key).

## 2. DESIGN SYSTEM: BENTO UI & ARCHITECTURE

- **Grid Strategy:** Layouts MUST use `display: grid` with explicit `grid-template-areas` for the main hub.
- **Forbidden Grid Patterns:** DO NOT use `grid-auto-flow: dense` or fractional span classes (like `.span-2-2`). They cause stretching on large monitors. Map HTML `id`s directly to `grid-area`s in CSS.
- **Metrics:** Always use `--bento-gap: 20px;` and `--card-radius: 20px;`. Use `clamp()` for responsive paddings/widths (e.g., `max-width: 1440px`).
- **Aesthetic:** "Light Bento Theme". Background is "Cloud Dancer" (`--bg-color: #f2f0eb`), cards are pure white (`--card-bg: #ffffff`), text is dark/tactile. DO NOT use dark mode universally.
- **Responsive:** Mobile MUST elegantly collapse into a `flex-direction: column` stack at `max-width: 768px`. Always ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.
- **Assets Structure:**
  - CSS → Modular SCSS (`_sass/`) with manifest `assets/css/styles.scss`. Prefer `@use` over `@import`.
  - Images → `assets/images/` (social cards, avatars, logos)
  - JS → `script.js` at project root (scroll, search, WebGL, tilt).

## 3. MULTILINGUAL SYNC (JEKYLL POLYGLOT)

- **Languages:** The site supports 4 languages: `en` (default), `uk`, `ru`, and `ko`.
- **Static Hubs:** `index.html` is strictly DRY. Do NOT create duplicate directories like `/uk/index.html`. Instead, rely on `jekyll-polyglot` and write multilingual text using UI dictionaries: `{{ site.data[site.active_lang].strings.key_name }}`. Polyglot handles the multi-site generation. Do NOT use inline `{% if %}` or `{% case %}` statements for UI text to avoid DOM bloat.
- **Localized Titles:** Use `title_key` in YAML front matter instead of hardcoded `title:`. The logic in `head.html` automatically resolves the translation from `_data/[lang]/strings.yml`.
- **Includes:** Extract globals (`<head>`, `<nav>`, `<footer>`) to `_includes/` and manage translations using the dictionaries. Do not duplicate arrays unnecessarily.
- **Blog Posts (`_posts/`):** Posts are duplicated physically (e.g., `post-en.md`, `post-uk.md`, `post-ru.md`, `post-ko.md`). They MUST share the exact same `permalink:` string in their YAML Front Matter, but diverge using `lang: en`, `lang: uk`, etc. Polyglot will sync them together automatically.
- **Education Collection (`_education/`):** Education items follow the **exact same** quad-file pattern as blog posts. For each item, create 4 files with matching `permalink:` and distinct `lang:`. The collection uses the `education` layout (`_layouts/education.html`).
- **Language Auto-Redirect:** An inline `<script>` in `head.html` detects the visitor's browser language on first visit and redirects to the matching locale (`/uk/`, `/ru/`, `/ko/`). The preference is persisted in `localStorage` under the `preferred_lang` key.
- **Language Preference Persistence:** A click handler in `header.html` saves the user's manual language choice to `localStorage` (`preferred_lang`). It uses `data-lang` and `translate="no"` to stay stable even if Google Translate is active.

## 4. CUSTOM PLUGINS

- **`_plugins/polyglot_frozen_string_patch.rb`:** CRITICAL. Fixes `FrozenError` in Polyglot + SCSS. Do NOT remove.
- **`jekyll-paginate-v2`:** Handles blog pagination.

- **Global Nav:** Use a "Floating Navbar" (`.site-nav`) with blur backdrop and search trigger.
- **Level 2 Pages:** Always include a native "Back to Hub" (`.btn-back`) pill button.
- **Search:** Ultimate Client-Side Search (Lunr.js). Toggle via `Cmd+K` or search icon in header.
- **Language Switcher:** Generated in `_includes/header.html` via a `{% for lang in site.languages %}` loop.

## 6. UNITY WEBGL & MEDIA HANDLING

- **WebGL Embeds:** ALWAYS use an iframe with a "Click to Play" overlay (Stateless UI). Never auto-load heavy WebGL canvases on page load.
- **Images:** Compress images (`.webp`) and use `loading="lazy"`.

## 7. SEO & PERFORMANCE

- **Images:** Always compress images. Prefer `.webp`. Use `loading="lazy"` for all images except the hero image.
- **Automated SEO Plugins:**
  - `jekyll-seo-tag` — generates `<title>`, Open Graph, Twitter Cards, JSON-LD `Person`/`WebSite`/`BlogPosting` schemas, and `<link rel="canonical">` automatically.
  - `jekyll-sitemap` — generates `sitemap.xml`.
  - `jekyll-feed` — generates `feed.xml` (RSS).
- **View Transitions API:** Enabled via meta tag in `head.html`. CSS-driven fade and card morphing are used for seamless hub navigation.
- **Microdata:** Ensure Posts and Pages have the correct YAML Front Matter (`title`, `description`, `image:`, `tags`) so plugins can generate rich metadata. Do NOT manually write JSON-LD blocks (exception: `_layouts/education.html` has a custom `Article` schema).
- **Hreflang:** Automatically generated by Polyglot via `{% I18n_Headers %}` in `head.html`. Covers `en`, `uk`, `ru`, `ko`, and `x-default`.
- **Digital Ecosystem (Cross-linking):** Always ensure prominent, SEO-friendly links back to the main studio website: `https://wristandpocket.github.io`.
