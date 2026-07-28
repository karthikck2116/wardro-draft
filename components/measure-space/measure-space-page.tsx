import { HowToMeasureSteps } from "./how-to-measure-steps";
import { MeasurementFaq } from "./measurement-faq";
import { MeasurementReassurance } from "./measurement-reassurance";
import { MeasurementSectionNav } from "./measurement-section-nav";
import { MeasurementSupportCta } from "./measurement-support-cta";
import { MeasurementTips } from "./measurement-tips";
import { MeasureSpaceHero } from "./measure-space-hero";
import { WhatToMeasureGrid } from "./what-to-measure-grid";

export function MeasureSpacePage() {
  return (
    <div className="measure-space-page">
      <div className="measure-page-container measure-page-container--hero">
        <MeasureSpaceHero />
        <MeasurementSectionNav />
      </div>
      <div className="measure-page-container">
        <div className="measure-primary-grid">
          <WhatToMeasureGrid />
          <HowToMeasureSteps />
        </div>
        <MeasurementTips />
        <div className="measurement-help-grid">
          <MeasurementSupportCta />
          <MeasurementFaq />
        </div>
      </div>
      <div className="measure-page-container measure-page-container--reassurance">
        <MeasurementReassurance />
      </div>
    </div>
  );
}

