# Naturalisation FR Game

A responsive, offline-first educational game for people preparing for French naturalisation. It will provide a modern civic-exam pathway aligned to the framework in force from 1 January 2026 and a separate legacy-style assimilation-interview practice pathway.

**This is an independent learning aid, not an official government service or legal advice.**

## Product planning
- [Product plan](docs/PRODUCT_PLAN.md)
- [Implementation backlog](docs/BACKLOG.md)

## Current verified framework
The Ministry of the Interior states that, from 1 January 2026, naturalisation/reintegration applicants must pass a civic exam. The exam has 40 multiple-choice questions, including knowledge and situational questions, a 45-minute maximum duration, and a pass threshold of 32 correct answers. The five official themes are listed in the product plan and official sources below.

Official sources:
- [Civic exam for naturalisation/reintegration](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html)
- [Official knowledge-question list](https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html)
- [Access to French nationality procedures](https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise)
- [Decree 2025-648 of 15 July 2025](https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte)
- [Order of 10 October 2025 on the civic exam programme](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620)

## Planned technical direction
The first implementation is planned as a TypeScript/React/Vite Progressive Web App with locally bundled assets, IndexedDB for progress, a service worker for offline availability, and automated tests. There is no backend or account requirement in the MVP.

## Development status
This repository currently contains planning and requirements only. The runtime app and question bank have not been implemented yet. Content marked for the civic exam must be validated against official sources before being released to learners.