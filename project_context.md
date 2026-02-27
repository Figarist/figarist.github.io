# 🗂 PROJECT CONTEXT: figarist.github.io

> Цей файл — повний контекст проекту для передачі іншому ШІ.
> Автор: Ihor (Figarist) — Indie Game Developer & CS Teacher, Харків, UA.

---

## 🔧 ТЕХНОЛОГІЧНИЙ СТЕК

- **Jekyll** (STATIC GENERATOR) + **GitHub Actions** (deployment)
- **Plugin Localization:** `jekyll-polyglot` (bilingual sync)
- **Мова шаблонів:** Liquid
- **CSS:** Pure Vanilla CSS (Grid) — NO Tailwind, NO Bootstrap
- **JS:** Vanilla JavaScript (ОБМЕЖЕНО: без фреймворків)
- **Markdown:** kramdown + rouge (підсвітка коду)
- **Шрифти:** `Outfit` (sans) + `Fira Code` (mono) з Google Fonts

---

## 📁 ФАЙЛОВА СТРУКТУРА

```
figarist.github.io/
│
├── .github/
│   └── workflows/
│       └── jekyll.yml      # GitHub Actions CI/CD для збірки Polyglot
├── _config.yml             # Jekyll конфіг (title, url, plugins, languages)
├── index.html              # Bento Hub (Мультимовний)
├── styles.css              # Головний CSS файл (~1679 рядків)
├── script.js               # Головний JS (scroll anim, WebGL overlay)
├── robots.txt
├── sitemap.xml
│
├── _includes/
│   ├── head.html           # <head> + SEO мета + JSON-LD (Hreflang via Polyglot). Підтримує localized titles через `title_key`.
│   ├── header.html         # Floating navbar з білінгвальними посиланнями
│   └── footer.html         # Мінімальний футер з роком
│
├── _layouts/
│   ├── default.html        # Базовий лейаут (head → header → main → footer → script.js)
│   └── post.html           # Лейаут посту (extends default)
│
├── _posts/                 # Блог-пости (Markdown + YAML front matter)
│   ├── 2026-02-27-what-is-a-file-en.md
│   └── 2026-02-27-unity-charge-mechanic-en.md  # Нові типи постів
│
├── blog/
│   └── index.html          # Мультимовний список постів
│
├── education/
│   └── index.html          # Колекція навчальних матеріалів
│
├── collection/
│   └── index.html          # Мультимовна сторінка колекції ігор
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
    "bio          bio          stack"
    "studio       studio       shrine"
    "webgl        webgl        shrine"
    "feed-vr      feed-vr      feed-gamedev"
    "feed-vr      feed-vr      feed-gamedev"
    "feed-personal feed-edu   python"
    "teach        contact      contact";
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
| `feed-vr` | `#feed-vr` | `.card--feed-vr` |
| `feed-gamedev` | `#feed-gamedev` | `.card--feed-gamedev` |
| `feed-personal` | `#feed-personal` | `.card--feed-personal` |
| `feed-edu` | `#feed-edu` | `.card--feed-edu` |
| `python` | `#python` | `.card--python` |
| `teach` | `#teaching` | `.card--teaching` |
| `contact` | `#contact` | `.card--contact` |

### Responsive Breakpoints
- **Tablet (≤1024px):** зменшені відступи, 2-колоночний grid або інший перерозподіл areas
- **Mobile (≤768px):** `flex-direction: column`, усі картки у стек

---

## 🌐 БІЛІНГВАЛЬНА СИСТЕМА (Jekyll-Polyglot)

### Архітектура
Увесь сайт управляється плагіном `jekyll-polyglot`. `_config.yml` настроєно на 4 мови (`en`, `uk`, `ru`, `ko`) з `default_lang: en`.
Jekyll збирає сайт **ЧОТИРИ РАЗИ**, ігноруючи JS-милиці, автоматично створюючи `/uk/`, `/ru/` та `/ko/` директорії на основі `site.active_lang`.

### Написання Мультимовного Коду
Оскільки `index.html` збирається 4 рази, переклад виконується через глобальні словники `_data/[lang]/strings.yml`, щоб не роздувати DOM:
```html
<h2>{{ site.data[site.active_lang].strings.my_projects }}</h2>
```
**ЗАБОРОНЕНО:** Використовувати `liquid-hide`, inline `{% if site.active_lang %}` (якщо тексту багато), чи JavaScript класи `display: none`.

### Блог (`_posts/`)
Всі пости пишуться НАБОРОМ (4 файли окремо для EN, UK, RU, KO). У них обов'язково повинні співпадати:
- `permalink:` (ідентичні у всіх 4 файлах)
А відрізнятися має:
- `lang: en` (або `uk`, `ru`, `ko`) у Front Matter.
Polyglot автоматично зшиває їх через `<link rel="alternate">` використовуючи збіг `permalink`.

### Перемикач мов (`href` Escape Trap)
Polyglot має агресивний regex-парсинг. Якщо створювати `href="/"` перемикач, він його насильно змінить на `href="/uk/"`. Щоб цього уникнути у SEO-тегах (`hreflang`) та кнопках "EN / UK", ми використовуємо блок-тег `{% static_href %}`:
```html
<a {% static_href %}href="/путь/"{% endstatic_href %}>EN</a>
```

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
- Виводить пости через `site.posts | where: "lang", site.active_lang`

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
lang: uk          # або en, ru, ko
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
- **Hreflang:** `en`, `uk`, `ru`, `ko`, `x-default`
- **Open Graph + Twitter Card**
- **Google Search Console:** verification через meta тег
- **Cross-link:** завжди є посилання на `https://wristandpocket.github.io`

---

## ⚠️ ПРАВИЛА ДЛЯ ЗМІН

1. **НЕ** використовувати Tailwind, React, jQuery, Bootstrap
2. Зміни в `index.html` пишуться **ДЛЯ ВСІХ МОВ ОДНОЧАСНО** використовуючи `{{ site.data[site.active_lang].strings.key }}`. Ні в якому разі не копіюйте HTML файли вручну.
3. Пости у блозі пишуться набором (4 файли) з ІДЕНТИЧНИМ `permalink:`.
4. Grid Areas — завжди через `grid-template-areas`, ніяких `grid-auto-flow: dense`
5. WebGL — тільки через iframe + overlay, ніяких авто-завантажень
6. Зображення — `.webp` + `loading="lazy"` (крім hero)
7. Мобільна версія — `flex-direction: column` стек при `max-width: 768px`
