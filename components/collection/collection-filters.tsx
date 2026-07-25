"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type CollectionFiltersProps = {
  selectedDoors?: string;
  selectedColour?: string;
  selectedMirror?: string;
  selectedSort?: string;
  selectedMaxPrice?: string;
  selectedStorageType?: string;
  resultCount: number;
};

type FilterFormProps = CollectionFiltersProps & {
  idPrefix: string;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  onApply: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  onClose?: () => void;
};

const doorOptions = ["1", "2", "3", "4", "5"];
const colours = [
  { label: "Walnut", value: "Walnut", colour: "#56331f" },
  { label: "Teak", value: "Teak", colour: "#895027" },
  { label: "Oak", value: "Oak", colour: "#bd8953" },
  { label: "White", value: "White", colour: "#f4f0e8" },
  { label: "Grey", value: "Grey", colour: "#9a9a96" },
];

function FilterForm({
  idPrefix,
  selectedDoors,
  selectedColour,
  selectedMirror,
  selectedSort,
  selectedStorageType,
  resultCount,
  maxPrice,
  setMaxPrice,
  onApply,
  onClear,
  onClose,
}: FilterFormProps) {
  return (
    <form className="wardro-filter-form" onSubmit={onApply}>
      <div className="wardro-filter-header">
        <button
          className="wardro-filter-back"
          type="button"
          onClick={onClose}
          aria-label="Close filters"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <div>
          <span>Refine your search</span>
          {onClose ? (
            <Dialog.Title asChild>
              <h2>Filters</h2>
            </Dialog.Title>
          ) : (
            <h2>Filters</h2>
          )}
        </div>
        <button className="wardro-filter-clear" type="button" onClick={onClear}>
          Clear all
        </button>
        {onClose ? (
          <Dialog.Close
            className="wardro-filter-close"
            type="button"
            aria-label="Close filters"
          >
            <X aria-hidden="true" />
          </Dialog.Close>
        ) : null}
      </div>

      <fieldset className="wardro-filter-mobile-sort">
        <legend>Sort by</legend>
        <select name="sort" defaultValue={selectedSort ?? "recommended"}>
          <option value="recommended">Popularity</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </fieldset>

      <fieldset className="wardro-filter-chip-group">
        <legend>Number of doors</legend>
        <div>
          {doorOptions.map((value) => {
            const inputId = `${idPrefix}-doors-${value}`;
            return (
              <label key={value} htmlFor={inputId}>
                <input
                  id={inputId}
                  type="radio"
                  name="doors"
                  value={value}
                  defaultChecked={selectedDoors === value}
                />
                <span>{value === "5" ? "5+ Doors" : `${value} Door${value === "1" ? "" : "s"}`}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="wardro-filter-colour-group">
        <legend>Colour</legend>
        <div>
          {colours.map((option) => {
            const inputId = `${idPrefix}-colour-${option.value}`;
            return (
              <label key={option.value} htmlFor={inputId} title={option.label}>
                <input
                  id={inputId}
                  type="radio"
                  name="colour"
                  value={option.value}
                  defaultChecked={selectedColour === option.value}
                />
                <span
                  className="wardro-filter-colour"
                  style={{ backgroundColor: option.colour }}
                  aria-hidden="true"
                />
                <span className="sr-only">{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="wardro-filter-standard-group">
        <legend>Mirror</legend>
        {[
          ["with", "With mirror"],
          ["without", "Without mirror"],
        ].map(([value, label]) => {
          const inputId = `${idPrefix}-mirror-${value}`;
          return (
            <label key={value} htmlFor={inputId}>
              <input
                id={inputId}
                type="radio"
                name="mirror"
                value={value}
                defaultChecked={selectedMirror === value}
              />
              <span className="wardro-filter-check" aria-hidden="true" />
              <span className="wardro-filter-label">{label}</span>
            </label>
          );
        })}
      </fieldset>

      <fieldset className="wardro-filter-price-group">
        <legend>Price range</legend>
        <input
          aria-label="Maximum price"
          type="range"
          min="5000"
          max="50000"
          step="1000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.currentTarget.value))}
        />
        <input type="hidden" name="maxPrice" value={maxPrice < 50000 ? maxPrice : ""} />
        <div>
          <span>₹5,000</span>
          <strong>{maxPrice >= 50000 ? "₹50,000+" : `₹${maxPrice.toLocaleString("en-IN")}`}</strong>
        </div>
      </fieldset>

      <fieldset className="wardro-filter-standard-group">
        <legend>Storage type</legend>
        {[
          ["hinged", "Hinged"],
          ["sliding", "Sliding"],
        ].map(([value, label]) => {
          const inputId = `${idPrefix}-storage-${value}`;
          return (
            <label key={value} htmlFor={inputId}>
              <input
                id={inputId}
                type="radio"
                name="storageType"
                value={value}
                defaultChecked={selectedStorageType === value}
              />
              <span className="wardro-filter-check" aria-hidden="true" />
              <span className="wardro-filter-label">{label}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="wardro-filter-actions">
        <button type="submit">Apply Filters ({resultCount})</button>
        <Link href="?" onClick={onClose}>Reset filters</Link>
      </div>
    </form>
  );
}

export function CollectionFilters(props: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(
    props.selectedMaxPrice ? Number(props.selectedMaxPrice) : 50000,
  );

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value && value !== "recommended") {
        query.set(key, value);
      }
    }
    router.push(query.size ? `${pathname}?${query.toString()}` : pathname);
    setOpen(false);
  };

  const clearFilters = () => {
    setMaxPrice(50000);
    router.push(pathname);
    setOpen(false);
  };

  const formProps = {
    ...props,
    maxPrice,
    setMaxPrice,
    onApply: applyFilters,
    onClear: clearFilters,
  };

  return (
    <>
      <aside className="wardro-filters wardro-filters--desktop" aria-label="Product filters">
        <FilterForm {...formProps} idPrefix="desktop" />
      </aside>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="wardro-mobile-filter-trigger" type="button">
            <SlidersHorizontal aria-hidden="true" />
            Filters
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="wardro-filter-dialog-overlay" />
          <Dialog.Content
            className="wardro-filters wardro-filters--mobile"
            aria-describedby={undefined}
          >
            <FilterForm
              {...formProps}
              idPrefix="mobile"
              onClose={() => setOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
