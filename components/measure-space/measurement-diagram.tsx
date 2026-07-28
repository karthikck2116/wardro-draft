import type { MeasurementDiagramType } from "@/data/measure-space";

type MeasurementDiagramProps = {
  type: MeasurementDiagramType;
  label: string;
  compact?: boolean;
};

export function MeasurementDiagram({
  type,
  label,
  compact = false,
}: MeasurementDiagramProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      className={`measure-diagram${compact ? " is-compact" : ""}`}
      viewBox="0 0 132 82"
      role="img"
      aria-label={label}
    >
      {type === "width-height" && (
        <>
          <path {...common} d="M31 68V16h56v52M25 68h68" />
          <path {...common} d="M38 26h42M38 22l-7 4 7 4M80 22l7 4-7 4" />
          <path {...common} d="M99 21v40M95 27l4-7 4 7M95 55l4 7 4-7" />
          <text x="57" y="21" className="measure-diagram__label">
            W
          </text>
          <text x="105" y="44" className="measure-diagram__label">
            H
          </text>
        </>
      )}
      {type === "width" && (
        <>
          <path {...common} d="M17 64h98M26 64V24h80v40M42 64V33h48v31" />
          <path {...common} d="M32 17h68M39 13l-8 4 8 4M93 13l8 4-8 4" />
          <path {...common} d="M34 28h64M38 41h56M35 54h62" opacity=".55" />
          <text x="64" y="14" className="measure-diagram__label">
            W
          </text>
        </>
      )}
      {type === "height" && (
        <>
          <path {...common} d="M22 67h88M31 67V17h70v50M49 67V31h34v36" />
          <path {...common} d="M14 22v40M10 28l4-8 4 8M10 56l4 8 4-8" />
          <path {...common} d="M91 22v40" opacity=".55" />
          <text x="5" y="45" className="measure-diagram__label">
            H
          </text>
        </>
      )}
      {type === "depth" && (
        <>
          <path {...common} d="M25 18v50h77M37 59V32h42v27M79 32l14 9v18" />
          <path {...common} d="M39 73h51M45 69l-8 4 8 4M84 69l8 4-8 4" />
          <path {...common} d="M26 57h11v11" opacity=".7" />
          <text x="63" y="70" className="measure-diagram__label">
            D
          </text>
        </>
      )}
      {type === "clearance" && (
        <>
          <path {...common} d="M25 68V16h38v52M63 19l31 12v37M63 19v49" />
          <path {...common} d="M64 30c18 3 29 14 31 29" strokeDasharray="4 4" />
          <circle cx="61" cy="44" r="2.5" fill="currentColor" />
          <path {...common} d="M20 68h82" />
        </>
      )}
      {type === "access" && (
        <>
          <rect {...common} x="18" y="22" width="35" height="46" rx="2" />
          <path {...common} d="M26 34h19M26 57h19M35 22V11M30 11h10" />
          <circle cx="31" cy="47" r="2" fill="currentColor" />
          <circle cx="41" cy="47" r="2" fill="currentColor" />
          <path {...common} d="M66 68h47M70 68V58h11V48h11V38h11V28h10" />
          <path {...common} d="m95 19 9-8 9 8" />
        </>
      )}
    </svg>
  );
}

