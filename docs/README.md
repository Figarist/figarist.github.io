# Website work hub

Updated: 2026-09-15. Source baseline: `1350ff7`.

## Start here

1. [Baseline and evidence](VERIFICATION_REPORT_2026-09-15.md).
2. [Canonical backlog](IMPLEMENTATION_CHECKLIST.md): the only task status register.
3. [Implementation brief](TUTORING_REARRANGEMENT_PLAN.md).
4. [Next implementation prompt](NEXT_WORK_PROMPT.md): copy into a new task.
5. [Author decisions](AUTHOR_ACTION_GUIDE.md).

Reference: [UX rationale](UX_CRO_DEEP_ANALYSIS.md), [content editing](tutoring-content-guide.md),
[build and release](deployment_guide.md).

Current source and tests take precedence over snapshots. Explicit author decisions
take precedence over proposed copy. Update task status only in the backlog;
record evidence with date, revision, command and limitations in the evidence report.

## Consolidation

The September 15 audits now separate rationale, implementation, tasks and evidence.
Unsupported statistics and inaccurate sample claims were removed. Previous versions
remain in Git at `0962efd` and `4d6c2c2`.

September 13 SEO, link and worktree reports were deleted in `667f10b`; they are
historical records, not missing prerequisites. For example:
`git show 1e8c13a:docs/LINK_AUDIT_2026-09-13.md`.
Do not restore parallel task lists.

The docs directory is excluded from the generated site but remains public repository
content. Keep private correspondence and consent documents outside it.
