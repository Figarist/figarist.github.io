---
layout: "post"
title: "Projekt Scratch nie chce się zapisać: jak nie stracić gry"
description: "Scratch pokazuje komunikat \"Project could not save\"? Zapisz .sb3 na komputerze, przeładuj stronę i wczytaj grę z powrotem. Oraz jak zmniejszyć zbyt duży projekt."
last_modified_at: null
date: "2026-11-24 10:00:00 +0200"
lang: "pl"
page_id: "scratch-project-wont-save"
permalink: "/blog/scratch-project-wont-save/"
excerpt: "Czasem Scratch po prostu nie chce zapisać projektu. Na lekcjach mamy prostą procedurę: najpierw plik .sb3 trafia na komputer, potem przeładowujemy stronę, a następnie wczytujemy plik z powrotem do edytora."
category: "education"
categories:
  - "education"
tags:
  - "scratch"
  - "education"
  - "tools"
author: "ihor"
image: "/assets/images/blog/pyscratch-inspector.webp"
image_alt: "Zakładka Inspector (.sb3) w pyScratch (interfejs ukraiński): limity Scratcha i kompresja dużych obrazów"
focus_keyword: "projekt scratch nie chce się zapisać"
seo_title: "Projekt Scratch nie chce się zapisać? Pierwsza pomoc i przyczyny"
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

Najbardziej irytująca rzecz, jaka może przydarzyć się na lekcji Scratcha: dziecko spędziło mnóstwo czasu na budowaniu gry, a projekt Scratch nie chce się zapisać. Na górze ekranu wisi komunikat **„Project could not save.”**, a przycisk „Try Again” nie pomaga. Zwykle winne jest połączenie. Tak było od zawsze, dlatego na lekcjach mamy prostą procedurę.

## Pierwsza pomoc: najpierw plik, wszystko inne później

Nie odświeżaj strony, dopóki projekt nie znajdzie się na Twoim komputerze. Po przeładowaniu Scratch może otworzyć ostatnią wersję z serwera, a wszystko, co tam nie dotarło, przepadnie.

1. Zapisz kopię na komputerze. W menu Plik wybierz **Zapisz na swoim komputerze**. Przycisk „Pobierz” bezpośrednio w komunikacie o błędzie robi dokładnie to samo. Przeglądarka zapisuje plik `.sb3`, a w środku jest cała gra: duszki, skrypty, kostiumy i dźwięki.
2. Odśwież stronę. Jeśli Scratch pokazuje, że nastąpiło wylogowanie, zaloguj się ponownie.
3. Wczytaj plik z powrotem. W menu Plik wybierz „Wczytaj ze swojego komputera” i wskaż właśnie zapisany plik `.sb3`. Jeśli Scratch zapyta „Zastąpić zawartość bieżącego projektu?”, potwierdź.
4. Pracuj dalej. Dla pewności kliknij „Plik → Zapisz teraz”. Jeśli pojawi się „Projekt zapisany.”, wszystko jest w porządku.

Czasem serwer mimo wszystko nadal nie chce przyjąć projektu. Wtedy po prostu pracujemy dalej i co jakiś czas ponownie zapisujemy plik na komputerze. Przynajmniej wszystko siedzi w `.sb3`, a grę można wgrać do edytora później.

## Dlaczego projekt Scratch nie chce się zapisać

