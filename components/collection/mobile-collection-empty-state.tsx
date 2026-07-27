export function MobileCollectionEmptyState({
  onClear,
}: {
  onClear: () => void;
}) {
  return (
    <div className="mobile-collection-empty">
      <h2>No wardrobes match these filters</h2>
      <p>Try changing the door type, colour, mirror or price range.</p>
      <div>
        <button type="button" onClick={onClear}>
          Clear Filters
        </button>
        <button type="button" onClick={onClear}>
          View All Wardrobes
        </button>
      </div>
    </div>
  );
}

