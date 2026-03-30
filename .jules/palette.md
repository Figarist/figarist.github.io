## 2024-03-30 - Language Switcher Active State Accessibility
**Learning:** The active `.lang-switch` element visually indicated the selected language but lacked an ARIA attribute to communicate its state to screen readers within its `role="group"`.
**Action:** Always pair visual active UI state indicators (like `.active` classes on language switchers or navigation items) with appropriate ARIA attributes such as `aria-current="true"`.
