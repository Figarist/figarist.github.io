---
layout: "post"
title: "pyScratch: как писать Scratch 3.0 проекты на Python прямо в браузере"
description: "Обзор pyScratch — бесплатной онлайн-IDE для двусторонней конвертации Python ↔ Scratch 3.0 (.sb3) с живой сценой Canvas 2D и поддержкой клонов."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "ru"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "Обзор pyScratch — бесплатного браузерного редактора, который превращает Python-код в настоящие блоки Scratch 3.0 (.sb3) и обратно."
category: "workshop"
categories:
  - "workshop"
tags:
  - "scratch"
  - "python"
  - "education"
  - "tools"
author: "ihor"
image: null
image_alt: null
focus_keyword: "Scratch на Python онлайн"
seo_title: "pyScratch: Python ↔ Scratch 3.0 (.sb3) IDE в браузере"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: false
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

Многие ученики после [занятий по Scratch](https://sivochka.com/ru/tutoring/scratch/) хотят перейти на настоящий текстовый код — [Python](https://sivochka.com/ru/tutoring/python/), но упираются в барьер: в обычном Python нет готовой сцены со спрайтами, костюмами и мгновенной визуализацией.

Чтобы сделать этот переход плавным и наглядным, я создал **[pyScratch](https://sivochka.com/pyScratch/ru/)** — бесплатную онлайн-IDE, которая работает целиком в браузере и не требует установки программ.

## Что умеет pyScratch

1. **Двусторонний компилятор и декомпилятор (`Python ↔ .sb3`)**  
   Можно перетащить любой файл `.sb3` прямо в окно браузера: pyScratch распакует проект, превратит блоки Scratch 3.0 в читаемый Python DSL, позволит редактировать логику текстом, а затем сохранить обновлённый `.sb3` обратно.
2. **Живая сцена Canvas 2D (`480×360`)**  
   Код можно запускать и проверять сразу в браузере: поддерживаются клоны (до 300 клонов с изолированными локальными переменными `self.var`), декоратор `@warp` («без обновления экрана»), слои, графические эффекты, перо и звуки из `.sb3`.
3. **Мгновенный обмен кодом и встраивание**  
   Кнопка **«Поделиться»** кодирует скрипт в короткую ссылку `?code=...`, а режим `?embed=1` позволяет встраивать примеры на учебные страницы.

## Для кого этот инструмент

- **Ученикам 9–14 лет**, которые уже уверенно делают игры в Scratch и готовы увидеть, как те же циклы, условия и клоны выглядят в Python.
- **Преподавателям и родителям**, чтобы открыть `.sb3` проект ребёнка, проверить логику в текстовом виде или дать интерактивное задание по ссылке.

Попробуйте прямо сейчас в браузере: **[Открыть pyScratch IDE ↗](https://sivochka.com/pyScratch/ru/)**

Если ребёнок хочет системно перейти от визуальных блоков к Python или Unity C#, записывайтесь на [индивидуальные занятия](https://sivochka.com/ru/tutoring/).
