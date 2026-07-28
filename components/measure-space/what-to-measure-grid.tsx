import { measureItems } from "@/data/measure-space";
import { MeasurementDiagram } from "./measurement-diagram";

export function WhatToMeasureGrid() {
  return (
    <section
      id="what-to-measure"
      className="measure-content-section measure-what"
      aria-labelledby="what-to-measure-title"
    >
      <div className="measure-section-title">
        <p>Start with the room</p>
        <h2 id="what-to-measure-title">What to measure</h2>
      </div>
      <div className="measure-what__grid">
        {measureItems.map((item) => (
          <article className="measure-item-card" key={item.number}>
            <span className="measure-number-badge">{item.number}</span>
            <MeasurementDiagram
              type={item.diagram}
              label={`Diagram showing ${item.title.toLowerCase()}`}
              compact
            />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

