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
const requestedWidth = Number(process.argv[2]) || null;
const results = [];

for (const [width, height] of sizes.filter(
  ([viewportWidth]) => !requestedWidth || viewportWidth === requestedWidth,
)) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000/materials-and-quality", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.locator(".mq-page").waitFor({ state: "visible" });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= pageHeight; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(55);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);

  await page.screenshot({
    path: path.join("artifacts", `materials-quality-${width}.png`),
    fullPage: true,
  });

  results.push(
    await page.evaluate(() => {
      const box = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      };
      const boxes = (selector) =>
        [...document.querySelectorAll(selector)].map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        });
      const pageText = document.querySelector(".mq-page")?.textContent ?? "";
      const headings = [
        ...document.querySelectorAll(".mq-page h1, .mq-page h2, .mq-page h3"),
      ];
      const images = [...document.querySelectorAll(".mq-page img")];

      return {
        viewport: { width: innerWidth, height: innerHeight },
        pageHeight: document.body.scrollHeight,
        horizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        intro: box(".mq-intro"),
        trustCard: box(".mq-trust-card"),
        qualityCards: boxes(".mq-quality-card"),
        qualityImages: boxes(".mq-quality-image"),
        processPanel: box(".mq-process-panel"),
        finishesPanel: box(".mq-finishes-panel"),
        finishCount: document.querySelectorAll(".mq-finish").length,
        processStepCount: document.querySelectorAll(".mq-process-list li").length,
        specificationColumns:
          document.querySelectorAll(".mq-spec-column").length,
        relatedCardCount: document.querySelectorAll(
          ".mq-related .wardro-product-card",
        ).length,
        montserratHeadings: headings.filter((heading) =>
          getComputedStyle(heading).fontFamily
            .toLowerCase()
            .includes("montserrat"),
        ).length,
        headingCount: headings.length,
        activeNav:
          document.querySelector(
            '.header .nav a[href="/materials-and-quality"]',
          )?.getAttribute("aria-current") ?? null,
        missingImages: images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        forbiddenClaims: [
          "80,000",
          "termite",
          "borer resistant",
          "moisture resistant",
          "18mm",
          "10,000+",
        ].filter((claim) => pageText.toLowerCase().includes(claim.toLowerCase())),
      };
    }),
  );

  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
