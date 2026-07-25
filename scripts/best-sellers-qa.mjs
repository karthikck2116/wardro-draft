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
  const section = page.locator(".home-best-sellers");
  const cards = page.locator(".wardro-product-card");

  for (let index = 0; index < (await cards.count()); index += 1) {
    await cards.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  await page.locator(".best-seller-trust-strip").scrollIntoViewIfNeeded();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".home-best-sellers img")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.addStyleTag({
    content: ".announcement,.header{visibility:hidden!important}",
  });

  await section.screenshot({
    path: path.join("artifacts", `best-sellers-${width}.png`),
  });

  results.push(
    await page.evaluate(() => {
      const dimensions = (selector) =>
        [...document.querySelectorAll(selector)].map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        });
      const priceOverflow = [
        ...document.querySelectorAll(".wardro-product-price"),
      ].filter((row) => row.scrollWidth > row.clientWidth + 1).length;
      const missingImages = [
        ...document.querySelectorAll(".home-best-sellers img"),
      ]
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
            .querySelector(".wardro-best-seller-container")
            .getBoundingClientRect().width,
        ),
        cards: dimensions(".wardro-product-card"),
        images: dimensions(".wardro-product-image"),
        trustStrip: dimensions(".best-seller-trust-strip")[0],
        priceOverflow,
        deliveryRows: document.querySelectorAll(
          ".home-best-sellers .delivery",
        ).length,
        wishlistButtons: document.querySelectorAll(
          ".wardro-product-wishlist",
        ).length,
        missingImages,
      };
    }),
  );

  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
