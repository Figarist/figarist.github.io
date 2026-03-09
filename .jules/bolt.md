## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Lazy Load Heavy Search Dependencies
**Learning:** Initial loading of heavy search engines like `lunr.js` blocking the main thread can degrade Time to Interactive (TTI), particularly on sites where the primary initial action is reading, not searching.
**Action:** Always lazy load substantial non-critical dependencies (`lunr.js`, search index) until the user explicitly indicates intent (e.g., clicking a search icon or pressing CMD+K).
