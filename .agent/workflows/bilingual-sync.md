---
description: Sync site changes to both English and Ukrainian versions
---

# 🌐 BILINGUAL SYNC: POLYGLOT LOCALIZATION
This workflow enforces the robust `jekyll-polyglot` architecture built for the Figarist Portfolio.

> [!IMPORTANT]
> The old manual `/uk/` directory duplication hack has been **DEPRECATED**. The entire site is now 100% DRY. Polyglot automatically generates both `/` (EN) and `/uk/` natively from single source files!

## 🏗️ ARCHITECTURAL RULES
1. **The Core Plugin:** The site relies on `jekyll-polyglot` which hooks into `jekyll build`. It renders the site twice (once for EN, once for UK).
2. **Current Active Language:** During compilation, you can check the current target language via Liquid: `{% if site.active_lang == 'uk' %}...{% endif %}`.
3. **No More Hiding:** Do not use `liquid-hide` or JavaScript/CSS `display: none` toggle hacks. Output translations dynamically inline, because Polyglot separates them into completely isolated physical HTML files!

## 🔄 HOW TO LOCALIZE

### 1. Static Hubs & Layouts (`index.html`, `_includes/`, etc)
When adding a new UI card or text element, write it ONCE in `index.html` and use Liquid conditionals inline:
```html
<h2>{% if site.active_lang == 'uk' %}Мої Проєкти{% else %}My Projects{% endif %}</h2>
```
Polyglot will automatically drop the correct pure-HTML string into the root and `/uk/` directory indices.

### 2. Blogging (`_posts/`)
Polyglot handles blog posts a bit differently. You **MUST** create two separate Markdown files.
1. `2026-02-27-vr-headsets-en.md` (`lang: en`)
2. `2026-02-27-vr-headsets-uk.md` (`lang: uk`)

> [!CAUTION]
> Both localized pairs MUST share the exact same `permalink:` string in their YAML frontmatter (e.g., `permalink: /blog/vr-headsets/`). Polyglot uses this matching permalink to map the hreflang SEO tags together!

## ✅ SANITY CHECKLIST
- [ ] Are you utilizing `site.active_lang` rather than `page.lang` in the layouts?
- [ ] If creating a post, did you create both `-en` and `-uk` files?
- [ ] Do both post files share the identical `permalink` attribute?
- [ ] Are you avoiding JS-based translation switching?

---
*Follow the "Embedded-First" philosophy: Zero unnecessary JS, Pure Native Power.*