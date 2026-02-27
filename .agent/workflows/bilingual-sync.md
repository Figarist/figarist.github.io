---
description: Sync site changes to both English and Ukrainian versions
---

# 🌐 BILINGUAL SYNC: POLYGLOT LOCALIZATION
This workflow enforces the robust `jekyll-polyglot` architecture built for the Figarist Portfolio.

> [!IMPORTANT]
> The old manual `/uk/` directory duplication hack has been **DEPRECATED**. The entire site is now 100% DRY. Polyglot automatically generates the root (`/`) for EN and prefix subdirectories (`/uk/`, `/ru/`, `/ko/`) natively from single source files!

## 🏗️ ARCHITECTURAL RULES
1. **The Core Plugin:** The site relies on `jekyll-polyglot` which hooks into `jekyll build`. It renders the site 4 times (for EN, UK, RU, KO).
2. **Current Active Language:** During compilation, you can check the current target language via Liquid: `site.active_lang`.
3. **No More Hiding:** Do not use `liquid-hide`, JavaScript/CSS `display: none` toggle hacks, or massive inline `{% case %}` blocks. Output translations dynamically via UI Dictionaries.

## 🔄 HOW TO LOCALIZE

### 1. Static Hubs & Layouts (`index.html`, `_includes/`, etc)
When adding a new UI card or text element, create the translation keys in ALL FOUR `_data/[lang]/strings.yml` dictionary files. Then reference it in `index.html`:
```html
<h2>{{ site.data[site.active_lang].strings.my_projects_title }}</h2>
```
Polyglot will automatically drop the correct string into the indices.

### 2. Blogging (`_posts/`)
Polyglot handles blog posts a bit differently. You **MUST** create separate Markdown files for each language.
1. `2026-02-27-vr-headsets-en.md` (`lang: en`)
2. `2026-02-27-vr-headsets-uk.md` (`lang: uk`)
3. `2026-02-27-vr-headsets-ru.md` (`lang: ru`)
4. `2026-02-27-vr-headsets-ko.md` (`lang: ko`)

> [!CAUTION]
> Both localized pairs MUST share the exact same `permalink:` string in their YAML frontmatter (e.g., `permalink: /blog/vr-headsets/`). Polyglot uses this matching permalink to map the hreflang SEO tags together!

## ✅ SANITY CHECKLIST
- [ ] Are UI strings placed in the `_data/*/strings.yml` dictionaries rather than hardcoded in HTML?
- [ ] Are you utilizing `{{ site.data[site.active_lang] }}` rather than `page.lang` or inline `if` logic?
- [ ] If creating a post, did you create files for all 4 languages?
- [ ] Do both post files share the identical `permalink` attribute?
- [ ] Are you avoiding JS-based translation switching?

---
*Follow the "Embedded-First" philosophy: Zero unnecessary JS, Pure Native Power.*