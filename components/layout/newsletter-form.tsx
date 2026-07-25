"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="wardro-newsletter-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="footer-email">
        Email address
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit" aria-label="Subscribe to Wardro updates">
        <ArrowRight aria-hidden="true" />
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {submitted ? "Thank you for subscribing." : ""}
      </span>
    </form>
  );
}
