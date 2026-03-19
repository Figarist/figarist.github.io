## 2025-02-24 - Native Dialog Event Sync
**Learning:** When using native `<dialog>` elements, setting `aria-expanded` strictly via JS `open` toggles is fragile, as users can dismiss modals using native methods (like the Escape key) which fire their own events and bypass standard custom toggle functions, leaving ARIA states out of sync.
**Action:** Always attach an event listener to the native `close` event on `<dialog>` elements to reliably reset `aria-expanded="false"` on the trigger button, regardless of how the dialog was dismissed.
