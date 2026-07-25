"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Product } from "@/types/commerce";
import { ProductBadge } from "@/components/commerce/product-badge";
import { ProductCardCTA } from "@/components/commerce/product-card-cta";
import { ProductColourSwatches } from "@/components/commerce/product-colour-swatches";
import { ProductPrice } from "@/components/commerce/product-price";
import { ProductTrustRow } from "@/components/commerce/product-trust-row";
import { ProductWishlistButton } from "@/components/commerce/product-wishlist-button";
import { trackWishlistEvent } from "@/components/wishlist/wishlist-analytics";

export type ProductCardContext =
  | "homepage"
  | "collection"
  | "search"
  | "related"
  | "wishlist"
  | "recently-viewed"
  | "default";

type ProductCardProps = {
  product: Product;
  context?: ProductCardContext;
  revealIndex?: number;
  wishlistRemoving?: boolean;
  onWishlistRemove?: (product: Product) => void;
};

export function ProductCard({
  product,
  context = "default",
  revealIndex,
  wishlistRemoving = false,
  onWishlistRemove,
}: ProductCardProps) {
  const [selectedColour, setSelectedColour] = useState(
    product.colours[0] ?? "",
  );
  const productHref = `/products/${product.handle}`;
  const imageSizes =
    context === "homepage"
      ? "(max-width: 767px) 46vw, (max-width: 1100px) 33vw, 20vw"
      : context === "wishlist"
        ? "(max-width: 767px) 116px, (max-width: 1100px) 33vw, 25vw"
        : "(max-width: 560px) calc(100vw - 36px), (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw";
  const style =
    revealIndex === undefined
      ? undefined
      : ({ "--stagger-index": revealIndex } as CSSProperties);

  return (
    <article
      className={`wardro-product-card discovery-stagger${
        wishlistRemoving ? " is-wishlist-removing" : ""
      }`}
      data-context={context}
      style={style}
      aria-label={product.title}
    >
      <div className="wardro-product-image">
        <Link
          href={productHref}
          aria-label={`View ${product.title}`}
          onClick={() => {
            if (context === "wishlist") {
              trackWishlistEvent("wishlist_product_clicked", {
                product_handle: product.handle,
                product_title: product.title,
              });
            }
          }}
        >
          <Image
            src={product.featuredImage}
            alt={`${product.title} shown in a warm bedroom setting`}
            fill
            sizes={imageSizes}
          />
        </Link>
        <div className="wardro-product-badges">
          {product.bestSeller ? <ProductBadge type="best-seller" /> : null}
          {product.customisable ? <ProductBadge type="customisable" /> : null}
        </div>
        <ProductWishlistButton
          product={product}
          mode={context === "wishlist" ? "remove" : "toggle"}
          onRemove={onWishlistRemove}
        />
      </div>
      <div className="wardro-product-content">
        <Link
          className="wardro-product-title"
          href={productHref}
          onClick={() => {
            if (context === "wishlist") {
              trackWishlistEvent("wishlist_product_clicked", {
                product_handle: product.handle,
                product_title: product.title,
              });
            }
          }}
        >
          <h3>{product.title}</h3>
        </Link>
        <p className="wardro-product-dimensions">{product.dimensions}</p>
        <ProductPrice price={product.price} compareAt={product.compareAt} />
        <ProductTrustRow />
        <ProductColourSwatches
          colours={product.colours}
          selectedColour={selectedColour}
          onSelect={setSelectedColour}
        />
        <ProductCardCTA
          href={productHref}
          title={product.title}
          customisable={product.customisable}
        />
      </div>
    </article>
  );
}
