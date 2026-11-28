---
layout: "post"
title: "OGCruncher: darmowy bit-crusher audio w przeglądarce i wsadowy optymalizator SFX dla gier indie"
description: "Jak działa OGCruncher: lokalny bit-crusher Web Audio, reduktor częstotliwości próbkowania i wsadowy eksporter OGG/WAV/MP3 dla Unity, Godot, WebGL i Wear OS."
last_modified_at: "2026-11-21 09:20:00 +0200"
date: "2026-11-15 10:00:00 +0200"
lang: "pl"
page_id: "ogcruncher-game-audio-bitcrusher"
permalink: "/blog/ogcruncher-game-audio-bitcrusher/"
excerpt: "Analiza techniczna OGCruncher — lokalnego bit-crushera Web Audio, reduktora częstotliwości próbkowania i wsadowego eksportera OGG/WAV/MP3 stworzonego dla Unity, Godot, WebGL i Wear OS."
category: "workshop"
categories:
  - "workshop"
tags:
  - "gamedev"
  - "audio"
  - "unity"
  - "tools"
author: "ihor"
image: "/assets/images/blog/cards/ogcruncher-game-audio-bitcrusher-en.webp"
image_alt: "OGCruncher: darmowy internetowy bit-crusher audio dla efektów SFX w grach"
focus_keyword: "internetowy bit-crusher audio"
seo_title: "OGCruncher: darmowy internetowy bit-crusher audio dla efektów SFX w grach"
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

Podczas wydawania gier na zegarki Wear OS, przeglądarki WebGL lub urządzenia mobilne projektanci dźwięku i twórcy indie stale balansują między dwoma sprzecznymi ograniczeniami: **mikroskopijnym budżetem rozmiaru paczki** oraz **wyrazistym brzmieniem retro**. Nowoczesne biblioteki WAV 24-bit / 48 kHz błyskawicznie pożerają megabajty, a zwykłe konwertery w chmurze odbierają dźwiękom charakter lub zmuszają deweloperów do wysyłania nieopublikowanych zasobów gry na zewnętrzne serwery.

