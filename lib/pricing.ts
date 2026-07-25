export type OfferPricing = {
  sellingPrice: number;
  compareAtPrice: number | null;
  discountPercentage: number | null;
  onSale: boolean;
};

function validAmount(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function calculateDiscountPercentage(
  sellingPrice: number,
  compareAtPrice?: number | null,
) {
  if (
    !validAmount(sellingPrice) ||
    !validAmount(compareAtPrice) ||
    compareAtPrice! <= sellingPrice
  ) {
    return null;
  }

  const percentage = Math.round(
    ((compareAtPrice! - sellingPrice) / compareAtPrice!) * 100,
  );
  return percentage > 0 && percentage < 100 ? percentage : null;
}

export function getOfferPricing(
  sellingPrice: number,
  compareAtPrice?: number | null,
): OfferPricing {
  const safeSellingPrice = validAmount(sellingPrice) ? sellingPrice : 0;
  const discountPercentage = calculateDiscountPercentage(
    safeSellingPrice,
    compareAtPrice,
  );

  return {
    sellingPrice: safeSellingPrice,
    compareAtPrice: discountPercentage ? compareAtPrice! : null,
    discountPercentage,
    onSale: Boolean(discountPercentage),
  };
}

export function getAdjustedOfferPricing({
  sellingPrice,
  compareAtPrice,
  extras = 0,
}: {
  sellingPrice: number;
  compareAtPrice?: number | null;
  extras?: number;
}) {
  const safeExtras = validAmount(extras) ? extras : 0;
  return getOfferPricing(
    sellingPrice + safeExtras,
    compareAtPrice ? compareAtPrice + safeExtras : null,
  );
}
