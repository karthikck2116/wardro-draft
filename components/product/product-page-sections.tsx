import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  House,
  Layers3,
  PanelTopClose,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/types/commerce";
import { ProductCard } from "@/components/commerce/product-card";

type ProductPageSectionsProps = {
  product: Product;
  relatedProducts: Product[];
};

type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const highlights: Highlight[] = [
  {
    title: "Smarter internal organisation",
    description: "Practical zones keep everyday items easy to reach.",
    icon: Boxes,
  },
  {
    title: "Strong construction",
    description: "A stable wardrobe made for dependable daily use.",
    icon: ShieldCheck,
  },
  {
    title: "Made for Indian homes",
    description: "Useful proportions for modern bedrooms and routines.",
    icon: House,
  },
  {
    title: "Easy everyday use",
    description: "Clear sections make organising and access simpler.",
    icon: Sparkles,
  },
];

const materialCards = [
  {
    title: "Engineered Wood",
    description:
      "Premium engineered wood construction with a warm, easy-care finish.",
    image: "/images/materials/engineered-wood.png",
    imageAlt: "Close-up of layered engineered wood boards",
    icon: Layers3,
  },
  {
    title: "Tested Hardware",
    description:
      "Wardrobe hardware selected to support smooth, dependable everyday use.",
    image: "/images/materials/tested-hardware.png",
    imageAlt: "Close-up of wardrobe hinge hardware",
    icon: ShieldCheck,
  },
  {
    title: "Precision Channels",
    description:
      "Drawer-channel details are matched to the selected wardrobe configuration.",
    image: "/images/materials/precision-channels.png",
    imageAlt: "Close-up of a drawer channel installed in a wardrobe",
    icon: PanelTopClose,
  },
];

