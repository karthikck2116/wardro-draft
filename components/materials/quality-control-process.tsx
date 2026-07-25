import { ArrowRight, ShieldCheck } from "lucide-react";
import { qualityProcess } from "@/data/materials-quality";
import { MaterialIcon } from "./material-icon";

export function QualityControlProcess() {
  return (
    <section className="mq-process-panel" aria-labelledby="quality-process-title">
      <div className="mq-panel-heading">
        <h2 id="quality-process-title">Built to last. Made for your home.</h2>
        <p>
          Every Wardro wardrobe goes through multiple quality checks to ensure
          careful assembly, safe operation and a considered finish.
        </p>
      </div>
      <ol className="mq-process-list">
        {qualityProcess.map((step, index) => (
          <li key={step.title}>
            <span className="mq-process-step">
              <MaterialIcon name={step.icon} />
              <strong>{step.title}</strong>
            </span>
            {index < qualityProcess.length - 1 ? (
              <ArrowRight className="mq-process-arrow" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mq-process-assurance">
        <ShieldCheck aria-hidden="true" />
        <strong>Quality you can trust, every single time.</strong>
      </div>
    </section>
  );
}
