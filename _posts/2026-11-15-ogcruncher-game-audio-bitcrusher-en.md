---
layout: "post"
title: "OGCruncher: Free In-Browser Audio Bit-Crusher & Batch SFX Optimizer for Indie Games"
description: "How OGCruncher works: a local Web Audio bit-crusher, sample rate reducer and OGG/WAV/MP3 batch exporter for Unity, Godot, WebGL and Wear OS games."
last_modified_at: "2026-11-21 09:20:00 +0200"
date: "2026-11-15 10:00:00 +0200"
lang: "en"
page_id: "ogcruncher-game-audio-bitcrusher"
permalink: "/blog/ogcruncher-game-audio-bitcrusher/"
excerpt: "Engineering breakdown of OGCruncher — a local Web Audio bit-crusher, sample rate reducer, and OGG/WAV/MP3 batch exporter built for Unity, Godot, WebGL, and Wear OS."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: null
image_alt: null
focus_keyword: "online audio bit-crusher"
seo_title: "OGCruncher: Free Online Audio Bit-Crusher for Game SFX"
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

When shipping games for Wear OS watches, WebGL browsers, or mobile devices, sound designers and indie developers constantly balance two competing constraints: **tiny build budgets** and **expressive retro punch**. Modern 24-bit / 48 kHz WAV libraries eat megabytes rapidly, yet generic cloud transcoders strip character or force developers to upload unreleased game assets to third-party servers.

To give developers a fast, zero-upload solution, we engineered [OGCruncher](https://sivochka.com/OGCruncher/) — a free in-browser creative bit-crusher, sample rate reducer, and multi-format batch processor powered by `OfflineAudioContext`, `Float32Array` DSP, and dedicated Web Workers.

---

### Why Creative Bit-Crushing Beats Blind Compression for Game SFX

* **Zero-Latency 8-Bit & 16-Bit PCM WAV**: Short UI clicks, combat impacts, and footsteps play instantaneously without CPU decompression overhead when exported as compact mono PCM WAV at `16,000–22,050 Hz`.
* **Intentional Lo-Fi Character**: Reducing bit depth (`1–16 bit`) and sample rate (`4,000–48,000 Hz`) turns sterile studio recordings into authentic 8-bit chiptune, NES, or Amiga 500 textures.
* **100% Local Browser Privacy**: Every decode, filter pass, quantization step, and codec encode happens locally in RAM inside your browser—zero audio bytes leave your machine.

---

### Inside the OGCruncher DSP Pipeline

Unlike tools where preview playback diverges from exported files, [OGCruncher](https://sivochka.com/OGCruncher/) shares one deterministic render contract between Dry/Wet A/B preview and batch export:

#### 1. `OfflineAudioContext` Pre-Filtering & Speed/Pitch Scaling
Before sample-level quantization runs, audio is resampled to the selected output rate (`4,000–48,000 Hz`), mixed to Mono or Stereo, scaled in speed/pitch (`0.5×–2.0×`), and shaped by a three-stage Web Audio filter chain:
* **High-Pass Filter (`20–1000 Hz`)** to strip low-end mud and rumble.
* **Low-Pass Filter (`500–20000 Hz`)** for warm, muffled, or vintage speaker roll-off.
* **Bass Boost (`80 Hz`, `0 to +15 dB`)** to restore sub-punch after bit reduction.

#### 2. `Float32Array` Crush Pipeline (`js/dsp-core.js` & Web Worker)
1. **Non-Finite Sanitization & Seeded Noise Floor**: Guards `NaN`/`Infinity` samples and optionally layers deterministic tape-style hiss (`0–0.05`).
2. **Crush Mode (DC Removal + Soft Expander + TPDF Dither + 2-Tap Anti-Alias)**: Removes DC bias, applies `sign(x) * |x|^1.15` expansion, quantizes to `1–16` bits (with optional triangular probability density function dither), and runs a two-tap smoothing pass.
3. **Grit Saturation (`tanh`) & Linked -1 dBFS Normalization**: Applies `tanh(x * drive) / tanh(drive)` harmonic drive (`1.0–10.0`) followed by stereo-linked peak normalization to `-1 dBFS` by default (headroom for OGG/MP3, switchable to `0 dBFS`) without shifting stereo balance.

#### 3. Multi-Format Batch Worker & Lanczos-3 MP3 Resampling
For every queued file, a classic Web Worker encodes only the selected formats (OGG, WAV, and MP3 can be toggled individually, with at least one always active) so one codec error never discards other outputs:
* **PCM WAV**: Automatically writes unsigned 8-bit PCM for `1–8 bit` depth or signed 16-bit PCM for `9–16 bit` depth with word-aligned RIFF `data` padding.
* **Ogg Vorbis (`.ogg`)**: Encodes directly at your target sample rate for lightweight Unity, Godot, and WebGL playback.
* **MP3 (`128 kbps`)**: Automatically resamples non-MPEG rates (such as `4,000 Hz` or `28,000 Hz`) via windowed **Lanczos-3** interpolation to the nearest valid MPEG rate (`8,000–48,000 Hz`).

---

### Key Workflow Features

* **Simple & Advanced Modes + Presets**: Start quickly with four Simple quality tiers (*TINY*, *LOW*, *MEDIUM*, *HIGH*) or switch to Advanced mode for full rack presets (*LO-Q MODE*, *NES 8-BIT*, *AMIGA 500*, and *MY PRESET*).
* **Live Dry/Wet A/B & FFT Spectrum**: Toggle instant crossfaded comparison (`C`), watch live RMS/Peak/Duration telemetry, or inspect both Dry and Wet spectra simultaneously.
* **Batch ZIP & Shareable Links**: Export entire SFX packs in one `ogcruncher_batch.zip` archive or copy a URL hash preset link to share exact crunch settings across your team.

Launch the processor directly in your browser (PWA offline-ready):  
👉 **[Open OGCruncher Online](https://sivochka.com/OGCruncher/)**

Explore our other free browser tools for developers and educators:
* **[Quiet Class (Тихий клас) — Adaptive Web Audio DSP Classroom Noise Meter](https://sivochka.com/bouncy/)**
* **[3D Club Studio — Procedural Support-Free 3D Generator](https://sivochka.com/3d-club-studio/)**
* **[LEGO WeDo 2.0 Building Instructions Catalog](https://sivochka.com/lego-catalog/)**

Want to learn Unity game development, C#, audio integration, or Python 1-on-1?  
👉 **[Explore 1-on-1 Tutoring & Mentorship with Sivochka Ihor](https://sivochka.com/tutoring/)**
