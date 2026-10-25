import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const html = read("../index.html");
const app = read("../app.js");
const extraSource = read("../questions-extra.js");

assert.match(html, /<html lang="fr">/, "The page must declare French language.");
assert.match(html, /name="viewport"/, "The page must have a responsive viewport.");
assert.match(html, /id="main"/, "The page must have a main landmark.");
assert.match(html, /id="answer-options"/, "The quiz answer container must exist.");
assert.match(html, /id="answer-feedback"/, "The feedback container must exist.");
assert.match(html, /id="view-revisions"/, "The revision notebook view must exist.");
assert.match(html, /data-review-start="bookmarks"/, "The notebook must offer bookmark review.");
assert.match(html, /data-review-start="errors"/, "The notebook must offer error review.");
assert.match(app, /function renderReviewNotebook\(\)/, "The revision notebook must render saved questions.");
assert.match(app, /function startReviewSet\(mode\)/, "The revision notebook must start filtered sessions.");
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

function extractObject(name, nextMarker) {
  const start = app.indexOf(`const ${name} =`);
  assert.notEqual(start, -1, `Missing ${name} object.`);
  const objectStart = app.indexOf("{", start);
  const end = app.indexOf(nextMarker, objectStart);
  assert.ok(objectStart >= 0 && end > objectStart, `Could not locate ${name} object.`);
  return vm.runInNewContext(app.slice(objectStart, app.lastIndexOf(";", end)));
}

const themes = extractArray("THEMES", "const QUESTIONS =");
const questions = extractArray("QUESTIONS", "QUESTIONS.push");
const extraQuestions = vm.runInNewContext(extraSource.slice(extraSource.indexOf("["), extraSource.lastIndexOf(";")));
questions.push(...extraQuestions);
const questionSubthemes = extractObject("QUESTION_SUBTHEMES", "QUESTIONS.forEach");
questions.forEach(question => { question.subthemeId = questionSubthemes[question.id]; });
assert.equal(themes.length, 5, "The prototype should include the five learning themes.");
assert.equal(questions.length, 40, "The practice exam bank must contain 40 questions.");
assert.match(app, /const SOURCE_URLS = \{/, "Each demo question must have a traceable source URL.");
assert.match(html, /1er janvier 2026/, "The UI must explain the correct transition date.");
assert.match(html, /questions-extra\.js/, "The expanded question bank must be loaded before the app.");
assert.match(html, /id="application-date"/, "The procedure selector must request the application filing date.");
assert.match(app, /date<"2026-01-01"/, "The procedure selector must distinguish pre-2026 applications.");
assert.match(read("../sw.js"), /questions-extra\.js/, "The offline cache must include the expanded question bank.");
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
  assert.ok(Array.isArray(question.choices) && question.choices.length >= 2, `Question ${question.id} needs answer choices.`);
  assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < question.choices.length, `Invalid correct answer index on ${question.id}`);
  assert.ok(question.explanation && question.takeaway && question.source, `Question ${question.id} needs explanation, takeaway and provenance.`);
  assert.ok(questionSubthemes[question.id], `Question ${question.id} needs an official-programme subtheme.`);
  if (question.sourceUrl) assert.ok(question.sourceUrl.startsWith("https://"), `Question ${question.id} needs a direct HTTPS source URL.`);
  else assert.ok(app.includes(`${question.id}:"https://`), `Question ${question.id} needs a direct source map entry.`);
}
for (const theme of themes) {
  const count = questions.filter((question) => question.themeId === theme.id).length;
  assert.equal(count, theme.allocation, `Theme ${theme.id} must have exactly ${theme.allocation} questions.`);
}
const situationalByTheme = Object.fromEntries(themes.map(theme => [theme.id, questions.filter(q => q.themeId === theme.id && q.kind === "situation").length]));
assert.equal(situationalByTheme.principes, 6, "The principles theme must contain 6 original situation exercises.");
assert.equal(situationalByTheme.droits, 6, "The rights and duties theme must contain 6 original situation exercises.");
assert.equal(questions.filter(q => q.kind === "situation").length, 12, "There must be 12 situation exercises in total.");
const expectedSubthemes = {
  principes: { symboles: 3, laicite: 2, situations: 6 },
  institutions: { democratie: 3, organisation: 2, "union-europeenne": 1 },
  droits: { "droits-fondamentaux": 2, devoirs: 3, situations: 6 },
  histoire: { "periodes-personnages": 3, geographie: 3, patrimoine: 2 },
  societe: { "installation-residence": 1, sante: 1, travail: 1, "autorite-parentale-education": 1 }
};
for (const [themeId, subthemes] of Object.entries(expectedSubthemes)) {
  for (const [subthemeId, expectedCount] of Object.entries(subthemes)) {
    const actual = questions.filter(q => q.themeId === themeId && questionSubthemes[q.id] === subthemeId).length;
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

console.log(`Validation OK: ${themes.length} themes, ${questions.length} demonstration questions, PWA assets and page structure.`);
