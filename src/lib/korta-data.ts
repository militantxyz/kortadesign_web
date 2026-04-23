import { blogContentMap } from "@/lib/blog-content";

export const asset = (path: string) => `/wp-content/uploads/${path}`;

export type Zone = "AQUA" | "FUOCO" | "ARIA";

export type Product = {
  slug: string;
  title: string;
  type: string;
  zone: Zone;
  description: string[];
  cardImage: string;
  heroImage: string;
  gallery: string[];
  formTitle: string;
  materials: {
    title: string;
    items: string[];
  }[];
  additions?: string[];
  docs?: {
    label: string;
    href: string;
  }[];
  designedBy?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
};

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/kortadesign" },
  { label: "Instagram", href: "https://www.instagram.com/kortadesign/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/korta-design?originalSubdomain=hr",
  },
  { label: "Pinterest", href: "https://www.pinterest.com/kortadesign/" },
];

export const nav = [
  {
    label: "Collections",
    href: "/collections",
    groups: [
      {
        label: "AQUA",
        href: "/collections#AQUA",
        items: ["odino", "marbella", "minimo", "malla", "minno", "kada"],
      },
      {
        label: "FUOCO",
        href: "/collections#FUOCO",
        items: ["gardenzio", "kamin"],
      },
      {
        label: "ARIA",
        href: "/collections#ARIA",
        items: ["ponte", "dipinto", "cara"],
      },
    ],
  },
  {
    label: "KORTA Lifestyle",
    href: "/our-story",
    groups: [
      {
        label: "Stories",
        href: "/our-story",
        items: ["our-story", "projects", "sustainability", "blog", "join"],
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    groups: [
      {
        label: "Help",
        href: "/contact",
        items: ["store-locator", "contact"],
      },
    ],
  },
];

export const naturalStoneFinishes = [
  "Brushed",
  "Flamed Brushed",
  "Sandblasted Brushed",
  "Bush Hammered Brushed",
  "Rigato",
];

export const porcelainFinishes = [
  "Golden White",
  "Statuario",
  "Saint Laurent",
  "Sahara Noir",
  "Smoke",
  "Grigio Carnico",
  "Rovere Francese",
  "Limestone Ivory",
  "Verde Aver",
  "Sodalite Blu",
  "Corten",
];

export const handleFinishes = [
  "Inox",
  "Graphite",
  "GunMetal",
  "Gold",
  "Bronze",
  "Anthracite",
  "Black",
  "Champagne",
  "BHB",
  "IceChrome",
  "Blue",
  "Rame",
  "Nichel",
  "MultiColor",
];

const showerAdditions = [
  "Motion Sensor",
  "Heating Cable",
  "Logo Engraving",
  "Solar-heated Water Tank",
  "Shower Handle",
  "Lighting",
  "Floor Decking",
  "XL Showerhead",
];

const showerMaterials = [
  { title: "Natural Stone Kanfanar", items: naturalStoneFinishes },
  { title: "Marazzi Porcelain Stoneware", items: porcelainFinishes },
  { title: "Handle Finishes (PVD Coating)", items: handleFinishes },
];

const furnitureMaterials = [
  { title: "Natural Stone Kanfanar", items: naturalStoneFinishes },
  { title: "Marazzi Porcelain Stoneware", items: porcelainFinishes },
];

export const products: Product[] = [
  {
    slug: "odino",
    title: "ODINO",
    type: "Outdoor Shower",
    zone: "AQUA",
    description: [
      "ODINO is the flagship of the KORTA collections, featured by simplicity and clean lines; monumental in design yet elegant and extremely photogenic.",
      "Ideal for luxury properties with infinity view backgrounds.",
    ],
    cardImage: asset("2025/02/odino.png"),
    heroImage: asset(
      "2025/01/PRODUCT-OUTDOOR-SHOWER-ODINO-MATERIAL-PORCELAIN-MARAZZI-SAMPLE-GOLDEN-WHITE-PROJECT-LOCATION-CROATIA-CLIENT-GRAND-PARK-HOTEL-1-1024x684.jpg"
    ),
    gallery: [
      asset("2025/01/ODINO-SANDBLASTED-min-1-e1739134306202.png"),
      asset("2025/01/ODINO-POLISHED-min-1-e1739133710562.png"),
      asset("2025/09/Odino_Kanfanar-rigato-1024x724.png"),
      asset("2025/09/Odino_Marazzi-Verde-Aver-1024x724.png"),
    ],
    formTitle: "Create Your Perfect Shower",
    materials: showerMaterials,
    additions: showerAdditions,
    docs: [
      { label: "Spec Sheet", href: asset("2025/11/SPEC.-SHEET-ODINO-REV3.pdf") },
      { label: "Install Instructions", href: asset("2025/01/ODINO-INSTALL.-INSTR-1.pdf") },
      { label: "How to Unload", href: asset("2025/01/How-to-unload-Odino-2.pdf") },
    ],
    designedBy: true,
  },
  {
    slug: "marbella",
    title: "MARBELLA",
    type: "Outdoor Shower",
    zone: "AQUA",
    description: [
      "MARBELLA is a freestanding outdoor shower, featured by neat lines; minimalist in design expression and timelessly elegant as an element in an outdoor space.",
      "Hand-made of natural stone, it symbolically serves as a monument to nature and fits with the landscape, ageing graciously along nature's eternal transformational path.",
    ],
    cardImage: asset("2025/02/marbella.png"),
    heroImage: asset(
      "2025/02/PRODUCT-OUTDOOR-SHOWER-MARBELLA-MATERIAL-LIMESTONE-KANFANAR-SAMPLE-RIGATO-PROJECT-LOCATION-CROATIA-CLIENT-VILLA-PANORAMICA-11-1024x683.jpg"
    ),
    gallery: [
      asset("2025/01/marbela-polished-e1739195123289.png"),
      asset("2025/01/marbela-sandblasted-e1739195562400.png"),
      asset("2025/01/marbella-gw-e1739195705827.png"),
      asset("2025/01/Italiana-outdoor-shower-Saint-Laurent-SATIN-1-scaled.jpg"),
    ],
    formTitle: "Create Your Perfect Shower",
    materials: showerMaterials,
    additions: showerAdditions.slice(0, 6),
    docs: [
      { label: "Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MARBELLA-REV3.pdf") },
      { label: "Install Instructions", href: asset("2025/01/MARBELLA-INSTALL.-INSTR-1.pdf") },
      { label: "Foundation Preparation", href: asset("2025/01/MARBELLA-FOUNDATION-PREPARATION-1.pdf") },
    ],
  },
  {
    slug: "minimo",
    title: "MINIMO",
    type: "Outdoor Shower",
    zone: "AQUA",
    description: [
      "The uniqueness behind MINIMO is the passion for natural stone and hand-crafting.",
      "The idea was to create something more than an outdoor shower: a sculpture with the feature of an outdoor shower, assembled in the factory and delivered as one piece.",
    ],
    cardImage: asset("2025/02/minimo.png"),
    heroImage: asset("2025/01/IMG_20240501_112428-scaled.jpg"),
    gallery: [
      asset("2025/02/minimo.png"),
      asset("2025/01/ODINO-SANDBLASTED-min-1-e1739134306202.png"),
      asset("2025/01/IMG_20240501_112428-922x2048.jpg"),
    ],
    formTitle: "Create Your Perfect Shower",
    materials: showerMaterials,
    additions: showerAdditions.slice(0, 5),
    docs: [
      { label: "Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MINIMO-REV3.pdf") },
      { label: "Install Instructions", href: asset("2025/01/MINIMO-INSTALL.-INSTR-1.pdf") },
      { label: "Foundation Preparation", href: asset("2025/01/MINIMO-FOUNDATION-PREPARATION-1.pdf") },
    ],
    designedBy: true,
  },
  {
    slug: "malla",
    title: "MALLA",
    type: "Outdoor Shower",
    zone: "AQUA",
    description: [
      "MALLA brings the outdoor shower into a lighter architectural language: slim, minimal and precise.",
      "Designed for terraces, pool decks and contemporary gardens, it works as both a functional shower and a calm vertical marker in the landscape.",
    ],
    cardImage: asset("2025/11/Sandblasted-664x1024.png"),
    heroImage: asset("2025/11/Malla.jpg"),
    gallery: [
      asset("2025/11/Malla.jpg"),
      asset("2025/11/MALLA_01.jpg"),
      asset("2025/11/IMG_1111.jpg"),
      asset("2025/11/IMG_1322.jpg"),
    ],
    formTitle: "Create Your Perfect Shower",
    materials: showerMaterials,
    additions: showerAdditions,
    docs: [{ label: "Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MALLA-REV-0.pdf") }],
    designedBy: true,
  },
  {
    slug: "minno",
    title: "MINNO",
    type: "Outdoor Shower",
    zone: "AQUA",
    description: [
      "MINNO is inspired by the Odino shower from our collection.",
      "With its remarkable, minimalistic frame shape, it can be a superb backdrop, especially when placed in front of a beautiful landscape.",
    ],
    cardImage: asset("2025/02/minno.png"),
    heroImage: asset("2025/01/minno-dubai-02.png"),
    gallery: [
      asset("2025/01/minno-dubai-02.png"),
      asset("2025/01/mino-miami-10-1.png"),
      asset("2025/02/minno-sandblasted-scaled-e1740472410594.jpg"),
      asset("2026/01/Minno_Kanfanar-rigato-scaled-e1769070666754.png"),
    ],
    formTitle: "Create Your Perfect Shower",
    materials: showerMaterials,
    additions: showerAdditions,
    docs: [{ label: "Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MINNO-REV1.pdf") }],
    designedBy: true,
  },
  {
    slug: "kada",
    title: "KADA",
    type: "Outdoor Bathtub",
    zone: "AQUA",
    description: [
      "KADA is a lovely addition to giving your garden a touch of luxury, particularly when combined with an outdoor shower.",
      "Outdoor spa areas and garden bathtubs have become very popular; KADA recreates that hotel and retreat feeling at home.",
    ],
    cardImage: asset("2025/02/kada.png"),
    heroImage: asset("2025/02/kada-01_blank_kanfanar-polished-1024x724.jpg"),
    gallery: [
      asset("2025/01/kada-2-e1678350561558-1386x1536-1.png"),
      asset("2025/02/kada-01_blank_kanfanar-polished-scaled.jpg"),
      asset("2025/02/Switzerland-3.jpg"),
    ],
    formTitle: "Create Your Perfect Bathtub",
    materials: [{ title: "Natural Stone Kanfanar", items: ["Brushed"] }],
    additions: [
      "Version 1-1 (wall thickness 6cm)",
      "Version 1-2 (wall thickness 10cm)",
      "Version 1-3 (wall thickness 6cm, outside wall in slope)",
      "Version 2-1 (wall thickness 6cm)",
    ],
    docs: [
      { label: "Spec Sheet", href: asset("2025/02/KADA-spec-sheet-1.pdf") },
      { label: "Spec Sheet 2", href: asset("2025/02/KADA-spec-sheet-2.pdf") },
    ],
  },
  {
    slug: "gardenzio",
    title: "GARDENZIO",
    type: "Outdoor Kitchen",
    zone: "FUOCO",
    description: [
      "The GARDENZIO kitchen has been developed as the perfect blend of unique design, durability and functionality.",
      "It is built to become an addition to outdoor dining: timeless, durable and ready for endless use.",
    ],
    cardImage: asset("2025/02/gardenzio-1.png"),
    heroImage: asset("2025/01/G2-Elegante-Kanfanar-and-White-Stained-Oak-scaled-1.jpg"),
    gallery: [
      asset("2025/02/gardenzio.png"),
      asset("2025/01/G2-Elegante-St.Laurent-and-IPE-002-scaled-1.jpg"),
      asset("2025/01/Kuchyna_Profirol-115-scaled-1.jpg"),
      asset("2025/01/IMG_9189-HDR-Edit-scaled-1.jpg"),
    ],
    formTitle: "Create Your Perfect Outdoor Kitchen",
    materials: [
      { title: "Wood", items: ["European Oak", "Brazilian IPE", "Siberian Larch", "Laminate"] },
      { title: "Metal", items: ["Black", "Anthracite", "Grey", "Latte", "Mocha"] },
      {
        title: "Stone",
        items: [
          "Kanfanar Polished",
          "Kanfanar Flamed + Brushed",
          "Kanfanar Sandblasted + Brushed",
          "Nero Absolute",
          "Steel Grey",
          "Vizag Blue",
          "Verde Marina",
          "MultiColour Red",
          "Pietra Grey",
          "Milan Stone",
          "Calacatta Oro",
        ],
      },
    ],
    additions: ["Flat Back", "Wall Adjacent", "Island", "Robusta", "Elegante", "Compatto", "Medio", "Grande"],
    docs: [{ label: "Spec Sheet", href: asset("2025/02/KORTA_Gardenzio-Product-specification_ENGV3.pdf") }],
  },
  {
    slug: "kamin",
    title: "KAMIN",
    type: "Fireplace",
    zone: "FUOCO",
    description: [
      "KAMIN, an Istrian word for fireplace, represents the heritage of our premium-designed outdoor fire pits.",
      "Experience a harmonious fusion of elegance and warmth, elevating your surroundings with a sublime sense of serenity and charm.",
    ],
    cardImage: asset("2025/02/kamin.png"),
    heroImage: asset("2025/01/neocube-o-print-2-scaled-1.jpg"),
    gallery: [
      asset("2025/02/kamin_3-removebg-preview.png"),
      asset("2025/01/Capture2-min.png"),
      asset("2025/01/eldoform-184-R-min-1536x1151-1.jpg"),
    ],
    formTitle: "Create Your Perfect Fireplace",
    materials: [{ title: "Natural Stone Kanfanar", items: naturalStoneFinishes }],
    docs: [
      { label: "Installation Instructions", href: asset("2025/02/KAMIN-install-instructions-1.pdf") },
      { label: "Technical Drawings", href: asset("2025/02/KAMIN-techical-drawings.pdf") },
    ],
  },
  {
    slug: "ponte",
    title: "PONTE",
    type: "Coffee Table",
    zone: "ARIA",
    description: [
      "PONTE serves as both a functional and decorative element: a coffee table for sun loungers or a side table for an outdoor bathroom.",
      "Following the clean lines of the Marbella and Odino showers, it unobtrusively elevates the aesthetic perception of the space.",
    ],
    cardImage: asset("2025/02/ponte.png"),
    heroImage: asset("2025/01/KAL1780.jpg"),
    gallery: [
      asset("2025/02/ponte.png"),
      asset("2025/01/PONTE-GW-e1739222964156.png"),
      asset("2025/01/PONTE-SAND-e1739222911722.png"),
      asset("2025/01/IL-287-min-scaled-e1645447669543.jpg"),
    ],
    formTitle: "Create Your Perfect Table",
    materials: furnitureMaterials,
    docs: [{ label: "Spec Sheet", href: asset("2025/01/PONTE-spec-sheet-1.pdf") }],
  },
  {
    slug: "dipinto",
    title: "DIPINTO",
    type: "Side Table",
    zone: "ARIA",
    description: [
      "DIPINTO has both a practical and decorative role within the KORTA collections.",
      "Placed as a single piece or a group of side tables for various purposes, it contributes to dynamic outdoor ambiences.",
    ],
    cardImage: asset("2025/02/dipinto.png"),
    heroImage: asset("2025/02/Dipinto-side-table-rigato.jpeg"),
    gallery: [
      asset("2025/01/DIPINTO.jpg"),
      asset("2025/01/DIPINTO-POLISHED-e1739198405370.png"),
      asset("2025/01/DIPINTO-SL-e1739199004558.png"),
      asset("2025/01/IL-158-min-scaled-1.jpg"),
    ],
    formTitle: "Create Your Perfect Table",
    materials: furnitureMaterials,
    docs: [{ label: "Spec Sheet", href: asset("2025/01/DIPINTO-SPEC-SHEET.pdf") }],
  },
  {
    slug: "cara",
    title: "CARA",
    type: "Planter",
    zone: "ARIA",
    description: [
      "CARA is a line of planters available in two different shapes, perfectly matching the rest of the KORTA collections.",
      "As standalone elements, they make a minimalist design statement in the outdoor environment.",
    ],
    cardImage: asset("2025/02/cara.png"),
    heroImage: asset("2025/01/cara.jpg"),
    gallery: [
      asset("2025/02/CARA-GW-e1739224767345.png"),
      asset("2025/01/CARA-POLISHED-e1739224206580.png"),
      asset("2025/01/CARA-SAND-e1739224396466.png"),
      asset("2025/01/GROTA-Plano-Rigato-vase-e1646873964986-1-1.jpg"),
    ],
    formTitle: "Create Your Perfect Planter",
    materials: furnitureMaterials,
    docs: [{ label: "Spec Sheet", href: asset("2025/01/CARA-spec-sheet-1.pdf") }],
  },
];

