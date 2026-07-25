"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export function GuideNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="guide-newsletter" aria-labelledby="guide-newsletter-title">
      <span className="guide-newsletter-icon">
        <Mail aria-hidden="true" />
      </span>
      <div>
        <h2 id="guide-newsletter-title">
          Get smarter storage ideas in your inbox.
        </h2>
        <p>
          Receive Wardro buying guides, organisation tips and product updates.
        </p>
      </div>
      {submitted ? (
        <p className="guide-newsletter-success" role="status">
          Thank you — you’re on the list.
        </p>
      ) : (
        <form onSubmit={submit}>
          <label className="guide-newsletter-email">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </label>
          <label className="guide-newsletter-optin">
            <input type="checkbox" name="whatsapp" />
            <span>Send occasional tips on WhatsApp too</span>
          </label>
          <button type="submit">
            Stay Inspired <ArrowRight aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
