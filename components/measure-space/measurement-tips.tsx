"use client";

import { useState } from "react";
import { CheckCircle2, Lightbulb, TriangleAlert } from "lucide-react";
import {
  beforeOrderingItems,
  measurementMistakes,
  spaceGuideRows,
} from "@/data/measure-space";

type TipsPanel = "before" | "guide" | "mistakes";

const tabs: Array<{ id: TipsPanel; label: string }> = [
  { id: "before", label: "Before You Order" },
  { id: "guide", label: "Space Guide" },
  { id: "mistakes", label: "Avoid These Mistakes" },
];

function BeforeOrderingChecklist() {
  return (
    <section
      className="measurement-tip-panel"
      aria-labelledby="before-ordering-title"
    >
      <h3 id="before-ordering-title">Before you order</h3>
      <ul className="measurement-check-list">
        {beforeOrderingItems.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecommendedSpaceGuide() {
  return (
    <section
      className="measurement-tip-panel measurement-space-guide"
      aria-labelledby="space-guide-title"
    >
      <h3 id="space-guide-title">Recommended space guide</h3>
      <p>
        Use these as quick planning references. Final suitability depends on the
        exact product dimensions and room conditions.
      </p>
      <div className="measurement-table-wrap">
        <table>
          <caption className="sr-only">
            Typical wardrobe-width planning ranges
          </caption>
          <thead>
            <tr>
              <th scope="col">Wardrobe</th>
              <th scope="col">Typical width</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            {spaceGuideRows.map((row) => (
              <tr key={row.type}>
                <th scope="row">{row.type}</th>
                <td>{row.width}</td>
                <td>{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="measurement-planning-note">
        <Lightbulb aria-hidden="true" />
        <span>
          Planning ranges only. Always confirm the exact dimensions shown on the
          product page before ordering.
        </span>
      </p>
    </section>
  );
}

function MeasurementMistakes() {
  return (
    <section
      className="measurement-tip-panel measurement-mistakes"
      aria-labelledby="mistakes-title"
    >
      <h3 id="mistakes-title">Common mistakes to avoid</h3>
      <ul>
        {measurementMistakes.map((item) => (
          <li key={item}>
            <TriangleAlert aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="measurement-planning-note">
        <Lightbulb aria-hidden="true" />
        <span>
          Always record the smallest width, height and depth measurements.
        </span>
      </p>
    </section>
  );
}

const panels: Record<TipsPanel, React.ReactNode> = {
  before: <BeforeOrderingChecklist />,
  guide: <RecommendedSpaceGuide />,
  mistakes: <MeasurementMistakes />,
};

export function MeasurementTips() {
  const [activePanel, setActivePanel] = useState<TipsPanel>("before");

  return (
    <section
      id="measurement-tips"
      className="measure-content-section measurement-tips"
      aria-labelledby="measurement-tips-title"
    >
      <h2 id="measurement-tips-title" className="sr-only">
        Measurement planning tips
      </h2>
      <div className="measurement-tips__desktop">
        <BeforeOrderingChecklist />
        <RecommendedSpaceGuide />
        <MeasurementMistakes />
      </div>
      <div className="measurement-tips__mobile">
        <div className="measurement-tips__tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              key={tab.id}
              aria-selected={activePanel === tab.id}
              aria-controls={`measurement-panel-${tab.id}`}
              id={`measurement-tab-${tab.id}`}
              onClick={() => setActivePanel(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`measurement-panel-${activePanel}`}
          aria-labelledby={`measurement-tab-${activePanel}`}
        >
          {panels[activePanel]}
        </div>
      </div>
    </section>
  );
}

