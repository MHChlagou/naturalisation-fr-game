# Backlog — Cap Citoyen

## Epic 0 — Official content and accuracy
- [x] Identify the current July 2026 Livret du citoyen, the July 2026 approval order and the official knowledge-question list.
- [x] Document the 1 January 2026 transition rule, official theme/subtheme allocations and the limits of the official public question list.
- [x] Add a first-pass factual review and direct source links for the 40 original practice questions.
- [x] Keep questions original rather than copying official question wording.
- [x] Validate question count, source coverage, theme/subtheme counts and the non-official-content disclosure in the automated script.
- [ ] Obtain an independent second editorial review and live-check all source URLs before describing the bank as fully verified.

## Epic 1 — UX and design system
- [x] Establish responsive design tokens, typography, colours, spacing and cards.
- [x] Build the date-of-filing selector for the current civic-exam path vs. historical assimilation-interview path.
- [x] Create the local SVG guide character with smiling and thinking expressions.
- [x] Build the guide speech bubble, question view, explanations and source links.
- [x] Add keyboard focus styles, semantic structure and reduced-motion support.
- [ ] Verify layouts at 320, 375, 768, 1024 and desktop widths in a real browser.

## Epic 2 — Learning and quizzes
- [x] Build the theme browser and quiz-based learning path.
- [x] Implement the question data model and automated schema/source validation.
- [x] Implement single-choice quiz flow and immediate feedback.
- [x] Show explanation, takeaway and a direct source link.
- [x] Add bookmarks, theme selection, mistake notebook and targeted revision.
- [x] Add five source-linked mini-lessons, one for each theme.
- [x] Add an explicit uncertain-answer marker and dedicated revision queue.
- [x] Add difficulty labels and filter theme practice by level.

## Epic 3 — Mock exam
- [x] Add a 40-question original practice session matching the five theme allocations and official subtheme counts.
- [x] Add 12 original situational exercises (6 principles/values and 6 rights/duties).
- [x] Implement a 45-minute countdown and treat unanswered questions as incorrect when time expires.
- [x] Show score, percentage, the 32/40 reference threshold, elapsed time and per-theme breakdown.
- [x] Label every result as educational, not an official result or attestation.
- [ ] Add more targeted revision recommendations.
- [ ] Add browser-level functional tests for scoring, timer expiry and randomization.

## Epic 4 — Offline-first and local data
- [x] Add PWA manifest and service worker.
- [x] Bundle the app, question bank and guide expressions locally and cache them offline.
- [x] Version the service-worker cache.
- [x] Persist answers, attempts, bookmarks and revision state in browser localStorage.
- [x] Add JSON export/import/reset, online/offline/install status and a local-data privacy note.
- [ ] Add safe storage migration and a user-facing update notice.
- [ ] Test offline launch, reload and update behaviour in a real browser.

## Epic 5 — Assimilation interview path
- [x] Add 10 reflection topics and personal prompts.
- [x] Add a four-step answer framework that encourages sincere personal answers without prescribing a model response.
- [x] Add a prominent note that this pathway does not replace requirements applicable to an individual file.
- [ ] Add more situational coaching cards for rights, duties and republican values.

## Epic 6 — Tests and release
- [x] Add automated checks for JavaScript syntax, question count/uniqueness, source coverage, theme/subtheme allocation, timer presence, date selector and offline assets.
- [ ] Run end-to-end browser tests for pathway selection, quiz, feedback, results and mistake review.
- [ ] Test storage export/import round-trip and offline behaviour after browser restart.
- [ ] Run accessibility checks and manual keyboard/screen-reader pass.
- [ ] Confirm GitHub Pages deployment and the final published experience.
- [x] Document local run, validation and deployment instructions.
