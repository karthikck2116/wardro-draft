"use client";

const finishColours: Record<string, string> = {
  Walnut: "#56331f",
  "Dark Walnut": "#382116",
  Oak: "#b77a42",
  Cream: "#e8dcc7",
  White: "#f5f2eb",
  Grey: "#9a9a96",
};

type ProductColourSwatchesProps = {
  colours: string[];
  selectedColour: string;
  onSelect: (colour: string) => void;
};

export function ProductColourSwatches({
  colours,
  selectedColour,
  onSelect,
}: ProductColourSwatchesProps) {
  return (
    <div className="wardro-product-swatches" aria-label="Available finishes">
      {colours.map((colour) => {
        const selected = colour === selectedColour;
        return (
          <button
            className={selected ? "is-selected" : undefined}
            type="button"
            key={colour}
            title={`${colour} finish`}
            aria-label={`${colour} finish${selected ? ", selected" : ""}`}
            aria-pressed={selected}
            onClick={() => onSelect(colour)}
          >
            <span
              aria-hidden="true"
              style={{ backgroundColor: finishColours[colour] ?? "#b7a89d" }}
            />
          </button>
        );
      })}
    </div>
  );
}
