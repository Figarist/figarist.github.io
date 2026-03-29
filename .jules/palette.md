## 2026-03-29 - Synchronizing ARIA attributes with native <dialog> element
**Learning:** Native HTML5 `<dialog>` elements can be dismissed natively (e.g., via the Escape key). If the trigger button toggles an `aria-expanded` state, relying purely on click handlers for the trigger will cause the state to fall out of sync.
**Action:** Always listen to the native `close` event on `<dialog>` elements to reliably reset `aria-expanded` attributes on their associated trigger buttons.

## 2026-03-29 - Pairing visual active classes with ARIA attributes
**Learning:** Visual active state indicators (e.g., `.active` classes on language switchers or navigation items) must have semantic meaning for screen readers.
**Action:** Pair active visual classes with appropriate ARIA attributes like `aria-current="page"`, `aria-current="true"`, or `aria-selected="true"` depending on the context.
