import { chromium } from "@playwright/test";
import path from "node:path";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const surfaces = [
  { name: "homepage", path: "/", container: ".home-best-sellers" },
  {
    name: "collection",
    path: "/collections/all-wardrobes",
    container: ".wardro-results",
  },
  { name: "search", path: "/search?q=wardrobe", container: ".product-grid" },
  {
    name: "related",
    path: "/products/soho-3-door-wardrobe",
    container: ".related",
  },
];
const viewports = [
  [1440, 1000],
  [1024, 900],
  [430, 900],
];
const results = [];
const requestedSurface = process.argv[2];
const requestedViewport = Number(process.argv[3]) || null;

for (const surface of surfaces.filter(
  (item) => !requestedSurface || item.name === requestedSurface,
)) {
  for (const [width, height] of viewports.filter(
    ([viewportWidth]) => !requestedViewport || viewportWidth === requestedViewport,
  )) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`http://localhost:3000${surface.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    const container = page.locator(surface.container).first();
    const cards = container.locator(".wardro-product-card");

    if ((await cards.count()) > 0) {
      await cards.first().waitFor({ state: "visible" });
      for (let index = 0; index < (await cards.count()); index += 1) {
        await cards.nth(index).scrollIntoViewIfNeeded();
      }
      await cards.first().scrollIntoViewIfNeeded();
      await page.waitForFunction(
        (selector) => {
          const image = document.querySelector(
            `${selector} .wardro-product-image img`,
          );
          return image?.complete && image.naturalWidth > 0;
        },
        surface.container,
      );
      await page.waitForTimeout(300);
      await container.screenshot({
        path: path.join("artifacts", `${surface.name}-cards-${width}.png`),
      });
    }

    results.push(
      await page.evaluate(
        ({ containerSelector, surfaceName }) => {
          const root = document.querySelector(containerSelector);
          const cards = root
            ? [...root.querySelectorAll(".wardro-product-card")]
            : [];
          const dimensions = cards.map((card) => {
            const rect = card.getBoundingClientRect();
            const image = card.querySelector(".wardro-product-image");
            const imageRect = image?.getBoundingClientRect();
            return {
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              imageHeight: imageRect ? Math.round(imageRect.height) : 0,
            };
          });
          const imageFailures = cards.filter((card) => {
            const image = card.querySelector("img");
            return !image || !image.complete || image.naturalWidth === 0;
          }).length;
          const invalidDiscounts = cards.filter((card) => {
            const discount = card.querySelector(".wardro-product-price > span");
            const original = card.querySelector(".wardro-product-price del");
            return Boolean(discount) !== Boolean(original);
          }).length;

          return {
            surface: surfaceName,
            viewport: document.documentElement.clientWidth,
            cardCount: cards.length,
            dimensions,
            horizontalOverflow:
              document.documentElement.scrollWidth >
              document.documentElement.clientWidth,
            imageFailures,
            invalidDiscounts,
            trustRows: cards.filter(
              (card) =>
                card.querySelectorAll(".wardro-product-trust span").length === 2,
            ).length,
            wishlistButtons: cards.filter((card) =>
              card.querySelector(".wardro-product-wishlist[aria-pressed]"),
            ).length,
            ctas: cards.filter((card) =>
              card.querySelector(".wardro-product-cta"),
            ).length,
            deliveryEstimateFooters: cards.filter((card) =>
              /3.?5 day delivery|delivery estimate|pin code/i.test(card.textContent),
            ).length,
            overflowingElements: [...document.querySelectorAll("body *")]
              .filter((element) => {
                const rect = element.getBoundingClientRect();
                return rect.right > document.documentElement.clientWidth + 1;
              })
              .slice(0, 6)
              .map((element) => ({
                tag: element.tagName,
                className: String(element.className),
                right: Math.round(element.getBoundingClientRect().right),
              })),
          };
        },
        { containerSelector: surface.container, surfaceName: surface.name },
      ),
    );
    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
