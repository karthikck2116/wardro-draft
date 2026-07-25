import { ShieldCheck, Truck } from "lucide-react";

export function ProductTrustRow() {
  return (
    <div className="wardro-product-trust" aria-label="Product reassurance">
      <span>
        <ShieldCheck aria-hidden="true" />
        5-Year Warranty
      </span>
      <span>
        <Truck aria-hidden="true" />
        Free Delivery &amp; Installation
      </span>
    </div>
  );
}
