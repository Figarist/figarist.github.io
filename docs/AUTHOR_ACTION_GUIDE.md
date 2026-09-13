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

## Verify and prepare commits

Run content tests, isolated build tests, a production build, site tests and
scripts/verify_author_ready.rb. The readiness command checks structure;
--strict also fails on missing author material. Neither proves consent or
guarantees deployment readiness.

Review the exact diff and stage named files. Separate technical funnel fixes,
fictional-content quarantine and later genuine author material where practical.
Do not use git add . for this mixed working tree. Commit and push require the
author's separate instruction.
