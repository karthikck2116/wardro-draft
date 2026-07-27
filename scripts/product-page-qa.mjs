import { chromium } from "@playwright/test";
import path from "node:path";
import { mkdir } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const sizes = [
  [1440, 900],
  [1280, 800],
  [1024, 900],
  [768, 900],
  [430, 900],
  [390, 844],
];
const results = [];
const requestedWidth = Number(process.argv[2]) || null;

for (const [width, height] of sizes.filter(
  ([viewportWidth]) => !requestedWidth || viewportWidth === requestedWidth,
)) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000/products/soho-3-door-wardrobe", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.locator(".pdp-gallery-product-image").waitFor({ state: "visible" });
  await page.waitForFunction(() => {
    const image = document.querySelector(".pdp-gallery-product-image");
    return image?.complete && image.naturalWidth > 0;
  });
  await page.addStyleTag({
    content:
      "nextjs-portal{display:none!important}*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  const foldMetrics = await page.evaluate(() => {
    const rectangle = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };
    const visible = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && rect.top >= 0 && rect.bottom <= innerHeight;
    };
    const headings = [...document.querySelectorAll(".wardro-product-page h1, .wardro-product-page h2, .wardro-product-page h3")];

    return {
      viewport: { width: innerWidth, height: innerHeight },
      gallery: rectangle(".pdp-main-image"),
      purchasePanel: rectangle(".pdp-purchase-panel"),
      desktopAddVisible: visible(".pdp-buy-actions .pdp-button"),
      desktopBuyVisible: visible(".pdp-buy-actions .pdp-button:last-child"),
      mobileBarVisible: visible(".pdp-mobile-purchase"),
      thumbnailCount: document.querySelectorAll(".pdp-thumbnails button").length,
      thumbnailImages: document.querySelectorAll(".pdp-thumbnails img").length,
      montserratHeadings: headings.filter((heading) =>
        getComputedStyle(heading).fontFamily.toLowerCase().includes("montserrat"),
      ).length,
      headingCount: headings.length,
      duplicateTrustStrips: document.querySelectorAll(
        ".wardro-product-page > .trust-strip, .pdp-main + .trust-strip",
      ).length,
      developmentText: /mock content|representative for development/i.test(
        document.querySelector(".wardro-product-page")?.textContent ?? "",
      ),
      oldPlaceholders: document.querySelectorAll(
        ".wardrobe-open, .material-swatch",
      ).length,
      horizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      gallerySection: rectangle(".pdp-gallery"),
      panelChildren: [...document.querySelectorAll(".pdp-purchase-panel > *")].map(
        (element) => ({
          className: String(element.className),
          height: Math.round(element.getBoundingClientRect().height),
          marginTop: getComputedStyle(element).marginTop,
        }),
      ),
    };
  });

  await page.screenshot({
    path: path.join("artifacts", `product-page-fold-${width}.png`),
  });

  for (const selector of [".pdp-materials", ".pdp-related", ".wardro-site-footer"]) {
    const section = page.locator(selector).first();
    if (await section.count()) await section.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(250);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: path.join("artifacts", `product-page-${width}.png`),
    fullPage: true,
  });

  const finalMetrics = await page.evaluate(() => {
    const relatedCards = [
      ...document.querySelectorAll(".pdp-related .wardro-product-card"),
    ];
    const heights = relatedCards.map((card) =>
      Math.round(card.getBoundingClientRect().height),
    );
    const images = [...document.querySelectorAll(".wardro-product-page img")];
    return {
      relatedCardCount: relatedCards.length,
      relatedCardHeights: heights,
      missingImages: images.filter(
        (image) => !image.complete || image.naturalWidth === 0,
      ).length,
      materialCards: document.querySelectorAll(".pdp-material-grid article").length,
      specificationGroups: document.querySelectorAll(
        ".pdp-specification-grid details",
      ).length,
      highlightCards: document.querySelectorAll(".pdp-highlight-grid article").length,
    };
  });

  if (width === 1440) {
    await page.locator(".pdp-accessories summary").click();
    const initialPrice = await page.locator(".pdp-price-line > strong").textContent();
    await page.locator(".pdp-accessory-list label").first().click();
    const accessoryPrice = await page.locator(".pdp-price-line > strong").textContent();
    await page.locator("#product-pin").fill("560001");
    await page.locator(".pdp-pincode button").click();
    const serviceResult = await page.locator(".pdp-service-result").textContent();
    await page.locator(".pdp-gallery-zoom").click();
    const viewerVisible = await page.locator(".pdp-image-viewer").isVisible();
    await page.locator(".pdp-image-viewer-close").click();
    await page.locator(".pdp-buy-actions .pdp-button").first().click();
    const cartDrawerVisible = await page.locator(".wardro-cart-drawer").isVisible();
    const cartContainsProduct = await page
      .locator(".wardro-cart-drawer")
      .getByText("Soho 3-Door Wardrobe")
      .isVisible();
    await page.locator(".wardro-cart-head button").click();
    Object.assign(finalMetrics, {
      accessoryPriceChanged: initialPrice !== accessoryPrice,
      serviceResult,
      viewerVisible,
      cartDrawerVisible,
      cartContainsProduct,
    });
  }

  results.push({ ...foldMetrics, ...finalMetrics });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
