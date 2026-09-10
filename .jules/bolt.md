## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-05-15 - [Pre-computing static strings in initialization]
**Learning:** Pre-computing static or semi-static HTML strings (like `tagsHtml`) during the data fetch/initialization phase significantly reduces string allocations and parsing overhead in high-frequency render loops (e.g., executing search queries). The benchmark showed a 96% execution time reduction.
**Action:** When implementing or refactoring features with high-frequency render loops, pre-compute properties from fetched data and use defensive checks (e.g., `item.tags || ""`) to prevent undefined errors from crashing the initialization loop. Avoid redundant string allocations.
