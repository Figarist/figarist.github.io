## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-05-18 - Pre-compute properties to avoid string allocations in render loops
**Learning:** In vanilla JS applications with frequent client-side rendering operations like dynamic search results (`executeSearch`), allocating new strings and processing arrays (e.g. `split(" ").map().join()`) on every result keystroke dramatically slows down render times (7x slower in this instance).
**Action:** Always map complex properties to pre-computed HTML strings statically during initialization or data fetch loops outside of high-frequency events to avoid string allocation bottlenecks.
