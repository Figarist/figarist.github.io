## 2026-03-04 - Layout Thrashing in Scroll Handlers
**Learning:** Modifying layout properties like `width` inside a scroll `requestAnimationFrame` causes layout thrashing because the subsequent read of `window.scrollY` in the next frame will force a synchronous layout recalculation.
**Action:** Always prefer composite-only properties like `transform: scaleX()` for progress bars and scroll-bound animations to prevent dirtying the layout tree.
