# 🗂 PROJECT CONTEXT: figarist.github.io

> Цей файл — повний контекст проекту для передачі іншому ШІ.
> Автор: Ihor (Figarist) — Indie Game Developer & CS Teacher, Зміїв, UA.

---

## 🔧 ТЕХНОЛОГІЧНИЙ СТЕК

- **Jekyll** (Static Generator) + **GitHub Actions** (deployment via `.github/workflows/jekyll.yml`)
- **Plugin Localization:** `jekyll-polyglot` (quadrilingual sync — en, uk, ru, ko)
- **SEO Plugins:** `jekyll-seo-tag` (OG, Twitter, JSON-LD), `jekyll-sitemap` (sitemap.xml), `jekyll-feed` (feed.xml)
- **Custom Plugin:** `_plugins/polyglot_frozen_string_patch.rb` (fixes `FrozenError` in Polyglot + SCSS)
- **Мова шаблонів:** Liquid
- **CSS:** SCSS (compiled by Jekyll) → `assets/css/styles.scss` — NO Tailwind, NO Bootstrap
- **JS:** Vanilla JavaScript (ОБМЕЖЕНО: без фреймворків). Головний файл: `script.js` (IIFE)
- **Markdown:** kramdown + rouge (підсвітка коду)
- **Шрифти:** `Outfit` (sans) + `Fira Code` (mono) з Google Fonts
- **Аналітика:** Plausible (privacy-first, zero cookies, no GDPR banner)

---

## 📁 ФАЙЛОВА СТРУКТУРА

```
figarist.github.io/
│
├── .github/
│   └── workflows/
│       └── jekyll.yml          # GitHub Actions CI/CD (Polyglot build + HTML minify + deploy)
│
├── _config.yml                 # Jekyll конфіг (title, url, plugins, languages, collections, defaults)
├── Gemfile                     # Ruby залежності (Jekyll 4.3, Polyglot, SEO, Sitemap, Feed, Webrick)
│
├── index.html                  # Bento Hub (Мультимовний — Polyglot збирає з нього 4 версії)
├── 404.html                    # Кастомна 404 сторінка (квадрилінгвальна)
├── script.js                   # Головний JS (scroll anim, WebGL overlay, card tilt, parallax, email copy)
├── robots.txt                  # SEO crawl rules
│
├── _includes/
│   ├── head.html               # <head> + jekyll-seo-tag + Polyglot hreflang + auto-redirect script
│   ├── header.html             # Floating navbar + language switcher + preference save script
│   └── footer.html             # Мінімальний футер з роком
│
├── _layouts/
│   ├── default.html            # Базовий лейаут (head → header → main → footer → script.js)
│   ├── post.html               # Лейаут посту (extends default, related posts, tags)
│   └── education.html          # Лейаут навчальних статей (extends default, custom JSON-LD Article)
│
├── _data/
│   ├── en/strings.yml          # 🇬🇧 Англійський UI словник (~107 ключів)
│   ├── uk/strings.yml          # 🇺🇦 Український UI словник
│   ├── ru/strings.yml          # Російський UI словник
│   └── ko/strings.yml          # 🇰🇷 Корейський UI словник
│
├── _posts/                     # Блог-пости (4 файли на кожну тему: EN, UK, RU, KO)
│   ├── 2026-02-26-kharkiv-cats-unity-{en,uk,ru,ko}.md
│   ├── 2026-02-26-minecraft-python-{en,uk,ru,ko}.md
│   ├── 2026-02-27-personal-blackout-thursday-{en,uk,ru,ko}.md
│   ├── 2026-02-27-unity-charge-mechanic-{en,uk,ru,ko}.md
│   ├── 2026-02-27-vr-headset-comparison-{en,uk,ru,ko}.md
│   └── 2026-02-27-what-is-a-file-{en,uk,ru,ko}.md
│
├── _education/                 # Колекція навчальних матеріалів (4 файли на тему)
│   ├── jekyll-collections-vs-posts-{en,uk,ru,ko}.md
│   ├── unity-physics-beginner-guide-{en,uk,ru,ko}.md
│   └── wearos-zero-gc-mindset-{en,uk,ru,ko}.md
│
├── _plugins/
│   └── polyglot_frozen_string_patch.rb  # Monkey-patch для FrozenError у Polyglot + SCSS
│
├── assets/
│   ├── css/
│   │   └── styles.scss         # Головний SCSS (~1909 рядків, Bento UI дизайн-система)
│   └── images/
│       ├── default-social-card.jpg  # OG/Twitter social card
│       └── figaristgithub.png       # Аватар/лого
│
├── blog/
│   └── index.html              # Мультимовний список постів блогу
│
├── education/
│   └── index.html              # Хаб навчальних матеріалів
│
└── collection/
    └── index.html              # Мультимовна сторінка колекції ігор
```

