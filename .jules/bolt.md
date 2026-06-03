## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2025-02-13 - Pre-compute Static Strings Before Render Loops
**Learning:** Dynamically parsing and generating static HTML strings (e.g., `tagsHtml`) within high-frequency render loops (like search result generation) introduces massive overhead from continuous string allocation, splitting, and mapping. Benchmarks reveal that this can be up to 8x slower compared to using a pre-computed property.
**Action:** Always pre-compute static or semi-static UI strings directly from the data during initialization/fetch phase, and store them as cached properties to be accessed statically inside frequent render loops.
