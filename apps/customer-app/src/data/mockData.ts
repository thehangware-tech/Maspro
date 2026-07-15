import { Category, Product } from "../types";

export const CATEGORIES: Category[] = [
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "football", name: "Football", icon: "⚽" },
  { id: "badminton", name: "Badminton", icon: "🏸" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "volleyball", name: "Volleyball", icon: "🏐" },
  { id: "swimming", name: "Swimming", icon: "🏊" },
  { id: "fitness", name: "Fitness", icon: "🏋️" },
  { id: "running", name: "Running", icon: "🏃" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
];

const BGS = [
  "#FEF9EE",
  "#EFF6FF",
  "#FFF7ED",
  "#F0FDF4",
  "#F8FAFC",
  "#F3E8FF",
  "#FFE4E6",
];
const BRANDS = [
  "MASPRO",
  "SG",
  "SS",
  "Nike",
  "Adidas",
  "Puma",
  "Under Armour",
  "Yonex",
  "Nivia",
  "Cosco",
];
const SIZES = ["S", "M", "L", "XL", "7", "8", "9", "10"];

// Helper to generate a random product
const genProduct = (
  id: number,
  sport: string,
  emoji: string,
  name: string,
  subCategory: string,
): Product => {
  const original = Math.floor(Math.random() * 5000) + 1000;
  const discount = Math.floor(Math.random() * 40) + 10;
  const price = Math.floor(original * (1 - discount / 100));

  return {
    id: `prod_${id}`,
    name,
    brand: BRANDS[Math.floor(Math.random() * BRANDS.length)],
    price,
    original,
    discount,
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
    reviews: Math.floor(Math.random() * 900) + 10,
    emoji,
    bg: BGS[Math.floor(Math.random() * BGS.length)],
    inStock: Math.random() > 0.1, // 90% chance to be in stock
    categoryId: sport,
    subCategory,
    isNew: Math.random() > 0.8,
    isPopular: Math.random() > 0.7,
    colors: ["#000000", "#ffffff", "#0EA5E9", "#EF4444"].slice(
      0,
      Math.floor(Math.random() * 3) + 1,
    ),
    sizes:
      subCategory.toLowerCase().includes("shoe") ||
      subCategory.toLowerCase().includes("shirt")
        ? SIZES
        : undefined,
    description: `High-quality ${name} designed for optimal performance in ${sport}. Features premium materials and expert craftsmanship for the best experience.`,
  };
};

const ITEMS_PER_SPORT = 20;

const generateAllProducts = (): Product[] => {
  let counter = 1;
  const allProds: Product[] = [];

  const sportConfigs = [
    {
      cat: "cricket",
      emoji: "🏏",
      items: [
        "Bat",
        "Ball",
        "Gloves",
        "Helmet",
        "Pads",
        "Shoes",
        "Kit Bag",
        "Stumps",
      ],
    },
    {
      cat: "football",
      emoji: "⚽",
      items: [
        "Ball",
        "Boots",
        "Shin Guards",
        "Jersey",
        "Goalkeeper Gloves",
        "Socks",
        "Training Bib",
        "Net",
      ],
    },
    {
      cat: "badminton",
      emoji: "🏸",
      items: [
        "Racket",
        "Shuttlecocks",
        "Shoes",
        "Net",
        "Grip",
        "Kit Bag",
        "Jersey",
      ],
    },
    {
      cat: "basketball",
      emoji: "🏀",
      items: ["Ball", "Shoes", "Jersey", "Hoop", "Socks", "Pump", "Wristband"],
    },
    {
      cat: "volleyball",
      emoji: "🏐",
      items: ["Ball", "Knee Pads", "Net", "Shoes", "Jersey"],
    },
    {
      cat: "swimming",
      emoji: "🏊",
      items: [
        "Goggles",
        "Cap",
        "Swimsuit",
        "Trunks",
        "Kickboard",
        "Fins",
        "Ear Plugs",
      ],
    },
    {
      cat: "fitness",
      emoji: "🏋️",
      items: [
        "Dumbbells",
        "Yoga Mat",
        "Resistance Bands",
        "Gloves",
        "Kettlebell",
        "Weight Plate",
        "Protein Shaker",
      ],
    },
    {
      cat: "running",
      emoji: "🏃",
      items: [
        "Running Shoes",
        "Shorts",
        "T-Shirt",
        "Water Bottle",
        "Socks",
        "Cap",
        "Smartwatch",
      ],
    },
    {
      cat: "tennis",
      emoji: "🎾",
      items: [
        "Racket",
        "Balls",
        "Shoes",
        "Overgrip",
        "Bag",
        "Headband",
        "Wristband",
      ],
    },
  ];

  for (const conf of sportConfigs) {
    for (let i = 0; i < ITEMS_PER_SPORT; i++) {
      const subCat = conf.items[Math.floor(Math.random() * conf.items.length)];
      const prefix = ["Pro", "Elite", "Training", "Match", "Ultra", "Premium"][
        Math.floor(Math.random() * 6)
      ];
      allProds.push(
        genProduct(
          counter++,
          conf.cat,
          conf.emoji,
          `${prefix} ${subCat}`,
          subCat,
        ),
      );
    }
  }

  return allProds;
};

export const MOCK_PRODUCTS = generateAllProducts();

export const BANNERS = [
  {
    id: "1",
    title: "GEAR UP\nFOR VICTORY",
    sub: "Up to 30% OFF on cricket gear",
    cta: "Shop Now",
    colors: ["#CC5500", "#0EA5E9", "#38BDF8"] as const,
    emoji: "🏏",
    linkParams: { cat: "cricket" },
  },
  {
    id: "2",
    title: "NEW FOOTBALL\nARRIVALS",
    sub: "Latest boots and jerseys",
    cta: "Explore",
    colors: ["#064E3B", "#065F46", "#10B981"] as const,
    emoji: "⚽",
    linkParams: { cat: "football" },
  },
];
