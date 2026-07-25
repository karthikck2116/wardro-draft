import { Bookmark } from "lucide-react";

export function WishlistInfoBar() {
  return (
    <aside className="wishlist-info-bar" aria-label="About your wishlist">
      <span aria-hidden="true">
        <Bookmark />
      </span>
      <div>
        <strong>Why save to wishlist?</strong>
        <p>Compare options, come back later, and plan your space.</p>
      </div>
    </aside>
  );
}
