import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QualityIntro() {
  return (
    <div className="wardro-quality-intro">
      <p className="wardro-quality-eyebrow discovery-reveal-heading">
        Built to last. Made with care.
      </p>
      <i aria-hidden="true" />
      <h2 id="wardro-quality-title" className="discovery-reveal-heading">
        Quality you can
        <br />
        see.
      </h2>
      <p className="wardro-quality-copy discovery-reveal-heading">
        From premium boards to precision hardware — every detail is chosen to
        deliver strength, beauty and reliability.
      </p>
      <Link
        className="wardro-quality-cta discovery-reveal-heading"
        href="/materials-and-quality"
      >
        <span>Explore Materials &amp; Quality</span>
        <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
