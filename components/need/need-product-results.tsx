"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NeedPageConfig } from "@/data/shop-by-need-pages";
import {
  filterNeedProducts,
  type NeedFilterState,
  type NeedProductSummary,
} from "@/lib/commerce/need-filtering";
import { NeedResultHeader } from "./need-result-header";
import { trackNeedEvent } from "./need-analytics";

const colours = [
  { label: "Walnut", colour: "#56331f" },
  { label: "Teak", colour: "#895027" },
  { label: "Oak", colour: "#bd8953" },
  { label: "White", colour: "#f4f0e8" },
  { label: "Grey", colour: "#9a9a96" },
];

function FilterChoice({
  checked,
  label,
  name,
  onChange,
  value,
}: {
  checked: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="need-filter-check" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function NeedFilterForm({
  config,
  initialFilters,
  onClose,
  products,
}: {
  config: NeedPageConfig;
  initialFilters: NeedFilterState;
  onClose?: () => void;
  products: NeedProductSummary[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [draft, setDraft] = useState(initialFilters);

  const liveCount = useMemo(
    () => filterNeedProducts(products, config, draft).length,
    [config, draft, products],
  );

  const update = (key: keyof NeedFilterState, value?: string) => {
    setDraft((current) => ({ ...current, [key]: value || undefined }));
  };

  const apply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URLSearchParams();
    if (draft.primary) query.set(config.primaryFilterKey, draft.primary);
    if (draft.doors && config.primaryFilterKey !== "doors") {
      query.set("doors", draft.doors);
    }
    if (draft.colour) query.set("colour", draft.colour);
    if (draft.mirror) query.set("mirror", draft.mirror);
    if (draft.maxPrice && Number(draft.maxPrice) < 50000) {
      query.set("maxPrice", draft.maxPrice);
    }
    const sort = searchParams.get("sort");
    if (sort) query.set("sort", sort);
    trackNeedEvent("need_filter_applied", {
      page: config.slug,
      results: liveCount,
    });
    router.push(query.size ? `${pathname}?${query.toString()}` : pathname);
    onClose?.();
  };

  const clear = () => {
    setDraft({});
    trackNeedEvent("need_filter_cleared", { page: config.slug });
    router.push(pathname);
    onClose?.();
  };

  const primaryLegend =
    config.primaryFilterKey === "doors"
      ? "Door Count"
      : config.primaryFilterKey === "room"
        ? "Room Size"
        : config.primaryFilterKey === "family"
          ? "Family Size"
          : config.primaryFilterKey === "storage"
            ? "Storage Type"
            : "Budget";

  return (
    <form className="need-filter-form" onSubmit={apply}>
      <header className="need-filter-header">
        {onClose ? (
          <button
            type="button"
            className="need-filter-back"
            onClick={onClose}
            aria-label="Close filters"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
        ) : null}
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
        <button type="button" className="need-filter-clear" onClick={clear}>
          Clear All
        </button>
        {onClose ? (
          <Dialog.Close className="need-filter-close" aria-label="Close filters">
            <X aria-hidden="true" />
          </Dialog.Close>
        ) : null}
      </header>

      <fieldset>
        <legend>{primaryLegend}</legend>
        <FilterChoice
          checked={!draft.primary}
          label="Any"
          name={`primary-${config.slug}`}
          value=""
          onChange={(value) => update("primary", value)}
        />
        {config.options.map((option) => (
          <FilterChoice
            checked={draft.primary === option.value}
            label={option.title}
            name={`primary-${config.slug}`}
            value={option.value}
            onChange={(value) => update("primary", value)}
            key={option.value}
          />
        ))}
      </fieldset>

      {config.secondaryFilters.includes("doors") &&
      config.primaryFilterKey !== "doors" ? (
        <fieldset>
          <legend>Door Count</legend>
          <div className="need-filter-chips">
            {["", "1", "2", "3", "4", "5"].map((value) => (
              <label key={value || "any"}>
                <input
                  type="radio"
                  name={`doors-${config.slug}`}
                  checked={(draft.doors ?? "") === value}
                  onChange={() => update("doors", value)}
                />
                <span>
                  {value
                    ? value === "5"
                      ? "5+"
                      : `${value} Door${value === "1" ? "" : "s"}`
                    : "Any"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {config.secondaryFilters.includes("colour") ? (
        <fieldset>
          <legend>Finish</legend>
          <div className="need-filter-colours">
            <label title="Any finish">
              <input
                type="radio"
                name={`colour-${config.slug}`}
                checked={!draft.colour}
                onChange={() => update("colour", "")}
              />
              <span className="is-any">Any</span>
            </label>
            {colours.map((option) => (
              <label title={option.label} key={option.label}>
                <input
                  type="radio"
                  name={`colour-${config.slug}`}
                  checked={draft.colour === option.label}
                  onChange={() => update("colour", option.label)}
                />
                <span
                  style={{ backgroundColor: option.colour }}
                  aria-hidden="true"
                />
                <span className="sr-only">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {config.secondaryFilters.includes("mirror") ? (
        <fieldset>
          <legend>With Mirror</legend>
          {[
            ["", "Any"],
            ["with", "With Mirror"],
            ["without", "Without Mirror"],
          ].map(([value, label]) => (
            <FilterChoice
              checked={(draft.mirror ?? "") === value}
              label={label}
              name={`mirror-${config.slug}`}
              value={value}
              onChange={(next) => update("mirror", next)}
              key={value || "any"}
            />
          ))}
        </fieldset>
      ) : null}

      {config.secondaryFilters.includes("price") ? (
        <fieldset className="need-filter-price">
          <legend>Price Range</legend>
          <input
            type="range"
            min="5000"
            max="50000"
            step="1000"
            value={draft.maxPrice ?? "50000"}
            onChange={(event) => update("maxPrice", event.currentTarget.value)}
            aria-label="Maximum selling price"
          />
          <div>
            <span>₹5,000</span>
            <strong>
              {Number(draft.maxPrice ?? "50000") >= 50000
                ? "₹50,000+"
                : `₹${Number(draft.maxPrice).toLocaleString("en-IN")}`}
            </strong>
          </div>
        </fieldset>
      ) : null}

      <div className="need-filter-actions">
        <button type="submit">
          {onClose ? "Apply Filters" : "Show Results"} ({liveCount})
        </button>
        <button type="button" onClick={clear}>
          Reset filters
        </button>
      </div>
    </form>
  );
}

export function NeedFilterSidebar(props: {
  config: NeedPageConfig;
  initialFilters: NeedFilterState;
  products: NeedProductSummary[];
}) {
  return (
    <aside className="need-filter-sidebar" aria-label="Product filters">
      <NeedFilterForm
        {...props}
        key={JSON.stringify(props.initialFilters)}
      />
    </aside>
  );
}

export function NeedMobileFilterDrawer({
  config,
  initialFilters,
  onOpenChange,
  open,
  products,
}: {
  config: NeedPageConfig;
  initialFilters: NeedFilterState;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  products: NeedProductSummary[];
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="need-filter-overlay" />
        <Dialog.Content
          className="need-filter-drawer"
          aria-describedby={undefined}
        >
          <NeedFilterForm
            config={config}
            initialFilters={initialFilters}
            key={JSON.stringify(initialFilters)}
            products={products}
            onClose={() => onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function NeedProductResults({
  children,
  config,
  emptyState,
  initialFilters,
  products,
  resultCount,
  selectedFilters,
}: {
  children: ReactNode;
  config: NeedPageConfig;
  emptyState?: ReactNode;
  initialFilters: NeedFilterState;
  products: NeedProductSummary[];
  resultCount: number;
  selectedFilters?: ReactNode;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!resultCount) {
      trackNeedEvent("need_no_results", { page: config.slug });
    }
  }, [config.slug, resultCount]);

  return (
    <>
      <NeedFilterSidebar
        config={config}
        initialFilters={initialFilters}
        products={products}
      />
      <section className="need-results" aria-label="Wardrobe products">
        <NeedResultHeader
          count={resultCount}
          selectedSort={initialFilters.sort}
          onOpenFilters={() => setFiltersOpen(true)}
        />
        {selectedFilters}
        <div
          className="need-product-grid"
          onClickCapture={(event) => {
            const target = event.target as HTMLElement;
            const card = target.closest<HTMLElement>(".wardro-product-card");
            if (card && target.closest("a")) {
              trackNeedEvent("need_product_clicked", {
                page: config.slug,
                product: card.getAttribute("aria-label") ?? "",
              });
            }
          }}
        >
          {children}
        </div>
        {emptyState}
      </section>
      <NeedMobileFilterDrawer
        config={config}
        initialFilters={initialFilters}
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        products={products}
      />
    </>
  );
}
