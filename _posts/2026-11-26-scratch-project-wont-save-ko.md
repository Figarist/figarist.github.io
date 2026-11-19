---
layout: "post"
title: "스크래치 저장 안됨: 게임을 잃지 않는 응급 처치"
description: "Scratch에 「프로젝트를 저장하지 못했습니다.」가 뜨나요? .sb3 파일을 먼저 컴퓨터에 저장하고, 새로고침한 뒤 다시 불러오세요. 너무 큰 프로젝트를 줄이는 방법도 정리했습니다."
last_modified_at: null
date: "2026-11-26 10:00:00 +0200"
lang: "ko"
page_id: "scratch-project-wont-save"
permalink: "/blog/scratch-project-wont-save/"
excerpt: "Scratch가 그냥 프로젝트를 저장하지 못할 때가 있습니다. 수업에서는 정해 둔 순서가 있습니다. 먼저 .sb3 파일을 컴퓨터에 저장하고, 새로고침한 다음, 그 파일을 다시 편집기로 불러옵니다."
category: "education"
categories:
  - "education"
tags:
  - "scratch"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-inspector.webp"
image_alt: "pyScratch의 「Інспектор (.sb3)」 탭(우크라이나어 인터페이스): Scratch 용량 제한과 큰 이미지 압축 기능"
focus_keyword: "스크래치 저장 안됨"
seo_title: "스크래치 저장 안됨: 응급 처치와 원인 정리"
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

Scratch 수업에서 가장 속상한 순간이 있습니다. 아이가 한참 동안 게임을 만들었는데 프로젝트가 저장되지 않는 겁니다. 화면 위에는 **「프로젝트를 저장하지 못했습니다.」**가 떠 있고, 「다시 시도」를 눌러도 소용이 없습니다. 스크래치 저장 안됨 문제는 대개 인터넷 연결 때문입니다. 예전부터 늘 있던 일이라 수업에서는 정해 둔 순서가 있습니다.

## 응급 처치: 파일부터, 나머지는 그다음

프로젝트가 내 컴퓨터에 저장되기 전에는 페이지를 새로고침하지 마세요. 새로고침하면 Scratch가 서버에 있는 마지막 버전을 열 수 있고, 서버에 올라가지 못한 작업은 사라집니다.

1. 컴퓨터에 사본을 저장합니다. 「파일」 메뉴에서 **「컴퓨터에 저장하기」**를 고릅니다. 오류 알림에 있는 「다운로드」 버튼도 같은 일을 합니다. 브라우저가 `.sb3` 파일을 저장하는데, 여기에 스프라이트, 스크립트, 모양, 소리까지 게임 전체가 들어 있습니다.
2. 페이지를 새로고침합니다. 로그아웃된 상태로 나오면 다시 로그인합니다.
3. 파일을 다시 불러옵니다. 「파일」 메뉴에서 Load from your computer를 고르고(이 항목은 한국어 Scratch 화면에서도 아직 영어로 나옵니다) 방금 저장한 `.sb3`를 선택합니다. Scratch가 「Replace contents of the current project?」라고 물으면(이 질문도 영어입니다) 확인을 누릅니다.
4. 이어서 작업합니다. 확인하려면 「파일 → 저장하기」를 누르세요. 「프로젝트가 저장되었습니다.」가 나오면 해결된 겁니다.

이렇게 해도 서버가 프로젝트를 받아 주지 않을 때가 있습니다. 그럴 때는 그냥 계속 작업하면서 틈틈이 파일을 다시 컴퓨터에 저장합니다. 적어도 `.sb3` 안에는 모든 것이 남아 있으니, 게임은 나중에 다시 편집기로 불러오면 됩니다.

## 스크래치 저장 안됨, 원인은 세 가지

