---
title: "Колекції Jekyll проти Постів: Коли що використовувати"
author: ihor
tags: [jekyll, static-site, web, tutorial]
lang: uk
permalink: /education/jekyll-collections-vs-posts/
level: beginner
sort_order: 3
description: "Практичний посібник для розуміння різниці між постами та колекціями Jekyll — і вибору правильного інструменту для вашого контенту."
excerpt: "Пости хронологічні. Колекції вічнозелені. Ось як вибрати — і як використовувати обидва варіанти."
---

Jekyll дає вам два способи управління контентом: **пости (posts)** та **колекції (collections)**. Вибір неправильного варіанту створить проблеми в майбутньому. Ось як про це думати.

## Основна різниця

| | Пости | Колекції |
|---|---|---|
| Основне сортування | За датою (спадання) | За ім'ям файлу / кастомним полем |
| Типове використання | Блог, новини, влоги | Документація, туторіали, портфоліо |
| Шаблон URL | `/blog/2026/02/27/title/` | `/education/title/` |
| Цикл `site.posts` | ✅ | ❌ (використовуйте `site.collectionname`) |

**Золоте правило:** Якщо одиниця контенту здаватиметься застарілою через 6 місяців, це пост. Якщо вона все ще буде корисною через 3 роки, це елемент колекції.

## Визначення колекції у `_config.yml`

```yaml
collections:
  education:
    output:    true
    permalink: /education/:title/

defaults:
  - scope:
      path: ""
      type: education
    values:
      layout: education
```

Ключ `output: true` вказує Jekyll згенерувати окрему HTML-сторінку для кожного файлу. Без нього файли доступні через `site.education` у Liquid, але не генерують сторінок.

## Цикл по колекції у Liquid

```liquid
{% for item in site.education %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

Щоб відсортувати за кастомним полем замість імені файлу:

```liquid
{% assign sorted_edu = site.education | sort: "sort_order" %}
{% for item in sorted_edu limit: 3 %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

## Коли Пости перемагають Колекції

Використовуйте пости, коли вам потрібно:
- Інтеграція стрічки RSS (jekyll-feed автоматично працює з `site.posts`)
- Сторінки архіву за роками/місяцями
- Пагінація через `jekyll-paginate`

Жодна з цих функцій не працює нативно з кастомними колекціями без додаткових плагінів або ручної роботи з Liquid.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
