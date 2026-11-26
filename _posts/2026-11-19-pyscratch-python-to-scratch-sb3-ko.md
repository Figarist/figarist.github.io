---
layout: "post"
title: "스크래치 파이썬 변환: 테스트 버전 pyScratch를 소개합니다"
description: "Scratch .sb3 파일을 Python 코드로 열고 다시 Scratch로 저장하는 무료 테스트 버전 pyScratch입니다. 할 수 있는 일과 한계, 어떤 아이에게 맞는지 정리했습니다."
last_modified_at: null
date: "2026-11-19 10:00:00 +0200"
lang: "ko"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "아이가 자기 Scratch 게임을 열어 Python 코드로 볼 수 있도록 pyScratch를 만들었습니다. 아직 테스트 버전이라 되는 것과 아직 안 되는 것을 함께 적었습니다."
category: "workshop"
categories:
  - "workshop"
tags:
  - "scratch"
  - "python"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-pong.webp"
image_alt: "pyScratch 화면(우크라이나어 인터페이스): 「핑퐁」 게임이 Python 코드로 열려 있고 옆에 Scratch 무대가 보입니다"
focus_keyword: "스크래치 파이썬 변환"
seo_title: "스크래치 파이썬 변환: 내 Scratch 게임을 코드로 열기"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: false
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

