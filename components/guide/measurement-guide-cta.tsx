import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, DoorOpen, Ruler } from "lucide-react";

const steps = [
  { label: "Measure wall width", icon: Ruler },
  { label: "Check available depth", icon: ArrowLeftRight },
  { label: "Confirm door and delivery access", icon: DoorOpen },
];

export function MeasurementGuideCTA() {
  return (
    <section
      className="guide-measurement"
      aria-labelledby="measurement-guide-title"
    >
      <div className="guide-measurement-copy">
        <p className="guide-page-eyebrow">A better fit starts here</p>
        <h2 id="measurement-guide-title">Measure once. Choose confidently.</h2>
        <p>
          Use our step-by-step measurement guide before selecting your
          wardrobe.
        </p>
        <ol>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.label}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                {step.label}
              </li>
            );
          })}
        </ol>
        <div className="guide-measurement-actions">
          <Link className="is-primary" href="/measure-your-space">
            Start Measurement Guide <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/collections/all-wardrobes">
            View Suitable Wardrobes
          </Link>
        </div>
      </div>
      <div className="guide-measurement-image">
        <Image
          src="/images/wardro-guide/measure-your-space.png"
          alt="Wardrobe and room plans with a measuring tape"
          fill
          sizes="(max-width: 820px) calc(100vw - 40px), 48vw"
        />
      </div>
    </section>
  );
}
