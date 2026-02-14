/* ============================================================
   FIGARIST — Digital Garden
   Vanilla JS: Typing effect, scroll animations, line numbers
   ============================================================ */

(function () {
  'use strict';

  // ————————————————— DETECT LANGUAGE —————————————————
  var isUkrainian = document.documentElement.lang === 'uk';

  // ————————————————— TYPING EFFECT —————————————————
  var TYPED_TEXT = isUkrainian
    ? 'Привіт, світ. Я — Figarist.'
    : 'Hello world. I am Figarist.';
  var TYPING_SPEED = 70;   // ms per character
  var START_DELAY = 600;   // ms before typing begins

  var typedEl = document.getElementById('typed-text');

  if (typedEl) {
    var i = 0;
    function typeChar() {
      if (i < TYPED_TEXT.length) {
        typedEl.textContent += TYPED_TEXT.charAt(i);
        i++;
        setTimeout(typeChar, TYPING_SPEED);
      }
    }
    setTimeout(typeChar, START_DELAY);
  }

  // ————————————————— SCROLL FADE-IN —————————————————
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ————————————————— LINE NUMBERS (decorative) —————————————————
  var lineGutter = document.getElementById('line-numbers');

  if (lineGutter && window.innerWidth > 768) {
    var lineCount = Math.ceil(document.documentElement.scrollHeight / 22);
    lineCount = Math.min(lineCount, 300); // cap for performance
    var fragment = document.createDocumentFragment();

    for (var n = 1; n <= lineCount; n++) {
      var span = document.createElement('span');
      span.textContent = n;
      fragment.appendChild(span);
    }

    lineGutter.appendChild(fragment);
  }

})();
