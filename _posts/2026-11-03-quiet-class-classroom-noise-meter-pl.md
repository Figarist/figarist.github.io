---
layout: "post"
title: "Quiet Class: miernik hałasu w klasie oparty na Web Audio DSP dla dalekich kamer przy telewizorach"
description: "Jak zbudowaliśmy działający offline miernik hałasu PWA do klasy: filtr górnoprzepustowy 120 Hz, podbicie mowy i kalibracja dla kamer przy TV."
last_modified_at: null
date: "2026-11-03 10:00:00 +0200"
lang: "pl"
page_id: "quiet-class-classroom-noise-meter"
permalink: "/blog/quiet-class-classroom-noise-meter/"
excerpt: "Jak zaprojektowaliśmy działający offline miernik hałasu PWA z filtrem górnoprzepustowym 120 Hz, podbiciem pasma mowy 2,2 kHz i kalibracją na 25. percentylu dla dalekich kamer przy szkolnych telewizorach."
category: "workshop"
categories:
  - "workshop"
tags:
  - "education"
  - "audio"
  - "tools"
  - "gamedev"
author: "ihor"
image: "/assets/images/blog/cards/quiet-class-classroom-noise-meter-en.webp"
image_alt: "Quiet Class: darmowy miernik hałasu w klasie na szkolne telewizory"
focus_keyword: "miernik hałasu w klasie"
seo_title: "Quiet Class: darmowy miernik hałasu w klasie na szkolne telewizory"
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

Wizualne mierniki hałasu są stałym elementem wyposażenia klas szkoły podstawowej (klasy 1–6), pomagając uczniom samodzielnie kontrolować głośność podczas pracy indywidualnej i grupowej. Jednak większość przeglądarkowych mierników hałasu zawodzi w realnych warunkach szkolnych: gdy smart TV lub projektor podłączony jest do komputera nauczyciela, a kamera internetowa znajduje się **2 do 4 metrów** od ławek uczniów.

