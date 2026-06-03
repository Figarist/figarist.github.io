## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2025-02-24 - Pre-compute Static Properties for High-Frequency Render Loops
**Learning:** In high-frequency render loops (like search result updates on every keystroke), repeatedly allocating and parsing strings (e.g., splitting a string of tags and mapping over them to create HTML elements) introduces significant overhead. Pre-computing these strings avoids on-the-fly string allocations and boosts iteration speed.
**Action:** Pre-compute static or semi-static HTML strings (like `tagsHtml`) during the data fetch or initialization phase, storing the result on the data object itself for quick access during rendering.
