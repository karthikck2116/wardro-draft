"use client";

import {
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Palette,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import type { Product, Variant } from "@/types/commerce";
import { formatMoney } from "@/lib/money";
import { getAdjustedOfferPricing } from "@/lib/pricing";
import {
  checkServiceability,
  type ServiceabilityResult,
} from "@/lib/delivery/check-serviceability";
import { useCart } from "@/components/cart/cart-context";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPrice } from "@/components/commerce/product-price";

const finishColours: Record<string, string> = {
  Walnut: "#56331f",
  "Dark Walnut": "#382116",
  Oak: "#b77a42",
  Cream: "#e8dcc7",
  White: "#f5f2eb",
  Grey: "#9a9a96",
};

const accessoryDescriptions: Record<string, string> = {
  tray: "Keeps small daily essentials organised.",
  shelf: "Adds another flexible storage level.",
  organiser: "Creates tidy sections inside a drawer.",
};

export function ProductDetail({ product }: { product: Product }) {
  const initialColour = product.colours[0] ?? "Walnut";
  const initialMirror =
    product.variants.find(
      (variant) =>
        variant.colour === initialColour && variant.mirror === "Without Mirror",
    )?.mirror ??
    product.variants[0]?.mirror ??
    "Without Mirror";
  const [colour, setColour] = useState(initialColour);
  const [mirror, setMirror] = useState(initialMirror);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [pin, setPin] = useState("");
  const [service, setService] = useState<ServiceabilityResult | null>(null);
  const { add } = useCart();

  const mirrorOptions = [...new Set(product.variants.map((item) => item.mirror))];
  const variant = product.variants.find(
    (item) => item.colour === colour && item.mirror === mirror,
  );
  const extras = product.accessories.filter((accessory) =>
    selectedAccessories.includes(accessory.id),
  );
  const extrasTotal = extras.reduce(
    (sum, accessory) => sum + accessory.price.amount,
    0,
  );
  const variantPrice = variant?.price.amount ?? product.price.amount;
  const variantDifference = variantPrice - product.price.amount;
  const selectedCompareAt =
    variant?.compareAt?.amount ??
    (product.compareAt && product.compareAt.amount > product.price.amount
      ? product.compareAt.amount + variantDifference
      : null);
  const pricing = getAdjustedOfferPricing({
    sellingPrice: variantPrice,
    compareAtPrice: selectedCompareAt,
    extras: extrasTotal,
  });
  const total = pricing.sellingPrice;
  const customised = colour !== initialColour || mirror === "With Mirror";
  const canPurchase = Boolean(variant?.available);

  function updateColour(nextColour: string) {
    setColour(nextColour);
    if (
      !product.variants.some(
        (item) => item.colour === nextColour && item.mirror === mirror,
      )
    ) {
      const fallback = product.variants.find(
        (item) => item.colour === nextColour && item.available,
      );
      if (fallback) setMirror(fallback.mirror);
    }
  }

  function addSelectedProduct() {
    if (!variant?.available) return;
    add({
      id: variant.id,
      title: product.title,
      variant: `${colour} · ${mirror}`,
      price: total,
      compareAtPrice: pricing.compareAtPrice ?? undefined,
      quantity: 1,
      image: product.images[0] ?? product.featuredImage,
      currencyCode: product.price.currencyCode,
      kind: "product",
      productHandle: product.handle,
      selectedAccessories: extras.map((accessory) => ({
        id: accessory.id,
        title: accessory.title,
        price: accessory.price.amount,
      })),
      compatibleAccessories: product.accessories.map((accessory) => ({
        id: accessory.id,
        productId: product.id,
        variantId: `${variant.id}:accessory:${accessory.id}`,
        title: accessory.title,
        description:
          accessoryDescriptions[accessory.id] ??
          "Compatible add-on for this wardrobe.",
        price: accessory.price,
        compatibleWith: [product.handle],
      })),
    });
  }

  function toggleAccessory(id: string) {
    setSelectedAccessories((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function runServiceabilityCheck() {
    const result = checkServiceability(pin, product.ready);
    setService(result);
    if (result.serviceable) localStorage.setItem("wardro-pincode", pin);
  }

  return (
    <div className="pdp-main">
      <ProductGallery product={product} />

      <section className="pdp-purchase-panel" aria-labelledby="product-title">
        <div className="pdp-product-badges" aria-label="Product features">
          {product.bestSeller ? (
            <span className="pdp-product-badge pdp-product-badge--primary">
              <Sparkles aria-hidden="true" /> Best seller
            </span>
          ) : null}
          {product.customisable ? (
            <span className="pdp-product-badge">
              <Palette aria-hidden="true" /> Customisable
            </span>
          ) : null}
        </div>

        <h1 id="product-title">{product.title}</h1>
        <p className="pdp-description">{product.description}</p>

        <div className="pdp-price-block" aria-label="Selected product price">
          <ProductPrice
            className="pdp-price-line"
            price={{ amount: total, currencyCode: product.price.currencyCode }}
            compareAt={
              pricing.compareAtPrice
                ? {
                    amount: pricing.compareAtPrice,
                    currencyCode: product.price.currencyCode,
                  }
                : null
            }
            live
          />
          <p className="pdp-price-notes">
            <span>EMI options available at checkout</span>
            <span>Inclusive of applicable taxes</span>
          </p>
        </div>

        <ColourSelector
          values={product.colours}
          selected={colour}
          onChange={updateColour}
        />

        <MirrorSelector
          values={mirrorOptions}
          selected={mirror}
          colour={colour}
          variants={product.variants}
          onChange={setMirror}
        />

        {product.accessories.length ? (
          <details className="pdp-accessories">
            <summary>
              <span>
                <Plus aria-hidden="true" />
                <b>Add accessories</b>
              </span>
              <span>
                {selectedAccessories.length
                  ? `${selectedAccessories.length} selected · ${formatMoney(extrasTotal)}`
                  : `${product.accessories.length} optional add-ons`}
                <ChevronDown aria-hidden="true" />
              </span>
            </summary>
            <div className="pdp-accessory-list">
              {product.accessories.map((accessory) => {
                const selected = selectedAccessories.includes(accessory.id);
                return (
                  <label
                    className={selected ? "is-selected" : undefined}
                    key={accessory.id}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleAccessory(accessory.id)}
                    />
                    <span className="pdp-accessory-check" aria-hidden="true">
                      {selected ? <Check /> : <Plus />}
                    </span>
                    <span>
                      <b>{accessory.title}</b>
                      <small>
                        {accessoryDescriptions[accessory.id] ??
                          "Compatible add-on for this wardrobe."}
                      </small>
                    </span>
                    <strong>+ {formatMoney(accessory.price.amount)}</strong>
                  </label>
                );
              })}
            </div>
          </details>
        ) : null}

        <div className="pdp-pincode">
          <div className="pdp-pincode-heading">
            <label htmlFor="product-pin">Check delivery and installation</label>
            {product.readyToDispatch ? (
              <span>
                <BadgeCheck aria-hidden="true" /> Ready to dispatch
              </span>
            ) : null}
          </div>
          <div className="pdp-pincode-form">
            <input
              id="product-pin"
              inputMode="numeric"
              autoComplete="postal-code"
              value={pin}
              onChange={(event) => {
                setPin(event.target.value.replace(/\D/g, "").slice(0, 6));
                setService(null);
              }}
              placeholder="Enter PIN code"
              aria-describedby={service ? "product-pin-result" : undefined}
            />
            <button
              type="button"
              onClick={runServiceabilityCheck}
              disabled={pin.length !== 6}
            >
              Check
            </button>
          </div>
          {service ? (
            <ServiceabilityMessage result={service} />
          ) : null}
        </div>

        <div className="pdp-buy-actions">
          <button
            className="pdp-button pdp-button--secondary"
            type="button"
            disabled={!canPurchase}
            onClick={addSelectedProduct}
          >
            <ShoppingCart aria-hidden="true" /> Add to Cart
          </button>
          <button
            className="pdp-button"
            type="button"
            disabled={!canPurchase}
            onClick={addSelectedProduct}
          >
            Buy Now
          </button>
        </div>

        <div className="pdp-trust-row" aria-label="Purchase reassurance">
          <span>
            <ShieldCheck aria-hidden="true" /> 5-Year Warranty
          </span>
          <span>
            <Wrench aria-hidden="true" />
            <b className="pdp-trust-label-desktop">
              Free Delivery &amp; Partner Installation
            </b>
            <b className="pdp-trust-label-mobile">
              Free Delivery &amp; Installation
            </b>
          </span>
          <span>
            <CreditCard aria-hidden="true" /> Secure Payments
          </span>
        </div>

        {customised ? (
          <p className="pdp-customisation-notice">
            Customised products cannot be cancelled after order confirmation.
          </p>
        ) : null}
      </section>

      <div className="pdp-mobile-purchase" aria-label="Mobile purchase actions">
        <span>
          <strong>{formatMoney(total, product.price.currencyCode)}</strong>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("product-title")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          >
            View details
          </button>
        </span>
        <button
          className="pdp-button pdp-button--secondary"
          type="button"
          disabled={!canPurchase}
          onClick={addSelectedProduct}
        >
          <ShoppingCart aria-hidden="true" />
          Add to Cart
        </button>
        <button
          className="pdp-button"
          type="button"
          disabled={!canPurchase}
          onClick={addSelectedProduct}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

function ColourSelector({
  values,
  selected,
  onChange,
}: {
  values: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="pdp-option-group pdp-colour-selector">
      <legend>
        Colour <span>{selected} selected</span>
      </legend>
      <div>
        {values.map((value) => {
          const active = value === selected;
          return (
            <button
              className={active ? "is-selected" : undefined}
              type="button"
              key={value}
              onClick={() => onChange(value)}
              aria-pressed={active}
              aria-label={`${value} finish${active ? ", selected" : ""}`}
            >
              <span
                aria-hidden="true"
                style={{ backgroundColor: finishColours[value] ?? "#b7a89d" }}
              />
              {value}
              {active ? <Check aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MirrorSelector({
  values,
  selected,
  colour,
  variants,
  onChange,
}: {
  values: string[];
  selected: string;
  colour: string;
  variants: Variant[];
  onChange: (value: string) => void;
}) {
  const basePrice =
    variants.find(
      (variant) =>
        variant.colour === colour && variant.mirror === "Without Mirror",
    )?.price.amount ?? 0;

  return (
    <fieldset className="pdp-option-group pdp-mirror-selector">
      <legend>Mirror option</legend>
      <div>
        {values.map((value) => {
          const active = value === selected;
          const option = variants.find(
            (variant) => variant.colour === colour && variant.mirror === value,
          );
          const difference = option ? option.price.amount - basePrice : 0;
          return (
            <button
              className={active ? "is-selected" : undefined}
              type="button"
              key={value}
              onClick={() => onChange(value)}
              aria-pressed={active}
              disabled={!option?.available}
            >
              <span>
                <b>{value}</b>
                <small>{difference > 0 ? `+ ${formatMoney(difference)}` : "Included"}</small>
              </span>
              {active ? <Check aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ServiceabilityMessage({ result }: { result: ServiceabilityResult }) {
  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  });
  const deliveryRange =
    result.deliveryStart && result.deliveryEnd
      ? `${dateFormatter.format(new Date(result.deliveryStart))}–${dateFormatter.format(
          new Date(result.deliveryEnd),
        )}`
      : null;

  return (
    <div
      className={`pdp-service-result${result.serviceable ? " is-serviceable" : ""}`}
      id="product-pin-result"
      role="status"
    >
      {result.serviceable ? (
        <CheckCircle2 aria-hidden="true" />
      ) : (
        <Truck aria-hidden="true" />
      )}
      <div>
        <strong>
          {result.serviceable
            ? "Delivery and installation available"
            : "We do not currently serve this PIN code"}
        </strong>
        {result.serviceable ? (
          <small>
            {deliveryRange ? `Delivery ${deliveryRange}` : "Delivery available"}
            {result.freeInstallation ? " · Free partner installation" : ""}
            {result.codEligible ? " · COD eligible" : ""}
          </small>
        ) : (
          <small>{result.message}</small>
        )}
      </div>
    </div>
  );
}
