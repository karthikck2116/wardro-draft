import { chromium } from "@playwright/test";
import path from "node:path";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const allSizes = [
  [1600, 1000],
  [1440, 900],
  [1280, 900],
  [1024, 900],
  [768, 900],
  [430, 900],
  [390, 844],
];
const requestedWidth = Number(process.argv[2]);
const sizes = requestedWidth
  ? allSizes.filter(([width]) => width === requestedWidth)
  : allSizes;

for (const [width, height] of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000/collections/all-wardrobes", {
    waitUntil: "networkidle",
  });
  const collection = page.locator(".wardro-collection-page");
  await collection.scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".wardro-collection-page img")].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.addStyleTag({
    content: "nextjs-portal{display:none!important}.announcement,.header{visibility:hidden!important}",
  });
  if (width > 900) {
    await collection.screenshot({
      path: path.join("artifacts", `collection-${width}.png`),
    });
  } else {
    await page.screenshot({
      path: path.join("artifacts", `collection-${width}.png`),
    });
    await page.locator(".wardro-product-card").first().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join("artifacts", `collection-products-${width}.png`),
    });
    await page.locator(".wardro-collection-trust").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join("artifacts", `collection-trust-${width}.png`),
    });
  }

  if (width <= 900) {
    await page.locator(".wardro-mobile-filter-trigger").scrollIntoViewIfNeeded();
    await page.locator(".wardro-mobile-filter-trigger").click();
    await page.waitForTimeout(180);
    await page.screenshot({
      path: path.join("artifacts", `collection-filters-${width}.png`),
    });
    await page.keyboard.press("Escape");
  }

  const metrics = await page.evaluate(() => {
    const boxes = (selector) =>
      [...document.querySelectorAll(selector)].map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: Math.round(rect.width), height: Math.round(rect.height) };
      });
    const visible = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    };
    const missingImages = [...document.querySelectorAll(".wardro-collection-page img")]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src);

    return {
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      container: boxes(".wardro-collection-container")[0],
      hero: boxes(".wardro-collection-hero")[0],
      quickFilters: boxes(".wardro-quick-filters")[0],
      chips: boxes(".wardro-quick-filters a"),
      sidebar: boxes(".wardro-filters")[0],
      sidebarPosition: getComputedStyle(document.querySelector(".wardro-filters")).position,
      mobileFilterVisible: visible(".wardro-mobile-filter-trigger"),
      resultHeader: boxes(".wardro-result-header")[0],
      cards: boxes(".wardro-product-card"),
      images: boxes(".wardro-product-card .wardro-product-image"),
      deliveryRows: document.querySelectorAll(".wardro-product-card .delivery").length,
      trust: boxes(".wardro-collection-trust .trust-strip")[0],
      missingImages,
    };
  });
  console.log(JSON.stringify(metrics));
  await page.close();
}

await browser.close();
