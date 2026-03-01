---
layout: post
title: "Building a Hold-to-Charge Mechanic in Unity"
date: 2026-02-27 11:00:00 +0200
author: ihor
category: gamedev
tags: [unity, gamedev, csharp, mechanics]
lang: en
permalink: /blog/unity-charge-mechanic/
description: "A deep-dive into implementing a hold-to-charge kick mechanic in Unity — power curves, particle effects, and keeping GC allocations zero."
excerpt: "From 10% power on mouse-down to a full-force launch on release — here's the exact implementation."
---

Charge mechanics feel tight when they're right and terrible when they're not. Here's exactly how I built ours.

## The Core Loop

The goal: hold the mouse button to charge from 10% to 100% power over a configurable `holdDuration`. Release to fire.

```csharp
[SerializeField] private float holdDuration = 1.5f;
[SerializeField] private ParticleSystem chargeVFX;

private float _holdTimer;
private bool _isCharging;

void Update()
{
    if (Input.GetButtonDown("Fire1"))
    {
        _isCharging = true;
        _holdTimer  = 0f;
        chargeVFX.Play();
    }

    if (_isCharging && Input.GetButton("Fire1"))
    {
        _holdTimer += Time.deltaTime;
    }

    if (Input.GetButtonUp("Fire1") && _isCharging)
    {
        float power = Mathf.Lerp(0.1f, 1f, _holdTimer / holdDuration);
        ApplyKick(power);
        _isCharging = false;
        chargeVFX.Stop();
    }
}
```

## Power Curve Matters

`Mathf.Lerp` gives linear growth, which feels mechanical. Try `Mathf.SmoothStep` for an ease-in-ease-out feel:

```csharp
float t     = Mathf.Clamp01(_holdTimer / holdDuration);
float power = Mathf.Lerp(0.1f, 1f, Mathf.SmoothStep(0f, 1f, t));
```

Players instinctively expect "slow start, fast finish" — this one line makes the mechanic feel intentional.

## Zero GC Caveat

`ParticleSystem.Play()` and `.Stop()` are allocation-free. Avoid creating new `Vector3` values inside `Update`; cache them as fields.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
