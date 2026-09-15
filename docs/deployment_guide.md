# Build and release guide

Authoritative CI: [jekyll.yml](../.github/workflows/jekyll.yml). [Hub](README.md).
Run from the repository root in PowerShell. RTK prefixes follow local instructions.

## Preview

```powershell
rtk proxy bundle install
rtk proxy bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

## Source and production checks

Run sequentially; stop on nonzero exit. Save and restore any existing JEKYLL_ENV
around the production build.

```powershell
rtk proxy bundle exec ruby scripts/test_tutoring_content.rb
rtk proxy bundle exec ruby scripts/test_tutoring_build.rb
rtk proxy node scripts/test_service_worker.cjs
rtk proxy bundle exec ruby scripts/verify_author_ready.rb
$env:JEKYLL_ENV = 'production'
rtk proxy bundle exec jekyll build --destination _site
rtk proxy bundle exec ruby scripts/test_site.rb
rtk proxy bundle exec ruby scripts/audit_links.rb
rtk git diff --check
```

After removed drafts/routes, use a fresh destination or inspect generated paths
before running jekyll clean. It removes generated output/cache, not source.
Site/link scripts use _site by default; inspect supported arguments before changing
destination. The isolated build test manages its own temporary fixture.

Readiness validates structure, not consent. Portrait/case gaps are optional;
strict mode is appropriate only when they are actual delivery requirements.

CI also runs HTML Proofer and checks raw JS ≤20480 bytes and gzip CSS ≤30720 bytes.
Use the current workflow options. Gzip JS size from the site test does not replace
the workflow's raw JS gate. Do not weaken link checks or delete a lockfile as a
generic response to failures.

Docs-only edits need Markdown link and diff validation when public inputs are
unchanged. UI changes also require [browser checks](TUTORING_REARRANGEMENT_PLAN.md).

## Publication

Pushing main triggers Pages deployment. Check active authorization before pushing.
Inspect and stage intended files only. After authorized deployment, inspect the
matching Actions run and execute:

```powershell
rtk proxy ruby scripts/verify_live_site.rb
```

This checks live sitemap, canonical/OG URLs and redirects, not local changes.
Browser-check deployed changed pages separately. Record deployed commit/results.

## Recovery

Identify the offending commit and prepare a scoped fix or revert. Re-running an
old workflow is not guaranteed rollback. Do not reset user work or publish a revert
without appropriate authorization.
