---
layout: "post"
title: "Unity SFX 일괄 교체: .meta 파일 깨지지 않게 바꾸기"
description: "OGCruncher의 KEEP NAMES, 무음 자르기(-48 dBFS), -1 dBFS 정규화로 Unity .meta와 Godot .import 연결을 유지하며 SFX를 일괄 교체하는 방법."
last_modified_at: null
date: "2026-11-22 10:00:00 +0200"
lang: "ko"
page_id: "ogcruncher-unity-sfx-batch-keep-names"
permalink: "/blog/ogcruncher-unity-sfx-batch-keep-names/"
excerpt: "Unity와 Godot에서 .meta·.import 참조를 깨뜨리지 않고 짧은 게임 효과음을 한 번에 다듬어 교체하는 OGCruncher 사용법."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/ogcruncher-card.png"
image_alt: "OGCruncher — 게임용 브라우저 오디오 비트크러셔 및 OGG, WAV, MP3 일괄 변환기"
focus_keyword: "Unity SFX 일괄 교체"
seo_title: "Unity SFX 일괄 교체: .meta 유지하며 사운드 바꾸기"
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

발소리와 타격음 20개를 변환기에 돌린 뒤 `Assets/` 폴더에 다시 넣었는데, Unity가 전부 새 에셋으로 인식해 버리는 일이 자주 생깁니다. 변환기가 파일 이름 뒤에 접미사를 붙이면서 기존 `.meta` 파일과의 연결이 끊어졌기 때문입니다. Unity SFX 일괄 교체에서 `.meta`를 유지하려면 파일 이름과 확장자가 기존과 정확히 같아야 합니다.

[OGCruncher](https://sivochka.com/OGCruncher/)에 새로 들어간 KEEP NAMES 옵션과 포맷 선택, 무음 자르기, `-1 dBFS` 정규화 기본값을 쓰면 이 과정을 한 번에 끝낼 수 있습니다.

## Unity와 Godot가 오디오 참조를 유지하는 방식

Unity는 에셋의 고유 ID와 임포트 설정을 파일 옆 `.meta` 파일에 저장하며, 짝이 맞는 `.meta`가 없는 파일은 새 에셋으로 취급합니다([Unity 공식 문서](https://docs.unity3d.com/Manual/AssetMetadata.html)). 따라서 이름뿐 아니라 확장자까지 일치해야 기존 참조가 유지됩니다. `hit.wav`를 `hit.ogg`로 바꾸면 Unity 입장에서는 다른 파일입니다.

OGCruncher의 PREVIEW·CRUNCH 버튼 위에서 필요한 포맷(`OGG`, `WAV`, `MP3`)만 남기고 나머지를 끌 수 있습니다. 최소 한 개 포맷은 항상 켜져 있습니다.

| 엔진 | 선택할 포맷 | 파일명 옵션 | 덮어쓰기 결과 |
| --- | --- | --- | --- |
| Unity | `Assets/`에 이미 들어 있는 것과 같은 포맷(`WAV`, `OGG`, `MP3`) | KEEP NAMES 켜기 | 기존 `.meta`와 `AudioSource` 참조가 유지됨 |
| Godot | 짧게 반복되는 SFX는 `WAV`, 긴 사운드는 `Ogg Vorbis` ([Godot 공식 문서](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_audio_samples.html)) | KEEP NAMES 켜기 | 기존 `.import`(Godot 4의 `uid` 포함)가 유지됨 |

## Unity SFX 일괄 교체 7단계

모든 오디오 처리는 브라우저 메모리 안에서 로컬로 진행되며 서버로 업로드되지 않습니다.

1. [OGCruncher](https://sivochka.com/OGCruncher/)를 열고 짧은 효과음 폴더를 드래그해 넣습니다.
2. 내보내기 포맷에서 프로젝트에 이미 쓰고 있는 포맷 하나만 남기고 나머지를 끕니다.
3. **KEEP NAMES**를 켭니다. 이 옵션을 끄면 `_crunched_<bits>bit_<rate>hz` 접미사가 붙지만, 켜면 원래 파일명이 유지됩니다(한 대기열에 같은 이름이 겹칠 때만 `-2`, `-3`이 붙습니다). **확장자도 기존 파일과 같아야 Unity와 Godot가 `.meta`나 `.import`를 그대로 이어받습니다.**
4. 소리 앞뒤에 빈 구간이 있다면 TRIM SILENCE를 켭니다.
5. 기본값으로 켜진 `-1 dB` 정규화 상한을 그대로 둡니다(`0 dBFS`가 꼭 필요하면 직접 전환할 수 있습니다).
6. PREVIEW로 소리를 듣고 `C` 키로 ORIGINAL / WET을 비교합니다. 프리뷰가 준비되면 `L`로 LOOP를 켜고, 컨트롤을 클릭한 뒤에도 `Space`로 바로 재생할 수 있습니다.
7. CRUNCH를 누른 뒤 DOWNLOAD ALL (.ZIP) 버튼으로 `ogcruncher_batch.zip`을 받아 프로젝트 폴더에 덮어씌웁니다.

## 어택을 살리는 무음 자르기와 `-1 dBFS` 여유

TRIM SILENCE는 `-48 dBFS`보다 큰 신호 구간을 찾고 양쪽에 `2 ms` 여유를 남깁니다. 처리 후에는 `1 ms` 페이드인과 `4 ms` 페이드아웃을 적용합니다. `1 ms` 페이드인이 `2 ms` 여유 구간 안에 들어가므로 타격음이나 클릭음의 첫 어택 피크가 깎이지 않으면서 끝부분 틱 소음이 사라집니다.

프리뷰에서도 ORIGINAL 분기가 처리된 음과 같은 구간으로 잘리기 때문에 A/B 반복 비교 시 타이밍이 어긋나지 않습니다.

기본 `-1 dBFS` 상한은 `OGG`·`MP3` 같은 손실 코덱에서 피크 클리핑을 줄이기 위한 여유(headroom)입니다. `WAV` 컨테이너는 선택한 비트 심도에 맞춰 1–8비트에서는 8-bit unsigned PCM, 9–16비트에서는 16-bit signed PCM으로 저장됩니다.

비트크러셔의 기본 구조는 [첫 번째 OGCruncher 글](/ko/blog/ogcruncher-game-audio-bitcrusher/)에서, Audacity 비교와 도구의 솔직한 한계는 [OGCruncher와 Audacity 비교 글](/ko/blog/ogcruncher-vs-audacity-for-game-sfx/)에서 확인할 수 있습니다. Unity로 첫 게임을 만들면서 에셋 관리와 C# 코드를 체계적으로 배우고 싶다면 [Unity·C# 1:1 튜터링](/ko/tutoring/unity/)을 확인해 보세요.
