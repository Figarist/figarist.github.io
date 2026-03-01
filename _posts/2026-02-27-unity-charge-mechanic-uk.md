---
layout: post
title: "Створення механіки Hold-to-Charge в Unity"
date: 2026-02-27 11:00:00 +0200
author: ihor
category: gamedev
tags: [unity, gamedev, csharp, mechanics]
lang: uk
permalink: /blog/unity-charge-mechanic/
description: "Глибоке занурення в реалізацію механіки удару з утриманням в Unity — криві сили, візуальні ефекти частинок і збереження нульової алокації GC."
excerpt: "Від 10% сили при натисканні миші до повномасштабного запуску при відпусканні — ось точна реалізація."
---

Механіки заряду (Hold-to-charge) відчуваються круто, коли вони правильні, і жахливо, коли ні. Ось як саме я побудував нашу.

## Основний цикл

Мета: утримувати кнопку миші для заряду від 10% до 100% сили протягом настроюваного `holdDuration`. Відпустити для пострілу.

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

## Крива сили має значення

`Mathf.Lerp` дає лінійний ріст, що відчувається механічно. Спробуйте `Mathf.SmoothStep` для відчуття ease-in-ease-out:

```csharp
float t     = Mathf.Clamp01(_holdTimer / holdDuration);
float power = Mathf.Lerp(0.1f, 1f, Mathf.SmoothStep(0f, 1f, t));
```

Гравці інстинктивно очікують «повільного старту, швидкого фінішу» — цей один рядок робить механіку свідомою.

## Застереження щодо Zero GC

`ParticleSystem.Play()` та `.Stop()` не мають алокацій пам'яті. Уникайте створення нових значень `Vector3` всередині `Update`; кешуйте їх як поля.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
