import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { WardrobeDoorIcon } from "./wardrobe-door-icon";

type NeedIcon =
  | { icon: LucideIcon; customIcon?: never }
  | { icon?: never; customIcon: "doors" };

export type NeedCardData = {
  title: string;
  description: string;
  href: string;
} & NeedIcon;

type NeedCardProps = NeedCardData & {
  index: number;
};

export function NeedCard({
  title,
  description,
  href,
  icon: Icon,
  customIcon,
  index,
}: NeedCardProps) {
  const revealStyle = {
    "--reveal-index": index,
  } as CSSProperties;

  return (
    <Link
      className="wardro-need-card discovery-stagger"
      href={href}
      aria-label={`${title}: ${description}`}
      style={revealStyle}
    >
      <span className="wardro-need-icon">
        {customIcon === "doors" ? (
          <WardrobeDoorIcon type="two-door" />
        ) : Icon ? (
          <Icon aria-hidden="true" />
        ) : null}
      </span>
      <span className="wardro-need-copy">
        <b>{title}</b>
        <small>{description}</small>
      </span>
      <span className="wardro-need-arrow">
        <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
}
