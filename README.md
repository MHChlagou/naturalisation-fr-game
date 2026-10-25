# Cap Citoyen - Naturalisation FR Game

A responsive, offline-first educational game for people preparing for French naturalisation. It separates the current civic-exam learning path from a historical assimilation-interview reflection path.

**Independent educational tool - not an official government service and not legal advice.**

## Product planning
- [Product plan](docs/PRODUCT_PLAN.md)
- [Implementation backlog](docs/BACKLOG.md)
- [Official content validation audit](docs/CONTENT_VALIDATION.md)
- [Secure AI coaching backend architecture](docs/AI_BACKEND_ARCHITECTURE.md)

## Current prototype
- Responsive French interface with home, theme browser, quiz, results and progress views.
- 120-question original national practice bank with direct source links, official theme/subtheme allocations for the 40-question exam blueprint, easy/intermediate/advanced filters and recent-question avoidance; content remains educational and needs an independent editorial review.
- Local progress, bookmarks, uncertain-question review queue, mistake review, per-theme stats and JSON export/import/reset.
- Local SVG guide illustration with question feedback and coaching messages.
- PWA manifest and service worker for app-shell caching.
- Date-based procedure selector and 10 assimilation-interview reflection topics with question-specific coaching, follow-up prompts, a 15-minute timed practice mode, progress tracking and a detailed self-assessment report.
- Initial FastAPI backend scaffold in `backend/` for optional AI feedback, including Pydantic validation, bounded input, CORS allowlist, a basic process-local rate limiter, an OpenAI-compatible provider adapter, container setup and API tests. It is not deployed and returns HTTP 503 until provider settings are configured.
- Automated static validation via node scripts/validate.mjs, including source metadata, 120-question uniqueness, exam blueprint theme/subtheme allocations and PWA cache checks.
- GitHub Actions workflow to validate pull requests and deploy the static app to GitHub Pages after a push to main.

## Run the API locally

See [backend setup and security notes](backend/README.md). The API is separate from GitHub Pages and must be hosted on a trusted HTTPS service before the frontend can call it. Configure `LLM_API_KEY`, `LLM_MODEL` and `LLM_BASE_URL` only in the server environment. Do not add secrets to this repository. The initial in-memory rate limiter is not sufficient as the only production control for multiple replicas.

## Run the static app locally
Serve the repository root with any local HTTP server, for example:

    python3 -m http.server 8080

Then open http://localhost:8080. Service worker/PWA functionality requires HTTP(S); opening index.html directly as a file will not enable it.

## GitHub Pages deployment
The workflow is in [.github/workflows/pages.yml](.github/workflows/pages.yml). It runs JavaScript syntax checks and validates the question bank and PWA assets before deployment.

To enable publishing for this repository:
1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push changes to `main`. The workflow validates the app and deploys automatically after successful validation.
4. Open the deployment job under **Actions** and use the published URL shown in the github-pages environment.

GitHub Pages can take a few minutes to publish after a successful workflow run.

## Transition rule to display to learners

The transition date for the new civic-exam requirement is **1 January 2026**, not July 2026. Under Article 11 of Decree No. 2025-648 of 15 July 2025, the relevant new provisions apply to naturalisation/reintegration applications filed from that date. Applicants with a file filed before 1 January 2026 should be directed to the assimilation-interview preparation path and advised to confirm the applicable rules with their prefecture. The July 2026 update is the new *Livret du citoyen*, not the exam transition date. See the [decree's official text](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte).

## Important prototype limitations
- The 120-question bank is an expanding educational practice set, not an official question bank. The official list publishes knowledge-question stems without answers; situational questions are not publicly disclosed.
- The exam page runs a 40-question, 45-minute educational simulation using original practice questions. It is not an official question bank or attestation.
- Results are educational and must not be interpreted as an official pass/fail result or certificate.
- Every factual question must be reviewed against current official sources, and content reuse/licensing checked before public release.

## Official references
- [Livret du citoyen - version de juillet 2026](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/livret-du-citoyen.html)
- [Arrêté du 3 juillet 2026 approuvant le livret du citoyen](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000054426889)
- [Service-Public - examen civique pour la naturalisation](https://www.service-public.gouv.fr/particuliers/vosdroits/F39426)
- [Civic exam for naturalisation/reintegration](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html)
- [Official knowledge-question list](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html)
- [Access to French nationality procedures](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise)
- [Decree 2025-648 of 15 July 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte)
- [Order of 10 October 2025 on the civic exam programme](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620)
- Adaptive practice mode prioritizes mistakes, uncertain questions, unattempted questions, and themes with lower recorded accuracy.
- Adaptive practice includes a theme-priority overview and works with locally saved progress.
- Interactive assimilation interview practice with personal free-text answers, a reflection checklist, and transparent non-official feedback. Responses are not persisted.