---

## 🎨 ДИЗАЙН-СИСТЕМА (Bento UI)

### CSS Змінні (`:root`)

```css
/* Bento Spec Primitives */
--bento-gap: 20px;
--card-radius: 20px;
--card-padding: 24px;

/* Cloud Dancer Palette (Pantone 2026) */
--bg-color: #f2f0eb; /* Фон сторінки */
--card-bg: #ffffff; /* Білі картки */
--card-bg-warm: #faf8f4; /* Тепло-білий варіант */

/* Акценти */
--accent-blue: #a2c2e1; /* Pinterest Cool Blue */
--accent-blue-d: #6e9fc7; /* Deeper blue for text */
--accent-pink: #f5c2cc; /* Blush pink */
--accent-pink-d: #d97f93; /* Deep rose */
--accent-green: #b5e853; /* Wasabi — teaching card */
--accent-green-d: #7ab824; /* Deep wasabi */
--accent-plum: #6b3fa0; /* Plum Noir — shrine */
--accent-persimmon: #e8603c; /* Persimmon — shrine accent */
--accent-yellow: #f7e04a; /* Warm yellow */
--accent-cyan: #4ecdc4; /* Interactive teal */

/* Текст */
--text-primary: #1a1a2e;
--text-secondary: #4a4a6a;
--text-muted: #8888a8;
--text-on-dark: #f2f0eb;

/* Borders */
--border-light: rgba(0, 0, 0, 0.07);
--border-card: rgba(0, 0, 0, 0.06);

/* Тіні */
--shadow-card: 0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
--shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);

/* Шрифти */
--font-sans: "Outfit", system-ui, -apple-system, sans-serif;
--font-mono: "Fira Code", "Courier New", monospace;

/* Transitions */
--t-fast: 0.18s ease;
--t-med: 0.28s ease;
--t-slow: 0.45s ease;

/* UX Snappiness Metrics */
--tilt-duration-in: 0.1s; /* Snappy 3D response */
--tilt-duration-out: 0.4s; /* Smooth 3D return */
--entry-duration: 1.2s; /* Ultra-soft fade-in */
--entry-lift: 15px; /* Vertical arrival offset */
--main-top-margin: 70px; /* Spacing for mobile/bento overlap */
```

### Bento Grid Layout (3 колонки)

```css
.bento-grid {
  display: grid;
  gap: 20px;
  padding: clamp(16px, 3vw, 32px);
  max-width: 1300px;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);
  grid-template-areas:
    "bio          bio          stack"
    "studio       studio       shrine"
    "webgl        webgl        shrine"
    "feed-vr      feed-vr      feed-gamedev"
    "feed-vr      feed-vr      feed-gamedev"
    "feed-personal feed-edu   python"
    "teach        contact      contact";
}
```

### Grid Area → HTML ID Mapping

| `grid-area`     | HTML `id`        | Клас картки            |
| --------------- | ---------------- | ---------------------- |
| `bio`           | `#bio`           | `.card--bio`           |
| `studio`        | `#studio`        | `.card--studio`        |
| `webgl`         | `#webgl`         | `.card--webgl`         |
| `stack`         | `#stack`         | `.card--stack`         |
| `shrine`        | `#shrine`        | `.card--shrine`        |
| `feed-vr`       | `#feed-vr`       | `.card--feed-vr`       |
| `feed-gamedev`  | `#feed-gamedev`  | `.card--feed-gamedev`  |
| `feed-personal` | `#feed-personal` | `.card--feed-personal` |
| `feed-edu`      | `#feed-edu`      | `.card--feed-edu`      |
| `python`        | `#python`        | `.card--python`        |
| `teach`         | `#teaching`      | `.card--teaching`      |
| `contact`       | `#contact`       | `.card--contact`       |

### Responsive Breakpoints

- **Tablet (≤1024px):** зменшені відступи, 2-колоночний grid або інший перерозподіл areas
- **Mobile (≤768px):** `flex-direction: column`, усі картки у стек

---

## 🌐 МУЛЬТИМОВНА СИСТЕМА (Jekyll-Polyglot)

### Архітектура

Увесь сайт управляється плагіном `jekyll-polyglot`. `_config.yml` настроєно на 4 мови (`en`, `uk`, `ru`, `ko`) з `default_lang: en`.
Jekyll збирає сайт **ЧОТИРИ РАЗИ**, автоматично створюючи `/uk/`, `/ru/` та `/ko/` директорії на основі `site.active_lang`.

