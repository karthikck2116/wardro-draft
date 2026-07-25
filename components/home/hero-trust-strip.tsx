import { Award, Boxes, ShieldCheck, Wrench } from "lucide-react";

const items = [
  {
    Icon: Boxes,
    title: "Smarter organisation",
    description: "Designed for the way you live",
  },
  {
    Icon: ShieldCheck,
    title: "Strong construction",
    description: "Built to last for years",
  },
  {
    Icon: Award,
    title: "5-year warranty",
    description: "Assured quality you can trust",
  },
  {
    Icon: Wrench,
    title: "Partner installation",
    description: "Expert installation at your home",
  },
];

export function HeroTrustStrip() {
  return (
    <div className="hero-trust-shell">
      <div className="hero-trust-strip">
        {items.map(({ Icon, title, description }) => (
          <div className="hero-trust-item" key={title}>
            <span className="hero-trust-icon">
              <Icon aria-hidden="true" />
            </span>
            <span>
              <b>{title}</b>
              <small>{description}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
