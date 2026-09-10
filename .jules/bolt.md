## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-03-04 - Pre-computing static HTML strings during data fetch
**Learning:** During high-frequency render loops (e.g., live search execution where `executeSearch` processes results on every keystroke), dynamic string allocation and array operations like `split(" ").map().join("")` cause noticeable CPU overhead. In vanilla JS contexts without virtual DOM diffing, repeatedly constructing the same static HTML strings degrades performance.
**Action:** Always pre-compute static or semi-static UI strings (like `tagsHtml`) during the data fetch/initialization phase instead of computing them on the fly in the rendering loop. This converts complex string operations into O(1) property lookups (`item.tagsHtml`).
