# Naturalisation FR Game - Product plan

> A locally usable, responsive learning game to prepare for French naturalisation: legacy assimilation-interview preparation and the post-1 January 2026 civic-exam pathway. This is a learning aid, not legal advice or an official government service.

## 1. Product vision

Help learners prepare with confidence through short, interactive, visual lessons; topic-based quizzes; realistic mock exams; and transparent progress feedback. A friendly illustrated guide introduces questions and explains answers in accessible French.

Product principles:
- Offline-first: study, quiz, review, and progress work without a network after the app is installed/opened once.
- Evidence-led content: each fact and question has a source, last-verified date, pathway applicability, and review status.
- Explain, don't just score: provide the correct answer, a plain-language explanation, why distractors are wrong when useful, and a “remember this” takeaway.
- Inclusive and responsive: mobile-first, keyboard accessible, readable contrast, reduced-motion support, adjustable text, and no interaction that relies only on colour.
- Honest about status: not affiliated with the French government; never promise naturalisation or imply that passing a mock exam guarantees success.

## 2. Legal / programme split (must be explicit in UX)

As verified on 25 October 2026 against official Ministry of the Interior pages:
- From 1 January 2026, an attestation of success in the civic examination is required for naturalisation and reintegration by decree.
- The civic exam is a separate assessment from the assimilation interview. The interview remains relevant to assessing assimilation, including knowledge of rights and duties and adherence to core principles and values.
- The civic exam is a French-language multiple-choice questionnaire: 40 questions, including knowledge and situational questions; maximum 45 minutes; pass mark 32/40 (80%).
- The official programme has five themes: (1) Principles and values of the French Republic; (2) Institutional and political system; (3) Rights and duties; (4) History, geography and culture; (5) Living in French society.
- The official distribution specified in the 10 October 2025 order is 11 / 6 / 11 / 8 / 4 questions across the five themes.

Official sources:
1. Ministry of the Interior - civic examination for naturalisation/reintegration, published 10 June 2026: https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/lexamen-civique-pour-demande-de-naturalisation-ou-de-reintegration-dans-nationalite-francaise.html
2. Ministry of the Interior - official knowledge questions, published 12 January 2026: https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/questions-de-connaissance-pour-lexamen-civique-nationalite-francaise.html
3. Ministry of the Interior - access to French nationality procedures: https://www.immigration.interieur.gouv.fr/devenir-francais/procedures-dacces-a-nationalite-francaise
4. Légifrance - Decree no. 2025-648 of 15 July 2025: https://www.legifrance.gouv.fr/eli/decret/2025/7/15/2025-648/jo/texte
5. Légifrance - Order of 10 October 2025 on the programme and exam arrangements: https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620

Important wording: do not describe the new framework as a change introduced in April/May 2026. Official sources say its main civic-exam requirements took effect on 1 January 2026. If “old method” is supported, label it “ancienne formule - entraînement à l’entretien d’assimilation (historique / pour comprendre le format antérieur)” and show a prominent notice that requirements depend on the person's procedure and date. Do not suggest that old-format preparation replaces the current civic exam.

## 3. Target users and journeys

### First visit
1. Select a pathway: “Examen civique (dispositif 2026)” or “Entretien d’assimilation - ancienne formule”.
2. Choose learning mode: guided lessons, themed quiz, review mistakes, or mock exam.
3. Optional onboarding to choose language level / daily goal (do not require account).
4. Start immediately; no login, server, or network dependency.

### Returning learner
- Continue where left off.
- See recent sessions, mastery by theme, and optional daily goal.
- Review wrong and uncertain answers.
- Resume an interrupted mock exam with clear timing rules.

### Mock-exam flow
- Explain rules before start.
- 40 questions; target maximum 45 minutes; 32/40 pass threshold; distribute according to official theme allocation for a realistic exam.
- Randomize from an authored/validated bank, never change the correct answer while shuffling choices.
- Show final score, percentage, pass threshold, time, theme breakdown, and actionable revision plan.
- Make clear this is a simulation, not the official examination.

## 4. Core feature set

### A. Friendly animated guide
- A custom illustrated guide (“Camille”, working name; renameable) appears next to questions and lessons.
- Expressions/poses: welcoming, explaining, thinking, celebrating, encouraging.
- Question speech bubble displays the prompt; after answer, guide transitions to explanation.
- Use locally bundled SVG/CSS/JSON assets and lightweight CSS animation. No remote avatar, video, TTS, or AI calls in MVP.
- Optional later: local prerecorded audio packs or browser speech synthesis, with a visible text-first fallback. Audio is never necessary to understand content.
- Respect reduced-motion preferences; pause nonessential animation; avatar must not cover controls on small screens.

### B. Learn by theme
New civic-exam pathway:
1. Principles and values of the Republic
2. Institutional and political system
3. Rights and duties
4. History, geography and culture
5. Living in French society

Each theme offers a lesson map, bite-size concept cards, a guided practice set, exam-style situational questions, and review of missed items.

