# Dependency freshness audit

Date: 2026-09-18

## Result

The site dependencies were checked beyond direct Gemfile entries. The lockfile
was refreshed to the newest dependency graph allowed by the current Jekyll
stack, and `bundle outdated --strict` reports `Bundle up to date!`.

Updated transitive gems include BigDecimal, concurrent-ruby, CSV, ExecJS,
google-protobuf, i18n, Kramdown, Mercenary, Rake, Rouge, Sass Embedded,
terminal-table, Terser and unicode-display_width. `bundler-audit 0.9.3` is now a
test dependency and a required CI gate. The current ruby-advisory-db reports no
known vulnerabilities in the resolved bundle.

Vendored browser libraries were refreshed and pinned by regression checks:

- Mermaid 12.0.0;
- MathJax 4.1.3;
- Lunr 2.3.9, which is still the latest release;
- the current official GoatCounter `count.js` asset.

Mermaid 12 is a breaking release and changes its default renderer appearance.
The site explicitly selects `dagre`, the default theme and classic look to
preserve the existing diagrams. Browser verification rendered three Mermaid
diagrams and three MathJax expressions with no JavaScript errors.

GitHub Actions use the current release majors, whose floating major tags receive
patch updates: checkout v7, cache v6, configure-pages v6,
upload-pages-artifact v5 and deploy-pages v5. `ruby/setup-ruby@v1` is the
upstream-supported rolling action tag.

## Verification

- Complete local regression suite: PASS.
- Production build and `jekyll doctor`: PASS.
- 105 HTML pages and 5,942 link references: 0 errors.
- Route, canonical, sitemap, search and PWA contracts: unchanged.
- Ruby advisory database: 1,245 advisories checked; no vulnerabilities found.
- Live CI and deployment: pending the authorized push.

## Honest runtime boundary

This does not claim that the entire toolchain uses the newest Ruby major. The
project intentionally remains on the Ruby 3.4 line while Ruby 4.0.7 is current.
Current Jekyll dependencies still warn about `ostruct` and `fiddle` leaving the
default standard library. A direct Windows test of `fiddle 1.1.8` failed because
the local Ruby toolchain lacks libffi headers. Ruby 4 therefore remains a
separate compatibility migration and is not mixed into this safe dependency
refresh.

Likewise, Mermaid 12 requires ES2024 and Safari 17.4 or newer. This is now the
browser compatibility floor for pages containing Mermaid diagrams; ordinary
site pages do not load Mermaid.

## Sources

- [Ruby 4.0.7 release](https://www.ruby-lang.org/en/news/2026/09/15/ruby-4-0-7-released/)
- [Mermaid releases](https://github.com/mermaid-js/mermaid/releases)
- [MathJax releases](https://github.com/mathjax/MathJax-src/releases)
- [Ruby Advisory Database](https://github.com/rubysec/ruby-advisory-db)
