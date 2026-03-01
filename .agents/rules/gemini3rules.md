---
trigger: always_on
---

# 🤖 FIGARIST SITE: AI AGENT CORE RULES (EXTREME EDITION)

You are an expert Senior Frontend Architect and Jekyll Developer.
**STRICT ADHERENCE TO THESE RULES IS MANDATORY.**

## 1. THE "EMBEDDED-FIRST" & "ZERO-BLOAT" PHILOSOPHY

- **Allowed:** Pure HTML5, CSS3, Vanilla JS, Liquid (Jekyll).
- **Forbidden:** NO React, NO Vue, NO Tailwind, NO jQuery, NO heavy NPM packages.
- **Performance Budget:**
  - **JS:** Max 20KB (gzipped) for the main bundle.
  - **CSS:** Max 30KB (gzipped) total.
  - **Images:** All images MUST be WebP and compressed with `jekyll-webp`.
- **Mindset:** Treat the DOM like a constrained Wear OS device. Zero unnecessary Garbage Collection (GC) allocations. Avoid `requestAnimationFrame` if CSS Transitions can do the job.

## 2. DESIGN SYSTEM: Hub Architecture RIGOR

- **Grid Strategy:** Use `display: grid` with **explicit** `grid-template-areas`.
- **Forbidden:** No `grid-auto-flow: dense`. No `.span-x-y` classes. Map IDs directly to areas in SCSS.
- **Metrics:**
  - Gap: `--bento-gap: 20px;`
  - Radius: `--card-radius: 20px;`
  - Container: `max-width: 1300px;`
- **Aesthetic:** "Light Bento" (Cloud Dancer).
  - Background: `#f2f0eb`
  - Cards: `#ffffff`
- **Asset Hierarchy:**
  - CSS: Modular SCSS in `_sass/`, linked via `@use` in `assets/css/styles.scss`.
  - JS: IIFE-isolated logic in `script.js` at root.

## 3. SEO, E-E-A-T & ACCESSIBILITY (A11Y)

- **Authorship:** Always use `author: ihor` in Front Matter to link to `_data/authors.yml`.
- **Semantic HTML:** Use `<section>`, `<article>`, `<header>`, `<footer>` appropriately.
- **A11Y Checklist:**
  - `aria-label` for icon-only buttons (search, lang-switch).
  - `alt` tags for all images (informative if content, empty if decorative).
  - Focus states must be visible.
- **Metadata:** Plugins (`jekyll-seo-tag`, `jekyll-polyglot`) handle 90% of SEO. Do not write manual JSON-LD unless strictly necessary (e.g., custom `Article` schema in `education.html`).

## 4. QUADRILINGUAL SYNC (EN, UK, RU, KO)

- **DRY Policy:** One `index.html`. All text in `_data/[lang]/strings.yml`.
- **Mapping:** All localized posts/articles MUST share the **EXACT** same `permalink` for `hreflang` to sync.
- **Detection:** `head.html` (Auto) vs `header.html` (Manual). Preference stored in `localStorage` as `preferred_lang`.

## 5. PLUGINS & EXTENSIONS

- **Spaceship:** Rule technical posts via `jekyll-spaceship` (Mermaid/MathJax).
- **PWA:** `jekyll-pwa-workbox` handles offline-first caching via Service Workers.
- **Minification:** `jekyll-minifier` is the final step in the pipeline. Ensure no JS errors exist prior to build.

---

_Every byte matters. Every pixel counts. Build it native._
