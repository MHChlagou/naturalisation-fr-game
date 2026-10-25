import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const html = read("../index.html");
const app = read("../app.js");
const extraSource = read("../questions-extra.js");
const bankSource = read("../questions-bank.js");

assert.match(html, /<html lang="fr">/, "The page must declare French language.");
assert.match(html, /name="viewport"/, "The page must have a responsive viewport.");
assert.match(html, /id="main"/, "The page must have a main landmark.");
assert.match(html, /id="answer-options"/, "The quiz answer container must exist.");
assert.match(html, /id="answer-feedback"/, "The feedback container must exist.");
assert.match(html, /id="view-revisions"/, "The revision notebook view must exist.");
assert.match(html, /id="view-lessons"/, "The mini-lessons view must exist.");
assert.match(html, /id="view-practice"/, "The adaptive practice view must exist.");
assert.match(html, /id="interview-answer"/, "The interview simulation answer field must exist.");
assert.match(html, /id="interview-start"/, "The interview simulation start button must exist.");
assert.match(app, /function startInterview\(\)/, "The interview simulation must be implemented.");
assert.match(app, /function evaluateInterviewAnswer\(\)/, "The interview practice feedback must exist.");
assert.equal((app.match(/followUp:/g) || []).length, 10, "Each interview topic must include a practice follow-up question.");
assert.match(app, /interview-coaching-tip/, "Interview feedback must include question-specific coaching.");
assert.match(app, /interview-follow-up/, "Interview feedback must include a follow-up prompt.");
assert.match(html, /id="interview-timer"/, "The interview simulation must show a countdown timer.");
assert.match(html, /id="interview-progress-fill"/, "The interview simulation must show progress.");
assert.match(html, /id="interview-detailed-results"/, "The interview simulation must show detailed results.");
assert.match(app, /const INTERVIEW_DURATION_MS=15\*60\*1000/, "The interview simulation must use a 15-minute practice timer.");
assert.match(app, /function recordInterviewAnswer\(\)/, "Interview answers must be recorded in session memory for the summary.");
assert.match(app, /function updateInterviewTimer\(\)/, "The interview countdown must update during practice.");
assert.match(app, /function formatInterviewDuration\(seconds\)/, "Interview duration must be formatted consistently.");
assert.match(app, /el\("interview-next"\)\.addEventListener\("click",nextInterviewQuestion\)/, "The interview next action must be wired.");
assert.match(html, /id="start-adaptive"/, "The adaptive practice button must exist.");
assert.match(app, /function startAdaptiveQuiz\(\)/, "Adaptive practice must prioritize user needs.");
assert.match(app, /function renderAdaptiveOverview\(\)/, "Adaptive practice must show theme priorities.");
assert.match(html, /data-view="practice"/, "Navigation must link to adaptive practice.");
assert.match(html, /data-view="lessons"/, "The sidebar must navigate to mini-lessons.");
assert.match(html, /id="revision-uncertain-count"/, "The notebook must count uncertain questions.");
assert.match(html, /data-review-start="uncertain"/, "The notebook must support uncertain-question review.");
assert.match(html, /data-review-start="bookmarks"/, "The notebook must offer bookmark review.");
assert.match(html, /data-review-start="errors"/, "The notebook must offer error review.");
assert.match(app, /function renderReviewNotebook\(\)/, "The revision notebook must render saved questions.");
assert.match(app, /function startReviewSet\(mode\)/, "The revision notebook must start filtered sessions.");
assert.match(app, /function renderLessons\(\)/, "The mini-lessons view must render its content.");
assert.match(app, /uncertain:\[\]/, "Progress storage must include uncertain-question state.");
assert.match(html, /manifest\.webmanifest/, "The PWA manifest must be linked.");
assert.match(app, /navigator\.serviceWorker\.register\("\.\/sw\.js"\)/, "The service worker must be registered by the app.");
assert.ok(fs.existsSync(new URL("../assets/guide.svg", import.meta.url)), "Guide SVG must exist.");
assert.ok(fs.existsSync(new URL("../assets/guide-thinking.svg", import.meta.url)), "Thinking guide SVG must exist.");
assert.ok(fs.existsSync(new URL("../manifest.webmanifest", import.meta.url)), "PWA manifest must exist.");
assert.ok(fs.existsSync(new URL("../sw.js", import.meta.url)), "Service worker must exist.");

function extractArray(name, nextMarker) {
  const start = app.indexOf(`const ${name} =`);
  assert.notEqual(start, -1, `Missing ${name} array.`);
  const arrayStart = app.indexOf("[", start);
  const end = app.indexOf(nextMarker, arrayStart);
  assert.ok(arrayStart >= 0 && end > arrayStart, `Could not locate ${name} array.`);
  const expression = app.slice(arrayStart, app.lastIndexOf(";", end)).trim();
  return vm.runInNewContext(expression);
}

