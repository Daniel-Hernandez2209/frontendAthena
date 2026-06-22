// ─────────────────────────────────────────────────────────────────
//  ATHENA BRAND — Product Catalog
//  ─────────────────────────────────────────────────────────────────
//  HOW TO ADD PRODUCTS:
//  1. Mete tus fotos en  public/images/products/
//  2. Agrega las rutas en `images: []` — la primera es la principal,
//     las demás ciclan en hover cada 2s
// ─────────────────────────────────────────────────────────────────

export type Brand =
  | "TODOS"
  | "PANTALONES"
  | "BUZOS Y HOODIES"
  | "CAMISETAS"
  | "TENNIS"
  | "ACCESORIOS"
  | "BLUSAS"
  | "VESTIDOS"
  | "CONJUNTOS DEPORTIVOS";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: string;
  originalPrice?: string;
  size?: string;
  images: string[]; // [0] = principal, resto ciclan en hover
  sold?: boolean;
  badge?: string;
}

export const BRANDS: Brand[] = [
  "TODOS",
  "PANTALONES",
  "BUZOS Y HOODIES",
  "CAMISETAS",
  "TENNIS",
  "ACCESORIOS",
  "BLUSAS",
  "VESTIDOS",
  "CONJUNTOS DEPORTIVOS",
];

export const COVER_IMAGE = "/images/products/portada.jpeg";

export const products: Product[] = [
  {
    id: "crtz-001",
    name: "Alcatraz Hoodie",
    brand: "BUZOS Y HOODIES",
    price: "$180",
    size: "M / L",
    images: [
      "/images/products/buso.jpeg",
      "/images/products/buso_blanco.jpeg",
      "/images/products/modelo.jpeg",
    ],
    badge: "NUEVO",
  },
  {
    id: "crtz-002",
    name: "Rules The World Tee",
    brand: "BUZOS Y HOODIES",
    price: "$95",
    size: "S / M / L / XL",
    images: [
      "/images/products/buso_blanco.jpeg",
      "/images/products/buso.jpeg",
      "/images/products/duo.jpeg",
    ],
  },
  {
    id: "rpr-001",
    name: "Owners Club Hoodie",
    brand: "BUZOS Y HOODIES",
    price: "$295",
    originalPrice: "$380",
    size: "S / M / L",
    images: [
      "/images/products/camiseta.jpeg",
      "/images/products/conjunto.jpeg",
      "/images/products/buso.jpeg",
    ],
    badge: "-22%",
  },
  {
    id: "rpr-002",
    name: "Clo Cargo Pant",
    brand: "PANTALONES",
    price: "$340",
    size: "S / M",
    images: [
      "/images/products/conjunto.jpeg",
      "/images/products/pantalon.jpeg",
    ],
    sold: true,
  },
  {
    id: "sup-001",
    name: "Box Logo Hoodie FW24",
    brand: "CONJUNTOS DEPORTIVOS",
    price: "$450",
    size: "M",
    images: [
      "/images/products/duo.jpeg",
      "/images/products/buso.jpeg",
      "/images/products/portada.jpeg",
    ],
    badge: "NUEVO",
  },
  {
    id: "sup-002",
    name: "Arc Logo Crewneck",
    brand: "BLUSAS",
    price: "$220",
    size: "L / XL",
    images: [
      "/images/products/modelo.jpeg",
      "/images/products/buso_blanco.jpeg",
      "/images/products/duo.jpeg",
    ],
  },
  {
    id: "ess-001",
    name: "Core Fleece Hoodie",
    brand: "VESTIDOS",
    price: "$110",
    size: "S / M / L / XL",
    images: [
      "/images/products/pantalon.jpeg",
      "/images/products/conjunto.jpeg",
      "/images/products/modelo.jpeg",
    ],
  },
  {
    id: "ess-002",
    name: "Relaxed Crewneck",
    brand: "CONJUNTOS DEPORTIVOS",
    price: "$95",
    size: "M / L",
    images: [
      "/images/products/buso.jpeg",
      "/images/products/camiseta.jpeg",
      "/images/products/duo.jpeg",
    ],
  },
  {
    id: "rhd-001",
    name: "Chevron Crest Short",
    brand: "TENNIS",
    price: "$380",
    size: "S / M",
    images: [
      "/images/products/camiseta.jpeg",
      "/images/products/buso_blanco.jpeg",
      "/images/products/conjunto.jpeg",
    ],
  },
  {
    id: "rhd-002",
    name: "Traxedo Pant",
    brand: "TENNIS",
    price: "$520",
    size: "M / L",
    images: [
      "/images/products/pantalon.jpeg",
      "/images/products/conjunto.jpeg",
    ],
    sold: true,
  },
  {
    id: "rhd-003",
    name: "Traxedo Pant",
    brand: "BUZOS Y HOODIES",
    price: "$520",
    size: "M / L",
    images: [
      "/images/products/pantalon.jpeg",
      "/images/products/conjunto.jpeg",
    ],
    sold: true,
  },
];
