---
layout: "post"
title: "태블릿에서 Google AI Quests: 2~10 FPS 실사용 후기"
description: "학교 태블릿과 일반 노트북에서 Google AI Quests를 직접 실행해 본 결과입니다. 2~10 FPS 렌더링 문제, 1024x600 화면 기준, 안정적인 진행 저장까지 정리했습니다."
last_modified_at: null
date: "2026-11-24 15:00:00 +0200"
lang: "ko"
page_id: "google-ai-quests-tablets-fps"
permalink: "/blog/google-ai-quests-tablets-fps/"
excerpt: "4~7학년 수업에서 학교 태블릿과 일반 노트북으로 Google AI Quests를 돌려봤습니다. UI와 자동 저장은 훌륭하지만 렌더링이 2~10 FPS에 머뭅니다."
category: "education"
categories:
  - "education"
tags:
  - "education"
  - "ai"
  - "tools"
  - "informatics"
author: "ihor"
image: "/assets/images/blog/google-ai-quests-tablets-fps/tablets/01.webp"
image_alt: "학교 태블릿에서 실행한 Google AI Quests 성능 테스트"
focus_keyword: "태블릿에서 Google AI Quests"
seo_title: "태블릿에서 Google AI Quests: 2~10 FPS 테스트"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: false
hidden: null
redirect_from: null
photo_alts:
  tablets:
    "01": "홍수 예측 퀘스트의 숲 장면이 보이는 학교 태블릿을 학생이 들고 있는 모습"
    "02": "태블릿에서 스카이 교수가 모델 예측 정확도 90%를 보여주는 화면"
    "03": "태블릿의 Google AI Quests 데이터 정리 화면과 강수량 표"
    "04": "학교 태블릿에서 퀘스트 캐릭터가 정확한 예측에 감사하는 장면"
    "05": "태블릿에서 안과 질환 퀘스트가 망막 이미지를 스캔하는 화면"
toc: true
published: true
fmContentType: "Post"
---

2026년 11월 24일, Google 우크라이나는 교사를 대상으로 교육용 AI 게임 AI Quests 온라인 발표회를 진행합니다. 저는 이미 4~7학년 학생들과 태블릿에서 Google AI Quests를 각자 1대씩 실행해 봤는데, 실제 교실 환경에서는 공식 안내보다 기술적 장벽이 훨씬 컸습니다.

우크라이나어 버전은 11월 16일 [우크라이나 교육과학부](https://mon.gov.ua/news/google-zapuskaie-ukrainskoiu-bezkoshtovnu-hru-ai-quests-pro-shtuchnyi-intelekt-dlia-shkoliariv)와 [디지털전환부](https://thedigital.gov.ua/news/education/hrayte-ta-vyvchayte-shtuchnyy-intelekt-google-zapuskaye-ai-quests-dlia-ukrayinskykh-pidlitkiv), Diia.Osvita의 지원으로 공개되었습니다. Google Research가 Stanford Accelerator for Learning과 함께 만든 웹 기반 프로젝트지만, 실제 수업에서는 최적화가 가장 큰 발목을 잡았습니다.

## 태블릿에서 Google AI Quests와 일반 노트북 성능

공식 [AI Quests 페이지](https://research.google/ai-quests/intl/uk_ua)에는 최소 해상도 1024 × 600 픽셀만 안내되어 있고 그래픽이나 CPU 사양은 따로 적혀 있지 않습니다. 막상 수업에 들어가니 {% include term.html id="render" text="렌더링" %} 부하가 바로 드러났습니다.

보급형 학교 태블릿은 물론 일반 노트북에서도 화면이 버거워했습니다. 진행 내내 2~10 {% include term.html id="fps" %} 수준의 슬라이드쇼처럼 움직였고, 학생들 모두 끊김을 호소했습니다. 학교용 기기에서 안정적인 30 FPS를 내려면 대체 어떤 태블릿이 필요한지 의문이 들 정도였습니다.

{% include gallery.html id="tablets" caption="수업 중 학교 태블릿에서 실행한 Google AI Quests" %}

| 점검 항목 | 공식 페이지 안내 | 실제 교실 기기 결과 |
| :--- | :--- | :--- |
| 최소 해상도 | 1024 × 600 픽셀 | 실행은 되지만 장면 렌더링 부하가 큼 |
| 프레임(FPS) | 별도 표기 없음 | 학교 태블릿과 일반 노트북 모두 2~10 FPS |
| 진행 저장 | 브라우저 기반, 코딩 불필요 | 새로고침과 재접속 후에도 안전하게 유지 |
| 인터페이스(UI/UX) | 인터랙티브 웹 게임 | 끊김만 없으면 깔끔하고 직관적 |

## 기술적으로 잘 만든 두 가지

무거운 렌더링에도 분명한 장점이 두 가지 있습니다. 먼저 화면 구성과 {% include term.html id="ui-ux" %}가 깔끔해서 아이들이 어디를 눌러야 하고 힌트를 어디서 보는지 금방 이해합니다.

진행 상태 저장도 믿음직합니다. 탭을 닫거나 브라우저를 다시 열고 새로고침해도 진행 기록이 지워지지 않습니다. 네트워크나 브라우저가 자주 흔들리는 교실 환경에서는 아주 유용한 부분입니다.

## 오늘 Google 발표회와 교사용 자료

11월 24일 진행되는 [Google 교사용 AI Quests 유튜브 라이브 발표회](https://www.youtube.com/live/hyWXjRpQYPQ)는 사전 등록 없이 무료로 볼 수 있습니다. 게임 시연과 수업 적용 팁, 수료증 발급 방법을 함께 다룹니다.

플랫폼에는 수업 지도안과 토론 질문이 담긴 [교사용 자료](https://research.google/ai-quests/intl/uk_ua/teacher-resources)도 올라와 있습니다. 방송을 보신 뒤 실제 수업에 넣기 전에 반드시 학생용 기기 1대에서 먼저 실행해 보시길 권합니다. 수업 후 복습용으로 제가 만든 [Na Urok 온라인 퀴즈(우크라이나어)](https://naurok.com.ua/test/google-ai-quests-yak-navchaetsya-shi-topkiy-rinok-i-prismerkovi-dyuni-3985937.html)도 바로 활용하실 수 있습니다.

## 지금 학교 기기에서 바로 추천할 수 있을까

**현재 빌드 상태에서는 보급형 학교 태블릿이나 일반 노트북 수업용으로 추천하기 어렵습니다.** 아이디어는 탄탄하지만 2~10 FPS의 끊김이 몇 분 만에 아이들의 집중력을 떨어뜨립니다.

전체 학급에 적용하기 전에는 반드시 실제 학생 기기에서 애니메이션 반응 속도를 확인해 보세요. 가정이나 학교의 일반 컴퓨터에서도 끊김 없이 진행할 수 있는 코딩 수업이 궁금하다면 [1:1 코딩 튜터링 안내 페이지](https://sivochka.com/ko/tutoring/)를 참고해 주세요.
