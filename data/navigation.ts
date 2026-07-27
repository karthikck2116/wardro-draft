import {
  Boxes,
  DoorOpen,
  HeartHandshake,
  House,
  Layers3,
  Palette,
  PackageCheck,
  PanelTop,
  Ruler,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { products } from "@/data/mock/products";
import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  icon?: LucideIcon;
};

export type MegaMenuSection = {
  title: string;
  items: NavigationItem[];
  cta: {
    title: string;
    href: string;
  };
};

export const wardrobeDoorItems: NavigationItem[] = [
  {
    title: "1-Door Wardrobes",
    description: "Compact & space-saving",
    href: "/collections/one-door-wardrobes",
    image: "/images/categories/one-door.png",
    imageAlt: "A compact one-door Wardro wardrobe",
  },
  {
    title: "2-Door Wardrobes",
    description: "Perfect for small rooms",
    href: "/collections/two-door-wardrobes",
    image: "/images/products/nexa-2-door.png",
    imageAlt: "A two-door Wardro wardrobe",
  },
  {
    title: "3-Door Wardrobes",
    description: "Most popular choice",
    href: "/collections/three-door-wardrobes",
    image: "/images/products/soho-3-door.png",
    imageAlt: "A three-door Wardro wardrobe",
  },
  {
    title: "4-Door Wardrobes",
    description: "For extra storage",
    href: "/collections/four-door-wardrobes",
    image: "/images/categories/four-door.png",
    imageAlt: "A four-door Wardro wardrobe",
  },
  {
    title: "Sliding Door Wardrobes",
    description: "Modern & space-efficient",
    href: "/collections/sliding-door-wardrobes",
    image: "/images/products/luxe-sliding.png",
    imageAlt: "A sliding-door Wardro wardrobe",
  },
];

const featureCandidates: Array<
  NavigationItem & { supported: boolean }
> = [
  {
    title: "With Mirror",
    description: "Style meets function",
    href: "/collections/all-wardrobes?mirror=with",
    icon: PanelTop,
    supported: products.some(
      (product) =>
        product.mirror ||
        product.variants.some((variant) =>
          variant.mirror.toLowerCase().includes("with mirror"),
        ),
    ),
  },
  {
    title: "With Drawer",
    description: "Better organisation",
    href: "/collections/all-wardrobes?feature=drawer",
    icon: Boxes,
    supported: products.some((product) =>
      product.accessories.some((accessory) =>
        accessory.title.toLowerCase().includes("drawer"),
      ),
    ),
  },
  {
    title: "Ready to Dispatch",
    description: "Quick delivery",
    href: "/collections/all-wardrobes?ready=true",
    icon: PackageCheck,
    supported: products.some((product) => product.readyToDispatch),
  },
  {
    title: "Best Sellers",
    description: "Customer favourites",
    href: "/collections/all-wardrobes?bestSeller=true",
    icon: Sparkles,
    supported: products.some((product) => product.bestSeller),
  },
  {
    title: "Customisable",
    description: "Finishes made for your room",
    href: "/collections/all-wardrobes?customisable=true",
    icon: Palette,
    supported: products.some((product) => product.customisable),
  },
];

export const wardrobeFeatureItems: NavigationItem[] = featureCandidates
  .filter((item) => item.supported)
  .map(({ title, description, href, image, imageAlt, icon }) => ({
    title,
    description,
    href,
    image,
    imageAlt,
    icon,
  }));

export const wardrobeCollectionItems: NavigationItem[] = [
  {
    title: "Hinged Wardrobes",
    description: "Classic, complete access",
    href: "/collections/all-wardrobes?storageType=hinged",
    image: "/images/products/vienna-3-door.png",
    imageAlt: "A hinged Wardro wardrobe",
  },
  {
    title: "Sliding Wardrobes",
    description: "Clean & space-efficient",
    href: "/collections/sliding-door-wardrobes?storageType=sliding",
    image: "/images/products/luxe-sliding.png",
    imageAlt: "A sliding Wardro wardrobe",
  },
  {
    title: "Mirror Wardrobes",
    description: "Storage meets function",
    href: "/collections/all-wardrobes?mirror=with",
    image: "/images/products/luxe-sliding.png",
    imageAlt: "A Wardro wardrobe with a mirror",
  },
  {
    title: "Three-Door Wardrobes",
    description: "Flexible everyday storage",
    href: "/collections/three-door-wardrobes",
    image: "/images/products/soho-3-door.png",
    imageAlt: "A three-door walnut wardrobe",
  },
];

