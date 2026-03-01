---
title: "Unity 물리 기초: 초보자를 위한 완전 정복 가이드"
author: ihor
tags: [unity, physics, tutorial, beginner]
lang: ko
permalink: /education/unity-physics-beginner-guide/
level: beginner
sort_order: 1
description: "Unity의 물리 엔진(Rigidbody, Collider, 힘)과 초보자들이 자주 저지르는 실수에 대해 알아보겠습니다."
excerpt: "Rigidbody, Collider, 힘, 그리고 흔한 함정들 — 이 모든 것을 한 곳에서 확인하세요."
---

Unity의 물리는 간단해 보이지만, 프레임이 200 FPS까지 올라가면 캐릭터가 바닥을 뚫고 지나가는 현상이 발생할 수 있습니다. 처음부터 올바르게 구현하는 방법을 알아보겠습니다.

## 두 가지 핵심 컴포넌트

Unity의 모든 물리 오브젝트에는 반드시 두 가지가 필요합니다:

**Rigidbody** — 오브젝트에 질량과 항력을 부여하며, Unity가 중력과 힘을 시뮬레이션할 수 있게 합니다.

**Collider** — 충돌 감지에 사용되는 *형태*를 정의합니다. Rigidbody는 형태를 알지 못하며, Collider는 물리 법칙을 알지 못합니다. 이 둘은 한 쌍으로 작동합니다.

```
GameObject
 ├── Rigidbody   → "이 오브젝트는 물리 계산에 참여함"
 └── BoxCollider → "이것이 물리적인 모양임"
```

## 올바른 힘 전달 방법

`Update()` 함수에서 `Transform.position`을 통해 Rigidbody를 직접 이동시키지 마세요. 이는 물리 엔진을 우회하여 화면 떨림(jitter) 현상을 유발합니다.

```csharp
// ❌ 잘못된 방법 — 물리를 망가뜨림
void Update()
{
    transform.position += Vector3.forward * speed * Time.deltaTime;
}

// ✅ 올바른 방법 — 물리 엔진에 맡기기
void FixedUpdate()
{
    rb.AddForce(Vector3.forward * forceMagnitude, ForceMode.Force);
}
```

물리 계산에는 항상 `FixedUpdate()`를 사용하세요. 이는 고정된 시간 간격(기본값 0.02초)으로 실행되어 프레임 레이트에 영향을 받지 않습니다.

## 초보자들이 자주 빠지는 함정

| 문제점 | 원인 | 해결책 |
|---|---|---|
| 오브젝트가 바닥을 뚫음 | Collider가 없거나 너무 얇음 | Collider 추가; Continuous 감지 활성화 |
| 물리 연산 떨림 현상 | Update에서 Transform 이동 | FixedUpdate에서 `rb.MovePosition()` 또는 `AddForce` 사용 |
| 오브젝트가 멈추지 않음 | 항력(Drag) 부족 | `Rigidbody.drag`를 0보다 크게 설정 |
| FPS가 물리 속도에 영향을 줌 | Update 내에 로직 작성 | 물리 관련 코드를 FixedUpdate로 이동 |

## 다음 단계

기본적인 힘의 개념을 익혔다면, 마찰력과 탄성력을 제어하는 **Physics Materials**와 로프나 래그돌 같은 연결된 오브젝트를 만드는 **Joints**를 살펴보세요.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
