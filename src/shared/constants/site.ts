export const SITE = {
  name: "Arela",
  description: "Skincare consciente, resultados reales.",
  whatsappNumber: "51906259258",
  email: "hola@arela.pe", // TODO: reemplazar por el correo real de Arela
  instagram: "https://instagram.com/arela", // TODO: reemplazar por el usuario real de Arela
  currency: "PEN",
  currencyLocale: "es-PE",
};

export const SHIPPING = {
  cost: 15,
  zone: "A nivel nacional",
  estimatedTime: "aprox. 1 semana",
};

export const NAV_LINKS = [
  { label: "tienda", href: "/tienda" },
  { label: "nosotros", href: "/nosotros" },
  { label: "contacto", href: "/contacto" },
];

export const PRODUCT_CATEGORIES = [
  { label: "skincare", value: "skincare" },
  { label: "maquillaje", value: "maquillaje" },
  { label: "accesorios", value: "accesorios" },
  { label: "sets", value: "sets" },
] as const;