### Написання Мультимовного Коду

Оскільки `index.html` збирається 4 рази, переклад виконується через глобальні словники `_data/[lang]/strings.yml`, щоб не роздувати DOM:

```html
<h2>{{ site.data[site.active_lang].strings.my_projects }}</h2>
```

**ЗАБОРОНЕНО:** Використовувати `liquid-hide`, inline `{% if site.active_lang %}` (якщо тексту багато), чи JavaScript класи `display: none`.

### Локалізовані Заголовки Сторінок

Для локалізації заголовку у `<title>` та OG-тегах без хардкоду використовується `title_key` замість `title:` у front matter:

```yaml
---
title_key: education_hub_title
---
```

Логіка в `head.html` автоматично зчитує переклад з `_data/[lang]/strings.yml`.

### Блог (`_posts/`)

Всі пости пишуться НАБОРОМ (4 файли окремо для EN, UK, RU, KO). У них обов'язково повинні співпадати:

- `permalink:` (ідентичні у всіх 4 файлах)

А відрізнятися має:

- `lang: en` (або `uk`, `ru`, `ko`) у Front Matter.

Polyglot автоматично зшиває їх через `<link rel="alternate">` використовуючи збіг `permalink`.

### Навчальна Колекція (`_education/`)

Працює **ідентично** до постів: 4 файли на кожну тему, однаковий `permalink:`, різний `lang:`. Використовує лейаут `education.html` з кастомним JSON-LD `Article` schema.

### Перемикач мов (`href` Escape Trap)

Polyglot має агресивний regex-парсинг. Якщо створювати `href="/"` перемикач, він його насильно змінить на `href="/uk/"`. Щоб цього уникнути у SEO-тегах (`hreflang`) та кнопках "EN / UK", ми використовуємо блок-тег `{% static_href %}`:

```html
<a {% static_href %}href="/путь/" {% endstatic_href %}>EN</a>
```

### Система Мовних Переваг

1. **Авто-редірект** (перший візит) — inline `<script>` в `head.html`:
   - Визначає мову браузера (`navigator.languages`)
   - Зберігає в `localStorage` ключ `preferred_lang`
   - Редіректить на відповідну локаль, якщо не збігається з поточною

2. **Ручний вибір** — inline `<script>` в `header.html`:
   - При кліку на мову у switcher зберігає вибір у `preferred_lang`
   - Використовує `data-lang` атрибути та `translate="no"`, щоб уникнути конфліктів з Google Translate.
   - Redirect logic у `head.html` має whitelist (`en`, `uk`, `ru`, `ko`) для запобігання URL-loop.

> ⚠️ **LEGACY:** Файл `assets/js/locale.js` був **DEPRECATED** і видалений з проекту. Він використовував старий ключ `figarist_ui_lang` та CSS-class toggling. НЕ відтворювати.

---

## 🧩 КОМПОНЕНТИ (по картках)

### `.card--bio` (`#bio`)

- Градієнтний фон (`#fff → #f0ecff`)
- Avatar (`<img>` 72×72px, border-radius: 50%)
- Doodle accents: `.doodle--star`, `.doodle--bracket`, `.doodle--heart`, `.doodle--watch`
- Parallax на mousemove (`script.js` §4)

### `.card--studio` (`#studio`)

- Темний фон (`#0f0e17`), текст на темному
- 2 watch mockups: `.watch-game--racer` (CSS анімація авто) + `.watch-game--puzzle` (CSS grid)
- Клік → перехід на `https://wristandpocket.github.io`
- **НЕ** включений у card tilt

### `.card--webgl` (`#webgl`)

- "Click to Play" overlay (`#webgl-overlay`)
- iframe (`#webgl-iframe`) — lazy load, стає активним після кліку
- Status indicator (`#webgl-status`)
- Логіка в `script.js` §2

### `.card--stack` (`#stack`)

- Blueprint-grid pattern (CSS background-image)
- 2×2 grid іконок технологій (`.stack__icons`)

### `.card--shrine` (`#shrine`)

- Плавно займає 2 рядки вертикально
- Базові кольори: `--accent-plum` + `--accent-persimmon`

### `.card--teaching` (`#teaching`)

- Акцент: `--accent-green` (wasabi)

### `.card--contact` (`#contact`)

- Email через `mailto:` + JS copy-to-clipboard (`script.js` §5)
- **НЕ** включений у card tilt

### `404.html`

