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

## 5. FRONTMATTER CMS (VS CODE)

- **CMS-First:** All new content (posts, education) MUST be created via [Front Matter CMS](https://frontmatter.codes/) in VS Code — NOT by manually creating `.md` files from scratch.
- **Config:** `frontmatter.json` at project root. Never edit content types or snippets outside this file.
- **Author field:** Always select `ihor` from the data file picker (reads `_data/authors.yml`). Do NOT hardcode `author: ihor` manually when using CMS.
- **Translations:** Use the **🌐 Create Missing Translations** CMS action (`.frontmatter/scripts/create-translations.js`) to auto-generate stub files for uk/ru/ko from an en source. Never copy-paste manually.
- **Drafts:** Use `_drafts/` folder + `published: false` toggle in CMS panel for WIP content.
- **Images:** Use CMS image picker — it enforces the `assets/images/` path. All images must be `.webp`.
- **Snippets:** Use the 14 built-in CMS snippets for Mermaid, YouTube, callouts, WebP figures etc. Do not write these blocks manually.
- **Scripts:** `.frontmatter/scripts/` contains Node.js automation scripts. Node.js is required to run them.

## 6. PLUGINS & EXTENSIONS

- **Spaceship:** Rule technical posts via `jekyll-spaceship` (Mermaid/MathJax).
- **PWA:** `jekyll-pwa-workbox` handles offline-first caching via Service Workers.
- **Minification:** `jekyll-minifier` is the final step in the pipeline. Ensure no JS errors exist prior to build.

# CRITICAL RULE: MANUAL BUILD EXECUTION
Your internal sandbox environment does NOT have the correct Ruby permissions or setup to compile this Jekyll/Polyglot project. 

**DO NOT** attempt to run `bundle install`, `bundle exec jekyll build`, or start a local server yourself. You will get stuck in a PermissionError loop.

**PROTOCOL:**
Whenever you write code (SCSS, JS, HTML, Liquid) and need to verify if the site builds correctly, or if you need to check the compiled output, **STOP** and ask the user: 
*"I have made the changes. Please run `bundle exec jekyll build` and provide the terminal output, or tell me if the UI looks correct."*

Rely exclusively on the user as your CI/CD runner and visual QA.

---

_Every byte matters. Every pixel counts. Build it native._