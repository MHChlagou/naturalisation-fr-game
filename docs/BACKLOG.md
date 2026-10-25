# Backlog — Naturalisation FR Game

## Epic 0 — Official content and accuracy
- [x] Identify the current July 2026 Livret du citoyen and the July 2026 approval order; document sources and requirements in [CONTENT_VALIDATION.md](CONTENT_VALIDATION.md).
- [x] Inspect the official public knowledge-question list and document its scope and limits.
- [x] Record official sources, retrieval date, theme allocation and review checklist.
- [ ] Read and cross-check every question and answer against the current booklet and primary sources.
- [ ] Add precise per-question source metadata and independent review status.
- [ ] Check licensing/reuse before reproducing official wording.
- [ ] Enforce content release gate in automated validation; draft questions must not be presented as validated.
- [ ] Draft the legacy interview pathway with a historical/contextual notice.

## Epic 1 — UX and design system
- [ ] Create responsive design tokens, typography, colours, spacing and cards.
- [ ] Build pathway selector with clear current vs legacy distinction.
- [ ] Create custom guide character as local SVG with several expressions.
- [ ] Build speech bubble, question view and explanation state.
- [ ] Add keyboard focus, semantic structure, contrast and reduced-motion support.
- [ ] Verify layouts at 320, 375, 768, 1024 and desktop widths.

## Epic 2 — Learning and quizzes
- [ ] Build theme browser and bite-size lesson player.
- [ ] Implement question model and schema validation.
- [ ] Implement single-choice quiz flow and immediate/deferred feedback.
- [ ] Show explanation, answer rationale, takeaway and source.
- [ ] Add bookmark, uncertain/guessed answer, theme/difficulty filters.
- [ ] Add mistake notebook and targeted review.

## Epic 3 — Mock exam
- [ ] Implement 40-question session and official theme allocation.
- [ ] Implement maximum 45-minute timer and accessible time announcements.
- [ ] Implement 32/40 pass-threshold calculation.
- [ ] Ensure randomization preserves answer IDs and correctness.
- [ ] Show results with score, percentage, time, per-theme breakdown and recommended next revision.
- [ ] Label every result as a simulation, not an official result.

## Epic 4 — Offline-first and local data
- [ ] Add PWA manifest and service worker.
- [ ] Bundle app assets, fonts, icons, questions and explanations locally.
- [ ] Persist settings, attempts, bookmarks and review queue in IndexedDB.
- [ ] Add content/cache versioning, safe migration and update notice.
- [ ] Add JSON export/import and confirmed reset.
- [ ] Add online/offline/install status and privacy explanation.
- [ ] Test offline after one successful load and after browser restart.

## Epic 5 — Legacy interview path
- [ ] Add interview-topic cards and reflection prompts.
- [ ] Show example answer structures without prescribing a single “correct” personal response.
- [ ] Add situation cards for rights, duties and republican values.
- [ ] Add progress metrics without scoring personal identity or autobiographical disclosures.
- [ ] Add a prominent note that the path does not replace requirements for the user's current procedure.

## Epic 6 — Tests and release
- [ ] Unit-test scoring, question allocation, timer and randomization.
- [ ] Test storage migrations and export/import round-trip.
- [ ] Test pathway selection, quiz, feedback, results and mistake review end to end.
- [ ] Test offline launch, reload and update behaviour.
- [ ] Run accessibility checks and manual keyboard/screen-reader pass.
- [ ] Verify GitHub Pages/static hosting and PWA manifest/scope.
- [ ] Add README install/run/build/test/deploy instructions.
- [ ] Add contribution guide for content corrections and source review.