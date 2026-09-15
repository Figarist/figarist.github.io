# Tutoring implementation brief

Updated: 2026-09-15. [Canonical tasks](IMPLEMENTATION_CHECKLIST.md).
This describes the target, not completed implementation.

## First delivery: UX-01–03

Preserve course-specific sections. Reorder the shared lower sections:

Current: directions → trust links → conditions → cases → profile → reviews → FAQ → video → final CTA.

Target: directions → trust links → cases → profile → reviews → conditions → FAQ → video → final CTA.

Keep case publication filters and render nothing when empty.

Add a small wrapping evidence strip near the Hero contact action. Read facts and
URLs from shared data: degree and accurately named existing badges. Keep review
counts attributed to their own platforms. Omit unavailable experience claims.
Keep price legible.

Suggested UK guidance: “Напишіть вік дитини та чим вона цікавиться — обговоримо,
з чого почати.” Translate naturally into EN/RU/KO. This promises no free lesson
or call. Retain the existing Telegram prefill, accessible label and analytics hook.

## Source map

| Responsibility | Source |
| --- | --- |
| Shared section order and Hero | `_layouts/tutoring.html` |
| Contact behavior | `_includes/tutoring-contact.html`, `script.js` |
| Reviews | `_includes/tutoring-testimonials.html`, `_data/tutoring/testimonials.yml` |
| Profile/cases | `_includes/tutoring-profile.html`, `_includes/tutoring-cases.html` |
| Facts/policies | `_data/tutoring/settings.yml`, `_data/tutoring/profile.yml` |
| Copy | `_data/{en,uk,ru,ko}/tutoring.json`, matching `strings.yml` |
| Styles | `_sass/_tutoring.scss`, shared tokens |
| Schema/normalization | `_plugins/tutoring_content.rb` |

Locate symbols and section classes; old line numbers are not stable.

## Second delivery: UX-04/07

Render three selected published reviews as responsive cards. Keep remaining
reviews accessible, for example under a native disclosure. Preserve normalized
records, publication gates, exact text, original-language `lang` attributes and
individual source URLs. Remove carousel JS only after checking all consumers.

Use semantic HTML for compact conditions. Secondary details may collapse if
discoverable and keyboard accessible. Price, payment and cancellation meaning
remain unchanged. Neither change needs a UI dependency.

## Acceptance

Check overview and all five course destinations across four locales. Inspect
360px, 768px and approximately 1300px layouts, CTA access, wrapping, keyboard,
focus, reduced motion and empty optional sections. Record actual observations.
Follow [build/release checks](deployment_guide.md). Author-dependent work follows
[author decisions](AUTHOR_ACTION_GUIDE.md) and the actual case schema.

