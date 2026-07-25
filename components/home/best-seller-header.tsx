import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BestSellerHeader() {
  return (
    <div className="best-seller-section-header discovery-reveal-heading">
      <div>
        <div className="best-seller-eyebrow">
          <span>BEST SELLERS</span>
          <i aria-hidden="true" />
        </div>
        <h2 id="selected-best-sellers-title">Selected Best Sellers</h2>
        <p>Wardrobes our customers love most.</p>
      </div>
      <Link href="/collections/best-sellers">
        <span>View all best sellers</span>
        <i>
          <ArrowRight aria-hidden="true" />
        </i>
      </Link>
    </div>
  );
}
