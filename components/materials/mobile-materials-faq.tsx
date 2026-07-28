"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "What material is used in Wardro wardrobes?",
    answer:
      "Wardro uses selected engineered panels suited to each design. Exact material details are listed on the individual product page.",
  },
  {
    question: "How is the hardware selected?",
    answer:
      "Hinges, channels and fittings are matched to each model for smooth everyday operation and reliable alignment.",
  },
  {
    question: "What finishes are available?",
    answer:
      "Configured finishes currently include Walnut, Oak, White and Grey. Availability can vary by model.",
  },
  {
    question: "How should I care for the wardrobe?",
    answer:
      "Wipe surfaces with a soft, dry or slightly damp cloth. Avoid excess moisture, direct sunlight and abrasive cleaners.",
  },
  {
    question: "What does the 5-year warranty cover?",
    answer:
      "The 5-year warranty begins from the invoice date. Coverage and exclusions are described in the warranty terms supplied with your order.",
  },
];

export function MobileMaterialsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mq-mobile-faq" aria-labelledby="mq-mobile-faq-title">
      <h2 id="mq-mobile-faq-title">Frequently Asked Questions</h2>
      <div>
        {questions.map((item, index) => {
          const open = openIndex === index;
          return (
            <article className={open ? "is-open" : undefined} key={item.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`mq-mobile-faq-answer-${index}`}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h3>
              <div
                id={`mq-mobile-faq-answer-${index}`}
                hidden={!open}
              >
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

