# figarist.github.io

Personal portfolio of **Ihor (Figarist)** — indie game developer, founder of [Wrist & Pocket Studio](https://wristandpocket.github.io), and computer science teacher from Zmiiv, Ukraine.

## Tech Stack

- **Pure HTML5 + CSS3 + Vanilla JS** — zero frameworks, zero build steps
- **Hosting:** GitHub Pages (deploys from `main` branch automatically)
- **Fonts:** Google Fonts — `Fira Code` (headings/mono), `Inter` (body)

## File Structure

```
├── index.html          # English homepage (default)
├── uk/
│   └── index.html      # Ukrainian homepage
├── styles.css          # Single shared stylesheet
├── script.js           # Shared script (auto-detects html[lang])
├── sitemap.xml         # Hreflang alternates for search engines
├── robots.txt          # Crawl rules + sitemap link
└── Example/            # Reference copy of the studio site (DO NOT DEPLOY)
```

## Design System — "IDE Dark Mode"

| Token | Value |
|-------|-------|
| Background | `#1a1a2e` (deep), `#1e1e2e` (primary), `#252535` (surface), `#2a2a3c` (card) |
| Accents | Pink `#f5a0c0`, Blue `#7ec8e3`, Yellow `#e8d44d`, Green `#98c379`, Cyan `#56d6c2`, Purple `#c49bdb`, Orange `#e5985e` |
| Text | Bright `#eeeef5`, Primary `#d4d4e4`, Secondary `#8888a8`, Muted `#5c5c7a` |
| Border | `#3a3a52` |

**Visual effects:** CRT scanline overlay (`body::after`), blinking cursor, decorative line-number gutter (desktop only), scroll fade-in via `IntersectionObserver`.

**Section headings** use `// KEYWORD` syntax-highlighting pattern (green comment + purple keyword).

## Bilingual Architecture

- **EN** = root `/index.html` (canonical: `https://figarist.github.io/`)
- **UK** = `/uk/index.html` (canonical: `https://figarist.github.io/uk/`)
- Both pages share `styles.css` and `script.js` (UK page uses `../` paths)
- `script.js` reads `document.documentElement.lang` to choose typing text

### SEO Checklist (must be on BOTH pages)

1. `<link rel="canonical">` — page-specific URL
2. `<link rel="alternate" hreflang="en/uk/x-default">` — all three on both pages
3. `<meta property="og:locale">` + `og:locale:alternate` — swapped per language
4. `<meta name="robots" content="index, follow">`
5. `<meta name="keywords">` — language-specific
6. JSON-LD `Person` schema with `affiliatedOrganization` → Wrist & Pocket Studio
7. JSON-LD `WebSite` schema with `inLanguage: ["en", "uk"]`
8. `<meta name="google-site-verification">` — only on EN page

### Language Switcher

Nav bar link with class `.lang-switch`:
- EN page → `<a href="uk/index.html" class="lang-switch">🇺🇦 UA</a>`
- UK page → `<a href="../index.html" class="lang-switch">🇬🇧 EN</a>`

## Content Sections (same order on both pages)

1. **Hero** — typing animation (`> Hello world. I am Figarist.` / `> Привіт, світ. Я — Figarist.`), avatar from GitHub API
2. **CURRENT_FOCUS** — studio card linking to `wristandpocket.github.io` (UK version links to `/uk/`)
3. **SKILL_STACK** — tagged by category (Game Dev / Scripting / Tools)
4. **THE_WORKSHOP** — personal project cards (NOT studio games)
5. **HARDWARE_COLLECTION** — beloved tech list
6. **Footer** — GitHub, YouTube, LinkedIn, Email + copyright

## Rules for AI Assistants

1. **No frameworks.** This is a pure HTML/CSS/JS site. Do not introduce React, Tailwind, etc.
2. **Both languages.** Any content change must be applied to BOTH `index.html` and `uk/index.html`.
3. **SEO parity.** If you add/change meta tags, do it on both pages with correct locale values.
4. **Sitemap sync.** If you add new pages, add entries to `sitemap.xml` with hreflang alternates.
5. **Studio site is the reference.** The `Example/` folder contains the studio site — use it as a pattern reference for SEO structure. Do not modify or deploy it.
6. **Shared assets.** `styles.css` and `script.js` serve both languages. UK page references them with `../`.
7. **Responsive.** Mobile hides nav section links but keeps the language switcher visible.
