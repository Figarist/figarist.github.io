## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Cache Static Environment Properties Outside High-Frequency Event Listeners
**Learning:** Re-evaluating static environment properties, such as OS detection via `navigator.platform.toUpperCase().indexOf("MAC") >= 0`, inside high-frequency event listeners like `keydown` forces unnecessary string manipulation and memory allocations on every event trigger.
**Action:** Always cache stable, static environment references outside of high-frequency event loops like `keydown`, `scroll`, or `mousemove` to avoid redundant property resolutions and parsing.
