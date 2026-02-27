# 🗂 PROJECT CONTEXT: figarist.github.io

> Цей файл — повний контекст проекту для передачі іншому ШІ.
> Автор: Ihor (Figarist) — Indie Game Developer & CS Teacher, Харків, UA.

---

## 🔧 ТЕХНОЛОГІЧНИЙ СТЕК

- **Jekyll** (статичний генератор) + **GitHub Pages**
- **Мова шаблонів:** Liquid
- **CSS:** Pure Vanilla CSS (Grid, Flexbox, CSS Variables) — NO Tailwind, NO Bootstrap
- **JS:** Vanilla JavaScript (IIFE pattern, без фреймворків)
- **Markdown:** kramdown + rouge (підсвітка коду)
- **Шрифти:** `Outfit` (sans) + `Fira Code` (mono) з Google Fonts
- **Плагіни Jekyll:** `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`

---

## 📁 ФАЙЛОВА СТРУКТУРА

```
figarist.github.io/
│
├── _config.yml             # Jekyll конфіг (title, url, plugins, permalink, defaults)
├── index.html              # Головна сторінка EN (Bento Grid)
├── styles.css              # Головний CSS файл (~1679 рядків)
├── script.js               # Головний JS (scroll anim, WebGL overlay, tilt, parallax, email copy)
├── robots.txt
├── sitemap.xml
│
├── _includes/
│   ├── head.html           # <head> + SEO мета + JSON-LD + антифлікер скрипт + шрифти
│   ├── header.html         # Floating navbar з білінгвальними посиланнями
│   └── footer.html         # Мінімальний футер з роком
│
├── _layouts/
│   ├── default.html        # Базовий лейаут (head → header → main → footer → script.js)
│   └── post.html           # Лейаут посту (extends default, + btn-back, h1, time, tags, JSON-LD)
│
├── _posts/                 # Блог-пости (Markdown + YAML front matter)
│   ├── 2026-02-26-kharkiv-cats-unity.md
│   ├── 2026-02-26-minecraft-python.md
│   └── 2026-02-27-what-is-a-file.md
│
├── assets/
│   └── js/
│       └── locale.js       # Мовний перемикач (localStorage + data-i18n CSS класи)
│
├── blog/
│   └── index.html          # EN список постів
│
├── collection/
│   └── index.html          # EN сторінка колекції ігор
│
└── uk/                     # Українська мовна гілка
    ├── index.html          # Головна UA (копія EN Bento Grid + lang: uk)
    ├── blog/
    │   └── index.html      # UA список постів
    └── collection/
        └── index.html      # UA сторінка колекції
```

---

## 🎨 ДИЗАЙН-СИСТЕМА (Bento UI)

### CSS Змінні (`:root`)
```css
--bento-gap: 20px;
--card-radius: 20px;
--card-padding: 24px;

/* Cloud Dancer Palette (Pantone 2026) */
--bg-color: #f2f0eb;        /* Фон сторінки */
--card-bg: #ffffff;          /* Білі картки */
--card-bg-warm: #faf8f4;    /* Тепло-білий варіант */

/* Акценти */
--accent-blue: #a2c2e1;
--accent-blue-d: #6e9fc7;
--accent-pink: #f5c2cc;
--accent-pink-d: #d97f93;
--accent-green: #b5e853;    /* wasabi — teaching */
--accent-plum: #6b3fa0;     /* shrine */
--accent-persimmon: #e8603c;
--accent-yellow: #f7e04a;
--accent-cyan: #4ecdc4;

/* Текст */
--text-primary: #1a1a2e;
--text-secondary: #4a4a6a;
--text-muted: #8888a8;
--text-on-dark: #f2f0eb;

/* Тіні */
--shadow-card: 0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
--shadow-hover: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);

/* Шрифти */
--font-sans: 'Outfit', system-ui, sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace;
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
    "bio    bio    stack"
    "studio studio shrine"
    "webgl  webgl  shrine"
    "blog   blog   python"
    "teach  contact contact";
}
```

### Grid Area → HTML ID mapping
| `grid-area` | HTML `id` | Клас картки |
|---|---|---|
| `bio` | `#bio` | `.card--bio` |
| `studio` | `#studio` | `.card--studio` |
| `webgl` | `#webgl` | `.card--webgl` |
| `stack` | `#stack` | `.card--stack` |
| `shrine` | `#shrine` | `.card--shrine` |
| `teach` | `#teaching` | `.card--teaching` |
| `python` | `#python` | `.card--python` |
| `blog` | `#blog` | `.card--blog` |
| `contact` | `#contact` | `.card--contact` |

### Responsive Breakpoints
- **Tablet (≤1024px):** зменшені відступи, 2-колоночний grid або інший перерозподіл areas
- **Mobile (≤768px):** `flex-direction: column`, усі картки у стек

---

## 🌐 БІЛІНГВАЛЬНА СИСТЕМА (EN / UK)