function extractObject(name) {
  const start = app.indexOf(`const ${name} =`);
  assert.notEqual(start, -1, `Missing ${name} object.`);
  const objectStart = app.indexOf("{", start);
  const objectEnd = app.indexOf("};", objectStart);
  assert.ok(objectStart >= 0 && objectEnd > objectStart, `Could not locate ${name} object.`);
  return vm.runInNewContext("(" + app.slice(objectStart, objectEnd + 1) + ")");
}

const themes = extractArray("THEMES", "const QUESTIONS =");
const questions = extractArray("QUESTIONS", "QUESTIONS.push");
const examQuestions = [...questions];
const lessons = extractArray("LESSONS", "const STORAGE_KEY");
assert.equal(lessons.length, 5, "There must be one mini-lesson per theme.");
for (const lesson of lessons) assert.ok(lesson.title && lesson.summary && lesson.points.length >= 3 && lesson.sourceUrl.startsWith("https://"), `Lesson ${lesson.id} needs content and a source.`);
const extraQuestions = vm.runInNewContext(extraSource.slice(extraSource.indexOf("["), extraSource.lastIndexOf(";")));
const bankQuestions = vm.runInNewContext(bankSource.slice(bankSource.indexOf("["), bankSource.lastIndexOf(";")));
questions.push(...extraQuestions, ...bankQuestions);
const questionSubthemes = extractObject("QUESTION_SUBTHEMES");
const questionDifficulties = extractObject("QUESTION_DIFFICULTIES");
questions.forEach(question => { question.subthemeId = questionSubthemes[question.id] || question.subthemeId; question.difficulty = questionDifficulties[question.id] || question.difficulty; });
assert.equal(themes.length, 5, "The prototype should include the five learning themes.");
assert.equal(examQuestions.length + extraQuestions.length, 40, "The original exam blueprint must contain 40 questions.");
assert.equal(questions.length, 120, "The expanded national practice bank must contain 120 questions.");
assert.equal(Object.values(questionDifficulties).filter(level => level === "facile").length, 13, "There must be 13 easy questions.");
assert.equal(Object.values(questionDifficulties).filter(level => level === "intermediaire").length, 14, "There must be 14 intermediate questions.");
assert.equal(Object.values(questionDifficulties).filter(level => level === "avance").length, 13, "There must be 13 advanced questions.");
assert.ok(questions.every(q => q.status && q.status !== "draft" && q.status !== "needs-review"), "Draft or unreviewed questions must not be published as ready content.");
assert.match(app, /Exercices pédagogiques originaux, non officiels/, "The app must disclose that answers are educational and unofficial.");
assert.match(app, /const SOURCE_URLS = \{/, "Each demo question must have a traceable source URL.");
assert.match(html, /1er janvier 2026/, "The UI must explain the correct transition date.");
assert.match(html, /questions-extra\.js/, "The original extra questions must load before the app.");
assert.match(html, /questions-bank\.js/, "The expanded question bank must load before the app.");
assert.match(html, /class="official-resources"/, "Both learning paths must link to official resources.");
assert.match(html, /questions-de-connaissance-pour-lexamen-civique-nationalite-francaise\.html/, "The official knowledge-question list must be linked.");
assert.match(html, /id="application-date"/, "The procedure selector must request the application filing date.");
assert.match(app, /date<"2026-01-01"/, "The procedure selector must distinguish pre-2026 applications.");
assert.match(read("../sw.js"), /questions-extra\.js/, "The offline cache must include the original extra questions.");
assert.match(read("../sw.js"), /questions-bank\.js/, "The offline cache must include the expanded national bank.");
assert.match(app, /function startExamTimer\(\)/, "The timed exam must have a countdown.");
assert.match(app, /guide-thinking\.svg/, "The guide should use a thinking expression before the answer.");
assert.match(read("../sw.js"), /guide-thinking\.svg/, "The thinking guide must be cached offline.");
assert.match(html, /juillet 2026 n.est pas la date de bascule/, "The UI must distinguish the new booklet from the exam transition date.");

const themeIds = new Set(themes.map((theme) => theme.id));
const questionIds = new Set();
for (const question of questions) {
  assert.ok(question.id, "Every question must have an ID.");
  assert.ok(!questionIds.has(question.id), `Duplicate question ID: ${question.id}`);
  questionIds.add(question.id);
  assert.ok(themeIds.has(question.themeId), `Unknown theme on question ${question.id}`);
  assert.ok(typeof question.prompt === "string" && question.prompt.trim().length >= 15, `Question ${question.id} needs a meaningful prompt string.`);
  assert.ok(Array.isArray(question.choices) && question.choices.length >= 2, `Question ${question.id} needs answer choices.`);
  assert.ok(question.choices.every(choice => typeof choice === "string" && choice.trim().length > 0), `Question ${question.id} must have non-empty string choices.`);
  const normalizedChoices = question.choices.map(choice => choice.trim().toLocaleLowerCase("fr").replace(/\s+/g, " "));
  assert.equal(new Set(normalizedChoices).size, normalizedChoices.length, `Question ${question.id} contains duplicate choices.`);
  assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < question.choices.length, `Invalid correct answer index on ${question.id}`);
  assert.ok(typeof question.explanation === "string" && question.explanation.trim().length > 0 && typeof question.takeaway === "string" && question.takeaway.trim().length > 0 && typeof question.source === "string" && question.source.trim().length > 0, `Question ${question.id} needs explanation, takeaway and provenance.`);
  assert.ok(question.subthemeId, `Question ${question.id} needs an official-programme subtheme.`);
  if (question.sourceUrl) assert.ok(question.sourceUrl.startsWith("https://"), `Question ${question.id} needs a direct HTTPS source URL.`);
  else assert.ok(app.includes(`${question.id}:"https://`), `Question ${question.id} needs a direct source map entry.`);
}
const normalizedPrompts = questions.map(question => question.prompt.trim().toLocaleLowerCase("fr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim());
assert.equal(new Set(normalizedPrompts).size, normalizedPrompts.length, "Question prompts must be unique after normalization.");
const declarationQuestion = questions.find(question => question.id === "b073");
assert.ok(declarationQuestion, "Question b073 about the 1789 Declaration must remain in the bank.");
assert.match(declarationQuestion.prompt, /événement historique/i, "Question b073 must ask about the historical event, not a city.");
assert.equal(declarationQuestion.choices[declarationQuestion.correct], "La Révolution française", "Question b073 must identify the French Revolution as the answer.");
for (const theme of themes) {
  const count = [...examQuestions, ...extraQuestions].filter((question) => question.themeId === theme.id).length;
  assert.equal(count, theme.allocation, `Theme ${theme.id} must have exactly ${theme.allocation} questions.`);
}
const blueprintQuestions = [...examQuestions, ...extraQuestions];
const situationalByTheme = Object.fromEntries(themes.map(theme => [theme.id, blueprintQuestions.filter(q => q.themeId === theme.id && q.kind === "situation").length]));
assert.equal(situationalByTheme.principes, 6, "The principles theme must contain 6 original situation exercises.");
assert.equal(situationalByTheme.droits, 6, "The rights and duties theme must contain 6 original situation exercises.");
assert.equal(blueprintQuestions.filter(q => q.kind === "situation").length, 12, "There must be 12 situation exercises in total.");
const expectedSubthemes = {
  principes: { symboles: 3, laicite: 2, situations: 6 },
  institutions: { democratie: 3, organisation: 2, "union-europeenne": 1 },
  droits: { "droits-fondamentaux": 2, devoirs: 3, situations: 6 },
  histoire: { "periodes-personnages": 3, geographie: 3, patrimoine: 2 },
  societe: { "installation-residence": 1, sante: 1, travail: 1, "autorite-parentale-education": 1 }
};
for (const [themeId, subthemes] of Object.entries(expectedSubthemes)) {
  for (const [subthemeId, expectedCount] of Object.entries(subthemes)) {
    const actual = blueprintQuestions.filter(q => q.themeId === themeId && (questionSubthemes[q.id] || q.subthemeId) === subthemeId).length;
    assert.equal(actual, expectedCount, `Subtheme ${themeId}/${subthemeId} must have ${expectedCount} questions.`);
  }
}
for (const question of questions) {
  if (question.sourceUrl) assert.ok(question.sourceUrl.startsWith("https://"), `Question ${question.id} must include an HTTPS source URL.`);
  else assert.ok(app.includes(`${question.id}:"https://`), `Question ${question.id} must include a source map entry.`);
}

const manifest = JSON.parse(read("../manifest.webmanifest"));
assert.equal(manifest.lang, "fr-FR");
assert.equal(manifest.start_url, "./");
assert.equal(manifest.display, "standalone");

console.log(`Validation OK: ${themes.length} themes, ${questions.length} bank questions (${blueprintQuestions.length} in the exam blueprint), PWA assets and page structure.`);
