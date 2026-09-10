## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2026-03-24 - Pre-compute Static/Semi-Static UI Strings for High-Frequency Loops
**Learning:** Constructing complex HTML strings (e.g. mapping and joining tags) inside the core render loop of a search execution (`executeSearch`) introduces significant string allocation and parsing overhead that degrades UI responsiveness during fast typing.
**Action:** Always pre-compute and store static or semi-static UI strings (like `tagsHtml`) during the initial data fetch and indexing phase (`initSearch`) so the high-frequency render loop only performs O(1) property lookups and minimal string concatenation.
