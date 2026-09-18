# Jekyll Architecture Audit — 2026-09-18

## 1. Executive summary

Статичний сайт має працездатну production-архітектуру: `bundle exec jekyll build` проходить, content/build/service-worker/site/link gates проходять, а робоче дерево до цього аудиту було чистим. Підтвердженого P0-блокера для поточного деплою не знайдено.

Найважливіші висновки:

- **P1 — Polyglot 1.5.1 є головною архітектурною зоною ризику.** Production build працює, але `bundle exec jekyll doctor` падає всередині старого Polyglot через `@languages.each` до ініціалізації мов. Це обмеження lifecycle/diagnostic command, а не доказ невдалого production build. Поточний upstream Polyglot 1.14.0 уже має захисний `(@languages || [])` і важливі fixes для redirects, але міграція змінює URL/metadata lifecycle і потребує окремого експерименту.
- **P1 — runtime reproducibility drift.** CI запускає Ruby 3.2, локальна перевірка — Ruby 3.4.8; `.ruby-version` у корені не зафіксований. `Gemfile.lock` має `BUNDLED WITH 4.0.7` і кілька platform entries, тому відтворюваність залежить від конкретного runner/runtime.
- **P1/P2 — Git history для `jekyll-last-modified-at` неповна.** Workflow використовує стандартний shallow checkout без `fetch-depth: 0`; отже historical `git log` timestamps можуть fallback-нутися до mtime або бути менш точними. Це треба підтвердити порівняльним CI run.
- **P2 — dependency hygiene.** `jekyll-sitemap` залишився прямою залежністю, але не завантажується з `_config.yml`; власний `sitemap.xml` пригнічує generator plugin. `uglifier_args.harmony` уже відфільтровується поточним minifier. У двох custom plugins дублюється той самий frozen-string patch.
- **P2 — CI action drift.** У workflow залишилися `checkout@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4`; поточна документація GitHub Pages вже показує нові major versions. Це окремий CI maintenance item, не причина міняти Jekyll stack у цьому audit.
- **Security watch — WEBrick.** Locked `webrick 1.9.2` є latest RubyGems release, але GitHub Advisory Database містить unreviewed high-severity advisory без відомої patched version. Для статичного GitHub Pages production surface exposure низький, але локальний/CI dev server не слід виставляти назовні.

Рекомендація: **не робити широкого plugin replacement**. Спочатку зафіксувати runtime та evidence contract, прибрати dead configuration, а потім провести ізольований Polyglot 1.14.0 pilot з route/SEO/PWA rollback gates.

## 2. Scope, constraints, evidence labels

Перевірено:

- `Gemfile`, `Gemfile.lock`, `_config.yml`, custom `_plugins`, layouts/includes, multilingual metadata, sitemap, redirects, PWA finalizer, search/service-worker assets;
- `.github/workflows/jekyll.yml`, deployment guide, implementation checklist, verification report, README та historical `project_context.md`;
- direct і transitive gems, current/latest versions на 2026-09-18, lifecycle assumptions та known upstream behavior;
- clean production build у тимчасову директорію поза репозиторієм і всі доступні локальні gates;
- поточний upstream documentation/source для Jekyll, Polyglot, GitHub Pages Actions, ключових Jekyll plugins.

Обмеження виконано:

- не змінювалися `Gemfile`, `Gemfile.lock`, `_config.yml`, workflow, plugins або production templates;
- не запускалися `bundle update`, install/remove gems, deployment, push або live production mutation;
- дозволений write — тільки цей audit document.

Статуси у звіті:

- **Confirmed** — безпосередньо відтворено локальним command/output або source inspection;
- **Likely** — випливає з lifecycle/configuration, але потребує цільового experiment для кількісного підтвердження;
- **Needs experiment** — свідомо не змінювалося в межах read-only audit;
- **Not a problem** — перевірено і не вважається поточним дефектом.

## 3. Поточна архітектура та build lifecycle

### 3.1. Source graph

