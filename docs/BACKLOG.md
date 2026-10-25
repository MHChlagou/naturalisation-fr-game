# Backlog - Cap Citoyen

## Epic 0 - Official content and accuracy
- [x] Identify the current July 2026 Livret du citoyen, the July 2026 approval order and the official knowledge-question list.
- [x] Document the 1 January 2026 transition rule, official theme/subtheme allocations and the limits of the official public question list.
- [x] Add a first-pass factual review and direct source links for the original 40-question exam blueprint.
- [x] Expand the national practice bank to 80 original questions with per-question source, theme, subtheme and difficulty metadata.
- [x] Add a second reviewed batch of 40 original questions, bringing the bank to 120.
- [x] Add recent-question avoidance across sessions while preserving the 40-question exam theme allocation.
- [x] Keep questions original rather than copying official question wording.
- [x] Validate question count, source coverage, theme/subtheme counts and the non-official-content disclosure in the automated script.
- [ ] Expand the national bank toward 300-500 questions in reviewed batches.
- [ ] Obtain an independent second editorial review and live-check all source URLs before describing the bank as fully verified.

## Epic 1 - UX and design system
- [x] Establish responsive design tokens, typography, colours, spacing and cards.
- [x] Build the date-of-filing selector for the current civic-exam path vs. historical assimilation-interview path.
- [x] Create the local SVG guide character with smiling and thinking expressions.
- [x] Build the guide speech bubble, question view, explanations and source links.
- [x] Add keyboard focus styles, semantic structure and reduced-motion support.
- [ ] Verify layouts at 320, 375, 768, 1024 and desktop widths in a real browser.

## Epic 2 - Learning and quizzes
- [x] Build the theme browser and quiz-based learning path.
- [x] Implement the question data model and automated schema/source validation.
- [x] Implement single-choice quiz flow and immediate feedback.
- [x] Show explanation, takeaway and a direct source link.
- [x] Add bookmarks, theme selection, mistake notebook and targeted revision.
- [x] Add five source-linked mini-lessons, one for each theme.
- [x] Add an explicit uncertain-answer marker and dedicated revision queue.
- [x] Add difficulty labels and filter theme practice by level.

## Epic 3 - Mock exam
- [x] Add a 40-question original practice session matching the five theme allocations and official subtheme counts.
- [x] Add 12 original situational exercises (6 principles/values and 6 rights/duties).
- [x] Implement a 45-minute countdown and treat unanswered questions as incorrect when time expires.
- [x] Show score, percentage, the 32/40 reference threshold, elapsed time and per-theme breakdown.
- [x] Label every result as educational, not an official result or attestation.
- [x] Recommend the weakest theme at the end of each practice session.
- [ ] Add browser-level functional tests for scoring, timer expiry and randomization.

## Epic 4 - Offline-first and local data
- [x] Add PWA manifest and service worker.
- [x] Bundle the app, question bank and guide expressions locally and cache them offline.
- [x] Version the service-worker cache.
- [x] Persist answers, attempts, bookmarks and revision state in browser localStorage.
- [x] Add JSON export/import/reset, online/offline/install status and a local-data privacy note.
- [ ] Add safe storage migration and a user-facing update notice.
- [ ] Test offline launch, reload and update behaviour in a real browser.

## Epic 5 - Assimilation interview path
- [x] Add 10 reflection topics and personal prompts.
- [x] Add a four-step answer framework that encourages sincere personal answers without prescribing a model response.
- [x] Add a prominent note that this pathway does not replace requirements applicable to an individual file.
- [ ] Add more situational coaching cards for rights, duties and republican values.

## Epic 6 - Tests and release
- [x] Add automated checks for JavaScript syntax, question count/uniqueness, source coverage, theme/subtheme allocation, timer presence, date selector and offline assets.
- [ ] Run end-to-end browser tests for pathway selection, quiz, feedback, results and mistake review.
- [ ] Test storage export/import round-trip and offline behaviour after browser restart.
- [ ] Run accessibility checks and manual keyboard/screen-reader pass.
- [ ] Confirm GitHub Pages deployment and the final published experience.
- [x] Document local run, validation and deployment instructions.

## Quality correction

- Repaired the second extension batch so all 80 bank questions are top-level records with the expected schema.
- Corrected the malformed history question about the 1789 Declaration of the Rights of Man and of the Citizen.
- Expanded the validator to reject malformed prompts, non-string or duplicate choices, and missing question text metadata.
- Checked the bank programmatically: 80 bank questions, no malformed records, no duplicate IDs, and no duplicate prompts against the extra question set.
- Editorial review of the complete bank and validation of every source link remain open tasks.

## Adaptive practice

- Added a dedicated adaptive practice screen and fixed the navigation target that previously pointed to a missing view.
- Adaptive sessions prioritize previously missed answers, uncertain questions, unattempted questions, and weaker themes while reducing the weight of recently seen questions.
- Added a theme-priority overview, mobile styling, and an updated offline cache version.
- Added automated validator assertions for the adaptive screen, start control, and navigation.
- JavaScript syntax and UI structure checks are performed during the implementation; the full repository validator and browser interaction still need to be run in the repository environment.

## Interview simulation

- Added an interactive assimilation interview practice flow with one prompt at a time, a free-text answer field, a word counter, reflection checklist, and a session summary.
- Feedback is intentionally heuristic and transparent. It suggests clarity and structure improvements without claiming to judge factual truth, eligibility, or likely administrative outcomes.
- Answers remain in in-memory session state and are not persisted. Added responsive styles, a PWA cache version bump, and validator assertions.
- Manual browser testing and editorial review of the question prompts remain open.
