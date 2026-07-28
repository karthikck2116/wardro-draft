export type MeasurementDiagramType =
  | "width-height"
  | "depth"
  | "clearance"
  | "access"
  | "width"
  | "height";

export type MeasureItem = {
  number: string;
  title: string;
  description: string;
  diagram: MeasurementDiagramType;
};

export type MeasureStep = {
  number: number;
  title: string;
  description: string;
  diagram: MeasurementDiagramType;
};

export type SpaceGuideRow = {
  type: string;
  width: string;
  bestFor: string;
};

export type MeasurementFaqItem = {
  question: string;
  answer: string;
};

export const measureItems: MeasureItem[] = [
  {
    number: "01",
    title: "Wall width and room height",
    description:
      "Measure the full width where the wardrobe will stand and the finished floor-to-ceiling height.",
    diagram: "width-height",
  },
  {
    number: "02",
    title: "Available depth and skirting projection",
    description:
      "Measure usable depth from the wall to the outermost obstruction, including skirting, trims, tiles or switches.",
    diagram: "depth",
  },
  {
    number: "03",
    title: "Door clearance and doorway width",
    description:
      "Check room-door movement, wardrobe-door opening space and doorway width for safe access.",
    diagram: "clearance",
  },
  {
    number: "04",
    title: "Lift access and installation notes",
    description:
      "Confirm lift entrance, cabin size, stair width, landing space and any delivery restrictions.",
    diagram: "access",
  },
];

export const measureSteps: MeasureStep[] = [
  {
    number: 1,
    title: "Measure width",
    description:
      "Measure the clear wall width at the top, middle and bottom. Record the smallest measurement.",
    diagram: "width",
  },
  {
    number: 2,
    title: "Measure height",
    description:
      "Measure from finished floor to ceiling at the left, centre and right. Record the smallest measurement.",
    diagram: "height",
  },
  {
    number: 3,
    title: "Measure depth",
    description:
      "Measure from the wall to the outermost point, including skirting, trims, switches or projections.",
    diagram: "depth",
  },
  {
    number: 4,
    title: "Check access",
    description:
      "Measure doorway width, lift entrance, lift cabin, corridor turns, stair width, landing space and ceiling clearance.",
    diagram: "access",
  },
];

export const beforeOrderingItems = [
  "Check plug points, switches and electrical panels",
  "Verify beams, lofts and false ceilings",
  "Account for skirting, trims and wall tiles",
  "Check door swings and window openings",
  "Ensure clear delivery access",
  "Record the smallest measurement",
  "Share measurements and room photos when support is required",
];

export const spaceGuideRows: SpaceGuideRow[] = [
  {
    type: "1-Door",
    width: "18–24 inches",
    bestFor: "Compact spaces and secondary storage",
  },
  {
    type: "2-Door",
    width: "30–36 inches",
    bestFor: "Bedrooms and guest rooms",
  },
  {
    type: "3-Door",
    width: "45–54 inches",
    bestFor: "Larger bedrooms and shared storage",
  },
  {
    type: "4-Door",
    width: "60–72 inches",
    bestFor: "Large bedrooms and higher storage needs",
  },
];

export const measurementMistakes = [
  "Ignoring skirting or wall projections",
  "Measuring at only one point",
  "Forgetting wardrobe-door swing clearance",
  "Overlooking room-door or window movement",
  "Ignoring lift or staircase restrictions",
  "Measuring unfinished flooring instead of finished floor level",
  "Forgetting installation working space",
];

export const measurementFaqs: MeasurementFaqItem[] = [
  {
    question: "How much clearance is required for installation?",
    answer:
      "Clearance depends on the wardrobe model, room layout and installation method. Check the exact product dimensions and contact Wardro support when the available working space is tight.",
  },
  {
    question: "What if my ceiling or floor is uneven?",
    answer:
      "Measure at several points and record the smallest finished-floor-to-ceiling height. Share the measurements and room photos with Wardro support before ordering.",
  },
  {
    question: "Can I customize the wardrobe height or depth?",
    answer:
      "Wardro products use the sizes and options listed on their product pages. Do not assume full custom sizing; contact support to confirm whether an available variant suits your room.",
  },
  {
    question: "What measurements should I share?",
    answer:
      "Share the smallest wall width, height and usable depth, plus doorway, lift or stair access measurements and clear photos of skirting, switches, windows and other projections.",
  },
  {
    question: "How should I measure skirting or wall projections?",
    answer:
      "Measure usable depth from the wall to the outermost obstruction and note the projection height. Include trims, wall tiles, switches and plug points in your photos.",
  },
  {
    question: "What if the wardrobe does not fit through the lift or stairs?",
    answer:
      "Do not place the order until access has been reviewed. Record doorway, lift, landing, corridor and stair measurements, then contact Wardro support for guidance.",
  },
  {
    question: "Do you provide a site-measurement service?",
    answer:
      "Site-measurement availability is not assumed. Contact Wardro support to ask about assistance available for your product and delivery location.",
  },
];

