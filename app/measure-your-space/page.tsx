import type { Metadata } from "next";
import { MeasureSpacePage } from "@/components/measure-space/measure-space-page";
import { measurementFaqs } from "@/data/measure-space";

export const metadata: Metadata = {
  title: "Measure Your Space",
  description:
    "Learn how to measure your room for a Wardro wardrobe, check access and compare planning ranges before ordering.",
};

export default function MeasureYourSpacePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: measurementFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <MeasureSpacePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

