export type GuideCategorySlug =
  | "all-guides"
  | "storage-ideas"
  | "buying-guides"
  | "measurement-guides"
  | "organisation-tips"
  | "materials-quality"
  | "wardrobe-care";

export type GuideCategory = {
  label: string;
  slug: GuideCategorySlug;
};

export type GuideArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: Exclude<GuideCategorySlug, "all-guides">;
  image: string;
  imageAlt: string;
  readingTime: string;
  featured?: boolean;
  sections: GuideArticleSection[];
};

export type GuideTopic = {
  title: string;
  description: string;
  href: string;
  icon:
    | "small-bedroom"
    | "family"
    | "first-wardrobe"
    | "materials"
    | "organisation"
    | "care";
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export const guideCategories: GuideCategory[] = [
  { label: "All Guides", slug: "all-guides" },
  { label: "Storage Ideas", slug: "storage-ideas" },
  { label: "Buying Guides", slug: "buying-guides" },
  { label: "Measurement Guides", slug: "measurement-guides" },
  { label: "Organisation Tips", slug: "organisation-tips" },
  { label: "Materials & Quality", slug: "materials-quality" },
  { label: "Wardrobe Care", slug: "wardrobe-care" },
];

export const guideArticles: GuideArticle[] = [
  {
    slug: "small-bedroom-storage-ideas",
    title: "10 Small Bedroom Storage Ideas That Actually Work",
    excerpt:
      "Make every corner work harder without making the room feel crowded.",
    category: "Storage Ideas",
    categorySlug: "storage-ideas",
    image: "/images/guides/small-bedroom-storage.png",
    imageAlt: "A warm compact bedroom with a Wardro wardrobe",
    readingTime: "5 min read",
    sections: [
      {
        id: "start-with-the-room",
        heading: "Start with the room, not the wardrobe",
        paragraphs: [
          "Map the clear wall width, nearby doors, windows and walking paths before deciding how much storage the room can comfortably hold.",
        ],
        bullets: [
          "Keep daily movement routes clear",
          "Use full height without crowding the ceiling line",
          "Choose door movement that suits the available floor space",
        ],
      },
      {
        id: "create-useful-zones",
        heading: "Create useful storage zones",
        paragraphs: [
          "Separate everyday clothing, occasional wear and accessories so the most-used items remain easy to reach.",
          "A balanced mix of hanging space, shelves and compact drawers usually works better than one oversized section.",
        ],
      },
      {
        id: "keep-the-room-calm",
        heading: "Keep the room visually calm",
        paragraphs: [
          "A consistent finish and a well-proportioned wardrobe can add storage without making a small bedroom feel busy.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-wardrobe",
    title: "How to Choose the Right Wardrobe for Your Home",
    excerpt:
      "Understand the right size, door type, layout, material and features before you buy.",
    category: "Buying Guide",
    categorySlug: "buying-guides",
    image: "/images/guides/choose-right-wardrobe.png",
    imageAlt: "A warm bedroom with a sliding Wardro wardrobe",
    readingTime: "6 min read",
    featured: true,
    sections: [
      {
        id: "measure-the-space",
        heading: "Measure the space first",
        paragraphs: [
          "Record wall width, ceiling height and available depth. Then check skirting, switches, windows and the path the wardrobe must travel during delivery.",
        ],
        bullets: [
          "Measure at more than one point",
          "Allow for door and drawer movement",
          "Confirm doorway, staircase and lift access",
        ],
      },
      {
        id: "choose-door-type",
        heading: "Choose the right door type",
        paragraphs: [
          "Hinged doors offer full access to the wardrobe interior. Sliding doors reduce the floor clearance needed in front of the wardrobe.",
          "The right choice depends on the room layout, not only on appearance.",
        ],
      },
      {
        id: "plan-the-interior",
        heading: "Plan storage around daily life",
        paragraphs: [
          "Think about the clothes, bags, accessories and seasonal items you actually own. Prioritise the zones you reach for every day.",
        ],
      },
    ],
  },
  {
    slug: "how-to-care-for-your-wardrobe",
    title: "How to Care for Your Wardrobe",
    excerpt:
      "Simple habits that keep finishes and hardware working beautifully.",
    category: "Wardrobe Care",
    categorySlug: "wardrobe-care",
    image: "/images/wardro-guide/wardrobe-care.png",
    imageAlt: "A hand gently wiping a walnut wardrobe with a soft cloth",
    readingTime: "4 min read",
    sections: [
      {
        id: "regular-cleaning",
        heading: "Clean gently and regularly",
        paragraphs: [
          "Use a soft dry cloth for routine dusting. For marks, use a slightly damp cloth and wipe the surface dry afterwards.",
        ],
      },
      {
        id: "protect-the-finish",
        heading: "Protect the finish",
        paragraphs: [
          "Avoid harsh chemicals, abrasive pads and excess moisture. Keep prolonged direct sunlight away from the same surface where possible.",
        ],
      },
      {
        id: "check-the-hardware",
        heading: "Notice changes in movement",
        paragraphs: [
          "If a door, drawer or channel starts to feel different, stop forcing it and arrange a hardware check before the issue grows.",
        ],
      },
    ],
  },
  {
    slug: "measure-your-space-before-buying",
    title: "How to Measure Your Space Before Buying a Wardrobe",
    excerpt:
      "Measure width, height, depth and access paths correctly before choosing.",
    category: "Measurement Guide",
    categorySlug: "measurement-guides",
    image: "/images/wardro-guide/measure-your-space.png",
    imageAlt: "Wardrobe plans, a room plan and a measuring tape on a desk",
    readingTime: "5 min read",
    sections: [
      {
        id: "wall-dimensions",
        heading: "Measure wall width and height",
        paragraphs: [
          "Take measurements at the top, middle and bottom of the wall. Use the smallest clear dimension when planning the wardrobe.",
        ],
      },
      {
        id: "available-depth",
        heading: "Check available depth",
        paragraphs: [
          "Measure from the wall to the point where the wardrobe can end without narrowing a walkway or interfering with another piece of furniture.",
        ],
      },
      {
        id: "delivery-access",
        heading: "Confirm delivery access",
        paragraphs: [
          "Record the narrowest doorway, corridor turn, staircase and lift opening on the route to the room.",
        ],
      },
    ],
  },
  {
    slug: "organise-a-wardrobe-for-everyday-use",
    title: "How to Organise a Wardrobe for Everyday Use",
    excerpt:
      "Create practical zones for hanging, folded clothing and accessories.",
    category: "Organisation Tips",
    categorySlug: "organisation-tips",
    image: "/images/wardro-guide/wardrobe-organisation.png",
    imageAlt: "A neatly organised walnut wardrobe interior",
    readingTime: "5 min read",
    sections: [
      {
        id: "sort-by-frequency",
        heading: "Sort by how often you use it",
        paragraphs: [
          "Keep everyday clothing between shoulder and waist height. Move occasional items higher and seasonal storage lower or further back.",
        ],
      },
      {
        id: "give-everything-a-zone",
        heading: "Give every category a zone",
        paragraphs: [
          "Assign clear areas for hanging garments, folded clothing, accessories, bags and spare linens.",
        ],
      },
      {
        id: "leave-breathing-room",
        heading: "Leave breathing room",
        paragraphs: [
          "Avoid packing every shelf to its edge. A little free space makes daily use easier and helps the arrangement stay organised.",
        ],
      },
    ],
  },
  {
    slug: "two-door-vs-three-door-wardrobe",
    title: "2-Door vs 3-Door Wardrobe",
    excerpt:
      "Choose the right size based on room space and storage requirements.",
    category: "Buying Guide",
    categorySlug: "buying-guides",
    image: "/images/products/soho-3-door.png",
    imageAlt: "A three-door walnut wardrobe in a warm bedroom",
    readingTime: "4 min read",
    sections: [
      {
        id: "room-size",
        heading: "Start with room size",
        paragraphs: [
          "A 2-door wardrobe can suit a compact room or focused storage need. A 3-door wardrobe needs more wall width but provides more flexible internal zones.",
        ],
      },
      {
        id: "storage-needs",
        heading: "Compare your storage needs",
        paragraphs: [
          "Consider how much hanging space, folded storage and accessory organisation you need now and over the next few years.",
        ],
      },
      {
        id: "door-clearance",
        heading: "Check door clearance",
        paragraphs: [
          "For hinged models, make sure each door can open without meeting the bed, a side table or the room door.",
        ],
      },
    ],
  },
  {
    slug: "wardrobe-storage-ideas-for-indian-families",
    title: "Wardrobe Storage Ideas for Indian Families",
    excerpt:
      "Plan space for folded clothes, hanging garments, bags and seasonal items.",
    category: "Storage Ideas",
    categorySlug: "storage-ideas",
    image: "/images/wardro-guide/guide-hero.png",
    imageAlt: "An open walnut wardrobe organised for a family",
    readingTime: "6 min read",
    sections: [
      {
        id: "mix-storage-types",
        heading: "Mix hanging and folded storage",
        paragraphs: [
          "Plan shelves for folded clothing alongside hanging zones for workwear, dresses and special garments.",
        ],
      },
      {
        id: "seasonal-space",
        heading: "Reserve seasonal space",
        paragraphs: [
          "Use higher shelves or baskets for blankets, occasion wear and items that change with the season.",
        ],
      },
      {
        id: "shared-wardrobes",
        heading: "Make shared wardrobes easy to use",
        paragraphs: [
          "Give each person a clear group of shelves or drawers while keeping shared items in a neutral central zone.",
        ],
      },
    ],
  },
  {
    slug: "understanding-wardrobe-materials",
    title: "Understanding Wardrobe Materials",
    excerpt:
      "Learn how boards, finishes, hardware and construction affect performance.",
    category: "Materials & Quality",
    categorySlug: "materials-quality",
    image: "/images/materials/engineered-wood.png",
    imageAlt: "Close-up of layered engineered wood boards",
    readingTime: "5 min read",
    sections: [
      {
        id: "look-beyond-the-finish",
        heading: "Look beyond the finish",
        paragraphs: [
          "The visible laminate is only one part of the wardrobe. Ask about the panel core, edge treatment, joinery and hardware used for the specific model.",
        ],
      },
      {
        id: "hardware-matters",
        heading: "Hardware shapes daily use",
        paragraphs: [
          "Hinges, channels, handles and hanging rods influence how smoothly the wardrobe feels in everyday use.",
        ],
      },
      {
        id: "compare-model-details",
        heading: "Compare model-specific details",
        paragraphs: [
          "Specifications can vary. Use the product page for exact materials and included hardware rather than relying on broad category claims.",
        ],
      },
    ],
  },
  {
    slug: "sliding-vs-hinged-wardrobes",
    title: "Sliding vs Hinged Wardrobes",
    excerpt:
      "Compare space usage, access, maintenance and suitability for your room.",
    category: "Buying Guide",
    categorySlug: "buying-guides",
    image: "/images/products/luxe-sliding.png",
    imageAlt: "A walnut and warm-white sliding wardrobe",
    readingTime: "5 min read",
    sections: [
      {
        id: "access-and-clearance",
        heading: "Compare access and clearance",
        paragraphs: [
          "Hinged doors need open floor space but reveal the full interior. Sliding doors reduce front clearance while showing one section at a time.",
        ],
      },
      {
        id: "room-layout",
        heading: "Match the room layout",
        paragraphs: [
          "Consider the bed position, side tables, walkways and the way you move through the room before choosing a door system.",
        ],
      },
      {
        id: "everyday-care",
        heading: "Think about everyday care",
        paragraphs: [
          "Both systems benefit from gentle use and clean hardware. Sliding tracks should stay free of debris, while hinged doors should never be forced beyond their natural opening.",
        ],
      },
    ],
  },
];

export const guideTopics: GuideTopic[] = [
  {
    title: "Small Bedrooms",
    description: "Make limited space work harder.",
    href: "/wardro-guide?category=storage-ideas",
    icon: "small-bedroom",
  },
  {
    title: "Family Storage",
    description: "Plan practical shared storage.",
    href: "/wardro-guide/wardrobe-storage-ideas-for-indian-families",
    icon: "family",
  },
  {
    title: "Buying Your First Wardrobe",
    description: "Choose with clarity and confidence.",
    href: "/wardro-guide?category=buying-guides",
    icon: "first-wardrobe",
  },
  {
    title: "Materials & Hardware",
    description: "Understand the details that matter.",
    href: "/wardro-guide/understanding-wardrobe-materials",
    icon: "materials",
  },
  {
    title: "Organisation",
    description: "Build zones for everyday life.",
    href: "/wardro-guide?category=organisation-tips",
    icon: "organisation",
  },
  {
    title: "Care & Maintenance",
    description: "Keep finishes and hardware working well.",
    href: "/wardro-guide?category=wardrobe-care",
    icon: "care",
  },
];

export const guideFaqs: GuideFaq[] = [
  {
    question: "Which wardrobe size is right for my room?",
    answer:
      "Start with the clear wall width, room depth and walking space. Then match the available footprint to your storage needs rather than choosing by door count alone.",
  },
  {
    question: "Is a 2-door or 3-door wardrobe better?",
    answer:
      "A 2-door wardrobe suits focused storage and compact walls. A 3-door wardrobe offers more flexible zones when the room has enough width and door clearance.",
  },
  {
    question: "Should I choose a mirror wardrobe?",
    answer:
      "A mirror can reduce the need for a separate dressing mirror and help a room feel brighter. Check placement, reflection and cleaning access before deciding.",
  },
  {
    question: "What material is best for a wardrobe?",
    answer:
      "Look at the complete construction: panel core, finish, edge treatment, joinery and hardware. Exact specifications should be checked on the individual product page.",
  },
  {
    question: "How much space is needed to open hinged doors?",
    answer:
      "Allow enough clear floor space for the full door swing plus a comfortable standing area. Confirm this against nearby beds, side tables and room doors.",
  },
  {
    question: "Are sliding wardrobes suitable for compact rooms?",
    answer:
      "They can work well where front clearance is limited because the doors do not swing outward. Make sure the internal access pattern suits how you use the wardrobe.",
  },
  {
    question: "How should I care for engineered-wood wardrobes?",
    answer:
      "Dust with a soft cloth, use only a slightly damp cloth for marks and dry the surface afterwards. Avoid abrasives, harsh chemicals and excess moisture.",
  },
];

export const featuredGuide =
  guideArticles.find((article) => article.featured) ?? guideArticles[0];
