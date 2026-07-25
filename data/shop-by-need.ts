export type NeedIconKey =
  | "home"
  | "storage"
  | "confidence"
  | "small-spaces"
  | "family"
  | "single"
  | "newlyweds"
  | "rental"
  | "maximum"
  | "modern"
  | "premium"
  | "measure"
  | "filters"
  | "support"
  | "warranty"
  | "delivery"
  | "payments"
  | "transparent-support";

export type ShopByNeedBenefit = {
  title: string;
  description: string;
  icon: Extract<NeedIconKey, "home" | "storage" | "confidence">;
};

export type NeedCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: Extract<
    NeedIconKey,
    | "small-spaces"
    | "family"
    | "single"
    | "newlyweds"
    | "rental"
    | "maximum"
    | "modern"
    | "premium"
  >;
  href: string;
};

export type NeedFinderTool = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: Extract<NeedIconKey, "measure" | "filters" | "support">;
};

export type ShopByNeedTrustItem = {
  title: string;
  description: string;
  icon: Extract<
    NeedIconKey,
    "warranty" | "delivery" | "payments" | "transparent-support"
  >;
};

export const shopByNeedBenefits: ShopByNeedBenefit[] = [
  {
    title: "Choose what suits your home",
    description: "From compact rooms to large bedrooms",
    icon: "home",
  },
  {
    title: "Match your storage needs",
    description: "Smart layouts for every lifestyle",
    icon: "storage",
  },
  {
    title: "Make confident decisions",
    description: "Guides and filters to help you choose",
    icon: "confidence",
  },
];

export const needCategories: NeedCategory[] = [
  {
    slug: "small-spaces",
    title: "Small Spaces",
    description:
      "Compact wardrobes designed for apartments, 1BHK and studio homes.",
    image: "/images/shop-by-need/small-spaces.png",
    imageAlt: "A compact one-door wardrobe in a warm bedroom",
    icon: "small-spaces",
    href: "/collections/all-wardrobes?need=small-spaces",
  },
  {
    slug: "family-homes",
    title: "Family Homes",
    description:
      "Spacious wardrobes with smart storage for growing families.",
    image: "/images/shop-by-need/family-homes.png",
    imageAlt: "A wide four-door wardrobe suited to family storage",
    icon: "family",
    href: "/collections/all-wardrobes?need=family-homes",
  },
  {
    slug: "single-living",
    title: "Single Living",
    description:
      "Smart and efficient wardrobes for bachelors and solo living.",
    image: "/images/shop-by-need/single-living.png",
    imageAlt: "A practical two-door walnut wardrobe",
    icon: "single",
    href: "/collections/all-wardrobes?need=single-living",
  },
  {
    slug: "newlyweds",
    title: "Newlyweds",
    description:
      "Stylish and functional wardrobes for your new beginning.",
    image: "/images/shop-by-need/newlyweds.png",
    imageAlt: "A warm oak wardrobe in a modern bedroom",
    icon: "newlyweds",
    href: "/collections/all-wardrobes?need=newlyweds",
  },
  {
    slug: "rental-friendly",
    title: "Rental Friendly",
    description:
      "Explore practical wardrobe options for flexible rented-home living.",
    image: "/images/shop-by-need/rental-friendly.png",
    imageAlt: "A three-door walnut wardrobe in a calm bedroom",
    icon: "rental",
    href: "/collections/all-wardrobes?need=rental-friendly",
  },
  {
    slug: "maximum-storage",
    title: "Maximum Storage",
    description:
      "Explore high-capacity layouts with shelves, drawers and hanging zones.",
    image: "/images/shop-by-need/maximum-storage.png",
    imageAlt: "An open wardrobe with organised shelves, drawers and hanging space",
    icon: "maximum",
    href: "/collections/all-wardrobes?need=maximum-storage",
  },
  {
    slug: "modern-aesthetic",
    title: "Modern Aesthetic",
    description:
      "Clean designs and considered finishes for contemporary homes.",
    image: "/images/shop-by-need/modern-aesthetic.png",
    imageAlt: "A modern three-door wardrobe with a warm wood finish",
    icon: "modern",
    href: "/collections/all-wardrobes?need=modern-aesthetic",
  },
  {
    slug: "premium-choice",
    title: "Premium Choice",
    description:
      "Explore refined finishes and features across selected models.",
    image: "/images/shop-by-need/premium-choice.png",
    imageAlt: "A refined walnut and warm-white sliding wardrobe",
    icon: "premium",
    href: "/collections/all-wardrobes?need=premium-choice",
  },
];

export const needFinderTools: NeedFinderTool[] = [
  {
    title: "Measure Your Space",
    description: "Step-by-step guide to measure your space perfectly.",
    cta: "Start measuring",
    href: "/measure-your-space",
    icon: "measure",
  },
  {
    title: "Find by Room Size",
    description: "Shop wardrobes based on your room dimensions.",
    cta: "View size guide",
    href: "/collections/all-wardrobes?shopBy=room-size",
    icon: "filters",
  },
  {
    title: "Still need help?",
    description:
      "Talk to our storage experts and get personalised suggestions.",
    cta: "Talk to an expert",
    href: "/support",
    icon: "support",
  },
];

export const shopByNeedTrustItems: ShopByNeedTrustItem[] = [
  {
    title: "5-Year Warranty",
    description: "Quality you can rely on",
    icon: "warranty",
  },
  {
    title: "Free Delivery & Installation",
    description: "In eligible Bengaluru areas",
    icon: "delivery",
  },
  {
    title: "Safe & Secure Payments",
    description: "Cards, UPI, EMI and more",
    icon: "payments",
  },
  {
    title: "Transparent Support",
    description: "Clear policies and responsive assistance",
    icon: "transparent-support",
  },
];
