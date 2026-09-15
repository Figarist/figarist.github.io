# UX rationale and hypotheses

Updated: 2026-09-15. [Tasks and status](IMPLEMENTATION_CHECKLIST.md).

## Product direction

The homepage serves personal identity, projects and exploration. Tutoring pages
help families understand the offer and start a conversation. Preserve the Cloud
Dancer palette, personal tone and project character.

| Baseline observation | Hypothesis | Task |
| --- | --- | --- |
| Conditions precede profile/reviews | Earlier evidence may help visitors evaluate the offer | UX-01 |
| Credentials are separated from the first CTA | A source-linked summary may improve discoverability | UX-02 |
| Telegram prefill lacks visible Hero guidance | A short explanation may ease first contact | UX-03 |
| Reviews use a carousel | Several initially visible reviews may improve scanning | UX-04 |
| Shared minimum age is 6 | Author-approved direction guidance may clarify suitability | UX-05 |
| No published student cases | Real work may illustrate outcomes without promising identical results | UX-06 |
| Detailed terms take vertical space | Compact presentation may improve scanning | UX-07 |

These are design hypotheses from repository inspection. No supplied analytics,
experiment or user study establishes conversion uplift, mobile traffic share,
market position or universal visitor behavior.

## Editorial boundaries

- Settings record 11 BUKI reviews and 7 Association reviews: separate snapshots.
- Use exact badge names: Unity Junior Programmer and Unity Essentials.
  Do not rename them “Unity Certified Developer”.
- No published numeric experience entry supports “7+ years”.
- Preserve exact review text, source and original language.
- Current first lesson is paid and uses Zoom. A free 15-minute call, Google Meet,
  currency equivalents or different policies require author decisions.
- Age ranges need the author's recommendation, not universal assumptions.
- Removed claims include “top 1%”, “+80% visibility”, “2.5–3 times conversion”,
  universal telephone verification and unsourced competitor prices. They are not
  evidence and must not be copied into public text.

## Later exploration

Diaspora messaging, a portrait and an introductory call remain hypotheses.
Inspect actual mobile behavior before changing games: the tutoring Hero currently
uses imagery and a project link, so an active canvas trapping scrolling there
is not established.

Inspect education content and incoming links before changing navigation or routes.
A static build does not itself configure server-side 301 redirects.

Use existing analytics only after inspecting events and data. A CTA click is not
a confirmed inquiry or booked lesson. Define period, source, locale and denominator
before comparing results; low samples and traffic changes limit causal conclusions.
This plan does not introduce a tracking service or external account changes.