[Scratch Wiki](https://en.scratch-wiki.info/wiki/What_does_%22project_could_not_save%22_mean%3F)는 「Project could not save」(한국어 화면에서는 「프로젝트를 저장하지 못했습니다.」) 알림의 원인으로 세 가지를 듭니다.

- 계정에서 로그아웃되었습니다.
- 컴퓨터의 인터넷 연결이 끊겼습니다.
- 프로젝트가 너무 큽니다.

Wiki는 순서대로 확인하고 단계마다 다시 저장해 보라고 권합니다. 먼저 인터넷을 확인하고, 다음으로 새 탭에서 맞는 계정으로 로그인되어 있는지 보고, 그다음에야 무거운 파일을 찾습니다.

제 수업에서 흔한 경우는 이 목록의 두 번째입니다. 연결에 뭔가 문제가 생기고, `.sb3` 파일로 옮기는 방법으로 해결됩니다. 새로고침한 뒤에도, 인터넷이 멀쩡한데도 게임이 저장되지 않는다면 이제 크기를 볼 차례입니다.

## 프로젝트가 너무 클 때

파일 전체 크기에 대한 제한은 없습니다. 제한은 프로젝트의 각 부분에 걸려 있습니다. [Scratch Wiki의 Project File Size 문서](https://en.scratch-wiki.info/wiki/Project_File_Size)에 따르면 Scratch 3.0에서는 다음과 같습니다.

- 개별 리소스(모양, 배경, 소리)는 하나당 10MB보다 작아야 합니다.
- `.sb3` 안의 `project.json` 파일은 5MB보다 작아야 합니다. 스크립트, 변수, 리스트, 이름이 여기에 저장됩니다.

용량은 거의 전부 그림과 소리가 차지하고, 스크립트는 아주 작습니다. 아이들 프로젝트에서 가장 무거운 건 보통 배경으로 넣은 사진과 긴 소리, 특히 게임 내내 흐르는 음악입니다.

### Scratch 안에서 줄이는 방법

[Scratch Wiki](https://en.scratch-wiki.info/wiki/Project_File_Size)의 조언입니다.

- 쓰지 않는 소리, 모양, 배경, 스프라이트를 지웁니다.
- 긴 음악은 잘라 내거나 반복되는 짧은 구간으로 바꿉니다.
- 단순한 도형은 비트맵 대신 벡터 모드로 그립니다(다만 이미 만든 비트맵 모양을 벡터로 변환해도 크기는 줄지 않습니다).
- 아주 긴 변수, 리스트, 스프라이트 이름과 주석을 줄입니다. 이런 것들이 `project.json`을 부풀립니다.

그래도 온라인에서 저장되지 않으면 Wiki는 [Scratch 오프라인 편집기](https://scratch.mit.edu/download)에서 작업하라고 권합니다. 같은 `.sb3`를 그대로 열 수 있습니다.

### pyScratch Inspector로 확인하기

어떤 파일이 8MB나 되는지 손으로 찾기는 어렵습니다. Scratch는 모양과 소리의 크기를 메가바이트로 보여 주지 않습니다. 모양 옆에는 픽셀 크기만, 소리 옆에는 길이(초)만 나옵니다. 그래서 제가 만든 무료 도구 [pyScratch](https://sivochka.com/pyScratch/en/)에 「Inspector (.sb3)」 탭을 넣었습니다. pyScratch에는 아직 한국어 화면이 없고 영어, 우크라이나어, 러시아어로 제공되므로, 아래 이름은 영어 화면 기준으로 적었습니다. `.sb3`를 열면 Inspector가 다음을 보여 줍니다.

- 개수: 스프라이트, 배경, 모양, 소리, 변수와 리스트(전역/지역), 전체 블록 수, 그리고 모자 블록 없이 떨어져 있는 스크립트(Orphan Scripts)
- 5MB 제한 대비 `project.json` 크기를 나타내는 막대
- 모든 모양과 소리를 무거운 것부터 가벼운 것 순으로 정리한 표, 그리고 「Large (>500 KB)」, 「Over 10 MB!」 표시

버튼도 두 개 있습니다. 「Remove Unused Assets」는 프로젝트가 참조하지 않는 파일을 압축 파일에서 지웁니다. 「Compress Large PNG/JPG (>960px or >500 KB)」는 큰 비트맵 그림을 긴 변 기준 960픽셀로 줄이고 다시 압축합니다. 이때 투명 영역이 없는 큰 PNG는 JPG가 됩니다. 그다음 「File → Save .sb3」로 결과를 저장해서 Scratch로 불러오면 됩니다.

pyScratch는 지금 테스트 모드입니다. 원본 `.sb3`는 따로 보관하고, 압축한 프로젝트는 계속 작업하기 전에 Scratch에서 먼저 확인해 주세요. 파일은 브라우저 안에서 처리되고 어디에도 업로드되지 않습니다. 도구 자체에 대해서는 [pyScratch와 Python으로 하는 Scratch](https://sivochka.com/ko/blog/pyscratch-python-to-scratch-sb3/) 글에 더 자세히 썼습니다.

## 작업을 지켜 주는 습관

Scratch 서버에 저장하는 건 편하지만, 그것만 믿으라고 권하지는 않습니다. 서버가 말을 듣지 않을 때 우리를 구해 주는 건 내 컴퓨터에 있는 사본입니다.

이 습관은 아이에게 저절로 생기지 않습니다. 학생들은 누가 말해 주지 않으면 `.sb3` 사본을 거의 저장하지 않고, 이건 모든 아이가 똑같습니다. 저는 매번 저장하라고 말해야 합니다. 스크래치만 그런 것도 아닙니다. Unity 프로젝트, 파이썬 스크립트, Blender 파일도 아이들은 똑같이 저장을 잊습니다. 정말 흔한 문제입니다.

그러니 수업이 끝날 때마다 「파일 → 컴퓨터에 저장하기」로 파일을 저장해 두세요. 큰 프로젝트라면 중간에도 한 번 더요. 아이가 혼자 작업한다면 옆에 있는 어른이 한마디 해 주면 됩니다. 이런 `.sb3`는 보통 용량이 크지 않지만, 운이 나쁜 날에는 아이가 그때까지 만든 모든 것을 지켜 줍니다.

아이가 Scratch를 많이 하고 첫 게임에서 자기만의 프로젝트로 더 나아가고 싶어 한다면 [Scratch 1:1 수업](https://sivochka.com/ko/tutoring/scratch/)에서 함께해요. 지금 당장 게임이 크기 때문에 저장되지 않는다면 [pyScratch](https://sivochka.com/pyScratch/en/)에서 열어 리소스 표를 보세요. 가장 무거운 파일이 첫 줄에 있을 겁니다.
