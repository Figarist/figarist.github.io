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
     2. WEBGL CLICK-TO-PLAY OVERLAY
  —————————————————————————————————————————— */
  var overlay = document.getElementById("webgl-overlay");
  var iframe = document.getElementById("webgl-iframe");
  var status = document.getElementById("webgl-status");

  function activateWebGL() {
    if (!overlay || !iframe) return;

    // Fade the overlay out
    overlay.style.transition = "opacity 0.4s ease";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    setTimeout(function () {
      overlay.style.display = "none";
      // Activate the iframe
      iframe.classList.add("active");
      // Update status indicator
      if (status) {
        status.textContent = "● Loading…";
        status.style.color = "#f7e04a";
      }
    }, 400);
  }

  if (overlay) {
    overlay.addEventListener("click", activateWebGL);
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateWebGL();
      }
    });
  }

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
    if (document.querySelector('script[src*="lunr.min.js"]')) return;

    // 1. Load the lunr script dynamically first
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js";
    script.onload = function () {
      // 2. Fetch data and build index
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

          // If the user already typed something while loading, execute the search
          if (searchInput && searchInput.value) {
            executeSearch(searchInput.value);
          }
        })
        .catch(function (err) {
          console.error("Search index failed to load:", err);
        });
    };
    script.onerror = function() {
      console.error("Failed to load lunr.js");
    };
    document.head.appendChild(script);
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
    searchTrigger.addEventListener("click", function () {
      toggleSearch(!searchModal.open);
    });
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
        // Silently catch to prevent Googlebot console warnings
      });
  });
}
