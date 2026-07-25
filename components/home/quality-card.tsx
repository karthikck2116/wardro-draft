import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type QualityCardData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  href: string;
};

type QualityCardProps = {
  card: QualityCardData;
  index: number;
};

export function QualityCard({ card, index }: QualityCardProps) {
  const Icon = card.icon;

  return (
    <Link
      className="wardro-quality-card discovery-stagger"
      href={card.href}
      aria-label={`${card.title}: ${card.description}`}
      style={{ "--stagger-index": index } as React.CSSProperties}
    >
      <span className="wardro-quality-card-image">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 900px) 45vw, (max-width: 1200px) 28vw, 330px"
        />
      </span>
      <span className="wardro-quality-card-badge" aria-hidden="true">
        <Icon />
      </span>
      <span className="wardro-quality-card-content">
        <strong>{card.title}</strong>
        <i aria-hidden="true" />
        <span>{card.description}</span>
      </span>
      <ArrowRight className="wardro-quality-card-arrow" aria-hidden="true" />
    </Link>
  );
}