[Scratch Wiki](https://en.scratch-wiki.info/wiki/What_does_%22project_could_not_save%22_mean%3F) podaje trzy przyczyny komunikatu „Project could not save”:

- nastąpiło wylogowanie z konta;
- komputer stracił połączenie z internetem;
- projekt jest zbyt duży.

Zaleca też sprawdzanie ich po kolei i próbę zapisu po każdym kroku: najpierw internet, potem w nowej karcie sprawdzenie, czy jesteś zalogowany na właściwe konto, a dopiero potem szukanie ciężkich plików.

Na moich lekcjach najczęstszy jest drugi punkt z tej listy: coś z połączeniem i procedura z `.sb3` od razu pomaga. Jeśli gra nadal nie chce się zapisać po odświeżeniu i przy działającym internecie, pora spojrzeć na rozmiar.

## Kiedy projekt Scratch jest zbyt duży

Nie ma jednego ogólnego limitu rozmiaru pliku. Limity dotyczą poszczególnych części projektu. Według [strony Project File Size na Scratch Wiki](https://en.scratch-wiki.info/wiki/Project_File_Size) w Scratchu 3.0:

- każdy pojedynczy zasób (kostium, tło, dźwięk) musi mieć poniżej 10 MB;
- plik `project.json` wewnątrz `.sb3`, przechowujący skrypty, zmienne, listy i nazwy, musi mieć poniżej 5 MB.

Prawie całą wagę robią obrazy i dźwięki; skrypty zajmują bardzo mało miejsca. W projektach dzieci najcięższe są zwykle zdjęcia wklejone jako tła oraz długie dźwięki, szczególnie muzyka grająca przez całą grę.

### Odchudzanie projektu w samym Scratchu

Wskazówki ze [Scratch Wiki](https://en.scratch-wiki.info/wiki/Project_File_Size):

- usuń dźwięki, kostiumy, tła i duszki, których nie używasz;
- przytnij długą muzykę albo zastąp ją krótszą pętlą;
- rysuj proste kształty w trybie wektorowym zamiast bitmapowego (choć konwersja istniejącego kostiumu bitmapowego na wektor nie zmniejszy jego rozmiaru);
- skróć bardzo długie nazwy zmiennych, list i duszków oraz długie komentarze, bo powiększają `project.json`.

Jeśli projekt po tych krokach nadal nie zapisuje się online, Wiki sugeruje pracę w [edytorze offline Scratcha](https://scratch.mit.edu/download), który otwiera te same pliki `.sb3`.

### Sprawdzanie w inspektorze pyScratch

Ręczne szukanie jednego pliku ważącego 8 MB bywa trudne: Scratch nie pokazuje rozmiaru kostiumów i dźwięków w megabajtach. Obok kostiumu widzisz tylko wymiary w pikselach, a obok dźwięku długość w sekundach. Dlatego dodałem zakładkę **Inspector (.sb3)** do mojego darmowego narzędzia [pyScratch](https://sivochka.com/pyScratch/en/). Otwórz tam plik `.sb3`, a Inspektor pokaże:

- liczniki: duszki, tła, kostiumy, dźwięki, zmienne i listy (globalne oraz lokalne), łączną liczbę bloków i osierocone skrypty bez bloku startowego;
- rozmiar `project.json` jako pasek względem limitu 5 MB;
- tabelę wszystkich kostiumów i dźwięków od najcięższego do najlżejszego, z oznaczeniami „Large (>500 KB)” oraz „Over 10 MB!”.

Są tam też dwa przyciski. „Remove Unused Assets” usuwa z archiwum pliki, do których projekt się nie odwołuje. „Compress Large PNG/JPG (>960px or >500 KB)” skaluje duże obrazy bitmapowe do 960 pikseli na dłuższym boku i ponownie je kompresuje. Duży PNG bez przezroczystości zmienia się przy tym w JPG. Następnie zapisz wynik przez „File → Save .sb3” i wczytaj do Scratcha.

pyScratch jest obecnie w trybie testowym, więc zachowaj oryginalny `.sb3` osobno i sprawdź skompresowany projekt w Scratchu przed dalszą pracą. Plik jest przetwarzany w Twojej przeglądarce i nigdzie nie jest wysyłany. Więcej o samym narzędziu napisałem we wpisie [o pyScratch i pisaniu Scratcha w Pythonie](https://sivochka.com/pl/blog/pyscratch-python-to-scratch-sb3/).

## Nawyk, który ratuje pracę

Zapisywanie na serwerze Scratcha jest wygodne, ale nie polecam polegać wyłącznie na nim. Gdy serwer zawiedzie, ratuje Cię lokalna kopia.

Dzieci nie wyrabiają tego nawyku same z siebie. Moi uczniowie prawie nigdy nie trzymają lokalnej kopii `.sb3`, jeśli nikt im nie przypomni — i dotyczy to każdego dziecka, którego uczę. Muszę przypominać o tym za każdym razem, i to nie tylko w Scratchu: projekty Unity, skrypty Pythona i pliki Blendera zostają niezapisane dokładnie w ten sam sposób. To masowy problem.

Dlatego korzystaj z „Plik → Zapisz na swoim komputerze” na koniec każdych zajęć, a przy dużym projekcie także w połowie pracy. Jeśli dziecko pracuje samo, przypominanie o tym to zadanie dla dorosłego obok. Taki plik `.sb3` zwykle niewiele waży, a w gorszy dzień ocala wszystko, co dziecko zdołało zbudować.

Jeśli Twoje dziecko dużo robi w Scratchu i chce pójść dalej — od pierwszej gry do własnych projektów — zapraszam na [indywidualne lekcje Scratcha](https://sivochka.com/pl/tutoring/scratch/). A jeśli gra właśnie nie chce się zapisać z powodu rozmiaru, otwórz ją w [pyScratch](https://sivochka.com/pyScratch/en/) i spójrz na tabelę zasobów: najcięższy plik będzie w pierwszym wierszu.
