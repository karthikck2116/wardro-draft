function LeafMotif({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      className={mirrored ? "guide-leaf-motif is-mirrored" : "guide-leaf-motif"}
      viewBox="0 0 78 24"
      aria-hidden="true"
    >
      <path d="M4 12h70M19 12c-3-7-7-8-10-8 0 5 3 8 10 8ZM27 12c-1-6-4-9-8-10 0 6 2 9 8 10ZM19 12c-3 7-7 8-10 8 0-5 3-8 10-8Z" />
    </svg>
  );
}

export function GuideSectionHeader() {
  return (
    <div className="guide-section-header discovery-reveal-heading">
      <LeafMotif />
      <h2 id="explore-guides-title">Explore Our Guides</h2>
      <LeafMotif mirrored />
    </div>
  );
}
