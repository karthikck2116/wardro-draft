import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { CSSProperties } from "react";
import type { GuideArticle } from "@/data/wardro-guide";

export function GuideCard({
  article,
  index,
}: {
  article: GuideArticle;
  index: number;
}) {
  return (
    <article
      className="guide-page-card"
      style={{ "--guide-index": index } as CSSProperties}
    >
      <Link
        className="guide-page-card-image"
        href={`/wardro-guide/${article.slug}`}
        aria-label={`Read ${article.title}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 980px) 46vw, 31vw"
        />
      </Link>
      <div className="guide-page-card-copy">
        <span className="guide-page-category">{article.category}</span>
        <Link href={`/wardro-guide/${article.slug}`}>
          <h3>{article.title}</h3>
        </Link>
        <p>{article.excerpt}</p>
        <div className="guide-page-card-footer">
          <span>
            <Clock3 aria-hidden="true" />
            {article.readingTime}
          </span>
          <Link href={`/wardro-guide/${article.slug}`}>
            Read more <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
