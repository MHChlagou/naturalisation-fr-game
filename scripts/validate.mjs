import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const html = read("../index.html");
const app = read("../app.js");

assert.match(html, /<html lang="fr">/, "The page must declare French language.");
assert.match(html, /name="viewport"/, "The page must have a responsive viewport.");
assert.match(html, /id="main"/, "The page must have a main landmark.");
assert.match(html, /id="answer-options"/, "The quiz answer container must exist.");
assert.match(html, /id="answer-feedback"/, "The feedback container must exist.");
assert.match(html, /manifest\.webmanifest/, "The PWA manifest must be linked.");
assert.match(html, /\.\/sw\.js/, "The service worker must be registered by the app.");
assert.ok(fs.existsSync(new URL("../assets/guide.svg", import.meta.url)), "Guide SVG must exist.");
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

const themes = extractArray("THEMES", "const QUESTIONS =");
const questions = extractArray("QUESTIONS", "const LEGACY_TOPICS =");
assert.equal(themes.length, 5, "The prototype should include the five learning themes.");
assert.ok(questions.length >= 10, "The demonstration bank should have at least 10 questions.");

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
}
for (const theme of themes) assert.ok(questions.some((question) => question.themeId === theme.id), `Theme ${theme.id} has no question.`);

const manifest = JSON.parse(read("../manifest.webmanifest"));
assert.equal(manifest.lang, "fr-FR");
assert.equal(manifest.start_url, "./");
assert.equal(manifest.display, "standalone");

console.log(`Validation OK: ${themes.length} themes, ${questions.length} demonstration questions, PWA assets and page structure.`);
