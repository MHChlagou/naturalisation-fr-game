# Cap Citoyen — Naturalisation FR Game

A responsive, offline-first educational game for people preparing for French naturalisation. It separates the current civic-exam learning path from a historical assimilation-interview reflection path.

**Independent educational tool — not an official government service and not legal advice.**

## Product planning
- [Product plan](docs/PRODUCT_PLAN.md)
- [Implementation backlog](docs/BACKLOG.md)

## Current prototype
The `feat/offline-mvp` branch contains the first static web prototype:
- Responsive home, theme browser, quiz player and result views.
- Small sample question bank with explanations and source/provenance labels.
- Local progress, bookmarks, per-theme stats, JSON export/import/reset.
- Friendly guide illustration bundled as local SVG.
- PWA manifest and service worker for app-shell caching.
- Historical interview reflection prompts and contextual notice.

### Run locally
Because this is a static app, you can serve the repository root with any local HTTP server. For example:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. The service worker/PWA features require HTTP(S); opening `index.html` directly as a file will not enable them.

## Important prototype limitations
- The question bank is a small demonstration set, not a complete or fully reviewed official content bank.
- The exam page currently runs a short demo session; the full 40-question exam, official theme allocation and 45-minute timer are not implemented yet.
- Do not interpret the demo result as an official pass/fail result.
- Every factual question must be reviewed against current official sources and content reuse/licensing checked before public release.

## Official references
- [Civic exam for naturalisation/reintegration](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html)
- [Official knowledge-question list](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html)
- [Access to French nationality procedures](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise)
- [Decree 2025-648 of 15 July 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte)
- [Order of 10 October 2025 on the civic exam programme](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620)