Aby pokonać tę barierę sprzętową, stworzyliśmy [Quiet Class](https://sivochka.com/bouncy/) — autonomiczny, działający offline miernik hałasu PWA, minutnik zadań oraz system nagród ze słoikiem gwiazdek, wyposażony we własny potok cyfrowego przetwarzania sygnału (DSP) w Web Audio API.

---

### Dlaczego tradycyjne mierniki hałasu w przeglądarce zawodzą z kamerami w klasie

Podczas testów w klasach z kamerami zamontowanymi przy telewizorze cztery problemy akustyczne stale psuły działanie prostych mierników głośności RMS:

1. **Pułapka kalibracji na 90. percentylu**: Gdy kalibracja ciszy w sali przez 3 sekundy brała 90. percentyl, pojedyncze kaszlnięcie, szurnięcie krzesłem lub szept podnosiły „poziom ciszy” do `-35 dB`. Kolejne progi skakały do `-17 dB` — w efekcie uczniowie musieli krzyczeć prosto w mikrofon, aby wywołać ostrzeżenie.
2. **Nierealistyczne progi dla dalekiego pola**: Wymaganie `+10 dB` dla strefy żółtej i `+18 dB` (63-krotny wzrost energii akustycznej) dla strefy czerwonej ignoruje tłumienie fali wraz z kwadratem odległości. Zwykła rozmowa z 3 metrów dodaje zaledwie `+4.5 do +9 dB` ponad tło pomieszczenia.
3. **Zbyt długie okna wygładzania (`700 ms`)**: Wymaganie niemal pełnej sekundy ciągłego krzyku sprawiało, że krótkie okrzyki (`200–350 ms`) były całkowicie pomijane.
4. **Niskoczęstotliwościowy szum wentylatorów PC i projektora**: Wentylatory chłodzące, klimatyzatory i drgania biurek (`50–110 Hz`) sztucznie zawyżają szerokopasmowe odczyty RMS w dziedzinie czasu, maskując częstotliwości ludzkiej mowy.

---

### Potok Web Audio DSP

Zamiast odczytywać surowe próbki z mikrofonu bezpośrednio, [Quiet Class](https://sivochka.com/bouncy/) kieruje strumień audio (`echoCancellation: false`, `noiseSuppression: false`, `autoGainControl: false`) przez czterostopniowy graf Web Audio:

#### 1. Filtr górnoprzepustowy 120 Hz (wycięcie wentylatorów i stuków)
Filtr bikwadratowy `highpass` na `120 Hz` (`Q = 0.7`) usuwa niskoczęstotliwościowy szum wentylatorów komputerowych, projektorów sufitowych i uderzeń w ławki jeszcze przed oceną poziomu głośności.

#### 2. Filtr pasmowy obecności mowy 2,2 kHz (`+3.5 dB`)
Filtr typu `peaking` ustawiony na `2200 Hz` (`Q = 1.0`, wzmocnienie `+3.5 dB` w profilu Webcam) uwydatnia spółgłoski i szepty ludzkiego głosu, zapewniając wysoki stosunek sygnału do szumu nawet z odległości 3–4 metrów od ekranu.

#### 3. Programowe wzmocnienie przedwzmacniacza (`0.5×` do `4.5×`)
Nauczyciele mogą przełączać się między trzema profilami sprzętowymi (**Webcam 2–4m** przy `2.2×`, **Laptop / PC** przy `1.5×` oraz **Headset / Close** przy `1.0×`) lub precyzyjnie dostroić wzmocnienie przedwzmacniacza, obserwując monochromatyczny wskaźnik VU z telemetrią dB na żywo.

#### 4. Kalibracja na 25. percentylu i powolne śledzenie ciszy
* **Kalibracja odporna na skoki**: Kalibracja pokoju próbkuje 3 sekundy dźwięku i wybiera **25. percentyl** ograniczony do zakresu `[-75 dB, -44 dB]`, ignorując chwilowe hałasy i gwarantując, że miernik nigdy nie stanie się „głuchy”.
* **Adaptacyjne śledzenie ciszy**: Podczas dłuższych okresów spokoju (`> 2.5 s` poniżej poziomu bazowego) próg tła łagodnie opada w kierunku rzeczywistego minimum akustycznego sali.

---

### Fizyka Verleta „Wańka-wstańka” i motywacja w klasie

* **Fizyka Verleta 60 Hz z efektem wańki-wstańki**: Postacie reagują proporcjonalnym drżeniem w Strefie Żółtej (`+4.5 dB`, opóźnienie `120 ms`) oraz podskokiem `scareBounce` w Strefie Czerwonej (`+9.0 dB`, opóźnienie `250 ms`). Oświetlenie w przestrzeni świata pozostaje nieruchome w lewym górnym rogu, podczas gdy buźki postaci przechylają się w zakresie `±25°` niczym fizyczne zabawki typu wańka-wstańka.
* **7 motywów wizualnych i tryb dzienny na projektor**: Zawiera motywy *Sleepy Critters*, *Solar System* (dwuprzebiegowe pierścienie Saturna i terminatory dnia/nocy), *Soap Bubbles*, *Emoji*, *Billiards*, *Numbers* oraz *Eyes*, a także wysokokontrastowy tryb **Light Room** do nasłonecznionych sal.
* **Szklany słoik na gwiazdki i profile wielu klas**: Każde 30 sekund ciągłej ciszy wystrzeliwuje złotą gwiazdkę po kwadratowej krzywej Béziera do klasowego słoika, zapisując cele tygodniowe i nagrody dla wielu klas (`4-B`, `3-A`, `5-C`) w `localStorage`.
* **100% lokalnej prywatności i offline PWA**: Dźwięk jest przetwarzany wyłącznie w pamięci RAM za pomocą Web Audio API — nic nie jest nagrywane ani wysyłane przez sieć.

Uruchom narzędzie bezpośrednio w przeglądarce:  
👉 **[Otwórz Quiet Class online](https://sivochka.com/bouncy/)**

Poznaj nasze pozostałe otwarte narzędzia edukacyjne dla szkół i kółek STEM:
* **[OGCruncher — darmowy internetowy bit-crusher audio i optymalizator SFX OGG/WAV/MP3 do gier](https://sivochka.com/OGCruncher/)**
* **[3D Club Studio — proceduralny generator 3D bez podpór](https://sivochka.com/3d-club-studio/)**
* **[Katalog instrukcji budowania LEGO WeDo 2.0](https://sivochka.com/lego-catalog/)**

Interesują Cię lekcje indywidualne online z tworzenia gier w Unity, C#, Pythona, Scratcha lub modelowania 3D?  
👉 **[Zobacz ofertę korepetycji i mentoringu 1 na 1 z Ihorem Sivochką](https://sivochka.com/pl/tutoring/)**
