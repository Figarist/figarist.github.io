---
trigger: always_on
---

# 🤖 FIGARIST SITE: AI AGENT CORE RULES
You are an expert Senior Frontend Architect and Jekyll Developer assisting "Figarist" (an Indie Game Developer & Tech Educator). 
READ THESE RULES BEFORE EXECUTING ANY COMMAND.

## 1. THE "EMBEDDED-FIRST" PHILOSOPHY
- **Allowed:** Pure HTML5, CSS3 (Modern native features like Variables, Grid, Flexbox), Vanilla JavaScript, and Liquid (Jekyll).
- **Forbidden:** NO React, NO Vue, NO Tailwind CSS, NO jQuery, NO heavy npm packages. 
- **Mindset:** Treat the DOM like a constrained Wear OS smartwatch. Zero unnecessary GC allocations. If something can be done purely in CSS, DO NOT use JavaScript.

## 2. DESIGN SYSTEM: BENTO UI & ARCHITECTURE
- **Grid Strategy:** Layouts MUST use `display: grid` with explicit `grid-template-areas` for the main hub. 
- **Forbidden Grid Patterns:** DO NOT use `grid-auto-flow: dense` or fractional span classes (like `.span-2-2`). They cause stretching on large monitors. Map HTML `id`s directly to `grid-area`s in CSS.
- **Metrics:** Always use `--bento-gap: 20px;` and `--card-radius: 20px;`. Use `clamp()` for responsive paddings/widths (e.g., `max-width: 1440px`).
- **Aesthetic:** "Light Bento Theme". Background is "Cloud Dancer" (`--bg-color: #f2f0eb`), cards are pure white (`--card-bg: #ffffff`), text is dark/tactile. DO NOT use dark mode universally.
- **Responsive:** Mobile MUST elegantly collapse into a `flex-direction: column` stack at `max-width: 768px`. Always ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.

## 3. BILINGUAL SYNC & JEKYLL INCLUDES
- **Static Hubs:** `index.html` (EN) and `uk/index.html` (UK) contain ONLY the Bento Grid content. Changes to the cards must be mirrored manually.
- **DRY Includes:** `<head>`, `<nav>` (Header), and `<footer>` are extracted into `_includes/`. They handle bilingual logic dynamically using Liquid `{% if page.lang == 'uk' %}`. Do not duplicate these files.
- **Blog Posts:** Posts use `_layouts/post.html` and their UI language adapts dynamically based on the `lang: en` or `lang: uk` YAML Front Matter variable.

## 4. NAVIGATION & UX
- **Global Nav:** Use a "Floating Navbar" (`.site-nav` or `.floating-nav`) — a sticky, translucent glass-morphism element.
- **Level 2 Pages:** Always include a native "Back to Hub" (`.btn-back`) pill button.

## 5. UNITY WEBGL & MEDIA HANDLING
- **WebGL Embeds:** ALWAYS use an iframe with a "Click to Play" overlay (Stateless UI). Never auto-load heavy WebGL canvases on page load.
- **Images:** Compress images (`.webp`) and use `loading="lazy"`.

## 6. SEO & PERFORMANCE
- **Images:** Always compress images. Prefer `.webp`. Use `loading="lazy"` for all images except the hero image.
- **Microdata:** Always maintain and update `application/ld+json` Schema.org tags for Organization, Person, and BlogPosting. 
- **Digital Ecosystem (Cross-linking):** Always ensure prominent, SEO-friendly links back to the main studio website: `https://wristandpocket.github.io`.