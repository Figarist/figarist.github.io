## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Pre-computing HTML strings for loops
**Learning:** Generating strings (like HTML tags) dynamically inside a high-frequency loop (such as rendering search results) causes unnecessary string allocations and parsing overhead. Pre-computing these static or semi-static HTML strings during the initialization phase avoids this performance hit.
**Action:** Always extract static string generation out of loops or pre-compute them during data fetching/initialization for $O(1)$ lookups in the render loop.
