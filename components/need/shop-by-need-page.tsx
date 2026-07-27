import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ShopByNeedTrustStrip } from "./shop-by-need-trust-strip";
import { ShopByNeedOverviewPage } from "./shop-by-need-overview";

export function ShopByNeedPage() {
  return (
    <div className="need-page">
      <div className="need-page-shell">
        <nav className="need-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight aria-hidden="true" />
          <span aria-current="page">Shop by Need</span>
        </nav>
        <ShopByNeedOverviewPage />
        <ShopByNeedTrustStrip />
      </div>
    </div>
  );
}
