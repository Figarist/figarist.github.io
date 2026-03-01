/* ============================================================
   FIGARIST — Bento UI Portfolio
   Vanilla JS: Scroll animations · WebGL overlay · Card tilt
   ============================================================ */

(function () {
  'use strict';

  /* ——————————————————————————————————————————
     1. SCROLL FADE-IN  (Intersection Observer)
  —————————————————————————————————————————— */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
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
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ——————————————————————————————————————————
     2. WEBGL CLICK-TO-PLAY OVERLAY
  —————————————————————————————————————————— */
  var overlay = document.getElementById('webgl-overlay');
  var iframe = document.getElementById('webgl-iframe');
  var status = document.getElementById('webgl-status');

  function activateWebGL() {
    if (!overlay || !iframe) return;

    // Fade the overlay out
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    setTimeout(function () {
      overlay.style.display = 'none';
      // Activate the iframe
      iframe.classList.add('active');
      // Update status indicator
      if (status) {
        status.textContent = '● Loading…';
        status.style.color = '#f7e04a';
      }
    }, 400);
  }

  if (overlay) {
    overlay.addEventListener('click', activateWebGL);
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateWebGL();
      }
    });
  }

  /* ——————————————————————————————————————————
     3. CARD SUBTLE TILT (on mouse move)
     Applies a gentle perspective tilt to hovered cards.
  —————————————————————————————————————————— */
  var tiltCards = document.querySelectorAll(
    '.bento-card, .bento-tilt-target'
  );

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    tiltCards.forEach(function (card) {
      // Snappy response but smooth return

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cw = rect.width;
        var ch = rect.height;
        // Normalize to [-1, 1]
        var nx = (x / cw - 0.5) * 2;
        var ny = (y / ch - 0.5) * 2;
        // Max 2.5deg tilt
        var rotateX = -ny * 2.5;
        var rotateY = nx * 2.5;
        
        card.style.transform =
          'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = '';
      });
      
      // Re-enable snappy transition when entering
      card.addEventListener('mouseenter', function() {
        card.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  /* ——————————————————————————————————————————
     4. DOODLE PARALLAX on Bio card
  —————————————————————————————————————————— */
  var bioCard = document.getElementById('bio');
  var doodles = bioCard ? bioCard.querySelectorAll('.doodle') : [];

  if (bioCard && doodles.length && !prefersReducedMotion) {
    bioCard.addEventListener('mousemove', function (e) {
      var rect = bioCard.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      doodles.forEach(function (d, i) {
        var depth = (i + 1) * 6; // 6px, 12px, 18px, 24px
        d.style.transform =
          'translate(' + (x * depth) + 'px, ' + (y * depth) + 'px)';
      });
    });

    bioCard.addEventListener('mouseleave', function () {
      doodles.forEach(function (d) { d.style.transform = ''; });
    });
  }

  /* ——————————————————————————————————————————
     5. EMAIL COPY TO CLIPBOARD
  —————————————————————————————————————————— */
  var emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Don't prevent default, let the mailto string work its magic if they have an app.
      // But also copy it to clipboard if they don't!
      var emailAddress = this.getAttribute('href').replace('mailto:', '');

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailAddress).then(function () {
          var originalHTML = link.innerHTML;
          // Basic check to not duplicate the copied text if clicked rapidly
          if (link.textContent.indexOf('Copied!') === -1) {
            link.innerHTML = 'Copied!';
            setTimeout(function () {
              link.innerHTML = originalHTML;
            }, 2000);
          }
        }).catch(function (err) {
          console.error('Failed to copy email: ', err);
        });
      }
    });
  });

  /* ——————————————————————————————————————————
     6. READING PROGRESS
  —————————————————————————————————————————— */
  var pb = document.getElementById('reading-progress-bar');
  if (pb) {
    window.addEventListener('scroll', function() {
      var h = document.documentElement;
      pb.style.width = ((h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100) + '%';
    }, { passive: true });
  }
  /* ——————————————————————————————————————————
     7. CODE COPY BUTTONS
  —————————————————————————————————————————— */
  var codeBlocks = document.querySelectorAll('div.highlight');

  codeBlocks.forEach(function (block) {
    if (block.querySelector('.btn-copy-code')) return; // Avoid duplicates

    var button = document.createElement('button');
    button.className = 'btn-copy-code';
    button.type = 'button';
    button.innerText = 'Copy';

    button.addEventListener('click', function () {
      var codeEl = block.querySelector('code');
      if (!codeEl) return;
      
      var code = codeEl.innerText;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(function () {
          button.innerText = 'Copied! ✔️';
          button.classList.add('copied');

          setTimeout(function () {
            button.innerText = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        }).catch(function (err) {
          console.error('Failed to copy code: ', err);
        });
      }
    });

    block.appendChild(button);
  });

  /* ——————————————————————————————————————————
     8. ULTIMATE SEARCH (Lunr.js)
  —————————————————————————————————————————— */
  var searchModal = document.getElementById('search-modal');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var closeSearch = document.getElementById('close-search');
  var searchTrigger = document.getElementById('search-trigger');
  var lunrIndex = null;
  var searchStore = [];

  function toggleSearch(show) {
    if (!searchModal) return;
    if (show) {
      searchModal.removeAttribute('hidden');
      searchInput.focus();
      document.body.style.overflow = 'hidden'; // Prevent scroll
      if (!lunrIndex) initSearch();
    } else {
      searchModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  function initSearch() {
    // Relative path works with Polyglot because current URL has the lang prefix if needed
    fetch('search.json')
      .then(function(response) { return response.json(); })
      .then(function(data) {
        searchStore = data;
        lunrIndex = lunr(function() {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('tags', { boost: 5 });
          this.field('description', { boost: 3 });
          this.field('content');

          var self = this;
          data.forEach(function(doc) {
            self.add(doc);
          });
        });
      })
      .catch(function(err) { console.error('Search index failed to load:', err); });
  }

  function executeSearch(query) {
    if (!lunrIndex || !query) {
      searchResults.innerHTML = '';
      return;
    }

    var results = lunrIndex.search(query + '*'); // Wildcard for better UX
    var html = '';

    if (results.length > 0) {
      results.forEach(function(result) {
        var item = searchStore.find(function(i) { return i.id === result.ref; });
        if (item) {
          var tagsHtml = item.tags.split(' ').map(function(t) { 
            return t ? '<span class="search-tag">' + t + '</span>' : ''; 
          }).join('');

          html += '<a href="' + item.url + '" class="search-result-item">' +
                    '<div class="search-result-content">' +
                      '<h4>' + item.title + '</h4>' +
                      '<p>' + (item.description || '') + '</p>' +
                      '<div class="search-result-tags">' + tagsHtml + '</div>' +
                    '</div>' +
                  '</a>';
        }
      });
    } else {
      html = '<p class="search-no-results">No matches found for "' + query + '"</p>';
    }

    searchResults.innerHTML = html;
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      executeSearch(e.target.value);
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener('click', function() { toggleSearch(false); });
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', function() {
      toggleSearch(searchModal.hasAttribute('hidden'));
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', function(e) {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    var metaKey = isMac ? e.metaKey : e.ctrlKey;

    if (metaKey && e.key === 'k') {
      e.preventDefault();
      toggleSearch(searchModal.hasAttribute('hidden'));
    }

    if (e.key === 'Escape' && !searchModal.hasAttribute('hidden')) {
      toggleSearch(false);
    }
  });

  // Close on backdrop click
  if (searchModal) {
    searchModal.addEventListener('click', function(e) {
      if (e.target === searchModal || e.target.classList.contains('search-modal-container')) {
        toggleSearch(false);
      }
    });
  }

})();

