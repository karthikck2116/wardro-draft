import { Palette, Star } from "lucide-react";

type ProductBadgeProps = {
  type: "best-seller" | "customisable";
};

export function ProductBadge({ type }: ProductBadgeProps) {
  const bestSeller = type === "best-seller";
  const Icon = bestSeller ? Star : Palette;

  return (
    <span className={`wardro-product-badge wardro-product-badge--${type}`}>
      <Icon aria-hidden="true" />
      {bestSeller ? "Best seller" : "Customisable"}
    </span>
  );
}
