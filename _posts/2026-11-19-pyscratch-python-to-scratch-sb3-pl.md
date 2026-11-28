---
layout: "post"
title: "Konwerter Scratch na Python online: pyScratch (wersja testowa)"
description: "Otwórz plik .sb3 jako kod Pythona, edytuj go i zapisz z powrotem do Scratcha. Darmowa wersja testowa pyScratch od korepetytora: co działa, ograniczenia i dla kogo jest."
last_modified_at: null
date: "2026-11-19 10:00:00 +0200"
lang: "pl"
page_id: "pyscratch-python-to-scratch-sb3"
permalink: "/blog/pyscratch-python-to-scratch-sb3/"
excerpt: "Stworzyłem pyScratch, aby dziecko mogło otworzyć własną grę ze Scratcha i zobaczyć ją jako kod Pythona. To nadal wersja testowa: oto co już potrafi, a czego jeszcze nie."
category: "workshop"
categories:
  - "workshop"
tags:
  - "scratch"
  - "python"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-pong.webp"
image_alt: "Środowisko pyScratch (interfejs ukraiński) z grą Pong jako kodem Pythona obok sceny"
focus_keyword: "konwerter scratch na python online"
seo_title: "Edytuj SB3 w Pythonie: konwerter Scratch na Python online"
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

