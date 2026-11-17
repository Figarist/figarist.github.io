---
layout: "post"
title: "pyScratch: як писати Scratch 3.0 проєкти на Python прямо у браузері"
description: "Огляд pyScratch — безкоштовної онлайн IDE для двосторонньої конвертації Python ↔ Scratch 3.0 (.sb3) із живою сценою Canvas 2D та підтримкою клонів."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "uk"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "Огляд pyScratch — безкоштовного браузерного редактора, що перетворює Python-код на справжні блоки Scratch 3.0 (.sb3) і навпаки."
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
seo_title: "pyScratch: Python ↔ Scratch 3.0 (.sb3) IDE у браузері"
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
published: false
fmContentType: "Post"
---

Багато учнів після [занять зі Scratch](/tutoring/scratch/) хочуть перейти на справжній текстовий код — [Python](/tutoring/python/), але стикаються з бар'єром: у звичайному Python немає готової сцени зі спрайтами, костюмами та миттєвою візуалізацією.

Щоб зробити цей перехід плавним і наочним, я створив **[pyScratch](https://sivochka.com/pyScratch/)** — безкоштовну онлайн-IDE, яка працює повністю у браузері без встановлення програм.

## Що вміє pyScratch

1. **Двосторонній компілятор та декомпілятор (`Python ↔ .sb3`)**  
   Ви можете перетягнути будь-який файл `.sb3` прямо у вікно браузера — pyScratch розпакує проєкт, перетворить блоки Scratch 3.0 на чистий Python DSL і дозволить редагувати логіку текстом, а потім зберегти оновлений `.sb3` назад.
2. **Жива сцена Canvas 2D (`480×360`)**  
   Код можна запускати і тестувати миттєво в браузері: підтримуються клони (до 300 клонів з ізольованими локальними змінними `self.var`), декоратор `@warp` («без оновлення екрана»), шари, графічні ефекти, олівець і звуки з `.sb3`.
3. **Миттєвий обмін кодом та вбудовування**  
   Кнопка **«Поділитися»** кодує скрипт у коротке посилання `?code=...`, а режим `?embed=1` дозволяє вбудовувати приклади на навчальні сторінки.

## Для кого цей інструмент

- **Учням 9–14 років**, які вже впевнено будують ігри у Scratch і готові бачити, як ті самі цикли, умови та клони виглядають у Python.
- **Викладачам та батькам**, щоб відкрити `.sb3` проєкт дитини, перевірити логіку в текстовому вигляді або дати інтерактивне завдання за посиланням.

Спробуйте прямо зараз у браузері: **[Відкрити pyScratch IDE ↗](https://sivochka.com/pyScratch/)**

Якщо дитина хоче системно перейти від візуальних блоків до Python або Unity C#, записуйтеся на [індивідуальні заняття](/tutoring/).
