# Backlog — Naturalisation FR Game

## Epic 0 — Official content and accuracy
- [x] Identify the current July 2026 Livret du citoyen and the July 2026 approval order; document sources and requirements in [CONTENT_VALIDATION.md](CONTENT_VALIDATION.md).
- [x] Inspect the official public knowledge-question list and document its scope and limits.
- [x] Record official sources, retrieval date, theme allocation and review checklist.
- [x] Perform an initial question-by-question factual review of the 13 demo items; details and limitations are recorded in CONTENT_VALIDATION.md. A second independent editorial review is still required.
- [x] Add source links to demo-question feedback; independent review status is still pending.
- [ ] Check licensing/reuse before reproducing official wording.
- [ ] Enforce content release gate in automated validation; draft questions must not be presented as validated.
- [x] Add a legacy interview pathway notice and clarify the 1 January 2026 transition date; verify the applicable rule with the prefecture for individual files.

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
- [x] Add 40-question original practice session with official theme allocations and 12 original situation exercises.
- [x] Implement a 45-minute countdown and treat unanswered questions as incorrect when time expires.
- [x] Score the 40-question simulation against the 32/40 reference threshold; results remain explicitly educational, not an official attestation.
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
- [x] Expand the interview path to 10 reflection topics and personal prompts.
- [x] Add a four-step answer framework that encourages sincere personal answers without prescribing a model response.
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