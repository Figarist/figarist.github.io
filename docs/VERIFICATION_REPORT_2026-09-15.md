# Baseline and verification record

Date: 2026-09-15. Source: `1350ff7e1334a00306403a4f1190ce2e60ba27cf`.
Scope: repository and local checks.

## Implemented baseline

- `65f0213`: homepage restructuring and expanded tutoring destinations.
- `1e8c13a`: archive alternates and link integrity.
- `049c001`, `ddd05d7`, `756694b`: custom domain, metadata, deployment checks.
- `0962efd`, `4d6c2c2`: planning documents, not CRO implementation.
- `6b22c31`, `667f10b`, `1350ff7`: draft, vendor and artifact cleanup.

| Area | Source observation |
| --- | --- |
| Domain | sivochka.com in CNAME/config |
| Tutoring | Overview + five directions; four locale datasets |
| Order | Conditions before cases/profile/reviews in tutoring layout |
| Reviews | Carousel with published/ready/permission filters |
| Counts | settings.yml: 11 BUKI + 7 Association |
| Profile | Published; four translations; degree, two named badges, award |
| Experience | verified_facts.experience has no published numeric entry |
| Policies | 1000 UAH, 60 minutes, paid first lesson, Zoom |
| Ages | Shared minimum 6; recommendations need author input |
| Optional material | No portrait or published student case |
| Hero project | Image and project link in tutoring layout |

Task statuses live only in [the backlog](IMPLEMENTATION_CHECKLIST.md).

## Local checks earlier in this conversation

After a clean build at the baseline:
- Site checks: PASS, 28 checked pages, 24 tutoring routes.
- Link audit: 105 HTML files, 6240 references, zero errors.
- Gzip sizes reported: script 5818 bytes, CSS 17112 bytes.
- Readiness: zero structural errors; portrait and cases pending.

An initial build retained an obsolete generated testpost and failed an old-origin
check. Cleaning generated output and rebuilding resolved it. Counts and sizes are
snapshots, not fixed targets. These are local results, not deployed verification.

## Limits

No new live browser review, deployment verification, accessibility certification
or conversion measurement was performed for this documentation work. The previous
report mixed source findings with unsourced behavior/market claims; these are
removed from active guidance.

Local main matched the stored origin/main at review time. No remote fetch was
performed; this does not establish the current remote head.

## Documentation consolidation

Validate Markdown links, diff whitespace and source-only scope. Earlier prose is
recoverable from Git at `4d6c2c2`. Append future evidence with task IDs, date,
revision (or uncommitted), command/browser steps, result and limitations.
Do not mark a local implementation as deployed.

Documentation validation on 2026-09-15 (uncommitted): all 9 docs Markdown files
checked; 21 relative Markdown links resolve; git diff --check passes. Scope is
Markdown only (9 modified files and 2 new documents), with no runtime/source-data
changes. No build rerun was needed for excluded documentation. The content guide
was corrected against the current schema and review component, including all five
case directions, cross-locale original reviews and the source_only display limit.
