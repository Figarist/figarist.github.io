---
layout: post
title: "Unity에서 차지(Hold-to-Charge) 메커니즘 구현하기"
date: 2026-02-27 11:00:00 +0200
author: ihor
category: gamedev
tags: [unity, gamedev, csharp, mechanics]
lang: ko
permalink: /blog/unity-charge-mechanic/
description: "Unity에서 길게 눌러 충전하는 킥 메커니즘을 구현하는 심층 가이드입니다. 파워 커브, 파티클 효과, 그리고 가비지 컬렉션(GC) 할당을 줄이는 방법을 다룹니다."
excerpt: "마우스 다운 시 10% 파워부터 릴리스 시 풀 파워 발사까지 — 상세한 구현 방법을 확인해 보세요."
---

충전 메커니즘은 잘 만들면 손맛이 일품이지만, 그렇지 않으면 매우 답답하게 느껴집니다. 제가 스튜디오 프로젝트에 사용한 구현 방식을 소개합니다.

## 핵심 로직

목표: 마우스 버튼을 누르고 있는 동안 설정된 `holdDuration` 동안 파워를 10%에서 100%까지 충전합니다. 버튼을 떼면 발사합니다.

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

## 파워 커브의 중요성

`Mathf.Lerp`는 선형적으로 증가하여 다소 기계적인 느낌을 줍니다. 부드러운 가감속 느낌을 주려면 `Mathf.SmoothStep`을 사용해 보세요:

```csharp
float t     = Mathf.Clamp01(_holdTimer / holdDuration);
float power = Mathf.Lerp(0.1f, 1f, Mathf.SmoothStep(0f, 1f, t));
```

플레이어들은 본능적으로 "천천히 시작해서 빠르게 끝나는" 느낌을 기대합니다. 이 코드 한 줄만으로 메커니즘이 훨씬 의도적이고 자연스럽게 느껴집니다.

## Zero GC 팁

`ParticleSystem.Play()`와 `.Stop()`은 메모리 할당을 유발하지 않습니다. 다만 `Update` 내부에서 새로운 `Vector3` 값을 생성하는 것은 피해야 합니다. 필드 변수로 캐싱하여 사용하세요.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
