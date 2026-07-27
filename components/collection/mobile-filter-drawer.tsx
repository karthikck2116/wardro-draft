"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/commerce";
import {
  filterMobileCollection,
  type MobileCollectionFilters,
  type MobileDoorFilter,
} from "./mobile-collection-types";

const doorOptions: Array<{ label: string; value: MobileDoorFilter }> = [
  { label: "1 Door", value: "1" },
  { label: "2 Doors", value: "2" },
  { label: "3 Doors", value: "3" },
  { label: "4 Doors", value: "4" },
  { label: "Sliding", value: "sliding" },
];

const colours = [
  { label: "Walnut", colour: "#56331f" },
  { label: "Oak", colour: "#b77a42" },
  { label: "White", colour: "#f5f2eb" },
  { label: "Grey", colour: "#9a9a96" },
];

function Choice({
  checked,
  label,
  name,
  onChange,
}: {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
}) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="mobile-filter-check" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

export function MobileFilterDrawer({
  filters,
  onApply,
  onOpenChange,
  open,
  products,
}: {
  filters: MobileCollectionFilters;
  onApply: (filters: MobileCollectionFilters) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  products: Product[];
}) {
  const [draft, setDraft] = useState(filters);
  const count = useMemo(
    () => filterMobileCollection(products, draft).length,
    [draft, products],
  );

  const clear = () => {
    setDraft({ sort: filters.sort });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-collection-dialog-overlay" />
        <Dialog.Content
          className="mobile-collection-filter-drawer"
          aria-describedby={undefined}
        >
          <header>
            <Dialog.Close aria-label="Close filters">
              <ArrowLeft aria-hidden="true" />
            </Dialog.Close>
            <Dialog.Title>Filters</Dialog.Title>
            <button type="button" onClick={clear}>
              Clear All
            </button>
          </header>

          <div className="mobile-filter-body">
            <fieldset className="mobile-filter-door-options">
              <legend>Number of Doors</legend>
              <div>
                {doorOptions.map((option) => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name="mobile-doors"
                      checked={draft.doors === option.value}
                      onChange={() =>
                        setDraft((current) => ({
                          ...current,
                          doors: option.value,
                        }))
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mobile-filter-colours">
              <legend>Colour</legend>
              <div>
                <label title="Any colour">
                  <input
                    type="radio"
                    name="mobile-colour"
                    checked={!draft.colour}
                    onChange={() =>
                      setDraft((current) => ({
                        ...current,
                        colour: undefined,
                      }))
                    }
                  />
                  <span className="is-any">Any</span>
                </label>
                {colours.map((option) => (
                  <label title={option.label} key={option.label}>
                    <input
                      type="radio"
                      name="mobile-colour"
                      checked={draft.colour === option.label}
                      onChange={() =>
                        setDraft((current) => ({
                          ...current,
                          colour: option.label,
                        }))
                      }
                    />
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: option.colour }}
                    />
                    <span className="sr-only">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Mirror</legend>
              <Choice
                checked={!draft.mirror}
                label="Any"
                name="mobile-mirror"
                onChange={() =>
                  setDraft((current) => ({ ...current, mirror: undefined }))
                }
              />
              <Choice
                checked={draft.mirror === "with"}
                label="With Mirror"
                name="mobile-mirror"
                onChange={() =>
                  setDraft((current) => ({ ...current, mirror: "with" }))
                }
              />
              <Choice
                checked={draft.mirror === "without"}
                label="Without Mirror"
                name="mobile-mirror"
                onChange={() =>
                  setDraft((current) => ({ ...current, mirror: "without" }))
                }
              />
            </fieldset>

            <fieldset className="mobile-filter-price">
              <legend>Price Range</legend>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={draft.maxPrice ?? 50000}
                aria-label="Maximum selling price"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    maxPrice:
                      Number(event.currentTarget.value) < 50000
                        ? Number(event.currentTarget.value)
                        : undefined,
                  }))
                }
              />
              <div>
                <span>₹5,000</span>
                <strong>
                  {draft.maxPrice
                    ? `₹${draft.maxPrice.toLocaleString("en-IN")}`
                    : "₹50,000+"}
                </strong>
              </div>
            </fieldset>

            <fieldset>
              <legend>Storage Type</legend>
              <Choice
                checked={!draft.storageType}
                label="Any"
                name="mobile-storage"
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    storageType: undefined,
                  }))
                }
              />
              <Choice
                checked={draft.storageType === "hinged"}
                label="Hinged"
                name="mobile-storage"
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    storageType: "hinged",
                  }))
                }
              />
              <Choice
                checked={draft.storageType === "sliding"}
                label="Sliding"
                name="mobile-storage"
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    storageType: "sliding",
                  }))
                }
              />
            </fieldset>
          </div>

          <footer>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                onOpenChange(false);
              }}
            >
              Apply Filters ({count})
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

