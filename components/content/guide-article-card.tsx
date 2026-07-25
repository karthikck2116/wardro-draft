import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type GuideArticleCardData = {
  number: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

type GuideArticleCardProps = {
  article: GuideArticleCardData;
  index: number;
};

export function GuideArticleCard({ article, index }: GuideArticleCardProps) {
  return (
    <Link
      href={article.href}
      className="wardro-guide-card discovery-stagger"
      aria-label={`${article.title}. Read more`}
      style={{ "--stagger-index": index } as React.CSSProperties}
    >
      <span className="wardro-guide-card-image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 900px) 45vw, 440px"
        />
        <span className="wardro-guide-number">{article.number}</span>
      </span>
      <span className="wardro-guide-card-copy">
        <span className="wardro-guide-category">{article.category}</span>
        <strong>{article.title}</strong>
        <span className="wardro-guide-excerpt">{article.excerpt}</span>
        <span className="wardro-guide-read-more">
          Read more <ArrowRight aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
