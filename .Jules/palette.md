## 2026-03-22 - Native Dialog Accessibility
**Learning:** Native HTML5 `<dialog>` elements don't automatically update `aria-expanded` on their corresponding trigger buttons when closed via the `Esc` key or native `close()` method.
**Action:** Always add an explicit `close` event listener on the `<dialog>` element to manually reset `aria-expanded="false"` on its trigger button.
