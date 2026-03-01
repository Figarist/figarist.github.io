---
title: "Физика в Unity с нуля: Полное руководство для начинающих"
author: ihor
tags: [unity, physics, tutorial, beginner]
lang: ru
permalink: /education/unity-physics-beginner-guide/
level: beginner
sort_order: 1
description: "Все, что вам нужно знать о физическом движке Unity — Rigidbody, коллайдеры, силы и ошибки новичков."
excerpt: "Rigidbody, коллайдеры, силы и типичные ошибки — все в одном месте."
---

Физика в Unity кажется простой, пока ваш персонаж не проваливается сквозь пол при 200 FPS. Вот как правильно настроить её с самого начала.

## Два ключевых компонента

Каждому физическому объекту в Unity нужны ровно две вещи:

**Rigidbody** — дает объекту массу, сопротивление и позволяет Unity симулировать гравитацию и приложенные к нему силы.

**Collider** — определяет *форму*, используемую для обнаружения столкновений. Rigidbody не знает о форме; Collider не знает о физике. Они работают в паре.

```
GameObject
 ├── Rigidbody   → "этот объект участвует в физике"
 └── BoxCollider → "это его физическая форма"
```

## Правильное приложение сил

Никогда не двигайте Rigidbody через `Transform.position` в `Update()`. Это обходит физический движок и вызывает рывки (jitter).

```csharp
// ❌ Неправильно — ломает физику
void Update()
{
    transform.position += Vector3.forward * speed * Time.deltaTime;
}

// ✅ Правильно — позвольте физике делать свою работу
void FixedUpdate()
{
    rb.AddForce(Vector3.forward * forceMagnitude, ForceMode.Force);
}
```

Всегда используйте `FixedUpdate()` для физики. Он работает с фиксированным временным шагом (по умолчанию 0.02 с) независимо от частоты кадров.

## Типичные ошибки новичков

| Проблема | Причина | Решение |
|---|---|---|
| Объект проваливается сквозь пол | Коллайдер отсутствует или слишком тонкий | Добавьте Collider; включите Continuous detection |
| Рывки физики | Изменение Transform в Update | Используйте `rb.MovePosition()` или `AddForce` в FixedUpdate |
| Объект не перестает двигаться | Нет сопротивления (Drag) | Установите `Rigidbody.drag` > 0 |
| FPS влияет на скорость физики | Логика в Update | Перенесите физику в FixedUpdate |

## Следующий шаг

Когда вы освоитесь с базовыми силами, изучите **Physics Materials** для управления трением и прыгучестью, а также **Joints** для создания сочлененных объектов, таких как веревки или рэгдоллы.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
