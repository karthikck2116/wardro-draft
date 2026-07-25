import type { LucideIcon } from "lucide-react";

export type GuideBenefitData = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type GuideBenefitProps = {
  benefit: GuideBenefitData;
  index: number;
};

export function GuideBenefit({ benefit, index }: GuideBenefitProps) {
  const Icon = benefit.icon;

  return (
    <div
      className="wardro-guide-benefit discovery-stagger"
      style={{ "--stagger-index": index } as React.CSSProperties}
    >
      <span className="wardro-guide-benefit-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </div>
  );
}
