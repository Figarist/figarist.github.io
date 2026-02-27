---
title: "Разработка игр для Wear OS: Мышление Zero-GC"
author: "Ihor (Figarist)"
tags: [wearos, unity, performance, gamedev, intermediate]
lang: ru
permalink: /education/wearos-zero-gc-mindset/
level: intermediate
sort_order: 2
description: "Как создавать игры для Wear OS без скачков сборки мусора (GC), которые снижают частоту кадров на ограниченном оборудовании смарт-часов."
excerpt: "512 МБ ОЗУ, никакой терпимости к паузам GC. Вот мышление, которое позволяет играм для Wear OS работать плавно."
---

У Wear OS есть жесткие ограничения: ~512 МБ ОЗУ, маленькие ядра процессора и крошечный аккумулятор. Одно ключевое слово `new` в неправильном месте вызывает паузу сборки мусора (GC), которую игроки мгновенно чувствуют на 40-миллиметровом дисплее.

## Почему сборка мусора (GC) критична для Wear OS

Приложения Unity для десктопов выполняют паузы GC, которые незаметны. На Wear OS при 60 Гц бюджет кадра составляет 16 мс, а значит, любая пауза GC дольше ~4 мс вызывает видимый «фриз».

Виновниками почти всегда являются:

- `new List<T>()` или `new T[]` внутри `Update()`
- `string.Format()` или конкатенация строк в критических путях
- Вызовы LINQ (`Where`, `Select`, `FirstOrDefault`) во время работы
- Боксинг (boxing) значимых типов в `object`

## Пул объектов (Object Pooling): Основной паттерн

Вместо создания и уничтожения объектов GameObjects, заранее распределите пул при запуске и используйте их повторно.

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
        return Instantiate(prefab); // запасной вариант
    }

    public void Return(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

Ноль выделений памяти в критическом пути после того, как пул заполнен при запуске.

## Паттерн кэширования строк

Если вы отображаете динамический текст (очки, таймеры), кэшируйте строку:

```csharp
// ❌ Создает новую строку каждый кадр
scoreLabel.text = "Score: " + score;

// ✅ Выделяет память только при изменении счета
if (score != _cachedScore)
{
    _cachedScore = score;
    scoreLabel.text = $"Score: {score}";
}
```

## Профилирование на устройстве

Раздел **Memory** в Unity Profiler под пунктом **GC Alloc** — это ваша библия. Фильтруйте по имени скрипта. Стремитесь к **0 байт** в методе `Update()` в стабильном состоянии.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
