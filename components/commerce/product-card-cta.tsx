import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

type ProductCardCTAProps = {
  href: string;
  title: string;
  customisable: boolean;
};

export function ProductCardCTA({
  href,
  title,
  customisable,
}: ProductCardCTAProps) {
  const Icon = customisable ? ShoppingBag : ArrowRight;
  const label = customisable ? "Customise & Buy" : "View Product";

  return (
    <Link
      className="wardro-product-cta"
      href={href}
      aria-label={`${label}: ${title}`}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
