## 2024-05-18 - `aria-current` for Active UI States
**Learning:** Active visual UI states (e.g., using `.active` classes on language switchers or navigation items) must always be paired with `aria-current="page"` or `aria-current="true"` for screen readers to properly announce the current selected item or page to users.
**Action:** When creating active UI states going forward, always remember to pair it with corresponding ARIA tags (`aria-current` or `aria-selected` where applicable) for robust accessibility.
