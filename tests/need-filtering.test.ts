import { describe, expect, it } from "vitest";
import { shopByNeedPageMap } from "@/data/shop-by-need-pages";
import {
  filterNeedProducts,
  type NeedProductSummary,
} from "@/lib/commerce/need-filtering";

function product(
  id: string,
  overrides: Partial<NeedProductSummary> = {},
): NeedProductSummary {
  return {
    id,
    doorCount: 3,
    colours: ["Walnut"],
    mirror: true,
    price: { amount: 22000, currencyCode: "INR" },
    variants: [
      {
        id: `${id}-without`,
        colour: "Walnut",
        mirror: "Without Mirror",
        price: { amount: 22000, currencyCode: "INR" },
        available: true,
      },
    ],
    bestSeller: false,
    ...overrides,
  };
}

describe("Shop by Need filtering", () => {
  it("matches exact door counts and 5+ doors", () => {
    const config = shopByNeedPageMap.get("number-of-doors")!;
    const products = [
      product("two", { doorCount: 2 }),
      product("three", { doorCount: 3 }),
      product("five", { doorCount: 5 }),
    ];

    expect(
      filterNeedProducts(products, config, { primary: "3" }).map(
        (item) => item.id,
      ),
    ).toEqual(["three"]);
    expect(
      filterNeedProducts(products, config, { primary: "5-plus" }).map(
        (item) => item.id,
      ),
    ).toEqual(["five"]);
  });

  it("uses explicit merchandising metadata instead of guessing room fit", () => {
    const config = shopByNeedPageMap.get("room-size")!;
    const products = [
      product("tagged", { needMetadata: { roomSizes: ["small"] } }),
      product("untagged"),
    ];

    expect(
      filterNeedProducts(products, config, { primary: "small" }).map(
        (item) => item.id,
      ),
    ).toEqual(["tagged"]);
  });

  it("keeps budget boundaries predictable", () => {
    const config = shopByNeedPageMap.get("budget")!;
    const products = [
      product("low", { price: { amount: 14999, currencyCode: "INR" } }),
      product("mid", { price: { amount: 25000, currencyCode: "INR" } }),
      product("high", { price: { amount: 40001, currencyCode: "INR" } }),
    ];

    expect(
      filterNeedProducts(products, config, { primary: "under-15000" }).map(
        (item) => item.id,
      ),
    ).toEqual(["low"]);
    expect(
      filterNeedProducts(products, config, { primary: "15000-25000" }).map(
        (item) => item.id,
      ),
    ).toEqual(["mid"]);
    expect(
      filterNeedProducts(products, config, { primary: "above-40000" }).map(
        (item) => item.id,
      ),
    ).toEqual(["high"]);
  });

  it("sorts genuine discounts from highest to lowest", () => {
    const config = shopByNeedPageMap.get("number-of-doors")!;
    const products = [
      product("ten", {
        price: { amount: 18000, currencyCode: "INR" },
        compareAt: { amount: 20000, currencyCode: "INR" },
      }),
      product("twenty", {
        price: { amount: 16000, currencyCode: "INR" },
        compareAt: { amount: 20000, currencyCode: "INR" },
      }),
    ];

    expect(
      filterNeedProducts(products, config, { sort: "discount" }).map(
        (item) => item.id,
      ),
    ).toEqual(["twenty", "ten"]);
  });
});
