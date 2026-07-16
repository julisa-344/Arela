/**
 * Desactiva los 3 productos de ejemplo creados por seed-firebase.ts
 * (quedan en Firestore pero dejan de mostrarse en la tienda).
 * Ejecutar: npx tsx scripts/deactivate-demo-products.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

initializeApp({ credential: cert(serviceAccount as any) });
const db = getFirestore();

const DEMO_SLUGS = [
  "crema-hidratante-acido-hialuronico",
  "serum-vitamina-c",
  "kit-brochas-profesional",
];

async function main() {
  for (const slug of DEMO_SLUGS) {
    const snapshot = await db.collection("products").where("slug", "==", slug).limit(1).get();
    if (snapshot.empty) {
      console.warn(`No encontrado: ${slug}`);
      continue;
    }
    await snapshot.docs[0].ref.update({ isActive: false, updatedAt: Timestamp.now() });
    console.log(`Desactivado: ${slug}`);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