- Кастомна 404 сторінка
- Квадрилінгвальна: тексти з `_data/[lang]/strings.yml` (`error_404_title`, `error_404_h2`, `error_404_text`, `error_404_back`)

---

## 📝 BLOG POSTS FRONT MATTER

```yaml
---
layout: post
title: "Назва посту"
date: 2026-02-26
lang: uk # en | uk | ru | ko
permalink: /blog/topic-slug/ # ІДЕНТИЧНИЙ у всіх 4 файлах
tags: [unity, gamedev]
description: "Короткий опис для SEO"
image: /assets/images/post-card.webp # Social card (рекомендовано для OG/Twitter)
---
```

### Permalink Pattern (`_config.yml`)

```yaml
permalink: /blog/:year/:month/:day/:title/
```

---

## 📝 EDUCATION FRONT MATTER

```yaml
---
title: "Назва статті"
lang: uk # en | uk | ru | ko
permalink: /education/topic-slug/ # ІДЕНТИЧНИЙ у всіх 4 файлах
description: "Короткий опис для SEO"
tags: [wearos, performance]
level: beginner # beginner | intermediate | advanced
---
```

---

## 🧭 НАВІГАЦІЯ (Header)

```html
<nav
  class="site-nav"
  aria-label="{{ site.data[site.active_lang].strings.main_nav_aria }}"
>
  <div class="nav-inner">
    <!-- max-width: 1300px, backdrop-filter: blur(18px) -->
    <a href="{{ '/' | relative_url }}" class="site-nav__brand" id="site-logo"
      >ХАБ</a
    >
    <div class="site-nav__links">
      <!-- Anchor links: #studio, #webgl, #stack, #shrine -->
      <!-- Language switcher (.lang-switch) via {% for lang in site.languages %} -->
    </div>
  </div>
</nav>
```

### Back button (на Level 2 сторінках)

```html
<a href="{{ '/' | relative_url }}" class="btn-back" id="back-to-hub">
  {{ site.data[site.active_lang].strings.back_to_hub }}
</a>
```

---

## ⚡ JAVASCRIPT (`script.js` — IIFE)

| Секція | Функція                                                                   |
| ------ | ------------------------------------------------------------------------- |
| §1     | Scroll fade-in (`IntersectionObserver`, клас `.fade-in` → `.visible`)     |
| §2     | WebGL "Click to Play" overlay                                             |
| §3     | Card subtle tilt 4° на mousemove (крім `.card--studio`, `.card--contact`) |
| §4     | Bio card doodle parallax                                                  |
| §5     | Email copy to clipboard                                                   |
| §6     | View Transitions API (CSS fade + morphing)                                |

---

## 🔍 SEO

- **JSON-LD, Open Graph, Twitter Card:** Генеруються автоматично через `jekyll-seo-tag`
- **Hreflang:** `en`, `uk`, `ru`, `ko`, `x-default` (через Polyglot `{% I18n_Headers %}`)
- **Sitemap:** Генерується автоматично через `jekyll-sitemap`
- **RSS Feed:** Генерується автоматично через `jekyll-feed` → `feed.xml`
- **Google Search Console:** verification через meta тег у `head.html`
- **Cross-link:** завжди є посилання на `https://wristandpocket.github.io`
- **Custom JSON-LD:** `_layouts/education.html` має кастомний `Article` schema (виключення з правила "не писати JSON-LD вручну")

---

## ⚠️ ПРАВИЛА ДЛЯ ЗМІН

1. **НЕ** використовувати Tailwind, React, jQuery, Bootstrap
2. Зміни в `index.html` пишуться **ДЛЯ ВСІХ МОВ ОДНОЧАСНО** використовуючи `{{ site.data[site.active_lang].strings.key }}`. Ні в якому разі не копіюйте HTML файли вручну.
3. Пости у блозі пишуться набором (4 файли) з ІДЕНТИЧНИМ `permalink:`
4. Навчальні статті пишуться набором (4 файли) з ІДЕНТИЧНИМ `permalink:`
5. Grid Areas — завжди через `grid-template-areas`, ніяких `grid-auto-flow: dense`
6. WebGL — тільки через iframe + overlay, ніяких авто-завантажень
7. Зображення — `.webp` + `loading="lazy"` (крім hero)
8. Мобільна версія — `flex-direction: column` стек при `max-width: 768px`
9. **НЕ** видаляти `_plugins/polyglot_frozen_string_patch.rb` — критичний для збірки
10. **НЕ** відтворювати `assets/js/locale.js` — deprecated legacy файл, видалений з проекту
