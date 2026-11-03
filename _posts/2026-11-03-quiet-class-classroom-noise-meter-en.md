---
layout: "post"
title: "Quiet Class: Web Audio DSP Classroom Noise Meter for Distant TV Webcams"
description: "How we engineered an offline-first PWA classroom noise meter with a 120 Hz highpass filter, 2.2 kHz speech presence boost, and 25th-percentile calibration for distant school TV webcams."
last_modified_at: null
date: "2026-11-03 10:00:00 +0200"
lang: "en"
page_id: "quiet-class-classroom-noise-meter"
permalink: "/blog/quiet-class-classroom-noise-meter/"
excerpt: "How we engineered an offline-first PWA classroom noise meter with a 120 Hz highpass filter, 2.2 kHz speech presence boost, and 25th-percentile calibration for distant school TV webcams."
category: "workshop"
categories:
  - "workshop"
tags:
  - "education"
  - "audio"
  - "tools"
  - "gamedev"
author: "ihor"
image: null
image_alt: null
focus_keyword: "classroom noise meter"
seo_title: "Quiet Class: Web Audio DSP Classroom Noise Meter for School TVs"
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

Visual classroom noise meters are a staple in elementary and middle school classrooms (grades 1–6), helping students self-regulate volume during independent study and group work. However, most browser-based noise meters fail when deployed on a real classroom setup: a smart TV or projector connected to a teacher's PC with a webcam mounted **2 to 4 meters away** from the students' desks.

To solve this hardware gap, we built [Quiet Class (Тихий клас)](https://sivochka.com/bouncy/) — an autonomous, offline-first PWA noise meter, task timer, and star-jar reward system with a custom Web Audio API digital signal processing (DSP) pipeline.

---

### Why Traditional Browser Noise Meters Fail on Classroom Webcams

During classroom testing with distant TV-mounted webcams, four acoustic bottlenecks consistently broke naive RMS volume meters:

1. **90th-Percentile Calibration Trap**: When calibrating room silence over 3 seconds, taking the 90th percentile meant a single cough, chair scrape, or whisper pushed the "silence baseline" to `-35 dB`. Subsequent thresholds jumped to `-17 dB` — requiring students to shout directly into the microphone to trigger a warning.
2. **Unrealistic Far-Field Thresholds**: Requiring `+10 dB` for the yellow zone and `+18 dB` (a 63× jump in acoustic energy) for the red zone ignores inverse-square law attenuation. Normal speech at 3 meters adds only `+4.5 to +9 dB` above the room floor.
3. **Excessive Debounce Windows (`700 ms`)**: Requiring nearly a full second of continuous shouting caused short exclamations (`200–350 ms`) to be discarded completely.
4. **Low-Frequency PC & Projector Fan Rumble**: Cooling fans, AC units, and desk vibrations (`50–110 Hz`) artificially inflate broadband time-domain RMS readings, masking human speech frequencies.

---

### The Web Audio DSP Pipeline

Instead of reading raw microphone samples directly, [Quiet Class](https://sivochka.com/bouncy/) routes the audio stream (`echoCancellation: false`, `noiseSuppression: false`, `autoGainControl: false`) through a four-stage Web Audio graph:

#### 1. 120 Hz Highpass Filter (Fan & Rumble Cut)
A Biquad `highpass` filter at `120 Hz` (`Q = 0.7`) strips out low-frequency hum from desktop fans, ceiling projectors, and desk bumps before level evaluation.

#### 2. 2.2 kHz Speech Presence Peaking Filter (`+3.5 dB`)
A `peaking` filter centered at `2200 Hz` (`Q = 1.0`, `+3.5 dB` gain in the Webcam profile) accentuates human voice consonants and whispers, creating a sharp signal-to-noise ratio even 3–4 meters from the screen.

#### 3. Software Preamp Gain (`0.5×` to `4.5×`)
Teachers can switch between three hardware presets (**Webcam 2–4m** at `2.2×`, **Laptop / PC** at `1.5×`, and **Headset / Close** at `1.0×`) or fine-tune the preamp gain while watching a live monochromatic VU meter with real-time dB telemetry.

#### 4. 25th-Percentile Calibration & Leaky Silence Tracking
* **Spike-Immune Calibration**: Room calibration samples 3 seconds of audio and selects the **25th percentile** clamped to `[-75 dB, -44 dB]`, ignoring transient noises and guaranteeing the meter never becomes "deaf".
* **Leaky Silence Tracking**: During quiet stretches (`> 2.5 s` below baseline), the ambient floor gently adapts downward toward the true acoustic minimum of the room.

---

### Roly-Poly Verlet Physics & Classroom Motivation

* **60 Hz Verlet Physics with Roly-Poly Restoration**: Characters react with proportional tremors in the Yellow Zone (`+4.5 dB`, `120 ms` debounce) and a startled `scareBounce` in the Red Zone (`+9.0 dB`, `250 ms` debounce). World-space lighting stays fixed at the top-left while character faces tilt within `±25°` like physical roly-poly toys.
* **7 Visual Themes & Projector Light Mode**: Includes *Sleepy Critters*, *Solar System* (two-pass Saturn rings and day/night terminators), *Soap Bubbles*, *Emoji*, *Billiards*, *Numbers*, and *Eyes*, plus a high-contrast **Light Room** mode for sunlit classrooms.
* **Glass Star Jar & Multi-Class Profiles**: Every 30 seconds of continuous quiet launches a golden star along a quadratic Bézier curve into the class jar, saving weekly goals and rewards across multiple class rosters (`4-B`, `3-A`, `5-C`) in `localStorage`.
* **100% Local Privacy & Offline PWA**: Audio is processed strictly in RAM via Web Audio API — nothing is recorded or transmitted over the network.

Launch the tool directly in your browser:  
👉 **[Open Quiet Class (Тихий клас) Online](https://sivochka.com/bouncy/)**

Explore our other open educational tools for schools and STEM clubs:
* **[3D Club Studio — Procedural Support-Free 3D Generator](https://sivochka.com/3d-club-studio/)**
* **[LEGO WeDo 2.0 Building Instructions Catalog](https://sivochka.com/lego-catalog/)**

Interested in 1-on-1 online lessons in Unity game development, C#, Python, Scratch, or 3D modeling?  
👉 **[Explore 1-on-1 Tutoring & Mentorship with Sivochka Ihor](https://sivochka.com/tutoring/)**