| Шар | Реалізація | Роль | Статус |
|---|---|---|---|
| Jekyll core | `jekyll 4.4.1`, Liquid 4, Kramdown/GFM, Rouge | read → render → generate → write | Active |
| Language routing | `jekyll-polyglot 1.5.1` + `languages: [en, uk, ru, ko]` | locale-aware URLs/documents | Active, old |
| Content | `_posts`, pages, `tutoring`, `education`, `collection` | authored content and routes | Active |
| Metadata | `_plugins/localized_page_metadata.rb`, `_includes/head.html`, JSON-LD include | localized canonical, locale, SEO graph | Active |
| Navigation | manual language switcher + static URL helpers | localized links and alternates | Active |
| Pagination | `jekyll-paginate-v2` | `/blog/page/:num/` | Active |
| Archives | `jekyll-archives` | category/tag pages | Active |
| Markdown extensions | `jekyll-spaceship` | MathJax, tables, audio, Mermaid/technical content | Active |
| Asset output | Sass converter + `jekyll-minifier` | CSS/HTML/JS compression | Active |
| Redirects | `jekyll-redirect-from` plus custom redirect layout | static HTML fallback redirects | Active |
| PWA | `jekyll-pwa-workbox` + `_plugins/finalize_multilingual_pwa.rb` | final root `sw.js`, precache | Active, custom glue required |
| Sitemap/feed | custom `sitemap.xml` + `jekyll-feed` | multilingual sitemap and RSS/Atom feed | Active |
| QA | Ruby scripts, Node service-worker test, HTMLProofer | structural/content/link/budget gates | Active |

### 3.2. Lifecycle model

1. Jekyll reads config, data, pages, posts and collections.
2. `tutoring_content.rb` validates/loading hooks run at site read time.
3. Polyglot coordinates localized documents and renders the configured languages serially because `parallel_localization: false`.
4. `localized_page_metadata.rb` supplies localized `canonical_url`, `locale`, title/description and JSON-LD payload data before SEO output is rendered.
5. Layouts/includes render manual language alternates, language switcher links, JSON-LD, feed metadata, CSS and redirects.
6. Pagination and archive generators add blog pagination/category/tag pages.
7. Jekyll writes the generated tree; minification and plugin hooks process eligible output.
8. `finalize_multilingual_pwa.rb` wraps `Jekyll::Site#process`, calls the normal process, then finalizes the multilingual Workbox output into root `sw.js`.
9. CI runs build budgets, content/navigation/site/link checks, uploads the artifact and deploys Pages.

Архітектура добре відповідає GitHub Actions model: custom plugins і custom `_plugins` доступні на runner, а не обмежені GitHub Pages safe plugin whitelist.

## 4. Runtime and dependency inventory

### 4.1. Direct dependencies

Версії — locked/current станом на 2026-09-18; `latest` означає останню стабільну версію, знайдену через RubyGems/GitHub upstream metadata.

| Dependency | Locked | Latest | Gemfile constraint | Loaded/configured | Реальне використання | Ризик / рекомендація |
|---|---:|---:|---|---|---|---|
| `jekyll` | 4.4.1 | 4.4.1 | `~> 4.3` | Core | Build engine | Keep; add explicit runtime policy separately |
| `jekyll-polyglot` | 1.5.1 | 1.14.0 | unbounded | Yes | Four-language routing/rendering | High migration risk; pilot, do not bulk-update |
| `jekyll-feed` | 0.17.0 | 0.17.0 | `~> 0.12` | Yes | `{% feed_meta %}`, feed output | Keep; current latest |
| `jekyll-seo-tag` | 2.8.0 | 2.9.0 | unbounded | Yes | `{% seo %}` in `head.html` | Low/medium; upgrade only with canonical diff |
| `jekyll-sitemap` | 1.4.0 | 1.4.0 | unbounded | **No** | No active use; custom `sitemap.xml` exists | Dead direct dependency; remove only after route diff |
| `jekyll-paginate-v2` | 3.0.0 | 3.0.0 | unbounded | Yes | Blog pagination | Keep; old but output is covered |
| `jekyll-spaceship` | 0.10.2 | 0.10.2 | unbounded | Yes | Technical Markdown processors | Keep; Ruby 4 stdlib warnings need later cleanup |
| `jekyll-minifier` | 0.2.2 | 0.2.2 | unbounded | Yes | HTML/CSS/JS minification | Keep; remove ignored `harmony` option later |
| `jekyll-redirect-from` | 0.16.0 | 0.16.0 | unbounded | Yes | Education legacy redirects/frontmatter | Keep until Polyglot redirect pilot is proven |
| `jekyll-pwa-workbox` | 5.1.41 | 5.1.41 | unbounded | Yes, explicitly required | Service worker/precache | Keep for now; old package and custom finalizer are coupled |
| `jekyll-toc` | 0.19.0 | 0.19.0 | unbounded | Yes | `toc` filters in post layout | Keep |
| `jekyll-last-modified-at` | 1.3.2 | 1.3.2 | unbounded | Yes | Git-derived freshness metadata | Keep, but verify shallow checkout behavior |
| `jekyll-archives` | 2.3.0 | 2.3.0 | unbounded | Yes | Category/tag archive pages | Keep; interaction with pagination needs regression coverage |
| `webrick` | 1.9.2 | 1.9.2 | `~> 1.8` | Dev server | Local `jekyll serve` | Keep only as dev dependency; security watch |
| `html-proofer` | 5.2.0 | 5.2.2 | `~> 5.0` test | Test only | CI generated-site checking | Low-risk test-only update candidate |

