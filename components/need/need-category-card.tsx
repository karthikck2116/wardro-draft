import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { NeedCategory } from "@/data/shop-by-need";
import { NeedIcon } from "./need-icon";

export function NeedCategoryCard({
  category,
  index,
}: {
  category: NeedCategory;
  index: number;
}) {
  return (
    <article
      className="need-category-card"
      style={{ "--need-index": index } as CSSProperties}
    >
      <div className="need-category-copy">
        <span>
          <NeedIcon name={category.icon} />
        </span>
        <div>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </div>
      </div>
      <Link
        className="need-category-image"
        href={category.href}
        aria-label={`Explore ${category.title} wardrobe options`}
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 980px) 46vw, 23vw"
        />
      </Link>
      <Link className="need-category-link" href={category.href}>
        Explore options <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}
