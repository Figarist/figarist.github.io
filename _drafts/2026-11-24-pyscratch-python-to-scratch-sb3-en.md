---
layout: "post"
title: "pyScratch: Write and Test Scratch 3.0 (.sb3) Projects in Python"
description: "How pyScratch works: a free in-browser Python ↔ Scratch 3.0 (.sb3) IDE with bidirectional compiler, decompiler, and live Canvas 2D stage simulator."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "en"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "Overview of pyScratch — a free browser-based IDE that compiles Python DSL into real Scratch 3.0 (.sb3) blocks and decompiles .sb3 back to Python."
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
focus_keyword: "Scratch in Python online"
seo_title: "pyScratch: Python ↔ Scratch 3.0 (.sb3) IDE in Browser"
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

Many students moving from [Scratch](/tutoring/scratch/) to [Python](/tutoring/python/) hit the same wall: standard Python tutorials start with a black terminal instead of sprites, costumes, and a live interactive stage.

To bridge that gap, I built **[pyScratch](https://sivochka.com/pyScratch/)** — a free browser-based IDE that requires zero installation.

## Key Capabilities

1. **Bidirectional Compiler & Decompiler (`Python ↔ .sb3`)**  
   Drag and drop any `.sb3` file into the browser window: pyScratch unpacks the project, decompiles Scratch 3.0 blocks into readable Python DSL, lets you edit the logic as code, and exports a valid `.sb3` file back.
2. **Live `480×360` Canvas 2D Stage**  
   Test scripts immediately in the browser with support for up to 300 clones (with isolated `self.var` sprite-local variables), `@warp` ("run without screen refresh"), layer ordering, graphic effects, pen drawing, and `.sb3` audio playback.
3. **One-Click Sharing & Embed Mode**  
   The **Share** button encodes the active Python script into a `?code=...` URL, and `?embed=1` provides a compact layout for embedding interactive examples.

Try it directly in your browser: **[Open pyScratch IDE ↗](https://sivochka.com/pyScratch/)**

Looking for structured 1-on-1 guidance from Scratch to Python or Unity C#? Explore [individual tutoring](/tutoring/).
