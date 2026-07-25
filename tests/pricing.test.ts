import { describe, expect, it } from "vitest";
import {
  calculateDiscountPercentage,
  getAdjustedOfferPricing,
  getOfferPricing,
} from "@/lib/pricing";

describe("offer pricing", () => {
  it("calculates a genuine rounded discount", () => {
    expect(calculateDiscountPercentage(22990, 28990)).toBe(21);
  });

  it("does not expose invalid offer states", () => {
    expect(calculateDiscountPercentage(20000, 20000)).toBeNull();
    expect(calculateDiscountPercentage(20000, 18000)).toBeNull();
    expect(calculateDiscountPercentage(0, 18000)).toBeNull();
    expect(getOfferPricing(14990)).toMatchObject({
      onSale: false,
      compareAtPrice: null,
      discountPercentage: null,
    });
  });

  it("keeps the genuine product saving when full-price extras are selected", () => {
    expect(
      getAdjustedOfferPricing({
        sellingPrice: 22990,
        compareAtPrice: 28990,
        extras: 1090,
      }),
    ).toMatchObject({
      sellingPrice: 24080,
      compareAtPrice: 30080,
      onSale: true,
      discountPercentage: 20,
    });
  });
});
