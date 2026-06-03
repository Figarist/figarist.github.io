## 2026-03-24 - Accessibility state for native dialog triggers
**Learning:** Native HTML `<dialog>` elements can be closed via the Escape key without triggering click events on custom close buttons. This causes trigger buttons (like search icons) to retain `aria-expanded="true"` indefinitely, confusing screen reader users.
**Action:** Always bind an event listener to the native `close` event on the `<dialog>` element itself to reset `aria-expanded="false"` on the associated trigger button, ensuring state parity regardless of how the dialog is dismissed.
