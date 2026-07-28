import {
  BadgeCheck,
  CreditCard,
  Headset,
  Layers3,
  Truck,
  type LucideIcon,
} from "lucide-react";

const items: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
  mobile?: boolean;
}> = [
  {
    title: "5-Year Warranty",
    description: "On eligible Wardro wardrobes according to warranty terms",
    Icon: BadgeCheck,
    mobile: true,
  },
  {
    title: "Delivery & Installation",
    description: "Subject to product and PIN-code eligibility",
    Icon: Truck,
    mobile: true,
  },
  {
    title: "Quality Materials",
    description: "Selected for everyday use",
    Icon: Layers3,
    mobile: true,
  },
  {
    title: "Secure Payments",
    description: "Supported checkout methods",
    Icon: CreditCard,
  },
  {
    title: "Customer Support",
    description: "Help before and after purchase",
    Icon: Headset,
    mobile: true,
  },
];

export function MeasurementReassurance() {
  return (
    <section className="measurement-reassurance" aria-label="Wardro reassurance">
      {items.map(({ title, description, Icon, mobile }) => (
        <article className={mobile ? "is-mobile-priority" : undefined} key={title}>
          <Icon aria-hidden="true" />
          <span>
            <strong>{title}</strong>
            <small>{description}</small>
          </span>
        </article>
      ))}
    </section>
  );
}

