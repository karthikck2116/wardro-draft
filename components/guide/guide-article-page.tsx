import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Clock3 } from "lucide-react";
import type { GuideArticle } from "@/data/wardro-guide";
import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";
import { GuideCard } from "./guide-card";

export function GuideArticlePage({
  article,
  relatedArticles,
  products,
}: {
  article: GuideArticle;
  relatedArticles: GuideArticle[];
  products: Product[];
}) {
  return (
    <article className="guide-article-page">
      <div className="guide-article-shell">
        <nav className="guide-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight aria-hidden="true" />
          <Link href="/wardro-guide">Wardro Guide</Link>
          <ChevronRight aria-hidden="true" />
          <span aria-current="page">{article.title}</span>
        </nav>
        <header className="guide-article-header">
          <p className="guide-page-eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <span className="guide-reading-time">
            <Clock3 aria-hidden="true" />
            {article.readingTime}
          </span>
        </header>
        <div className="guide-article-hero">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 860px) calc(100vw - 36px), 1220px"
          />
        </div>
        <div className="guide-article-layout">
          <aside className="guide-article-toc">
            <strong>In this guide</strong>
            <nav aria-label="Article contents">
              {article.sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>0{index + 1}</span>
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>
          <div className="guide-article-body">
            {article.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <div className="guide-article-next-step">
              <h2>Ready for the next step?</h2>
              <p>
                Measure your space or browse wardrobes with these ideas in
                mind.
              </p>
              <div>
                <Link href="/measure-your-space">Measure your space</Link>
                <Link href="/collections/all-wardrobes">
                  Browse wardrobes <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section
          className="guide-article-related"
          aria-labelledby="related-guides-title"
        >
          <header>
            <div>
              <p className="guide-page-eyebrow">Keep exploring</p>
              <h2 id="related-guides-title">Related guides</h2>
            </div>
            <Link href="/wardro-guide">
              All guides <ArrowRight aria-hidden="true" />
            </Link>
          </header>
          <div className="guide-page-card-grid">
            {relatedArticles.map((related, index) => (
              <GuideCard article={related} index={index} key={related.slug} />
            ))}
          </div>
        </section>
        {products.length ? (
          <section
            className="guide-article-products"
            aria-labelledby="guide-products-title"
          >
            <header>
              <div>
                <p className="guide-page-eyebrow">Thoughtful storage</p>
                <h2 id="guide-products-title">Wardrobes to explore</h2>
              </div>
              <Link href="/collections/all-wardrobes">
                View all <ArrowRight aria-hidden="true" />
              </Link>
            </header>
            <div>
              {products.map((product, index) => (
                <ProductCard
                  product={product}
                  context="related"
                  revealIndex={index}
                  key={product.id}
                />
              ))}
            </div>
          </section>
        ) : null}
        <Link className="guide-back-link" href="/wardro-guide">
          <ArrowLeft aria-hidden="true" />
          Back to Wardro Guide
        </Link>
      </div>
    </article>
  );
}
