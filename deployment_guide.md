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

## 📝 ADDING NEW POSTS

Every post needs **4 language versions** with **identical `permalink`**:

```yaml
# _posts/2026-03-15-my-post-en.md
---
layout: post
title: "My Post Title"
date: 2026-03-15
lang: en
permalink: /blog/my-post/
category: gamedev
tags: [unity, csharp]
description: "Short description for SEO."
# toc: true  ← optional, enables Table of Contents
---
```

Repeat for `-uk.md`, `-ru.md`, `-ko.md` with same `permalink`.

**Archives auto-generate:** Adding `category: gamedev` and `tags: [unity]` creates pages at `/blog/category/gamedev/` and `/blog/tag/unity/` automatically.

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
