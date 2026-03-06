# 🚀 DEPLOYMENT & OPS GUIDE

---

## 🛠️ LOCAL DEVELOPMENT

### Quick Setup

```bash
git clone https://github.com/figarist/figarist.github.io.git
cd figarist.github.io
bundle install
```

### Dev Mode (fast, no minification)

```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

- Minification disabled
- PWA/Service Worker disabled
- Verbose output enabled

### Production Mode (full pipeline)

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

- **Check PWA:** DevTools → Application → Service Workers
- **Check Minification:** View Source — HTML/CSS/JS should be minified
- **Check TOC:** Any post with `toc: true` in front matter should show Contents nav
- **Check Archives:** Visit `/blog/category/gamedev/` or `/blog/tag/unity/`

---

## 🏗️ CI/CD PIPELINE

**File:** `.github/workflows/jekyll.yml`

```
Push → bundle install → jekyll build → HTML Proofer → JS Bundle Check → Deploy
```

### CI Checks

| Check            | What it does                             | Failure means                 |
| ---------------- | ---------------------------------------- | ----------------------------- |
| **HTML Proofer** | Validates all internal links, img alts   | Broken links in `_site/`      |
| **Bundle Check** | `script.js` must be < 20KB (20480 bytes) | JS exceeds performance budget |

### Common CI Failures

| Error                                 | Fix                                                      |
| ------------------------------------- | -------------------------------------------------------- |
| `FrozenError` in SCSS                 | Ensure `_plugins/polyglot_frozen_string_patch.rb` exists |
| `Permission Denied` on `Gemfile.lock` | Delete lock, `bundle install`, push                      |
| HTML Proofer link failures            | Add domain to `--ignore-urls` in workflow                |
| Bundle size exceeded                  | Audit `script.js`, remove unused code                    |

---

## 🔌 ADDING NEW PLUGINS

1. Add gem to `Gemfile` (in `jekyll_plugins` group)
2. Add to `plugins:` list in `_config.yml`
3. Run `bundle install`
4. Test: `JEKYLL_ENV=production bundle exec jekyll build`
5. **Never add `jekyll-webp`** — excluded per user decision

---

## ✏️ FRONTMATTER CMS SETUP

The site uses [Front Matter CMS](https://frontmatter.codes/) (VS Code extension). Install it once, then the `frontmatter.json` config handles everything.

```bash
# In VS Code Extensions Marketplace search:
Front Matter CMS
# Extension ID: eliostruyf.vscode-front-matter
```

Open the dashboard: `Ctrl+Shift+P` → `Front Matter: Open Dashboard`

### CMS Local Preview

Frontmatter CMS requires Jekyll running locally to render previews:

```bash
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

Then click **Open Preview** in the Front Matter panel — it opens `http://localhost:4000` for the current file.

---

## 📝 ADDING NEW POSTS

> ⚡ **Preferred method: use Frontmatter CMS.** It enforces required fields, auto-fills date/author, and generates translation stubs automatically.

### Via CMS (recommended)

1. Open **Front Matter** panel → **New content** → `Post` or `Education`
2. Fill: title, lang (`en`), permalink (`/blog/my-slug/`), categories, tags, description
3. Write content. Use **Snippets** panel for Mermaid/YouTube/Vimeo/Figma/callouts
4. Click **🔄 Sync All Languages** → auto-generates `-uk.md`, `-ru.md`, `-ko.md` AND syncs **`page_id`**
5. Translate each stub, toggle `published: true` on all 4
6. Run **🏗️ Build Site (Manual)** to get a quick copy-paste command for verification

### Via manual file (fallback)

Every post needs **4 language versions** with **identical `permalink`**:

```yaml
# _posts/2026-03-15-my-post-en.md
---
layout: post
title: "My Post Title"
description: "Short description for SEO (~160 chars)."
date: 2026-03-15
lang: en
permalink: /blog/my-post/
author: ihor
categories: gamedev
tags: [unity, csharp]
published: true
# toc: true  ← optional, enables Table of Contents
---
```

Repeat for `-uk.md`, `-ru.md`, `-ko.md` with same `permalink`.

**Archives auto-generate:** Adding `categories: gamedev` and `tags: [unity]` creates pages at `/blog/category/gamedev/` and `/blog/tag/unity/` automatically.

---

## 📱 PWA AUDIT

- **Manifest:** `manifest.json` at root, linked from `head.html`
- **Icons:** `apple-touch-icon` + `shortcut icon` in `head.html`
- **Theme Color:** Sync `<meta name="theme-color">` with `manifest.json` (`#f2f0eb`)
- **Offline:** `service-worker.js` → Workbox precaches `index.html` + assets

---

## 🔍 SEO VALIDATION

After deploy, verify hreflang:

```bash
curl -sL https://figarist.github.io/uk/ | grep "hreflang"
```

Expected: `en`, `uk`, `ru`, `ko`, `x-default`

Verify JSON-LD:

```bash
curl -sL https://figarist.github.io/blog/unity-charge-mechanic/ | grep "BlogPosting"
```

Expected: `"@type": "BlogPosting"` with `datePublished`, `dateModified`

---

## 🔄 ROLLBACK

```bash
git revert HEAD
git push origin main
```

Or: GitHub → Actions → last stable run → "Re-run all jobs"

---

_Production is a garden. Tend it with automation._
