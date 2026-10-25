# Cap Citoyen — Naturalisation FR Game

A responsive, offline-first educational game for people preparing for French naturalisation. It separates the current civic-exam learning path from a historical assimilation-interview reflection path.

**Independent educational tool — not an official government service and not legal advice.**

## Product planning
- [Product plan](docs/PRODUCT_PLAN.md)
- [Implementation backlog](docs/BACKLOG.md)

## Current prototype
- Responsive French interface with home, theme browser, quiz, results and progress views.
- Small demonstration question bank with explanations and provenance labels.
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

## Important prototype limitations
- The question bank is a small demonstration set, not a complete or fully reviewed official content bank.
- The exam page currently runs a short demo session; the full 40-question exam, official question allocation and 45-minute timer are not implemented yet.
- Demo results must not be interpreted as an official pass/fail result.
- Every factual question must be reviewed against current official sources, and content reuse/licensing checked before public release.

## Official references
- [Civic exam for naturalisation/reintegration](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html)
- [Official knowledge-question list](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html)
- [Access to French nationality procedures](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise)
- [Decree 2025-648 of 15 July 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte)
- [Order of 10 October 2025 on the civic exam programme](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620)
