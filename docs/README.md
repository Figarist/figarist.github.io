# Documentation index

Updated: 2026-09-18.

This directory contains the operational, implementation and verification record
for figarist.com. Current source, `Gemfile.lock`, the CI workflow and executable
tests take precedence over dated snapshots.

## Operations and current status

- [Build and release guide](deployment_guide.md) — runtime policy, local checks,
  publication and recovery
- [Implementation checklist](IMPLEMENTATION_CHECKLIST.md) — the canonical task
  status register
- [Verification report](VERIFICATION_REPORT_2026-09-15.md) — dated test evidence,
  later addenda and explicit limitations
- [Dependency freshness audit](DEPENDENCY_FRESHNESS_AUDIT_2026-09-18.md) — direct,
  transitive, browser and GitHub Actions dependency decisions

## Content and product work

- [Tutoring implementation brief](TUTORING_REARRANGEMENT_PLAN.md)
- [Tutoring content guide](tutoring-content-guide.md)
- [Author action guide](AUTHOR_ACTION_GUIDE.md)
- [UX and conversion rationale](UX_CRO_DEEP_ANALYSIS.md)

The author guide covers decisions that cannot be inferred safely from code or
synthetic checks. Structural readiness does not prove authorship, consent or
qualifications.

## Migration records

- [Polyglot 1.14 migration plan](POLYGLOT_MIGRATION_2026-09-18.md)
- [jekyll-seo-tag 2.9 migration plan](SEO_TAG_MIGRATION_2026-09-18.md)
- [Jekyll architecture audit](JEKYLL_ARCHITECTURE_AUDIT_2026-09-18.md)

The architecture audit began as a snapshot of the older Polyglot 1.5.1 state.
Its dated follow-up sections record the completed 1.14.0 migration. Do not read
an earlier finding as the current dependency state without its later addendum.

## Historical planning

- [Next-work prompt](NEXT_WORK_PROMPT.md) — preserved implementation handoff,
  not the current status authority

The September 15 documentation cleanup separated rationale, implementation,
tasks and evidence. Earlier parallel task lists and September 13 SEO, link and
worktree reports remain available through Git history. They should not be
restored as active status documents.

## Documentation rules

- Maintain technical documentation in English.
- Update task status only in `IMPLEMENTATION_CHECKLIST.md`.
- Record evidence with its date, revision, command and limitations.
- Keep historical claims intact; add a dated follow-up when the state changes.
- Keep private correspondence, consent records and credentials outside the repo.
- Treat browser checks, live deployment checks and structural tests as separate
  kinds of evidence.

This directory is excluded from the generated Jekyll site but remains public
repository content.
