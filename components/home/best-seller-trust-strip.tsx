import { House, Layers3, ShieldCheck, Truck } from "lucide-react";
import type { CSSProperties } from "react";

const trustItems = [
  {
    Icon: ShieldCheck,
    title: "5-Year Warranty",
    description: "Peace of mind, assured",
  },
  {
    Icon: Truck,
    title: "Free Delivery & Installation",
    description: "Hassle-free, expert service",
  },
  {
    Icon: Layers3,
    title: "Strong & Durable",
    description: "Built for everyday use",
  },
  {
    Icon: House,
    title: "Made for Indian Homes",
    description: "Thoughtfully designed",
  },
];

export function BestSellerTrustStrip() {
  const revealStyle = { "--reveal-index": 5 } as CSSProperties;

  return (
    <div
      className="best-seller-trust-strip discovery-stagger"
      style={revealStyle}
      aria-label="Wardro product assurances"
    >
      {trustItems.map(({ Icon, title, description }) => (
        <div className="best-seller-trust-item" key={title}>
          <span className="best-seller-trust-icon">
            <Icon aria-hidden="true" />
          </span>
          <span>
            <b>{title}</b>
            <small>{description}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
