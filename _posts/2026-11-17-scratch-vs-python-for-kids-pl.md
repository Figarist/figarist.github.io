---
layout: "post"
title: "Scratch czy Python dla dzieci: kiedy przejść na kod tekstowy"
description: "Scratch vs Python dla dzieci oczami korepetytora: dlaczego Scratch to nie zabawka, kiedy dzieci zwykle przechodzą na Pythona (około 10 lat) i co bywa najtrudniejsze."
last_modified_at: "2026-11-18 12:00:00 +0200"
date: "2026-11-17 07:00:00 +0200"
lang: "pl"
page_id: "scratch-vs-python-for-kids"
permalink: "/blog/scratch-vs-python-for-kids/"
excerpt: "Większość moich uczniów przechodzi ze Scratcha na Pythona w wieku około 10 lat, a w wieku 11 lat robimy to już na pewno. Dlaczego Scratch jest wart tego czasu i co w Pythonie staje się trudniejsze."
category: "education"
categories:
  - "education"
tags:
  - "education"
  - "coding"
  - "scratch"
  - "python"
author: "ihor"
image: "/assets/images/blog/pyscratch-pong.webp"
image_alt: "Środowisko pyScratch (interfejs ukraiński) pokazujące grę Pong jako kod Pythona obok sceny"
focus_keyword: "scratch czy python dla dzieci"
seo_title: "Scratch czy Python dla dzieci: kiedy zmienić"
seo_type: "BlogPosting"
canonical_url: null
robots: null
noindex: null
sitemap: true
related_posts: null
featured: null
hidden: null
redirect_from: null
toc: true
published: true
fmContentType: "Post"
---

Większość moich uczniów przechodzi ze Scratcha na Pythona w wieku około 10 lat. W wieku 11 lat zmieniamy go już na pewno. To krótka odpowiedź na pytanie „Scratch czy Python dla dzieci”, a dalsza część tekstu wyjaśnia, dlaczego odpowiedzią jest przedział wiekowy, a nie sztywna reguła.

Druga połowa tego pytania brzmi zazwyczaj tak: „Czy moje dziecko w ogóle potrzebuje Scratcha? Czy nie możemy od razu przejść do prawdziwego kodu?”. Z tym pomysłem nie zgadzam się bardziej niż z jakimkolwiek innym, więc zacznijmy właśnie od niego.

