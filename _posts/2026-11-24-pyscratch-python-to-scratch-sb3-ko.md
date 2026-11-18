---
layout: "post"
title: "pyScratch: 브라우저에서 Python으로 Scratch 3.0 프로젝트 만들기"
description: "pyScratch 소개: Python ↔ Scratch 3.0(.sb3) 양방향 변환, 실시간 Canvas 2D 무대, 클론을 지원하는 무료 브라우저 IDE입니다."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "ko"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "pyScratch 소개: Python 코드를 실제 Scratch 3.0(.sb3) 블록으로 바꾸고, 반대로도 변환하는 무료 브라우저 편집기입니다."
category: "workshop"
categories:
  - "workshop"
tags:
  - "scratch"
  - "python"
  - "education"
  - "tools"
author: "ihor"
image: null
image_alt: null
focus_keyword: "Python으로 Scratch 온라인"
seo_title: "pyScratch: 브라우저 Python ↔ Scratch 3.0 IDE"
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

[Scratch 수업](https://sivochka.com/ko/tutoring/scratch/)을 마친 많은 학생이 진짜 텍스트 코드인 [Python](https://sivochka.com/ko/tutoring/python/)으로 넘어가고 싶어 하지만 같은 벽에 부딪힙니다. 일반적인 Python에는 스프라이트, 코스튬, 즉각적인 시각화가 있는 무대가 없기 때문입니다.

이 전환을 부드럽고 눈에 보이게 만들기 위해 **[pyScratch](https://sivochka.com/pyScratch/en/)**를 만들었습니다. 설치 없이 브라우저에서 바로 쓰는 무료 온라인 IDE입니다.

## pyScratch로 할 수 있는 일

1. **양방향 컴파일러 및 디컴파일러 (`Python ↔ .sb3`)**  
   `.sb3` 파일을 브라우저 창에 끌어다 놓으면 pyScratch가 프로젝트를 풀어 Scratch 3.0 블록을 읽기 쉬운 Python DSL로 바꿔 줍니다. 로직을 코드로 편집한 뒤 수정된 `.sb3` 파일로 다시 저장할 수 있습니다.
2. **실시간 Canvas 2D 무대 (`480×360`)**  
   브라우저에서 바로 코드를 실행하고 테스트할 수 있습니다. 클론(스프라이트별 로컬 변수 `self.var`가 분리된 최대 300개), `@warp`("화면 새로 고침 없이 실행"), 레이어, 그래픽 효과, 펜 그리기, `.sb3`의 소리 재생을 지원합니다.
3. **간편한 코드 공유와 임베드**  
   **공유** 버튼은 스크립트를 짧은 `?code=...` 링크로 만들어 주고, `?embed=1` 모드를 쓰면 예제를 학습 페이지에 삽입할 수 있습니다.

## 어떤 사람에게 맞을까요

- Scratch로 이미 자신 있게 게임을 만들고, 같은 반복문, 조건문, 클론이 Python에서는 어떻게 보이는지 궁금한 **9~14세 학생**.
- 아이의 `.sb3` 프로젝트를 열어 로직을 텍스트로 확인하거나 링크로 대화형 과제를 내고 싶은 **교사와 학부모**.

지금 브라우저에서 바로 사용해 보세요: **[pyScratch IDE 열기 ↗](https://sivochka.com/pyScratch/en/)** (영어 인터페이스)

시각적 블록에서 Python이나 Unity C#까지 체계적으로 배우고 싶다면 [1:1 수업](https://sivochka.com/ko/tutoring/)을 확인해 보세요.
