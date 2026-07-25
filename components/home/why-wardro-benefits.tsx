import { House, Layers3, ShieldCheck, Truck, type LucideIcon } from "lucide-react";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  { title: "5-Year Warranty", description: "Peace of mind, always", icon: ShieldCheck },
  {
    title: "Free Delivery & Installation",
    description: "Quick, seamless & free",
    icon: Truck,
  },
  { title: "Strong & Durable", description: "Built for everyday use", icon: Layers3 },
  { title: "Made for Indian Homes", description: "Thoughtfully designed", icon: House },
];

export function WhyWardroBenefits() {
  return (
    <div className="why-wardro-benefits" aria-label="Wardro benefits">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <div
            className="why-wardro-benefit discovery-stagger"
            style={{ "--stagger-index": index } as React.CSSProperties}
            key={benefit.title}
          >
            <Icon aria-hidden="true" />
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
