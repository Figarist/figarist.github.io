---
title: "Wear OS 게임 개발: Zero-GC 마인드셋"
author: ihor
tags: [wearos, unity, performance, gamedev, intermediate]
lang: ko
permalink: /education/wearos-zero-gc-mindset/
level: intermediate
sort_order: 2
description: "제한된 스마트워치 하드웨어에서 프레임 레이트를 떨어뜨리는 가비지 컬렉터(GC) 스파이크 없이 Wear OS용 게임을 빌드하는 방법입니다."
excerpt: "512MB RAM, GC 정지를 허용하지 않는 환경. Wear OS 게임을 부드럽게 구동하는 마인드셋을 소개합니다."
---

Wear OS는 약 512MB의 RAM, 작은 CPU 코어, 그리고 아주 적은 배터리 용량이라는 혹독한 제약 조건을 가지고 있습니다. 잘못된 위치에 사용된 `new` 키워드 하나가 40mm 디스플레이에서 사용자가 즉각적으로 느낄 수 있는 GC 정지를 유발할 수 있습니다.

## Wear OS에서 GC가 중요한 이유

데스크톱용 Unity 대상에서는 GC 정지가 거의 느껴지지 않습니다. 하지만 60Hz로 작동하는 Wear OS에서는 프레임 예산이 16ms에 불과하여, 약 4ms 이상의 GC 정지가 발생하면 눈에 띄는 끊김 현상이 발생합니다.

주요 원인은 거의 항상 다음과 같습니다:

- `Update()` 내부의 `new List<T>()` 또는 `new T[]`
- 빈번하게 호출되는 경로에서의 `string.Format()` 또는 문자열 결합
- 런타임에서의 LINQ 호출 (`Where`, `Select`, `FirstOrDefault`)
- 값 타입을 `object`로 박싱(Boxing)하는 행위

## 오브젝트 풀링(Object Pooling): 핵심 패턴

GameObject를 생성(Instantiate)하고 파괴(Destroy)하는 대신, 시작 시 풀을 미리 할당하고 이를 재사용하세요.

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
        return Instantiate(prefab); // 풀이 부족할 때만 예외적으로 생성
    }

    public void Return(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

시작 시 풀이 채워진 후에는 빈번하게 호출되는 경로에서 메모리 할당이 발생하지 않습니다.

## 문자열 캐싱 패턴

점수나 타이머 같은 동적 텍스트를 표시할 때는 문자열을 캐싱하세요:

```csharp
// ❌ 매 프레임마다 새로운 문자열을 할당함
scoreLabel.text = "Score: " + score;

// ✅ 점수가 변경될 때만 할당함
if (score != _cachedScore)
{
    _cachedScore = score;
    scoreLabel.text = $"Score: {score}";
}
```

## 기기에서 프로파일링하기

Unity 프로파일러의 **Memory** 섹션 아래에 있는 **GC Alloc**은 필수적으로 확인해야 할 지표입니다. 스크립트 이름으로 필터링하여 `Update()` 함수의 안정적인 상태에서 **0 바이트**를 목표로 하세요.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
