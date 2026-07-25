import { ArrowRight } from "lucide-react";
import { buildSteps } from "@/data/about-wardro";
import { AboutIcon } from "./about-icon";

export function HowWeBuild() {
  return (
    <section className="about-build" aria-labelledby="about-build-title">
      <p id="about-build-title" className="about-eyebrow">
        How we build
      </p>
      <ol>
        {buildSteps.map((step, index) => (
          <li key={step.title}>
            <article>
              <span className="about-build-number">{step.number}</span>
              <span className="about-build-icon">
                <AboutIcon name={step.icon} />
              </span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
            {index < buildSteps.length - 1 ? (
              <ArrowRight className="about-build-arrow" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
