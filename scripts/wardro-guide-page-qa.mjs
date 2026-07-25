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
  await page.goto("http://localhost:3000/wardro-guide", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.locator(".guide-page").waitFor({ state: "visible" });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= pageHeight; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);

  await page.screenshot({
    path: path.join("artifacts", `wardro-guide-page-${width}.png`),
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
      const headings = [
        ...document.querySelectorAll(
          ".guide-page h1, .guide-page h2, .guide-page h3",
        ),
      ];
      const images = [...document.querySelectorAll(".guide-page img")];
      const pageText = document.querySelector(".guide-page")?.textContent ?? "";

      return {
        viewport: { width: innerWidth, height: innerHeight },
        pageHeight: document.body.scrollHeight,
        horizontalOverflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        hero: box(".guide-page-hero"),
        heroCopy: box(".guide-page-hero-copy"),
        heroImage: box(".guide-page-hero-image"),
        benefitCount: document.querySelectorAll(
          ".guide-page-benefits article",
        ).length,
        tabCount: document.querySelectorAll(".guide-tabs a").length,
        featured: box(".guide-featured"),
        guideCardCount: document.querySelectorAll(".guide-page-card").length,
        guideCardSizes: boxes(".guide-page-card"),
        topicCount: document.querySelectorAll(".guide-topic-card").length,
        faqCount: document.querySelectorAll(".guide-faq-list article").length,
        reassuranceCount: document.querySelectorAll(
          ".guide-page > .wardro-reassurance .wardro-reassurance-item",
        ).length,
        montserratHeadings: headings.filter((heading) =>
          getComputedStyle(heading).fontFamily
            .toLowerCase()
            .includes("montserrat"),
        ).length,
        headingCount: headings.length,
        activeNav:
          document.querySelector('.header .nav a[href="/wardro-guide"]')
            ?.getAttribute("aria-current") ?? null,
        missingImages: images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        fakeClaims: ["10,000+", "fake reviews", "limited time"].filter((claim) =>
          pageText.toLowerCase().includes(claim.toLowerCase()),
        ),
      };
    }),
  );

  await page.close();
}

const articlePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await articlePage.goto(
  "http://localhost:3000/wardro-guide/how-to-choose-the-right-wardrobe",
  { waitUntil: "domcontentloaded", timeout: 60000 },
);
await articlePage.locator(".guide-article-page").waitFor({ state: "visible" });
await articlePage.addStyleTag({
  content: "*,*::before,*::after{animation:none!important;transition:none!important}",
});
await articlePage.screenshot({
  path: path.join("artifacts", "wardro-guide-article-1440.png"),
  fullPage: true,
});
const articleMetrics = await articlePage.evaluate(() => ({
  horizontalOverflow:
    document.documentElement.scrollWidth > document.documentElement.clientWidth,
  articleSections: document.querySelectorAll(".guide-article-body > section")
    .length,
  tocLinks: document.querySelectorAll(".guide-article-toc a").length,
  relatedGuides: document.querySelectorAll(
    ".guide-article-related .guide-page-card",
  ).length,
  relatedProducts: document.querySelectorAll(
    ".guide-article-products .wardro-product-card",
  ).length,
  activeNav:
    document
      .querySelector('.header .nav a[href="/wardro-guide"]')
      ?.getAttribute("aria-current") ?? null,
}));
await articlePage.close();

const filterPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await filterPage.goto(
  "http://localhost:3000/wardro-guide?category=buying-guides",
  { waitUntil: "domcontentloaded", timeout: 60000 },
);
const filterMetrics = await filterPage.evaluate(() => ({
  activeTab:
    document.querySelector(".guide-tabs a.is-active")?.textContent?.trim() ??
    null,
  visibleCards: document.querySelectorAll(".guide-page-card").length,
  url: location.pathname + location.search,
}));
await filterPage.close();

await browser.close();
console.log(JSON.stringify({ results, articleMetrics, filterMetrics }, null, 2));