### 4.2. Important transitive/runtime packages

| Package | Locked | Latest observed | Why it matters |
|---|---:|---:|---|
| `kramdown` | 2.4.0 | 2.5.2 | Markdown parser; upgrade only with rendered Markdown diff |
| `kramdown-parser-gfm` | 1.1.0 | 1.1.0 | GFM parser; current |
| `liquid` | 4.0.4 | 5.14.0 | Major-version boundary; Jekyll 4 stack expects Liquid 4, do not update independently |
| `rouge` | 3.30.0 | 5.1.0 | Major-version boundary; syntax output can change |
| `sass-embedded` | 1.97.3 | 1.104.1 | Platform/runtime-sensitive CSS compiler |
| `nokogiri` | 1.19.1 | 1.19.4 | HTML/XML parser used by Spaceship, TOC and HTMLProofer |
| `json` | 2.18.1 | 3.0.2 | Major-version boundary; keep Jekyll-compatible resolution |
| `google-protobuf` | 4.34.0 | 4.36.1 | Sass embedded/platform artifact |
| `addressable` | 2.8.8 | 2.9.0 | URL normalization, relevant to links/redirects |
| `logger`, `bigdecimal`, `csv`, `rexml` | current locked | newer patch/minor releases exist | Ruby stdlib/default-gem compatibility; update as part of a controlled bundle update |
| Bundler | 4.0.7 | 4.0.21 | Lockfile `BUNDLED WITH` currently selects 4.0.7 on CI/setup-ruby |

Висновок: lockfile дає reproducibility, але більшість direct plugin constraints unbounded. Після кожної контрольованої update треба перевіряти lock diff і generated route/metadata manifest; не робити `bundle update` “all gems” одним кроком.

## 5. Plugin responsibility and actual usage

### `jekyll-polyglot`

Є центральним routing/rendering plugin, не просто translation helper. Він змінює site processing lifecycle, coordinates documents across languages і впливає на URL matching, redirects та metadata context. Через це його version jump з 1.5.1 до 1.14.0 — архітектурна міграція.

### `jekyll-paginate-v2`

Є фактично використаним генератором `/blog/page/:num/`; build log генерує одну pagination page, а `test_site.rb`/navigation gates перевіряють blog route. Залишати plugin виправдано, бо поточний output працює; заміна без user-facing pagination requirement не потрібна.

### `jekyll-archives`

Створює `/blog/category/:name/` і `/blog/tag/:name/`. Output проходить поточні site/link checks. Сумісність із Polyglot/pagination треба вважати regression surface, а не поточним failure.

### `jekyll-spaceship`

Реально використовується постами, а не лише записаний у config. Build проходить, але Ruby 3.4 показує warnings про майбутнє вилучення `ostruct` і `fiddle` з default gems у Ruby 4. Це compatibility maintenance item.

### `jekyll-minifier`

Активно стискає HTML/CSS/JS; size gates проходять. Build повідомляє, що legacy `uglifier_args.harmony` ігнорується. Це не output defect, але configuration debt.

### `jekyll-redirect-from` + custom redirect layout

Поточні legacy Education routes — static HTML redirects, не HTTP 301/308. Це свідомий deployment contract, зафіксований у deployment docs. Не видаляти plugin до окремої перевірки кожної старої URL.

### `jekyll-pwa-workbox` + custom finalizer

Ця пара має власний lifecycle contract: Polyglot локалізує output, а custom finalizer після нормального process створює root service worker/precache. Вилучення plugin або зміна Polyglot concurrency без SW manifest diff небезпечні.

### `jekyll-toc`, `jekyll-last-modified-at`, `jekyll-archives`

Усі три реально споживаються layouts/content і не є dead dependencies. Їхня актуальність різна, але поточні функціональні gates не показують підстави для негайної заміни.

