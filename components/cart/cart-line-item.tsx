"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageOpen, Trash2 } from "lucide-react";
import type { CartLine } from "@/components/cart/cart-types";
import { CartQuantityControl } from "@/components/cart/cart-quantity-control";
import { trackCartEvent } from "@/components/cart/cart-analytics";
import { ProductPrice } from "@/components/commerce/product-price";

export function CartLineItem({
  line,
  onUpdate,
}: {
  line: CartLine;
  onUpdate: (id: string, quantity: number) => void;
}) {
  const productHref =
    line.kind !== "accessory" && line.productHandle
      ? `/products/${line.productHandle}`
      : null;
  const cleanVariant = line.variant.replaceAll("Â·", "·");

  function remove() {
    onUpdate(line.id, 0);
    trackCartEvent("cart_item_removed", {
      line_id: line.id,
      product_title: line.title,
      quantity: line.quantity,
    });
  }

  const media = line.kind === "accessory" || !line.image ? (
    <span className="wardro-cart-line-icon" aria-hidden="true">
      <PackageOpen />
    </span>
  ) : (
    <Image
      src={line.image}
      alt={`${line.title} in a warm bedroom setting`}
      fill
      sizes="92px"
    />
  );

  return (
    <article className="wardro-cart-line">
      {productHref ? (
        <Link
          className="wardro-cart-line-media"
          href={productHref}
          aria-label={`View ${line.title}`}
        >
          {media}
        </Link>
      ) : (
        <div className="wardro-cart-line-media">{media}</div>
      )}

      <div className="wardro-cart-line-copy">
        <div className="wardro-cart-line-heading">
          <div>
            {productHref ? (
              <Link href={productHref}>{line.title}</Link>
            ) : (
              <strong>{line.title}</strong>
            )}
            <p>{cleanVariant}</p>
          </div>
          <button
            className="wardro-cart-remove"
            type="button"
            onClick={remove}
            aria-label={`Remove ${line.title} from cart`}
          >
            <Trash2 aria-hidden="true" />
          </button>
        </div>

        {line.selectedAccessories?.length ? (
          <ul className="wardro-cart-included">
            {line.selectedAccessories.map((accessory) => (
              <li key={accessory.id}>{accessory.title}</li>
            ))}
          </ul>
        ) : null}

        <div className="wardro-cart-line-bottom">
          <ProductPrice
            className="wardro-cart-line-price"
            price={{
              amount: line.price,
              currencyCode: line.currencyCode ?? "INR",
            }}
            compareAt={
              line.compareAtPrice
                ? {
                    amount: line.compareAtPrice,
                    currencyCode: line.currencyCode ?? "INR",
                  }
                : null
            }
          />
          <CartQuantityControl
            id={line.id}
            title={line.title}
            quantity={line.quantity}
            onChange={onUpdate}
          />
        </div>
      </div>
    </article>
  );
}
