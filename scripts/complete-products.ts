/**
 * Completa los productos "borrador" creados por sync-product-images.ts:
 * categoria, marca (crea la marca si no existe), precio, descripcion,
 * bondades, badges de conversion (isFeatured/isNew) y los activa.
 *
 * NOTA: baseStock queda en 20 como placeholder - actualiza el inventario
 * real de cada producto en Firestore antes de lanzar.
 *
 * Requiere scripts/serviceAccountKey.json
 * Ejecutar: npx tsx scripts/complete-products.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

initializeApp({ credential: cert(serviceAccount as any) });
const db = getFirestore();

const PLACEHOLDER_STOCK = 20;

const CATEGORIES: Record<string, string> = {
  skincare: "Skincare",
  makeup: "Makeup",
  herramientas: "Herramientas",
};

const BRANDS: Record<string, string> = {
  anua: "Anua",
  celimax: "Celimax",
  "dr-althea": "Dr. Althea",
  "k-secret": "K-Secret",
  "beauty-creations": "Beauty Creations",
};

interface ProductUpdate {
  slug: string;
  name: string;
  categoryId: keyof typeof CATEGORIES;
  brandId: keyof typeof BRANDS;
  basePrice: number;
  benefits: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: string[];
}

const PRODUCTS: ProductUpdate[] = [
  {
    slug: "anua-rice-70-intensive-moisturizing-milk-150ml",
    name: "Anua Rice 70 Intensive Moisturizing Milk 150ml",
    categoryId: "skincare",
    brandId: "anua",
    basePrice: 85,
    benefits: [
      "Contiene 70% de extracto de arroz premium.",
      "Ilumina el tono y mejora la textura cutánea.",
      "Textura líquida-lechosa de rápida absorción.",
      "Hidratación profunda sin sensación grasosa.",
      "Ideal para piel opaca, seca o deshidratada.",
    ],
  },
  {
    slug: "celimax-the-real-noni-starter-kit-3-piezas",
    name: "Celimax The Real Noni Starter Kit (3 piezas)",
    categoryId: "skincare",
    brandId: "celimax",
    basePrice: 90,
    benefits: [
      "Kit de viaje con tónico, suero y crema.",
      "Formulado con extracto de fruta de Noni.",
      "Rico en vitaminas y antioxidantes esenciales.",
      "Calma la piel irritada y reduce rojeces.",
      "Repara la barrera cutánea debilitada.",
      "Ideal para probar la rutina completa.",
    ],
  },
  {
    slug: "celimax-the-vita-a-retinol-shot-tightening-serum-30ml",
    name: "Celimax The Vita-A Retinol Shot Tightening Serum 30ml",
    categoryId: "skincare",
    brandId: "celimax",
    basePrice: 100,
    isNew: true,
    benefits: [
      "Suero tensor con Retinol (Vitamina A).",
      "Estimula la producción natural de colágeno.",
      "Suaviza líneas de expresión notablemente.",
      "Reduce la apariencia de poros dilatados.",
      "Minimiza el riesgo de irritación cutánea.",
      "Mejora la firmeza y elasticidad general.",
    ],
  },
  {
    slug: "dr-althea-0-1-gentle-retinol-serum-30ml",
    name: "Dr. Althea 0.1% Gentle Retinol Serum 30ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 90,
    benefits: [
      "Concentración de 0.1% de Retinol puro.",
      "Ideal para principiantes en el uso de retinoides.",
      "Promueve la renovación celular diaria.",
      "Disminuye manchas y líneas finas.",
      "Enriquecido con ingredientes calmantes.",
      "Previene el enrojecimiento de la piel.",
    ],
  },
  {
    slug: "dr-althea-147-barrier-cream-50ml",
    name: "Dr. Althea 147 Barrier Cream 50ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 90,
    isFeatured: true,
    benefits: [
      "Crema ungüento SOS de recuperación intensiva.",
      "Alivia instantáneamente la irritación y picazón.",
      "Elimina la descamación y resequedad extrema.",
      "Reconstruye la barrera cutánea dañada.",
      "Protege la piel contra factores ambientales.",
      "Ideal para usar post-exfoliación.",
    ],
  },
  {
    slug: "dr-althea-amino-acid-gentle-bubble-cleanser-140ml",
    name: "Dr. Althea Amino Acid Gentle Bubble Cleanser 140ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 85,
    benefits: [
      "Limpiador facial en espuma automática.",
      "Genera burbujas densas desde el dispensador.",
      "Formulado con aminoácidos respetuosos del pH.",
      "Remueve impurezas, sudor y exceso de sebo.",
      "Evita la sensación de tirantez o acartonamiento.",
      "Deja la piel suave, fresca y limpia.",
    ],
  },
  {
    slug: "dr-althea-aqua-marine-jelly-mist-100ml",
    name: "Dr. Althea Aqua Marine Jelly Mist 100ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 100,
    benefits: [
      "Bruma facial con textura tipo gelatina.",
      "Se transforma en un rocío ligero al aplicar.",
      "Retiene la humedad por más tiempo que el agua.",
      "Proporciona hidratación y frescura instantánea.",
      "Se puede usar encima del maquillaje.",
      "Formato práctico para llevar en el bolso.",
    ],
  },
  {
    slug: "dr-althea-aqua-marine-watery-cream-50ml",
    name: "Dr. Althea Aqua Marine Watery Cream 50ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 90,
    benefits: [
      "Crema hidratante ligera con textura gel.",
      "Absorción inmediata y efecto refrescante.",
      "Sacia la deshidratación profunda del rostro.",
      "No aporta grasa ni brillos indeseados.",
      "Ideal para pieles mixtas a grasas.",
      "Perfecta para uso en climas cálidos.",
    ],
  },
  {
    slug: "dr-althea-gentle-pore-cleansing-oil-150ml",
    name: "Dr. Althea Gentle Pore Cleansing Oil 150ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 90,
    benefits: [
      "Aceite para el primer paso de doble limpieza.",
      "Disuelve maquillaje pesado a prueba de agua.",
      "Remueve protectores solares y sebo acumulado.",
      "Limpia profundamente los puntos negros.",
      "Se emulsiona y enjuaga fácilmente con agua.",
      "No deja ningún residuo graso en el rostro.",
    ],
  },
  {
    slug: "dr-althea-multi-action-infusion-serum-30ml",
    name: "Dr. Althea Multi Action Infusion Serum 30ml",
    categoryId: "skincare",
    brandId: "dr-althea",
    basePrice: 80,
    benefits: [
      "Suero concentrado multifunción de alto rendimiento.",
      "Aclara manchas y unifica el tono facial.",
      "Hidrata intensamente las capas de la piel.",
      "Combate los signos globales del envejecimiento.",
      "Simplifica la rutina en un solo paso.",
      "Textura ligera de rápida penetración.",
    ],
  },
  {
    slug: "k-secret-retinal-liposome-2-seoul-1988-30ml",
    name: "K-Secret Retinal Liposome 2% Seoul 1988 30ml",
    categoryId: "skincare",
    brandId: "k-secret",
    basePrice: 100,
    isFeatured: true,
    isNew: true,
    benefits: [
      "Formulado con Retinaldehído (Retinal) al 2%.",
      "Encapsulado en liposomas para mayor absorción.",
      "Actúa más rápido que el retinol tradicional.",
      "Reduce arrugas profundas, manchas y flacidez.",
      "Minimiza drásticamente la sensibilidad cutánea.",
      "Maximiza la eficacia antiedad del producto.",
    ],
  },
  {
    slug: "brocha-diagonal-classic",
    name: "Brocha Diagonal Classic",
    categoryId: "herramientas",
    brandId: "beauty-creations",
    basePrice: 4,
    benefits: [
      "Herramienta con corte angular/diagonal.",
      "Se adapta a la estructura del pómulo.",
      "Ideal para aplicar contorno, bronceador o rubor.",
      "Cerdas sintéticas de alta calidad y ultra-suaves.",
      "Evita la absorción excesiva de producto.",
      "Fácil de lavar y de larga durabilidad.",
    ],
  },
  {
    slug: "brocha-fine-definicion",
    name: "Brocha Fine Definición",
    categoryId: "herramientas",
    brandId: "beauty-creations",
    basePrice: 10,
    benefits: [
      "Pincel de precisión con corte pequeño y delgado.",
      "Diseñado para trabajos detallados en los ojos.",
      "Ideal para difuminar delineados de precisión.",
      "Aplica sombras en la línea de pestañas inferiores.",
      "Permite iluminar el lagrimal con control total.",
      "Compatible con productos en polvo, crema o gel.",
    ],
  },
  {
    slug: "brochas-pro-x-30-piezas-barril-xl",
    name: "Set de Brochas Pro x 30 Piezas + Barril XL",
    categoryId: "herramientas",
    brandId: "beauty-creations",
    basePrice: 200,
    isFeatured: true,
    benefits: [
      "Set completo de 30 brochas profesionales.",
      "Cubre todas las técnicas de rostro y ojos.",
      "Incluye estuche rígido XL en forma de barril.",
      "Facilita el almacenamiento y transporte seguro.",
      "Cerdas de alta densidad que no se desprenden.",
      "Mangos ergonómicos para un mejor agarre.",
      "Calidad premium para uso rudo y diario.",
    ],
  },
  {
    slug: "duo-de-brochas-para-rostro",
    name: "Dúo de Brochas para Rostro",
    categoryId: "herramientas",
    brandId: "beauty-creations",
    basePrice: 15,
    benefits: [
      "Set básico con 2 brochas esenciales de rostro.",
      "Incluye brocha para texturas líquidas o crema.",
      "Incluye brocha para polvos, sellado o rubor.",
      "Formato compacto ideal para la cosmetiquera.",
      "Permite una aplicación rápida del maquillaje diario.",
      "Cerdas suaves que cuidan la piel del rostro.",
    ],
  },
  {
    slug: "set-x-3-brochas-de-precision",
    name: "Set x 3 Brochas de Precisión",
    categoryId: "herramientas",
    brandId: "beauty-creations",
    basePrice: 10,
    benefits: [
      "Kit de 3 pinceles miniatura especializados.",
      "Diseñado para corrección y definición de zonas difíciles.",
      "Óptimo para aplicar corrector en imperfecciones.",
      "Perfecto para definir labios o hacer cut crease.",
      "Cerdas firmes que permiten trazos limpios.",
      "Logra acabados detallados de nivel profesional.",
    ],
  },
  {
    slug: "fijador-beauty-creations",
    name: "Fijador Beauty Creations (Setting Spray)",
    categoryId: "makeup",
    brandId: "beauty-creations",
    basePrice: 45,
    benefits: [
      "Spray sellador de maquillaje de larga duración.",
      "Prolonga el look frente a la humedad y sudor.",
      "Evita que el maquillaje se derrita o cuartee.",
      "No se asienta en las líneas de expresión.",
      "Amalgama los productos en polvo del rostro.",
      "Deja un acabado natural, fresco y ligero.",
    ],
  },
  {
    slug: "paleta-floral-bloom-beauty-creations",
    name: "Paleta Floral Bloom Beauty Creations",
    categoryId: "makeup",
    brandId: "beauty-creations",
    basePrice: 60,
    isFeatured: true,
    benefits: [
      "Paleta de sombras para ojos de alta pigmentación.",
      "Selección de tonos florales, rosados y neutros.",
      "Combina acabados mate y brillos (shimmers).",
      "Sombras brillantes con textura cremosa.",
      "Fórmula de larga duración que no deja parches.",
      "Se difumina con extrema facilidad en el párpado.",
    ],
  },
];

async function ensureBrand(brandId: string, brandName: string) {
  const ref = db.collection("brands").doc(brandId);
  const snap = await ref.get();
  if (snap.exists) return;
  await ref.set({
    id: brandId,
    name: brandName,
    slug: brandId,
    isActive: true,
    productCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  console.log(`Marca creada: ${brandName}`);
}

async function main() {
  const usedBrands = new Set(PRODUCTS.map((p) => p.brandId));
  for (const brandId of usedBrands) {
    await ensureBrand(brandId, BRANDS[brandId]);
  }

  let updated = 0;
  let missing = 0;

  for (const product of PRODUCTS) {
    const snapshot = await db
      .collection("products")
      .where("slug", "==", product.slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.warn(`No encontrado en Firestore: ${product.slug}`);
      missing++;
      continue;
    }

    const shortDescription = product.benefits[0];
    const description = product.benefits.join(" ");

    await snapshot.docs[0].ref.update({
      name: product.name,
      categoryId: product.categoryId,
      categoryName: CATEGORIES[product.categoryId],
      brandId: product.brandId,
      brandName: BRANDS[product.brandId],
      basePrice: product.basePrice,
      baseStock: PLACEHOLDER_STOCK,
      shortDescription,
      description,
      benefits: product.benefits,
      isFeatured: Boolean(product.isFeatured),
      isNew: Boolean(product.isNew),
      isActive: true,
      tags: [product.brandId, product.categoryId],
      updatedAt: Timestamp.now(),
    });

    console.log(`Actualizado y activado: ${product.name}`);
    updated++;
  }

  console.log(`\nListo. ${updated} productos actualizados, ${missing} no encontrados.`);
  console.log(
    `Recordatorio: baseStock quedo en ${PLACEHOLDER_STOCK} como placeholder para todos - actualiza el inventario real en Firestore.`
  );
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
