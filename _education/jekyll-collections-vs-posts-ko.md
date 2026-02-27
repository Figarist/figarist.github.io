---
title: "Jekyll 컬렉션 vs 포스트: 상황에 맞는 선택 가이드"
author: "Ihor (Figarist)"
tags: [jekyll, static-site, web, tutorial]
lang: ko
permalink: /education/jekyll-collections-vs-posts/
level: beginner
sort_order: 3
description: "Jekyll 포스트와 컬렉션의 차이점을 이해하고 콘텐츠에 적합한 도구를 선택하기 위한 실용적인 가이드입니다."
excerpt: "포스트는 시간 순서대로 정렬됩니다. 컬렉션은 상록수와 같습니다. 두 가지를 선택하고 사용하는 방법을 알아보세요."
---

Jekyll은 콘텐츠를 관리하는 두 가지 방법을 제공합니다: **포스트(posts)**와 **컬렉션(collections)**. 잘못된 선택은 나중에 번거로움을 유발할 수 있습니다. 어떻게 선택해야 할지 알아보겠습니다.

## 핵심 차이점

| | 포스트 | 컬렉션 |
|---|---|---|
| 주요 정렬 | 날짜 (내림차순) | 파일 이름 / 사용자 정의 필드 |
| 일반적인 용도 | 블로그, 뉴스, 브이로그 | 문서, 튜토리얼, 포트폴리오 |
| URL 패턴 | `/blog/2026/02/27/title/` | `/education/title/` |
| `site.posts` 루프 | ✅ | ❌ (`site.collectionname` 사용) |

**기본 원칙:** 만약 콘텐츠가 6개월 후에 낡은 느낌이 든다면 그것은 포스트입니다. 3년 후에도 여전히 유용하다면 그것은 컬렉션 항목입니다.

## `_config.yml`에서 컬렉션 정의하기

```yaml
collections:
  education:
    output:    true
    permalink: /education/:title/

defaults:
  - scope:
      path: ""
      type: education
    values:
      layout: education
```

`output: true` 키는 Jekyll이 각 파일에 대해 독립적인 HTML 페이지를 생성하도록 지시합니다. 이 옵션이 없으면 파일은 Liquid에서 `site.education`을 통해 액세스할 수 있지만 실제 페이지는 생성되지 않습니다.

## Liquid에서 컬렉션 루프 돌리기

```liquid
{% for item in site.education %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

파일 이름 대신 사용자 정의 필드로 정렬하려면:

```liquid
{% assign sorted_edu = site.education | sort: "sort_order" %}
{% for item in sorted_edu limit: 3 %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

## 포스트가 컬렉션보다 유리한 경우

다음 기능이 필요한 경우 포스트를 사용하세요:
- RSS 피드 통합 (jekyll-feed는 `site.posts`에서 자동으로 작동함)
- 연도/월별 아카이브 페이지
- `jekyll-paginate`를 통한 페이지네이션

이러한 기능들은 추가 플러그인이나 수동 Liquid 작업 없이는 커스텀 컬렉션에서 기본적으로 작동하지 않습니다.

---

*Wrist & Pocket Studio — [wristandpocket.github.io](https://wristandpocket.github.io)*
