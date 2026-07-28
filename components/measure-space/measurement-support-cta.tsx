import Link from "next/link";
import { ArrowRight, Headset, NotebookTabs } from "lucide-react";

export function MeasurementSupportCta() {
  return (
    <section className="measurement-support" aria-labelledby="measurement-support-title">
      <span className="measurement-support__icon">
        <Headset aria-hidden="true" />
      </span>
      <div className="measurement-support__copy">
        <p>Expert guidance</p>
        <h2 id="measurement-support-title">Need help measuring?</h2>
        <span>
          Use the measurement guide or contact Wardro support if you are unsure
          about your room measurements.
        </span>
      </div>
      <div className="measurement-support__actions">
        <Link
          className="measurement-button measurement-button--primary"
          href="/wardro-guide/measure-your-space-before-buying"
        >
          <NotebookTabs aria-hidden="true" />
          View Measurement Guide
        </Link>
        <Link
          className="measurement-button measurement-button--secondary"
          href="/support/contact"
        >
          Contact Wardro <ArrowRight aria-hidden="true" />
        </Link>
        <Link className="measurement-support__product-link" href="/collections/all-wardrobes">
          Explore wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

