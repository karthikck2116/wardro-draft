import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import {
  WardrobeDoorIcon,
  type WardrobeDoorIconType,
} from "./wardrobe-door-icon";

export type ImageSource = string | StaticImageData;

export type CategoryCardData = {
  title: string;
  description: string;
  href: string;
  image: ImageSource;
  imageAlt: string;
  iconType: WardrobeDoorIconType;
};

type CategoryCardProps = CategoryCardData & {
  index: number;
};

export function CategoryCard({
  title,
  description,
  href,
  image,
  imageAlt,
  iconType,
  index,
}: CategoryCardProps) {
  const revealStyle = {
    "--reveal-index": index,
  } as CSSProperties;

  return (
    <Link
      className="wardro-category-card discovery-stagger"
      href={href}
      aria-label={`${title}: ${description}`}
      style={revealStyle}
    >
      <span className="wardro-category-image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 78vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      </span>
      <span className="wardro-category-badge">
        <WardrobeDoorIcon type={iconType} />
      </span>
      <span className="wardro-category-copy">
        <b>{title}</b>
        <small>{description}</small>
        <span className="wardro-category-arrow">
          <ArrowRight aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