### Архітектура
- **EN Hub:** [index.html](file:///d:/GitHub/figarist.github.io/index.html) (root) → `lang` не вказаний (дефолт `en`)
- **UK Hub:** [uk/index.html](file:///d:/GitHub/figarist.github.io/uk/index.html) → `lang: uk` у YAML front matter
- **Blog posts:** одна версія, `lang: uk` або `lang: en` у front matter

### Антифлікер (в [_includes/head.html](file:///d:/GitHub/figarist.github.io/_includes/head.html))
```html
<script>
  (function () {
    var storedLang = localStorage.getItem('figarist_ui_lang');
    var path = window.location.pathname;
    if (path === '/' || path === '/blog/') { storedLang = 'en'; }
    else if (path === '/uk/' || path === '/uk/blog/') { storedLang = 'uk'; }
    var pref = storedLang || '{{ page.lang | default: "uk" }}';
    document.documentElement.classList.add('lang-' + pref);
  })();
</script>
```
Додає `lang-en` або `lang-uk` клас до `<html>` **до рендеру CSS**.

### CSS Hiding Pattern
```css
/* В styles.css */
html.lang-en [data-i18n-uk] { display: none; }
html.lang-uk [data-i18n-en] { display: none; }
.liquid-hide { display: none; }
```

### HTML Pattern для двомовних елементів
```html
<span data-i18n-en class="{% if page.lang=='uk' %}liquid-hide{% endif %}">Studio</span>
<span data-i18n-uk class="{% if page.lang=='en' %}liquid-hide{% endif %}">Студія</span>
```
- Liquid `liquid-hide` = fallback без JS
- `data-i18n-en` / `data-i18n-uk` = CSS-керована видимість через `lang-*` клас на `<html>`

### Навігація між мовами
- **На Хабах (index):** навігаційні посилання переводять на `/uk/` або `/`
- **На Постах:** `.js-lang-toggle` — перемикає мову без перезавантаження через `locale.js`

### `assets/js/locale.js`
- Читає `localStorage.getItem('figarist_ui_lang')`
- Перемикає `lang-en` / `lang-uk` клас на `<html>`
- Оновлює href у `#back-to-hub` та `#site-logo`

---

## 🧩 КОМПОНЕНТИ (по картках)

### `.card--bio` (`#bio`)
- Градієнтний фон (`#fff → #f0ecff`)
- Avatar (`<img>` 72×72px, border-radius: 50%)
- Doodle accents: `.doodle--star`, `.doodle--bracket`, `.doodle--heart`, `.doodle--watch`
- Parallax на mousemove (script.js §4)

### `.card--studio` (`#studio`)
- Темний фон (`#0f0e17`), текст на темному
- 2 watch mockups: `.watch-game--racer` (CSS анімація авто) + `.watch-game--puzzle` (CSS grid)
- Клік → перехід на `https://wristandpocket.github.io`
- **НЕ** включений у card tilt

### `.card--webgl` (`#webgl`)
- "Click to Play" overlay (`#webgl-overlay`)
- iframe (`#webgl-iframe`) — lazy load, стає активним після кліку
- Status indicator (`#webgl-status`)
- Логіка в script.js §2

### `.card--stack` (`#stack`)
- Blueprint-grid pattern (CSS background-image)
- 2×2 grid іконок технологій (`.stack__icons`)

### `.card--shrine` (`#shrine`)
- Плавно займає 2 рядки вертикально
- Базові кольори: `--accent-plum` + `--accent-persimmon`

### `.card--teaching` (`#teaching`)
- Акцент: `--accent-green` (wasabi)

### `.card--blog` (`#blog`)
- Виводить `site.posts` через Liquid loop
- Посилання ведуть на `/blog/YYYY/MM/DD/slug/`

### `.card--contact` (`#contact`)
- Email через `mailto:` + JS copy-to-clipboard (script.js §5)
- **НЕ** включений у card tilt

---

## 📝 BLOG POSTS FRONT MATTER

```yaml
---
layout: post
title: "Назва посту"
date: 2026-02-26
lang: uk          # або en
tags: [unity, gamedev]
description: "Короткий опис для SEO"
---
```

### Permalink pattern
```yaml
# _config.yml
permalink: /blog/:year/:month/:day/:title/
```

---

## 🧭 НАВІГАЦІЯ (Header)

```html
<nav class="site-nav">  <!-- Fixed, backdrop-filter: blur(18px) -->
  <div class="nav-inner">  <!-- max-width: 1300px -->
    <a class="site-nav__brand" id="site-logo">Figarist</a>
    <div class="site-nav__links">
      <!-- Anchor links: #studio, #webgl, #stack, #shrine -->
      <!-- Language switcher (.lang-switch) -->
    </div>
  </div>
</nav>
```

### Back button (на Level 2 сторінках)
```html
<a href="/" class="btn-back" id="back-to-hub">← Back to Hub</a>
```

---

## ⚡ JAVASCRIPT (script.js — IIFE)

| Секція | Функція |
|---|---|
| §1 | Scroll fade-in (`IntersectionObserver`, клас `.fade-in` → `.visible`) |
| §2 | WebGL "Click to Play" overlay |
| §3 | Card subtle tilt 4° на mousemove (крім `.card--studio`, `.card--contact`) |
| §4 | Bio card doodle parallax |
| §5 | Email copy to clipboard |

---

## 🔍 SEO

- **JSON-LD:** `Person` + `WebSite` в `head.html`, `BlogPosting` в `post.html`
- **Hreflang:** `en`, `uk`, `x-default`
- **Open Graph + Twitter Card**
- **Google Search Console:** verification через meta тег
- **Cross-link:** завжди є посилання на `https://wristandpocket.github.io`

---

## ⚠️ ПРАВИЛА ДЛЯ ЗМІН

1. **НЕ** використовувати Tailwind, React, jQuery, Bootstrap
2. Зміни в `index.html` (EN) **вручну дублювати** в `uk/index.html`
3. `_includes/` — DRY шаблони, не дублювати
4. Grid Areas — завжди через `grid-template-areas`, ніяких `grid-auto-flow: dense`
5. WebGL — тільки через iframe + overlay, ніяких авто-завантажень
6. Зображення — `.webp` + `loading="lazy"` (крім hero)
7. Мобільна версія — `flex-direction: column` стек при `max-width: 768px`
