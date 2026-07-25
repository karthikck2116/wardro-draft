import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { commerce, getRelated } from "@/lib/commerce/repository";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductPageSections } from "@/components/product/product-page-sections";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const product = await commerce.getProduct((await params).handle);
  if (!product) notFound();

  return (
    <div className="shell wardro-product-page">
      <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight aria-hidden="true" />
        <Link href="/collections/all-wardrobes">Wardrobes</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">{product.title}</span>
      </nav>
      <ProductDetail product={product} />
      <ProductPageSections
        product={product}
        relatedProducts={getRelated(product)}
      />
    </div>
  );
}
