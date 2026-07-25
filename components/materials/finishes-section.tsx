import Image from "next/image";
import type { CSSProperties } from "react";
import { finishSamples, type FinishData } from "@/data/materials-quality";

function FinishSwatch({ finish }: { finish: FinishData }) {
  return (
    <figure className="mq-finish">
      <div
        className={
          finish.tone === "grey"
            ? "mq-finish-image mq-finish-image--grey"
            : "mq-finish-image"
        }
      >
        <Image
          src={finish.image}
          alt={finish.imageAlt}
          fill
          sizes="(max-width: 520px) 42vw, 150px"
          style={{ objectPosition: finish.objectPosition } as CSSProperties}
        />
      </div>
      <figcaption>{finish.name}</figcaption>
    </figure>
  );
}

export function FinishesSection() {
  return (
    <section className="mq-finishes-panel" aria-labelledby="finishes-title">
      <div className="mq-panel-heading">
        <h2 id="finishes-title">Thoughtful finishes for everyday living</h2>
        <p>
          We use durable, easy-to-maintain laminates in carefully selected
          finishes.
        </p>
      </div>
      <div className="mq-finish-grid">
        {finishSamples.map((finish) => (
          <FinishSwatch finish={finish} key={finish.name} />
        ))}
      </div>
      <p className="mq-finish-note">
        Finish samples are indicative; colour and grain can vary by screen and
        product model.
      </p>
    </section>
  );
}
