import { aboutTrustItems } from "@/data/about-wardro";
import { AboutIcon } from "./about-icon";

export function AboutTrustStrip() {
  return (
    <section className="about-trust" aria-label="Wardro promises">
      {aboutTrustItems.map((item) => (
        <article key={item.title}>
          <span>
            <AboutIcon name={item.icon} />
          </span>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
