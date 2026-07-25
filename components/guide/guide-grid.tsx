import type { GuideArticle } from "@/data/wardro-guide";
import { GuideCard } from "./guide-card";

export function GuideGrid({ articles }: { articles: GuideArticle[] }) {
  return (
    <section className="guide-grid-section" aria-labelledby="guide-grid-title">
      <header className="guide-page-section-heading">
        <div>
          <p className="guide-page-eyebrow">Practical ideas for real homes</p>
          <h2 id="guide-grid-title">Explore Our Guides</h2>
        </div>
        <p>
          Buying advice, organisation ideas and simple care guidance in one
          place.
        </p>
      </header>
      {articles.length ? (
        <div className="guide-page-card-grid">
          {articles.map((article, index) => (
            <GuideCard article={article} index={index} key={article.slug} />
          ))}
        </div>
      ) : (
        <div className="guide-page-empty">
          <h3>No guides found</h3>
          <p>Choose another category to keep exploring.</p>
        </div>
      )}
    </section>
  );
}
