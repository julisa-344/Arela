/**
 * Recorre Storage bajo products/{slug}/*.jpg y:
 * - Si el producto (por slug) ya existe en Firestore, actualiza images/thumbnail.
 * - Si no existe, crea un producto "borrador" (isActive: false) con esas imagenes
 *   para que solo falte completar precio, categoria, marca y descripcion.
 *
 * Requiere scripts/serviceAccountKey.json
 * Ejecutar: npx tsx scripts/sync-product-images.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

const STORAGE_BUCKET = "materialize-blog-5ad8a.firebasestorage.app";

initializeApp({
  credential: cert(serviceAccount as any),
  storageBucket: STORAGE_BUCKET,
});

const db = getFirestore();
const bucket = getStorage().bucket();

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => (word.length <= 3 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

function downloadUrl(path: string) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media`;
}

function fileNumber(path: string) {
  const match = path.match(/(\d+)\.\w+$/);
  return match ? parseInt(match[1], 10) : 0;
}

async function main() {
  console.log("Leyendo archivos en products/ ...\n");
  const [files] = await bucket.getFiles({ prefix: "products/" });

  const groups = new Map<string, string[]>();
  for (const file of files) {
    const parts = file.name.split("/"); // products/<slug>/<n>.jpg
    if (parts.length < 3) continue;
    const slug = parts[1];
    if (!groups.has(slug)) groups.set(slug, []);
    groups.get(slug)!.push(file.name);
  }

  let created = 0;
  let updated = 0;

  for (const [slug, paths] of groups) {
    const sortedPaths = paths.sort((a, b) => fileNumber(a) - fileNumber(b));
    const images = sortedPaths.map(downloadUrl);
    const thumbnail = images[0];

    const snapshot = await db.collection("products").where("slug", "==", slug).limit(1).get();

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await docRef.update({ images, thumbnail, updatedAt: Timestamp.now() });
      console.log(`Actualizado: ${slug} (${images.length} imagenes)`);
      updated++;
      continue;
    }

    const docRef = db.collection("products").doc();
    await docRef.set({
      id: docRef.id,
      name: toTitleCase(slug),
      slug,
      description: "",
      shortDescription: "",
      categoryId: "",
      categoryName: "",
      brandId: "",
      brandName: "",
      hasVariants: false,
      variants: [],
      basePrice: 0,
      baseStock: 0,
      baseSku: "",
      images,
      thumbnail,
      benefits: [],
      tags: [],
      isActive: false,
      isFeatured: false,
      isNew: true,
      hasPromotion: false,
      viewsCount: 0,
      salesCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`Creado (borrador, isActive: false): ${slug} (${images.length} imagenes)`);
    created++;
  }

  console.log(`\nListo. ${created} productos creados, ${updated} actualizados.`);
  console.log(
    "Los productos creados quedaron como borrador (isActive: false): completa precio, categoria, marca y descripcion en Firestore, luego ponlos en isActive: true."
  );
  process.exit(0);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
