import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge", headless: true });
await mkdir("artifacts/pricing", { recursive: true });

for (const width of [390, 430, 768, 1280, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 844 : 900 },
    isMobile: width < 768,
    hasTouch: width <= 768,
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  const metrics = await page.evaluate(() => {
    const grid = document.querySelector(".best-seller-product-grid");
    const cards = [...(grid?.querySelectorAll(".wardro-product-card") ?? [])];
    const visibleCards = cards.filter(
      (card) => getComputedStyle(card).display !== "none",
    );
    const heights = visibleCards.map((card) =>
      Math.round(card.getBoundingClientRect().height),
    );
    const wishlistChecks = visibleCards.map((card) => {
      const image = card.querySelector(".wardro-product-image")?.getBoundingClientRect();
      const wish = card.querySelector(".wardro-product-wishlist")?.getBoundingClientRect();
      const badges = card.querySelector(".wardro-product-badges")?.getBoundingClientRect();
      return {
        inside:
          Boolean(image && wish) &&
          wish.left >= image.left &&
          wish.top >= image.top &&
          wish.right <= image.right &&
          wish.bottom <= image.bottom,
        collision:
          Boolean(wish && badges) &&
          !(badges.right <= wish.left || badges.bottom <= wish.top),
        size: Math.round(wish?.width ?? 0),
      };
    });
    return {
      visibleCards: visibleCards.length,
      columns: grid
        ? getComputedStyle(grid).gridTemplateColumns.split(" ").length
        : 0,
      equalHeights: new Set(heights).size === 1,
      prices: visibleCards.map((card) => ({
        selling: card.querySelector(".wardro-product-price strong")?.textContent?.trim(),
        original: card.querySelector(".wardro-product-price del")?.textContent?.trim(),
        discount: card.querySelector(".wardro-discount-badge")?.textContent?.trim(),
      })),
      wishlistChecks,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });
  console.log(JSON.stringify({ width, ...metrics }));
  await page.locator(".selected-best-sellers").screenshot({
    path: `artifacts/pricing/best-sellers-${width}.png`,
  });
  await page.close();
}

for (const width of [390, 430, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 844 : 900 },
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  await page.goto(`${baseUrl}/products/soho-3-door-wardrobe`, {
    waitUntil: "networkidle",
  });
  const before = await page.locator(".pdp-price-line").evaluate((element) => ({
    selling: element.querySelector("strong")?.textContent?.trim(),
    original: element.querySelector("del")?.textContent?.trim(),
    discount: element.querySelector(".wardro-discount-badge")?.textContent?.trim(),
  }));
  await page.locator(".pdp-mirror-selector button").last().click();
  await page.locator(".pdp-accessories summary").click();
  await page.locator(".pdp-accessory-list label").first().click();
  const after = await page.locator(".pdp-price-line").evaluate((element) => ({
    selling: element.querySelector("strong")?.textContent?.trim(),
    original: element.querySelector("del")?.textContent?.trim(),
    discount: element.querySelector(".wardro-discount-badge")?.textContent?.trim(),
  }));
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  console.log(JSON.stringify({ productWidth: width, before, after, overflow }));
  await page.screenshot({
    path: `artifacts/pricing/product-${width}.png`,
  });
  await page.close();
}

const noOffer = await browser.newPage({ viewport: { width: 430, height: 844 } });
await noOffer.goto(`${baseUrl}/products/monaco-4-door-wardrobe`, {
  waitUntil: "networkidle",
});
console.log(
  JSON.stringify({
    noOffer: {
      originalCount: await noOffer.locator(".pdp-price-line del").count(),
      discountCount: await noOffer.locator(".pdp-price-line .wardro-discount-badge").count(),
    },
  }),
);
await noOffer.close();
await browser.close();
