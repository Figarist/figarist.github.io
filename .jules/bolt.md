## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Pre-compute Static HTML Strings Before Render Loops
**Learning:** Repetitive string parsing, mapping, and joining inside high-frequency render functions (like search result loops triggered by keystrokes) cause unnecessary CPU overhead and garbage collection from string allocations.
**Action:** Always pre-compute static or semi-static properties (e.g., HTML fragments derived from JSON data like `tagsHtml`) during the initialization or data fetch phase, preventing allocations in O(n) loops inside rapid render cycles.
