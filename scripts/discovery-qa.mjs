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
  const discovery = page.locator(".home-discovery");
  await discovery.scrollIntoViewIfNeeded();
  const categoryCards = page.locator(".wardro-category-card");
  for (let index = 0; index < (await categoryCards.count()); index += 1) {
    await categoryCards.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  const needCards = page.locator(".wardro-need-card");
  for (let index = 0; index < (await needCards.count()); index += 1) {
    await needCards.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => {
    document.querySelector(".wardro-category-grid").scrollLeft = 0;
  });
  await discovery.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".home-discovery img")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );

  await page.addStyleTag({
    content: ".announcement,.header{visibility:hidden!important}",
  });

  await discovery.screenshot({
    path: path.join("artifacts", `discovery-${width}.png`),
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
      const missing = [...document.querySelectorAll(".home-discovery img")]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);

      return {
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        horizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        containerWidth: Math.round(
          document
            .querySelector(".wardro-discovery-container")
            .getBoundingClientRect().width,
        ),
        categoryCards: boxes(".wardro-category-card"),
        needCards: boxes(".wardro-need-card"),
        missingImages: missing,
      };
    }),
  );

  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
