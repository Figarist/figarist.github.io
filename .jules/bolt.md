## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Pre-compute Static HTML Strings in Search Index Initialization
**Learning:** In the client-side search functionality, generating HTML string fragments for each result item's tags dynamically within the `executeSearch` render loop causes significant string allocations and parsing overhead. These operations occur frequently as the user types, leading to dropped frames and potential input lag.
**Action:** Move the string split, map, and join operations to the `initSearch` phase when data is fetched. Pre-compute and store the result (e.g., `item.tagsHtml`) to avoid redundant parsing and allocation in high-frequency loops.
