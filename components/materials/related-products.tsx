import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="mq-related" aria-labelledby="mq-related-title">
      <header>
        <div>
          <p className="mq-eyebrow">Built with thoughtful details</p>
          <h2 id="mq-related-title">You may also like</h2>
        </div>
        <Link href="/collections/all-wardrobes">
          <span>View all wardrobes</span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </header>
      <div className="mq-related-grid">
        {products.map((product, index) => (
          <ProductCard
            product={product}
            context="related"
            revealIndex={index}
            key={product.id}
          />
        ))}
      </div>
    </section>
  );
}
