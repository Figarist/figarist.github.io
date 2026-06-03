## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Pre-computing Static UI Elements for High-Frequency Loops
**Learning:** Performing array operations (`split`, `map`, `join`) and string concatenations for static UI attributes (like `tagsHtml`) inside a high-frequency search render loop causes significant and unnecessary performance overhead (approx 24x slower in synthetic benchmarks).
**Action:** Pre-compute static or semi-static HTML strings (e.g., `tagsHtml`) during the data fetch/initialization phase and store them on the cached object so the render loop only needs to handle simple concatenation of pre-built strings.
