## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Lazy load heavy search library (lunr.js)
**Learning:** Loading `lunr.min.js` globally on page load adds 30-40KB of unnecessary JavaScript and parsing time for users who may never open the search modal.
**Action:** Lazy load heavy, secondary-feature scripts only when their corresponding UI element (e.g., search modal) is interacted with.
