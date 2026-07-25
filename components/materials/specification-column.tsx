import { CheckCircle2 } from "lucide-react";
import type { SpecificationColumnData } from "@/data/materials-quality";

export function SpecificationColumn({
  column,
}: {
  column: SpecificationColumnData;
}) {
  return (
    <section className="mq-spec-column">
      <h2>{column.title}</h2>
      <ul>
        {column.items.map((item) => (
          <li key={item}>
            <span>
              <CheckCircle2 aria-hidden="true" />
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
