---
layout: "post"
title: "OGCruncher는 DAW가 아니지만 게임 SFX에 Audacity는 과하다"
description: "짧은 게임 효과음과 레트로 음악(20MB→4MB) 일괄 처리에서 OGCruncher가 Audacity보다 빠른 이유와 DAW가 여전히 필요한 영역."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "ko"
page_id: "ogcruncher-vs-audacity-for-game-sfx"
permalink: "/blog/ogcruncher-vs-audacity-for-game-sfx/"
excerpt: "게임 효과음과 배경음악 용량을 20MB에서 4MB로 줄일 때 브라우저 도구 OGCruncher와 Audacity의 역할을 솔직하게 비교합니다."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "scratch"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/ogcruncher-card.png"
image_alt: "OGCruncher — 게임용 브라우저 오디오 비트크러셔 및 OGG, WAV, MP3 일괄 변환기"
focus_keyword: "게임 SFX Audacity"
seo_title: "게임 SFX Audacity 대신 OGCruncher: 20MB를 4MB로 줄이기"
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

짧은 효과음을 일괄 정리하거나 게임 오디오 용량을 줄일 때 게임 SFX Audacity 작업은 생각보다 번거롭습니다. 제 생각은 단순합니다. 같은 설정으로 묶음 처리를 하거나 빌드 크기를 줄이면서 레트로 감성을 입히는 일이라면 Audacity를 열 필요가 없고 브라우저에서 한 번에 끝낼 수 있습니다.

이번 [OGCruncher](/ko/blog/ogcruncher-game-audio-bitcrusher/) 업데이트는 우크라이나어 인터페이스와 Scratch 프리셋이 없어서 불편했던 점에서 출발했고, 여기에 자잘한 수정들이 쌓여 큰 업데이트가 되었습니다.

## 20MB 음악을 4MB로 줄인 경험과 배치 속도 측정

제 게임에서는 빌드 용량을 줄이면서 레트로 분위기를 내기 위해 주로 음악 파일을 OGCruncher에 돌렸습니다. 20MB 안팎이던 오디오 파일을 4MB 수준까지 약 5분의 1로 줄일 수 있었습니다.

짧은 효과음에서는 묶음 처리 속도가 강점입니다. OGCruncher 핵심 처리 경로를 로컬에서 테스트한 결과(1초짜리 22050Hz 모노 파일 20개에 무음 자르기, 8비트 크러시, 정규화, WAV 인코딩 적용) 코어 처리와 인코딩은 약 43ms 만에 끝났습니다(실제 브라우저에서는 입력 디코딩과 선택적 OGG·MP3 인코딩 시간이 더해집니다). [Audacity 매크로(Macros)](https://manual.audacityteam.org/man/macros.html)도 일괄 처리를 지원하지만 먼저 매크로를 직접 구성하고 저장해 테스트해야 합니다.

## 게임 SFX Audacity가 과한 경우와 꼭 필요한 경우

[OGCruncher](https://sivochka.com/OGCruncher/)는 믹싱용 편집기가 아니라 브라우저 안에서 로컬로 작동하는 크리에이티브 레트로 프로세서입니다. 두 도구의 역할은 분명히 나뉩니다.

| 오디오 작업 | 추천 도구 | 이유 |
| --- | --- | --- |
| 빌드 축소와 레트로 감성을 위한 음악·SFX 일괄 처리 | OGCruncher | 같은 설정으로 전체 묶음을 한 번에 변환 |
| Scratch 3.0 게임용 사운드 준비 | OGCruncher, FOR SCRATCH | WAV만 출력하고 10MB 초과 시 즉시 경고 |
| Unity·Godot 에셋 연결을 유지하며 SFX 교체 | OGCruncher, KEEP NAMES | `.meta`, `.import`와 무음 자르기 세부 설명은 [Unity SFX 가이드](/ko/blog/ogcruncher-unity-sfx-batch-keep-names/) 참고 |
| 멀티트랙 편집, 곡 중간 구간 자르기 | Audacity 또는 DAW | OGCruncher에는 파형 탐색(waveform seeking)이 없음 |
| 색채 없는 투명 변환, LUFS 음량 측정 | Audacity 또는 DAW | OGCruncher는 의도적으로 음색을 바꾸며 LUFS 미터가 없음 |

## 우크라이나어 `/uk/` 페이지와 FOR SCRATCH 버튼

영어 페이지와 함께 우크라이나어 전용 페이지 [`sivochka.com/OGCruncher/uk/`](https://sivochka.com/OGCruncher/uk/)가 추가되었습니다. Scratch로 게임을 만드는 학생들을 위해 넣은 **FOR SCRATCH** 버튼은 한 번의 클릭으로 OGG와 MP3를 끄고 WAV만 남깁니다.

Scratch 3.0은 WAV와 MP3만 불러올 수 있고 OGG는 지원하지 않으며, 소리 파일 하나당 10MB 제한이 있습니다. OGG가 꺼진 상태에서 변환된 WAV나 MP3가 10MB를 넘으면 처리 로그가 바로 경고를 띄워 저장 실패를 미리 막아 줍니다.

## 솔직한 UX 한계

기능적으로는 제 작업을 충분히 해결하지만, 인터페이스는 아직 원하는 만큼 직관적이지 않고 UX가 아쉽습니다. 이 부분은 향후 업데이트에서 100% 다시 다듬을 계획입니다.

브라우저 도구 특성상 **불러온 파일과 변환 결과는 브라우저 메모리에만 머물고 새로고침하면 사라지므로** 결과를 바로 내려받아야 합니다.

[OGCruncher](https://sivochka.com/OGCruncher/)를 열어 효과음 몇 개나 음악 파일을 넣어 보고 데스크톱 편집기 없이 용량이 얼마나 줄어드는지 확인해 보세요. 아이가 저장 오류 없이 자신만의 Scratch 게임을 만들어 보고 싶다면 [Scratch 1:1 수업](/ko/tutoring/scratch/)도 살펴보실 수 있습니다.
