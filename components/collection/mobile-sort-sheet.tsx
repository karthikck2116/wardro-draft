"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import type { MobileCollectionSort } from "./mobile-collection-types";

export const sortOptions: Array<{
  label: string;
  shortLabel: string;
  value: MobileCollectionSort;
}> = [
  { label: "Featured", shortLabel: "Featured", value: "featured" },
  { label: "Best Selling", shortLabel: "Best Selling", value: "best-selling" },
  { label: "Price: Low to High", shortLabel: "Price: Low", value: "price-low" },
  { label: "Price: High to Low", shortLabel: "Price: High", value: "price-high" },
  { label: "Newest", shortLabel: "Newest", value: "newest" },
  { label: "Discount", shortLabel: "Discount", value: "discount" },
];

export function MobileSortSheet({
  onChange,
  onOpenChange,
  open,
  selected,
}: {
  onChange: (value: MobileCollectionSort) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  selected: MobileCollectionSort;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-collection-dialog-overlay" />
        <Dialog.Content
          className="mobile-sort-sheet"
          aria-describedby={undefined}
        >
          <header>
            <Dialog.Title>Sort wardrobes</Dialog.Title>
            <Dialog.Close aria-label="Close sort options">
              <X aria-hidden="true" />
            </Dialog.Close>
          </header>
          <div role="radiogroup" aria-label="Sort wardrobes">
            {sortOptions.map((option) => (
              <button
                type="button"
                role="radio"
                aria-checked={selected === option.value}
                onClick={() => {
                  onChange(option.value);
                  onOpenChange(false);
                }}
                key={option.value}
              >
                <span>{option.label}</span>
                {selected === option.value ? <Check aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

