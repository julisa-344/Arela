/**
 * Desactiva las marcas de ejemplo creadas por seed-firebase.ts
 * Ejecutar: npx tsx scripts/deactivate-demo-brands.ts
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

initializeApp({ credential: cert(serviceAccount as any) });
const db = getFirestore();

const DEMO_BRAND_IDS = ["marca-1", "marca-2", "marca-3", "marca-4", "marca-5"];

async function main() {
  for (const id of DEMO_BRAND_IDS) {
    const ref = db.collection("brands").doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      console.warn(`No encontrado: ${id}`);
      continue;
    }
    await ref.update({ isActive: false, updatedAt: Timestamp.now() });
    console.log(`Desactivado: ${snap.data()?.name} (${id})`);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
