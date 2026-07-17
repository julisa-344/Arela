export const SITE = {
  name: "Arela",
  description: "Skincare consciente, resultados reales.",
  whatsappNumber: "51999999999", // TODO: reemplazar por el numero real de Arela (formato: codigo pais + numero, sin '+')
  email: "hola@arela.pe", // TODO: reemplazar por el correo real de Arela
  instagram: "https://instagram.com/arela", // TODO: reemplazar por el usuario real de Arela
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
