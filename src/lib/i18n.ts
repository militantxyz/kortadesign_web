export const locales = ["en", "hr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeInfo = {
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN", switchLabel: "HR" },
  hr: { htmlLang: "hr", ogLocale: "hr_HR", label: "HR", switchLabel: "EN" },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/hr") {
    return "/";
  }

  if (pathname.startsWith("/hr/")) {
    return pathname.slice(3);
  }

  return pathname;
}

export function localizePath(locale: Locale, pathname: string) {
  const normalizedPath =
    pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (locale === "en") {
    return stripLocalePrefix(normalizedPath);
  }

  return normalizedPath === "/" ? "/hr" : `/hr${stripLocalePrefix(normalizedPath)}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return localizePath(locale, stripLocalePrefix(pathname));
}

type Dictionary = {
  seo: {
    siteTitle: string;
    defaultDescription: string;
    homeTitle: string;
    homeDescription: string;
    staticPageSeo: Record<
      | "collections"
      | "our-story"
      | "projects"
      | "sustainability"
      | "blog"
      | "join"
      | "contact"
      | "store-locator"
      | "catalogues"
      | "legal"
      | "eu",
      {
        title: string;
        description: string;
        keywords: string[];
      }
    >;
  };
  header: {
    ariaHome: string;
    primaryNav: string;
    home: string;
    blog: string;
    openMenu: string;
    closeMenu: string;
    closeOverlay: string;
    switchToEnglish: string;
    switchToCroatian: string;
  };
  nav: {
    collections: string;
    lifestyle: string;
    contact: string;
    stories: string;
    help: string;
    slugLabels: Record<string, string>;
  };
  footer: {
    collections: string;
    lifestyle: string;
    help: string;
    visitAtelier: string;
    distributorTitle: string;
    contactUs: string;
    descriptor: string;
    ourStory: string;
    sustainability: string;
    projects: string;
    join: string;
    storeLocator: string;
    generalContacts: string;
    catalogues: string;
    legal: string;
    newsletter: string;
    nameAndSurname: string;
    email: string;
    apply: string;
    euAlt: string;
  };
  floatingContact: {
    quickLinks: string;
    emailKorta: string;
    callKorta: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroCopy: string;
    exploreCollections: string;
    downloadCatalogue: string;
    metrics: [string, string][];
    introEyebrow: string;
    introTitle: string;
    introCopy: string;
    dearClient: string;
    introParagraphs: string[];
    zoneCards: Array<{ label: string; title: string; copy: string }>;
    viewZone: string;
    materialEyebrow: string;
    materialTitle: string;
    materialCopy: string;
    downloadMaterialBook: string;
    materialItems: string[];
    inspiredEyebrow: string;
    inspiredTitle: string;
    inspiredCopy: string;
    viewProjects: string;
    collectionEyebrow: string;
    collectionTitle: string;
    collectionCopy: string;
    seeAll: string;
    journalEyebrow: string;
    journalTitle: string;
    journalCopy: string;
    readJournal: string;
  };
  clientele: {
    title: string;
  };
  collections: {
    eyebrow: string;
    title: string;
    copy: string;
    meta: string[];
    planningEyebrow: string;
    planningTitle: string;
    planningCopy: string;
    zoneCopy: Record<"AQUA" | "FUOCO" | "ARIA", string>;
    zoneLabel: string;
  };
  projectsBand: {
    eyebrow: string;
    title: string;
    readMore: string;
  };
  contact: {
    heroTitle: string;
    heroEyebrow: string;
    heroCopy: string;
    assistanceEyebrow: string;
    assistanceTitle: string;
    assistanceCopy: string;
    fields: {
      nameAndSurname: string;
      email: string;
      message: string;
      send: string;
    };
    contactTitles: string[];
  };
  catalogues: {
    heroTitle: string;
    heroEyebrow: string;
    heroCopy: string;
    resourcesEyebrow: string;
    resourcesTitle: string;
    resourcesCopy: string;
    docs: Array<{ label: string; description: string }>;
  };
  story: {
    heroCopy: string;
    heroEyebrow: string;
    heroTitle: string;
    introEyebrow: string;
    introTitle: string;
    introParagraphs: string[];
    whatWeDo: Array<{ title: string; copy: string }>;
    definitionLabel: string;
    definitionText: string;
    etymologyLabel: string;
    heritageEyebrow: string;
    heritageTitle: string;
    heritageParagraphs: string[];
    heritageMilestones: string[];
    philosophyEyebrow: string;
    philosophyTitle: string;
    philosophyCopy: string;
    philosophyPillars: string[];
    ceoEyebrow: string;
    ceoTitle: string;
    ceoParagraphs: string[];
    ceoRole: string;
    lifestyleParagraphs: string[];
  };
  designer: {
    eyebrow: string;
    title: string;
  };
  sustainability: {
    heroTitle: string;
    heroEyebrow: string;
    heroCopy: string;
    responsibilityEyebrow: string;
    responsibilityTitle: string;
    responsibilityParagraphs: string[];
    stoneEyebrow: string;
    stoneTitle: string;
    stoneParagraphs: string[];
  };
  projects: {
    heroEyebrow: string;
    heroTitle: string;
    heroCopy: string;
    referencesEyebrow: string;
    referencesTitle: string;
    readMore: string;
    projectReference: string;
    visitLocation: string;
    storyEyebrow: string;
    galleryEyebrow: string;
    galleryTitle: string;
  };
  storeLocator: {
    heroTitle: string;
    heroEyebrow: string;
    heroCopy: string;
    partnersEyebrow: string;
    partnersTitle: string;
    partnersCopy: string;
    filterByRegion: string;
    distributorTitle: string;
    distributorCopy: string;
    contactUs: string;
    regions: Record<string, string>;
    mapError: string;
    emptyPopup: string;
  };
  blog: {
    heroTitle: string;
    heroEyebrow: string;
    heroCopy: string;
    latestEyebrow: string;
    latestTitle: string;
    backToBlog: string;
  };
  product: {
    madeToOrder: string;
    profileEyebrow: string;
    naturalStone: string;
    outdoorWellness: string;
    configurationEyebrow: string;
    materialsTitle: string;
    materialsCopy: string;
    pairWith: string;
    architectResourcesEyebrow: string;
    documentationTitle: string;
    allCatalogues: string;
    startConfigurator: string;
    dedicatedPreviewFallback: string;
    closeConfigurator: string;
    materialGroups: Record<string, string>;
    additionsTitle: string;
    finishOptions: {
      naturalStone: string;
      porcelain: string;
      customRequest: string;
    };
    types: Record<string, string>;
    formTitles: Record<string, string>;
    docLabels: Record<string, string>;
    additions: Record<string, string>;
  };
  quoteForm: {
    copy: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    quantity: string;
    materialFinishes: string;
    submit: string;
  };
};

const en: Dictionary = {
  seo: {
    siteTitle: "KORTA | Outdoor Wellness Design",
    defaultDescription:
      "KORTA creates timeless outdoor showers, kitchens, fire pieces and objects for private villas, resorts, hotels and gardens where architecture meets open air.",
    homeTitle: "Outdoor Wellness Design",
    homeDescription:
      "KORTA creates timeless outdoor showers, kitchens, fire pieces and objects for private villas, resorts, hotels and gardens where architecture meets open air.",
    staticPageSeo: {
      collections: {
        title: "Outdoor Relaxation Zones",
        description:
          "Explore KORTA's AQUA, FUOCO and ARIA collections of outdoor showers, kitchens, fireplaces and design objects.",
        keywords: ["outdoor collections", "AQUA FUOCO ARIA", "outdoor design zones"],
      },
      "our-story": {
        title: "Our Story",
        description:
          "Discover KORTA's Mediterranean design philosophy and craftsmanship behind our natural stone outdoor wellness products.",
        keywords: ["KORTA story", "outdoor lifestyle", "Mediterranean design"],
      },
      projects: {
        title: "Iconic Projects",
        description:
          "See KORTA references in luxury hospitality destinations, private villas and signature residences worldwide.",
        keywords: ["project references", "hospitality design", "luxury villas"],
      },
      sustainability: {
        title: "Sustainability",
        description:
          "Learn how KORTA combines long-lasting natural materials, local sourcing and timeless design for sustainable outdoor wellness.",
        keywords: ["sustainable outdoor design", "natural stone", "eco-conscious luxury"],
      },
      blog: {
        title: "KORTA Journal",
        description:
          "Planning notes, guides and inspiration for outdoor showers, poolside wellness and open-air living.",
        keywords: ["outdoor shower blog", "wellness journal", "design guides"],
      },
      join: {
        title: "Careers",
        description:
          "Join KORTA and help create handcrafted outdoor wellness products with a focus on design and detail.",
        keywords: ["KORTA careers", "design jobs", "stone craftsmanship"],
      },
      contact: {
        title: "Contact",
        description:
          "Contact KORTA for product inquiries, project support and distributor opportunities.",
        keywords: ["contact KORTA", "outdoor shower inquiries", "project support"],
      },
      "store-locator": {
        title: "Store Locator",
        description:
          "Find KORTA distributors and showroom partners worldwide for products, consultations and project support.",
        keywords: ["store locator", "KORTA distributors", "showroom partners"],
      },
      catalogues: {
        title: "Catalogues & Downloads",
        description:
          "Download the KORTA catalogue, material book and product spec sheets for outdoor showers, kitchens and wellness pieces.",
        keywords: ["product catalogue", "spec sheets", "KORTA downloads"],
      },
      legal: {
        title: "Legal Notices",
        description: "Legal notices and policy information for the KORTA website.",
        keywords: ["legal notices", "website policies", "KORTA legal"],
      },
      eu: {
        title: "EU Project Information",
        description:
          "Official information about KORTA GROUP's EU co-financed internationalization project.",
        keywords: ["EU project", "ERDF", "KORTA GROUP"],
      },
    },
  },
  header: {
    ariaHome: "KORTA home",
    primaryNav: "Primary navigation",
    home: "Home",
    blog: "Blog",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeOverlay: "Close mobile menu overlay",
    switchToEnglish: "Switch to English",
    switchToCroatian: "Switch to Croatian",
  },
  nav: {
    collections: "Collections",
    lifestyle: "KORTA Lifestyle",
    contact: "Contact",
    stories: "Stories",
    help: "Help",
    slugLabels: {
      "our-story": "Our Story",
      projects: "Projects",
      sustainability: "Sustainability",
      join: "Join KORTA Family",
      contact: "Contact",
      "store-locator": "Store Locator",
      collections: "Collections",
      catalogues: "Catalogues",
      legal: "Legal Notices",
      blog: "Blog",
    },
  },
  footer: {
    collections: "Collections",
    lifestyle: "KORTA Lifestyle",
    help: "Do You Need Help?",
    visitAtelier: "Visit the atelier",
    distributorTitle: "Discover your closest distributor.",
    contactUs: "Contact Us",
    descriptor:
      "Handmade outdoor wellness objects in natural stone, designed for villas, resorts, hotels and architectural gardens.",
    ourStory: "Our Story",
    sustainability: "Sustainability",
    projects: "Projects",
    join: "Join KORTA Family",
    storeLocator: "Store Locator",
    generalContacts: "General Contacts",
    catalogues: "Catalogues",
    legal: "Legal Notices",
    newsletter: "Newsletter",
    nameAndSurname: "Name and Surname",
    email: "Email",
    apply: "Apply",
    euAlt: "European Union co-financing",
  },
  floatingContact: {
    quickLinks: "Quick contact links",
    emailKorta: "Email KORTA",
    callKorta: "Call KORTA",
  },
  home: {
    heroEyebrow: "Handmade in natural stone",
    heroTitle: "Outdoor wellness carved for stillness.",
    heroCopy:
      "KORTA creates timeless outdoor showers, kitchens, fire pieces and objects for private villas, resorts, hotels and gardens where architecture meets open air.",
    exploreCollections: "Explore Collections",
    downloadCatalogue: "Download Catalogue",
    metrics: [
      ["3", "Outdoor relaxation zones"],
      ["11", "Stone wellness objects"],
      ["75+", "Natural finishes and combinations"],
    ],
    introEyebrow: "Outdoor wellness design",
    introTitle: "A natural stone collection for water, fire and open air.",
    introCopy:
      "Every KORTA piece is designed as a quiet architectural object: precise in silhouette, tactile in material, and made to age with the landscape.",
    dearClient: "Dear Client,",
    introParagraphs: [
      "Welcome to KORTA, where your search for the perfect outdoor shower ends. We understand the importance of finding a design that complements your space and meets your expectations.",
      "Our outdoor showers transform your outdoor space into a sanctuary of relaxation and enjoyment. Whether for family, friends, guests, clients or business partners, our showers are designed to elevate every moment spent outdoors.",
    ],
    zoneCards: [
      {
        label: "AQUA",
        title: "Water as ritual",
        copy: "Outdoor showers and bathtubs made as sculptural moments for pool, spa and garden spaces.",
      },
      {
        label: "FUOCO",
        title: "Fire as gathering",
        copy: "Outdoor kitchens and fireplaces that turn hospitality into an architectural experience.",
      },
      {
        label: "ARIA",
        title: "Air as pause",
        copy: "Planters and stone tables that complete calm, tactile outdoor living rooms.",
      },
    ],
    viewZone: "View zone",
    materialEyebrow: "Material atelier",
    materialTitle: "From quarry surface to outdoor ritual.",
    materialCopy:
      "Natural stone, porcelain stoneware, PVD-coated fittings and custom additions allow every shower to be configured for its setting.",
    downloadMaterialBook: "Download Material Book",
    materialItems: [
      "Kanfanar stone",
      "Marazzi porcelain",
      "PVD handles",
      "Custom engraving",
    ],
    inspiredEyebrow: "Inspired by nature",
    inspiredTitle: "Designed for villas, resorts, hotels and garden sanctuaries.",
    inspiredCopy:
      "The design language is deliberately quiet: monolithic forms, precise edges and stone surfaces that let water, light and landscape become the experience.",
    viewProjects: "View Projects",
    collectionEyebrow: "The collection",
    collectionTitle: "Objects with the presence of architecture.",
    collectionCopy: "Explore KORTA across water, fire and air.",
    seeAll: "See All",
    journalEyebrow: "Journal",
    journalTitle: "Ideas for outdoor wellness spaces.",
    journalCopy:
      "Planning notes and design inspiration for showers, gardens, pool decks and outdoor living.",
    readJournal: "Read journal",
  },
  clientele: {
    title: "Clientele",
  },
  collections: {
    eyebrow: "Collections",
    title: "Outdoor Relaxation Zones",
    copy: "Aqua, Fuoco and Aria transform outdoor spaces into havens of relaxation.",
    meta: ["Aqua", "Fuoco", "Aria"],
    planningEyebrow: "Elemental planning",
    planningTitle: "Three ways to compose an outdoor sanctuary.",
    planningCopy:
      "Every outdoor space should be designed to provide tranquility, comfort and rejuvenation. With this philosophy in mind, KORTA developed Outdoor Relaxation Zones around three essential elements of life: water, fire and air.",
    zoneCopy: {
      AQUA:
        "A revitalizing retreat from everyday life, tailored around the calming advantages of water and outdoor serenity.",
      FUOCO:
        "A captivating zone where fire brings people together, fuels conversation and creates unforgettable moments.",
      ARIA:
        "An outdoor sanctuary where time slows down and carefully designed pieces support rest, reading and gathering.",
    },
    zoneLabel: "Zone",
  },
  projectsBand: {
    eyebrow: "Selected references",
    title: "Placed in villas, resorts, hotels and quiet private retreats.",
    readMore: "Read More",
  },
  contact: {
    heroTitle: "General Contacts",
    heroEyebrow: "Contact",
    heroCopy:
      "Tell us about the site, the atmosphere and the outdoor ritual you want to create.",
    assistanceEyebrow: "Project assistance",
    assistanceTitle: "Do you need assistance?",
    assistanceCopy:
      "If you need assistance or wish to request information, we invite you to fill out our contact form.",
    fields: {
      nameAndSurname: "Name and Surname",
      email: "Email",
      message: "Message",
      send: "Send",
    },
    contactTitles: [
      "For General Inquiries",
      "Production Department",
      "Marketing Department",
      "Sales Spain & Portugal",
      "Sales Benelux",
      "Sales USA",
      "Sales UK & Greece",
      "Sales MEA Region",
      "Sales Croatia & EX-YU",
    ],
  },
  catalogues: {
    heroTitle: "Catalogues",
    heroEyebrow: "Downloads",
    heroCopy: "Product documentation for owners, architects and project partners.",
    resourcesEyebrow: "Resources",
    resourcesTitle: "Documentation",
    resourcesCopy:
      "Download the current KORTA catalogue, material book and product specification sheets.",
    docs: [
      {
        label: "KORTA Catalogue",
        description: "A general overview of the KORTA collection and brand world.",
      },
      {
        label: "Material Book",
        description:
          "Download the latest KORTA materials presentation for finishes and surfaces.",
      },
      {
        label: "ODINO Spec Sheet",
        description: "Technical information and specification details for ODINO.",
      },
      {
        label: "MARBELLA Spec Sheet",
        description:
          "Technical information and specification details for MARBELLA.",
      },
      {
        label: "MINIMO Spec Sheet",
        description: "Technical information and specification details for MINIMO.",
      },
      {
        label: "GARDENZIO Product Specification",
        description: "Product specification document for GARDENZIO.",
      },
    ],
  },
  story: {
    heroCopy: "We believe the outdoors should be an extension of your personal sanctuary.",
    heroEyebrow: "KORTA Lifestyle",
    heroTitle: "Our Story",
    introEyebrow: "Our Story",
    introTitle: "A Brand Rooted In Outdoor Living",
    introParagraphs: [
      "As an international leader in the design, production and marketing of outdoor designer products, KORTA is present in more than 35 countries worldwide. We embody the best of European style and craftsmanship in outdoor decor and design.",
      "For those seeking tranquility in their own outdoor spaces, KORTA creates aesthetic showers and accessories in premium natural materials. By combining timeless design and high-end craftsmanship, we elevate the way people enjoy their outdoor environments.",
    ],
    whatWeDo: [
      {
        title: "Architects, Interior and Landscape Designers",
        copy:
          "A wide selection of materials to customize each product and adapt every solution to local site conditions.",
      },
      {
        title: "Retail Partners",
        copy:
          "Unique designer products that open new markets, increase revenue and create demand for premium outdoor solutions.",
      },
      {
        title: "Hospitality Projects",
        copy:
          "Eco-friendly water-saving systems made for high-traffic locations while preserving impeccable design standards.",
      },
    ],
    definitionLabel: "Definition",
    definitionText: "A fenced outdoor area, backyard or patio.",
    etymologyLabel: "Etymology",
    heritageEyebrow: "Heritage",
    heritageTitle: "From Stone Family Legacy To Global Outdoor Design",
    heritageParagraphs: [
      "Stone and similar materials are deeply rooted in our family history. Our legacy dates back to 1995, when Stefano's grandfather and father started a business processing natural stone.",
      "In 2017, Stefano realized his vision by creating the first outdoor shower made of stone. From that moment, KORTA continued to push the boundaries of what is possible with natural materials.",
      "Today, Stefano's father serves as our manufacturing advisor. Every product is engineered and tested in-house to ensure premium performance and quality.",
    ],
    heritageMilestones: [
      "1995 - stone processing roots",
      "2017 - first stone shower",
      "Today - global KORTA presence",
    ],
    philosophyEyebrow: "Philosophy And Inspiration",
    philosophyTitle: "Designing Meaningful Outdoor Experiences",
    philosophyCopy:
      "We built an international reputation for creating inspiring products that connect people to place, elevate human experience and strengthen community through design.",
    philosophyPillars: [
      "Design products that connect people to place and elevate everyday rituals.",
      "Stay true to natural materials, timeless forms and long-lasting craftsmanship.",
      "Create spaces where harmony, comfort and aesthetic pleasure coexist.",
    ],
    ceoEyebrow: "A Word From Our CEO",
    ceoTitle: "Innovation, Integrity And Craftsmanship",
    ceoParagraphs: [
      "Welcome to our world of innovation and excellence. At KORTA, our values are the foundation of everything we do. We believe in creativity, integrity and the persistent pursuit of quality.",
      "I am proud to lead a team that challenges the status quo and adopts new ideas. Every individual contribution matters, and every innovation fuels our journey forward.",
    ],
    ceoRole: "Founder & CEO",
    lifestyleParagraphs: [
      "KORTA is based on Mediterranean heritage and the joy of outdoor living. It is a place for gathering, celebrating special moments and unwinding.",
      "We believe everyone deserves a personal outdoor sanctuary filled with products that create comfort and connection. Our mission is to bring the Istrian-inspired lifestyle to projects around the world.",
    ],
  },
  designer: {
    eyebrow: "Design practice",
    title: "Product designs",
  },
  sustainability: {
    heroTitle: "Sustainability",
    heroEyebrow: "KORTA Lifestyle",
    heroCopy: "Luxury through materials that last, age and belong to place.",
    responsibilityEyebrow: "Responsibility",
    responsibilityTitle: "Sustainability",
    responsibilityParagraphs: [
      "At KORTA, we believe that true luxury is not only about exquisite design and exceptional quality but also about being mindful of our planet. Our commitment to sustainability is integrated into every aspect of our work.",
      "Each KORTA product presents the perfect balance of elegance and sustainability. Our natural stone is sourced locally, reducing carbon footprints while ensuring durability and timeless aesthetics.",
      "From KORTA's outdoor showers, like MINIMO and MARBELLA, to the stonework used in our designs, we create luxury products with an eco-conscious mindset.",
    ],
    stoneEyebrow: "Natural stone",
    stoneTitle: "Made to endure.",
    stoneParagraphs: [
      "Drawing inspiration from the materials that surround us and guided by the wisdom of our ancestors in stone craftsmanship, we embarked on our journey with Istrian stone at its heart.",
      "Natural stone has excellent technical and mechanical properties in terms of absorption, freezing and wear. It is incredibly durable and available in polished, sandblasted, burnt or rigato finishes.",
    ],
  },
  projects: {
    heroEyebrow: "KORTA Lifestyle",
    heroTitle: "Iconic Projects",
    heroCopy:
      "Hospitality destinations, private villas, and signature residences shaped with natural stone. Explore every reference in full detail.",
    referencesEyebrow: "References",
    referencesTitle: "Some of Our Iconic Projects",
    readMore: "Read More",
    projectReference: "Project Reference",
    visitLocation: "Visit Location",
    storyEyebrow: "Project Story",
    galleryEyebrow: "Gallery",
    galleryTitle: "Project Highlights",
  },
  storeLocator: {
    heroTitle: "Store Locator",
    heroEyebrow: "Contact",
    heroCopy: "For distributors, showrooms and project partners.",
    partnersEyebrow: "Global Partners",
    partnersTitle: "Discover your closest distributor",
    partnersCopy:
      "Tap any marker to view store details, contact information, and website links.",
    filterByRegion: "Filter by region",
    distributorTitle: "Interested in becoming a distributor?",
    distributorCopy: "Contact us at info@kortadesign.com",
    contactUs: "Contact Us",
    regions: {
      All: "All",
      Europe: "Europe",
      "North America": "North America",
      "Middle East": "Middle East",
      Oceania: "Oceania",
    },
    mapError:
      "The interactive map could not be loaded right now. Please contact us directly and we will connect you with the closest distributor.",
    emptyPopup: "Contact info available on request.",
  },
  blog: {
    heroTitle: "Journal",
    heroEyebrow: "KORTA Journal",
    heroCopy: "Design notes for outdoor showers, stone wellness and open-air living.",
    latestEyebrow: "Latest articles",
    latestTitle: "Outdoor wellness, made practical.",
    backToBlog: "Back to Blog",
  },
  product: {
    madeToOrder: "Made to order",
    profileEyebrow: "Product profile",
    naturalStone: "Natural stone",
    outdoorWellness: "Outdoor wellness",
    configurationEyebrow: "Configuration",
    materialsTitle: "Material & Finishes",
    materialsCopy:
      "Choose the surface language that belongs to the project: tactile stone, refined porcelain, or metallic details with architectural restraint.",
    pairWith: "Pair {product} With",
    architectResourcesEyebrow: "Architect resources",
    documentationTitle: "Documentation",
    allCatalogues: "All Catalogues",
    startConfigurator: "Start Configurator",
    dedicatedPreviewFallback:
      "Dedicated preview is not available for this finish yet. You can still select it for your quote request.",
    closeConfigurator: "Close configurator",
    materialGroups: {
      "Natural Stone Kanfanar": "Natural Stone Kanfanar",
      "Marazzi Porcelain Stoneware": "Marazzi Porcelain Stoneware",
      "Handle Finishes (PVD Coating)": "Handle Finishes (PVD Coating)",
    },
    additionsTitle: "Additions",
    finishOptions: {
      naturalStone: "Natural Stone Kanfanar",
      porcelain: "Marazzi Porcelain Stoneware",
      customRequest: "Custom Request",
    },
    types: {
      "Outdoor Shower": "Outdoor Shower",
      "Outdoor Bathtub": "Outdoor Bathtub",
      "Outdoor Kitchen": "Outdoor Kitchen",
      Fireplace: "Fireplace",
      "Coffee Table": "Coffee Table",
      "Side Table": "Side Table",
      Planter: "Planter",
    },
    formTitles: {
      "Create Your Perfect Shower": "Create Your Perfect Shower",
      "Create Your Perfect Bathtub": "Create Your Perfect Bathtub",
      "Create Your Perfect Outdoor Kitchen": "Create Your Perfect Outdoor Kitchen",
      "Create Your Perfect Fireplace": "Create Your Perfect Fireplace",
      "Create Your Perfect Table": "Create Your Perfect Table",
      "Create Your Perfect Planter": "Create Your Perfect Planter",
    },
    docLabels: {
      "Spec Sheet": "Spec Sheet",
      "Install Instructions": "Install Instructions",
      "How to Unload": "How to Unload",
      "Foundation Preparation": "Foundation Preparation",
      "Spec Sheet 2": "Spec Sheet 2",
    },
    additions: {
      "Motion Sensor": "Motion Sensor",
      "Heating Cable": "Heating Cable",
      "Logo Engraving": "Logo Engraving",
      "Solar-heated Water Tank": "Solar-heated Water Tank",
      "Shower Handle": "Shower Handle",
      Lighting: "Lighting",
      "Floor Decking": "Floor Decking",
      "XL Showerhead": "XL Showerhead",
    },
  },
  quoteForm: {
    copy:
      "Tell us what you are planning and the KORTA team will help define the right finish, configuration and next steps.",
    name: "Name",
    email: "Email",
    phone: "Phone Number",
    location: "Delivery Location",
    quantity: "Quantity",
    materialFinishes: "Material & Finishes",
    submit: "Ask for a Quote",
  },
};

const hr: Dictionary = {
  ...en,
  seo: {
    ...en.seo,
    siteTitle: "KORTA | Dizajn vanjskog wellnessa",
    defaultDescription:
      "KORTA stvara bezvremenske vanjske tuševe, kuhinje, kamine i objekte za privatne vile, resorte, hotele i vrtove gdje se arhitektura susreće s otvorenim prostorom.",
    homeTitle: "Dizajn vanjskog wellnessa",
    homeDescription:
      "KORTA stvara bezvremenske vanjske tuševe, kuhinje, kamine i objekte za privatne vile, resorte, hotele i vrtove gdje se arhitektura susreće s otvorenim prostorom.",
    staticPageSeo: {
      collections: {
        title: "Zone opuštanja na otvorenom",
        description:
          "Istražite KORTA AQUA, FUOCO i ARIA kolekcije vanjskih tuševa, kuhinja, kamina i dizajnerskih objekata.",
        keywords: ["vanjske kolekcije", "AQUA FUOCO ARIA", "zone vanjskog dizajna"],
      },
      "our-story": {
        title: "Naša priča",
        description:
          "Otkrijte KORTA mediteransku filozofiju dizajna i umijeće izrade iza naših proizvoda za vanjski wellness od prirodnog kamena.",
        keywords: ["KORTA priča", "vanjski lifestyle", "mediteranski dizajn"],
      },
      projects: {
        title: "Ikonični projekti",
        description:
          "Pogledajte KORTA reference u luksuznim hospitality destinacijama, privatnim vilama i rezidencijama diljem svijeta.",
        keywords: ["reference projekata", "hospitality dizajn", "luksuzne vile"],
      },
      sustainability: {
        title: "Održivost",
        description:
          "Saznajte kako KORTA spaja dugotrajne prirodne materijale, lokalnu nabavu i bezvremenski dizajn za održiv vanjski wellness.",
        keywords: ["održivi vanjski dizajn", "prirodni kamen", "eco luxury"],
      },
      blog: {
        title: "KORTA Journal",
        description:
          "Planerske bilješke, vodiči i inspiracija za vanjske tuševe, wellness uz bazen i život na otvorenom.",
        keywords: ["blog o vanjskim tuševima", "wellness journal", "vodiči za dizajn"],
      },
      join: {
        title: "Karijere",
        description:
          "Pridružite se KORTI i sudjelujte u stvaranju ručno izrađenih proizvoda za vanjski wellness s fokusom na dizajn i detalje.",
        keywords: ["KORTA karijere", "poslovi u dizajnu", "obrada kamena"],
      },
      contact: {
        title: "Kontakt",
        description:
          "Kontaktirajte KORTU za upite o proizvodima, podršku na projektu i distributerske prilike.",
        keywords: ["kontakt KORTA", "upiti za vanjske tuševe", "podrška projektu"],
      },
      "store-locator": {
        title: "Lokator trgovina",
        description:
          "Pronađite KORTA distributere i showroom partnere diljem svijeta za proizvode, savjetovanja i projektnu podršku.",
        keywords: ["lokator trgovina", "KORTA distributeri", "showroom partneri"],
      },
      catalogues: {
        title: "Katalozi i preuzimanja",
        description:
          "Preuzmite KORTA katalog, knjigu materijala i tehničke listove za vanjske tuševe, kuhinje i wellness objekte.",
        keywords: ["katalog proizvoda", "tehnički listovi", "KORTA preuzimanja"],
      },
      legal: {
        title: "Pravne napomene",
        description: "Pravne napomene i informacije o pravilima za KORTA web stranicu.",
        keywords: ["pravne napomene", "pravila web stranice", "KORTA pravno"],
      },
      eu: {
        title: "Informacije o EU projektu",
        description:
          "Službene informacije o EU sufinanciranom projektu internacionalizacije tvrtke KORTA GROUP.",
        keywords: ["EU projekt", "ERDF", "KORTA GROUP"],
      },
    },
  },
  header: {
    ...en.header,
    ariaHome: "KORTA početna",
    primaryNav: "Glavna navigacija",
    home: "Početna",
    openMenu: "Otvori izbornik",
    closeMenu: "Zatvori izbornik",
    closeOverlay: "Zatvori mobilni izbornik",
    switchToEnglish: "Prebaci na engleski",
    switchToCroatian: "Prebaci na hrvatski",
  },
  nav: {
    collections: "Kolekcije",
    lifestyle: "KORTA Lifestyle",
    contact: "Kontakt",
    stories: "Priče",
    help: "Pomoć",
    slugLabels: {
      "our-story": "Naša priča",
      projects: "Projekti",
      sustainability: "Održivost",
      join: "Pridružite se KORTA obitelji",
      contact: "Kontakt",
      "store-locator": "Lokator trgovina",
      collections: "Kolekcije",
      catalogues: "Katalozi",
      legal: "Pravne napomene",
      blog: "Blog",
    },
  },
  footer: {
    collections: "Kolekcije",
    lifestyle: "KORTA Lifestyle",
    help: "Trebate pomoć?",
    visitAtelier: "Posjetite atelier",
    distributorTitle: "Otkrijte svog najbližeg distributera.",
    contactUs: "Kontaktirajte nas",
    descriptor:
      "Ručno izrađeni vanjski wellness objekti od prirodnog kamena, dizajnirani za vile, resorte, hotele i arhitektonske vrtove.",
    ourStory: "Naša priča",
    sustainability: "Održivost",
    projects: "Projekti",
    join: "Pridružite se KORTA obitelji",
    storeLocator: "Lokator trgovina",
    generalContacts: "Opći kontakti",
    catalogues: "Katalozi",
    legal: "Pravne napomene",
    newsletter: "Newsletter",
    nameAndSurname: "Ime i prezime",
    email: "Email",
    apply: "Prijavi se",
    euAlt: "Sufinanciranje Europske unije",
  },
  floatingContact: {
    quickLinks: "Brze kontakt poveznice",
    emailKorta: "Pošalji email KORTI",
    callKorta: "Nazovi KORTU",
  },
  home: {
    heroEyebrow: "Ručno izrađeno od prirodnog kamena",
    heroTitle: "Vanjski wellness oblikovan za mir.",
    heroCopy:
      "KORTA stvara bezvremenske vanjske tuševe, kuhinje, kamine i objekte za privatne vile, resorte, hotele i vrtove gdje se arhitektura susreće s otvorenim prostorom.",
    exploreCollections: "Istražite kolekcije",
    downloadCatalogue: "Preuzmi katalog",
    metrics: [
      ["3", "Zone opuštanja na otvorenom"],
      ["11", "Kameni wellness objekti"],
      ["75+", "Prirodne završne obrade i kombinacije"],
    ],
    introEyebrow: "Dizajn vanjskog wellnessa",
    introTitle: "Kolekcija od prirodnog kamena za vodu, vatru i otvoreni prostor.",
    introCopy:
      "Svaki KORTA komad zamišljen je kao tihi arhitektonski objekt: precizan u silueti, taktilan u materijalu i stvoren da stari zajedno s krajolikom.",
    dearClient: "Poštovani klijente,",
    introParagraphs: [
      "Dobrodošli u KORTU, mjesto gdje završava potraga za savršenim vanjskim tušem. Razumijemo koliko je važno pronaći dizajn koji nadopunjuje vaš prostor i ispunjava vaša očekivanja.",
      "Naši vanjski tuševi pretvaraju vaš vanjski prostor u utočište opuštanja i uživanja. Bilo za obitelj, prijatelje, goste, klijente ili poslovne partnere, naši tuševi osmišljeni su da uzdignu svaki trenutak proveden na otvorenom.",
    ],
    zoneCards: [
      {
        label: "AQUA",
        title: "Voda kao ritual",
        copy:
          "Vanjski tuševi i kade oblikovani kao skulpturalni trenuci za prostore uz bazen, spa zone i vrtove.",
      },
      {
        label: "FUOCO",
        title: "Vatra kao okupljanje",
        copy:
          "Vanjske kuhinje i kamini koji gostoprimstvo pretvaraju u arhitektonsko iskustvo.",
      },
      {
        label: "ARIA",
        title: "Zrak kao predah",
        copy:
          "Žardinjere i kameni stolići koji upotpunjuju mirne i taktilne dnevne boravke na otvorenom.",
      },
    ],
    viewZone: "Pogledaj zonu",
    materialEyebrow: "Atelier materijala",
    materialTitle: "Od površine kamenoloma do rituala na otvorenom.",
    materialCopy:
      "Prirodni kamen, porculanska keramika, PVD završne obrade i prilagodbe omogućuju konfiguraciju svakog tuša prema kontekstu projekta.",
    downloadMaterialBook: "Preuzmi knjigu materijala",
    materialItems: [
      "Kanfanar kamen",
      "Marazzi porculan",
      "PVD ručke",
      "Prilagođeno graviranje",
    ],
    inspiredEyebrow: "Inspirirano prirodom",
    inspiredTitle: "Dizajnirano za vile, resorte, hotele i vrtne oaze.",
    inspiredCopy:
      "Jezik dizajna namjerno je tih: monolitne forme, precizni rubovi i kamene površine koje dopuštaju vodi, svjetlu i krajoliku da postanu iskustvo.",
    viewProjects: "Pogledaj projekte",
    collectionEyebrow: "Kolekcija",
    collectionTitle: "Objekti s prisutnošću arhitekture.",
    collectionCopy: "Istražite KORTU kroz vodu, vatru i zrak.",
    seeAll: "Pogledaj sve",
    journalEyebrow: "Journal",
    journalTitle: "Ideje za prostore vanjskog wellnessa.",
    journalCopy:
      "Bilješke za planiranje i inspiracija za tuševe, vrtove, bazenske zone i život na otvorenom.",
    readJournal: "Čitaj journal",
  },
  clientele: {
    title: "Klijenti",
  },
  collections: {
    eyebrow: "Kolekcije",
    title: "Zone opuštanja na otvorenom",
    copy: "Aqua, Fuoco i Aria pretvaraju vanjske prostore u utočišta opuštanja.",
    meta: ["Aqua", "Fuoco", "Aria"],
    planningEyebrow: "Elementarno planiranje",
    planningTitle: "Tri načina za oblikovanje vanjskog utočišta.",
    planningCopy:
      "Svaki vanjski prostor trebao bi biti osmišljen kako bi pružio mir, udobnost i obnovu. Vodeći se tom filozofijom, KORTA je razvila Outdoor Relaxation Zones oko tri osnovna elementa života: vode, vatre i zraka.",
    zoneCopy: {
      AQUA:
        "Obnavljajuća zona odmaka od svakodnevice, oblikovana oko umirujućih prednosti vode i vedrine otvorenog prostora.",
      FUOCO:
        "Zavodljiva zona u kojoj vatra okuplja ljude, potiče razgovor i stvara nezaboravne trenutke.",
      ARIA:
        "Vanjsko utočište u kojem vrijeme usporava, a pažljivo oblikovani komadi podupiru odmor, čitanje i druženje.",
    },
    zoneLabel: "Zona",
  },
  projectsBand: {
    eyebrow: "Odabrane reference",
    title: "Smješteno u vilama, resortima, hotelima i tihim privatnim oazama.",
    readMore: "Saznaj više",
  },
  contact: {
    heroTitle: "Opći kontakti",
    heroEyebrow: "Kontakt",
    heroCopy:
      "Recite nam više o lokaciji, atmosferi i ritualu na otvorenom koji želite stvoriti.",
    assistanceEyebrow: "Pomoć na projektu",
    assistanceTitle: "Trebate pomoć?",
    assistanceCopy:
      "Ako trebate pomoć ili želite zatražiti informacije, pozivamo vas da ispunite naš kontakt obrazac.",
    fields: {
      nameAndSurname: "Ime i prezime",
      email: "Email",
      message: "Poruka",
      send: "Pošalji",
    },
    contactTitles: [
      "Za opće upite",
      "Odjel proizvodnje",
      "Odjel marketinga",
      "Prodaja Španjolska i Portugal",
      "Prodaja Benelux",
      "Prodaja SAD",
      "Prodaja UK i Grčka",
      "Prodaja MEA regija",
      "Prodaja Hrvatska i EX-YU",
    ],
  },
  catalogues: {
    heroTitle: "Katalozi",
    heroEyebrow: "Preuzimanja",
    heroCopy: "Dokumentacija proizvoda za vlasnike, arhitekte i projektne partnere.",
    resourcesEyebrow: "Resursi",
    resourcesTitle: "Dokumentacija",
    resourcesCopy:
      "Preuzmite aktualni KORTA katalog, knjigu materijala i tehničke listove proizvoda.",
    docs: [
      {
        label: "KORTA katalog",
        description: "Opći pregled KORTA kolekcije i svijeta brenda.",
      },
      {
        label: "Knjiga materijala",
        description:
          "Preuzmite najnoviju KORTA prezentaciju materijala, završnih obrada i površina.",
      },
      {
        label: "ODINO tehnički list",
        description: "Tehničke informacije i specifikacije za ODINO.",
      },
      {
        label: "MARBELLA tehnički list",
        description: "Tehničke informacije i specifikacije za MARBELLU.",
      },
      {
        label: "MINIMO tehnički list",
        description: "Tehničke informacije i specifikacije za MINIMO.",
      },
      {
        label: "GARDENZIO specifikacija proizvoda",
        description: "Dokument specifikacije proizvoda za GARDENZIO.",
      },
    ],
  },
  story: {
    heroCopy: "Vjerujemo da bi otvoreni prostor trebao biti produžetak vašeg osobnog utočišta.",
    heroEyebrow: "KORTA Lifestyle",
    heroTitle: "Naša priča",
    introEyebrow: "Naša priča",
    introTitle: "Brend ukorijenjen u životu na otvorenom",
    introParagraphs: [
      "Kao međunarodni lider u dizajnu, proizvodnji i plasmanu dizajnerskih proizvoda za otvoreni prostor, KORTA je prisutna u više od 35 zemalja svijeta. Utjelovljujemo najbolje od europskog stila i izrade u vanjskom dekoru i dizajnu.",
      "Za one koji traže mir u vlastitim vanjskim prostorima, KORTA stvara estetske tuševe i dodatke od vrhunskih prirodnih materijala. Spajajući bezvremenski dizajn i vrhunsku izradu, podižemo način na koji ljudi uživaju u svojim vanjskim okruženjima.",
    ],
    whatWeDo: [
      {
        title: "Arhitekti, dizajneri interijera i krajobraza",
        copy:
          "Širok izbor materijala za prilagodbu svakog proizvoda i prilagodbu svakog rješenja lokalnim uvjetima projekta.",
      },
      {
        title: "Maloprodajni partneri",
        copy:
          "Jedinstveni dizajnerski proizvodi koji otvaraju nova tržišta, povećavaju prihod i stvaraju potražnju za premium rješenjima na otvorenom.",
      },
      {
        title: "Hospitality projekti",
        copy:
          "Ekološki prihvatljivi sustavi za uštedu vode namijenjeni lokacijama s velikim prometom, uz očuvanje besprijekornih standarda dizajna.",
      },
    ],
    definitionLabel: "Definicija",
    definitionText: "Ograđen vanjski prostor, dvorište ili terasa.",
    etymologyLabel: "Etimologija",
    heritageEyebrow: "Nasljeđe",
    heritageTitle: "Od obiteljskog nasljeđa u kamenu do globalnog dizajna za otvoreni prostor",
    heritageParagraphs: [
      "Kamen i slični materijali duboko su ukorijenjeni u našoj obiteljskoj povijesti. Naše nasljeđe seže u 1995. godinu, kada su Stefanov djed i otac pokrenuli posao obrade prirodnog kamena.",
      "Godine 2017. Stefano je ostvario svoju viziju stvaranjem prvog vanjskog tuša od kamena. Od tog trenutka KORTA nastavlja pomicati granice onoga što je moguće s prirodnim materijalima.",
      "Danas Stefanov otac djeluje kao naš savjetnik za proizvodnju. Svaki proizvod razvija se i testira unutar kuće kako bi se osigurale vrhunske performanse i kvaliteta.",
    ],
    heritageMilestones: [
      "1995 - počeci obrade kamena",
      "2017 - prvi kameni tuš",
      "Danas - globalna prisutnost KORTE",
    ],
    philosophyEyebrow: "Filozofija i inspiracija",
    philosophyTitle: "Dizajniranje smislenih iskustava na otvorenom",
    philosophyCopy:
      "Izgradili smo međunarodnu reputaciju stvaranjem inspirativnih proizvoda koji povezuju ljude s mjestom, uzdižu ljudsko iskustvo i jačaju zajednicu kroz dizajn.",
    philosophyPillars: [
      "Dizajnirati proizvode koji povezuju ljude s mjestom i uzdižu svakodnevne rituale.",
      "Ostati vjeran prirodnim materijalima, bezvremenskim formama i dugotrajnoj izradi.",
      "Stvarati prostore u kojima sklad, udobnost i estetski užitak koegzistiraju.",
    ],
    ceoEyebrow: "Riječ našeg CEO-a",
    ceoTitle: "Inovacija, integritet i izrada",
    ceoParagraphs: [
      "Dobrodošli u naš svijet inovacije i izvrsnosti. U KORTI su naše vrijednosti temelj svega što radimo. Vjerujemo u kreativnost, integritet i ustrajnu potragu za kvalitetom.",
      "Ponosan sam što vodim tim koji propituje status quo i prihvaća nove ideje. Svaki pojedinačni doprinos je važan, a svaka inovacija pokreće naše putovanje naprijed.",
    ],
    ceoRole: "Founder & CEO",
    lifestyleParagraphs: [
      "KORTA se temelji na mediteranskom nasljeđu i radosti života na otvorenom. To je mjesto za okupljanje, slavljenje posebnih trenutaka i opuštanje.",
      "Vjerujemo da svatko zaslužuje vlastito vanjsko utočište ispunjeno proizvodima koji stvaraju udobnost i povezanost. Naša je misija donijeti istarski stil života projektima diljem svijeta.",
    ],
  },
  designer: {
    eyebrow: "Dizajnerska praksa",
    title: "Dizajn proizvoda",
  },
  sustainability: {
    heroTitle: "Održivost",
    heroEyebrow: "KORTA Lifestyle",
    heroCopy: "Luksuz kroz materijale koji traju, dostojanstveno stare i pripadaju mjestu.",
    responsibilityEyebrow: "Odgovornost",
    responsibilityTitle: "Održivost",
    responsibilityParagraphs: [
      "U KORTI vjerujemo da pravi luksuz nije samo u izuzetnom dizajnu i vrhunskoj kvaliteti, već i u odgovornosti prema našem planetu. Naša predanost održivosti utkna je u svaki aspekt našeg rada.",
      "Svaki KORTA proizvod predstavlja savršenu ravnotežu elegancije i održivosti. Naš prirodni kamen nabavljamo lokalno, čime smanjujemo ugljični otisak i istovremeno osiguravamo trajnost i bezvremensku estetiku.",
      "Od KORTA vanjskih tuševa, poput MINIMA i MARBELLE, do kamena koji koristimo u svojim dizajnima, stvaramo luksuzne proizvode s ekološki osviještenim pristupom.",
    ],
    stoneEyebrow: "Prirodni kamen",
    stoneTitle: "Stvoreno da traje.",
    stoneParagraphs: [
      "Inspirirani materijalima koji nas okružuju i vođeni mudrošću predaka u obradi kamena, započeli smo svoje putovanje s istarskim kamenom u samom središtu.",
      "Prirodni kamen ima izvrsna tehnička i mehanička svojstva u pogledu upojnosti, smrzavanja i trošenja. Izuzetno je izdržljiv i dostupan u poliranoj, pjeskarenoj, paljenoj ili rigato obradi.",
    ],
  },
  projects: {
    heroEyebrow: "KORTA Lifestyle",
    heroTitle: "Ikonični projekti",
    heroCopy:
      "Hospitality destinacije, privatne vile i rezidencije oblikovane prirodnim kamenom. Istražite svaku referencu u punom detalju.",
    referencesEyebrow: "Reference",
    referencesTitle: "Neki od naših ikoničnih projekata",
    readMore: "Saznaj više",
    projectReference: "Referenca projekta",
    visitLocation: "Posjeti lokaciju",
    storyEyebrow: "Priča projekta",
    galleryEyebrow: "Galerija",
    galleryTitle: "Izdvojeni detalji projekta",
  },
  storeLocator: {
    heroTitle: "Lokator trgovina",
    heroEyebrow: "Kontakt",
    heroCopy: "Za distributere, showroom partnere i projektne suradnike.",
    partnersEyebrow: "Globalni partneri",
    partnersTitle: "Otkrijte svog najbližeg distributera",
    partnersCopy:
      "Dodirnite ili kliknite bilo koji marker kako biste vidjeli detalje trgovine, kontakt informacije i poveznice na web stranicu.",
    filterByRegion: "Filtriraj po regiji",
    distributorTitle: "Zanima vas postati distributer?",
    distributorCopy: "Kontaktirajte nas na info@kortadesign.com",
    contactUs: "Kontaktirajte nas",
    regions: {
      All: "Sve",
      Europe: "Europa",
      "North America": "Sjeverna Amerika",
      "Middle East": "Bliski istok",
      Oceania: "Oceanija",
    },
    mapError:
      "Interaktivnu kartu trenutno nije moguće učitati. Kontaktirajte nas izravno i spojit ćemo vas s najbližim distributerom.",
    emptyPopup: "Kontakt informacije dostupne su na upit.",
  },
  blog: {
    heroTitle: "Journal",
    heroEyebrow: "KORTA Journal",
    heroCopy: "Bilješke o dizajnu za vanjske tuševe, kameni wellness i život na otvorenom.",
    latestEyebrow: "Najnoviji članci",
    latestTitle: "Vanjski wellness, učinjen praktičnim.",
    backToBlog: "Natrag na blog",
  },
  product: {
    ...en.product,
    madeToOrder: "Izrađuje se po narudžbi",
    profileEyebrow: "Profil proizvoda",
    naturalStone: "Prirodni kamen",
    outdoorWellness: "Vanjski wellness",
    configurationEyebrow: "Konfiguracija",
    materialsTitle: "Materijali i završne obrade",
    materialsCopy:
      "Odaberite jezik površine koji pripada projektu: taktilni kamen, profinjeni porculan ili metalne detalje s arhitektonskom suzdržanošću.",
    pairWith: "Uparite {product} s",
    architectResourcesEyebrow: "Resursi za arhitekte",
    documentationTitle: "Dokumentacija",
    allCatalogues: "Svi katalozi",
    startConfigurator: "Pokreni konfigurator",
    dedicatedPreviewFallback:
      "Namjenski prikaz za ovu završnu obradu još nije dostupan. I dalje je možete odabrati za svoj upit.",
    closeConfigurator: "Zatvori konfigurator",
    materialGroups: {
      "Natural Stone Kanfanar": "Prirodni kamen Kanfanar",
      "Marazzi Porcelain Stoneware": "Marazzi porculanska keramika",
      "Handle Finishes (PVD Coating)": "Završne obrade ručki (PVD premaz)",
    },
    additionsTitle: "Dodatci",
    finishOptions: {
      naturalStone: "Prirodni kamen Kanfanar",
      porcelain: "Marazzi porculanska keramika",
      customRequest: "Prilagođeni zahtjev",
    },
    types: {
      "Outdoor Shower": "Vanjski tuš",
      "Outdoor Bathtub": "Vanjska kada",
      "Outdoor Kitchen": "Vanjska kuhinja",
      Fireplace: "Kamin",
      "Coffee Table": "Klub stolić",
      "Side Table": "Pomoćni stolić",
      Planter: "Žardinjera",
    },
    formTitles: {
      "Create Your Perfect Shower": "Kreirajte svoj savršeni tuš",
      "Create Your Perfect Bathtub": "Kreirajte svoju savršenu kadu",
      "Create Your Perfect Outdoor Kitchen": "Kreirajte svoju savršenu vanjsku kuhinju",
      "Create Your Perfect Fireplace": "Kreirajte svoj savršeni kamin",
      "Create Your Perfect Table": "Kreirajte svoj savršeni stolić",
      "Create Your Perfect Planter": "Kreirajte svoju savršenu žardinjeru",
    },
    docLabels: {
      "Spec Sheet": "Tehnički list",
      "Install Instructions": "Upute za montažu",
      "How to Unload": "Upute za istovar",
      "Foundation Preparation": "Priprema temelja",
      "Spec Sheet 2": "Tehnički list 2",
    },
    additions: {
      "Motion Sensor": "Senzor pokreta",
      "Heating Cable": "Grijaći kabel",
      "Logo Engraving": "Graviranje logotipa",
      "Solar-heated Water Tank": "Solarni spremnik vode",
      "Shower Handle": "Ručka tuša",
      Lighting: "Rasvjeta",
      "Floor Decking": "Podna obloga",
      "XL Showerhead": "XL glava tuša",
    },
  },
  quoteForm: {
    copy:
      "Recite nam što planirate, a KORTA tim pomoći će definirati pravu završnu obradu, konfiguraciju i sljedeće korake.",
    name: "Ime",
    email: "Email",
    phone: "Broj telefona",
    location: "Lokacija isporuke",
    quantity: "Količina",
    materialFinishes: "Materijali i završne obrade",
    submit: "Zatražite ponudu",
  },
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  hr,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
