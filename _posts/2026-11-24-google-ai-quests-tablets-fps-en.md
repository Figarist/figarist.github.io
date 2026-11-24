---
layout: "post"
title: "Google AI Quests on Tablets: 2–10 FPS Slideshow Test"
description: "I tested Google AI Quests on school tablets and a laptop: 2–10 FPS rendering, 1024x600 minimum screen, clean UI, and reliable progress saving."
last_modified_at: null
date: "2026-11-24 15:00:00 +0200"
lang: "en"
page_id: "google-ai-quests-tablets-fps"
permalink: "/blog/google-ai-quests-tablets-fps/"
excerpt: "I ran Google AI Quests on school tablets and an everyday laptop in grades 4 to 7. The UI and progress saving work well, but rendering stuck at 2 to 10 FPS."
category: "education"
categories:
  - "education"
tags:
  - "education"
  - "ai"
  - "tools"
  - "informatics"
author: "ihor"
image: "/assets/images/blog/google-ai-quests-tablets-fps/tablets/01.webp"
image_alt: "Google AI Quests performance test on school tablets"
focus_keyword: "Google AI Quests on tablets"
seo_title: "Google AI Quests on Tablets: 2–10 FPS Classroom Test"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: false
hidden: null
redirect_from: null
photo_alts:
  tablets:
    "01": "A student holds a school tablet showing the forest scene of the flood quest"
    "02": "Professor Skye shows 90% model forecast accuracy on a tablet"
    "03": "The Clean the data screen with a rainfall table in Google AI Quests on a tablet"
    "04": "A quest character thanks the class for accurate forecasts on a school tablet"
    "05": "The Dusk Dunes quest scanning a retina image on a tablet"
toc: true
published: true
fmContentType: "Post"
---

Today, November 24, 2026, Google Ukraine is hosting an open live presentation of the educational game AI Quests for teachers. I have already run Google AI Quests on tablets with students in grades 4 to 7, where every child had their own device, and the technical side turned out much rougher than the official launch notes suggest.

The Ukrainian version launched on November 16 with support from the [Ministry of Education and Science of Ukraine](https://mon.gov.ua/news/google-zapuskaie-ukrainskoiu-bezkoshtovnu-hru-ai-quests-pro-shtuchnyi-intelekt-dlia-shkoliariv), the [Ministry of Digital Transformation](https://thedigital.gov.ua/news/education/hrayte-ta-vyvchayte-shtuchnyy-intelekt-google-zapuskaye-ai-quests-dlia-ukrayinskykh-pidlitkiv), and Diia.Osvita. Google Research built the project with the Stanford Accelerator for Learning, and on paper it looks like a lightweight browser activity for school. In practice, optimization is the main bottleneck.

## How Google AI Quests on tablets and a laptop performed

The official [AI Quests page](https://research.google/ai-quests/intl/uk_ua) states a minimum screen resolution of 1024 x 600 pixels, but lists no GPU or CPU requirements. In a real classroom, {% include term.html id="render" text="rendering" %} immediately became the biggest obstacle.

Both budget school tablets and a regular laptop choked on the scenes. The game stayed at 2 to 10 {% include term.html id="fps" %} for the entire session, and every single student complained about the slideshow. Optimization for modest school hardware appears minimal, and I honestly do not know what kind of school tablet is supposed to hold a steady 30 FPS here.

{% include gallery.html id="tablets" caption="Google AI Quests on school tablets during a lesson" %}

| Check | Official game page | Real classroom devices |
| :--- | :--- | :--- |
| Minimum screen | 1024 x 600 pixels | Launches, but scenes are heavy to render |
| Frame rate | Not specified | 2 to 10 FPS on school tablets and a regular laptop |
| Progress saving | Browser-based, no code | Reliable across page reloads and re-entries |
| Interface (UI/UX) | Interactive web game | Clean and clear whenever the screen is not stuttering |

## What works well on the technical side

Despite the heavy rendering, two parts of the build deserve credit. First, the {% include term.html id="ui-ux" text="UI" %} and screen layout are thoughtfully arranged: kids quickly see where to tap and where to read hints.

Second, progress saving works reliably. Closing the tab, reopening the browser, or refreshing the page does not wipe student work. In a school room where Wi-Fi or browsers can hiccup at any minute, that matters a lot.

## Today's Google presentation and teacher materials

Today, November 24, Google is running a free [YouTube live presentation of AI Quests for Ukrainian educators](https://www.youtube.com/live/hyWXjRpQYPQ) with no registration required. The session demonstrates the game, covers lesson integration, and shows how to generate student certificates.

Ready-made [Ukrainian teacher resources](https://research.google/ai-quests/intl/uk_ua/teacher-resources) with lesson plans and discussion prompts are already live on the platform. If you watch the stream today, set aside a few minutes afterward to test the site on one real student device before booking a full class. For a quick follow-up quiz in Ukrainian, you can also use my [online quiz on Na Urok for Google AI Quests](https://naurok.com.ua/test/google-ai-quests-yak-navchaetsya-shi-topkiy-rinok-i-prismerkovi-dyuni-3985937.html).

## Should you run it on school hardware right now

**In its current state, I cannot recommend running Google AI Quests on budget school tablets or everyday laptops.** The educational idea is solid, but 2 to 10 FPS drains focus and frustrates kids within minutes.

Before bringing a full class into the game, open it on a single student tablet and check how smoothly animations respond. If you want coding and computer science lessons built around tools that run smoothly on regular home or school hardware, check my [one-to-one coding tutoring page](https://sivochka.com/tutoring/).
