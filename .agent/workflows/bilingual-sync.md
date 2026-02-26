---
description: Sync site changes to both English and Ukrainian versions
---

# 🌐 BILINGUAL SYNC: HUB MIRRORING
This workflow enforces the "DRY Includes" architecture for the Figarist Portfolio.

> [!IMPORTANT]
> Since refactoring, `index.html` (EN) and `uk/index.html` (UK) contain **ONLY** the Bento Grid content. Layouts, SEO, and navigation are shared via `_includes/`.

## 🏗️ ARCHITECTURAL RULES
1. **Shared Layout:** Both hubs MUST use `layout: default`.
2. **Language Front Matter:** 
   - EN: `lang: en`
   - UK: `lang: uk`
3. **DRY Includes:** Never edit `<head>`, `<nav>`, or `<footer>` inside the hubs. Edit them in `_includes/` using Liquid logic for translations.

## 🔄 THE SYNC PROCESS (MANUAL MIRRORING)
When you add or modify a Bento card in one hub, you **MUST** mirror the structure to the other.

1. **Copy Structure:** Copy the specific `<article>` or `<a>` card from the source hub.
2. **Translate Content:** Paste it into the destination hub and translate:
   - Titles and descriptions.
   - Accessibility labels (`aria-label`).
   - Relative URLs (e.g., `/blog/` → `{{ '/blog/' | relative_url }}`).
3. **Keep IDs:** Ensure the `id` (e.g., `id="bio"`) remains identical for CSS Grid mapping.

## ✅ SANITY CHECKLIST
- [ ] Does the `lang` variable in Front Matter match the directory?
- [ ] Are all hardcoded links using `{{ 'path' | relative_url }}`?
- [ ] Did you translate the `alt` tags for images?
- [ ] Is the `grid-area` ID consistent across both files?

---
*Follow the "Embedded-First" philosophy: Zero unnecessary JS, Pure Native Power.*