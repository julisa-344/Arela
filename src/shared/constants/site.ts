export const SITE = {
  name: "Arela",
  description: "Skincare consciente, resultados reales.",
  whatsappNumber: "51999999999", // TODO: reemplazar por el numero real de Arela (formato: codigo pais + numero, sin '+')
  currency: "PEN",
  currencyLocale: "es-PE",
};

export const NAV_LINKS = [
  { label: "tienda", href: "/tienda" },
  { label: "nosotros", href: "/nosotros" },
];

export const PRODUCT_CATEGORIES = [
  { label: "skincare", value: "skincare" },
  { label: "maquillaje", value: "maquillaje" },
  { label: "accesorios", value: "accesorios" },
  { label: "sets", value: "sets" },
] as const;
