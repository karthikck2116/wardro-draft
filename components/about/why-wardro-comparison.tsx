import { Check } from "lucide-react";
import { aboutComparison } from "@/data/about-wardro";
import { AboutIcon } from "./about-icon";

export function WhyWardroComparison() {
  return (
    <section className="about-comparison" aria-labelledby="about-why-title">
      <div className="about-comparison-intro">
        <p className="about-eyebrow">Why Wardro</p>
        <h2 id="about-why-title">
          Made honestly.
          <br />
          Backed properly.
        </h2>
        <span className="about-rule" aria-hidden="true" />
        <p>
          We believe in transparent materials, dependable hardware and
          practical design. So you get wardrobes that look beautiful, function
          smoothly and last for years.
        </p>
      </div>
      <div className="about-comparison-table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">What matters</th>
              <th scope="col">Wardro</th>
              <th scope="col">Typical alternative</th>
            </tr>
          </thead>
          <tbody>
            {aboutComparison.map((item) => (
              <tr key={item.label}>
                <th scope="row">
                  <AboutIcon name={item.icon} />
                  <span>{item.label}</span>
                </th>
                <td>
                  <Check aria-label="Included" />
                </td>
                <td>{item.alternative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
