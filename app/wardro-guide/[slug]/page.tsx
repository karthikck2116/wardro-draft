import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticlePage } from "@/components/guide/guide-article-page";
import { guideArticles } from "@/data/wardro-guide";
import { commerce } from "@/lib/commerce/repository";

type GuideArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: GuideArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/wardro-guide/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/wardro-guide/${article.slug}`,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function GuideArticleRoute({
  params,
}: GuideArticleRouteProps) {
  const { slug } = await params;
  const article = guideArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const products = (await commerce.getHomepageData()).slice(0, 3);
  const relatedArticles = [
    ...guideArticles.filter(
      (item) =>
        item.slug !== article.slug &&
        item.categorySlug === article.categorySlug,
    ),
    ...guideArticles.filter(
      (item) =>
        item.slug !== article.slug &&
        item.categorySlug !== article.categorySlug,
    ),
  ].slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wardro Guide",
        item: "/wardro-guide",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `/wardro-guide/${article.slug}`,
      },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Organization", name: "Wardro" },
    publisher: { "@type": "Organization", name: "Wardro" },
    mainEntityOfPage: `/wardro-guide/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <GuideArticlePage
        article={article}
        relatedArticles={relatedArticles}
        products={products}
      />
    </>
  );
}
