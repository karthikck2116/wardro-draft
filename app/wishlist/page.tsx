import type { Metadata } from "next";
import { commerce } from "@/lib/commerce/repository";
import { WishlistPage } from "@/components/wishlist/wishlist-page";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description:
    "Review and compare the Wardro wardrobes you have saved in this browser.",
  alternates: { canonical: "/wishlist" },
};

export default async function WishlistRoute() {
  const products = await commerce.getCollection("all-wardrobes", {});
  return <WishlistPage products={products} />;
}