## 6. Polyglot deep analysis

### 6.1. Поточний setup

```yaml
languages: [en, uk, ru, ko]
default_lang: en
parallel_localization: false
```

`exclude_from_localization` виключає special/generated files на кшталт sitemap, robots, feed і service-worker-related output. Це правильна safety boundary для root-level artifacts.

Поточний SEO/routing path не використовує Polyglot `I18n_Headers`:

- `_includes/head.html` вручну створює чотири `hreflang` links і `x-default`;
- `language-switcher.html` вручну обчислює locale routes;
- `localized_page_metadata.rb` вручну встановлює `canonical_url`, `locale`, title/description та JSON-LD payload;
- `sitemap.xml` вручну генерує кожен locale URL і кожен `xhtml:link`;
- redirect layout вручну локалізує target і зберігає crawlable fallback.

Це означає, що поточний output не має підтвердженої подвійної генерації alternates від Polyglot і custom head. Перевірка output дала 480 alternate `<link>` tags на 104 Jekyll pages, а site/link gates вимагають рівно один expected link кожного locale.

### 6.2. Що змінилося upstream

У Polyglot 1.14.0 upstream:

- додано/використовується сучасніший document identity через `page_id` та `permalink_lang`;
- покращено cross-language `redirect_from` і прибрано класи duplicate locale-prefix проблем;
- з’явилися `serial_default_lang`, `localize_redirects`, `missing_languages`, `available_languages` та інші lifecycle/diagnostic improvements;
- `document_url_regex` захищений від `nil` languages (`(@languages || []).each`).

Це потенційно виправляє поточний `jekyll doctor` crash, але не доводить backward-compatible HTML/URL output. Особливо ризикові місця: canonical calculation, `page.url`, redirect target, language switcher та PWA precache paths.

### 6.3. `jekyll doctor` failure

```text
undefined method 'each' for nil
.../jekyll-polyglot-1.5.1/lib/jekyll/polyglot/patches/jekyll/site.rb:171:in `document_url_regex`
```

Причина підтверджена lifecycle inspection: Jekyll Doctor робить `site.reset; site.read; site.generate`, тоді як звичайний Polyglot process спочатку готує `@languages`. Тому Doctor входить у Polyglot `read` path раніше очікуваної ініціалізації.

Класифікація: **Confirmed diagnostic-command failure; Not a production build failure.** Потрібен окремий experiment на Polyglot 1.14.0, а не workaround у production code.

### 6.4. Canonical/hreflang rule for migration

Не можна просто додати `{% I18n_Headers %}` до наявного `head.html`. Якщо Polyglot-generated headers будуть прийняті, треба одночасно порівняти і, за необхідності, відключити duplicate canonical від SEO tag через `canonical=false`, зберігши одну source of truth. До такого експерименту поточну ручну систему не чіпати.

## 7. Conflict matrix

| Pair / boundary | Observed behavior | Classification | Decision |
|---|---|---|---|
| Polyglot × `paginate-v2` | Pagination output exists; site tests pass | Needs experiment for version migration, **not current failure** | Keep; compare blog page URLs/counts in pilot |
| Polyglot × `jekyll-archives` | Category/tag pages pass current checks | Needs experiment; upstream ecosystem is old | Keep; add archive route manifest to pilot |
| Polyglot × `redirect-from` | Eight localized static redirect pages pass | Current behavior works; migration risk high | Keep; test no `/uk/uk` and no loops |
| Polyglot × `jekyll-seo-tag` | One expected canonical per Jekyll page; custom metadata is consumed | Not a problem today | Do not add `I18n_Headers` without canonical decision |
| Polyglot × custom hreflang | Manual head/sitemap output passes expected-link checks | Not a problem today | Preserve as baseline oracle |
| Polyglot × PWA Workbox | Custom finalizer creates root `sw.js`; service-worker test passes | Needs experiment | Keep `parallel_localization: false`; test `serial_default_lang` only in pilot |
| Minifier × service worker | `sw.js` exists and service-worker tests pass | Not a problem today | Keep; diff manifest after any minifier/finalizer change |
| Minifier × inline JSON-LD | JSON-LD/site checks pass | Not a problem today | No replacement plugin |
| Spaceship × Kramdown/Minifier | Technical Markdown builds and size gates pass | Not a problem today; warning only | Keep; add explicit stdlib gems in Ruby 4 prep |
| Last-modified × shallow checkout | Workflow lacks `fetch-depth: 0` | Likely freshness risk | Run 1-depth vs full-history comparison |
| Custom sitemap × `jekyll-sitemap` | Plugin absent from `_config.yml`; custom file suppresses generator | **Not an active conflict; dead dependency** | Remove later after route/sitemap diff |
| Custom search × localized pages | Search/site tests pass | Not a problem today | Keep custom search |
| Redirect layout × Polyglot | Localized fallback/canonical works now | Needs experiment for 1.14 | Include all eight redirect paths in gates |
| Jekyll Doctor × Polyglot 1.5.1 | Doctor exits 1 before normal process initialization | **Confirmed limitation** | Either document exclusion or fix through controlled Polyglot update |

