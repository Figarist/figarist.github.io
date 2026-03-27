# Palette's UX Journal

## 2024-11-20 - Synchronizing ARIA State with Native Dialog
**Learning:** Native HTML5 `<dialog>` elements trigger a 'close' event regardless of whether they are dismissed via programmatic calls (`dialog.close()`) or user actions like the Escape key.
**Action:** Use the 'close' event listener on `<dialog>` elements to reliably reset accessibility attributes (e.g., `aria-expanded="false"`) on their respective trigger buttons, rather than relying solely on manual toggle functions or backdrop click handlers.
