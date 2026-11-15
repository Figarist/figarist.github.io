---
layout: "post"
title: "LEGO WeDo 2.0 Catalog: 597 Robotics Building Instructions in a Fast PWA"
description: "Architecture and pedagogical design of our free non-commercial LEGO WeDo 2.0 catalog: 597 building instructions across 26 categories, Classroom Roulette, progress badges, and offline PWA shell."
last_modified_at: null
date: "2026-11-15 11:00:00 +0200"
lang: "en"
page_id: "lego-wedo-2-0-instructions-catalog"
permalink: "/blog/lego-wedo-2-0-instructions-catalog/"
excerpt: "How we organized 597 LEGO WeDo 2.0 robotics building instructions into an offline-ready, zero-dependency Friendly Arcade web catalog for teachers and STEM clubs."
category: "workshop"
categories:
  - "workshop"
tags:
  - "robotics"
  - "lego-wedo"
  - "education"
  - "tools"
author: "ihor"
image: null
image_alt: null
focus_keyword: "lego wedo 2.0 building instructions"
seo_title: "LEGO WeDo 2.0 Catalog: 597 Free Robotics Building Instructions"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: true
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

When teaching robotics to elementary and middle school students with the **LEGO Education WeDo 2.0 (45300)** kit, teachers lose precious lesson minutes hunting through scattered PDF folders, broken Google Drive bookmarks, and unindexed ZIP archives. Meanwhile, young builders simply want to glance at clear robot thumbnails and immediately start constructing dinosaurs, cranes, space rovers, or walking mechanisms.

To make lesson prep effortless for teachers and exciting for students, we built the [LEGO WeDo 2.0 Building Instructions Catalog](https://sivochka.com/lego-catalog/) — a free, non-commercial educational archive uniting **597 building plans across 26 thematic categories** inside a fast, zero-dependency web application.

---

### Designed for Real Classrooms (26 Categories, 597 Models)

Rather than forcing teachers to paginate through clunky spreadsheets, [the catalog](https://sivochka.com/lego-catalog/) structures every model in `data_localized.js` with pre-indexed metadata across 26 categories:
* **Core Classroom Foundations**: Official LEGO WeDo 2.0 plans, Basic Mechanisms (`Механізми`), Robotics (`Роботи`), and Non-SmartHub Mechanical Builds (`Моделі без смартхаба`) for introductory mechanical intuition.
* **Student-Favorite Themes**: Animals (`Тварини`), Dinosaurs (`Динозаври`), Insects (`Комахи`), Birds (`Птахи`), Space Exploration (`Космос`), Vehicles & Special Machinery (`Автомобілі`, `Спецтехніка`), Walking Robots (`Крокуючі`), and Drawing Bots (`Моделі, що малюють`).
* **Four Instant UI Languages**: Switch seamlessly between **Ukrainian (`UK`)**, **English (`EN`)**, **Russian (`RU`)**, and **Polish (`PL`)** without page reloads or external i18n bundles.

---

### Engineering Highlights: Vanilla Web + Friendly Arcade UI

* **Zero Dependencies & Instant O(1) Search**: Built in pure Vanilla JavaScript (`app.js`, `store.js`, `translations.js`, `roulette.js`) with a pre-computed search index and debounced input (`300 ms`) so even older classroom tablets render smoothly at 60 fps.
* **Classroom Instructions Roulette**: When a student cannot decide what to build next, the animated **Instructions Roulette** picks a surprise robot across active filters—turning project selection into a mini-game.
* **Built Tracker, Star Ratings & Data Healing (`LocalStorage`)**: Clicking **«I built this! ✅»** (`Я це зібрав!`) tracks student progress, unlocks achievement badges, and automatically runs `LegoStore.healData()` on load so legacy instruction paths migrate cleanly without losing progress.
* **WCAG AAA Contrast & Accessibility**: Styled with our open [Friendly Arcade](https://github.com/Figarist/friendly-arcade) design token system—paired high-contrast foreground tokens (`--on-green`, `--on-yellow`), `>= 44 px` touch targets on touch screens, clear `3px` cyan keyboard `:focus-visible` rings, and `@media (prefers-reduced-motion: reduce)` compliance.
* **Offline App Shell + Fair Play Privacy**: A Stale-While-Revalidate Service Worker (`sw.js`) caches the app shell (`HTML`, `CSS`, `JS`, UI mascot artwork) for classrooms with shaky Wi-Fi while deliberately **never** caching external Google Drive PDFs. All trademarks follow our explicit [Legal & LEGO® Fair Play Policy](https://sivochka.com/lego-catalog/legal.html).

Explore the full catalog directly in your browser:  
👉 **[Open LEGO WeDo 2.0 Instructions Catalog (597 Models)](https://sivochka.com/lego-catalog/)**

Explore our other free tools for classrooms and indie game creators:
* **[3D Club Studio — Procedural Support-Free 3D Generator for School Printers](https://sivochka.com/3d-club-studio/)**
* **[Quiet Class — Adaptive Web Audio DSP Classroom Noise Meter](https://sivochka.com/bouncy/)**
* **[OGCruncher — Free Online Audio Bit-Crusher & Game SFX Optimizer](https://sivochka.com/OGCruncher/)**

Looking for 1-on-1 online mentorship in programming (Unity, C#, Python, Scratch) or 3D modeling?  
👉 **[Explore 1-on-1 Tutoring & Mentorship with Sivochka Ihor](https://sivochka.com/tutoring/)**