## 8. Baseline verification evidence

All generated output for this audit was written to a temporary directory outside the repository with disk cache disabled. No tracked `_site` or QA artifacts were changed.

| Check | Result | Evidence |
|---|---|---|
| `ruby --version` | PASS | Ruby 3.4.8 |
| `bundle --version` | PASS | Bundler 4.0.7 |
| `bundle exec jekyll --version` | PASS | Jekyll 4.4.1 |
| Production build | PASS | `done in 26.504 seconds`; temporary destination |
| `bundle exec jekyll doctor` | FAIL | Polyglot 1.5.1 nil `@languages` path; diagnostic-only failure |
| `scripts/test_tutoring_content.rb` | PASS | All content gates |
| `scripts/test_tutoring_build.rb` | PASS | Invalid-build rejection, UK-only rendering, no hidden-data/leak failures |
| `scripts/test_service_worker.cjs` | PASS | Navigation precedence and fallback checks |
| `scripts/verify_author_ready.rb` | PASS with content pending | 0 structural errors; 2 optional author-content pending items |
| `scripts/test_nav_01.rb` | PASS | Localized navigation/hreflang contract |
| `scripts/test_site.rb` | PASS | 28 checked pages, 24 tutoring routes, metadata, hreflang, search, sitemap, JSON-LD, draft exclusion and budgets |
| `scripts/audit_links.rb` | PASS | 105 HTML pages, 5,942 link references, 0 errors |
| CSS/JS budgets | PASS | `script.js` 2,702 gzip bytes; `styles.css` 17,065 gzip bytes |
| `git diff --check` | PASS | No whitespace errors |
| Working tree | PASS | Clean before audit; branch `main` is one commit ahead of `origin/main` |

Output counts from the isolated build:

- 105 HTML files total;
- 104 Jekyll-rendered pages have one canonical link; `assets/games/dish-of-chaos/index.html` is a standalone Unity bootstrap page and intentionally has no Jekyll head;
- 480 alternate link tags across the Jekyll-rendered pages;
- custom sitemap has 48 `<loc>` entries and 240 hreflang entries;
- 8 static redirect pages (`/education`, `/blog/test` and their four locale variants);
- generated root `sw.js` is present (5,440 UTF-8 bytes).

The historical `docs/VERIFICATION_REPORT_2026-09-15.md` reported a previous 6,360-link audit. The current source/build audit reports 5,942 references; this is a current measurement difference, not silently treated as a regression without a route-by-route historical diff.

## 9. Security, CI and reproducibility

### 9.1. WEBrick

