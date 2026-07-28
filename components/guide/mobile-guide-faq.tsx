"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { GuideFaq } from "@/data/wardro-guide";

export function MobileGuideFaq({ faqs }: { faqs: GuideFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mobile-guide-faq" aria-labelledby="mobile-guide-faq-title">
      <p className="mobile-guide-eyebrow">Popular wardrobe questions</p>
      <h2 id="mobile-guide-faq-title">Popular Wardrobe Questions</h2>
      <div className="mobile-guide-faq-list">
        {faqs.slice(0, 6).map((faq, index) => {
          const open = openIndex === index;
          const panelId = `mobile-guide-faq-panel-${index}`;
          return (
            <article key={faq.question} className={open ? "is-open" : undefined}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} hidden={!open}>
                <p>{faq.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
