"use client";

import { Mail } from "lucide-react";
import { type FormEvent, useState } from "react";

export function MobileMaterialsNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="mq-mobile-newsletter"
      aria-labelledby="mq-mobile-newsletter-title"
    >
      <span>
        <Mail aria-hidden="true" />
      </span>
      <div>
        <h2 id="mq-mobile-newsletter-title">Stay inspired</h2>
        <p>Get design tips and offers straight to your inbox.</p>
      </div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="mq-mobile-email">
          Email address
        </label>
        <input
          id="mq-mobile-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <p className="sr-only" role="status" aria-live="polite">
        {submitted ? "Thank you for subscribing." : ""}
      </p>
    </section>
  );
}