Jeśli dopiero wybierasz pierwszą ścieżkę, szerszą decyzję omawia [poradnik dla rodziców o wyborze ścieżki programowania](https://sivochka.com/pl/blog/how-to-choose-programming-for-child/). Ten wpis dotyczy jednego momentu: przejścia od bloków do kodu pisanego z klawiatury.

## Scratch to nie zabawka

Zarówno rodzice, jak i dzieci często nie doceniają Scratcha. Wiele dzieci spotkało go przelotnie w młodszych klasach szkoły podstawowej, przesunęło kota po ekranie przez kilka lekcji i zaszufladkowało jako „gry dla maluchów”. To wrażenie zostaje.

To, co faktycznie da się zbudować w Scratchu, to zupełnie inna historia. Zmienne, pętle, warunki, zdarzenia, komunikaty między duszkami, klonowanie, współrzędne: wszystko tam jest. Platformówka z grawitacją, punktacją, życiami i poziomami to prawdziwy program. Po prostu składa się z bloków.

To, co Scratch usuwa, to składnia. Bloku nie da się napisać z literówką i pasuje on tylko tam, gdzie ma sens. Dzięki temu dziecko spędza lekcję nad logiką gry, a nie na szukaniu brakującego nawiasu. Dlatego nie traktuję hasła „pomińmy Scratcha, przejdźmy od razu do kodu” jako drogi na skróty. Dla młodszego dziecka oznacza to zwykle zamianę myślenia na walkę z klawiaturą.

## Co staje się trudniejsze w Pythonie

Logika zostaje ta sama. Zmienia się niemal wszystko wokół niej, a najbardziej dwie rzeczy.

Inne są polecenia. Dziecko, które doskonale wie, co robią „powtórz 10” i „jeżeli dotyka krawędzi”, musi teraz nauczyć się, że te same pomysły zapisuje się jako `for` i `if`, z własną interpunkcją i wcięciami.

Jest bardzo dużo pisania. Każde polecenie, każda nazwa, każdy dwukropek przechodzi przez klawiaturę. Dla dziecka, które pisze wolno, pięciominutowy pomysł zamienia się w długą walkę z literami.

Porównanie obok siebie:

| Co się zmienia | Scratch | Python |
| :--- | :--- | :--- |
| Pisanie kodu | Przeciąganie i łączenie bloków | Pisanie tekstu na klawiaturze |
| Błędy | Bloki pasują tylko tam, gdzie mają sens | Literówka lub złe wcięcie zatrzymuje program błędem |
| Pierwsze efekty wizualne | Duszki od razu poruszają się na scenie | Rysunki w Turtle, potem małe programy tekstowe |
| Gdzie działa | W przeglądarce internetowej | Zainstalowany na komputerze z Windows lub Mac |

## Kiedy jest za wcześnie

Tak też się zdarza. Najwyraźniejszy przypadek to dziecko, które dopiero co pierwszy raz w życiu zetknęło się z klawiaturą. Wtedy lekcja Pythona polega głównie na szukaniu klawiszy, a programowanie schodzi na dalszy plan. Żadne tłumaczenie nie pomoże, jeśli wpisanie jednej linijki zajmuje minutę.

Dlatego patrzę na dziecko, a nie wyłącznie na datę urodzenia. Dziesięć lat to typowy moment na zmianę, ale dziesięciolatek, który nigdy nie pisał na klawiaturze, jest w innym miejscu niż ten, który codziennie pisze wiadomości.

Kilka ogólnych sygnałów, że dziecko jest bliżej gotowości:

- Potrafi wyjaśnić, co zrobi jego skrypt w Scratchu, zanim go zbuduje.
- Jego projekty stały się rozbudowane, z wieloma zmiennymi i powielonymi stosami bloków.
- Napisanie krótkiego zdania na klawiaturze nie zajmuje już wieczności.

Sygnały, że może być za wcześnie: dziecko wciąż na każdej lekcji odkrywa nowe bloki albo wolne pisanie zamienia każde zadanie w udrękę. Żadne z tych zjawisk nie jest problemem. Dodatkowy czas w Scratchu nie jest stracony, bo logika przechodzi razem z dzieckiem do Pythona.

A gdy widać, że czysty Python jest dla dziecka w tym momencie za trudny, nie naciskam. Przechodzimy na kurs w formie gry, taki jak [CodeCombat](https://codecombat.com), gdzie dziecko zaczyna uczyć się Pythona wewnątrz gry. Moim zdaniem format gry to w nauce programowania podstawa.

## Pierwsze lekcje Pythona: Turtle i małe przykłady

Moje pierwsze lekcje Pythona wykorzystują Turtle i proste przykłady. [Turtle](https://docs.python.org/3/library/turtle.html) jest częścią standardowej biblioteki Pythona, więc nie trzeba niczego dodatkowo instalować: importujesz moduł i na ekranie zaczyna rysować mały pisak. Dla dziecka przychodzącego ze Scratcha to znajome uczucie, bo rozszerzenie Pióro w Scratchu działa na tej samej zasadzie ruchu i obrotu.

Pierwszy program może być tak krótki:

{% capture py %}
import turtle

t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.right(90)

turtle.done()
{% endcapture %}
{% capture sb %}
when flag clicked
pen down
repeat (4)
  move (100) steps
  turn right (90) degrees
end
{% endcapture %}
{% include py-scratch.html python=py blocks=sb run=false %}

Dwa polecenia w pętli — i pojawia się kwadrat. Uczeń ze Scratcha od razu rozpoznaje „powtórz 4, przesuń o 100, obróć o 90” i teraz widzi ten sam pomysł zapisany tekstem. To rozpoznanie sprawia, że nowe polecenia wydają się mniej obce.

Po opanowaniu Turtle dzieci zwykle zaczynają interesować się samym Pythonem. Stamtąd przechodzimy do małych zadań albo pracujemy nad logiką gry, na przykład sterowaniem żółwiem z klawiatury — bardzo podobnie jak poruszaniem duszka w Scratchu.

{% assign now_ts = site.time | date: "%s" | plus: 0 %}
{% if now_ts >= 1795075200 %}
Jeśli Twoje dziecko ma już projekty w Scratchu i chce zobaczyć je w Pythonie, darmowe narzędzie [pyScratch](https://sivochka.com/pl/blog/pyscratch-python-to-scratch-sb3/) konwertuje projekty `.sb3` na kod Pythona i z powrotem.

{% endif %}

## Czego spodziewać się w pierwszych tygodniach

Pierwsze projekty w Pythonie często wyglądają mniej efektownie niż te ze Scratcha. Gra w Scratchu z kolorowymi duszkami potrafi wyglądać na bardziej skończoną niż kwadrat w Turtle czy quiz tekstowy, nawet jeśli wersja w Pythonie wymagała więcej myślenia. To normalne i z czasem mija.

Lepszy sprawdzian niż wygląd projektu: poproś dziecko, żeby wyjaśniło Ci jeden ze swoich programów. Jeśli potrafi powiedzieć, co robi pętla albo dlaczego zmienia się zmienna, przejście działa.

## Spróbujcie w domu

Uruchom powyższy program z kwadratem razem z dzieckiem. Następnie poproś, żeby bez podpowiedzi zamieniło go w trójkąt. Jeśli samo dojdzie do tego, że potrzeba 3 powtórzeń i obrotu o 120 stopni, to już myśli w Pythonie.

Jeśli chcesz, żeby ktoś poprowadził to przejście, zajrzyj na moje [indywidualne lekcje Pythona dla dzieci](https://sivochka.com/pl/tutoring/python/) i napisz do mnie, podając wiek dziecka oraz to, co udało mu się dotąd zbudować w Scratchu.
