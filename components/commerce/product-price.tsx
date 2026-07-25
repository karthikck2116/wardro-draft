import { formatMoney } from "@/lib/money";
import { getOfferPricing } from "@/lib/pricing";
import type { Money } from "@/types/commerce";
import { DiscountBadge } from "@/components/commerce/discount-badge";

type ProductPriceProps = {
  price: Money;
  compareAt?: Money | null;
  className?: string;
  live?: boolean;
};

export function ProductPrice({
  price,
  compareAt,
  className,
  live = false,
}: ProductPriceProps) {
  const pricing = getOfferPricing(price.amount, compareAt?.amount);

  return (
    <div
      className={`wardro-product-price${className ? ` ${className}` : ""}`}
      aria-live={live ? "polite" : undefined}
      aria-atomic={live ? "true" : undefined}
    >
      <strong>
        <span className="sr-only">
          {pricing.onSale ? "Offer price: " : "Price: "}
        </span>
        {formatMoney(pricing.sellingPrice, price.currencyCode)}
      </strong>
      {pricing.onSale && pricing.compareAtPrice ? (
        <del>
          <span className="sr-only">Original price: </span>
          {formatMoney(pricing.compareAtPrice, compareAt?.currencyCode ?? price.currencyCode)}
        </del>
      ) : null}
      <DiscountBadge percentage={pricing.discountPercentage} />
    </div>
  );
}
