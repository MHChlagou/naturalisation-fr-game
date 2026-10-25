# Backlog — Naturalisation FR Game

## Epic 0 — Official content and accuracy
- [x] Identify the current July 2026 Livret du citoyen and the July 2026 approval order; document sources and requirements in [CONTENT_VALIDATION.md](CONTENT_VALIDATION.md).
- [x] Inspect the official public knowledge-question list and document its scope and limits.
- [x] Record official sources, retrieval date, theme allocation and review checklist.
- [x] Perform an initial question-by-question factual review of all 40 practice items; details and limitations are recorded in CONTENT_VALIDATION.md. A second independent editorial review is still required.
- [x] Add direct source links to question feedback; independent review status is still pending.
- [ ] Keep practice questions original rather than copying official question wording; link to the official list and verify reuse rights before adding verbatim excerpts.
- [ ] Enforce content release gate in automated validation; draft questions must not be presented as validated.
- [x] Add a legacy interview pathway notice and clarify the 1 January 2026 transition date; verify the applicable rule with the prefecture for individual files.

## Epic 1 — UX and design system
- [ ] Establish responsive design tokens, typography, colours, spacing and cards.
- [ ] Build a date-of-filing pathway selector with a clear current vs legacy distinction.
- [ ] Create custom guide character as local SVG with several expressions.
- [ ] Build the guide speech bubble, question view and explanation state.
- [ ] Add keyboard focus, semantic structure, contrast and reduced-motion support.
- [ ] Verify layouts at 320, 375, 768, 1024 and desktop widths.

## Epic 2 — Learning and quizzes
- [ ] Build the theme browser and quiz-based learning path.
- [ ] Add a separate bite-size lesson player.
- [ ] Implement question data model and automated schema/source validation.
- [ ] Implement single-choice quiz flow and immediate feedback.
- [ ] Show explanation, takeaway and a direct source link.
- [ ] Add bookmarks, theme selection and revision filters.
- [ ] Add an explicit uncertain/guessed-answer marker and difficulty filters.
- [ ] Add mistake notebook and targeted review.

## Epic 3 — Mock exam
- [x] Add 40-question original practice session with official theme allocations and 12 original situation exercises.
- [x] Implement a 45-minute countdown and treat unanswered questions as incorrect when time expires.
- [x] Score the 40-question simulation against the 32/40 reference threshold; results remain explicitly educational, not an official attestation.
- [ ] Randomize question order while preserving each question's choices and correct answer index.
- [ ] Show score, percentage and per-theme breakdown.
- [ ] Add elapsed-time display and more targeted revision recommendations.
- [x] Label every exam result as a simulation, not an official result.

## Epic 4 — Offline-first and local data
- [x] Add PWA manifest and service worker.
- [x] Bundle app assets, guide illustration, questions and explanations locally.
- [x] Persist answers, attempts, bookmarks and revision state in browser localStorage.
- [x] Version the service-worker cache
- [ ] Add safe storage migration and a user-facing update notice.
- [x] Add JSON export/import and confirmed reset.
- [x] Add online/offline/install status and a local-data privacy note.
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
- [x] Add README install/run/test/deploy instructions.
- [ ] Add contribution guide for content corrections and source review.