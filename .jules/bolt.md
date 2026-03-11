## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-07-25 - Cache Static Environment Checks Outside High-Frequency Event Listeners
**Learning:** Evaluating environment properties like `navigator.platform.toUpperCase().indexOf("MAC") >= 0` inside a `keydown` event listener forces unnecessary synchronous string manipulation and memory allocation on every keystroke. Although minor for a single key press, these overheads accumulate.
**Action:** Always evaluate and cache static environment properties (like OS detection) outside of high-frequency event listeners to minimize redundant computations.
