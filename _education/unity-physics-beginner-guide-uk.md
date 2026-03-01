---
title: "Фізика Unity з нуля: Повний посібник для початківців"
author: ihor
tags: [unity, physics, tutorial, beginner]
lang: uk
permalink: /education/unity-physics-beginner-guide/
level: beginner
sort_order: 1
description: "Все, що вам потрібно знати, щоб зрозуміти фізичний рушій Unity — Rigidbody, Colliders, сили та де помиляються новачки."
excerpt: "Rigidbodies, Colliders, сили та типові пастки — все в одному місці."
---

Фізика в Unity здається простою, поки ваш гравець не провалиться крізь підлогу при 200 FPS. Ось як побудувати її правильно з самого початку.

## Два ключові компоненти

Кожен фізичний об'єкт в Unity потребує рівно двох речей:

**Rigidbody** — надає об'єкту масу, опір (drag) і дозволяє Unity симулювати гравітацію та сили, що діють на нього.

**Collider** — визначає *форму*, яка використовується для виявлення зіткнень. Rigidbody нічого не знає про форму; Collider нічого не знає про фізику. Вони працюють у парі.

```
GameObject
 ├── Rigidbody   → "цей об'єкт бере участь у фізиці"
 └── BoxCollider → "це його фізична форма"
```

## Правильне додавання сил

Ніколи не рухайте Rigidbody через `Transform.position` всередині `Update()`. Це обходить фізичний рушій і викликає смикання (jitter).

```csharp
// ❌ Неправильно — ламає фізику
void Update()
{
    transform.position += Vector3.forward * speed * Time.deltaTime;
}

// ✅ Правильно — дозвольте фізиці робити свою справу
void FixedUpdate()
{
    rb.AddForce(Vector3.forward * forceMagnitude, ForceMode.Force);
}
```

Завжди використовуйте `FixedUpdate()` для фізики. Він виконується з фіксованим кроком у часі (стандартно 0.02 секунди) незалежно від частоти кадрів (FPS).

## Типові пастки для новачків

| Проблема | Причина | Рішення |
|---|---|---|
| Об'єкт провалюється крізь підлогу | Collider відсутній або занадто тонкий | Додайте Collider; увімкніть Continuous виявлення |
| Фізичні смикання (jitter) | Рух Transform у Update | Використовуйте `rb.MovePosition()` або `AddForce` у FixedUpdate |
| Об'єкт не зупиняється | Відсутній опір (drag) | Встановіть `Rigidbody.drag` > 0 |
| FPS впливає на швидкість фізики | Логіка у Update | Перенесіть фізику у FixedUpdate |

## Наступний крок

Як тільки ви освоїте базові сили, дослідіть **Physics Materials** для управління тертям і відскоком (bounciness) — та **Joints** (Суглоби) для з'єднаних об'єктів, таких як мотузки та регдоли.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
