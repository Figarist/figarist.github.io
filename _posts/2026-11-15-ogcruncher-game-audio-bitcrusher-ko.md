---
layout: "post"
title: "OGCruncher: 인디 게임과 Wear OS를 위한 무료 브라우저 오디오 비트크러셔 & 배치 최적화 도구"
description: "Unity, Godot, WebGL, Wear OS 게임 오디오를 위해 OfflineAudioContext와 Web Worker로 로컬에서 비트 크러싱, 샘플레이트 축소, OGG/WAV/MP3 일괄 변환을 수행하는 OGCruncher 아키텍처 소개."
last_modified_at: "2026-11-21 09:20:00 +0200"
date: "2026-11-15 10:00:00 +0200"
lang: "ko"
page_id: "ogcruncher-game-audio-bitcrusher"
permalink: "/blog/ogcruncher-game-audio-bitcrusher/"
excerpt: "Unity, Godot, WebGL, Wear OS 게임 오디오를 위해 브라우저에서 로컬로 비트 크러싱, 샘플레이트 축소, OGG/WAV/MP3 일괄 변환을 수행하는 OGCruncher 아키텍처 소개."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/cards/ogcruncher-game-audio-bitcrusher-ko.webp"
image_alt: "OGCruncher: 무료 온라인 오디오 비트크러셔 & 게임 사운드 최적화"
focus_keyword: "온라인 오디오 비트크러셔"
seo_title: "OGCruncher: 무료 온라인 오디오 비트크러셔 & 게임 사운드 최적화"
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

**Wear OS** 스마트워치, **WebGL** 웹 게임 또는 모바일 인디 게임을 개발할 때 사운드 디자이너와 개발자는 항상 두 가지 과제를 동시에 해결해야 합니다: **작은 빌드 용량**과 **강렬한 레트로 음색**입니다. 24비트 / 48kHz 스튜디오 WAV 에셋은 앱 크기를 빠르게 키우며, 일반 클라우드 변환기는 미공개 게임 오디오 파일을 외부 서버에 업로드해야 하는 보안 부담을 줍니다.