Legacy pathway:
- Practice explaining one's personal journey and integration in a respectful way.
- Topic categories: life and work in France, links to society, rights and duties, republican values, understanding of the process, and personal motivation.
- Interview responses are personal; offer reflection prompts and example structures, never claim there is one universally correct autobiographical answer.
- Clear legal/date/procedure caveat.

### C. Multiple-choice practice
- One question at a time with progress indicator.
- Select answer, then reveal the answer and explanation.
- Explain the correct answer in plain language and optionally why other choices fail.
- Mark “I guessed / not sure”, bookmark, and report content issue.
- Filters: theme, difficulty, unanswered, incorrect, bookmarked, official public knowledge question vs original practice question.
- Random session and targeted revision.

### D. Personal dashboard and complete feedback
Persist locally:
- Total answered, correct, accuracy, time spent, mock attempts, best score and latest score.
- Per-theme accuracy and mastery; separate knowledge vs situational question performance.
- Confidence/guess rate and recurring error types.
- Questions missed, bookmarked, and review due.
- Trend across attempts; compare attempts without shaming language.
- A next-step recommendation based on weak themes.
- Export/import progress as a JSON file; reset data with confirmation.
- No analytics, tracking, server sync, or user account in MVP.

### E. Offline-ready Progressive Web App
- PWA manifest, service worker, offline app shell, cache-first local assets, bundled content JSON.
- Questions, explanations, tutorial, dashboard, and local persistence operate offline.
- Use IndexedDB for progress/session history; localStorage only for small preferences.
- No CDN dependencies at runtime. Bundle fonts/icons/illustrations and production JS/CSS locally.
- Show install affordance and an offline/online indicator; initial install cannot happen without a connection.
- Version cache and content migrations carefully; provide a graceful update notice.
- Test installed PWA and browser offline mode on Android, iOS Safari, desktop Chrome/Firefox/Edge. Explain platform-specific installation limits.
- Privacy note: progress remains on-device and can be lost if browser data is cleared; provide export/import.

## 5. Information architecture / screens

1. Welcome / pathway selector - clear distinction between 2026 exam and legacy interview practice.
2. Home dashboard - continue, daily practice, themes, mock exam, review mistakes; progress at a glance.
3. Theme explorer - theme cards, mastery percentage, number of available lessons/questions.
4. Lesson player - guide + explanation card + example + takeaway + quick check.
5. Quiz player - question, choices, feedback, guide state, bookmark, uncertain-answer action, progress.
6. Explanation panel - factual answer, plain explanation, example, memory tip, source note.
7. Results - score, progress by theme, accuracy trend, weak areas, recommended next steps.
8. Mistake notebook - filters, spaced review, explanation and source.
9. Mock exam setup - mode, rules, timer and accessibility options.
10. Mock exam results - pass-threshold comparison, per-theme analysis, answer review.
11. Progress / statistics - history, time, knowledge vs situational breakdown, export/import.
12. Settings / about - reduced motion, sound toggle if introduced, text size, data export/import/reset, sources, privacy and legal disclaimer.
13. Content/source information - distinction between official public questions, paraphrases and original exercises, review dates and errata.

## 6. Visual design direction

Working product mood: “République en poche” - friendly, polished educational game, not a government portal.
- Warm off-white background, deep navy text, blue as primary, red/blue/cream accents in moderation, one lively secondary accent.
- Bold editorial headings, generous whitespace, rounded cards, crisp progress rings/bars, friendly illustration.
- Avoid an overly childish look: designed for adults preparing an important administrative milestone.
- Micro-interactions for selected answers, success, lesson completion and guide expressions; no distracting particle effects.
- Desktop: left navigation / learning area / right guide + insight panel.
- Mobile: single-column flow, guide above or beside the prompt, large tap targets, sticky bottom action, no horizontal scrolling.
- Accessibility target: WCAG 2.2 AA intent; keyboard navigation, focus visibility, labels, semantic headings, screen-reader announcements for feedback, sufficient contrast, reduced motion.

## 7. Recommended architecture (frontend-only)

Recommend TypeScript + React + Vite, PWA plugin/service-worker support, CSS variables/design tokens, Vitest, and Playwright. These are proposals, not an existing stack requirement.
- `src/app/`: route/layout and app bootstrap
- `src/features/pathway/`: new/legacy mode selection
- `src/features/lessons/`: theme lessons and guide narration
- `src/features/quiz/`: practice, answer evaluation, explanations
- `src/features/mock-exam/`: timed exam engine and result rules
- `src/features/progress/`: statistics, review queue, export/import
- `src/features/settings/`: preferences, privacy, data actions
- `src/components/guide/`: avatar SVG, expressions, speech bubble
- `src/data/`: versioned questions, lessons, themes, source metadata
- `src/lib/content-validation/`: schema/runtime checks
- `src/lib/storage/`: IndexedDB repository, migration, export/import
- `src/lib/pwa/`: install/update/offline status
- `public/`: manifest and install icons; no remote assets
- `tests/`: unit, accessibility, end-to-end, offline tests

