import { test, expect } from "@playwright/test";

const baseURL = process.env.SITE_URL || "http://127.0.0.1:4173/";
test.setTimeout(90_000);
let pageErrors = [];

test.describe("Cap Citoyen - parcours publics", () => {
  test.beforeEach(async ({ page }) => {
    pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#view-home")).toBeVisible();
  });

  test.afterEach(async () => {
    expect(pageErrors, "Unexpected JavaScript errors in the browser").toEqual([]);
  });

  test("accueil, ressources statiques et navigation principale", async ({ page }) => {
    await expect(page).toHaveTitle(/Cap Citoyen/);
    await expect(page.getByRole("heading", { name: /Comprendre la France/ })).toBeVisible();
    await expect(page.locator("#home-themes .theme-card, #home-themes [data-theme]")).toHaveCount(5);
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
      await page.locator(`[data-view="${view}"]`).click();
      await expect(page.locator(`#view-${view}`)).toBeVisible();
      await expect(page.locator(`#view-${view}`).getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  test("sélecteur de procédure oriente selon la date", async ({ page }) => {
    await page.locator("#application-date").fill("2025-12-31");
    await page.locator("#choose-procedure").click();
    await expect(page.locator("#view-legacy")).toBeVisible();
    await expect(page.locator("#interview-start")).toBeVisible();

    await page.locator('[data-view="home"]').click();
    await page.locator("#application-date").fill("2026-01-01");
    await page.locator("#choose-procedure").click();
    await expect(page.locator("#view-exam")).toBeVisible();
    await expect(page.locator("#start-exam")).toBeVisible();
  });

  test("quiz, correction, favoris, incertitude et progression locale", async ({ page }) => {
    await page.locator('[data-view="themes"]').click();
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
    await page.locator('[data-view="revisions"]').click();
    await expect(page.locator("#revision-bookmark-count")).toHaveText("1");
    await expect(page.locator("#revision-uncertain-count")).toHaveText("1");
    await page.locator('[data-view="progress"]').click();
    await expect(page.locator("#progress-answered")).toHaveText("1");
  });

  test("mini-leçons et entraînement adaptatif", async ({ page }) => {
    await page.locator('[data-view="lessons"]').click();
    await expect(page.locator("#lesson-grid .lesson-card")).toHaveCount(5);

    await page.locator('[data-view="practice"]').click();
    await page.locator("#start-adaptive").click();
    await expect(page.locator("#view-quiz")).toBeVisible();
    await expect(page.locator("#quiz-mode")).toContainText(/ENTRAÎNEMENT/);
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await expect(page.locator("#answer-feedback")).toBeVisible();
  });

  test("examen blanc complet de 40 questions et résultats", async ({ page }) => {
    page.on("dialog", dialog => dialog.accept());
    await page.locator('[data-view="exam"]').click();
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
    await page.locator('[data-go="legacy"]').click();
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
    await page.locator('[data-view="themes"]').click();
    await page.locator("#all-themes [data-theme]").first().click();
    await page.locator("#answer-options button").first().click();
    await page.locator("#submit-answer").click();
    await page.locator('[data-view="progress"]').click();
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
});

