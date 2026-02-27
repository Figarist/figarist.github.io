---
title: "Unity Physics From Zero: A Beginner's Complete Guide"
author: "Ihor (Figarist)"
tags: [unity, physics, tutorial, beginner]
lang: en
permalink: /education/unity-physics-beginner-guide/
level: beginner
sort_order: 1
description: "Everything you need to understand Unity's physics engine — Rigidbody, Colliders, forces, and where beginners go wrong."
excerpt: "Rigidbodies, Colliders, forces, and common traps — all in one place."
---

Physics in Unity looks simple until your player falls through the floor at 200 FPS. Here's how to build it right from the start.

## The Two Key Components

Every physics object in Unity needs exactly two things:

**Rigidbody** — gives the object mass, drag, and lets Unity simulate gravity and forces on it.

**Collider** — defines the *shape* used for collision detection. The Rigidbody doesn't know about shape; the Collider doesn't know about physics. They work as a pair.

```
GameObject
 ├── Rigidbody   → "this object participates in physics"
 └── BoxCollider → "this is its physical shape"
```

## Adding Forces Correctly

Never move a Rigidbody via `Transform.position` in `Update()`. That bypasses the physics engine and causes jitter.

```csharp
// ❌ Wrong — breaks physics
void Update()
{
    transform.position += Vector3.forward * speed * Time.deltaTime;
}

// ✅ Correct — let physics do its job
void FixedUpdate()
{
    rb.AddForce(Vector3.forward * forceMagnitude, ForceMode.Force);
}
```

Always use `FixedUpdate()` for physics. It runs at a fixed timestep (default 0.02s) independent of frame rate.

## Common Beginner Traps

| Problem | Cause | Fix |
|---|---|---|
| Object falls through floor | Collider missing or too thin | Add Collider; enable Continuous detection |
| Physics jitter | Moving Transform in Update | Use `rb.MovePosition()` or `AddForce` in FixedUpdate |
| Object won't stop moving | No drag | Set `Rigidbody.drag` > 0 |
| FPS affects physics speed | Logic in Update | Move physics to FixedUpdate |

## Next Step

Once you're comfortable with basic forces, explore **Physics Materials** to control friction and bounciness — and **Joints** for connected objects like ropes and ragdolls.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
