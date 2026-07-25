export type MaterialIconKey =
  | "layers"
  | "settings"
  | "sliders"
  | "inspect"
  | "measure"
  | "edge"
  | "fit"
  | "assemble"
  | "verify"
  | "space"
  | "durable"
  | "finish"
  | "home";

export type TrustItemData = {
  title: string;
  description: string;
  icon: "warranty" | "delivery" | "payments";
};

export type QualityFeatureData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: Extract<MaterialIconKey, "layers" | "settings" | "sliders">;
  benefits: string[];
};

export type QualityProcessData = {
  title: string;
  icon: Extract<
    MaterialIconKey,
    "inspect" | "measure" | "edge" | "fit" | "assemble" | "verify"
  >;
};

export type FinishData = {
  name: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  tone?: "grey";
};

export type SpecificationColumnData = {
  title: string;
  items: string[];
};

export type HomeBenefitData = {
  title: string;
  icon: Extract<MaterialIconKey, "space" | "durable" | "finish" | "home">;
};

export const materialsTrustItems: TrustItemData[] = [
  {
    title: "5-Year Warranty",
    description: "Peace of mind from invoice date",
    icon: "warranty",
  },
  {
    title: "Free Delivery & Partner Installation",
    description: "In eligible Bengaluru areas",
    icon: "delivery",
  },
  {
    title: "Secure Payments",
    description: "Safe, encrypted and trusted",
    icon: "payments",
  },
];

export const qualityFeatures: QualityFeatureData[] = [
  {
    title: "Premium Engineered Wood",
    description:
      "Carefully selected engineered panels with a smooth, consistent finish for dependable everyday storage.",
    image: "/images/materials/engineered-wood.png",
    imageAlt: "Close-up of layered engineered wood boards with a walnut finish",
    icon: "layers",
    benefits: [
      "Consistent engineered core",
      "Secure screw-held joinery",
      "Easy-care laminated surface",
      "Stable everyday construction",
      "Exact panel details by model",
    ],
  },
  {
    title: "Reliable Hardware",
    description:
      "Thoughtfully selected hinges and fittings help doors operate smoothly and stay aligned in daily use.",
    image: "/images/materials/tested-hardware.png",
    imageAlt: "Close-up of a wardrobe hinge fitted to a walnut panel",
    icon: "settings",
    benefits: [
      "Soft-close hinges where specified",
      "Durable metal fittings",
      "Reliable door alignment",
      "Hardware selected by model",
      "Serviceable everyday components",
    ],
  },
  {
    title: "Smooth Functionality",
    description:
      "Channels and fittings are matched to each design for controlled movement and practical everyday access.",
    image: "/images/materials/precision-channels.png",
    imageAlt: "Close-up of a drawer channel fitted inside a wardrobe drawer",
    icon: "sliders",
    benefits: [
      "Smooth movement where included",
      "Hardware matched to the design",
      "Quiet, controlled operation",
      "Designed for daily use",
      "Exact fittings listed by model",
    ],
  },
];

export const qualityProcess: QualityProcessData[] = [
  { title: "Material inspection", icon: "inspect" },
  { title: "Precision cutting", icon: "measure" },
  { title: "Edge banding", icon: "edge" },
  { title: "Drilling & fitting", icon: "fit" },
  { title: "Assembly check", icon: "assemble" },
  { title: "Final quality check", icon: "verify" },
];

export const finishSamples: FinishData[] = [
  {
    name: "Walnut",
    image: "/images/materials-quality/finish-walnut.jpg",
    imageAlt: "Close-up texture of a walnut Wardro finish",
    objectPosition: "center",
  },
  {
    name: "Oak",
    image: "/images/materials-quality/finish-oak.jpg",
    imageAlt: "Close-up texture of an oak Wardro finish",
    objectPosition: "center",
  },
  {
    name: "White",
    image: "/images/materials-quality/finish-white.jpg",
    imageAlt: "Close-up texture of a warm white Wardro finish",
    objectPosition: "center",
  },
  {
    name: "Grey",
    image: "/images/materials-quality/finish-grey.jpg",
    imageAlt: "Neutral finish texture sample",
    objectPosition: "center",
  },
];

export const specificationColumns: SpecificationColumnData[] = [
  {
    title: "Build & Structure",
    items: [
      "Engineered wood panels selected by model",
      "Back-panel specification varies by design",
      "Edge finishing on visible surfaces",
      "Dowel and cam-lock joinery where specified",
    ],
  },
  {
    title: "Hardware Used",
    items: [
      "Soft-close hinges on selected models",
      "Ball-bearing channels where included",
      "Hanging rods matched to configuration",
      "Durable handles and fittings",
      "Hardware details shown per product",
    ],
  },
  {
    title: "Functionality",
    items: [
      "Practical hanging sections",
      "Adjustable shelves on selected models",
      "Soft-close drawers where included",
      "Storage layouts optimised by model",
      "Easy everyday access",
    ],
  },
  {
    title: "Care & Maintenance",
    items: [
      "Wipe with a soft, dry or slightly damp cloth",
      "Avoid direct sunlight and excess moisture",
      "Do not use harsh chemicals or abrasive cleaners",
      "Handle doors and drawers with care",
    ],
  },
];

export const indianHomeBenefits: HomeBenefitData[] = [
  { title: "Space smart", icon: "space" },
  { title: "Everyday durable", icon: "durable" },
  { title: "Modern finishes", icon: "finish" },
  { title: "Made for India", icon: "home" },
];

export const materialsContentReview = {
  technicalClaimsApproved: false,
  note:
    "Performance figures, board thicknesses, resistance claims and test-cycle counts remain hidden until approved business specifications or product metafields are supplied.",
};
