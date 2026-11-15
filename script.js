/* ============================================================
   IHOR SIVOCHKA — Bento UI Portfolio
   Vanilla JS: Scroll animations · WebGL overlay · Card tilt
   ============================================================ */

(function () {
  "use strict";

  /* ——————————————————————————————————————————
     1. SCROLL FADE-IN  (Intersection Observer)
  —————————————————————————————————————————— */
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var lastIntersectTime = 0;
    var batchStaggerCount = 0;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var now = performance.now();
            // If more than 100ms passed since last intersection, reset the batch stagger
            if (now - lastIntersectTime > 100) {
              batchStaggerCount = 0;
            }

            // Staggered delay only for elements entering at the "same" time
            var delay = batchStaggerCount * 80; // 80ms per card in a batch sequence
            batchStaggerCount++;
            lastIntersectTime = now;

            setTimeout(function () {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ——————————————————————————————————————————
     2. VR PLAYGROUND
     (Game tiles now link to dedicated pages.
      WebGL player logic is inline on each game page.)
  —————————————————————————————————————————— */

  /* ——————————————————————————————————————————
     UTILITIES: Throttled MouseMove
     Abstracts rAF throttling and listener cleanup.
  —————————————————————————————————————————— */
  function createThrottledMouseMove(el, updateCallback, resetCallback) {
    var ticking = false;
    var rafId = null;

    var rect = null; // Cached rect

    function handleMouseEnter() {
      rect = el.getBoundingClientRect();
      el.style.transition = "transform 0.1s ease-out";
    }

    function handleMouseMove(e) {
      if (!ticking && rect) {
        rafId = window.requestAnimationFrame(function () {
          updateCallback(e, rect);
          ticking = false;
        });
        ticking = true;
      }
    }

    function handleMouseLeave() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      ticking = false;
      rect = null;
      if (resetCallback) resetCallback();
    }

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
  }

  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      var later = function () {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* ——————————————————————————————————————————
     3. CARD SUBTLE TILT (on mouse move)
     Applies a gentle perspective tilt to hovered cards.
  —————————————————————————————————————————— */
  var tiltCards = document.querySelectorAll(".hub-card");

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    tiltCards.forEach(function (card) {
      createThrottledMouseMove(
        card,
        function (e, rect) {
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var cw = rect.width;
          var ch = rect.height;
          var nx = (x / cw - 0.5) * 2;
          var ny = (y / ch - 0.5) * 2;
          var rotateX = -ny * 2.5;
          var rotateY = nx * 2.5;

          card.style.transform =
            "perspective(1000px) rotateX(" +
            rotateX +
            "deg) rotateY(" +
            rotateY +
            "deg)";
        },
        function () {
          card.style.transition = "transform 0.3s ease";
          card.style.transform = "";
        },
      );
    });
  }

  /* ——————————————————————————————————————————
     4. DOODLE PARALLAX on Bio card
  —————————————————————————————————————————— */
  var bioCard = document.getElementById("bio");
  var doodles = bioCard ? bioCard.querySelectorAll(".doodle") : [];

  if (bioCard && doodles.length && !prefersReducedMotion) {
    createThrottledMouseMove(
      bioCard,
      function (e, rect) {
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        doodles.forEach(function (d, i) {
          var depth = (i + 1) * 6;
          d.style.transform =
            "translate(" + x * depth + "px, " + y * depth + "px)";
        });
      },
      function () {
        doodles.forEach(function (d) {
          d.style.transform = "";
        });
      },
    );
  }

  /* ——————————————————————————————————————————
     5. EMAIL COPY TO CLIPBOARD
  —————————————————————————————————————————— */
  var emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Don't prevent default, let the mailto string work its magic if they have an app.
      // But also copy it to clipboard if they don't!
      var emailAddress = this.getAttribute("href").replace("mailto:", "");

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(emailAddress)
          .then(function () {
            var originalHTML = link.innerHTML;
            // Basic check to not duplicate the copied text if clicked rapidly
            if (link.textContent.indexOf("Copied!") === -1) {
              link.innerHTML = "Copied!";
              setTimeout(function () {
                link.innerHTML = originalHTML;
              }, 2000);
            }
          })
          .catch(function (err) {
            console.error("Failed to copy email: ", err);
          });
      }
    });
  });

  /* ——————————————————————————————————————————
     6. READING PROGRESS
  —————————————————————————————————————————— */
  var pb = document.getElementById("reading-progress-bar");
  if (pb) {
    var ticking = false;
    var scrollableHeight = 0;
const docEl = document.documentElement; // Cache for performance

    function updateScrollHeight() {
      scrollableHeight = docEl.scrollHeight - docEl.clientHeight;
    }

    // Initial calculation
    updateScrollHeight();
    window.addEventListener("resize", debounce(updateScrollHeight, 150), { passive: true });

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var scrollTop = window.scrollY || docEl.scrollTop;
            var percent = 0;

            if (scrollableHeight > 0) {
              percent = (scrollTop / scrollableHeight) * 100;
              // Clamp percent
              if (percent > 100) percent = 100;
              if (percent < 0) percent = 0;
            }

            pb.style.transform = "scaleX(" + (percent / 100) + ")";
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }
  /* ——————————————————————————————————————————
     7. CODE COPY BUTTONS
  —————————————————————————————————————————— */
  var codeBlocks = document.querySelectorAll("div.highlight");

  codeBlocks.forEach(function (block) {
    if (block.querySelector(".btn-copy-code")) return; // Avoid duplicates

    var button = document.createElement("button");
    button.className = "btn-copy-code";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy Code");

    button.addEventListener("click", function () {
      var codeEl = block.querySelector("code");
      if (!codeEl) return;

const code = codeEl.textContent;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(code)
          .then(function () {
            button.textContent = "Copied! ✔️";
            button.classList.add("copied");

            setTimeout(function () {
              button.textContent = "Copy";
              button.classList.remove("copied");
            }, 2000);
          })
          .catch(function (err) {
            console.error("Failed to copy code: ", err);
          });
      }
    });

    block.appendChild(button);
  });

  /* ——————————————————————————————————————————
     8. ULTIMATE SEARCH (Lunr.js)
  —————————————————————————————————————————— */
  var searchModal = document.getElementById("search-modal");
  var searchInput = document.getElementById("search-input");
  var searchResults = document.getElementById("search-results");
  var closeSearch = document.getElementById("close-search");
  var searchTrigger = document.getElementById("search-trigger");
  var lunrIndex = null;
  var searchMap = {};

  function toggleSearch(show) {
    if (!searchModal) return;
    if (show) {
      if (!searchModal.open) {
        searchModal.showModal();
        searchInput.focus();
        if (!lunrIndex) initSearch();
      }
    } else {
      searchModal.close();
    }
  }

  function initSearch() {
    // Get localized path from modal's data attribute (passed from Liquid)
    var indexUrl = searchModal
      ? searchModal.getAttribute("data-index-url")
      : "search.json";

    fetch(indexUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Construct a map for O(1) lookups during search
        searchMap = Object.create(null);
        data.forEach(function (item) {
          searchMap[item.id] = item;
        });

        lunrIndex = lunr(function () {
          // Disable stemming to ensure technical terms (Unity, C#, etc.) match exactly
          this.pipeline.remove(lunr.stemmer);
          this.searchPipeline.remove(lunr.stemmer);

          // Replace default trimmer (Latin-only \w) with Unicode-aware version
          // Fixes search for Cyrillic (UK, RU) and Korean (KO) text
          this.pipeline.remove(lunr.trimmer);
          this.searchPipeline.remove(lunr.trimmer);
          var unicodeTrimmer = function (token) {
            return token.update(function (s) {
              return s.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
            });
          };
          unicodeTrimmer.label = 'unicodeTrimmer';
          lunr.Pipeline.registerFunction(unicodeTrimmer, 'unicodeTrimmer');
          this.pipeline.add(unicodeTrimmer);
          this.searchPipeline.add(unicodeTrimmer);

          this.ref("id");
          this.field("title", { boost: 10 });
          this.field("tags", { boost: 5 });
          this.field("description", { boost: 3 });
          this.field("content");

          var self = this;
          data.forEach(function (doc) {
            self.add(doc);
          });
        });
      })
      .catch(function (err) {
        console.error("Search index failed to load:", err);
      });
  }

  function executeSearch(query) {
    if (!lunrIndex || !query) {
      searchResults.innerHTML = "";
      return;
    }

    var results = lunrIndex.search(query + "*"); // Wildcard for better UX
    var html = "";

    if (results.length > 0) {
      results.forEach(function (result) {
        var item = searchMap[result.ref];
        if (item) {
          var tagsHtml = item.tags
            .split(" ")
            .map(function (t) {
              return t ? '<span class="search-tag">' + t + "</span>" : "";
            })
            .join("");

          html +=
            '<a href="' +
            item.url +
            '" class="search-result-item">' +
            '<div class="search-result-content">' +
            "<h4>" +
            item.title +
            "</h4>" +
            "<p>" +
            (item.description || "") +
            "</p>" +
            '<div class="search-result-tags">' +
            tagsHtml +
            "</div>" +
            "</div>" +
            "</a>";
        }
      });
    } else {
      var noResultsFoundText =
        searchResults.getAttribute("data-no-results") || "No matches found for";
      html =
        '<p class="search-no-results">' +
        noResultsFoundText +
        ' "' +
        query +
        '"</p>';
    }

    searchResults.innerHTML = html;
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function (e) {
        executeSearch(e.target.value);
      }, 200),
    );

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var firstResult = searchResults ? searchResults.querySelector(".search-result-item") : null;
        if (firstResult && firstResult.href) {
          e.preventDefault();
          window.location.href = firstResult.href;
        }
      }
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", function () {
      toggleSearch(false);
    });
  }

  // Keyboard Shortcuts
  window.addEventListener("keydown", function (e) {
    var isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    var metaKey = isMac ? e.metaKey : e.ctrlKey;

    if (metaKey && e.key === "k") {
      e.preventDefault();
      toggleSearch(!searchModal.open);
    }
  });

  // Close on backdrop click (native dialog behavior)
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) {
        toggleSearch(false);
      }
    });

    // Handle trigger state update via trigger logic directly above
    if (searchTrigger) {
      searchTrigger.addEventListener("click", function () {
        toggleSearch(!searchModal.open);
      });
    }
  }

  /* ——————————————————————————————————————————
     9. LANGUAGE SWITCH — Save Preference
  —————————————————————————————————————————— */
  var langLinks = document.querySelectorAll('.lang-switch[data-lang]');
  langLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var selectedLang = this.getAttribute('data-lang');
      if (selectedLang) {
        localStorage.setItem('preferred_lang', selectedLang.toLowerCase());
      }
    });
  });

  /* ——————————————————————————————————————————
     10. MOBILE NAVIGATION
     Native <details> remains the no-JS fallback. JS only adds the
     expected Escape, outside-click and focus-return behavior.
  —————————————————————————————————————————— */
  var mobileMenus = document.querySelectorAll(".mobile-menu");

  mobileMenus.forEach(function (menu) {
    var summary = menu.querySelector("summary");
    var menuLinks = menu.querySelectorAll(".mobile-menu__panel a");

    if (!summary) return;

    function syncExpandedState() {
      summary.setAttribute("aria-expanded", menu.open ? "true" : "false");
    }

    menu.addEventListener("toggle", syncExpandedState);

    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !menu.open) return;
      e.preventDefault();
      e.stopPropagation();
      menu.removeAttribute("open");
      summary.focus();
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.removeAttribute("open");
      });
    });

    document.addEventListener("pointerdown", function (e) {
      if (menu.open && !menu.contains(e.target)) {
        menu.removeAttribute("open");
      }
    });

    syncExpandedState();
  });

  /* ——————————————————————————————————————————
     11. TUTORING MOBILE STICKY BAR
     Observes the hero element. Shows floating bar when
     scrolled past hero on mobile screens.
  —————————————————————————————————————————— */
  var tutoringMobileBar = document.querySelector(".tutoring-mobile-bar");
  var tutoringHero = document.querySelector(".tutoring-hero");

  if (tutoringMobileBar && tutoringHero && "IntersectionObserver" in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        tutoringMobileBar.classList.toggle("is-visible",
          !entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
    }, { threshold: 0 });
    barObserver.observe(tutoringHero);
  }

  /* ——————————————————————————————————————————
     12. TUTORING TELEGRAM USERNAME COPY
  —————————————————————————————————————————— */
  document.querySelectorAll("[data-copy-phone]").forEach(function (btn) {
    var timer;
    btn.addEventListener("click", function () {
      var phone = btn.getAttribute("data-copy-phone");
      var label = btn.querySelector(".tutoring-copy-btn__text");
      clearTimeout(timer);
      label.textContent = phone;
      btn.setAttribute("aria-label", phone);
      btn.classList.remove("copied");
      function fallback() {
        label.textContent = phone + " · " + btn.getAttribute("data-fallback-text");
      }
      if (!navigator.clipboard || !window.isSecureContext) { fallback(); return; }
      navigator.clipboard.writeText(phone).then(function () {
        label.textContent = phone + " · " + btn.getAttribute("data-copied-text");
        btn.classList.add("copied");
        timer = setTimeout(function () {
          label.textContent = phone;
          btn.classList.remove("copied");
        }, 2500);
      }).catch(fallback);
    });
  });

  // Tutoring Track Selector + PC Check + Soft Region Notice
  (function () {
    var page = document.querySelector(".tutoring-page");
    if (page && window.Intl) {
      try {
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (/^(Europe\/(Moscow|Minsk|Samara|Saratov|Volgograd|Kaliningrad)|Asia\/(Yekaterinburg|Novosibirsk|Omsk|Krasnoyarsk|Irkutsk|Vladivostok))/.test(tz)) {
          var note = document.createElement("p");
          note.className = "tz-notice";
          note.textContent = "Індивідуальні заняття (1000 грн / 20 €) проходять виключно для учнів з України, Європи, США, Канади та Ізраїлю. Оплата на рахунок українського ФОП.";
          page.insertBefore(note, page.firstChild);
        }
      } catch (e) {}
    }

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

})();

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (reg) {
        console.log("SW registered:", reg);
      })
      .catch(function (err) {
        
      });
  });
}
