import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { GuideArticle } from "@/data/wardro-guide";

export function FeaturedGuide({ article }: { article: GuideArticle }) {
  return (
    <section className="guide-featured" aria-labelledby="featured-guide-title">
      <div className="guide-featured-image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 820px) calc(100vw - 40px), 52vw"
        />
      </div>
      <div className="guide-featured-copy">
        <p className="guide-page-eyebrow">{article.category}</p>
        <h2 id="featured-guide-title">{article.title}</h2>
        <p>{article.excerpt}</p>
        <span className="guide-reading-time">
          <Clock3 aria-hidden="true" />
          {article.readingTime}
        </span>
        <Link href={`/wardro-guide/${article.slug}`}>
          Read Article <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
