"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  DoorOpen,
  House,
  Layers3,
  Ruler,
  Search,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { GuideArticle } from "@/data/wardro-guide";
import type { Product } from "@/types/commerce";
import {
  formatSearchPrice,
  getSearchCategories,
  type HeaderSearchResults,
} from "./search-data";

type SearchPanelsProps = {
  query: string;
  products: Product[];
  articles: GuideArticle[];
  results: HeaderSearchResults;
  loading: boolean;
  activeId: string | null;
  onActiveChange: (id: string) => void;
  onSearch: (query: string) => void;
  onSelect: (kind: string, value: string) => void;
};

const popularSearches = [
  "2-Door Wardrobes",
  "3-Door Wardrobes",
  "Sliding Wardrobes",
  "Wardrobes with Mirror",
  "Best Sellers",
  "Ready to Dispatch",
];

const needLinks = [
  {
    title: "Small Rooms",
    href: "/collections/all-wardrobes?shopBy=room-size",
    icon: Ruler,
  },
  {
    title: "Family Storage",
    href: "/collections/all-wardrobes?shopBy=family-size",
    icon: UsersRound,
  },
  {
    title: "Maximum Storage",
    href: "/collections/four-door-wardrobes",
    icon: Layers3,
  },
  {
    title: "By Budget",
    href: "/collections/all-wardrobes?shopBy=budget",
    icon: WalletCards,
  },
  {
    title: "Rental Friendly",
    href: "/shop-by-need#rental-friendly",
    icon: House,
  },
];

function optionProps(
  id: string,
  activeId: string | null,
  onActiveChange: (id: string) => void,
) {
  return {
    id,
    role: "option" as const,
    "aria-selected": activeId === id,
    "data-search-option": true,
    className: `inline-search-option${activeId === id ? " is-active" : ""}`,
    onMouseEnter: () => onActiveChange(id),
  };
}

function SearchSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`inline-search-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ProductResult({
  product,
  id,
  activeId,
  onActiveChange,
  onSelect,
}: {
  product: Product;
  id: string;
  activeId: string | null;
  onActiveChange: (id: string) => void;
  onSelect: (kind: string, value: string) => void;
}) {
  const price = formatSearchPrice(product);

  return (
    <Link
      href={`/products/${product.handle}`}
      {...optionProps(id, activeId, onActiveChange)}
      className={`inline-search-product inline-search-option${
        activeId === id ? " is-active" : ""
      }`}
      onClick={() => onSelect("product", product.handle)}
    >
      <span className="inline-search-product-image">
        <Image
          src={product.featuredImage}
          alt=""
          fill
          sizes="72px"
        />
      </span>
      <span className="inline-search-product-copy">
        <strong>{product.title}</strong>
        <span>
          <b>{price.selling}</b>
          {price.compareAt ? <del>{price.compareAt}</del> : null}
          {price.discount ? <em>{price.discount}% OFF</em> : null}
        </span>
      </span>
    </Link>
  );
}

export function DiscoverySearchPanel({
  products,
  articles,
  activeId,
  onActiveChange,
  onSearch,
  onSelect,
}: Omit<
  SearchPanelsProps,
  "query" | "results" | "loading"
>) {
  const recommended = [...products]
    .sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller))
    .slice(0, 4);
  const helpful = [
    "how-to-choose-the-right-wardrobe",
    "measure-your-space-before-buying",
    "sliding-vs-hinged-wardrobes",
  ]
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is GuideArticle => Boolean(article));

  return (
    <div className="inline-search-grid inline-search-discovery-grid">
      <SearchSection title="Popular searches">
        <div className="inline-search-chips">
          {popularSearches.map((term, index) => {
            const id = `search-popular-${index}`;
            return (
              <button
                key={term}
                type="button"
                {...optionProps(id, activeId, onActiveChange)}
                onClick={() => {
                  onSelect("popular_search", term);
                  onSearch(term);
                }}
              >
                {term}
              </button>
            );
          })}
        </div>
      </SearchSection>

      <SearchSection title="Shop by need">
        <div className="inline-search-link-list">
          {needLinks.map(({ title, href, icon: Icon }, index) => {
            const id = `search-need-${index}`;
            return (
              <Link
                key={title}
                href={href}
                {...optionProps(id, activeId, onActiveChange)}
                onClick={() => onSelect("shop_by_need", title)}
              >
                <span className="inline-search-mini-icon">
                  <Icon aria-hidden />
                </span>
                <span>{title}</span>
              </Link>
            );
          })}
        </div>
        <Link className="inline-search-section-cta" href="/shop-by-need">
          View all <ArrowRight aria-hidden />
        </Link>
      </SearchSection>

      <SearchSection title="Recommended products" className="inline-search-products-section">
        <div className="inline-search-product-list">
          {recommended.map((product, index) => (
            <ProductResult
              key={product.id}
              product={product}
              id={`search-recommended-${index}`}
              activeId={activeId}
              onActiveChange={onActiveChange}
              onSelect={onSelect}
            />
          ))}
        </div>
      </SearchSection>

      <SearchSection title="Helpful guides">
        <div className="inline-search-link-list inline-search-guide-list">
          {helpful.map((article, index) => {
            const id = `search-helpful-${index}`;
            return (
              <Link
                key={article.slug}
                href={`/wardro-guide/${article.slug}`}
                {...optionProps(id, activeId, onActiveChange)}
                onClick={() => onSelect("guide", article.slug)}
              >
                <span className="inline-search-mini-icon">
                  <BookOpenText aria-hidden />
                </span>
                <span>{article.title}</span>
              </Link>
            );
          })}
        </div>
        <Link className="inline-search-section-cta" href="/wardro-guide">
          View all guides <ArrowRight aria-hidden />
        </Link>
      </SearchSection>
    </div>
  );
}

export function LiveSearchPanel({
  query,
  products,
  results,
  loading,
  activeId,
  onActiveChange,
  onSearch,
  onSelect,
}: Omit<SearchPanelsProps, "articles">) {
  const hasResults =
    results.suggestions.length > 0 ||
    results.categories.length > 0 ||
    results.products.length > 0 ||
    results.articles.length > 0;

  if (!hasResults && !loading) {
    return (
      <div className="inline-search-empty">
        <span className="inline-search-empty-icon">
          <Search aria-hidden />
        </span>
        <h2>No close matches for “{query}”</h2>
        <p>Try another colour, door count, size or wardrobe type.</p>
        <div>
          <button type="button" onClick={() => onSearch("Wardrobes with Mirror")}>
            Wardrobes with mirror
          </button>
          <button type="button" onClick={() => onSearch("Best Sellers")}>
            Best sellers
          </button>
          <Link href="/collections/all-wardrobes">Browse all wardrobes</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="inline-search-loading" role="status">
          <span />
          Updating results
        </div>
      ) : null}
      <div
        className="inline-search-grid inline-search-live-grid"
        aria-busy={loading}
      >
        <SearchSection title="Suggestions">
          <div className="inline-search-suggestion-list">
            {results.suggestions.map((suggestion, index) => {
              const id = `search-suggestion-${index}`;
              return (
                <button
                  key={suggestion}
                  type="button"
                  {...optionProps(id, activeId, onActiveChange)}
                  onClick={() => {
                    onSelect("suggestion", suggestion);
                    onSearch(suggestion);
                  }}
                >
                  <Search aria-hidden />
                  <span>{suggestion}</span>
                </button>
              );
            })}
          </div>
        </SearchSection>

        <SearchSection title="Categories">
          <div className="inline-search-category-list">
            {results.categories.map((category, index) => {
              const id = `search-category-${index}`;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  {...optionProps(id, activeId, onActiveChange)}
                  onClick={() => onSelect("category", category.title)}
                >
                  <span className="inline-search-mini-icon">
                    <DoorOpen aria-hidden />
                  </span>
                  <span>{category.title}</span>
                  <small>{category.count}</small>
                </Link>
              );
            })}
          </div>
          <Link
            className="inline-search-section-cta"
            href="/collections/all-wardrobes"
          >
            View all categories <ArrowRight aria-hidden />
          </Link>
        </SearchSection>

        <SearchSection
          title={`Product results (${results.totalProducts})`}
          className="inline-search-products-section"
        >
          <div className="inline-search-product-list">
            {results.products.map((product, index) => (
              <ProductResult
                key={product.id}
                product={product}
                id={`search-product-${index}`}
                activeId={activeId}
                onActiveChange={onActiveChange}
                onSelect={onSelect}
              />
            ))}
          </div>
          {results.totalProducts > 0 ? (
            <Link
              className="inline-search-section-cta"
              href={`/search?q=${encodeURIComponent(query)}`}
            >
              View all products <ArrowRight aria-hidden />
            </Link>
          ) : null}
        </SearchSection>

        <SearchSection title="Content matches">
          <div className="inline-search-link-list inline-search-guide-list">
            {results.articles.map((article, index) => {
              const id = `search-article-${index}`;
              return (
                <Link
                  key={article.slug}
                  href={`/wardro-guide/${article.slug}`}
                  {...optionProps(id, activeId, onActiveChange)}
                  onClick={() => onSelect("article", article.slug)}
                >
                  <span className="inline-search-mini-icon">
                    <BookOpenText aria-hidden />
                  </span>
                  <span>{article.title}</span>
                </Link>
              );
            })}
          </div>
          {results.articles.length > 0 ? (
            <Link className="inline-search-section-cta" href="/wardro-guide">
              View all articles <ArrowRight aria-hidden />
            </Link>
          ) : null}
        </SearchSection>
      </div>
    </>
  );
}

export function SearchPanelContents(props: SearchPanelsProps) {
  if (!props.query.trim()) {
    return (
      <DiscoverySearchPanel
        products={props.products}
        articles={props.articles}
        activeId={props.activeId}
        onActiveChange={props.onActiveChange}
        onSearch={props.onSearch}
        onSelect={props.onSelect}
      />
    );
  }

  return (
    <LiveSearchPanel
      query={props.query}
      products={props.products}
      results={props.results}
      loading={props.loading}
      activeId={props.activeId}
      onActiveChange={props.onActiveChange}
      onSearch={props.onSearch}
      onSelect={props.onSelect}
    />
  );
}

export function getDiscoveryCategoryCount(products: Product[]) {
  return getSearchCategories(products).length;
}