export const productMap = new Map(products.map((product) => [product.slug, product]));

export const projects = [
  { name: "Baoli Dubai", image: asset("2025/01/logo-baoli-dubai.svg") },
  { name: "Aman", image: asset("2025/01/image-2.png") },
  { name: "Spindler", image: asset("2025/01/spindler_logo-transformed-1.png") },
  { name: "Diamond Villa Korcula", image: asset("2025/01/diamondvillakorcula.png") },
  { name: "Villa Project", image: asset("2025/01/image-3.png") },
  { name: "Maiora", image: asset("2025/01/maiora-logo-kategorizacija-3.png") },
  { name: "V", image: asset("2025/01/vlogo2-removebg-preview.png") },
  { name: "Themis", image: asset("2025/01/Themis-logo-removebg-preview.png") },
  { name: "Private Residence", image: asset("2025/01/logo.b30c6336.svg") },
  { name: "Primosten Resort", image: asset("2025/02/Primosten-Resort-Logo-Top-min.png") },
  { name: "LIOQA Resort", image: asset("2025/02/LIOQA_Resort_logo_transparent-removebg-preview.png") },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "changing-the-way-you-see-outdoor-showers-forever",
    title: "Changing the way you see outdoor showers forever",
    date: "February 8, 2026",
    image: asset(
      "2026/02/00_PRODUCT-OUTDOOR-SHOWER-MARBELLA-MATERIAL-PORCELAIN-MARAZZI-SAMPLE-SAINT-LAURENT-PROJECT-LOCATION-SAUDI-ARABIA-CLIENT-PRIVATE-VILLA--1024x768.jpg"
    ),
    excerpt: "A look at outdoor showers as sculptural, architectural wellness pieces.",
    content: blogContentMap["changing-the-way-you-see-outdoor-showers-forever"],
  },
  {
    slug: "luxury-showers",
    title: "Luxury Showers by KORTA: Special Outdoor Bathing Experience",
    date: "July 25, 2025",
    image: asset("2025/07/luxury-showers-by-korta-1024x683.jpg"),
    excerpt: "How KORTA turns outdoor bathing into a refined daily ritual.",
    content: blogContentMap["luxury-showers"],
  },
  {
    slug: "where-is-the-best-place-to-put-an-outdoor-shower",
    title: "Where Is the Best Place to Put an Outdoor Shower?",
    date: "February 27, 2025",
    image: asset("2025/01/IMG_0180-scaled-1-1024x683.jpg"),
    excerpt: "Practical considerations for placing a shower near pools, gardens or spa zones.",
    content: blogContentMap["where-is-the-best-place-to-put-an-outdoor-shower"],
  },
  {
    slug: "what-is-the-minimum-space-for-an-outdoor-shower",
    title: "What Is the Minimum Space for an Outdoor Shower?",
    date: "February 27, 2025",
    image: asset("2025/01/IMG_20240501_112428-461x1024.jpg"),
    excerpt: "Compact planning notes for outdoor shower installations.",
    content: blogContentMap["what-is-the-minimum-space-for-an-outdoor-shower"],
  },
  {
    slug: "does-an-outdoor-shower-add-value",
    title: "Does an Outdoor Shower Add Value?",
    date: "February 27, 2025",
    image: asset("2025/01/CAP-SPA-34-1024x819.jpg"),
    excerpt: "Why outdoor wellness features can elevate a property experience.",
    content: blogContentMap["does-an-outdoor-shower-add-value"],
  },
  {
    slug: "do-outdoor-showers-require-a-drain",
    title: "Do Outdoor Showers Require a Drain?",
    date: "February 26, 2025",
    image: asset(
      "2025/01/PRODUCT-OUTDOOR-SHOWER-ODINO-MATERIAL-PORCELAIN-MARAZZI-SAMPLE-GOLDEN-WHITE-PROJECT-LOCATION-CROATIA-CLIENT-GRAND-PARK-HOTEL-1-1024x684.jpg"
    ),
    excerpt: "Drainage, location and installation basics for exterior showers.",
    content: blogContentMap["do-outdoor-showers-require-a-drain"],
  },
  {
    slug: "can-an-outdoor-shower-have-hot-water",
    title: "Can an Outdoor Shower Have Hot Water?",
    date: "February 26, 2025",
    image: asset("2025/01/421375002-1024x683.jpg"),
    excerpt: "Options for heating and comfort in outdoor wellness zones.",
    content: blogContentMap["can-an-outdoor-shower-have-hot-water"],
  },
  {
    slug: "how-outdoor-living-spaces-can-boost-your-propertys-value",
    title: "How Outdoor Living Spaces Can Boost Your Property's Value",
    date: "February 18, 2025",
    image: asset("2025/02/Pool-Area-1024x576.jpg"),
    excerpt: "A guide to outdoor living investments with long-term appeal.",
    content: blogContentMap["how-outdoor-living-spaces-can-boost-your-propertys-value"],
  },
  {
    slug: "outdoor-wellness-the-ultimate-guide",
    title: "Outdoor Wellness - The Ultimate Guide",
    date: "February 18, 2025",
    image: asset("2025/01/DSC9674-min-1024x683.jpg"),
    excerpt: "Foundational ideas for calm, elegant outdoor wellness spaces.",
    content: blogContentMap["outdoor-wellness-the-ultimate-guide"],
  },
  {
    slug: "explore-exclusive-stone-shower-ideas",
    title: "Explore Exclusive Stone Shower Ideas",
    date: "February 18, 2025",
    image: asset("2025/01/457191069_18238192813287149_6995055244974915748_n-1024x622.jpg"),
    excerpt: "Inspiration for stone, landscape and architectural detail.",
    content: blogContentMap["explore-exclusive-stone-shower-ideas"],
  },
  {
    slug: "why-choose-an-outdoor-stone-shower",
    title: "Why Choose An Outdoor Stone Shower?",
    date: "February 18, 2025",
    image: asset("2025/01/IMG_9111-_IG-scaled-1-e1737540591816-1024x681.jpg"),
    excerpt: "The material case for natural stone in exterior bathing.",
    content: blogContentMap["why-choose-an-outdoor-stone-shower"],
  },
  {
    slug: "how-to-enhance-poolside-experience-with-kortas-stylish-poolside-showers",
    title: "How To Enhance Poolside Experience With Korta's Stylish Poolside Showers",
    date: "February 14, 2025",
    image: asset("2025/02/Italiana-wellbeing-shower-Goldenwhite-LUx-2-scaled-2.jpg"),
    excerpt: "How a well-designed poolside shower improves comfort, hygiene and visual impact.",
    content:
      blogContentMap["how-to-enhance-poolside-experience-with-kortas-stylish-poolside-showers"],
  },
];

export const blogMap = new Map(blogPosts.map((post) => [post.slug, post]));

export const designerCopy = [
  "Sandro Užila was born in Pula, Croatia on 6 September 1991. After elementary school he left home at the age of 14 to begin his learning journey in Italy, where he studied surveying, engineering, architecture and design in Trieste and Venice.",
  "In August 2017, at the age of 25, he opened his own studio in Poreč, Croatia and later opened another one in Fažana.",
  "In 2023, he wrote a piece of American history by redesigning Delmonico's Restaurant in Manhattan, New York, the first fine dining restaurant in the US and a New York landmark.",
  "Now he is actively pursuing the ideal of perfection in technical solutions by exploring unexpected and innovative paths of creativity.",
];
