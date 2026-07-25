import { LockKeyhole, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { DiscoveryRevealSection } from "@/components/home/discovery-reveal-section";

type ReassuranceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const reassuranceItems: ReassuranceItem[] = [
  {
    title: "5-Year Warranty",
    description: "Automatic from invoice date",
    icon: ShieldCheck,
  },
  {
    title: "Free Delivery & Installation",
    description:
      "Free delivery and partner installation in eligible Bengaluru areas",
    icon: Truck,
  },
  {
    title: "Secure Checkout",
    description: "Cards, UPI, EMI and more",
    icon: LockKeyhole,
  },
];

export function ReassuranceStrip() {
  return (
    <DiscoveryRevealSection
      className="wardro-guide-container wardro-reassurance discovery-stagger"
      labelledBy="wardro-reassurance-title"
    >
      <h2 id="wardro-reassurance-title" className="sr-only">
        Wardro purchase reassurance
      </h2>
      {reassuranceItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            className="wardro-reassurance-item discovery-stagger"
            style={{ "--stagger-index": index } as React.CSSProperties}
            key={item.title}
          >
            <span className="wardro-reassurance-icon" aria-hidden="true">
              <Icon />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </DiscoveryRevealSection>
  );
}
