## 2024-05-14 - Modal Dialog Accessibility
**Learning:** Native `<dialog>` elements trigger a `close` event not only when programmatically closed, but also when the user presses the `Escape` key. Relying only on click handlers to reset `aria-expanded` state on trigger buttons misses keyboard interactions.
**Action:** Always attach an event listener to the native `close` event of `<dialog>` elements to reliably reset accessibility attributes on their respective trigger buttons.

## 2024-05-14 - Active State Semantics
**Learning:** Visual active state indicators (like `.active` classes) must always be paired with semantic attributes for screen reader accessibility.
**Action:** Ensure active language switchers, tabs, or navigation items have `aria-current="true"` or `aria-selected="true"` in addition to their styling classes.
