export type AboutIconKey =
  | "organisation"
  | "construction"
  | "warranty"
  | "installation"
  | "design"
  | "materials"
  | "quality"
  | "living"
  | "manufacture"
  | "delivery";

export type AboutTrustItem = {
  title: string;
  description: string;
  icon: Extract<
    AboutIconKey,
    "organisation" | "construction" | "warranty" | "installation"
  >;
};

export type BrandValue = {
  title: string;
  description: string;
  icon: Extract<AboutIconKey, "design" | "materials" | "quality" | "living">;
};

export type ComparisonItem = {
  label: string;
  wardro: "check";
  alternative: string;
  icon: Extract<
    AboutIconKey,
    "materials" | "warranty" | "installation" | "quality"
  >;
};

export type BuildStep = {
  number: string;
  title: string;
  description: string;
  icon: Extract<AboutIconKey, "design" | "manufacture" | "quality" | "delivery">;
};

export const aboutTrustItems: AboutTrustItem[] = [
  {
    title: "Smarter organisation",
    description: "Designed for the way you live",
    icon: "organisation",
  },
  {
    title: "Strong construction",
    description: "Built to last for years",
    icon: "construction",
  },
  {
    title: "5-year warranty",
    description: "Assured quality you can trust",
    icon: "warranty",
  },
  {
    title: "Partner installation",
    description: "Expert installation at your home",
    icon: "installation",
  },
];

export const brandValues: BrandValue[] = [
  {
    title: "Thoughtful Design",
    description:
      "Smart layouts and practical details that make storage effortless.",
    icon: "design",
  },
  {
    title: "Honest Materials",
    description:
      "Carefully chosen boards and hardware for dependable everyday use.",
    icon: "materials",
  },
  {
    title: "Reliable Quality",
    description:
      "Carefully checked components and consistent workmanship.",
    icon: "quality",
  },
  {
    title: "Better Living",
    description: "More space, less chaos and homes that feel calm.",
    icon: "living",
  },
];

export const aboutComparison: ComparisonItem[] = [
  {
    label: "Premium engineered wood",
    wardro: "check",
    alternative: "Varies",
    icon: "materials",
  },
  {
    label: "5-year warranty",
    wardro: "check",
    alternative: "1–2 years",
    icon: "warranty",
  },
  {
    label: "Installations",
    wardro: "check",
    alternative: "Extra charges",
    icon: "installation",
  },
  {
    label: "Clear material details",
    wardro: "check",
    alternative: "Limited",
    icon: "quality",
  },
];

export const buildSteps: BuildStep[] = [
  {
    number: "1",
    title: "Design",
    description:
      "We research, plan and design wardrobes that fit real homes and real storage needs.",
    icon: "design",
  },
  {
    number: "2",
    title: "Manufacture",
    description:
      "Precision manufacturing with carefully selected materials and modern machinery.",
    icon: "manufacture",
  },
  {
    number: "3",
    title: "Quality Check",
    description:
      "Every wardrobe is inspected for finish and function before dispatch.",
    icon: "quality",
  },
  {
    number: "4",
    title: "Delivery & Installation",
    description:
      "Safe delivery, professional installation and a home that is ready to enjoy.",
    icon: "delivery",
  },
];
