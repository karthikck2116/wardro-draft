import { chromium } from "@playwright/test";
import path from "node:path";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const sizes = [[1600,1000],[1440,900],[1280,900],[1024,800],[768,900],[430,900],[390,844]];
const results = [];

for (const [width, height] of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += Math.max(500, height - 100)) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: path.join("artifacts", `hero-${width}.png`),
    fullPage: false,
  });
  results.push(await page.evaluate(() => {
    const missing = [...document.images].filter((image) => image.getClientRects().length > 0 && (!image.complete || image.naturalWidth === 0));
    const overflow = [...document.querySelectorAll("body *")]
      .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
      .slice(0, 5)
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
    return {
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      overflow,
      missingImages: missing.map((image) => image.currentSrc || image.src),
      announcementHeight: Math.round(document.querySelector(".announcement")?.getBoundingClientRect().height ?? 0),
      headerHeight: Math.round(document.querySelector(".header")?.getBoundingClientRect().height ?? 0),
      heroHeight: Math.round(document.querySelector(".hero-shell")?.getBoundingClientRect().height ?? 0),
      textPanelHeight: Math.round(document.querySelector(".hero-panel")?.getBoundingClientRect().height ?? 0),
      imagePanelHeight: Math.round(document.querySelector(".hero-media")?.getBoundingClientRect().height ?? 0),
      trustHeight: Math.round(document.querySelector(".hero-trust-strip")?.getBoundingClientRect().height ?? 0),
    };
  }));
  if (width === 1440 || width === 390) {
    await page.screenshot({ path: path.join("artifacts", `homepage-${width}.png`), fullPage: true });
  }
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
