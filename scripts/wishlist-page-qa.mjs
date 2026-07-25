import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3000";
const savedHandles = [
  "soho-3-door-wardrobe",
  "nexa-2-door-wardrobe",
  "luxe-mirror-wardrobe",
  "vienna-3-door-wardrobe",
];
const viewports = [
  [1440, 1000],
  [1280, 960],
  [1024, 950],
  [768, 960],
  [430, 940],
  [390, 920],
];

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const [width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.addInitScript((handles) => {
    localStorage.setItem("wardro-wishlist", JSON.stringify(handles));
  }, savedHandles);
  await page.goto(`${baseUrl}/wishlist`, { waitUntil: "networkidle" });
  await page.waitForSelector(".wishlist-grid .wardro-product-card");
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= pageHeight; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);

  const metrics = await page.evaluate(() => {
    const imageWrappers = [
      ...document.querySelectorAll(".wishlist-grid .wardro-product-image"),
    ];
    const cards = [...document.querySelectorAll(".wishlist-grid .wardro-product-card")];
    const firstCard = cards[0];
    const firstGrid = document.querySelector(".wishlist-grid");
    const buttonsInside = imageWrappers.every((wrapper) => {
      const button = wrapper.querySelector(".wardro-product-wishlist");
      if (!button) return false;
      const outer = wrapper.getBoundingClientRect();
      const inner = button.getBoundingClientRect();
      return (
        inner.left >= outer.left &&
        inner.top >= outer.top &&
        inner.right <= outer.right &&
        inner.bottom <= outer.bottom
      );
    });
    const badgeCollisions = imageWrappers.filter((wrapper) => {
      const badge = wrapper.querySelector(".wardro-product-badges");
      const button = wrapper.querySelector(".wardro-product-wishlist");
      if (!badge || !button) return false;
      const a = badge.getBoundingClientRect();
      const b = button.getBoundingClientRect();
      return !(
        a.right <= b.left ||
        a.left >= b.right ||
        a.bottom <= b.top ||
        a.top >= b.bottom
      );
    }).length;
    return {
      cardCount: cards.length,
      countText: document.querySelector(".wishlist-count")?.textContent?.trim(),
      columns: firstGrid
        ? getComputedStyle(firstGrid).gridTemplateColumns.split(" ").length
        : 0,
      equalCardHeights:
        new Set(cards.map((card) => Math.round(card.getBoundingClientRect().height)))
          .size === 1,
      buttonSize: firstCard
        ?.querySelector(".wardro-product-wishlist")
        ?.getBoundingClientRect().width,
      buttonsInside,
      badgeCollisions,
      horizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      headingFont: getComputedStyle(document.querySelector("h1")).fontFamily,
      shareButtonVisible: Boolean(
        [...document.querySelectorAll("button")].find((button) =>
          button.textContent?.includes("Share wishlist"),
        ),
      ),
    };
  });

  console.log(JSON.stringify({ width, ...metrics }));
  await page.screenshot({
    path: `artifacts/wishlist-page-${width}.png`,
    fullPage: true,
  });
  await page.close();
}

const interactionPage = await browser.newPage({
  viewport: { width: 1280, height: 900 },
});
await interactionPage.goto(baseUrl, { waitUntil: "networkidle" });
await interactionPage.evaluate(() => localStorage.removeItem("wardro-wishlist"));
await interactionPage.reload({ waitUntil: "networkidle" });
const firstHeart = interactionPage.locator(".wardro-product-wishlist").first();
await firstHeart.click();
const storedAfterAdd = await interactionPage.evaluate(() =>
  JSON.parse(localStorage.getItem("wardro-wishlist") || "[]"),
);
await interactionPage.goto(`${baseUrl}/wishlist`, {
  waitUntil: "networkidle",
});
await interactionPage.waitForSelector(".wishlist-grid .wardro-product-card");
const countBeforeReload = await interactionPage
  .locator(".wishlist-grid .wardro-product-card")
  .count();
await interactionPage.reload({ waitUntil: "networkidle" });
await interactionPage.waitForSelector(".wishlist-grid .wardro-product-card");
const countAfterReload = await interactionPage
  .locator(".wishlist-grid .wardro-product-card")
  .count();
await interactionPage.locator(".wardro-product-wishlist.is-remove").first().click();
await interactionPage.waitForTimeout(280);
const countAfterRemove = await interactionPage
  .locator(".wishlist-grid .wardro-product-card")
  .count();

console.log(
  JSON.stringify({
    interaction: {
      storedAfterAdd: storedAfterAdd.length,
      storedAsStructuredItem:
        typeof storedAfterAdd[0] === "object" &&
        typeof storedAfterAdd[0]?.productHandle === "string",
      countBeforeReload,
      countAfterReload,
      countAfterRemove,
    },
  }),
);

await interactionPage.close();
await browser.close();
