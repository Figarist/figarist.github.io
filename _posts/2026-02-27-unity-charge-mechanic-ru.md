---
layout: post
title: "Создание механики накопления заряда в Unity"
date: 2026-02-27 11:00:00 +0200
author: ihor
category: gamedev
tags: [unity, gamedev, csharp, mechanics]
lang: ru
permalink: /blog/unity-charge-mechanic/
description: "Глубокое погружение в реализацию механики удара с накоплением заряда в Unity: кривые мощности, эффекты частиц и поддержание нулевого выделения памяти (Zero GC)."
excerpt: "От 10% мощности при нажатии кнопки до запуска в полную силу при отпускании — вот точная реализация."
---

Механики накопления заряда ощущаются круто, когда они сделаны правильно, и ужасно, когда нет. Вот как именно я построил нашу.

## Основной цикл

Цель: удерживать кнопку мыши для зарядки от 10% до 100% мощности в течение настраиваемого времени `holdDuration`. Отпустить, чтобы произвести действие.

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

## Кривая мощности имеет значение

`Mathf.Lerp` дает линейный рост, который ощущается слишком «механическим». Попробуйте `Mathf.SmoothStep` для эффекта плавного ускорения и замедления (ease-in-ease-out):

```csharp
float t     = Mathf.Clamp01(_holdTimer / holdDuration);
float power = Mathf.Lerp(0.1f, 1f, Mathf.SmoothStep(0f, 1f, t));
```

Игроки инстинктивно ожидают «медленного старта и быстрого финиша» — эта одна строка делает механику более естественной.

## Нюанс Zero GC

`ParticleSystem.Play()` и `.Stop()` не выделяют память. Избегайте создания новых значений `Vector3` внутри `Update`; кэшируйте их в полях класса.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
