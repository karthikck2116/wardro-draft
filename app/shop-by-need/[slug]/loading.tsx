export default function ShopByNeedLoading() {
  return (
    <div className="need-category-page" aria-label="Loading wardrobe results">
      <div className="need-category-shell">
        <div className="need-loading-heading" />
        <div className="need-loading-selectors">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="need-loading-layout">
          <aside />
          <div>
            <header />
            <section>
              {Array.from({ length: 6 }, (_, index) => (
                <article key={index} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
