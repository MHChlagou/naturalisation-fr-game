import { test, expect } from "@playwright/test";
import fs from "node:fs";

const baseURL = process.env.SITE_URL || "http://127.0.0.1:4173/";
test.setTimeout(45_000);
let pageErrors = [];

test.describe("Cap Citoyen - parcours publics", () => {
  test.beforeEach(async ({ page }) => {
    pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    if (await page.locator("#profile-modal").isVisible()) {
      await page.locator("#profile-name").fill("Camille");
      await page.locator("#profile-save").click();
    }
    await expect(page.locator("#view-home")).toBeVisible();
  });

  test.afterEach(async () => {
    expect(pageErrors, "Unexpected JavaScript errors in the browser").toEqual([]);
  });

  test("première visite : demande le prénom, personnalise l’accueil et conserve le profil", async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem("cap-citoyen-profile-v1"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#profile-modal")).toBeVisible();
    await expect(page.getByRole("dialog")).toContainText("Faisons connaissance");
    await page.locator("#profile-name").fill("Samira Ben Ali");
    await page.locator("#profile-save").click();
    await expect(page.locator("#profile-modal")).toBeHidden();
    await expect(page.locator("#home-greeting")).toContainText("Bonjour, Samira Ben Ali.");
    await expect(page.locator("#speech-welcome")).toContainText("Salut Samira Ben Ali");
    await expect(page.locator("#profile-name-label")).toHaveText("Samira Ben Ali");
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#profile-modal")).toBeHidden();
    await expect(page.locator("#home-greeting")).toContainText("Bonjour, Samira Ben Ali.");
    await page.locator("#sidebar-profile").click();
    await expect(page.locator("#profile-modal")).toBeVisible();
    await expect(page.locator("#profile-name")).toHaveValue("Samira Ben Ali");
    await page.locator("#profile-name").fill("Samira");
    await page.locator("#profile-save").click();
    await expect(page.locator("#home-greeting")).toContainText("Bonjour, Samira.");
  });

  test("accueil, ressources statiques et navigation principale", async ({ page }) => {
    await expect(page).toHaveTitle(/Cap Citoyen/);
    await expect(page.locator("#home-greeting")).toBeVisible();
    await expect(page.locator("#home-greeting")).toContainText(/Bonjour, Camille|Comprendre la France/);
    await expect(page.locator("#home-themes .theme-card")).toHaveCount(3);
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "./manifest.webmanifest");
    await expect(page.locator("#offline-status")).toBeVisible();

    for (const [view, heading] of [
      ["themes", /Les thèmes à connaître/],
      ["lessons", /Les mini-leçons/],
      ["practice", /Entraînement ciblé/],
      ["revisions", /Mon carnet de révision/],
      ["exam", /Le défi civique/],
      ["progress", /Ta progression/],
    ]) {
      await page.locator(`aside.sidebar [data-view="${view}"]`).click();
      await expect(page.locator(`#view-${view}`)).toBeVisible();
      await expect(page.locator(`#view-${view}`).getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("sélecteur de procédure oriente selon la date", async ({ page }) => {
    await page.locator("#application-date").fill("2025-12-31");
    await page.locator("#choose-procedure").click();
    await expect(page.locator("#view-legacy")).toBeVisible();
    await expect(page.locator("#interview-start")).toBeVisible();

    await page.locator('aside.sidebar [data-view="home"]').click();
    await page.locator("#application-date").fill("2026-01-01");
    await page.locator("#choose-procedure").click();
    await expect(page.locator("#view-exam")).toBeVisible();
    await expect(page.locator("#start-exam")).toBeVisible();
  });

  test("quiz, correction, favoris, incertitude et progression locale", async ({ page }) => {
    await page.locator('aside.sidebar [data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await expect(page.locator("#view-quiz")).toBeVisible();
    await expect(page.locator("#question-title")).not.toBeEmpty();
    expect(await page.locator("#answer-options button").count()).toBeGreaterThanOrEqual(2);

    await page.locator("#bookmark-question").click();
    await expect(page.locator("#bookmark-question")).toContainText(/Dans mes révisions/);
    await page.locator("#uncertain-question").click();
    await expect(page.locator("#uncertain-question")).toHaveAttribute("aria-pressed", "true");

    await page.locator("#answer-options button").first().click();
    await expect(page.locator("#submit-answer")).toBeEnabled();
    await page.locator("#submit-answer").click();
    await expect(page.locator("#answer-feedback")).toBeVisible();
    await expect(page.locator("#next-question")).toBeVisible();

    await page.locator("#next-question").click();
    await expect(page.locator("#quiz-counter")).toContainText("Question 2");
    await page.locator('aside.sidebar [data-view="revisions"]').click();
    await expect(page.locator("#revision-bookmark-count")).toHaveText("1");
    await expect(page.locator("#revision-uncertain-count")).toHaveText("1");
    await page.locator('aside.sidebar [data-view="progress"]').click();
    await expect(page.locator("#progress-answered")).toHaveText("1");
  });

  test("mini-leçons et entraînement adaptatif", async ({ page }) => {
    await page.locator('aside.sidebar [data-view="lessons"]').click();
    await expect(page.locator("#lesson-grid .lesson-card")).toHaveCount(5);

    await page.locator('aside.sidebar [data-view="practice"]').click();
    await page.locator("#start-adaptive").click();
    await expect(page.locator("#view-quiz")).toBeVisible();
    await expect(page.locator("#quiz-mode")).toContainText(/ENTRAÎNEMENT/);
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await expect(page.locator("#answer-feedback")).toBeVisible();
  });

  test("examen blanc complet de 40 questions et résultats", async ({ page }) => {
    page.on("dialog", dialog => dialog.accept());
    await page.locator('aside.sidebar [data-view="exam"]').click();
    await page.locator("#start-exam").click();
    await expect(page.locator("#view-quiz")).toBeVisible();
    await expect(page.locator("#quiz-mode")).toContainText("SIMULATION D'EXAMEN");
    await expect(page.locator("#quiz-counter")).toContainText("Question 1 sur 40");
    await expect(page.locator("#exam-timer")).toBeVisible();

    for (let question = 0; question < 40; question += 1) {
      await expect(page.locator("#answer-options button").first()).toBeVisible();
      await page.locator("#answer-options button").first().click();
      await page.locator("#submit-answer").click();
      if (question < 39) {
        await page.locator("#next-question").click();
      } else {
        await page.locator("#next-question").click();
      }
    }

    await expect(page.locator("#view-results")).toBeVisible();
    await expect(page.locator("#result-score")).toContainText("/40");
    await expect(page.locator("#result-breakdown")).toBeVisible();
  });

  test("simulation d'entretien, minuteur, auto-évaluation et bilan détaillé", async ({ page }) => {
    await page.locator('#view-home [data-go="legacy"]').click();
    await expect(page.locator("#view-legacy")).toBeVisible();
    await page.locator("#interview-start").click();
    await expect(page.locator("#interview-answer")).toBeEnabled();
    await expect(page.locator("#interview-timer")).toHaveText(/^\d{2}:\d{2}$/);
    await expect(page.locator("#interview-progress")).toHaveAttribute("aria-valuenow", "0");

    for (let question = 0; question < 10; question += 1) {
      await page.locator("#interview-answer").fill("Je souhaite expliquer mon point de vue avec un exemple concret de la vie quotidienne en France.");
      await page.locator("#interview-next").click();
      await expect(page.locator("#interview-feedback")).toBeVisible();
      await expect(page.locator("#interview-checklist")).toBeVisible();
      await page.locator("#interview-direct").check();
      await page.locator("#interview-example").check();
      await page.locator("#interview-explain").check();
      await page.locator("#interview-next").click();
    }

    await expect(page.locator("#interview-detailed-results")).toBeVisible();
    await expect(page.locator("#interview-completion")).toContainText("10 question(s) traitée(s)");
    await expect(page.locator("#interview-answer")).toBeDisabled();
    await expect(page.locator("#interview-progress")).toHaveAttribute("aria-valuenow", "10");
  });

  test("export et réinitialisation des données locales", async ({ page }) => {
    await page.locator('aside.sidebar [data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await page.locator('aside.sidebar [data-view="progress"]').click();
    await expect(page.locator("#progress-answered")).toHaveText("1");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#export-data").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.json$/);

    page.on("dialog", dialog => dialog.accept());
    await page.locator("#reset-data").click();
    await expect(page.locator("#progress-answered")).toHaveText("0");
    await expect(page.locator("#progress-sessions")).toHaveText("0");
  });

  test("mise en page mobile sans débordement horizontal majeur", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#view-home")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 2);
  });

  test("progression conservée après rechargement", async ({ page }) => {
    await page.locator('aside.sidebar [data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await expect(page.locator("#progress-answered")).toHaveText("1");
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.locator('aside.sidebar [data-view="progress"]').click();
    await expect(page.locator("#progress-answered")).toHaveText("1");
    await expect(page.locator("#progress-sessions")).toHaveText("0");
  });

  test("import de sauvegarde valide et rejet d'un fichier invalide", async ({ page }) => {
    await page.locator('aside.sidebar [data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await page.locator('aside.sidebar [data-view="progress"]').click();
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#export-data").click();
    const download = await downloadPromise;
    const downloadPath = await download.path();
    expect(download.suggestedFilename()).toMatch(/\.json$/);
    const saved = JSON.parse(fs.readFileSync(downloadPath, "utf8"));

    page.on("dialog", dialog => dialog.accept());
    await page.locator("#reset-data").click();
    await expect(page.locator("#progress-answered")).toHaveText("0");
    await page.locator("#import-data").setInputFiles({
      name: "cap-citoyen-progression.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(saved)),
    });
    await expect(page.locator("#progress-answered")).toHaveText("1");

    const dialogs = [];
    page.removeAllListeners("dialog");
    page.on("dialog", async dialog => { dialogs.push(dialog.message()); await dialog.accept(); });
    await page.locator("#import-data").setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ format: "cap-citoyen-progress", version: 1, state: { answers: "invalid", bookmarks: [], uncertain: [], sessions: [], themeSeen: [], history: [] } })),
    });
    await expect.poll(() => dialogs.some(message => message.includes("ne semble pas être une sauvegarde"))).toBe(true);
    await expect(page.locator("#progress-answered")).toHaveText("1");
  });

  test("récupération après un stockage local corrompu", async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("cap-citoyen-progress-v1", "{not-json"));
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#progress-answered")).toHaveText("0");
    await expect(page.locator("#progress-sessions")).toHaveText("0");
  });

  test("service worker et parcours de base hors ligne", async ({ page, context }) => {
    await page.evaluate(async () => {
      if (!("serviceWorker" in navigator)) throw new Error("Service workers unsupported");
      await navigator.serviceWorker.ready;
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
    await context.setOffline(true);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator("#view-home")).toBeVisible();
    await expect(page.locator("#home-themes .theme-card")).toHaveCount(3);
    await page.locator('aside.sidebar [data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await expect(page.locator("#question-title")).not.toBeEmpty();
    await context.setOffline(false);
  });

  test("expiration du chronomètre de l'examen et réponses manquantes", async ({ page }) => {
    page.on("dialog", dialog => dialog.accept());
    await page.clock.install();
    await page.locator('aside.sidebar [data-view="exam"]').click();
    await page.locator("#start-exam").click();
    await expect(page.locator("#exam-timer")).toBeVisible();
    await page.clock.fastForward(46 * 60 * 1000);
    await expect(page.locator("#view-results")).toBeVisible();
    await expect(page.locator("#result-score")).toHaveText("0/40");
    await expect(page.locator("#result-description")).toContainText(/temps est écoulé/i);
  });

  test("date de dossier obligatoire avant l'orientation", async ({ page }) => {
    await page.locator("#choose-procedure").click();
    await expect(page.locator("#procedure-help")).toContainText(/Choisis d’abord la date/);
    await expect(page.locator("#view-home")).toBeVisible();
  });

});
