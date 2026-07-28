"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export function MobileGuideNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      className="mobile-guide-newsletter"
      aria-labelledby="mobile-guide-newsletter-title"
    >
      <span className="mobile-guide-newsletter-icon">
        <Mail aria-hidden="true" />
      </span>
      <div className="mobile-guide-newsletter-copy">
        <p className="mobile-guide-eyebrow">Stay inspired</p>
        <h2 id="mobile-guide-newsletter-title">
          Get smarter storage ideas in your inbox.
        </h2>
        <p>Tips, guides and inspiration straight to you.</p>
      </div>
      {submitted ? (
        <p className="mobile-guide-newsletter-success" role="status">
          Thank you — you&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
            />
          </label>
          <button type="submit">
            Subscribe <ArrowRight aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
