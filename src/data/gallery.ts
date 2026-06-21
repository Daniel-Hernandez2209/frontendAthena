// ─────────────────────────────────────────────────────────────────
//  ATHENA BRAND — Gallery / Lookbook
//  ─────────────────────────────────────────────────────────────────
//  Cada item puede ser:
//    type: 'images'  → pon varias fotos en `images[]`, en hover ciclan cada 2s
//    type: 'video'   → pon la ruta del video en `video`, se reproduce en loop
//
//  Para videos pon el archivo en public/videos/ y usa "/videos/mi-video.mp4"
// ─────────────────────────────────────────────────────────────────

export type GalleryItemType = "images" | "video";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  images?: string[]; // mínimo 1, en hover cicla entre todas
  video?: string; // ruta al video mp4
  caption?: string; // texto opcional debajo
  span?: "normal" | "wide"; // 'wide' ocupa 2 columnas
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g-001",
    type: "images",
    images: [
      "/images/products/portada.jpeg",
      "/images/products/duo.jpeg",
      "/images/products/modelo.jpeg",
    ],
    caption: "Temporada 2025",
    span: "wide",
  },
  {
    id: "g-002",
    type: "images",
    images: ["/images/products/buso.jpeg", "/images/products/buso_blanco.jpeg"],
    caption: "Outerwear",
  },
  {
    id: "g-003",
    type: "images",
    images: [
      "/images/products/camiseta.jpeg",
      "/images/products/conjunto.jpeg",
    ],
    caption: "Essentials",
  },
  {
    id: "g-004",
    type: "images",
    images: [
      "/images/products/pantalon.jpeg",
      "/images/products/conjunto.jpeg",
      "/images/products/duo.jpeg",
    ],
    caption: "Bottoms",
  },
  {
    id: "g-005",
    type: "images",
    images: ["/images/products/modelo.jpeg", "/images/products/portada.jpeg"],
    caption: "Street",
  },
  {
    id: "g-006",
    type: "images",
    images: ["/images/products/modelo.jpeg", "/images/products/portada.jpeg"],
    caption: "Street",
  },
];
