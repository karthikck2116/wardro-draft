"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { measurementFaqs } from "@/data/measure-space";

export function MeasurementFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="measurement-faq"
      className="measurement-faq"
      aria-labelledby="measurement-faq-title"
    >
      <div className="measure-section-title">
        <p>Clear answers before you order</p>
        <h2 id="measurement-faq-title">Frequently Asked Questions</h2>
      </div>
      <div className="measurement-faq__list">
        {measurementFaqs.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `measurement-faq-answer-${index}`;
          return (
            <div className={isOpen ? "is-open" : undefined} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h3>
              <div id={answerId} hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

