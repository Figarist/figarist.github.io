---
description: Sync site changes across all 4 supported languages (EN, UK, RU, KO)
---

# 🌐 QUADRILINGUAL SYNC: POLYGLOT LOCALIZATION

This workflow enforces the robust `jekyll-polyglot` architecture built for the Figarist Portfolio.

> [!IMPORTANT]
> The old manual `/uk/` directory duplication hack has been **DEPRECATED**. The entire site is now 100% DRY. Polyglot automatically generates the root (`/`) for EN and prefix subdirectories (`/uk/`, `/ru/`, `/ko/`) natively from single source files!

## 🏗️ ARCHITECTURAL RULES

1. **The Core Plugin:** The site relies on `jekyll-polyglot` which hooks into `jekyll build`. It renders the site 4 times (for EN, UK, RU, KO).
2. **Current Active Language:** During compilation, you can check the current target language via Liquid: `site.active_lang`.
3. **No More Hiding:** Do not use `liquid-hide`, JavaScript/CSS `display: none` toggle hacks, or massive inline `{% case %}` blocks. Output translations dynamically via UI Dictionaries.
4. **No Legacy JS:** The file `assets/js/locale.js` is **DEPRECATED** (uses old `figarist_ui_lang` key). Do NOT reference or extend it. The current language system uses inline `<script>` blocks in `head.html` and `header.html` with the `preferred_lang` localStorage key.

## 🔄 HOW TO LOCALIZE

### 1. Static Hubs & Layouts (`index.html`, `_includes/`, etc)

When adding a new UI card or text element, create the translation keys in ALL FOUR `_data/[lang]/strings.yml` dictionary files. Then reference it in `index.html`:

```html
<h2>{{ site.data[site.active_lang].strings.my_projects_title }}</h2>
```

Polyglot will automatically drop the correct string into the indices.

#### Localized Titles

To localise the browser tab and social title without hardcoding it in the frontmatter, use `title_key` instead of `title`:

```yaml
---
title_key: my_page_title_id
---
```

The logic in `head.html` will automatically fetch the translation from `_data/[lang]/strings.yml`.

### 2. Blogging (`_posts/`)

Polyglot handles blog posts a bit differently. You **MUST** create separate Markdown files for each language.

1. `2026-02-27-vr-headsets-en.md` (`lang: en`)
2. `2026-02-27-vr-headsets-uk.md` (`lang: uk`)
3. `2026-02-27-vr-headsets-ru.md` (`lang: ru`)
4. `2026-02-27-vr-headsets-ko.md` (`lang: ko`)

> [!CAUTION]
> All four localized versions MUST share the exact same `permalink:` string in their YAML frontmatter (e.g., `permalink: /blog/vr-headsets/`). Polyglot uses this matching permalink to map the hreflang SEO tags together!

#### Required Front Matter for Posts

```yaml
---
layout: post
title: "Post Title in This Language"
date: 2026-02-27
lang: en # en | uk | ru | ko
permalink: /blog/vr-headsets/ # IDENTICAL across all 4 files
tags: [vr, hardware]
description: "Short SEO description"
image: /assets/images/post-card.webp # Social card (recommended)
---
```

### 3. Education Collection (`_education/`)

Education items follow the **exact same** quad-file pattern as blog posts. For each article, create 4 files:

1. `wearos-zero-gc-mindset-en.md` (`lang: en`)
2. `wearos-zero-gc-mindset-uk.md` (`lang: uk`)
3. `wearos-zero-gc-mindset-ru.md` (`lang: ru`)
4. `wearos-zero-gc-mindset-ko.md` (`lang: ko`)

> [!CAUTION]
> Just like posts, all four files MUST share the exact same `permalink:` value. This is how Polyglot maps hreflang alternates for education articles.

#### Required Front Matter for Education Items

```yaml
---
title: "Article Title in This Language"
lang: en # en | uk | ru | ko
permalink: /education/wearos-zero-gc/ # IDENTICAL across all 4
description: "Short SEO description"
tags: [wearos, performance]
level: beginner # beginner | intermediate | advanced
---
```

### 4. Language Preference System

The site has a two-part language preference mechanism:

**Auto-Redirect (first visit)** — inline `<script>` in `_includes/head.html`:

- Detects visitor's browser language (`navigator.languages`)
- Saves detected language to `localStorage` key `preferred_lang`
- Redirects to matching locale if different from current page

**Manual Switch** — inline `<script>` in `_includes/header.html`:

- When user clicks a language switcher link, saves chosen language to `preferred_lang`
- On next visit, auto-redirect respects this saved preference

> [!WARNING]
> The old `assets/js/locale.js` file uses a **different** localStorage key (`figarist_ui_lang`) and a completely different mechanism (CSS class toggling). It is NOT part of the current architecture. Do not use it.

## ✅ SANITY CHECKLIST

- [ ] Are UI strings placed in the `_data/*/strings.yml` dictionaries rather than hardcoded in HTML?
- [ ] Are you utilizing `{{ site.data[site.active_lang] }}` rather than `page.lang` or inline `if` logic?
- [ ] If creating a post, did you create files for **all 4 languages**?
- [ ] If creating an education item, did you create files for **all 4 languages**?
- [ ] Do all post/education files share the identical `permalink` attribute?
- [ ] Are posts using `image:` in front matter for social cards?
- [ ] For static pages, are you using `title_key` for localized titles?
- [ ] Are you avoiding JS-based translation switching?
- [ ] Have you verified `search.json` is generated for the new language settings?
- [ ] Have you verified the new keys exist in **all four** `_data/*/strings.yml` files?

---

_Follow the "Embedded-First" philosophy: Zero unnecessary JS, Pure Native Power._
