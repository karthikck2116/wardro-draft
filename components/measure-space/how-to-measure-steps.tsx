import { measureSteps } from "@/data/measure-space";
import { MeasurementDiagram } from "./measurement-diagram";

export function HowToMeasureSteps() {
  return (
    <section
      id="how-to-measure"
      className="measure-content-section measure-how"
      aria-labelledby="how-to-measure-title"
    >
      <div className="measure-section-title">
        <p>Measure more than once</p>
        <h2 id="how-to-measure-title">How to measure (step-by-step)</h2>
      </div>
      <ol className="measure-how__list">
        {measureSteps.map((step) => (
          <li key={step.number}>
            <span className="measure-step-number">{step.number}</span>
            <MeasurementDiagram
              type={step.diagram}
              label={`Technical illustration for ${step.title.toLowerCase()}`}
            />
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

