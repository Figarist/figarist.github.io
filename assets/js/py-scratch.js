/*
 * Python <-> Scratch cards (_includes/py-scratch.html).
 * 1. When a card comes near the viewport, loads the vendored scratchblocks (+ the page language) and draws the
 *    blocks, written once in English, as Scratch 3 blocks in the page language (menu values included).
 * 2. The "Run" button replaces itself with the pyScratch stage (?embed=stage&autorun=1&code=...) in an iframe;
 *    the stage reports its height with postMessage({ type: 'pyscratch:height' }).
 */
(function () {
  'use strict';
  var cards = document.querySelectorAll('[data-pysb]');
  if (!cards.length) return;

  var script = document.currentScript;
  var vendor = (script && script.getAttribute('data-vendor')) || '/assets/vendor/scratchblocks/';
  var loading = null;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadBlocks(lang) {
    if (!loading) {
      loading = loadScript(vendor + 'scratchblocks.min.js').then(function () {
        return lang === 'en' ? null : loadScript(vendor + lang + '.js');
      });
    }
    return loading;
  }

  // Document.translate() keeps menu values in English: swap "[left-right v]" / "(random position v)" ourselves.
  function translateMenus(text, lang) {
    var map = (window.pysbDropdowns || {})[lang];
    if (!map) return text;
    var swap = function (open, close) {
      return function (m, value) {
        return Object.prototype.hasOwnProperty.call(map, value) ? open + map[value] + ' v' + close : m;
      };
    };
    return text.replace(/\[([^\[\]\n]+?) v\]/g, swap('[', ']')).replace(/\(([^()\n]+?) v\)/g, swap('(', ')'));
  }

  function renderBlocks(card) {
    var pre = card.querySelector('.pysb__blocks');
    if (!pre || pre.getAttribute('data-done')) return;
    var sb = window.scratchblocks;
    var lang = card.getAttribute('data-lang') || 'en';
    var text = pre.textContent;
    var doc = sb.parse(text, { languages: ['en'] });
    if (lang !== 'en' && sb.allLanguages[lang]) {
      doc.translate(sb.allLanguages[lang]);
      text = translateMenus(doc.stringify(), lang);
      doc = sb.parse(text, { languages: [lang, 'en'] });
    }
    // Scratch's own editor zoom is 0.675; a two-column card on a wide screen has room for larger blocks.
    var scale = card.clientWidth >= 640 ? 0.85 : 0.675;
    var svg = sb.newView(doc, { style: 'scratch3', scale: scale }).render();
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', text);
    var box = document.createElement('div');
    box.className = 'pysb__svg';
    box.appendChild(svg);
    pre.setAttribute('data-done', '1');
    pre.hidden = true;
    pre.parentNode.insertBefore(box, pre.nextSibling);
  }

  function renderWhenNear(card) {
    var lang = card.getAttribute('data-lang') || 'en';
    var go = function () {
      loadBlocks(lang).then(function () { renderBlocks(card); }).catch(function (e) {
        console.warn('scratchblocks failed, showing the text version', e);
      });
    };
    if (!('IntersectionObserver' in window)) { go(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); }
    }, { rootMargin: '600px 0px' });
    io.observe(card);
  }

  function b64url(str) {
    var bytes = new TextEncoder().encode(str), bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function code(card) {
    var el = card.querySelector('.pysb__pane--py pre code') || card.querySelector('.pysb__pane--py pre');
    return el ? el.textContent.replace(/\s+$/, '') + '\n' : '';
  }

  function run(card) {
    var box = card.querySelector('.pysb__run');
    var param = 'code=' + b64url(code(card));
    var editor = card.getAttribute('data-editor') || '/pyScratch/en/';
    var frame = document.createElement('iframe');
    frame.className = 'pysb__frame';
    frame.title = card.getAttribute('data-frame-title') || 'pyScratch';
    frame.src = editor + '?embed=stage&autorun=1&' + param;
    frame.style.height = Math.round(Math.min(card.clientWidth, 640) * 0.75 + 50) + 'px';
    window.addEventListener('message', function (e) {
      if (e.source !== frame.contentWindow || !e.data || e.data.type !== 'pyscratch:height') return;
      var h = Number(e.data.height);
      if (h > 80 && h < 2000) frame.style.height = h + 'px';
    });
    var open = document.createElement('a');
    open.className = 'pysb__open';
    open.href = editor + '?' + param;
    open.target = '_blank';
    open.rel = 'noopener';
    open.textContent = (card.getAttribute('data-open-label') || 'Open in pyScratch') + ' ↗';
    open.setAttribute('data-goatcounter-click', 'pysb-open');
    var stage = document.createElement('div');
    stage.className = 'pysb__stage';
    stage.appendChild(frame);
    stage.appendChild(open);
    box.replaceWith(stage);
  }

  Array.prototype.forEach.call(cards, function (card) {
    renderWhenNear(card);
    var box = card.querySelector('.pysb__run');
    var btn = card.querySelector('[data-pysb-run]');
    if (box && btn) {
      box.hidden = false;
      btn.addEventListener('click', function () { run(card); });
    }
  });
}());
