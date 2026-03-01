# 🚀 DEPLOYMENT & OPS GUIDE (EXTREME EDITION)

This guide covers the full lifecycle of the Figarist Portfolio, from local dev to global CDN via GitHub Actions.

---

## 🛠️ LOCAL DEVELOPMENT (EXTREME)

### 1. Zero-Friction Setup

```bash
# Clone and enter
git clone https://github.com/figarist/figarist.github.io.git
cd figarist.github.io

# Install Ruby dependencies
bundle install
```

### 2. Local PWA & Minification Test

By default, `jekyll serve` might skip minification to speed up dev. To test the **production reality**:

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

- **Check PWA:** Open DevTools → Application → Service Workers. Ensure `service-worker.js` is active.
- **Check Minification:** View Source. HTML, CSS, and JS should be one-liners.

---

## 🏗️ CLOUD PERFORMANCE (GITHUB ACTIONS)

The build engine lives in `.github/workflows/jekyll.yml`.

### Build Bottleneck Monitoring

If builds take > 5 minutes:

1. **Check Cache:** Verify `actions/cache` is correctly hitting the `vendor/bundle` and `.jekyll-cache`.
2. **Minification Overhead:** `jekyll-minifier` is powerful but slow. Optimization: ensure it only runs on the final `_site` output.
3. **Polyglot Cycles:** Remember, the site builds **4 times**. Incremental builds are disabled for stability.

### Common CI Failures

- `FrozenError` in SCSS: Ensure `_plugins/polyglot_frozen_string_patch.rb` is present.
- `Permission Denied` on `Gemfile.lock`: Delete the lock file and `bundle install` locally, then push.

---

## 📱 PWA AUDIT GUIDE (LIGHTHOUSE 100)

To maintain a perfect score:

- **Maskable Icons:** Ensure `manifest.json` points to icons with `purpose: "any maskable"`.
- **Offline First:** Verify `service-worker.js` caches `index.html` and the search index `search.json`.
- **Theme Color:** Sync the `meta name="theme-color"` in `head.html` with `manifest.json`.

---

## 🔄 EXTREME ROLLBACK PROTOCOL

If a deployment breaks the site:

1. **Quick Revert:**
   ```bash
   git revert HEAD
   git push origin main
   ```
2. **Actions Override:** Go to GitHub Repository → Actions → Select the last stable run → "Re-run all jobs".
   _Note: This only works if the previous stable build artifacts are still stored._

---

## 🔍 SEO & HREFLANG VALIDATION

After deploy, run this check in terminal:

```bash
curl -sL https://figarist.github.io/uk/ | grep "hreflang"
```

You should see:

- `<link rel="alternate" hreflang="en" ...>`
- `<link rel="alternate" hreflang="uk" ...>`
- `<link rel="alternate" hreflang="ru" ...>`
- `<link rel="alternate" hreflang="ko" ...>`
- `<link rel="alternate" hreflang="x-default" ...>`

---

_Production is a garden. Tend it with automation._
