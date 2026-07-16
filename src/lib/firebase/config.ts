import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB8JN4wA5E0990u4s7lHozEXTkfBzZ3LDA",
  authDomain: "materialize-blog-5ad8a.firebaseapp.com",
  projectId: "materialize-blog-5ad8a",
  storageBucket: "materialize-blog-5ad8a.firebasestorage.app",
  messagingSenderId: "855635108581",
  appId: "1:855635108581:web:1fa5e4e70fb338be04ea0c",
  measurementId: "G-1BYSV65DR2"
};

// Initialize Firebase (solo si no existe)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Servicios de Firebase
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Analytics (solo en el cliente)
let analyticsInstance: Analytics | null = null;
if (typeof window !== 'undefined') {
  analyticsInstance = getAnalytics(app);
}
export const analytics = analyticsInstance;

export default app;
