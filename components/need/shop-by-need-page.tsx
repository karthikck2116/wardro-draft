import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NeedCategoryGrid } from "./need-category-grid";
import { NeedFinderTools } from "./need-finder-tools";
import { ShopByNeedHero } from "./shop-by-need-hero";
import { ShopByNeedTrustStrip } from "./shop-by-need-trust-strip";

export function ShopByNeedPage() {
  return (
    <div className="need-page">
      <div className="need-page-shell">
        <nav className="need-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight aria-hidden="true" />
          <span aria-current="page">Shop by Need</span>
        </nav>
        <ShopByNeedHero />
        <NeedCategoryGrid />
        <NeedFinderTools />
        <ShopByNeedTrustStrip />
      </div>
    </div>
  );
}
