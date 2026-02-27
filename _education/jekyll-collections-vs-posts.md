---
title: "Jekyll Collections vs Posts: When to Use Each"
author: "Ihor (Figarist)"
tags: [jekyll, static-site, web, tutorial]
lang: en
level: beginner
sort_order: 3
description: "A practical guide to understanding the difference between Jekyll posts and collections — and choosing the right one for your content."
excerpt: "Posts are chronological. Collections are evergreen. Here's how to choose — and how to use both."
---

Jekyll gives you two ways to manage content: **posts** and **collections**. Choosing the wrong one creates pain later. Here's how to think about it.

## The Core Difference

| | Posts | Collections |
|---|---|---|
| Primary sort | Date (descending) | Filename / custom field |
| Typical use | Blog, news, vlogs | Docs, tutorials, portfolio |
| URL pattern | `/blog/2026/02/27/title/` | `/education/title/` |
| `site.posts` loop | ✅ | ❌ (use `site.collectionname`) |

**Rule of thumb:** If the piece of content will feel stale in 6 months, it's a post. If it's still useful in 3 years, it's a collection item.

## Defining a Collection in `_config.yml`

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

The `output: true` key tells Jekyll to generate a standalone HTML page for each file. Without it, files are accessible via `site.education` in Liquid but generate no pages.

## Looping Over a Collection in Liquid

```liquid
{% for item in site.education %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

To sort by a custom field instead of filename:

```liquid
{% assign sorted_edu = site.education | sort: "sort_order" %}
{% for item in sorted_edu limit: 3 %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

## When Posts Beat Collections

Use posts when you need:
- RSS feed integration (jekyll-feed works on `site.posts` automatically)
- Archive pages by year/month
- Pagination via `jekyll-paginate`

None of these work natively with custom collections without extra plugins or manual Liquid work.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