Scratch와 Python 사이에는 늘 큰 간격이 있었습니다. 아이를 Scratch에서 더 어려운 단계로 최대한 부드럽게 옮겨 줄 도구가 있으면 좋겠다는 생각은 꽤 오래전부터 해 왔습니다. 이제 그 도구가 생겼습니다. 브라우저에서 바로 스크래치 파이썬 변환을 해 주는 [pyScratch](https://sivochka.com/pyScratch/en/)입니다.

비슷한 접근은 Minecraft Education에서만 봤습니다. 다만 그건 다른 이야기입니다.

먼저 알려 드릴 점이 있습니다. pyScratch에는 아직 한국어 화면이 없습니다. 인터페이스와 컴파일러 오류 메시지는 영어, 우크라이나어, 러시아어로 제공됩니다. 아래 링크는 모두 영어 버전으로 연결했습니다.

## Scratch는 장난감이 아닙니다

Scratch를 초등학교 때 수업 시간에 잠깐 해 본 프로그램으로 기억하는 분이 많습니다. 그래서 장난감처럼 여기기도 하는데, 저는 동의하지 않습니다. Scratch는 강력한 도구이고, 그 안에서 만들 수 있는 것들을 보면 지금도 감탄하게 됩니다.

그래서 pyScratch는 "블록은 버리고 이제 진지한 걸 배우자"고 말하지 않습니다. 아이가 Scratch로 이미 만든 것을 가져와서 다른 언어로 보여 줄 뿐입니다.

## Python에서 아이가 걸려 넘어지는 곳

Scratch를 해 본 학생은 이미 논리를 갖고 있습니다. 반복문, 조건문, 변수를 이해합니다. 어려운 건 다른 부분입니다. 명령어 이름이 다르고, 그걸 전부 손으로 쳐야 합니다. 타이핑할 게 정말 많습니다.

Scratch에서는 필요한 블록이 팔레트에 있어서 끌어다 놓기만 하면 됩니다. Python에서는 이름을 기억하고, 괄호와 콜론을 쓰고, 들여쓰기도 맞춰야 합니다.

pyScratch는 바로 이 간격을 메우려고 합니다. 아이는 익숙한 블록과 텍스트를 나란히 보면서 조금씩 텍스트에 익숙해집니다.

## 스크래치 파이썬 변환, 지금 되는 것

아직은 꽤 단순한 도구지만 기본 흐름은 이미 작동합니다. pyScratch의 메뉴 이름은 영어 화면 기준으로 적었습니다.

1. Scratch에서 「파일 → 컴퓨터에 저장하기」로 프로젝트를 저장합니다. `.sb3` 파일이 만들어집니다.
2. pyScratch에서 **File → Open .sb3**를 누르거나 파일을 페이지 위로 끌어다 놓습니다.
3. 스프라이트나 무대를 고릅니다. 스크립트가 Python 스타일 코드로 나타나고, **Scratch Blocks** 탭에서는 같은 스크립트를 블록 트리로 볼 수 있습니다. 블록을 클릭하면 코드의 해당 줄로 이동합니다.
4. 코드를 고치고 초록 깃발(또는 Ctrl+Enter)을 누릅니다. 페이지 안의 480×360 무대에서 프로젝트가 실행됩니다.
5. **File → Save .sb3**로 결과를 저장하고, 저장한 파일을 Scratch의 「파일」 메뉴에서 엽니다.

반대 방향도 됩니다. 코드를 처음부터 쓰면 pyScratch가 그 코드로 Scratch 블록을 만들어 줍니다. 아래는 무대를 돌아다니다가 벽에 닿으면 튕기는 스프라이트입니다([pyScratch 언어 레퍼런스](https://github.com/Figarist/pyScratch/blob/main/docs/DSL_REFERENCE.md)에 있는 예제입니다).

```python
@when_flag_clicked
def patrol():
    set_rotation_style("left-right")
    goto(0, 0)
    glide_to(0.5, "random")
    point_in_direction(90)
    for i in range(60):
        move(8)
        if_on_edge_bounce()
        wait(0.03)
```

여기서 함수 하나가 Scratch 블록 하나에 해당합니다. 데코레이터 `@when_flag_clicked`는 「깃발 클릭했을 때」 블록이 되고, `for i in range(60):`은 「60 번 반복하기」처럼 안쪽을 60번 실행합니다. 이걸 블록으로 직접 조립해 본 아이라면 어느 줄이든 알아볼 수 있습니다.

모든 작업은 브라우저 안에서 이루어집니다. `.sb3` 파일은 서버로 올라가지 않고, 회원 가입도 필요 없습니다. 당장 열어 볼 프로젝트가 없다면 핑퐁, 미로, 클리커 등 아홉 가지 준비된 템플릿이 있습니다. pyScratch 코드는 공개되어 있고, [GitHub 저장소](https://github.com/Figarist/pyScratch)는 MIT 라이선스입니다.

## 수업에서는 아직 보여 주는 용도로

지금은 pyScratch를 시각 자료로 먼저 소개하고 있습니다. 아이가 만든 스크립트를 블록으로 보여 주고, 옆에 같은 스크립트를 텍스트로 보여 줍니다. 아이들이 좋아합니다.

구체적인 사례는 아직 없습니다. 도구가 아주 새것이기 때문입니다.

## 테스트 버전의 한계

pyScratch는 지금 테스트 모드이고, 아직 Scratch와 1:1로 똑같지는 않습니다. 미리 알아 두시면 좋은 점은 다음과 같습니다(전체 목록은 [편집기 아래 안내](https://sivochka.com/pyScratch/en/#guide)에 있습니다).

- 완전한 Python이 아닙니다. `import`, `class`, `return`, `break`, `continue`, `lambda`, `try`/`except`, f-문자열 등 일부 문법은 지원하지 않고, 쓰면 컴파일러가 바로 알려 줍니다(한국어 대신 영어 메시지로 보시면 됩니다). 일반 Python 인터프리터에서는 이 코드가 실행되지 않습니다.
- 변환기가 아직 모르는 블록(예: 비디오 감지, Makey Makey)이 들어 있는 스크립트는 프로젝트 안에 그대로 보존되지만, 편집기에는 주석으로만 보입니다. 코드로 고칠 수는 없습니다.
- pyScratch가 새로 만드는 블록에 붙어 있던 주석은 저장할 때 사라집니다.
- pyScratch의 무대는 단순화한 시뮬레이터라서 닿기 판정 같은 일부 동작이 Scratch와 조금 다를 수 있습니다. 「어안 렌즈」와 「소용돌이」 효과는 그려지지 않습니다. 최종 결과는 Scratch에서 확인해 주세요.
- Scratch 3.0 파일(`.sb3`)만 지원합니다. 예전 `.sb2` 파일은 먼저 Scratch 3.0에서 열어 다시 저장해 주세요.

## 어떤 아이에게 맞을까요

9세 이상 아이들이고, 크게 두 부류가 있습니다. 한쪽은 그냥 할 수 있으니까 자기 Scratch 게임을 Python으로 써 보고 싶은 호기심 많은 "괴짜"들입니다. 다른 한쪽은 이미 Scratch가 좁게 느껴져서 더 어려운 단계로 가는 디딤돌이 필요한 아이들입니다.

아이가 텍스트 코드로 넘어갈 준비가 됐는지 잘 모르겠다면 [Scratch와 Python 중 무엇을 할지, 넘어갈 때를 알아보는 법](https://sivochka.com/ko/blog/scratch-vs-python-for-kids/)부터 읽어 보세요.

## 내 게임으로 직접 해 보세요

아이가 만든 Scratch 게임을 `.sb3`로 저장하고 [pyScratch](https://sivochka.com/pyScratch/en/)에서 열어 Python으로는 어떻게 보이는지 확인해 보세요. 반복문 안의 숫자 하나를 바꿔 실행하고, 다시 저장한 뒤 Scratch에서 열어 보면 됩니다.

그다음 블록의 도움 없이 처음부터 진짜 Python을 써 보고 싶어진다면, 그게 바로 [Python 1:1 수업](https://sivochka.com/ko/tutoring/python/)에서 하는 일입니다. 아직 블록 코딩을 막 시작하는 단계라면 [Scratch 1:1 수업](https://sivochka.com/ko/tutoring/scratch/)도 준비되어 있습니다.
