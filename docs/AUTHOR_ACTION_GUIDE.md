# Author content and release checklist

The approved author profile and lesson conditions are now supplied by the author.
The profile includes two verified Credly badges and confirmed education.
Student case examples and testimonial selections remain unpublished.
Photo and student work are deferred and are not release blockers.

## Supply remaining real material

1. Write a short first-person introduction: whom you teach, how lessons work,
   what you enjoy teaching and what makes your approach yours.
2. Confirm the actual price, duration, payment methods, scheduling, cancellation,
   lesson tools and homework policy.
3. Supply an optional real portrait in WebP and descriptive alt text.
4. Start with one real student project: initial level, goal, student's work,
   your help, actual result and duration. Supply a screenshot or playable link.
5. Supply the original review and source. A translation or shortened paraphrase
   must not be presented as an exact original quotation.
6. Record permission only after receiving it for the actual public material.
   Keep private correspondence and identity documents outside this public repo.
7. Confirm qualifications and experience. Do not rename a course completion
   badge as a professional certification.

Edit profile, cases and testimonials in _data/tutoring. Replace the fictional
text entirely before setting status: published, ready: true or permission: true.
Missing optional sections stay hidden. Images require alt text for every ready
translation.

## UX/CRO audit additions (2026-09-15)

The deep UX/CRO audit identified specific content gaps that only the author
can fill. These are listed by priority.

### High priority (P1 — direct conversion impact)

8. Confirm recommended age ranges for each direction:
   - Scratch: author to confirm 6–8 or adjust
   - Minecraft / Python: author to confirm 8–11 or adjust
   - Unity: author to confirm 10–14+ or adjust
   - Informatics: author to confirm school age range
   These will replace the current blanket «від 6 років» on all pages.

9. Select 2–3 real student projects for the Cases section:
   - Each case needs: student first name (with permission), age or grade,
     direction (unity/python/scratch/minecraft), a screenshot or short video
     of the finished project, what the student built, how many lessons it took.
   - Template infrastructure (tutoring-cases.html) is ready; cases only need
     data files in _data/tutoring/cases/ and images in assets/images/tutoring/cases/.
   - Priority: one Unity case, one Python/Minecraft case.

10. Choose top 3 testimonials for prominent display:
    Current recommendation from the audit: Yevgen (review-3), Анжела (review-2),
    Надія (review-1). These would appear as static cards instead of a carousel.
    Author may substitute different reviews if preferred.

### Medium priority (P2 — external traffic)

11. Update external profile URLs to point to /uk/tutoring/ instead of
    the domain root:
    - BUKI profile link
    - Асоціація репетиторів profile link
    - Social media bios and signatures
    - Email signatures

12. Decide on /education/ page status:
    A) Fill with real tutorial content (long-term)
    B) Hide from navigation until content exists
    C) Redirect to /blog/ as temporary solution

### Low priority (P3 — polish)

13. Optional portrait photo for profile section (WebP, alt text in 4 languages).
14. Optional short video clips of lesson process (30 seconds, with permission).

## Verify and prepare commits

Run content tests, isolated build tests, a production build, site tests and
scripts/verify_author_ready.rb. The readiness command checks structure;
--strict also fails on missing author material. Neither proves consent or
guarantees deployment readiness.

Review the exact diff and stage named files. Separate technical funnel fixes,
fictional-content quarantine and later genuine author material where practical.
Do not use git add . for this mixed working tree. Commit and push require the
author's separate instruction.

## Related documentation

- UX_CRO_DEEP_ANALYSIS.md — strategic analysis and 7 friction nodes
- TUTORING_REARRANGEMENT_PLAN.md — section reordering and copywriting
- IMPLEMENTATION_CHECKLIST.md — step-by-step technical tasks
- VERIFICATION_REPORT_2026-09-15.md — cross-reference against live site