The current lock has `webrick 1.9.2`, also the latest release observed. GitHub Advisory Database lists [GHSA-h4w6-wx8r-p68v / CVE-2026-38969](https://github.com/advisories/GHSA-h4w6-wx8r-p68v), described as request smuggling through WEBrick trailer parsing, severity high, unreviewed, with patched versions unknown.

Context matters: this repository deploys static Pages artifacts and does not use WEBrick as a production origin. The risk is therefore primarily local/CI server exposure. Do not expose `jekyll serve` to an untrusted network; add a security review task to upgrade when an authoritative patched release exists.

### 9.2. Ruby mismatch

Workflow:

```yaml
ruby-version: "3.2"
bundler-cache: true
```

Local verified runtime is Ruby 3.4.8. There is no root `.ruby-version` in the current source inventory. `ruby/setup-ruby` uses the lockfile Bundler selection when `bundler-cache: true`, so the lock is useful, but Ruby/platform-specific native gems can still differ.

Recommendation: choose one supported build Ruby policy, encode it in CI and `.ruby-version`/documentation, then run the same baseline on that version before any dependency update.

### 9.3. Shallow checkout and freshness metadata

`actions/checkout@v4` has no explicit `fetch-depth: 0`. The `jekyll-last-modified-at` plugin derives dates from Git when history is available and falls back to filesystem mtime otherwise. This is a likely SEO freshness accuracy issue, not a build failure. Verify it with a two-build comparison before changing the workflow.

### 9.4. GitHub Actions drift

Current workflow uses `checkout@v4`, `upload-pages-artifact@v3`, and `deploy-pages@v4`. Current official GitHub Pages custom-workflow documentation shows `upload-pages-artifact@v4` and current action releases have newer major versions. Treat action updates as a separate, small CI maintenance change with a full deployment verification; do not mix them into the Polyglot migration.

## 10. Candidate plugins/tools and reject decisions

| Candidate / category | Decision | Reason |
|---|---|---|
| `html-proofer 5.2.2` | Adopt later, test-only | Patch release; current 5.2.0 already works, low blast radius |
| `bundle-audit` or equivalent Ruby dependency audit | Pilot as CI tool, not Jekyll plugin | Useful for advisory detection; do not install or mutate dependencies during this audit |
| `jekyll-sitemap` | Reject/add nothing; remove dead dependency later | Custom multilingual sitemap is the source of truth |
| Additional multilingual SEO plugin | Reject | Existing manual canonical/hreflang/sitemap contract is covered; another generator increases duplicate risk |
| `jekyll-assets`/new fingerprinting plugin | Reject for now | No demonstrated asset-cache defect; PWA URLs and custom finalizer create extra coupling |
| Responsive image plugin | Pilot only if real image-performance evidence appears | Existing authored image metadata/WebP and image checks cover current need |
| Search plugin | Reject | Custom localized search output is already tested |
| Related-posts plugin | Reject | Existing content/layout logic has no reported correctness gap |
| New pagination plugin | Reject | Current pagination passes; replacement would expand route risk without a requirement |
| New accessibility/link plugin | Reject | Ruby scripts + HTMLProofer cover structural/link checks; browser/axe is a separate QA tool, not a Jekyll runtime plugin |
| New structured-data plugin | Reject | Custom JSON-LD graph is already generated and tested |
| Replacement for `jekyll-pwa-workbox` | Pilot later | Package is old, but custom finalizer is a critical current contract; replace only with equivalent manifest/output evidence |

## 11. What should not be refactored now

Не рекомендується зараз:

- переносити sitemap на `jekyll-sitemap`;
- додавати Polyglot `I18n_Headers` поверх current manual head;
- прибирати custom `localized_page_metadata.rb` або custom PWA finalizer;
- міняти `parallel_localization: false` на `true`;
- оновлювати всі gems однією командою;
- замінювати pagination, archives, search або JSON-LD “для modern stack” без output diff;
- очищати/перегенеровувати `_site` у робочому дереві без explicit need;
- змінювати redirects з static HTML на server redirects без окремого hosting proof.

## 12. Recommended roadmap

### Phase 0 — evidence contract (зараз)

Залишити production code без змін. Зафіксувати baseline command set, route manifest, sitemap URLs, canonical/hreflang counts, redirect targets, search index names, SW precache entries і local/CI Ruby versions.

### Phase 1 — low-risk maintenance

Окремими малими changes:

1. Вирівняти Ruby policy між CI та локально.
2. Провести shallow-vs-full-history proof для `jekyll-last-modified-at`; лише після proof додати `fetch-depth: 0`, якщо це справді змінює дати.
3. Оновити test-only `html-proofer` до 5.2.2 і прогнати повний gate set.
4. Прибрати ignored `uglifier_args.harmony` після generated HTML/CSS/JS diff.
5. Вирішити долю dead `jekyll-sitemap` після sitemap/route diff.
6. Об’єднати дубльований frozen-string patch в один custom plugin без зміни поведінки.
7. Окремо оновити GitHub Actions majors і перевірити artifact/live verification.

### Phase 2 — Polyglot pilot

На окремій branch/commit:

1. Оновити тільки `jekyll-polyglot` консервативним способом.
2. Зберегти `languages`, `default_lang`, `exclude_from_localization`, `parallel_localization: false`.
3. Не додавати `I18n_Headers` і не міняти canonical source of truth у тому ж changeset.
4. Порівняти всі output manifests і gates.
5. Тільки якщо parallel/plugin safety буде доведено, експериментувати з `serial_default_lang`/іншими новими options.

### Phase 3 — controlled modernization

Після успішного Polyglot pilot окремо розглядати `jekyll-seo-tag 2.9.0`, explicit plugin constraints, Ruby 4 readiness (`ostruct`/`fiddle`) та PWA replacement. Кожна зміна має власний rollback і output diff.

## 13. Safe Polyglot migration protocol

### Before change

- Переконатися, що working tree clean і поточний branch/commit записаний.
- Зберегти baseline lists для 4 locales: page routes, post routes, archive routes, redirect routes, sitemap `<loc>`, canonical targets, hreflang targets, search indexes, SW precache.
- Запустити весь локальний gate set на погодженому Ruby.

### During change

- Змінити тільки Polyglot constraint/lock у першому experiment.
- Не змінювати templates, custom metadata, sitemap, redirects, PWA finalizer і concurrency одночасно.
- Окремо записати `bundle lock` diff і warnings.

### Required acceptance gates

- production build exit 0;
- `test_tutoring_content`, `test_tutoring_build`, `test_service_worker`, `test_nav_01`, `test_site`, `audit_links`, `verify_author_ready`;
- усі expected locale routes збереглися без `/lang/lang/` duplication;
- один canonical на кожну Jekyll HTML page;
- рівно один expected `hreflang` target кожної мови та коректний `x-default`;
- sitemap має той самий URL set і valid XML;
- усі 8 redirect pages мають правильний localized target без loop;
- search indexes і SW precache містять той самий locale coverage;
- CSS/JS gzip budgets не погіршилися;
- build warnings не збільшилися без пояснення.

### Stop/rollback conditions

Негайно зупинити pilot, якщо route count змінюється без пояснення, з’являється duplicate canonical/hreflang, локальний redirect prefix подвоюється, SW втрачає locale asset, archive/pagination page зникає, будь-який existing gate падає або Jekyll build стає non-deterministic. Rollback має бути звичайним revert локального experiment commit; не використовувати destructive reset/checkout.

## 14. Final verdict and sources

### Verdict

Поточний Jekyll stack **production-capable і функціонально підтверджений**, але його multilingual core — старий Polyglot із відомим diagnostic lifecycle failure та великою відстанню до current release. Найкраща стратегія — не “переписати на новий plugin stack”, а зробити малий evidence-driven hardening:

1. runtime/CI reproducibility;
2. freshness/security/action hygiene;
3. dead/ignored configuration cleanup;
4. ізольований Polyglot 1.14.0 pilot;
5. лише після цього — selective modernization.

### Primary external sources

- [Jekyll continuous integration with GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [ruby/setup-ruby README](https://github.com/ruby/setup-ruby)
- [Polyglot README and configuration](https://github.com/untra/polyglot)
- [Polyglot releases](https://github.com/untra/polyglot/releases)
- [Polyglot 1.14.0 site patch](https://raw.githubusercontent.com/untra/polyglot/1.14.0/lib/jekyll/polyglot/patches/jekyll/site.rb)
- [Jekyll Doctor source](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/commands/doctor.rb)
- [Jekyll Site read lifecycle](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/site.rb)
- [jekyll-seo-tag releases](https://github.com/jekyll/jekyll-seo-tag/releases)
- [jekyll-feed](https://github.com/jekyll/jekyll-feed)
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)
- [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2)
- [jekyll-archives releases](https://github.com/jekyll/jekyll-archives/releases)
- [jekyll-spaceship](https://github.com/jeffreytse/jekyll-spaceship)
- [jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier)
- [jekyll-pwa-workbox](https://github.com/souldanger/jekyll-pwa-workbox)
- [HTMLProofer changelog](https://github.com/gjtorikian/html-proofer/blob/main/CHANGELOG.md)
- [WEBrick advisory GHSA-h4w6-wx8r-p68v](https://github.com/advisories/GHSA-h4w6-wx8r-p68v)

## 15. Implementation appendix — hardening run (2026-09-18)

This appendix records the implementation outcome without rewriting the historical
findings above. The migration stop conditions were applied to the generated-site
contract, not relaxed to make the pilot pass.

### Accepted local commits

The following commits were created and remain in history, in order:

1. `063cadc docs: add Jekyll architecture audit`
2. `9a90a0d build: align Ruby and Bundler runtime policy`
3. `efc622e ci: preserve git history for content timestamps`
4. `42bc9aa build: remove unused jekyll-sitemap dependency`
5. `ccd2353 chore: remove ignored minifier option and centralize patch`
6. `56c50c0 test: update html-proofer and test transitive gems`
7. `ff94899 ci: update GitHub Pages actions`

No Polyglot or SEO-plugin migration commit was created. The final documentation
commit is intentionally separate from these source/build changes.

### Final verified runtime and dependency state

| Item | Final state | Decision |
| --- | --- | --- |
| Ruby | 3.4.8, policy `3.4.x` in `.ruby-version` and CI | Accepted |
| Bundler | 4.0.7 from `Gemfile.lock` | Accepted |
| Jekyll | 4.4.1 | Unchanged |
| Polyglot | 1.5.1, exact direct constraint | Retained and pinned after failed 1.14.0 pilot |
| HTMLProofer | 5.2.2, test group only | Accepted |
| jekyll-seo-tag | 2.8.0 | Phase H deferred because Polyglot did not pass |
| WEBrick | 1.9.2, local preview only | Security watch remains |

The Polyglot 1.14.0 experiment changed only the direct Polyglot constraint and
its lock entry after the broad resolver result was narrowed back to the original
transitive lock state. Its clean production build completed, but the contract
reported HTML changes for `/blog/`, `/uk/blog/`, `/ru/blog/`, and `/ko/blog/`.
The pilot was therefore rolled back without a destructive Git operation.

### Contract and regression evidence

The reusable verifier is `scripts/capture_jekyll_contract.rb`. Gitignored QA
artifacts are stored under
`C:\Users\igors\.codex\qa\figarist-jekyll-hardening`:

- `baseline.json` captured the approved pre-hardening production output.
- `final-stable.json` captured the final 1.5.1 production output.
- The final comparison reported empty route, HTML, SEO, sitemap, search, PWA,
  size, warning, runtime and dependency diffs.
- Final output counts are 105 routes, 105 HTML pages, 48 sitemap locations, 8
  redirect pages, 4 search indexes and 46 service-worker precache entries.
- Baseline build time was 28.987 seconds; final stable build time was 28.552
  seconds. The rejected 1.14.0 pilot completed in 28.523 seconds before its
  output contract failure was applied.

The final local gates were green: NAV-01, tutoring content, tutoring build,
service-worker, site metadata/budgets, link audit and Git-derived last-modified
history. Author readiness reported zero structural errors and two expected
pending author decisions (portrait and published student cases).

### Browser matrix

The production preview was served on loopback at
`http://127.0.0.1:4005/`. EN/UK/RU/KO home, Workshop, both technical posts,
education category/tag archives, tutoring overview and Unity tutoring were
checked at 390x844, 768x900 and 1280x900: 96 route/viewport checks, zero
horizontal-overflow failures, one canonical per page, five hreflang links and
the correct active locale. The mobile menu, breadcrumbs, footer and all four
localized Education redirect destinations were also read back. Console review
found only the expected GoatCounter “localhost” warning and no JavaScript errors.

### Known limits and deferred work

- `bundle exec jekyll doctor` still fails in Polyglot 1.5.1 at
  `@languages.each` (`site.rb:171`). This is the documented diagnostic-only
  baseline failure; the production build and all production gates pass.
- In the rejected 1.14.0 pilot, Doctor failed on its newer `prepare` lifecycle
  path (`site.rb:158`), and the generated-site contract changed. The 1.14.0
  migration remains deferred until a separately designed compatibility/output
  experiment is available.
- The real CI HTMLProofer command was executed locally. HTMLProofer 5.2.2 could
  not start because this Windows Ruby installation lacks `libcurl.dll`; this is
  recorded as an environment limitation, not masked as a pass. The Ubuntu CI
  run remains unverified until an authorized push.
- WEBrick remains loopback-only and is not a production dependency. The current
  advisory watch item is retained until an authoritative patched release exists.
- Selective `jekyll-seo-tag` 2.9.0, `bundler-audit`, new runtime plugins, live
  GitHub Actions execution, deployment, live HTTP redirect status and external
  accessibility certification were not performed.

### Subsequent Polyglot migration

The earlier pilot rejection is superseded by
[the migration report](POLYGLOT_MIGRATION_2026-09-18.md). Its four HTML changes
were serialization-only. Polyglot is now pinned to 1.14.0; the obsolete
frozen-string patch was removed, Doctor initialization fixed, and a multilingual
pagination regression gate added. The sections above retain historical evidence.
