import type { Product } from "@/shared/types/product";

// TODO: reemplazar por datos reales (CMS, API o archivo de catalogo definitivo)
export const PRODUCTS: Product[] = [
  {
    slug: "gel-limpiador-iluminador",
    name: "Gel limpiador iluminador",
    category: "skincare",
    tags: ["iluminar", "limpieza"],
    price: 89,
    image: "/products/1.png",
    shortDescription: "Limpieza suave que ilumina e hidrata la piel.",
    description:
      "Gel limpiador de uso diario formulado con ingredientes naturales que respetan la barrera cutanea, dejando la piel limpia, luminosa e hidratada.",
    size: "120 ml",
  },
  {
    slug: "serum-unificador",
    name: "Serum unificador de tono",
    category: "skincare",
    tags: ["unificar", "poros"],
    price: 99,
    image: "/products/placeholder-2.svg",
    shortDescription: "Unifica el tono y minimiza la apariencia de los poros.",
    description:
      "Serum ligero de rapida absorcion que ayuda a unificar el tono de la piel y afinar la textura visible de los poros.",
    size: "50 ml",
  },
  {
    slug: "set-glow-natural",
    name: "Set glow natural",
    category: "sets",
    tags: ["glow natural"],
    price: 199,
    compareAtPrice: 240,
    image: "/products/placeholder-3.svg",
    shortDescription: "Ritual completo para un brillo natural y saludable.",
    description:
      "Set de 3 pasos pensado para lograr un glow natural: limpieza, tratamiento y proteccion en una sola rutina.",
    size: "3 productos",
  },
  {
    slug: "aceite-de-dia-protector",
    name: "Aceite de dia protector",
    category: "skincare",
    tags: ["proteger", "iluminar"],
    price: 69,
    image: "/products/placeholder-4.svg",
    shortDescription: "Proteccion diaria con acabado luminoso.",
    description:
      "Aceite facial ligero que protege la piel de los agresores diarios mientras aporta un acabado radiante, no graso.",
    size: "30 ml",
  },
];

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string) {
  return PRODUCTS.filter((product) => product.category === category);
}
