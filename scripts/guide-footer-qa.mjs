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
  for (const selector of [
    ".wardro-guide-hero",
    ".wardro-guide-card-grid",
    ".wardro-reassurance",
    ".wardro-site-footer",
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
  }
  await page.waitForTimeout(700);
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".home-wardro-guide img, .wardro-site-footer img")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.addStyleTag({
    content: "nextjs-portal{display:none!important}.announcement,.header{visibility:hidden!important}",
  });

  await page.locator(".home-wardro-guide").screenshot({
    path: path.join("artifacts", `guide-${width}.png`),
  });
  await page.locator(".wardro-site-footer").screenshot({
    path: path.join("artifacts", `footer-${width}.png`),
  });

  results.push(
    await page.evaluate(() => {
      const boxes = (selector) =>
        [...document.querySelectorAll(selector)].map((element) => {
          const rect = element.getBoundingClientRect();
          return { width: Math.round(rect.width), height: Math.round(rect.height) };
        });
      const scopedText = `${document.querySelector(".home-wardro-guide")?.textContent ?? ""} ${document.querySelector(".wardro-site-footer")?.textContent ?? ""}`;
      const missingImages = [
        ...document.querySelectorAll(".home-wardro-guide img, .wardro-site-footer img"),
      ]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);
      const curve = getComputedStyle(
        document.querySelector(".wardro-guide-hero-image"),
        "::after",
      );

      return {
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        horizontalOverflow:
          document.documentElement.scrollWidth > document.documentElement.clientWidth,
        guideContainer: boxes(".wardro-guide-container")[0],
        hero: boxes(".wardro-guide-hero")[0],
        heroCopy: boxes(".wardro-guide-hero-copy")[0],
        heroImage: boxes(".wardro-guide-hero-image")[0],
        curveDisplay: curve.display,
        curveSize: `${curve.width} x ${curve.height}`,
        benefits: boxes(".wardro-guide-benefit"),
        articleCards: boxes(".wardro-guide-card"),
        articleImages: boxes(".wardro-guide-card-image"),
        numberBadges: boxes(".wardro-guide-number"),
        reassurance: boxes(".wardro-reassurance")[0],
        reassuranceItems: boxes(".wardro-reassurance-item"),
        footer: boxes(".wardro-site-footer")[0],
        footerGrid: boxes(".wardro-footer-grid")[0],
        footerColumns: document.querySelectorAll(".wardro-footer-grid > *").length,
        newsletter: boxes(".wardro-newsletter-form")[0],
        secureCheckout: scopedText.includes("Secure Checkout"),
        secureShopifyCheckout: scopedText.includes("Secure Shopify Checkout"),
        missingImages,
      };
    }),
  );
  console.log(JSON.stringify(results.at(-1)));

  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
