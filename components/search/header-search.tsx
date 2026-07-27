"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { guideArticles } from "@/data/wardro-guide";
import { products } from "@/data/mock/products";
import { getHeaderSearchResults } from "./search-data";
import { SearchPanelContents } from "./search-panels";

type HeaderSearchProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

function trackSearch(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("wardro:analytics", {
      detail: { event, ...payload },
    }),
  );
}

export function HeaderSearch({
  open,
  onOpenChange,
  triggerRef,
}: HeaderSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const cacheRef = useRef(new Map<string, ReturnType<typeof getHeaderSearchResults>>());
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const closeSearch = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("inline-search-open");
      if (wasOpenRef.current) {
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    document.body.classList.add("inline-search-open");
    trackSearch("search_open");

    const updatePanelTop = () => {
      const header = rootRef.current?.closest(".header");
      if (header instanceof HTMLElement && rootRef.current) {
        rootRef.current.style.setProperty(
          "--inline-search-panel-top",
          `${Math.max(0, header.getBoundingClientRect().bottom)}px`,
        );
      }
    };

    updatePanelTop();
    window.addEventListener("resize", updatePanelTop);
    window.addEventListener("scroll", updatePanelTop, { passive: true });
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.removeEventListener("resize", updatePanelTop);
      window.removeEventListener("scroll", updatePanelTop);
    };
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) trackSearch("search_typing", { query: query.trim() });
    }, 240);
    return () => window.clearTimeout(timer);
  }, [open, query]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !rootRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        closeSearch();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [closeSearch, open, triggerRef]);

  useEffect(() => {
    closeSearch();
    setQuery("");
    setDebouncedQuery("");
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => {
    const key = debouncedQuery.trim().toLowerCase();
    if (!key) return getHeaderSearchResults("", products, guideArticles);
    const cached = cacheRef.current.get(key);
    if (cached) return cached;
    const next = getHeaderSearchResults(debouncedQuery, products, guideArticles);
    cacheRef.current.set(key, next);
    return next;
  }, [debouncedQuery]);

  const loading =
    Boolean(query.trim()) && query.trim() !== debouncedQuery.trim();

  useEffect(() => {
    setActiveId(null);
  }, [query, results]);

  const setSearchQuery = useCallback((value: string) => {
    setQuery(value);
    setActiveId(null);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const submitFallbackSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    trackSearch("search_submit", { query: trimmed });
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [query, router]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter") {
      return;
    }

    const options = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("[data-search-option]") ?? [],
    );

    if (event.key === "Enter") {
      event.preventDefault();
      const active = activeId
        ? options.find((option) => option.id === activeId)
        : null;
      if (active) active.click();
      else submitFallbackSearch();
      return;
    }

    if (!options.length) return;
    event.preventDefault();
    const currentIndex = options.findIndex((option) => option.id === activeId);
    const nextIndex =
      event.key === "ArrowDown"
        ? currentIndex >= options.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex <= 0
          ? options.length - 1
          : currentIndex - 1;
    setActiveId(options[nextIndex].id);
    options[nextIndex].scrollIntoView({ block: "nearest" });
  };

  if (!open) return null;

  return (
    <div className="inline-header-search" ref={rootRef}>
      <form
        className="inline-search-bar"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submitFallbackSearch();
        }}
      >
        <button
          className="inline-search-back"
          type="button"
          onClick={closeSearch}
          aria-label="Close search"
        >
          <ArrowLeft aria-hidden />
        </button>
        <Search className="inline-search-input-icon" aria-hidden />
        <label className="sr-only" htmlFor="wardro-header-search">
          Search Wardro
        </label>
        <input
          ref={inputRef}
          id="wardro-header-search"
          type="search"
          role="combobox"
          value={query}
          placeholder="Search wardrobes, colours, sizes and guides…"
          autoComplete="off"
          spellCheck
          aria-autocomplete="list"
          aria-controls="wardro-header-search-results"
          aria-expanded="true"
          aria-activedescendant={activeId ?? undefined}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="inline-search-clear"
          type="button"
          onClick={() => (query ? setSearchQuery("") : closeSearch())}
          aria-label={query ? "Clear search" : "Close search"}
        >
          <X aria-hidden />
        </button>
      </form>

      <div
        ref={panelRef}
        id="wardro-header-search-results"
        className="inline-search-panel"
        role="listbox"
        aria-label={
          query.trim() ? `Search results for ${query}` : "Search suggestions"
        }
      >
        <p className="sr-only" aria-live="polite">
          {loading
            ? "Updating search results"
            : query.trim()
              ? `${results.totalProducts} product matches found`
              : "Popular searches, recommended products and helpful guides shown"}
        </p>
        <SearchPanelContents
          query={query}
          products={products}
          articles={guideArticles}
          results={results}
          loading={loading}
          activeId={activeId}
          onActiveChange={setActiveId}
          onSearch={setSearchQuery}
          onSelect={(kind, value) =>
            trackSearch("search_result_selected", {
              query: query.trim(),
              resultKind: kind,
              resultValue: value,
            })
          }
        />
      </div>
    </div>
  );
}
