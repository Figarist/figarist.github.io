## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2025-01-20 - Pre-compute Static Strings Before High-Frequency Loops
**Learning:** Creating string elements (like split/map/join on HTML attributes) during each iteration of a high-frequency render loop (like formatting live search results) causes unnecessary string allocations and parsing overhead.
**Action:** Pre-compute and cache semi-static HTML strings (e.g., tags lists) during data fetch/initialization so that fast path rendering only involves accessing a property.
