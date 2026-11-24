---
layout: "post"
title: "수업에서 AI Quests(4~7학년): 15~25분 진행과 소프트락"
description: "4~7학년 수업에서 Google AI Quests 두 시나리오를 진행한 기록입니다. 15~25분 소요 시간, 읽기 부담, 5단계 소프트락 버그와 복습 퀴즈를 정리했습니다."
last_modified_at: null
date: "2026-11-25 10:00:00 +0200"
lang: "ko"
page_id: "google-ai-quests-classroom-lesson"
permalink: "/blog/google-ai-quests-classroom-lesson/"
excerpt: "4~7학년 학생들과 Google AI Quests 두 퀘스트를 모두 진행했습니다. 시나리오당 15~25분이 걸렸고, 읽기 분량과 5단계 소프트락 버그가 핵심 변수였습니다."
category: "education"
categories:
  - "education"
tags:
  - "education"
  - "ai"
  - "informatics"
  - "lesson"
author: "ihor"
image: "/assets/images/blog/google-ai-quests-classroom-lesson/quests/01.webp"
image_alt: "4~7학년 정보 수업에서 진행한 Google AI Quests"
focus_keyword: "수업에서 AI Quests"
seo_title: "수업에서 AI Quests(4~7학년): 진행 시간과 소프트락"
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
  quests:
    "01": "홍수 예측 퀘스트 5단계 소프트락: 지도 위에 멈춘 교역소"
    "02": "빈 교역소 자리가 보이는 홍수 예측 퀘스트 5단계 지도"
    "03": "안과 질환 퀘스트: 망막 사진에서 질환 징후를 찾는 모델"
    "04": "홍수 예측 퀘스트 엔딩: 시장을 피해로부터 지켜낸 장면"
    "05": "홍수 예측 퀘스트에 완료 표시가 붙은 퀘스트 지도"
toc: true
published: true
fmContentType: "Post"
---

Google은 교육용 AI 퀘스트의 권장 연령을 11~14세로 안내하지만, 제 수업에서는 4학년 학생들도 두 시나리오를 끝까지 마쳤습니다. 4~7학년 수업에서 AI Quests를 직접 돌려보면 가벼운 게임보다는 체계적인 학습 프로젝트에 가깝다는 점이 금방 드러납니다.

학교 태블릿과 노트북의 성능 문제는 별도로 정리한 [태블릿에서 Google AI Quests 성능 후기](https://sivochka.com/ko/blog/google-ai-quests-tablets-fps/)에서 확인하실 수 있습니다. 이번 글에서는 소요 시간, 학년별 차이, 그리고 마지막 단계에서 막히는 {% include term.html id="softlock" text="소프트락" %} 버그를 다룹니다.

## 4~7학년 수업에서 AI Quests 진행 시간과 반응

퀘스트 하나당 15~25분 정도 걸려 짧은 토론까지 합쳐도 45분 정규 수업에 무리 없이 들어갑니다. 코딩 경험이나 AI 사전 지식은 필요 없으며, 이는 [우크라이나 교육과학부 공식 안내](https://mon.gov.ua/news/google-zapuskaie-ukrainskoiu-bezkoshtovnu-hru-ai-quests-pro-shtuchnyi-intelekt-dlia-shkoliariv)와도 일치합니다.

학년별 속도 차이는 분명했습니다. 6~7학년이 4~5학년보다 과제를 훨씬 빠르게 풀었습니다. 아이들이 가장 당황한 부분은 텍스트 읽기였습니다. 조건을 이해하고 모델을 설정하려면 설명을 꼼꼼히 읽어야 해서 적잖이 놀라는 분위기였습니다. 내용 자체는 4학년 이상이라면 누구나 소화할 수 있고, 기회가 된다면 고등학생에게도 충분히 내줄 만합니다.

## 현재 열린 두 가지 퀘스트 비교

가상 연구원 스카이 교수(Professor Skye)와 함께 학생들은 데이터를 모으고 검토하며, AI 모델을 학습시키고 오류를 수정합니다([우크라이나 디지털전환부](https://thedigital.gov.ua/news/education/hrayte-ta-vyvchayte-shtuchnyy-intelekt-google-zapuskaye-ai-quests-dlia-ukrayinskykh-pidlitkiv)). 현재 우크라이나어로 두 시나리오가 공개되어 있고, 뇌와 신경 연결을 다루는 세 번째 퀘스트도 곧 추가될 예정입니다.

| 퀘스트 | 주제 및 학습 데이터 | 수업 안정성 |
| :--- | :--- | :--- |
| 홍수 예측 퀘스트(Топкий Ринок) | 강수량과 수위 데이터로 홍수 예측 | 5단계 교역소 배치에서 소프트락 발생 |
| 안과 질환 퀘스트(Присмеркові Дюни) | 안과 질환 조기 탐지(당뇨병성 망막병증) | 소프트락 없이 정상 완료 |

교사용 공식 가이드는 가볍게 훑어보는 선에서 참고했고, 수업 말미 수료증 발급은 생략한 채 두 퀘스트 완주에 집중했습니다.

## 학부모를 위한 설명: 소프트락이란 무엇인가

게임 용어에 익숙하지 않은 학부모님을 위해 짧게 설명하자면, 소프트락은 프로그램이 멈추거나 꺼지지 않았는데도 {% include term.html id="bug" text="버그" %} 때문에 다음 단계로 진행할 수 없는 막다른 상태를 뜻합니다.

홍수 예측 퀘스트의 마지막 5단계에서 교역소 오브젝트가 더 이상 움직이지 않으며 바로 이 문제가 생겼습니다. 페이지를 새로고침하면 풀리기도 했지만, 위치를 잘못 놓은 학생 중 절반은 같은 현상을 다시 겪었습니다. 심한 경우 매 시도마다 새로고침을 반복해야 했습니다.

{% include gallery.html id="quests" caption="홍수 예측 퀘스트 5단계 버그와 학교 태블릿에서 완료한 퀘스트" %}

**5단계 버그 때문에 홍수 예측 퀘스트는 당분간 건너뛰는 편이 낫습니다.** 이 플랫폼으로 AI 학습 원리를 보여주고 싶다면 안과 질환 퀘스트부터 시작해 보세요. 수업 중 소프트락이 한 번도 없었고 아이들이 안정적으로 끝까지 마쳤습니다.

## 수업 후 복습용 온라인 퀴즈

브라우저 탭을 닫고 끝내지 않도록 데이터 품질, 모델 학습 단계, 실제 AI 활용을 확인하는 짧은 복습 퀴즈를 만들었습니다. 수업 마무리나 과제로 [Na Urok 온라인 퀴즈(우크라이나어)](https://naurok.com.ua/test/google-ai-quests-yak-navchaetsya-shi-topkiy-rinok-i-prismerkovi-dyuni-3985937.html)를 바로 활용해 보실 수 있습니다.

아이가 알고리즘과 모델의 원리에 흥미를 느껴 Scratch, Python, Unity로 직접 프로젝트를 만들어 보고 싶다면 [1:1 코딩 튜터링 페이지](https://sivochka.com/ko/tutoring/)에서 수업 방식을 확인해 주세요.