export const wardrobeMenuSections: MegaMenuSection[] = [
  {
    title: "Browse by doors",
    items: wardrobeDoorItems,
    cta: {
      title: "View All Wardrobes",
      href: "/collections/all-wardrobes",
    },
  },
  {
    title: "Explore by feature",
    items: wardrobeFeatureItems,
    cta: {
      title: "View All Features",
      href: "/collections/all-wardrobes",
    },
  },
  {
    title: "Shop by collection",
    items: wardrobeCollectionItems,
    cta: {
      title: "View All Collections",
      href: "/collections/all-wardrobes",
    },
  },
];

export const shopByNeedSections: MegaMenuSection[] = [
  {
    title: "By space",
    items: [
      {
        title: "Small Rooms",
        description: "Smart storage for compact homes",
        href: "/collections/all-wardrobes?need=small-spaces",
        icon: Ruler,
      },
      {
        title: "Medium Rooms",
        description: "Balanced storage and footprint",
        href: "/collections/all-wardrobes?need=medium-rooms",
        icon: DoorOpen,
      },
      {
        title: "Large Rooms",
        description: "More capacity for spacious bedrooms",
        href: "/collections/all-wardrobes?need=large-rooms",
        icon: House,
      },
    ],
    cta: { title: "View All Needs", href: "/shop-by-need" },
  },
  {
    title: "By household",
    items: [
      {
        title: "Single Living",
        description: "Practical storage for one person",
        href: "/collections/all-wardrobes?need=single-living",
        icon: HeartHandshake,
      },
      {
        title: "Couples",
        description: "Organised storage for two",
        href: "/collections/all-wardrobes?need=newlyweds",
        icon: UsersRound,
      },
      {
        title: "Family Storage",
        description: "Spacious storage for every member",
        href: "/collections/all-wardrobes?need=family-homes",
        icon: UsersRound,
      },
    ],
    cta: { title: "Explore Households", href: "/shop-by-need" },
  },
  {
    title: "By requirement",
    items: [
      {
        title: "Maximum Storage",
        description: "More space, better organisation",
        href: "/collections/all-wardrobes?need=maximum-storage",
        icon: Layers3,
      },
      {
        title: "By Budget",
        description: "Find wardrobes within your budget",
        href: "/collections/all-wardrobes?shopBy=budget",
        icon: WalletCards,
      },
      {
        title: "Rental Friendly",
        description: "Practical options for rented homes",
        href: "/collections/all-wardrobes?need=rental-friendly",
        icon: House,
      },
      {
        title: "With Mirror",
        description: "Storage and dressing convenience",
        href: "/collections/all-wardrobes?mirror=with",
        icon: PanelTop,
      },
      {
        title: "Ready to Dispatch",
        description: "Faster delivery where available",
        href: "/collections/all-wardrobes?ready=true",
        icon: PackageCheck,
      },
    ],
    cta: { title: "View All Needs", href: "/shop-by-need" },
  },
];

export const mobileShopByNeedItems: NavigationItem[] = [
  shopByNeedSections[0].items[0],
  shopByNeedSections[1].items[2],
  shopByNeedSections[2].items[0],
  shopByNeedSections[2].items[1],
  shopByNeedSections[2].items[2],
];

export const navigationFeaturedPanel = {
  image: "/images/products/soho-3-door.png",
  imageAlt: "Soho three-door walnut wardrobe in a warm bedroom",
  icon: ShieldCheck,
  title: "Built to Last. Made for You.",
  description:
    "Premium materials, strong construction and a 5-year warranty.",
  mobileTitle: "Quality you can trust",
  mobileDescription:
    "Strong build, reliable materials and 5-year warranty.",
  cta: "Explore Wardrobes",
  href: "/collections/all-wardrobes",
};
