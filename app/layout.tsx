import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import "./header-hero.css";
import "./inline-search.css";
import "./home-discovery.css";
import "./home-best-sellers.css";
import "./home-trust-quality.css";
import "./home-guide-footer.css";
import "./collection-page.css";
import "./product-card.css";
import "./product-page.css";
import "./materials-quality.css";
import "./wardro-guide-page.css";
import "./about-page.css";
import "./shop-by-need-page.css";
import "./cart-drawer.css";
import "./wishlist-page.css";
import "./mobile-experience.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/components/cart/cart-context";
import { WishlistProvider } from "@/components/wishlist/wishlist-provider";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: {
    default: "Wardro | More Space. Less Chaos.",
    template: "%s | Wardro",
  },
  description: "Thoughtfully designed wardrobes for modern Bengaluru homes.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${montserrat.variable}`}>
        <WishlistProvider>
          <CartProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <MobileBottomNav />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
