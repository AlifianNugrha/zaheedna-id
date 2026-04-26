import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Gamis" | "Hijab" | "Tunik" | "Set" | "Koleksi Terbaru";
  price: number;
  image: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "amira-gamis-nude",
    name: "Amira Gamis",
    category: "Gamis",
    price: 489000,
    image: product1,
    colors: [
      { name: "Nude", hex: "#e8d5c0" },
      { name: "Taupe", hex: "#a89684" },
      { name: "Ivory", hex: "#f5ede4" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Gamis Amira hadir dengan siluet anggun dan jatuh sempurna. Dibuat dari bahan crepe premium yang lembut di kulit, cocok untuk acara formal maupun keseharian.",
    badge: "Best Seller",
  },
  {
    id: "2",
    slug: "luna-hijab-taupe",
    name: "Luna Hijab",
    category: "Hijab",
    price: 129000,
    image: product2,
    colors: [
      { name: "Taupe", hex: "#a89684" },
      { name: "Nude", hex: "#e8d5c0" },
      { name: "Ivory", hex: "#f5ede4" },
    ],
    sizes: ["One Size"],
    description: "Hijab voal premium dengan jatuh yang lembut dan finishing rapi.",
  },
  {
    id: "3",
    slug: "zaynab-abaya-rose",
    name: "Zaynab Abaya",
    category: "Gamis",
    price: 629000,
    image: product3,
    colors: [
      { name: "Dusty Rose", hex: "#c9a087" },
      { name: "Nude", hex: "#e8d5c0" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Abaya elegan dengan kancing emas dan potongan modest yang anggun.",
    badge: "Koleksi Terbaru",
  },
  {
    id: "4",
    slug: "nadira-tunik-ivory",
    name: "Nadira Tunik",
    category: "Tunik",
    price: 349000,
    image: product4,
    colors: [
      { name: "Ivory", hex: "#f5ede4" },
      { name: "Nude", hex: "#e8d5c0" },
    ],
    sizes: ["S", "M", "L"],
    description: "Tunik dengan bordir halus dan detail tassel di bagian depan.",
  },
  {
    id: "5",
    slug: "rania-set-beige",
    name: "Rania Set",
    category: "Set",
    price: 729000,
    image: product5,
    colors: [
      { name: "Beige", hex: "#e8d5c0" },
      { name: "Taupe", hex: "#a89684" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "One set tunik dan celana kulot dengan bahan twill yang ringan.",
    badge: "Best Seller",
  },
  {
    id: "6",
    slug: "salma-dress-taupe",
    name: "Salma Dress",
    category: "Gamis",
    price: 549000,
    image: product6,
    colors: [
      { name: "Taupe", hex: "#a89684" },
      { name: "Nude", hex: "#e8d5c0" },
    ],
    sizes: ["S", "M", "L"],
    description: "Dress midi dengan ikat pinggang yang menonjolkan siluet anggun.",
  },
];

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categories = [
  "Semua",
  "Koleksi Terbaru",
  "Gamis",
  "Hijab",
  "Tunik",
  "Set",
] as const;