이 문제를 해결하기 위해 우리는 `OfflineAudioContext`, `Float32Array` DSP 및 전용 Web Worker를 기반으로 브라우저 내에서 100% 로컬로 작동하는 무료 크리에이티브 비트크러셔 및 배치 변환기 [OGCruncher](https://sivochka.com/OGCruncher/)를 개발했습니다.

---

### 게임 SFX에서 일반 압축보다 크리에이티브 비트 크러싱이 유리한 이유

* **제로 레이턴시 8비트 / 16비트 PCM WAV**: 짧은 UI 클릭, 타격음, 발소리는 `16,000–22,050 Hz` 모노 PCM WAV로 내보낼 때 CPU 디코딩 지연 없이 즉시 재생됩니다.
* **의도적인 로파이(Lo-Fi) 질감**: 비트 심도(`1–16비트`)와 샘플레이트(`4,000–48,000 Hz`)를 직접 조절해 일반 녹음을 NES 칩튠이나 Amiga 500 빈티지 샘플러 사운드로 바꿀 수 있습니다.
* **100% 로컬 브라우저 프라이버시**: 디코딩, 필터링, 양자화 및 인코딩이 모두 브라우저 메모리 내에서만 실행되므로 어떤 오디오 파일도 서버로 전송되지 않습니다.

---

### OGCruncher DSP 파이프라인 구조

미리듣기와 내보내기 결과가 달라지는 일부 도구와 달리, [OGCruncher](https://sivochka.com/OGCruncher/)는 Dry/Wet A/B 프리뷰와 배치 내보내기 사이에 동일한 오프라인 렌더 계약을 공유합니다:

#### 1. `OfflineAudioContext` 프리 필터링 및 Speed / Pitch 조절
오디오는 선택한 출력 샘플레이트(`4,000–48,000 Hz`)로 리샘플링되고 모노 또는 스테레오로 믹스된 뒤, 속도/피치(`0.5×–2.0×`) 스케일링과 3단계 Web Audio 필터 체인을 거칩니다:
* **HPF (`20–1000 Hz`)**: 불필요한 저역대 럼블 노이즈 제거.
* **LPF (`500–20000 Hz`)**: 고역대 롤오프를 통한 따뜻한 빈티지 스피커 질감 구현.
* **Bass Boost (`80 Hz`, `0…+15 dB`)**: 비트 축소 후 저역대 펀치감 보강.

#### 2. `Float32Array` Crush 파이프라인 (`js/dsp-core.js` & Web Worker)
1. **비유한 샘플 정제 및 노이즈 플로어**: `NaN`/`Infinity` 값을 안전하게 정제하고 선택적으로 테이프 스타일 노이즈(`0–0.05`)를 추가합니다.
2. **Crush 모드 (DC 제거 + 소프트 익스팬더 + TPDF 디더 + 2탭 안티앨리어싱)**: DC 오프셋을 제거하고 `sign(x) * |x|^1.15` 익스팬더를 적용한 뒤, `1–16`비트로 양자화(선택적 TPDF 삼각 디더링 포함) 및 스무딩을 수행합니다.
3. **Grit 새추레이션 (`tanh`) & 링크드 -1 dBFS 정규화**: `tanh(x * drive) / tanh(drive)` 하모닉 드라이브(`1.0–10.0`) 후 기본 `-1 dBFS`(OGG/MP3용 헤드룸, `0 dBFS` 전환 가능)로 스테레오 밸런스를 유지하면서 피크를 정규화합니다.

#### 3. 멀티 포맷 Web Worker 및 Lanczos-3 MP3 리샘플링
대기열의 각 파일은 전용 Web Worker에서 선택한 포맷만 독립 인코딩됩니다(OGG, WAV, MP3를 개별적으로 켜고 끌 수 있으며 최소 한 개는 항상 켜져 있습니다):
* **PCM WAV**: `1–8비트` 설정 시 부호 없는 8비트 PCM WAV를, `9–16비트` 설정 시 부호 있는 16비트 PCM WAV를 RIFF 워드 정렬과 함께 생성합니다.
* **Ogg Vorbis (`.ogg`)**: Unity, Godot, WebGL용 경량 배경 루프 및 사운드 에셋을 위해 요청한 샘플레이트 그대로 인코딩합니다.
* **MP3 (`128 kbps`)**: `4,000 Hz`나 `28,000 Hz` 같은 비표준 MPEG 샘플레이트 선택 시 창 함수 기반 **Lanczos-3** 보간법으로 가장 가까운 유효 MPEG 레이트(`8,000–48,000 Hz`)로 자동 리샘플링합니다.

---

### 주요 워크플로우 기능

* **Simple & Advanced 모드 + 프리셋**: *TINY*, *LOW*, *MEDIUM*, *HIGH* 간편 단계와 *LO-Q MODE*, *NES 8-BIT*, *AMIGA 500*, 사용자 정의 *MY PRESET*을 지원합니다.
* **실시간 Dry/Wet A/B 전환 & FFT 스펙트럼**: `C` 단축키로 원본(Dry)과 처리음(Wet)을 즉시 비교하고 RMS/Peak/Duration 수치를 확인하세요.
* **일괄 ZIP 다운로드 & 공유 링크**: 처리된 전체 SFX 묶음을 `ogcruncher_batch.zip` 하나로 내려받거나 URL 해시 링크로 팀원과 DSP 설정을 공유할 수 있습니다.

지금 웹 브라우저에서 바로 실행해 보세요 (PWA 오프라인 지원):  
👉 **[OGCruncher 온라인 열기](https://sivochka.com/OGCruncher/)**

Figarist 스튜디오의 다른 무료 웹 도구도 살펴보세요:
* **[조용한 교실 (Quiet Class) — 원거리 교실 웹캠용 Web Audio DSP 소음 측정기](https://sivochka.com/bouncy/)**
* **[3D 클럽 스튜디오 — 서포트 없는 학교 3D 프린터 전용 절차적 생성기](https://sivochka.com/3d-club-studio/)**
* **[LEGO WeDo 2.0 로봇 공학 조립 설명서 카탈로그](https://sivochka.com/lego-catalog/)**

Unity 게임 개발, C#, Python, Scratch 또는 3D 모델링 1:1 온라인 수업에 관심이 있으신가요?  
👉 **[이호르 시보치카의 1:1 개인 튜터링 자세히 보기](https://sivochka.com/ko/tutoring/)**
