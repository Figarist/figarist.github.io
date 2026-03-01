> Цей файл — ПОВНИЙ КВАНТОВИЙ КОНТЕКСТ проекту для передачі іншому ШІ.
> Автор: Ihor Sivochka — Indie Game Developer, Зміїв, UA.

---

## 🏗️ СИСТЕМНА АРХІТЕКТУРА (EXTREME)

```mermaid
graph TD
    subgraph Source
        H[index.html Hub]
        P[_posts/*.md x4]
        E[_education/*.md x4]
        D[_data/*.yml]
        S[_sass/*.scss]
    end

    subgraph Engines
        Poly[jekyll-polyglot]
        Space[jekyll-spaceship]
        Min[jekyll-minifier]
    end

    subgraph Build
        DirEN[/]
        DirUK[/uk/]
        DirRU[/ru/]
        DirKO[/ko/]
    end

    H & P & E & D --> Poly
    Poly --> Space
    Space --> Min
    Min --> DirEN & DirUK & DirRU & DirKO
```

---

## 🔧 ТЕХНОЛОГІЧНИЙ ЯДРО: "ZERO-BLOAT"

- **Jekyll 4.4:** Основа SSG.
- **Polyglot Sync:** Квадрилінгвальна збірка (EN, UK, RU, KO).
- **PWA (Workbox):** Офлайн-перший підхід для швидкого завантаження.
- **Spaceship Engine:** Mermaid, MathJax, Технічні таблиці.
- **Performance Budget:** JS < 20KB, CSS < 30KB. Жорсткі ліміти.
- **GoatCounter:** Privacy-first analytics (Zero-cookies).
- **Hub Design:** Grid-native UI with Liquid Glass aesthetics.
- **WebP First:** All images must be compressed and converted via `jekyll-webp`.

---

## 🤖 AI-TO-AI HANDOFF PROTOCOL

Щоб максимально швидко увійти в проект, наступний ШІ повинен:

1. **Read `gemini3rules.md`:** Це "Конституція". Не порушуй її.
2. **Check `task.md`:** Поточний статус та незавершені задачі.
3. **Verify `strings.yml`:** Перед додаванням UI-елементів перевір наявність ключів у всіх 4 словниках.
4. **Liquid Glass Consistency:** Будь-який новий плаваючий елемент має відповідати стилю Header/Footer.

---

## 📝 EXTREME IMPLEMENTATION PATTERNS

### Case: Adding Interactive Logic

- **Do:** Додавай у `script.js` всередині IIFE. Використовуй `IntersectionObserver` для анімацій.
- **Don't:** Не створюй `onclick=""` атрибути. Тільки `addEventListener`.

### Case: Hub Layout Modification

- **Method:** Тільки через `grid-template-areas` у `_sass/_grid.scss`.

```css
.hub-grid {
  grid-template-areas: "bio bio stack" ...;
}
```

- **Constraint:** Area name має збігатися з ID елемента в HTML.

---

## ⚡ STRUCTURE & ASSETS

- **Modular SCSS:** `_sass/_variables.scss` → `_sass/_base.scss` → `_sass/_components.scss` → `_sass/_footer.scss`.
- **Media Strategy:** Тільки WebP. Lazy-loading для 90% контенту.
- **JS Layout:**
  - §1-3: UI/Interactivity (Scroll, Tilt, WebGL).
  - §4-7: Site Utilities (Search, Copy, Progress).
  - §8-11: App Core (Transitions, PWA, Spaceship).

---

## ⚠️ EXTREME CONSTRAINTS

1. **DRY 100%:** Жодного дубляжу HTML. Тільки Liquid + Dictionaries.
2. **Hub Parity:** `index.html` — це єдине джерело структури головної сторінки.
3. **Asset Integrity:** Не видаляти `_plugins/polyglot_frozen_string_patch.rb`.
4. **Authorship:** Завжди `author: ihor`.
5. **Zero Frameworks:** Тільки Vanilla JS та Pure CSS.

---

_Every line of code is a design decision. Keep it lean._
