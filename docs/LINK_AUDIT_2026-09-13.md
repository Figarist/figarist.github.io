# Link audit and release safeguards

Checked 105 live HTML pages. A clean production build contains 6240 references and 165 unique HTTP(S) destinations after remediation.

Fixed nine broken hreflang destinations across localized tag/category archives. Their visible language controls were correct, but Polyglot generated invalid head links. Explicit static alternate paths now work for both generated archives and regular pages.
Removed the retired polyfill.io script by correcting the actual Spaceship processor configuration key. MathJax uses the existing local vendor bundle. Three Mermaid diagrams now render with the existing local Mermaid bundle instead of mermaid.ink; one remote image returned 503. Browser checks confirm three rendered diagrams and three formula containers.

The new scripts/audit_links.rb gate checks local href/src destinations, fragments, retired dependencies and unresolved static-href markers. scripts/public_routes.json freezes 105 previously published routes: removal requires an explicit migration decision. GitHub Actions runs this before deployment. A deliberately inserted missing link was rejected with exit code 1, then removed from the temporary build.

External limitation: https://figarist.itch.io/dish-of-chaos returned HTTP 429 both through HTTP and the browser. This is a third-party rate limit, not proof of a deleted game. Keep the correct link; the site's own game page remains available. Other 35 distinct external destinations passed HTTP checks. HTTP success does not guarantee video availability in every country, authentication state or future uptime.

Do not rename published URLs casually. For an intentional removal, retain a meaningful redirect and update internal links and sitemap together. Use clean builds and require all release gates before deploying. No claim of guaranteed Google rankings, indexing or immunity from future outages is made.
