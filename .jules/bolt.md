## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2026-03-24 - Pre-compute Static HTML Strings in Initialization Phase
**Learning:** Constructing complex HTML strings (like parsing and formatting tag arrays into HTML elements) inside a high-frequency render loop (such as displaying live search results) causes unnecessary string allocations and parsing overhead. This can lead to minor jank when iterating over many results.
**Action:** Always pre-compute static or semi-static properties (like `tagsHtml`) during the data fetch/initialization phase and cache them. Ensure defensive checks are used (e.g., `(item.tags || "")`) to prevent undefined errors from crashing the initialization loop.
