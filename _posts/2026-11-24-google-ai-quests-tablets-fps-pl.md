---
layout: "post"
title: "Google AI Quests na tabletach: test pokazu slajdów w 2–10 FPS"
description: "Przetestowałem Google AI Quests na szkolnych tabletach i laptopie: renderowanie 2–10 FPS, ekran minimum 1024x600, przejrzysty UI i pewny zapis postępów."
last_modified_at: null
date: "2026-11-24 15:00:00 +0200"
lang: "pl"
page_id: "google-ai-quests-tablets-fps"
permalink: "/blog/google-ai-quests-tablets-fps/"
excerpt: "Przetestowałem Google AI Quests na szkolnych tabletach i zwykłym laptopie w klasach 4–7. Interfejs i zapis postępów działają dobrze, ale renderowanie utknęło na 2–10 FPS."
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
image_alt: "Test wydajności Google AI Quests na szkolnych tabletach"
focus_keyword: "Google AI Quests na tabletach"
seo_title: "Google AI Quests na tabletach: test szkolny 2–10 FPS"
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
    "01": "Uczeń trzyma szkolny tablet pokazujący leśną scenę z misji powodziowej"
    "02": "Profesor Skye pokazuje 90% dokładności prognozy modelu na tablecie"
    "03": "Ekran Clean the data z tabelą opadów w Google AI Quests na tablecie"
    "04": "Postać z misji dziękuje klasie za trafne prognozy na szkolnym tablecie"
    "05": "Misja Dusk Dunes skanująca obraz siatkówki oka na tablecie"
toc: true
published: true
fmContentType: "Post"
---

Dziś, 24 listopada 2026 roku, Google Ukraina organizuje otwartą prezentację na żywo gry edukacyjnej AI Quests dla nauczycieli. Zdążyłem już przetestować Google AI Quests na tabletach z uczniami klas 4–7, gdzie każde dziecko miało własne urządzenie, i strona techniczna okazała się znacznie bardziej surowa, niż sugerują oficjalne komunikaty premierowe.

Ukraińska wersja wystartowała 16 listopada przy wsparciu [Ministerstwa Edukacji i Nauki Ukrainy](https://mon.gov.ua/news/google-zapuskaie-ukrainskoiu-bezkoshtovnu-hru-ai-quests-pro-shtuchnyi-intelekt-dlia-shkoliariv), [Ministerstwa Transformacji Cyfrowej](https://thedigital.gov.ua/news/education/hrayte-ta-vyvchayte-shtuchnyy-intelekt-google-zapuskaye-ai-quests-dlia-ukrayinskykh-pidlitkiv) oraz Diia.Osvita. Google Research stworzyło projekt wspólnie ze Stanford Accelerator for Learning i na papierze wygląda to jak lekka przeglądarkowa aktywność do szkoły. W praktyce głównym wąskim gardłem jest optymalizacja.

## Jak Google AI Quests działało na tabletach i laptopie

Oficjalna [strona AI Quests](https://research.google/ai-quests/intl/uk_ua) podaje minimalną rozdzielczość ekranu 1024 x 600 pikseli, ale nie wymienia żadnych wymagań dotyczących GPU ani CPU. W prawdziwej klasie {% include term.html id="render" text="renderowanie" %} natychmiast stało się największą przeszkodą.

Zarówno budżetowe tablety szkolne, jak i zwykły laptop dławiły się na scenach. Gra utrzymywała się na poziomie 2 do 10 {% include term.html id="fps" %} przez całą lekcję, a absolutnie każdy uczeń narzekał na pokaz slajdów. Optymalizacja pod skromniejszy sprzęt szkolny wydaje się minimalna i szczerze mówiąc nie wiem, jaki tablet szkolny miałby tu utrzymać stabilne 30 FPS.

{% include gallery.html id="tablets" caption="Google AI Quests na szkolnych tabletach podczas lekcji" %}

| Sprawdzenie | Oficjalna strona gry | Prawdziwe urządzenia w klasie |
| :--- | :--- | :--- |
| Minimalny ekran | 1024 x 600 pikseli | Uruchamia się, ale sceny są ciężkie w renderowaniu |
| Liczba klatek | Nie podano | 2 do 10 FPS na tabletach szkolnych i zwykłym laptopie |
| Zapis postępów | W przeglądarce, bez kodu | Działa pewnie przy przeładowaniu i ponownym wejściu |
| Interfejs (UI/UX) | Interaktywna gra webowa | Przejrzysty i czytelny, gdy ekran akurat nie zacina |

## Co działa dobrze po stronie technicznej

Mimo ciężkiego renderowania dwie rzeczy w tej wersji zasługują na pochwałę. Po pierwsze, {% include term.html id="ui-ux" text="UI" %} i układ ekranu są przemyślane: dzieci szybko widzą, gdzie kliknąć i gdzie przeczytać podpowiedzi.

Po drugie, zapis postępów działa niezawodnie. Zamknięcie karty, ponowne otwarcie przeglądarki czy odświeżenie strony nie kasuje pracy ucznia. W szkolnej sali, gdzie Wi-Fi lub przeglądarka potrafią przerwać w każdej chwili, ma to ogromne znaczenie.

## Dzisiejsza prezentacja Google i materiały dla nauczycieli

Dziś, 24 listopada, Google prowadzi darmową [prezentację na żywo na YouTube gry AI Quests dla ukraińskich nauczycieli](https://www.youtube.com/live/hyWXjRpQYPQ) bez rejestracji. Spotkanie pokazuje grę, omawia włączenie jej w lekcję i demonstruje generowanie certyfikatów dla uczniów.

Gotowe [ukraińskie materiały dla nauczycieli](https://research.google/ai-quests/intl/uk_ua/teacher-resources) ze scenariuszami lekcji i pytaniami do dyskusji są już na platformie. Jeśli obejrzysz dziś transmisję, zarezerwuj po niej kilka minut na przetestowanie strony na jednym prawdziwym urządzeniu ucznia, zanim zaplanujesz zajęcia dla całej klasy. Jako krótkie podsumowanie po ukraińsku możesz też użyć mojego [quizu online na Na Urok do Google AI Quests](https://naurok.com.ua/test/google-ai-quests-yak-navchaetsya-shi-topkiy-rinok-i-prismerkovi-dyuni-3985937.html).

## Czy warto uruchamiać to na szkolnym sprzęcie już teraz

**W obecnym stanie nie mogę polecić uruchamiania Google AI Quests na budżetowych tabletach szkolnych ani zwykłych laptopach.** Pomysł edukacyjny jest solidny, ale 2 do 10 FPS rozprasza uwagę i frustruje dzieci w kilka minut.

Zanim zaprosisz do gry całą klasę, otwórz ją na jednym tablecie ucznia i sprawdź, jak płynnie reagują animacje. Jeśli zależy Ci na lekcjach programowania i informatyki opartych na narzędziach działających płynnie na zwykłym sprzęcie domowym lub szkolnym, zajrzyj na moją [stronę indywidualnych korepetycji z programowania](https://sivochka.com/pl/tutoring/).
