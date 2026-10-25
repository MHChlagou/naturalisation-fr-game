# Cap Citoyen — Naturalisation FR Game

A responsive, offline-first educational game for people preparing for French naturalisation. It separates the current civic-exam learning path from a historical assimilation-interview reflection path.

**Independent educational tool — not an official government service and not legal advice.**

## Product planning
- [Product plan](docs/PRODUCT_PLAN.md)
- [Implementation backlog](docs/BACKLOG.md)
- [Official content validation audit](docs/CONTENT_VALIDATION.md)

## Current prototype
- Responsive French interface with home, theme browser, quiz, results and progress views.
- 40-question original practice bank with explanations, direct source links and theme allocations matching the exam structure; content remains educational and needs an independent editorial review.
- Local progress, bookmarks, per-theme stats, JSON export/import/reset.
- Local SVG guide illustration.
- PWA manifest and service worker for app-shell caching.
- Historical interview reflection prompts.
- Automated static validation via node scripts/validate.mjs.
- GitHub Actions workflow to validate pull requests and deploy the static app to GitHub Pages after a push to main.

## Run locally
Serve the repository root with any local HTTP server, for example:

    python3 -m http.server 8080

Then open http://localhost:8080. Service worker/PWA functionality requires HTTP(S); opening index.html directly as a file will not enable it.

## GitHub Pages deployment
The workflow is in [.github/workflows/pages.yml](.github/workflows/pages.yml). It runs JavaScript syntax checks and validates the question bank and PWA assets before deployment.

To enable publishing for this repository:
1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Merge the feature pull request into main. The workflow will validate and deploy automatically.
4. Open the deployment job under **Actions** and use the published URL shown in the github-pages environment.

GitHub Pages can take a few minutes to publish after a successful workflow run.

## Transition rule to display to learners

The transition date for the new civic-exam requirement is **1 January 2026**, not July 2026. Under Article 11 of Decree No. 2025-648 of 15 July 2025, the relevant new provisions apply to naturalisation/reintegration applications filed from that date. Applicants with a file filed before 1 January 2026 should be directed to the assimilation-interview preparation path and advised to confirm the applicable rules with their prefecture. The July 2026 update is the new *Livret du citoyen*, not the exam transition date. See the [decree's official text](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte).

## Important prototype limitations
- The 40-question bank is a complete-sized educational practice set, not an official question bank. The official list publishes knowledge-question stems without answers; situational questions are not publicly disclosed.
- The exam page runs a 40-question, 45-minute educational simulation using original practice questions. It is not an official question bank or attestation.
- Results are educational and must not be interpreted as an official pass/fail result or certificate.
- Every factual question must be reviewed against current official sources, and content reuse/licensing checked before public release.

## Official references
- [Livret du citoyen — version de juillet 2026](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html)
- [Arrêté du 3 juillet 2026 approuvant le livret du citoyen](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054426889)
- [Service-Public — examen civique pour la naturalisation](https://www.service-public.gouv.fr/particuliers/vosdroits/F39426)
- [Civic exam for naturalisation/reintegration](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html)
- [Official knowledge-question list](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html)
- [Access to French nationality procedures](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise)
- [Decree 2025-648 of 15 July 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte)
- [Order of 10 October 2025 on the civic exam programme](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620)