Domain model:
- `Question`: id, pathway, themeId, kind (`knowledge|situation|interview-prompt`), prompt, choices, correctChoiceId (optional for reflective prompts), explanation, distractorNotes, takeaway, difficulty, tags, source, lastVerifiedAt, contentStatus, revision.
- `Source`: title, publisher, URL, retrievedAt, licence/reuse note, content relation.
- `Attempt`: id, mode, startedAt, finishedAt, answers, score, duration, perThemeSummary.
- `Progress`: questionStats, themeStats, bookmarks, reviewQueue, recentAttempts.
- `Content provenance`: official public question (exact), faithful paraphrase, or original training exercise. Never silently label invented exercises as official.

## 8. Content quality and legal safety

- Prefer the official Ministry of the Interior's published knowledge-question list and official civic-training reference.
- Inspect official documents, extract questions and answers carefully, preserve attribution and applicable reuse/rights requirements, and record source/version.
- The official page is a source pointer; it does not mean content has already been imported into the repository.
- Each content item has `draft | reviewed | published` state. Only `reviewed` items enter the production question bank.
- A human review checklist checks answer correctness, ambiguity, plain French, distractor quality, accessibility, source validity, date sensitivity and whether a question is public knowledge or a situational exercise.
- The legacy interview mode is explicitly historical/educational, not a statement that the same old procedure remains available to all current applicants.
- Do not store sensitive personal narratives in the MVP. Reflection notes should be optional and local-only, with a clear delete option.
- Avoid promising that a score predicts a prefecture decision.

## 9. Suggested MVP acceptance criteria

- Works in latest stable desktop and mobile browsers within the agreed support range.
- All core learning flows work offline after first successful load/install.
- Refresh and relaunch keep progress; export/import round-trips correctly.
- A full mock exam has 40 questions, a 45-minute cap and correctly calculates a 32/40 threshold.
- Theme practice and mistake review are functional.
- Every released factual question includes a source, pathway applicability, explanation and review metadata.
- No question marked draft is visible to learner.
- Responsive tests at 320px, 375px, 768px, 1024px and wide desktop; no horizontal overflow.
- Keyboard navigation and screen-reader feedback work on core quiz flows; reduced-motion setting is respected.
- Unit tests cover score, timer, allocation, randomization and storage migrations; end-to-end tests cover pathway selection, quiz, results, reload, offline reopening and export/import.
- No API keys, backend credentials, analytics endpoints, remote fonts or runtime external data requirements.

## 10. Delivery roadmap

### Phase 0 - Validate scope and official content (first)
- Download/inspect current official exam information booklet, official question list, current citizen's booklet and applicable reference.
- Clarify content licensing/reuse before verbatim republication.
- Define what the legacy pathway means; keep it educational and separate from current requirements.
- Create the question/lesson schema and review checklist.
- Deliver: approved source register, content taxonomy, small reviewed sample.

### Phase 1 - UX prototype and design system
- Build responsive welcome, dashboard, theme cards, quiz player and guide character.
- Validate adult-friendly visual style on phone and desktop.
- Deliver: clickable prototype and accessible design tokens.

### Phase 2 - Core offline learning MVP
- Implement themed lessons, quiz engine, explanations, bookmarks, mistake review.
- Add IndexedDB persistence, progress dashboard, export/import.
- Deliver: usable learning PWA with bundled starter content.

### Phase 3 - Realistic mock examination
- Implement 40-question distribution, countdown, pause/finish rules, results breakdown.
- Add a validated bank sufficient to generate practice sets without repetition problems.
- Deliver: complete simulated examination and actionable remediation plan.

### Phase 4 - Legacy interview practice
- Add topic cards, reflection prompts, example answer structures, scenario practice.
- Ensure personal examples are framed as examples only.
- Deliver: separate legacy learning path.

### Phase 5 - Quality, release and ongoing content maintenance
- Cross-browser/mobile/keyboard/offline tests, performance audit, privacy review.
- Add content version, source review date, release notes and a simple correction workflow.
- Deploy static files to GitHub Pages or another static host; verify PWA and deep-link behaviour.
- Deliver: release-ready app, no backend needed for MVP.

## 11. Key risks and mitigations

- Legal content becomes outdated → display last-verified date, version content, review official sources on each release.
- User mistakes old practice for current requirement → prominent mode labels and contextual warnings.
- Offline PWA limitations vary by platform → document install steps and test on real devices.
- Too much content at launch → small reviewed starter bank, then grow by theme.
- Score feedback feels discouraging → use action-focused recommendations and progress trends.
- Avatar slows or distracts → inline SVG/lightweight CSS, reduced-motion support, no video dependency.
- Reuse rights of official question list unclear → resolve before redistributing verbatim content.
- Local data loss → explain browser-storage limits and provide JSON backup.

## 12. Decisions to preserve during implementation

- No backend, login or subscription dependency in MVP.
- No external runtime dependencies.
- Use official 2026 framework as the default path.
- Keep legacy interview training separate from the current exam simulation.
- All educational feedback must be constructive, sourced and actionable.
- Build the product in increments; don't start by generating a large unreviewed question bank.