import type { Metadata } from "next";
import {
  guideCategories,
  guideFaqs,
  type GuideCategorySlug,
} from "@/data/wardro-guide";
import { WardroGuidePage } from "@/components/guide/wardro-guide-page";

export const metadata: Metadata = {
  title: "Wardro Guide | Wardrobe Buying, Storage & Care Ideas",
  description:
    "Explore practical wardrobe buying guides, storage ideas, measurement tips and care advice from Wardro.",
  alternates: {
    canonical: "/wardro-guide",
  },
  openGraph: {
    title: "Wardro Guide | Wardrobe Buying, Storage & Care Ideas",
    description:
      "Explore practical wardrobe buying guides, storage ideas, measurement tips and care advice from Wardro.",
    type: "website",
    url: "/wardro-guide",
    images: [
      {
        url: "/images/wardro-guide/guide-hero.png",
        alt: "The Wardro Guide",
      },
    ],
  },
};

type WardroGuideRouteProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function WardroGuideRoute({
  searchParams,
}: WardroGuideRouteProps) {
  const query = await searchParams;
  const activeCategory = guideCategories.some(
    (category) => category.slug === query.category,
  )
    ? (query.category as GuideCategorySlug)
    : "all-guides";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wardro Guide",
        item: "/wardro-guide",
      },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WardroGuidePage activeCategory={activeCategory} />
    </>
  );
}