export function ProductPageSections({
  product,
  relatedProducts,
}: ProductPageSectionsProps) {
  return (
    <>
      <ProductHighlights />
      <ProductInterior product={product} />
      <ProductSpecifications product={product} />
      <ProductMaterials />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}

function ProductHighlights() {
  return (
    <section className="pdp-section pdp-highlights" aria-labelledby="highlights-title">
      <div className="pdp-section-heading pdp-section-heading--inline">
        <div>
          <span>Product highlights</span>
          <h2 id="highlights-title">Designed around daily life</h2>
        </div>
        <p>Thoughtful details that make storage calmer and easier to use.</p>
      </div>
      <div className="pdp-highlight-grid">
        {highlights.map(({ title, description, icon: Icon }) => (
          <article key={title}>
            <span className="pdp-highlight-icon">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductInterior({ product }: { product: Product }) {
  return (
    <section className="pdp-section pdp-interior" aria-labelledby="interior-title">
      <div className="pdp-interior-visual">
        <WardrobeInteriorDiagram title={product.title} />
      </div>
      <div className="pdp-interior-copy">
        <div className="pdp-section-heading">
          <span>Inside your wardrobe</span>
          <h2 id="interior-title">Inside the {product.title}</h2>
          <p>
            A clearly planned layout separates hanging garments, folded clothes,
            accessories and larger everyday items so everything has a useful place.
          </p>
        </div>
        <ul>
          {[
            ["Hanging zone", "Keeps shirts, jackets and longer garments easy to see."],
            ["Adjustable shelves", "Flexible space for folded clothes and linen."],
            ["Drawer area", "A practical home for smaller daily essentials."],
            ["Accessory zone", "Dedicated room for compact organisers and trays."],
            ["Bottom storage", "Space for bags, boxes and less-used items."],
          ].map(([title, description]) => (
            <li key={title}>
              <CheckCircle2 aria-hidden="true" />
              <span>
                <b>{title}</b>
                <small>{description}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WardrobeInteriorDiagram({ title }: { title: string }) {
  return (
    <svg
      className="pdp-interior-diagram"
      viewBox="0 0 760 480"
      role="img"
      aria-labelledby="interior-diagram-title interior-diagram-description"
    >
      <title id="interior-diagram-title">{`Interior layout of ${title}`}</title>
      <desc id="interior-diagram-description">
        Technical wardrobe illustration showing a hanging zone, shelves, drawers,
        accessory storage and bottom storage.
      </desc>
      <defs>
        <linearGradient id="wardrobe-shell" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f4e6d8" />
          <stop offset="1" stopColor="#e5cdb8" />
        </linearGradient>
        <linearGradient id="wardrobe-back" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fffaf4" />
          <stop offset="1" stopColor="#f4e8dc" />
        </linearGradient>
      </defs>
      <rect x="88" y="36" width="584" height="404" rx="13" fill="url(#wardrobe-shell)" stroke="#8c5b40" strokeWidth="4" />
      <rect x="108" y="56" width="544" height="362" rx="5" fill="url(#wardrobe-back)" stroke="#cba98e" strokeWidth="2" />
      <path d="M330 56v362M500 56v362" stroke="#9b6c50" strokeWidth="4" />
      <path d="M125 104h188" stroke="#8c5b40" strokeWidth="5" strokeLinecap="round" />
      <path d="M145 105q18 18 36 0m-18 0v29l-29 23h58l-29-23m60-29q18 18 36 0m-18 0v29l-29 23h58l-29-23" fill="none" stroke="#b33414" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M125 286h188M125 352h188" stroke="#b98e72" strokeWidth="4" />
      <rect x="126" y="365" width="86" height="38" rx="4" fill="#d9bba2" stroke="#8c5b40" strokeWidth="2" />
      <rect x="226" y="365" width="86" height="38" rx="4" fill="#d9bba2" stroke="#8c5b40" strokeWidth="2" />
      {[104, 171, 238, 305].map((y) => (
        <path key={y} d={`M348 ${y}h134`} stroke="#b98e72" strokeWidth="4" />
      ))}
      <rect x="348" y="322" width="134" height="38" rx="4" fill="#d9bba2" stroke="#8c5b40" strokeWidth="2" />
      <circle cx="379" cy="342" r="4" fill="#8c5b40" />
      <circle cx="451" cy="342" r="4" fill="#8c5b40" />
      <path d="M518 103h116M518 158h116M518 213h116" stroke="#b98e72" strokeWidth="4" />
      <rect x="520" y="231" width="112" height="78" rx="7" fill="#fbe8de" stroke="#b33414" strokeWidth="2" />
      <path d="M541 256h70M541 276h52" stroke="#b33414" strokeWidth="3" strokeLinecap="round" />
      <rect x="518" y="327" width="116" height="76" rx="6" fill="#d8b79c" stroke="#8c5b40" strokeWidth="2" />
      <path d="M530 347h92M530 370h92" stroke="#9d6b4f" strokeWidth="2" />
      <path d="M96 424h568" stroke="#75472f" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function ProductSpecifications({ product }: { product: Product }) {
  const dimensionValues = product.dimensions.match(/\d+/g) ?? [];
  const [height, width, depth] = dimensionValues;
  const groups = [
    {
      title: "Dimensions",
      items: [
        ["Height", height ? `${height} cm` : product.dimensions],
        ["Width", width ? `${width} cm` : "See product dimensions"],
        ["Depth", depth ? `${depth} cm` : "See product dimensions"],
        ["Door count", `${product.doorCount}`],
      ],
    },
    {
      title: "Materials",
      items: [
        ["Main board", "Premium engineered wood"],
        ["Available finishes", product.colours.join(", ")],
      ],
    },
    {
      title: "Hardware",
      items: [
        ["Door system", `${product.type} configuration`],
        ["Accessory compatibility", product.accessories.length ? "Available" : "Not listed"],
      ],
    },
    {
      title: "Delivery",
      items: [
        ["Format", product.readyToDispatch ? "Ready to dispatch" : "Made to order"],
        ["Installation", "Partner installation in serviceable areas"],
        ["Warranty", "5 years from invoice date"],
      ],
    },
  ];

  return (
    <section className="pdp-section pdp-specifications" aria-labelledby="specifications-title">
      <div className="pdp-section-heading pdp-section-heading--inline">
        <div>
          <span>Product details</span>
          <h2 id="specifications-title">Dimensions &amp; specifications</h2>
        </div>
        <p>Clear product information, grouped for quick comparison.</p>
      </div>
      <div className="pdp-specification-grid">
        {groups.map((group) => (
          <details open key={group.title}>
            <summary>{group.title}</summary>
            <dl>
              {group.items.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </section>
  );
}

function ProductMaterials() {
  return (
    <section className="pdp-section pdp-materials" aria-labelledby="materials-title">
      <div className="pdp-section-heading pdp-section-heading--inline">
        <div>
          <span>Materials &amp; quality</span>
          <h2 id="materials-title">Quality you can see</h2>
        </div>
        <Link href="/materials-and-quality">
          Explore Materials &amp; Quality <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="pdp-material-grid">
        {materialCards.map(({ title, description, image, imageAlt, icon: Icon }) => (
          <article key={title}>
            <div className="pdp-material-image">
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="pdp-material-content">
              <span className="pdp-material-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="pdp-section pdp-related" aria-labelledby="related-title">
      <div className="pdp-section-heading pdp-section-heading--inline">
        <div>
          <span>Complete your shortlist</span>
          <h2 id="related-title">You May Also Like</h2>
        </div>
        <Link href="/collections/all-wardrobes">
          View all wardrobes <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="product-grid pdp-related-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} context="related" />
        ))}
      </div>
    </section>
  );
}
