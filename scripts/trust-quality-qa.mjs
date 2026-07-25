import { chromium } from "@playwright/test";
import path from "node:path";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const sizes = [
  [1600, 1000],
  [1440, 900],
  [1280, 900],
  [1024, 900],
  [768, 900],
  [430, 900],
  [390, 844],
];
const results = [];

for (const [width, height] of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const sections = page.locator(".home-trust-quality");
  await sections.scrollIntoViewIfNeeded();
  await page.waitForTimeout(850);
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".home-trust-quality img")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.addStyleTag({
    content: ".announcement,.header{visibility:hidden!important}",
  });

  await sections.screenshot({
    path: path.join("artifacts", `trust-quality-${width}.png`),
  });

  results.push(
    await page.evaluate(() => {
      const boxes = (selector) =>
        [...document.querySelectorAll(selector)].map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        });
      const sectionText = document.querySelector(".home-trust-quality")?.textContent ?? "";
      const missingImages = [...document.querySelectorAll(".home-trust-quality img")]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);

      return {
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        horizontalOverflow:
          document.documentElement.scrollWidth > document.documentElement.clientWidth,
        whyPanel: boxes(".why-wardro-section")[0],
        table: boxes(".comparison-table")[0],
        tableRows: boxes(".comparison-table tbody tr"),
        wardroChecks: document.querySelectorAll(".comparison-wardro-value > svg").length,
        benefits: boxes(".why-wardro-benefit"),
        qualityPanel: boxes(".wardro-quality-section")[0],
        qualityCards: boxes(".wardro-quality-card"),
        qualityImages: boxes(".wardro-quality-card-image"),
        containsInstallations: sectionText.includes("Installations"),
        containsEligibleAreas: sectionText.includes("Eligible areas"),
        containsFakeCount: sectionText.includes("10,000"),
        missingImages,
      };
    }),
  );

  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
