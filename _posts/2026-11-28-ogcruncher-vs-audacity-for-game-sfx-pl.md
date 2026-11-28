---
layout: "post"
title: "OGCruncher to nie DAW, ale do SFX nie potrzebujesz Audacity"
description: "Kiedy Audacity do efektów SFX w grach jest zbędne, jak OGCruncher zmniejszył muzykę do gry z 20 MB do 4 MB w przeglądarce oraz gdzie edytor desktopowy wciąż wygrywa."
last_modified_at: null
date: "2026-11-28 10:00:00 +0200"
lang: "pl"
page_id: "ogcruncher-vs-audacity-for-game-sfx"
permalink: "/blog/ogcruncher-vs-audacity-for-game-sfx/"
excerpt: "Kiedy wsadowy procesor w przeglądarce wygrywa z Audacity przy krótkich efektach SFX i kompresji muzyki retro z 20 MB do 4 MB, oraz uczciwe granice możliwości OGCruncher."
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
image_alt: "OGCruncher — przeglądarkowy bit-crusher audio i wsadowy konwerter OGG, WAV, MP3 do gier"
focus_keyword: "Audacity do SFX"
seo_title: "OGCruncher to nie DAW, ale do SFX nie potrzebujesz Audacity"
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

We własnych grach regularnie przepuszczałem 20-megabajtowe ścieżki muzyczne przez OGCruncher i dostawałem około 4-megabajtowe pliki z dokładnie takim klimatem retro, na jakim mi zależało. Gdy trzeba po prostu przygotować folder krótkich efektów do gry albo skompresować dźwięk pod paczkę budowania, wcale nie potrzebujesz Audacity — narzędzie w przeglądarce załatwia całą paczkę w jednym oknie.

Najnowsza aktualizacja [OGCruncher](/pl/blog/ogcruncher-game-audio-bitcrusher/) zaczęła się od dwóch brakujących elementów, na które ciągle trafiałem: ukraińskiego interfejsu oraz presetu dla Scratcha. Przy okazji dziesiątki drobnych poprawek złożyły się na pełną aktualizację.

## Zmniejszanie ścieżek z 20 MB do 4 MB

Powód, dla którego najczęściej sięgałem po OGCruncher przy muzyce do gier, był czysto praktyczny: ten 5-krotny spadek od razu zmniejsza rozmiar gry, a jednocześnie nadaje utworowi wyraźny charakter retro bez pełnej sesji miksowania.

Przy krótkich efektach praktycznym zyskiem jest brak konieczności budowania makr: wrzucasz folder, raz ustawiasz parametry i każdy plik w kolejce przechodzi dokładnie tę samą obróbkę. [Makra w Audacity](https://manual.audacityteam.org/man/macros.html) też potrafią przetwarzać pliki wsadowo, ale najpierw trzeba cały łańcuch makra zbudować, zapisać i przetestować.

## Kiedy Audacity do SFX jest zbędne, a kiedy wciąż go potrzebujesz

[OGCruncher](https://sivochka.com/OGCruncher/) działa lokalnie w przeglądarce jako kreatywny procesor retro, a nie stacja robocza do miksowania. Oto uczciwy podział ról między oba narzędzia.

| Zadanie audio | Lepsze narzędzie | Dlaczego |
| --- | --- | --- |
| Zmniejszenie muzyki lub SFX dla mniejszej paczki i klimatu retro | OGCruncher | Przetwarza całą serię za jednym razem na identycznych ustawieniach |
| Przygotowanie dźwięku pod Scratch 3.0 | OGCruncher, preset FOR SCRATCH | Eksportuje tylko WAV i ostrzega, gdy plik przekracza 10 MB |
| Nadpisanie SFX w Unity lub Godot bez psucia odwołań do zasobów | OGCruncher, KEEP NAMES | Pełny opis `.meta`, `.import` i przycinania znajdziesz w [poradniku SFX dla Unity](/pl/blog/ogcruncher-unity-sfx-batch-keep-names/) |
| Edycja wielościeżkowa lub wycinanie fragmentów w środku utworu | Audacity lub DAW | OGCruncher nie ma przewijania po fali dźwiękowej |
| Przezroczysta konwersja lub pomiar głośności LUFS | Audacity lub DAW | OGCruncher celowo podbarwia brzmienie i nie ma miernika LUFS |

## Ukraińska strona `/uk/` i preset FOR SCRATCH

OGCruncher ma teraz osobną ukraińską stronę pod adresem [`sivochka.com/OGCruncher/uk/`](https://sivochka.com/OGCruncher/uk/) obok wersji angielskiej. Dla dzieci tworzących gry w Scratchu przycisk **FOR SCRATCH** jednym kliknięciem wyłącza OGG oraz MP3 i eksportuje wyłącznie WAV.

Scratch 3.0 akceptuje WAV i MP3, odrzuca OGG i ogranicza każdy dźwięk do 10 MB. Gdy OGG jest wyłączone, a wyeksportowany plik WAV lub MP3 przekracza 10 MB, dziennik przetwarzania od razu to sygnalizuje, żeby projekt w Scratchu nie odmówił później po cichu zapisu.

## Uczciwe ograniczenia UX

Aktualizacja pokrywa już mój własny obieg pracy, ale interfejs wciąż nie jest tak intuicyjny, jak bym chciał: UX jest surowy i jego przebudowa jest w 100% zaplanowana w kolejnych aktualizacjach. Ukraińskie tłumaczenie też ma jeszcze kilka szorstkich miejsc, które stopniowo poprawiam.

Jeszcze jedno ograniczenie narzędzia przeglądarkowego: **wszystkie wczytane i wyeksportowane pliki żyją w pamięci przeglądarki i znikają po przeładowaniu strony**, więc pobieraj wyniki od razu.

Otwórz [OGCruncher](https://sivochka.com/OGCruncher/), wrzuć kilka efektów albo ścieżkę i zobacz, ile megabajtów możesz urwać bez uruchamiania edytora desktopowego. Jeśli Twoje dziecko chce tworzyć własne gry w Scratchu bez błędów zapisu, zajrzyj na [indywidualne lekcje Scratcha](/pl/tutoring/scratch/).
