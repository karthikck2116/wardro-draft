import type { GuideArticle } from "@/data/wardro-guide";
import { getOfferPricing } from "@/lib/pricing";
import type { Product } from "@/types/commerce";

export type SearchCategoryResult = {
  title: string;
  href: string;
  count: number;
  keywords: string;
};

export type HeaderSearchResults = {
  suggestions: string[];
  categories: SearchCategoryResult[];
  products: Product[];
  articles: GuideArticle[];
  totalProducts: number;
};

const WORD_REPLACEMENTS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  walnet: "walnut",
  wallnut: "walnut",
  wardob: "wardrobe",
  wardobe: "wardrobe",
  slideing: "sliding",
};

export function normaliseSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/(\d)(door)/g, "$1 $2")
    .replace(/[–—-]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => WORD_REPLACEMENTS[part] ?? part)
    .join(" ")
    .trim();
}

function productText(product: Product) {
  const mirrorTerms = product.mirror ? "mirror mirrored" : "";
  return normaliseSearchText(
    [
      product.title,
      product.type,
      product.collection,
      `${product.doorCount} door`,
      product.colours.join(" "),
      product.dimensions,
      mirrorTerms,
      product.bestSeller ? "best seller" : "",
      product.readyToDispatch ? "ready to dispatch" : "",
    ].join(" "),
  );
}

function scoreText(candidate: string, query: string) {
  if (!query) return 0;
  if (candidate === query) return 120;

  const tokens = query.split(" ").filter(Boolean);
  const meaningfulTokens = tokens.filter(
    (token) =>
      !["wardrobe", "wardrobes", "with", "for", "and", "the", "a"].includes(
        token,
      ),
  );
  if (
    meaningfulTokens.length > 0 &&
    !meaningfulTokens.every((token) => candidate.includes(token))
  ) {
    return 0;
  }
  let score = candidate.includes(query) ? 70 : 0;
  const matchingTokens = tokens.filter((token) => candidate.includes(token));

  if (matchingTokens.length === tokens.length) score += 38;
  score += matchingTokens.length * 9;
  return score;
}

const CATEGORY_DEFINITIONS = [
  {
    title: "1-Door Wardrobes",
    href: "/collections/one-door-wardrobes",
    keywords: "1 door single compact wardrobe",
    matches: (product: Product) => product.doorCount === 1,
  },
  {
    title: "2-Door Wardrobes",
    href: "/collections/two-door-wardrobes",
    keywords: "2 door two door wardrobe",
    matches: (product: Product) => product.doorCount === 2,
  },
  {
    title: "3-Door Wardrobes",
    href: "/collections/three-door-wardrobes",
    keywords: "3 door three door wardrobe",
    matches: (product: Product) => product.doorCount === 3,
  },
  {
    title: "4-Door Wardrobes",
    href: "/collections/four-door-wardrobes",
    keywords: "4 door four door wardrobe maximum storage",
    matches: (product: Product) => product.doorCount === 4,
  },
  {
    title: "Sliding Wardrobes",
    href: "/collections/sliding-door-wardrobes",
    keywords: "sliding slider wardrobe compact room",
    matches: (product: Product) => product.type.toLowerCase() === "sliding",
  },
  {
    title: "Wardrobes with Mirror",
    href: "/collections/all-wardrobes?mirror=with",
    keywords: "wardrobe mirror mirrored",
    matches: (product: Product) =>
      product.mirror ||
      product.variants.some((variant) =>
        variant.mirror.toLowerCase().includes("with mirror"),
      ),
  },
  {
    title: "Best Sellers",
    href: "/collections/all-wardrobes?bestSeller=true",
    keywords: "best seller bestseller popular wardrobe",
    matches: (product: Product) => product.bestSeller,
  },
  {
    title: "Ready to Dispatch",
    href: "/collections/all-wardrobes?ready=true",
    keywords: "ready dispatch quick delivery wardrobe",
    matches: (product: Product) => product.readyToDispatch,
  },
] as const;

export function getSearchCategories(products: Product[]) {
  return CATEGORY_DEFINITIONS.map((category) => ({
    title: category.title,
    href: category.href,
    keywords: category.keywords,
    count: products.filter(category.matches).length,
  })).filter((category) => category.count > 0);
}

function buildSuggestions(query: string, products: Product[]) {
  const normalised = normaliseSearchText(query);
  const suggestions = new Set<string>();
  const matchingProducts = products
    .map((product) => ({
      product,
      score: scoreText(productText(product), normalised),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (normalised) suggestions.add(query.trim());

  const doorMatch = normalised.match(/\b([1-4])\s+door\b/);
  if (doorMatch) {
    suggestions.add(`${doorMatch[1]} door wardrobe`);
    suggestions.add(`${doorMatch[1]} door wardrobe with mirror`);
    suggestions.add(`wooden ${doorMatch[1]} door wardrobe`);
    suggestions.add(`${doorMatch[1]} door wardrobe for bedroom`);
  }

  if (normalised.includes("sliding")) {
    suggestions.add("sliding wardrobe with mirror");
    suggestions.add("sliding wardrobe for small room");
  }

  if (normalised.includes("mirror")) {
    suggestions.add("wardrobes with mirror");
  }

  matchingProducts.slice(0, 2).forEach(({ product }) => {
    suggestions.add(product.title);
  });

  return Array.from(suggestions).slice(0, 5);
}

function searchProducts(query: string, products: Product[]) {
  const normalised = normaliseSearchText(query);

  return products
    .map((product) => {
      const title = normaliseSearchText(product.title);
      let score = scoreText(productText(product), normalised);
      if (title === normalised) score += 100;
      else if (title.includes(normalised)) score += 45;
      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title));
}

function searchArticles(query: string, articles: GuideArticle[]) {
  const normalised = normaliseSearchText(query);

  return articles
    .map((article) => {
      const searchable = normaliseSearchText(
        [
          article.title,
          article.excerpt,
          article.category,
          ...article.sections.flatMap((section) => [
            section.heading,
            ...section.paragraphs,
            ...(section.bullets ?? []),
          ]),
        ].join(" "),
      );
      return { article, score: scoreText(searchable, normalised) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function getHeaderSearchResults(
  query: string,
  products: Product[],
  articles: GuideArticle[],
): HeaderSearchResults {
  const normalised = normaliseSearchText(query);
  if (!normalised) {
    return {
      suggestions: [],
      categories: [],
      products: [],
      articles: [],
      totalProducts: 0,
    };
  }

  const productMatches = searchProducts(query, products);
  const categories = getSearchCategories(products)
    .map((category) => ({
      category,
      score: scoreText(
        normaliseSearchText(`${category.title} ${category.keywords}`),
        normalised,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.category);

  const articleMatches = searchArticles(query, articles);

  return {
    suggestions: buildSuggestions(query, products),
    categories: categories.slice(0, 5),
    products: productMatches.slice(0, 4).map((entry) => entry.product),
    articles: articleMatches.slice(0, 4).map((entry) => entry.article),
    totalProducts: productMatches.length,
  };
}

export function formatSearchPrice(product: Product) {
  const pricing = getOfferPricing(
    product.price.amount,
    product.compareAt?.amount,
  );
  const format = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: product.price.currencyCode,
    maximumFractionDigits: 0,
  });

  return {
    selling: format.format(pricing.sellingPrice),
    compareAt:
      pricing.compareAtPrice === null
        ? null
        : format.format(pricing.compareAtPrice),
    discount: pricing.discountPercentage,
  };
}
