import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";
import { BestSellerHeader } from "./best-seller-header";
import { BestSellerTrustStrip } from "./best-seller-trust-strip";
import { DiscoveryRevealSection } from "./discovery-reveal-section";

type SelectedBestSellersProps = {
  products: Product[];
};

export function SelectedBestSellers({ products }: SelectedBestSellersProps) {
  return (
    <div className="home-best-sellers">
      <DiscoveryRevealSection
        className="wardro-best-seller-container selected-best-sellers"
        labelledBy="selected-best-sellers-title"
      >
        <BestSellerHeader />
        <div className="best-seller-product-grid">
          {products.map((product, index) => (
            <ProductCard
              product={product}
              context="homepage"
              revealIndex={index}
              key={product.id}
            />
          ))}
        </div>
        <BestSellerTrustStrip />
      </DiscoveryRevealSection>
    </div>
  );
}
