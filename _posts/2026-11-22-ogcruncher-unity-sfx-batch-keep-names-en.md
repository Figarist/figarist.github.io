---
layout: "post"
title: "Replace Unity SFX in Bulk Without Breaking .meta Files"
description: "Batch-trim silence, normalize to -1 dBFS and overwrite Unity or Godot audio without losing .meta or .import links using KEEP NAMES in OGCruncher."
last_modified_at: null
date: "2026-11-22 10:00:00 +0200"
lang: "en"
page_id: "ogcruncher-unity-sfx-batch-keep-names"
permalink: "/blog/ogcruncher-unity-sfx-batch-keep-names/"
excerpt: "How to batch-process game sound effects and drop them back into Unity or Godot without breaking .meta or .import references using OGCruncher."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/ogcruncher-card.png"
image_alt: "OGCruncher — in-browser audio bit-crusher and batch OGG, WAV, MP3 converter for games"
focus_keyword: "replace Unity SFX"
seo_title: "Replace Unity SFX in Bulk Without Breaking .meta Files"
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

You run twenty footsteps and hit sounds through a converter, copy them back into `Assets/`, and Unity treats them as twenty brand-new assets. The converter appended a suffix to each filename, your old `.meta` files are orphaned, and every `AudioSource` reference in prefabs now needs to be wired up again. To replace Unity SFX without breaking `.meta` links, each file must return with the exact same name and extension.

In [OGCruncher](https://sivochka.com/OGCruncher/), the new **KEEP NAMES** toggle handles this directly, alongside selective format export, silence trimming, and a `-1 dBFS` normalization ceiling.

## How Unity and Godot keep audio references intact

Unity stores an asset's GUID and import settings inside a `.meta` file next to the audio file, and any file without a matching `.meta` is treated as a new asset ([Unity documentation](https://docs.unity3d.com/Manual/AssetMetadata.html)). That means `.meta` stays attached only when both the filename and extension match: replacing `hit.wav` with `hit.ogg` creates a different asset.

Above the PREVIEW and CRUNCH buttons in OGCruncher, you can now switch off formats you do not need (`OGG`, `WAV`, or `MP3`) so the browser skips encoding them. At least one format always stays active.

| Engine | Format to export | Filename toggle | Result after overwriting |
| --- | --- | --- | --- |
| Unity | Same format (`WAV`, `OGG`, or `MP3`) already stored in `Assets/` | KEEP NAMES on | Existing `.meta` and `AudioSource` links stay intact |
| Godot | `WAV` for short repeated SFX, `Ogg Vorbis` for longer clips ([Godot documentation](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_audio_samples.html)) | KEEP NAMES on | Existing `.import` (and `uid` in Godot 4) stays intact |

## Seven steps to replace Unity SFX cleanly

All processing runs locally in browser memory with zero file uploads.

1. Open [OGCruncher](https://sivochka.com/OGCruncher/) and drag your folder of short SFX into the dropzone.
2. In the export bar, leave only the format your project already uses and toggle the other two off.
3. Turn on KEEP NAMES. Without it, OGCruncher appends `_crunched_<bits>bit_<rate>hz` to every output file. With it on, the original stem stays untouched, and `-2`, `-3` are added only when duplicate filenames exist in the same batch. **The file extension must still match the original asset, or Unity and Godot will create a new asset instead of reusing `.meta` or `.import`.**
4. Turn on TRIM SILENCE if your clips have dead air at the start or end.
5. Keep the `-1 dB` normalization ceiling active (now the default). If you specifically need `0 dBFS`, switch it manually.
6. Check the result with PREVIEW and toggle ORIGINAL / WET with `C`. Once loaded, `L` toggles LOOP, and `Space` starts playback even right after clicking UI controls.
7. Click CRUNCH, download `ogcruncher_batch.zip` via DOWNLOAD ALL (.ZIP), and extract over the original files in your project folder.

## Keeping the attack intact with trim and `-1 dBFS`

TRIM SILENCE scans for audio above `-48 dBFS` and leaves a `2 ms` pad on both ends. After processing, it applies a `1 ms` fade-in and a `4 ms` fade-out. Because the `1 ms` fade-in fits inside the `2 ms` pad, the first transient peak of a click or hit stays intact while the tail click disappears.

In preview mode, the ORIGINAL branch is trimmed to the exact same window as the processed audio. Switching A/B inside a loop stays in phase without drift.

The default `-1 dBFS` ceiling leaves headroom for lossy codecs (`OGG` and `MP3`), reducing peak clipping after compression. For `WAV`, container bit depth follows your effect depth: 8-bit unsigned PCM for 1–8 bits, and 16-bit signed PCM for 9–16 bits.

For an overview of the core bit-crusher features, see the [first OGCruncher post](/blog/ogcruncher-game-audio-bitcrusher/). If you or your child are building a first Unity game and want structured guidance with assets, scenes, and C#, check out [1-on-1 Unity and C# lessons](/tutoring/unity/).
