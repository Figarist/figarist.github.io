---
title: "Wear OS Game Dev: The Zero-GC Mindset"
author: ihor
tags: [wearos, unity, performance, gamedev, intermediate]
lang: en
permalink: /education/wearos-zero-gc-mindset/
level: intermediate
sort_order: 2
description: "How to build games for Wear OS without triggering garbage collection spikes that tank frame rate on constrained smartwatch hardware."
excerpt: "512 MB RAM, no tolerance for GC pauses. Here's the mindset that makes Wear OS games run smoothly."
---

Wear OS has hard constraints: ~512 MB RAM, small CPU cores, and a tiny battery. One `new` keyword in the wrong place causes a GC pause that players feel instantly on a 40 mm display.

## Why GC Matters More on Wear OS

Desktop Unity targets run GC pauses that are imperceptible. On Wear OS at 60Hz, a 16ms frame budget means any GC pause longer than ~4ms causes a visible hitch.

The culprits are almost always:

- `new List<T>()` or `new T[]` inside `Update()`
- `string.Format()` or string concatenation in hot paths
- LINQ calls (`Where`, `Select`, `FirstOrDefault`) at runtime
- Boxing value types into `object`

## Object Pooling: The Core Pattern

Instead of instantiating and destroying GameObjects, pre-allocate a pool at startup and recycle them.

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
        return Instantiate(prefab); // fallback only
    }

    public void Return(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

Zero allocations in the hot path once the pool is filled at startup.

## String Caching Pattern

If you display dynamic text (scores, timers), cache the string:

```csharp
// ❌ Allocates a new string every frame
scoreLabel.text = "Score: " + score;

// ✅ Only allocates when score changes
if (score != _cachedScore)
{
    _cachedScore = score;
    scoreLabel.text = $"Score: {score}";
}
```

## Profiling on Device

The Unity Profiler's **Memory** section under **GC Alloc** is your bible. Filter by script name. Aim for **0 bytes** in `Update()` steady state.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
