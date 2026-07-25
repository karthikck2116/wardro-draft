"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { GuideFaq as GuideFaqData } from "@/data/wardro-guide";

export function GuideFAQ({ faqs }: { faqs: GuideFaqData[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="guide-faq" aria-labelledby="guide-faq-title">
      <header className="guide-page-section-heading">
        <div>
          <p className="guide-page-eyebrow">Answers before you choose</p>
          <h2 id="guide-faq-title">Popular Wardrobe Questions</h2>
        </div>
        <p>Clear starting points for the questions shoppers ask most often.</p>
      </header>
      <div className="guide-faq-list">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <article className={open ? "is-open" : undefined} key={faq.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`guide-faq-answer-${index}`}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h3>
              <div
                id={`guide-faq-answer-${index}`}
                hidden={!open}
                role="region"
              >
                <p>{faq.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