Między Scratchem a Pythonem od zawsze istniała przepaść. Mój pomysł jest stary: narzędzie, które przenosi dziecko ze Scratcha do czegoś trudniejszego w możliwie najbardziej przyjazny sposób. Takie narzędzie już istnieje. [pyScratch](https://sivochka.com/pyScratch/en/) to darmowy konwerter Scratch na Python działający online w przeglądarce — i działa w obie strony.

Jedyne podobne podejście, jakie widziałem, to Minecraft Education. To jednak osobny temat.

## Scratch to nie zabawka

Wiele osób wrzuca Scratcha do szuflady z zabawkami, bo spotkało go w podstawówce. Nie zgadzam się z tym. Scratch to potężne narzędzie i to, co można w nim zbudować, wciąż robi na mnie wrażenie. Dlatego pyScratch nie mówi „wyrzuć klocki i naucz się wreszcie czegoś poważnego”. Bierze to, co dziecko już stworzyło w Scratchu, i pokazuje w innym języku.

## Gdzie dzieci zacinają się w Pythonie

Uczeń przychodzący ze Scratcha ma już opanowaną logikę. Pętle, warunki i zmienne są dla niego zrozumiałe. Trudność polega na tym, że polecenia mają inne nazwy i trzeba je pisać ręcznie. Dużo pisania. W Scratchu potrzebny klocek leży w palecie i po prostu go przeciągasz. W Pythonie musisz pamiętać nazwę, dodać nawiasy, dwukropek i właściwe wcięcie.

Właśnie dla tej luki powstał pyScratch: dziecko widzi znajome klocki obok tekstu i stopniowo oswaja się z kodem tekstowym.

## Edytuj plik .sb3 w Pythonie: co działa już teraz

Narzędzie jest na razie dość proste, ale główna ścieżka już działa:

1. W Scratchu zapisz projekt przez „Plik → Zapisz na swoim komputerze”. Otrzymasz plik `.sb3`.
2. W pyScratch wybierz „File → Open .sb3” albo po prostu przeciągnij plik na stronę.
3. Wybierz duszka lub Scenę. Jego skrypty pojawią się jako kod w stylu Pythona, a zakładka „Scratch Blocks” pokaże te same skrypty jako drzewo bloków. Kliknięcie bloku przenosi do odpowiadającej mu linijki kodu.
4. Zmień kod i naciśnij zieloną flagę (lub Ctrl+Enter). Projekt uruchamia się na scenie 480×360 bezpośrednio na stronie.
5. Zapisz wynik przez „File → Save .sb3”, a następnie otwórz go w Scratchu przez „Plik → Wczytaj ze swojego komputera”.

Działa to też w drugą stronę: napisz kod od zera na czystej stronie, a pyScratch zbuduje dla Ciebie bloki Scratcha. Oto duszek, który patroluje scenę i odbija się od krawędzi (przykład z [dokumentacji języka pyScratch](https://github.com/Figarist/pyScratch/blob/main/docs/DSL_REFERENCE.md)):

{% capture py %}
@when_flag_clicked
def patrol():
    set_rotation_style("left-right")
    goto(0, 0)
    glide_to(0.5, "random")
    point_in_direction(90)
    for i in range(60):
        move(8)
        if_on_edge_bounce()
        wait(0.03)
{% endcapture %}
{% capture sb %}
when flag clicked
set rotation style [left-right v]
go to x: (0) y: (0)
glide (0.5) secs to (random position v)
point in direction (90)
repeat (60)
  move (8) steps
  if on edge, bounce
  wait (0.03) seconds
end
{% endcapture %}
{% include py-scratch.html python=py blocks=sb %}

Każda funkcja tutaj odpowiada jednemu blokowi Scratcha. Dekorator `@when_flag_clicked` staje się blokiem startowym „kiedy kliknięto zieloną flagę”, a `for i in range(60):` powtarza ciało pętli 60 razy. Dziecko, które zbudowało to wcześniej z klocków, rozpozna każdą linijkę.

Wszystko działa w przeglądarce. Twój plik `.sb3` nie jest wysyłany na serwer i nie potrzebujesz konta. Jeśli nie masz pod ręką własnego projektu, dostępnych jest dziewięć gotowych szablonów, w tym Pong, labirynt i gra typu clicker. pyScratch ma otwarty kod źródłowy: [repozytorium na GitHubie](https://github.com/Figarist/pyScratch) działa na licencji MIT.

## Na lekcjach na razie jako ilustracja

Jak dotąd wprowadzam pyScratch wizualnie. Pokazuję dziecku jego własny skrypt jako klocki, a obok ten sam skrypt jako tekst. Dzieciom bardzo się to podoba.

Nie mam jeszcze konkretnych historii z dłuższego użycia. Narzędzie jest zupełnie nowe.

## Ograniczenia wersji testowej

pyScratch działa w trybie testowym i nie odwzorowuje jeszcze Scratcha w skali jeden do jednego. Oto, co warto wiedzieć na start (pełna lista znajduje się w [poradniku pod edytorem](https://sivochka.com/pyScratch/en/#guide)):

- To nie jest pełny Python. `import`, `class`, `return`, `break`, `continue`, `lambda`, `try`/`except`, f-stringi oraz kilka innych konstrukcji nie są obsługiwane, o czym kompilator informuje. Taki kod nie uruchomi się w zwykłym interpreterze Pythona.
- Skrypty z blokami, których konwerter jeszcze nie zna (na przykład Video Sensing czy Makey Makey), pozostają w projekcie i zapisują się bez zmian, ale edytor pokazuje dla nich tylko komentarz. Nie można ich edytować jako kodu.
- Komentarze przypięte do bloków, które pyScratch generuje na nowo, giną przy zapisie.
- Scena w pyScratch jest uproszczonym symulatorem, więc niektóre zachowania (na przykład wykrywanie dotyku) mogą działać nieco inaczej niż w Scratchu. Efekty rybiego oka i wiru nie są rysowane. Ostateczny wynik warto sprawdzić w Scratchu.
- Obsługiwane są wyłącznie pliki Scratcha 3.0 (`.sb3`). Starszy plik `.sb2` trzeba najpierw otworzyć w Scratchu 3.0 i zapisać ponownie.

## Dla kogo to jest

Dla dzieci od 9. roku życia, które dzielą się na dwie grupy. Jedne to ciekawi świata pasjonaci, którzy chcą napisać swoją grę ze Scratcha w Pythonie po prostu dlatego, że mogą. Drugie wyrosły już ze Scratcha i potrzebują kroku w stronę czegoś trudniejszego.

Jeśli nie masz pewności, czy dziecko jest gotowe na kod tekstowy, zacznij od wpisu [Scratch czy Python dla dzieci: kiedy przejść na kod tekstowy](https://sivochka.com/pl/blog/scratch-vs-python-for-kids/).

## Wypróbuj na własnej grze

Weź jedną ze swoich gier w Scratchu, zapisz ją jako `.sb3`, otwórz w [pyScratch](https://sivochka.com/pyScratch/en/) i zobacz, jak wygląda w Pythonie. Zmień jedną liczbę w pętli, uruchom projekt, zapisz z powrotem i otwórz w Scratchu.

Jeśli potem zechcecie pisać prawdziwego Pythona, od pustego pliku i bez podpowiedzi w postaci klocków, właśnie tym zajmujemy się na [indywidualnych lekcjach Pythona](https://sivochka.com/pl/tutoring/python/). A jeśli dziecko dopiero zaczyna od programowania blokowego, zajrzyj na [indywidualne lekcje Scratcha](https://sivochka.com/pl/tutoring/scratch/).
