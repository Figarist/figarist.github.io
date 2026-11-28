(function () {
  var root = document.getElementById("tutoring-calculator");
  if (!root) return;
  var lang = root.getAttribute("data-calc-lang") || "uk";
  var base = root.getAttribute("data-base-url") || "/tutoring/";
  var state = { age: "9-11", goal: "unity", device: "pc", hw: "" };

  var copy = {
    uk: {
      unity: ["Unity & C#", "За 1–3 місяці учень збере власну 2D/3D-гру з фізикою, UI та скриптами на C# (як кейси учнів Дані та Максима)."],
      minecraft: ["Python у Minecraft (Minescript)", "Автоматизація будівництва, міні-ігри та реальний синтаксис Python прямо у світі Minecraft Java."],
      scratch: ["Scratch (візуальне програмування)", "Ідеальний старт для логіки, циклів і координат без складного друку коду — перша гра вже на 1–2 уроці."],
      informatics: ["Шкільна інформатика та алгоритми", "Системне підтягування програми UA / EU / US / CA, логіка, структури даних і впевненість на уроках."],
      tabWarn: "Для Unity 6 та Minecraft Java/Minescript потрібен ПК або ноутбук (Windows/macOS). На планшеті доступний лише Scratch.",
      weakWarn: "На слабкому ноутбуці/Chromebook краще стартувати з Scratch або легкого Python/2D-логіки; 3D у Unity може гальмувати.",
      rateOk: "1000 грн / 20 € підтверджено",
      rateNo: "потрібно узгодити бюджет (1000 грн / 20 €)",
      hwOk: "Пристрій перевірено: {cores} потоків CPU, WebGL2 {webgl} — підходить для Unity/Python.",
      hwLow: "Пристрій перевірено: {cores} потоків CPU, WebGL2 {webgl} — краще підійде Scratch або легкий Python."
    },
    ru: {
      unity: ["Unity & C#", "За 1–3 месяца ученик соберёт свою 2D/3D-игру с физикой, UI и скриптами на C#."],
      minecraft: ["Python в Minecraft (Minescript)", "Автоматизация строительства, мини-игры и настоящий синтаксис Python в Minecraft Java."],
      scratch: ["Scratch (визуальное программирование)", "Идеальный старт для логики, циклов и координат — первая игра уже на 1–2 занятии."],
      informatics: ["Школьная информатика и алгоритмы", "Системная подготовка по программе UA / EU / US / CA и алгоритмическое мышление."],
      tabWarn: "Для Unity 6 и Minecraft Java/Minescript нужен ПК или ноутбук (Windows/macOS). На планшете доступен только Scratch.",
      weakWarn: "На слабом ноутбуке/Chromebook лучше начать со Scratch или лёгкого Python.",
      rateOk: "1000 грн / 20 € подтверждено",
      rateNo: "нужно согласовать тариф (1000 грн / 20 €)",
      hwOk: "Проверено: {cores} потоков CPU, WebGL2 {webgl} — подходит для Unity/Python.",
      hwLow: "Проверено: {cores} потоков CPU, WebGL2 {webgl} — лучше начать со Scratch или лёгкого Python."
    },
    ko: {
      unity: ["Unity & C#", "1~3개월 안에 C# 스크립트와 물리 엔진을 활용한 나만의 2D/3D 게임을 완성합니다."],
      minecraft: ["Minecraft Python (Minescript)", "마인크래프트 Java 월드 안에서 직접 Python 코드를 작성해 건축과 미니게임을 자동화합니다."],
      scratch: ["Scratch 블록 코딩", "복잡한 타이핑 없이 반복문, 좌표, 게임 로직을 1~2회차 만에 재미있게 익힙니다."],
      informatics: ["학교 정보/알고리즘", "기초 알고리즘, 자료구조 및 학교 정보 교과 과정을 체계적으로 보완합니다."],
      tabWarn: "Unity 6 및 Minecraft Java는 Windows/macOS PC가 필요합니다. 태블릿에서는 Scratch만 가능합니다.",
      weakWarn: "저사양 노트북/Chromebook에서는 Scratch 또는 가벼운 Python으로 시작하는 것을 권장합니다.",
      rateOk: "20 € / 1000 UAH 동의",
      rateNo: "수업료 확인 필요 (20 € / 1000 UAH)",
      hwOk: "확인됨: CPU {cores}스레드, WebGL2 {webgl} — Unity/Python 가능.",
      hwLow: "확인됨: CPU {cores}스레드, WebGL2 {webgl} — Scratch/Python 권장."
    },
    en: {
      unity: ["Unity & C#", "In 1–3 months, the student builds a playable 2D/3D game with physics, UI, and real C# scripts."],
      minecraft: ["Python in Minecraft (Minescript)", "Automate builds, create mini-games, and learn real Python syntax inside Minecraft Java."],
      scratch: ["Scratch (Visual Coding)", "Best start for logic, loops, and coordinates—first playable game within 1–2 lessons."],
      informatics: ["School CS & Algorithms", "Structured support for UA / EU / US / CA school computer science and problem solving."],
      tabWarn: "Unity 6 and Minecraft Java require a Windows/macOS PC or laptop. Tablets only support Scratch.",
      weakWarn: "On a low-spec laptop or Chromebook, starting with Scratch or lightweight Python is smoother.",
      rateOk: "€20 (~$22 / 1000 UAH) confirmed",
      rateNo: "rate €20 (~$22 / 1000 UAH) to be confirmed",
      hwOk: "Device check: {cores} CPU threads, WebGL2 {webgl} — ready for Unity/Python.",
      hwLow: "Device check: {cores} CPU threads, WebGL2 {webgl} — Scratch or lightweight Python recommended."
    },
    pl: {
      unity: ["Unity & C#", "W 1–3 miesiące uczeń zbuduje własną grę 2D/3D z fizyką, UI i prawdziwymi skryptami w C#."],
      minecraft: ["Python w Minecrafcie (Minescript)", "Automatyzacja budowania, mini-gry i prawdziwa składnia Pythona wewnątrz Minecraft Java."],
      scratch: ["Scratch (kodowanie wizualne)", "Najlepszy start dla logiki, pętli i współrzędnych — pierwsza grywalna gra już na 1–2 lekcji."],
      informatics: ["Szkolna informatyka i algorytmy", "Systemowe wsparcie w szkolnej informatyce (PL / UA / EU / US / CA) oraz rozwiązywaniu zadań."],
      tabWarn: "Unity 6 i Minecraft Java wymagają komputera lub laptopa z Windows/macOS. Na tablecie działa tylko Scratch.",
      weakWarn: "Na słabszym laptopie lub Chromebooku płynniejszy będzie start od Scratcha lub lekkiego Pythona.",
      rateOk: "20 € (~$22 / 1000 UAH) potwierdzone",
      rateNo: "stawka 20 € (~$22 / 1000 UAH) do potwierdzenia",
      hwOk: "Test sprzętu: {cores} wątków CPU, WebGL2 {webgl} — gotowy do Unity/Pythona.",
      hwLow: "Test sprzętu: {cores} wątków CPU, WebGL2 {webgl} — zalecany Scratch lub lekki Python."
    }
  };
  var L = copy[lang] || copy.uk;
  var titleEl = document.getElementById("calc-res-title");
  var descEl = document.getElementById("calc-res-desc");
  var warnEl = document.getElementById("calc-res-warn");
  var tgEl = document.getElementById("calc-tg-link");
  var trackEl = document.getElementById("calc-track-link");
  var budgetEl = document.getElementById("calc-budget-ok");
  var probeOut = document.getElementById("calc-probe-out");
  var specAgeEl = document.getElementById("calc-spec-age");
  var specDevEl = document.getElementById("calc-spec-dev");

  function render() {
    var track = state.goal;
    var warn = "";
    if (state.device === "tablet") {
      warn = L.tabWarn;
      if (track === "unity" || track === "minecraft") track = "scratch";
    } else if (state.device === "weak") {
      warn = L.weakWarn;
    }
    var info = L[track] || L.unity;
    titleEl.textContent = info[0];
    descEl.textContent = info[1];
    warnEl.hidden = !warn;
    warnEl.textContent = warn;
    if (specAgeEl) specAgeEl.textContent = state.age;
    if (specDevEl) {
      var activeDev = root.querySelector('[data-calc-device].is-active');
      specDevEl.textContent = activeDev ? activeDev.textContent.trim() : state.device;
    }
    trackEl.href = base + track + "/";
    var msg = "[sivochka.com/tutoring] " + info[0] + " | Age: " + state.age + " | Device: " + state.device + (state.hw ? " (" + state.hw + ")" : "") + " | " + (budgetEl && budgetEl.checked ? L.rateOk : L.rateNo);
    tgEl.href = "https://t.me/figarist?text=" + encodeURIComponent(msg);
  }

  root.addEventListener("click", function (e) {
    var btn = e.target.closest(".calc-pill");
    if (!btn) return;
    var group = btn.parentElement;
    group.querySelectorAll(".calc-pill").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    if (btn.dataset.calcAge) state.age = btn.dataset.calcAge;
    if (btn.dataset.calcGoal) state.goal = btn.dataset.calcGoal;
    if (btn.dataset.calcDevice) state.device = btn.dataset.calcDevice;
    render();
  });
  if (budgetEl) budgetEl.addEventListener("change", render);

  var probeBtn = document.getElementById("calc-probe-btn");
  if (probeBtn) {
    probeBtn.addEventListener("click", function () {
      var cores = navigator.hardwareConcurrency || 4;
      var gl = !!document.createElement("canvas").getContext("webgl2");
      state.hw = cores + "c, WebGL2:" + (gl ? "OK" : "No");
      var tpl = (cores >= 4 && gl) ? L.hwOk : L.hwLow;
      probeOut.hidden = false;
      probeOut.textContent = tpl.replace("{cores}", cores).replace("{webgl}", gl ? "OK" : "No");
      render();
    });
  }
  render();
})();
