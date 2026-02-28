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
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Staggered delay based on element position in grid
            var delay = 0;
            var idx = Array.prototype.indexOf.call(fadeEls, entry.target);
            if (idx > 0) delay = idx * 100; // 100ms per card for an even smoother, cinematic sequence
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
      // Set fixed transition for snappy response but smooth return
      card.style.transition = 'transform 0.1s ease-out, box-shadow var(--t-med), background var(--t-med)';

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
        card.style.transition = 'transform 0.4s ease';
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

})();
