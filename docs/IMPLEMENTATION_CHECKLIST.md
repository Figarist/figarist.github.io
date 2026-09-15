# Чекліст впровадження UX/CRO оптимізацій

Базується на: UX_CRO_DEEP_ANALYSIS.md, TUTORING_REARRANGEMENT_PLAN.md,
VERIFICATION_REPORT_2026-09-15.md. Перевірено 15.09.2026.

---

## Фаза 0: Швидкі результати без зміни дизайну (1–2 дні)

- [ ] **P0-1. Переставити секції в _layouts/tutoring.html**
  Поточний порядок (рядки 106–143):
    Trust → Conditions → Cases → Profile → Testimonials
  Цільовий порядок:
    Trust → Cases → Profile → Testimonials → Conditions
  Що робити: перемістити рядки 141–143 (три include) на позицію
  перед рядком 115 (секція conditions).
  Файл: _layouts/tutoring.html
  Ефект: батьки бачать реальні кейси, профіль і відгуки ДО бюрократії.

- [ ] **P0-2. Додати Trust Strip під Hero**
  Новий HTML-елемент між рядками 29 і 30 у _layouts/tutoring.html:
  компактна плашка з 4 бейджами (★ 5.0 на BUKI, Магістр педагогіки,
  Unity Certified Developer, 7+ років викладання).
  Текст — із TUTORING_REARRANGEMENT_PLAN.md (Блок 1).
  Стилізація — у _sass/_tutoring.scss (новий клас .tutoring-trust-strip).
  Файли: _layouts/tutoring.html, _sass/_tutoring.scss
  Ефект: миттєво легітимізує ціну 1000 грн/год.

- [ ] **P0-3. Мікрокопія під CTA кнопкою**
  Додати під кнопку «Обговорити заняття в Telegram» видимий рядок:
  «🔒 Без зобов'язань. Напишіть вік дитини та чим вона
  захоплюється — я підкажу, з чого краще почати.»
  Файл: _layouts/tutoring.html (рядки 30–33 у Hero) або
  _includes/tutoring-contact.html (якщо потрібно глобально).
  Ефект: знімає страх першого повідомлення.

---

## Фаза 1: Контентні збагачення (1 тиждень)

- [ ] **P1-1. Вікова сегментація в курсах**
  Додати рекомендований вік до кожного course у _data/[lang]/tutoring.json:
    - Scratch: 6–8 років
    - Minecraft: 8–11 років
    - Python: 9–14 років
    - Unity: 10–16+ років
    - Інформатика: шкільний вік
  Також оновити FAQ-відповідь «Від 6 років» на диференційовану
  (Scratch 6+, Unity 10+).
  Файли: _data/uk/tutoring.json, _data/en/tutoring.json,
  _data/ru/tutoring.json, _data/ko/tutoring.json
  Ефект: демонструє глибину експертизи, знімає сумнів «Unity з 6 років?»

- [ ] **P1-2. Статичні топ-3 відгуки замість каруселі**
  Варіант A (мінімальний): залишити карусель, але показати 3 слайди одразу
  на десктопі (CSS grid у review-track, flex-wrap).
  Варіант B (рекомендований): переписати tutoring-testimonials.html —
  вивести Yevgen, Анжела, Надія як окремі review-card статично,
  решту ховати за «Читати всі 18 відгуків на BUKI ↗».
  Готовий HTML — у TUTORING_REARRANGEMENT_PLAN.md (Блок 3).
  Файли: _includes/tutoring-testimonials.html, _sass/_tutoring.scss
  Ефект: +80% видимості соціальних доказів за даними CXL/NNGroup.

- [ ] **P1-3. Заповнити 2–3 учнівські кейси**
  Створити файли в _data/tutoring/cases/ із реальними проєктами.
  Мінімально потрібно: cover.webp, student_name, age, direction, goal,
  starting_level, skills, evidence. Шаблон tutoring-cases.html готовий.
  Файли: _data/tutoring/cases/[case-name].yml,
  assets/images/tutoring/cases/[screenshot].webp
  Ефект: знімає головний сумнів «Чи зможе моя дитина?»

- [ ] **P1-4. Згорнути умови в компактну форму**
  Секцію conditions-extra (dl) оформити через CSS як компактний
  акордеон або 2-колонкову сітку замість вертикального списку.
  Файл: _sass/_tutoring.scss
  Ефект: умови займають менше екранного простору.

---

## Фаза 2: Зовнішня маршрутизація та трафік

- [ ] **P2-1. Оновити зовнішні посилання**
  У профілях на BUKI, Асоціації репетиторів, соцмережах, підписах
  email — вказувати sivochka.com/uk/tutoring/ замість sivochka.com.
  Для Unity-специфічних оголошень: sivochka.com/uk/tutoring/unity/.

- [ ] **P2-2. Оцінити сторінку /education/**
  Зараз показує заглушку «Туторіали вже на підході».
  Варіанти:
  A) Наповнити реальним контентом (довгостроково).
  B) Приховати з навігації до наповнення.
  C) Редірект на /blog/ як тимчасове рішення.
  Рішення — за автором.

- [ ] **P2-3. Подати URL в Search Console**
  Після деплою змін: запросити індексацію для
  /uk/tutoring/, /uk/tutoring/unity/, /uk/tutoring/python/.
  Верифікувати sitemap.xml у Search Console.

---

## Фаза 3: Відкладене (потребує матеріалу від автора)

- [ ] **P3-1. Фото автора**
  WebP, описовий alt-text на 4 мовах. Не блокує релізу.
  Файл: _data/tutoring/profile.yml (portrait.path)

- [ ] **P3-2. Більше учнівських кейсів**
  Після перших 2–3 — збирати портфоліо з кожним новим учнем
  (із дозволу батьків).

- [ ] **P3-3. Відеовідгуки або відео-кейси**
  Короткі 30-секундні кліпи процесу навчання (за наявності).

---

## Технічна карта файлів

| Фаза | Файл | Що змінюється |
| :--- | :--- | :--- |
| P0 | _layouts/tutoring.html | Порядок include, Trust Strip, мікрокопія |
| P0 | _sass/_tutoring.scss | Стилі Trust Strip |
| P1 | _data/[lang]/tutoring.json × 4 | Вікові мітки курсів, FAQ-тексти |
| P1 | _includes/tutoring-testimonials.html | Статичні картки vs карусель |
| P1 | _data/tutoring/cases/*.yml | Нові файли кейсів |
| P1 | assets/images/tutoring/cases/*.webp | Скріншоти учнівських робіт |
| P1 | _sass/_tutoring.scss | Стилі review-card, conditions compact |
| P2 | Зовнішні профілі (не в репо) | URL-маршрутизація |
| P3 | _data/tutoring/profile.yml | Фото автора |

---

## Критерії готовності

Перед кожним деплоєм:
1. `bundle exec jekyll build` — чистий білд без помилок.
2. `ruby scripts/verify_live_site.rb` — структурні перевірки.
3. `ruby scripts/audit_links.rb` — link integrity.
4. Візуальна перевірка /uk/tutoring/ на 360px і 1300px.
5. git diff --check — без trailing whitespace.
