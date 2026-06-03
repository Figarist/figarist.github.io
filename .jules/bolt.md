## 2024-06-25 - Cache Repetitive Global/DOM Object Lookups in High-Frequency Events
**Learning:** Repetitive access to properties like `document.documentElement` inside a `scroll` event handler's `requestAnimationFrame` loop forces the JavaScript engine to resolve the reference continuously. While minor in isolation, in a 60FPS scrolling path, these lookups accumulate, causing small performance drags.
**Action:** Always cache stable references (e.g., `document.documentElement`) outside of high-frequency event loops like `scroll` or `mousemove` to avoid redundant property resolutions.

## 2024-06-25 - Cache Static Environment Properties Outside High-Frequency Event Listeners
**Learning:** Re-evaluating static properties (like OS detection via `navigator.platform.toUpperCase().indexOf("MAC") >= 0`) inside high-frequency event listeners (like `keydown`) causes unnecessary string allocation and Garbage Collection (GC) pressure.
**Action:** Always extract and cache static environment evaluations outside of event listener callbacks to ensure they only run once.

## 2024-06-25 - Pre-Compute Dynamic HTML Snippets Outside Render Loops
**Learning:** Constructing complex string components (like splitting, mapping, and joining tags) inside a high-frequency search render loop (like O(R) operations on every keystroke) causes measurable memory allocation and CPU overhead.
**Action:** Always pre-compute static/semi-static HTML parts (like `tagsHtml`) during the data-fetching and initialization phase (O(N)) so that render loops just perform lightweight concatenation.
