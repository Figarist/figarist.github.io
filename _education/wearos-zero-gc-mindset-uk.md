---
title: "Розробка під Wear OS: Мислення Zero-GC"
author: "Ihor (Figarist)"
tags: [wearos, unity, performance, gamedev, intermediate]
lang: uk
permalink: /education/wearos-zero-gc-mindset/
level: intermediate
sort_order: 2
description: "Як створювати ігри для Wear OS без виклику стрибків Garbage Collection (збору сміття), які знищують частоту кадрів на обмеженому апаратному забезпеченні смарт-годинників."
excerpt: "512 МБ оперативної пам'яті, нульова толерантність до пауз GC. Ось мислення, яке змушує ігри на Wear OS працювати плавно."
---

Wear OS має жорсткі обмеження: ~512 МБ оперативної пам'яті (RAM), слабкі ядра CPU та маленька батарея. Одне ключове слово `new` у неправильному місці викликає паузу GC, яку гравці миттєво відчувають на 40-міліметровому дисплеї.

## Чому GC має більше значення на Wear OS

Десктопні збірки Unity виконують паузи GC, які непомітні. На Wear OS при 60 Гц бюджет кадру становить 16 мс, що означає: будь-яка пауза GC довша за ~4 мс викликає видиме підгальмовування (hitch).

Винуватцями майже завжди є:

- `new List<T>()` або масиви `new T[]` всередині `Update()`
- `string.Format()` або конкатенація рядків у гарячих шляхах (hot paths)
- Виклики LINQ (`Where`, `Select`, `FirstOrDefault`) під час виконання
- Пакування (Boxing) значень типу в `object`

## Object Pooling: Основний патерн

Замість того, щоб Instantiate (створювати) та Destroy (знищувати) GameObjects, заздалегідь виділяйте пул при запуску та переробляйте їх (recycle).

```csharp
public class BulletPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int poolSize = 20;

    private readonly Queue<GameObject> _pool = new Queue<GameObject>();

    void Awake()
    {
        for (int i = 0; i < poolSize; i++)
        {
            var obj = Instantiate(prefab);
            obj.SetActive(false);
            _pool.Enqueue(obj);
        }
    }

    public GameObject Get()
    {
        if (_pool.Count > 0)
        {
            var obj = _pool.Dequeue();
            obj.SetActive(true);
            return obj;
        }
        return Instantiate(prefab); // запасний варіант
    }

    public void Return(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

Жодних алокацій у гарячому шляху, як тільки пул заповнений під час запуску (startup).

## Патерн Кешування Рядків (String Caching)

Якщо ви відображаєте динамічний текст (рахунок, таймери), кешуйте рядок:

```csharp
// ❌ Створює новий рядок кожного кадру
scoreLabel.text = "Score: " + score;

// ✅ Створює об'єкт тільки тоді, коли рахунок змінився
if (score != _cachedScore)
{
    _cachedScore = score;
    scoreLabel.text = $"Score: {score}";
}
```

## Профілювання на пристрої

Секція **Memory** в Unity Profiler у полі **GC Alloc** — це ваша біблія. Фільтруйте за назвою скрипта. Прагніть до **0 bytes** у `Update()` в стабільному стані потоку гри.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
