---
layout: post
title: "Kharkiv, Blackouts, and Developing for Wear OS"
date: 2026-02-26
lang: en
permalink: /blog/kharkiv-cats-unity/
categories: life
tags: [life, wearos, unity, gamedev]
description: "About cats, blackouts, and why Wear OS is the ideal platform for micro-games."
---

Today the power went out at nine in the morning. I was sitting with my laptop, my coffee hadn't cooled down yet, and Unity joyfully announced that compile errors are not bugs, but a "featured experience." Welcome to development in Zmiiv, a suburb in the Kharkiv region.

## The Feline QA Department

While I was debugging garbage collection in yet another Wear OS project, our cat **Katsu** walked out of the bathroom and screamed. He didn't just meow — he screamed, like a person who realized they just sent an unedited email to their boss. Loudly. With expression. With a pause for effect.

**Simona** — our second cat — just watched. No reaction. An absolute zero-allocation cat: nothing unnecessary, zero attention allocations for others' problems. The perfect Wear OS developer.

Sasha lifted her head from her book, looked at me. I looked at her. We didn't say a word. That's Katsu.

## Why Wear OS is Not a Whim

When you live with blackouts, you understand the value of **small screens**. A smartwatch doesn't need to be charged as often as a phone. Playing a game on it is 2–3 minutes of pure experience: while the coffee is brewing, while the generator is warming up, while Katsu decides to "share" the results of his business again.

At **Wrist & Pocket Studio** I do exactly this — micro-games for Wear OS. And there is a philosophy here:

- **No GC spikes.** `List<T>` instead of arrays is death for the framerate on a circular display. Object pools are mandatory.
- **Minimum memory.** 512 MB RAM is the ceiling for most watches. Textures — only what is needed.
- **No internet dependency.** Blackout = offline. The game must work always.

These aren't limitations — this is design thinking. Like Japanese haikus: beauty in brevity.

## Compilation Complete

The power came back. Katsu was sleeping. Simona was looking out the window at the pigeons — obviously, putting together an optimal algorithm for capturing them. The Unity build passed cleanly.

A good day.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
