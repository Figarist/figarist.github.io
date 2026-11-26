---
layout: "post"
title: "LEGO WeDo 2.0 카탈로그: 초·중등 로봇 공학 수업을 위한 597개 조립 설명서 PWA"
description: "무료 비영리 LEGO WeDo 2.0 조립 설명서 카탈로그의 아키텍처와 교육 설계: 26개 카테고리 597종 모델, 지침 룰렛, 학생 진도 배지, 오프라인 PWA 지원."
last_modified_at: null
date: "2026-11-15 11:00:00 +0200"
lang: "ko"
page_id: "lego-wedo-2-0-instructions-catalog"
permalink: "/blog/lego-wedo-2-0-instructions-catalog/"
excerpt: "597종의 LEGO WeDo 2.0 로봇 조립 설명서를 외부 의존성 없는 빠른 오프라인 친화적 Friendly Arcade 웹 카탈로그로 구축한 교육용 프로젝트 소개."
category: "workshop"
categories:
  - "workshop"
tags:
  - "robotics"
  - "lego-wedo"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/cards/lego-wedo-2-0-instructions-catalog-ko.webp"
image_alt: "LEGO WeDo 2.0 카탈로그: 597종 무료 로봇 조립 설명서"
focus_keyword: "lego wedo 2.0 조립 설명서"
seo_title: "LEGO WeDo 2.0 카탈로그: 597종 무료 로봇 조립 설명서"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: true
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

초등 및 중학교 로봇 공학 교실에서 **LEGO Education WeDo 2.0 (45300)** 세트로 수업을 진행할 때, 강사들은 여러 폴더와 끊어진 Google Drive 링크 속에서 원하는 조립 PDF를 찾느라 수업 시간을 허비하기 쉽습니다. 반면 학생들은 로봇 썸네일을 한눈에 보고 곧바로 조립을 시작하기를 원합니다.

이러한 현장 불편을 해결하고 수업 준비 시간을 단축하기 위해, 우리는 [무료 비영리 LEGO WeDo 2.0 조립 설명서 카탈로그](https://sivochka.com/lego-catalog/)를 제작했습니다. **26개 테마 카테고리에 걸친 597종의 조립 설명서**를 외부 라이브러리 없는 초경량 PWA 웹 앱으로 제공합니다.

---

### 실제 교실 수업을 위한 26개 카테고리 · 597종 구성

[LEGO WeDo 2.0 카탈로그](https://sivochka.com/lego-catalog/)는 `data_localized.js`에 담긴 597개 모델을 시각적인 카드 그리드와 26개 카테고리 필터로 정리했습니다:
* **기초 공학 및 교과 연계**: 공식 LEGO WeDo 2.0 모델, [기본 메커니즘](https://sivochka.com/lego-catalog/en/c/mekhanizmy/), [로봇](https://sivochka.com/lego-catalog/en/c/roboty/), 그리고 스마트허브 없이 순수 기어·벨트 원리를 익히는 *무허브 모델* 카테고리.
* **학생 선호 테마**: 동물, [공룡](https://sivochka.com/lego-catalog/en/c/dynozavry/), 곤충, 조류, 우주 탐사, 자동차·특수 장비, 보행 로봇, 드로잉 봇 등.
* **4개 언어 실시간 전환**: 페이지 새로고침 없이 우크라이나어(`UK`), 영어(`EN`), 폴란드어(`PL`), 러시아어(`RU`) UI와 모델명을 즉시 전환합니다.

---

### 기술 아키텍처: Vanilla JS + Friendly Arcade

* **제로 디펜던시 & O(1) 즉시 검색**: 프레임워크 없이 순수 Vanilla JavaScript(`app.js`, `store.js`, `translations.js`, `roulette.js`)와 사전 계산된 검색 인덱스 및 `300ms` 디바운스 검색을 적용하여 구형 교실 태블릿에서도 부드럽게 동작합니다.
* **수업용 설명서 룰렛(Instructions Roulette)**: 다음 프로젝트를 고르기 어려워하는 학생을 위해 활성화된 필터 범위 내에서 무작위 로봇을 뽑아주는 룰렛 기능을 제공합니다.
* **완료 체크, 별점 & 데이터 자동 복구(`LocalStorage`)**: **«조립 완료! ✅»** 기록, 즐겨찾기, 성취 배지가 브라우저 로컬 스토리지에 저장되며 `LegoStore.healData()`가 변경된 경로를 자동 마이그레이션하여 학생 기록을 보호합니다.
* **WCAG AAA 고대비 접근성**: [Friendly Arcade](https://github.com/Figarist/friendly-arcade) 디자인 토큰(`--on-green`, `--on-yellow`), 모바일 `44px` 이상 터치 영역, `3px` 시안 키보드 포커스 링, `prefers-reduced-motion` 지원을 준수합니다.
* **오프라인 App Shell & LEGO® Fair Play 준수**: Service Worker(`sw.js`)는 앱 셸만 캐싱하고 외부 Google Drive PDF 링크는 캐싱하지 않으며, 모든 상표권 고지는 [법적 고지 및 LEGO® Fair Play 페이지](https://sivochka.com/lego-catalog/legal.html)에 명시되어 있습니다.

웹 브라우저에서 바로 전체 카탈로그를 열어보세요:  
👉 **[LEGO WeDo 2.0 조립 설명서 카탈로그 열기 (597종)](https://sivochka.com/lego-catalog/)**

Figarist 스튜디오의 다른 무료 브라우저 교육 및 개발 도구:
* **[3D 클럽 스튜디오 — 서포트 없는 학교 3D 프린터 전용 절차적 생성기](https://sivochka.com/3d-club-studio/)**
* **[조용한 교실 (Quiet Class) — 원거리 교실 웹캠용 Web Audio DSP 소음 측정기](https://sivochka.com/bouncy/)**
* **[OGCruncher — 무료 온라인 오디오 비트크러셔 & 게임 SFX 최적화 도구](https://sivochka.com/OGCruncher/)**

[Unity 게임 개발](https://sivochka.com/ko/tutoring/unity/), C#, Python, [Scratch](https://sivochka.com/ko/tutoring/scratch/) 또는 3D 모델링 1:1 온라인 수업에 관심이 있으신가요?  
👉 **[이호르 시보치카의 1:1 개인 튜터링 자세히 보기](https://sivochka.com/ko/tutoring/)**
