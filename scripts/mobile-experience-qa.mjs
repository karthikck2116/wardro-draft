import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.QA_BASE_URL || "http://localhost:3000";
const widths = [390, 430, 768, 1024];
const routes = [
  ["home", "/"],
  ["collection", "/collections/all-wardrobes"],
  ["product", "/products/soho-3-door-wardrobe"],
  ["wishlist", "/wishlist"],
  ["materials", "/materials-and-quality"],
  ["guide", "/wardro-guide"],
];

await mkdir("artifacts/mobile", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const failures = [];

for (const width of widths) {
  for (const [name, route] of routes) {
    const page = await browser.newPage({
      viewport: { width, height: width <= 430 ? 844 : 900 },
      isMobile: width <= 430,
      hasTouch: true,
    });
    page.on("pageerror", (error) => failures.push(`${name}-${width}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(`${name}-${width}: ${message.text()}`);
    });
    await page.addInitScript(() => {
      localStorage.setItem(
        "wardro-wishlist",
        JSON.stringify([
          "soho-3-door-wardrobe",
          "nexa-2-door-wardrobe",
          "luxe-mirror-wardrobe",
        ]),
      );
    });
    await page.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none!important;transition:none!important}",
    });
    await page.waitForTimeout(100);

    const metrics = await page.evaluate(() => {
      const touchTargets = [...document.querySelectorAll("button, a, input, select")]
        .filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && rect.width > 0 && rect.height > 0;
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { label: element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 30), width: rect.width, height: rect.height };
        })
        .filter((target) => target.width < 40 || target.height < 40)
        .slice(0, 8);
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        bodyWidth: document.body.getBoundingClientRect().width,
        font: getComputedStyle(document.body).fontFamily,
        touchTargets,
      };
    });

    console.log(JSON.stringify({ name, width, ...metrics }));
    await page.screenshot({
      path: `artifacts/mobile/${name}-${width}.png`,
      fullPage: true,
    });
    await page.close();
  }
}

const interaction = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await interaction.goto(baseUrl, { waitUntil: "networkidle" });
await interaction.locator(".mobile-icon").click();
await interaction.locator(".mobile-nav-drawer").waitFor({ state: "visible" });
const navVisible = await interaction.locator(".mobile-nav-drawer").isVisible();
await interaction.keyboard.press("Escape");
await interaction.goto(`${baseUrl}/collections/all-wardrobes`, { waitUntil: "networkidle" });
await interaction.locator(".wardro-mobile-filter-trigger").click();
const filterVisible = await interaction.locator(".wardro-filters--mobile").isVisible();
await interaction.locator(".wardro-filters--mobile input[name=doors][value='2']").check();
await interaction.locator(".wardro-filters--mobile .wardro-filter-actions button").click();
await interaction.waitForLoadState("networkidle");
const filterApplied = new URL(interaction.url()).searchParams.get("doors") === "2";
await interaction.goto(`${baseUrl}/products/soho-3-door-wardrobe`, { waitUntil: "networkidle" });
await interaction.locator(".pdp-mobile-purchase button").last().click();
const cartVisible = await interaction.locator(".wardro-cart-drawer").isVisible();
console.log(JSON.stringify({ interactions: { navVisible, filterVisible, filterApplied, cartVisible } }));
await interaction.close();

await browser.close();
if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exitCode = 1;
}
