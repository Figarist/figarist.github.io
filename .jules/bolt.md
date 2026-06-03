## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2025-01-22 - Pre-compute Static/Semi-Static HTML for High-Frequency Render Loops
**Learning:** Dynamically allocating, mapping, and joining strings (e.g., parsing tags) inside high-frequency render functions like a debounced search handler introduces redundant CPU and memory parsing overhead, potentially blocking the main thread on large datasets.
**Action:** To avoid these allocations, always pre-compute static or semi-static HTML strings (like `tagsHtml`) during the data fetch/initialization phase and cache them in lookup maps for `O(1)` retrieval during the render phase.
