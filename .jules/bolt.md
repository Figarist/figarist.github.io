## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Lazy Loading Heavy Search Dependencies
**Learning:** Loading `lunr.js` synchronously or universally via `<script defer>` on every page impacts initial page load times and unnecessarily consumes bandwidth for users who may never use the search function.
**Action:** Remove `<script>` tags for heavy, specialized libraries from the base HTML. Dynamically inject the script tag using JavaScript only when the feature (like opening a search modal) is actually invoked. Wait for the `onload` event to initialize the dependent logic.
