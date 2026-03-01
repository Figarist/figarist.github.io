---
title: "Jekyll Collections vs Posts: Когда и что использовать"
author: ihor
tags: [jekyll, static-site, web, tutorial]
lang: ru
permalink: /education/jekyll-collections-vs-posts/
level: beginner
sort_order: 3
description: "Практическое руководство по пониманию разницы между постами и коллекциями Jekyll — и выбору правильного инструмента для вашего контента."
excerpt: "Посты хронологичны. Коллекции вечнозеленые. Вот как выбрать — и как использовать оба варианта."
---

Jekyll предоставляет два способа управления контентом: **посты (posts)** и **коллекции (collections)**. Выбор неправильного варианта создаст проблемы в будущем. Вот как об этом думать.

## Основная разница

| | Посты | Коллекции |
|---|---|---|
| Основная сортировка | По дате (по убыванию) | По имени файла / кастомному полю |
| Типичное использование | Блог, новости, влоги | Документация, туториалы, портфолио |
| Шаблон URL | `/blog/2026/02/27/title/` | `/education/title/` |
| Цикл `site.posts` | ✅ | ❌ (используйте `site.collectionname`) |

**Золотое правило:** Если единица контента будет казаться устаревшей через 6 месяцев, это пост. Если она все еще будет полезна через 3 года, это элемент коллекции.

## Определение коллекции в `_config.yml`

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

Ключ `output: true` указывает Jekyll генерировать отдельную HTML-страницу для каждого файла. Без него файлы доступны через `site.education` в Liquid, но не генерируют страницы.

## Цикл по коллекции в Liquid

```liquid
{% for item in site.education %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

Чтобы отсортировать по кастомному полю вместо имени файла:

```liquid
{% assign sorted_edu = site.education | sort: "sort_order" %}
{% for item in sorted_edu limit: 3 %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

## Когда Посты побеждают Коллекции

Используйте посты, когда вам нужно:
- Интеграция ленты RSS (jekyll-feed автоматически работает с `site.posts`)
- Страницы архива по годам/месяцам
- Пагинация через `jekyll-paginate`

Ни одна из этих функций не работает нативно с кастомными коллекциями без дополнительных плагинов или ручной работы с Liquid.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
