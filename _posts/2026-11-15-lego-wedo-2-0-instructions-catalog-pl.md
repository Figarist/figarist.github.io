---
layout: "post"
title: "Katalog LEGO WeDo 2.0: 597 instrukcji budowania z robotyki w szybkiej aplikacji PWA"
description: "597 darmowych instrukcji budowania LEGO WeDo 2.0 w 26 kategoriach: dinozaury, zwierzęta, roboty, pojazdy. Otwórz instrukcję PDF każdego modelu jednym kliknięciem."
last_modified_at: null
date: "2026-11-15 11:00:00 +0200"
lang: "pl"
page_id: "lego-wedo-2-0-instructions-catalog"
permalink: "/blog/lego-wedo-2-0-instructions-catalog/"
excerpt: "Jak uporządkowaliśmy 597 instrukcji budowania z robotyki LEGO WeDo 2.0 w działającym offline, bezobsługowym katalogu webowym Friendly Arcade dla nauczycieli i kółek STEM."
category: "workshop"
categories:
  - "workshop"
tags:
  - "robotics"
  - "lego-wedo"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/cards/lego-wedo-2-0-instructions-catalog-en.webp"
image_alt: "Instrukcje LEGO WeDo 2.0: 597 darmowych poradników budowania (PDF)"
focus_keyword: "lego wedo 2.0 instrukcje budowania"
seo_title: "Instrukcje LEGO WeDo 2.0: 597 darmowych poradników budowania (PDF)"
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

Podczas prowadzenia zajęć z robotyki dla uczniów szkół podstawowych z zestawem **LEGO Education WeDo 2.0 (45300)** nauczyciele tracą cenne minuty lekcji na przeszukiwanie rozproszonych folderów PDF, niedziałających zakładek na Google Drive i nieindeksowanych archiwów ZIP. Tymczasem młodzi konstruktorzy chcą po prostu spojrzeć na przejrzyste miniaturki robotów i od razu zacząć budować dinozaury, dźwigi, łaziki kosmiczne czy mechanizmy kroczące.

Aby ułatwić nauczycielom przygotowanie lekcji, a uczniom sprawić frajdę, stworzyliśmy [Katalog instrukcji budowania LEGO WeDo 2.0](https://sivochka.com/lego-catalog/) — darmowe, niekomercyjne archiwum edukacyjne łączące **597 planów budowania w 26 kategoriach tematycznych** w szybkiej aplikacji webowej bez zewnętrznych zależności.

---

### Zaprojektowany z myślą o prawdziwych salach lekcyjnych (26 kategorii, 597 modeli)

Zamiast zmuszać nauczycieli do przeklikiwania niewygodnych arkuszy kalkulacyjnych, [katalog](https://sivochka.com/lego-catalog/) porządkuje każdy model w `data_localized.js` z gotowymi metadanymi w 26 kategoriach:
* **Podstawy do pracy w klasie**: Oficjalne plany LEGO WeDo 2.0, [Podstawowe mechanizmy](https://sivochka.com/lego-catalog/pl/c/mekhanizmy/), [Roboty](https://sivochka.com/lego-catalog/pl/c/roboty/) oraz konstrukcje mechaniczne bez SmartHuba do nauki podstawowej intuicji mechanicznej.
* **Ulubione tematy uczniów**: Zwierzęta, [Dinozaury](https://sivochka.com/lego-catalog/pl/c/dynozavry/), Owady, Ptaki, Eksploracja kosmosu, Pojazdy i maszyny specjalne, Roboty kroczące oraz Roboty rysujące.
* **Cztery języki interfejsu przełączane natychmiast**: Płynne przełączanie między **ukraińskim (`UK`)**, **angielskim (`EN`)**, **rosyjskim (`RU`)** oraz **polskim (`PL`)** bez przeładowywania strony i zewnętrznych paczek i18n.

---

### Rozwiązania inżynierskie: czysty Web + interfejs Friendly Arcade

* **Zero zależności i natychmiastowe wyszukiwanie O(1)**: Zbudowany w czystym Vanilla JavaScript (`app.js`, `store.js`, `translations.js`, `roulette.js`) z wstępnie wyliczonym indeksem wyszukiwania i opóźnieniem wejścia (`300 ms`), dzięki czemu nawet starsze tablety szkolne renderują stronę płynnie w 60 kl./s.
* **Szkolna ruletka instrukcji**: Gdy uczeń nie potrafi zdecydować, co zbudować w następnej kolejności, animowana **Ruletka instrukcji** losuje robota-niespodziankę w ramach aktywnych filtrów — zamieniając wybór projektu w minigrę.
* **Licznik ukończonych modeli, oceny gwiazdkowe i naprawa danych (`LocalStorage`)**: Kliknięcie **«Zbudowałem to! ✅»** zapisuje postępy ucznia, odblokowuje odznaki osiągnięć i automatycznie uruchamia `LegoStore.healData()` przy wczytaniu, dzięki czemu starsze ścieżki instrukcji migrują bez utraty postępów.
* **Kontrast WCAG AAA i dostępność**: Ostylowany za pomocą naszego otwartego systemu tokenów projektowych [Friendly Arcade](https://github.com/Figarist/friendly-arcade) — sparowane wysokokontrastowe tokeny pierwszego planu (`--on-green`, `--on-yellow`), pola dotykowe `>= 44 px` na ekranach dotykowych, wyraźne cyjanowe obwódki `:focus-visible` o grubości `3px` dla klawiatury oraz obsługa `@media (prefers-reduced-motion: reduce)`.
* **Powłoka aplikacji offline + prywatność Fair Play**: Service Worker typu Stale-While-Revalidate (`sw.js`) zapisuje powłokę aplikacji (`HTML`, `CSS`, `JS`, grafiki maskotek UI) na wypadek słabego Wi-Fi w klasie, celowo **nigdy** nie buforując zewnętrznych plików PDF z Google Drive. Wszystkie znaki towarowe podlegają naszej jawnej [polityce prawnej i zasadom LEGO® Fair Play](https://sivochka.com/lego-catalog/legal.html).

Przeglądaj pełny katalog bezpośrednio w przeglądarce:  
👉 **[Otwórz katalog instrukcji LEGO WeDo 2.0 (597 modeli)](https://sivochka.com/lego-catalog/)**

Poznaj nasze pozostałe darmowe narzędzia dla klas i niezależnych twórców gier:
* **[3D Club Studio — proceduralny generator 3D bez podpór dla drukarek szkolnych](https://sivochka.com/3d-club-studio/)**
* **[Quiet Class — adaptacyjny miernik hałasu w klasie oparty na Web Audio DSP](https://sivochka.com/bouncy/)**
* **[OGCruncher — darmowy internetowy bit-crusher audio i optymalizator SFX do gier](https://sivochka.com/OGCruncher/)**

Szukasz indywidualnego mentoringu online 1 na 1 z programowania ([Scratch](https://sivochka.com/pl/tutoring/scratch/), [Unity & C#](https://sivochka.com/pl/tutoring/unity/), Python) lub modelowania 3D?  
👉 **[Zobacz ofertę korepetycji i mentoringu 1 na 1 z Ihorem Sivochką](https://sivochka.com/pl/tutoring/)**
