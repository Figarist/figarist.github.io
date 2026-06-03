## 2024-03-17 - [Active Language Switcher Accessibility]
 **Learning:** Active UI state indicators (like `.active` classes on language switchers) are purely visual and lack context for assistive technologies. Adding semantic attributes is essential.
 **Action:** Always pair visual active states (e.g., `class="active"`) with appropriate ARIA attributes like `aria-current="true"` or `aria-selected="true"` depending on the role.
