## 2024-06-25 - Use aria-current for Active UI States
**Learning:** Visual indicators for active states (like `.active` classes on language switchers, navigation pills, or breadcrumbs) convey current context to sighted users but are invisible to screen readers unless explicitly marked.
**Action:** Always pair visual active state classes (e.g., `.active`) with semantic ARIA attributes like `aria-current="page"` (for navigation/breadcrumbs) or `aria-current="true"` (for state toggles like language switchers).
