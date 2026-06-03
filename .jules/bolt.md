## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-10-25 - Avoid Parsing Environment Variables on Every Keystroke
**Learning:** Checking `navigator.platform.toUpperCase().indexOf("MAC") >= 0` inside a global `window.addEventListener("keydown", ...)` callback causes unnecessary string allocation and evaluation on every single keystroke. Even though it's relatively fast, it's a synchronous operation in a high-frequency event, violating the "speed is a feature" rule. Static environment details don't change during the lifetime of the page.
**Action:** Always extract and cache static environment flags (like OS or browser checks) outside of high-frequency event listeners (such as `keydown`, `scroll`, `mousemove`).
