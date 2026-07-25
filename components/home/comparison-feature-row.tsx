import { Check, type LucideIcon } from "lucide-react";

export type ComparisonItem = {
  label: string;
  icon: LucideIcon;
  alternativeValue: string;
};

type ComparisonFeatureRowProps = {
  item: ComparisonItem;
};

export function ComparisonFeatureRow({ item }: ComparisonFeatureRowProps) {
  const Icon = item.icon;

  return (
    <tr>
      <th scope="row" data-label="What matters">
        <span className="comparison-feature-label">
          <Icon aria-hidden="true" />
          <span>{item.label}</span>
        </span>
      </th>
      <td className="comparison-wardro-value" data-label="Wardro">
        <Check aria-hidden="true" />
        <span className="sr-only">Included</span>
      </td>
      <td data-label="Typical alternative">{item.alternativeValue}</td>
    </tr>
  );
}
