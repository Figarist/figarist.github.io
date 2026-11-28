---
layout: "post"
title: "Hurtowa podmiana SFX w Unity bez psucia plików .meta"
description: "Wsadowe przycinanie ciszy, normalizacja do -1 dBFS i nadpisywanie dźwięków Unity lub Godot bez utraty powiązań .meta i .import dzięki KEEP NAMES w OGCruncher."
last_modified_at: null
date: "2026-11-22 10:00:00 +0200"
lang: "pl"
page_id: "ogcruncher-unity-sfx-batch-keep-names"
permalink: "/blog/ogcruncher-unity-sfx-batch-keep-names/"
excerpt: "Jak wsadowo przetwarzać efekty dźwiękowe do gier i wrzucać je z powrotem do Unity lub Godot bez zrywania odwołań .meta i .import przy użyciu OGCruncher."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/ogcruncher-card.png"
image_alt: "OGCruncher — przeglądarkowy bit-crusher audio i wsadowy konwerter OGG, WAV, MP3 do gier"
focus_keyword: "podmiana Unity SFX"
seo_title: "Hurtowa podmiana SFX w Unity bez psucia plików .meta"
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

Przepuszczasz dwadzieścia odgłosów kroków i uderzeń przez konwerter, kopiujesz je z powrotem do `Assets/`, a Unity traktuje je jako dwadzieścia zupełnie nowych zasobów. Konwerter dopisał przyrostek do każdej nazwy pliku, stare pliki `.meta` zostały osierocone, a każde odwołanie `AudioSource` w prefabach trzeba teraz podpiąć od nowa. Aby podmienić SFX w Unity bez zrywania powiązań `.meta`, każdy plik musi wrócić z dokładnie taką samą nazwą i rozszerzeniem.

W [OGCruncher](https://sivochka.com/OGCruncher/) nowy przełącznik **KEEP NAMES** załatwia to bezpośrednio, obok wybiórczego eksportu formatów, przycinania ciszy oraz limitu normalizacji `-1 dBFS`.

## Jak Unity i Godot zachowują powiązania dźwiękowe

Unity zapisuje GUID zasobu i ustawienia importu w pliku `.meta` obok pliku audio, a każdy plik bez pasującego `.meta` traktuje jako nowy zasób ([dokumentacja Unity](https://docs.unity3d.com/Manual/AssetMetadata.html)). Oznacza to, że `.meta` pozostaje powiązany tylko wtedy, gdy zgadzają się zarówno nazwa pliku, jak i rozszerzenie: zastąpienie `hit.wav` przez `hit.ogg` tworzy inny zasób.

Nad przyciskami PREVIEW i CRUNCH w OGCruncher możesz teraz wyłączyć niepotrzebne formaty (`OGG`, `WAV` lub `MP3`), aby przeglądarka pominęła ich kodowanie. Co najmniej jeden format zawsze pozostaje aktywny.

| Silnik | Format do eksportu | Przełącznik nazw | Efekt po nadpisaniu |
| --- | --- | --- | --- |
| Unity | Ten sam format (`WAV`, `OGG` lub `MP3`), który już leży w `Assets/` | KEEP NAMES włączony | Istniejące `.meta` i powiązania `AudioSource` zostają nienaruszone |
| Godot | `WAV` dla krótkich powtarzalnych SFX, `Ogg Vorbis` dla dłuższych klipów ([dokumentacja Godot](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_audio_samples.html)) | KEEP NAMES włączony | Istniejący `.import` (oraz `uid` w Godot 4) zostaje nienaruszony |

## Siedem kroków do czystej podmiany SFX w Unity

Całe przetwarzanie działa lokalnie w pamięci przeglądarki bez wysyłania plików na serwer.

1. Otwórz [OGCruncher](https://sivochka.com/OGCruncher/) i przeciągnij folder z krótkimi efektami SFX do strefy zrzutu.
2. Na pasku eksportu zostaw tylko format używany już w Twoim projekcie i wyłącz pozostałe dwa.
3. Włącz KEEP NAMES. Bez niego OGCruncher dopisuje `_crunched_<bits>bit_<rate>hz` do każdego pliku wynikowego. Z nim rdzeń nazwy pozostaje nietknięty, a `-2`, `-3` pojawiają się wyłącznie przy duplikatach nazw w tej samej paczce. **Rozszerzenie pliku nadal musi zgadzać się z oryginalnym zasobem, inaczej Unity i Godot utworzą nowy zasób zamiast ponownie użyć `.meta` lub `.import`.**
4. Włącz TRIM SILENCE, jeśli klipy mają martwą ciszę na początku lub końcu.
5. Zostaw aktywny sufit normalizacji `-1 dB` (teraz domyślny). Jeśli potrzebujesz konkretnie `0 dBFS`, przełącz go ręcznie.
6. Sprawdź wynik przez PREVIEW i przełączaj ORIGINAL / WET klawiszem `C`. Po wczytaniu `L` przełącza LOOP, a `Space` uruchamia odtwarzanie nawet od razu po kliknięciu kontrolek UI.
7. Kliknij CRUNCH, pobierz `ogcruncher_batch.zip` przez DOWNLOAD ALL (.ZIP) i wypakuj nadpisując oryginalne pliki w folderze projektu.

## Zachowanie ataku dźwięku dzięki przycinaniu i `-1 dBFS`

TRIM SILENCE szuka sygnału powyżej `-48 dBFS` i zostawia margines `2 ms` po obu stronach. Po przetworzeniu nakłada wyciszenie wejścia `1 ms` oraz wyciszenie wyjścia `4 ms`. Ponieważ fade-in `1 ms` mieści się wewnątrz marginesu `2 ms`, pierwszy szczyt transjentu kliknięcia lub uderzenia pozostaje nienaruszony, a trzask na końcu znika.

W trybie podglądu gałąź ORIGINAL jest przycinana do dokładnie tego samego okna co przetworzone audio. Przełączanie A/B w pętli pozostaje w fazie bez rozjazdu.

Domyślny limit `-1 dBFS` zostawia zapas dla kodeków stratnych (`OGG` i `MP3`), ograniczając przesterowanie szczytów po kompresji. Dla `WAV` głębia bitowa kontenera podąża za głębią efektu: 8-bitowy bez znaku PCM dla 1–8 bitów oraz 16-bitowy ze znakiem PCM dla 9–16 bitów.

Przegląd podstawowych funkcji bit-crushera znajdziesz w [pierwszym wpisie o OGCruncher](/pl/blog/ogcruncher-game-audio-bitcrusher/). Jeśli Ty lub Twoje dziecko tworzycie pierwszą grę w Unity i szukacie uporządkowanego wsparcia w pracy z zasobami, scenami i C#, sprawdźcie [indywidualne lekcje Unity i C#](/pl/tutoring/unity/).
