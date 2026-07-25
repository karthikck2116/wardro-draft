import { FileText, Layers3, ShieldCheck, Wrench } from "lucide-react";
import {
  ComparisonFeatureRow,
  type ComparisonItem,
} from "@/components/home/comparison-feature-row";

const comparisonItems: ComparisonItem[] = [
  { label: "Premium engineered wood", icon: Layers3, alternativeValue: "Varies" },
  { label: "5-year warranty", icon: ShieldCheck, alternativeValue: "1–2 years" },
  { label: "Installations", icon: Wrench, alternativeValue: "Extra charges" },
  { label: "Clear material details", icon: FileText, alternativeValue: "Limited" },
];

export function ComparisonTable() {
  return (
    <div className="comparison-table-wrap discovery-stagger">
      <table className="comparison-table">
        <caption className="sr-only">
          Comparison of Wardro features with typical alternatives
        </caption>
        <colgroup>
          <col className="comparison-feature-column" />
          <col className="comparison-wardro-column" />
          <col className="comparison-alternative-column" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">What matters</th>
            <th scope="col">Wardro</th>
            <th scope="col">Typical alternative</th>
          </tr>
        </thead>
        <tbody>
          {comparisonItems.map((item) => (
            <ComparisonFeatureRow key={item.label} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