Aby dać twórcom szybkie rozwiązanie niewymagające wysyłania plików, zaprojektowaliśmy [OGCruncher](https://sivochka.com/OGCruncher/) — darmowy, działający w przeglądarce kreatywny bit-crusher, reduktor częstotliwości próbkowania i wsadowy procesor wieloformatowy oparty na `OfflineAudioContext`, DSP na tablicach `Float32Array` oraz dedykowanych Web Workerach.

---

### Dlaczego kreatywny bit-crushing wygrywa ze ślepą kompresją w efektach SFX do gier

* **8-bitowy i 16-bitowy PCM WAV bez opóźnień**: Krótkie kliknięcia interfejsu, uderzenia w walce i kroki odtwarzają się natychmiastowo bez narzutu dekompresji CPU przy eksporcie jako kompaktowy plik mono PCM WAV o częstotliwości `16,000–22,050 Hz`.
* **Celowy charakter Lo-Fi**: Zmniejszenie głębi bitowej (`1–16 bit`) i częstotliwości próbkowania (`4,000–48,000 Hz`) zamienia sterylne nagrania studyjne w autentyczne tekstury 8-bitowego chiptune, NES lub Amigi 500.
* **100% lokalnej prywatności w przeglądarce**: Każde dekodowanie, filtrowanie, kwantyzacja i kodowanie odbywa się lokalnie w pamięci RAM Twojej przeglądarki — ani jeden bajt dźwięku nie opuszcza urządzenia.

---

### Wewnątrz potoku DSP narzędzia OGCruncher

W przeciwieństwie do narzędzi, w których odsłuch podglądu różni się od wyeksportowanych plików, [OGCruncher](https://sivochka.com/OGCruncher/) współdzieli jeden deterministyczny kontrakt renderowania między podglądem A/B Dry/Wet a eksportem wsadowym:

#### 1. Wstępne filtrowanie `OfflineAudioContext` i skalowanie prędkości/wysokości
Przed uruchomieniem kwantyzacji na poziomie próbek dźwięk jest przepróbkowany do wybranej częstotliwości wyjściowej (`4,000–48,000 Hz`), miksowany do Mono lub Stereo, skalowany pod względem tempa/wysokości (`0.5×–2.0×`) i kształtowany przez trzystopniowy łańcuch filtrów Web Audio:
* **Filtr górnoprzepustowy (`20–1000 Hz`)** usuwający niskoczęstotliwościowy muł i dudnienie.
* **Filtr dolnoprzepustowy (`500–20000 Hz`)** dla ciepłego, przytłumionego brzmienia lub charakterystyki starego głośnika.
* **Podbicie basu (`80 Hz`, `0 to +15 dB`)** przywracające moc niskich tonów po redukcji bitów.

#### 2. Potok zgniatania `Float32Array` (`js/dsp-core.js` i Web Worker)
1. **Czyszczenie wartości niefinitywnych i deterministyczny szum tła**: Zabezpiecza próbki `NaN`/`Infinity` i opcjonalnie dodaje powtarzalny szum taśmy (`0–0.05`).
2. **Tryb Crush (usuwanie składowej stałej DC + miękki ekspander + dither TPDF + 2-punktowy antyaliasing)**: Usuwa przesunięcie DC, stosuje ekspansję `sign(x) * |x|^1.15`, kwantyzuje do `1–16` bitów (z opcjonalnym ditherem o trójkątnym rozkładzie gęstości prawdopodobieństwa) i wykonuje dwupunktowe wygładzanie.
3. **Nasycenie Grit (`tanh`) i powiązana normalizacja -1 dBFS**: Stosuje nasycenie harmoniczne `tanh(x * drive) / tanh(drive)` (`1.0–10.0`), a następnie powiązaną dla obu kanałów stereo normalizację szczytową domyślnie do `-1 dBFS` (zapas dla OGG/MP3, przełączalny na `0 dBFS`) bez zaburzania balansu stereo.

#### 3. Wieloformatowy Worker wsadowy i resampling MP3 Lanczos-3
Dla każdego pliku w kolejce klasyczny Web Worker koduje wyłącznie wybrane formaty (OGG, WAV i MP3 można włączać pojedynczo, przy czym co najmniej jeden jest zawsze aktywny), dzięki czemu błąd jednego kodeka nigdy nie odrzuca pozostałych plików wynikowych:
* **PCM WAV**: Automatycznie zapisuje 8-bitowy PCM bez znaku dla głębi `1–8 bit` lub 16-bitowy PCM ze znakiem dla głębi `9–16 bit` z wyrównanym do słów dopełnieniem sekcji RIFF `data`.
* **Ogg Vorbis (`.ogg`)**: Koduje bezpośrednio w docelowej częstotliwości próbkowania na potrzeby lekkiego odtwarzania w Unity, Godot i WebGL.
* **MP3 (`128 kbps`)**: Automatycznie przepróbkowuje niestandardowe dla MPEG częstotliwości (takie jak `4,000 Hz` czy `28,000 Hz`) za pomocą okienkowanej interpolacji **Lanczos-3** do najbliższej poprawnej częstotliwości MPEG (`8,000–48,000 Hz`).

---

### Najważniejsze funkcje w codziennej pracy

* **Tryb Simple i Advanced + presety**: Zacznij szybko od czterech prostych poziomów jakości (*TINY*, *LOW*, *MEDIUM*, *HIGH*) lub przełącz się na tryb Advanced, aby korzystać z pełnych presetów rackowych (*LO-Q MODE*, *NES 8-BIT*, *AMIGA 500* i *MY PRESET*).
* **Porównanie Dry/Wet A/B na żywo i widmo FFT**: Przełączaj natychmiastowe porównanie z płynnym przejściem (`C`), obserwuj telemetrię RMS/Peak/Duration na żywo lub analizuj widma Dry i Wet jednocześnie.
* **Wsadowy ZIP i linki do udostępniania**: Eksportuj całe paczki efektów SFX w jednym archiwum `ogcruncher_batch.zip` lub skopiuj link z hashem URL presetu, aby udostępnić dokładne ustawienia brzmienia swojemu zespołowi.

Uruchom procesor bezpośrednio w przeglądarce (PWA gotowe do pracy offline):  
👉 **[Otwórz OGCruncher online](https://sivochka.com/OGCruncher/)**

Poznaj nasze pozostałe darmowe narzędzia przeglądarkowe dla twórców i nauczycieli:
* **[Quiet Class — adaptacyjny miernik hałasu w klasie oparty na Web Audio DSP](https://sivochka.com/bouncy/)**
* **[3D Club Studio — proceduralny generator 3D bez podpór](https://sivochka.com/3d-club-studio/)**
* **[Katalog instrukcji budowania LEGO WeDo 2.0](https://sivochka.com/lego-catalog/)**

Chcesz nauczyć się tworzenia gier w Unity, C#, integracji dźwięku lub Pythona w trybie 1 na 1?  
👉 **[Zobacz ofertę korepetycji i mentoringu 1 na 1 z Ihorem Sivochką](https://sivochka.com/pl/tutoring/)**
