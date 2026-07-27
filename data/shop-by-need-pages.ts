export type NeedPageSlug =
  | "number-of-doors"
  | "room-size"
  | "family-size"
  | "storage-need"
  | "budget";

export type NeedPrimaryFilterKey =
  | "doors"
  | "room"
  | "family"
  | "storage"
  | "range";

export type NeedOptionIcon =
  | "doors"
  | "room"
  | "family"
  | "hanging"
  | "shelves"
  | "drawers"
  | "combo"
  | "budget";

export type NeedSecondaryFilterKey =
  | "doors"
  | "colour"
  | "mirror"
  | "price";

export type NeedOption = {
  value: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  icon: NeedOptionIcon;
};

export type NeedPageConfig = {
  slug: NeedPageSlug;
  title: string;
  description: string;
  primaryFilterKey: NeedPrimaryFilterKey;
  icon: NeedOptionIcon;
  overviewDescription: string;
  options: NeedOption[];
  secondaryFilters: NeedSecondaryFilterKey[];
};

export const shopByNeedPages: NeedPageConfig[] = [
  {
    slug: "number-of-doors",
    title: "By Number of Doors",
    description: "Choose wardrobes based on the number of doors.",
    primaryFilterKey: "doors",
    icon: "doors",
    overviewDescription: "1, 2, 3, 4 & more",
    secondaryFilters: ["doors", "colour", "mirror", "price"],
    options: [
      {
        value: "1",
        title: "1-Door",
        description: "Compact & space-saving",
        image: "/images/categories/one-door.png",
        imageAlt: "Compact one-door wardrobe",
        icon: "doors",
      },
      {
        value: "2",
        title: "2-Door",
        description: "Perfect for small rooms",
        image: "/images/products/nexa-2-door.png",
        imageAlt: "Two-door wardrobe in a warm bedroom",
        icon: "doors",
      },
      {
        value: "3",
        title: "3-Door",
        description: "Most popular choice",
        image: "/images/products/soho-3-door.png",
        imageAlt: "Three-door walnut wardrobe",
        icon: "doors",
      },
      {
        value: "4",
        title: "4-Door",
        description: "For extra storage",
        image: "/images/categories/four-door.png",
        imageAlt: "Wide four-door wardrobe",
        icon: "doors",
      },
      {
        value: "5-plus",
        title: "5+ Door",
        description: "For large families",
        image: "/images/shop-by-need/maximum-storage.png",
        imageAlt: "Large organised wardrobe",
        icon: "doors",
      },
    ],
  },
  {
    slug: "room-size",
    title: "By Room Size",
    description: "Find wardrobes that fit your room dimensions perfectly.",
    primaryFilterKey: "room",
    icon: "room",
    overviewDescription: "Small, Medium, Large",
    secondaryFilters: ["doors", "colour", "price"],
    options: [
      {
        value: "small",
        title: "Small Room",
        description: "Up to 120 sq. ft.",
        image: "/images/shop-by-need/small-spaces.png",
        imageAlt: "Compact wardrobe in a small bedroom",
        icon: "room",
      },
      {
        value: "medium",
        title: "Medium Room",
        description: "120–180 sq. ft.",
        image: "/images/shop-by-need/single-living.png",
        imageAlt: "Wardrobe in a medium-sized bedroom",
        icon: "room",
      },
      {
        value: "large",
        title: "Large Room",
        description: "180+ sq. ft.",
        image: "/images/shop-by-need/family-homes.png",
        imageAlt: "Wide wardrobe in a large bedroom",
        icon: "room",
      },
    ],
  },
  {
    slug: "family-size",
    title: "By Family Size",
    description: "Pick the right wardrobe for your family.",
    primaryFilterKey: "family",
    icon: "family",
    overviewDescription: "1–2, 3–4, 5+ Members",
    secondaryFilters: ["doors", "mirror", "price"],
    options: [
      {
        value: "1-2",
        title: "1–2 Members",
        description: "Compact & efficient",
        icon: "family",
      },
      {
        value: "3-4",
        title: "3–4 Members",
        description: "Ideal for small families",
        icon: "family",
      },
      {
        value: "5-plus",
        title: "5+ Members",
        description: "Spacious & functional",
        icon: "family",
      },
    ],
  },
  {
    slug: "storage-need",
    title: "By Storage Need",
    description: "Find wardrobes with the storage you need.",
    primaryFilterKey: "storage",
    icon: "combo",
    overviewDescription: "Hanging, Shelves, Drawers",
    secondaryFilters: ["doors", "price", "mirror"],
    options: [
      {
        value: "hanging",
        title: "More Hanging",
        description: "Extra hanging space",
        icon: "hanging",
      },
      {
        value: "shelves",
        title: "More Shelves",
        description: "More shelf compartments",
        icon: "shelves",
      },
      {
        value: "drawers",
        title: "With Drawers",
        description: "Better organisation",
        icon: "drawers",
      },
      {
        value: "combo",
        title: "Combo Storage",
        description: "Hanging + shelves + drawers",
        icon: "combo",
      },
    ],
  },
  {
    slug: "budget",
    title: "By Budget",
    description: "Choose wardrobes that fit your budget.",
    primaryFilterKey: "range",
    icon: "budget",
    overviewDescription: "Find your perfect fit",
    secondaryFilters: ["doors", "mirror", "colour"],
    options: [
      {
        value: "under-15000",
        title: "Under ₹15,000",
        description: "Great value options",
        icon: "budget",
      },
      {
        value: "15000-25000",
        title: "₹15,000–₹25,000",
        description: "Best for most homes",
        icon: "budget",
      },
      {
        value: "25000-40000",
        title: "₹25,000–₹40,000",
        description: "Premium quality",
        icon: "budget",
      },
      {
        value: "above-40000",
        title: "Above ₹40,000",
        description: "Luxury & premium",
        icon: "budget",
      },
    ],
  },
];

export const shopByNeedPageMap = new Map(
  shopByNeedPages.map((page) => [page.slug, page]),
);
