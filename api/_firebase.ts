import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT env var is not set');
  }
  const serviceAccount = JSON.parse(serviceAccountJson);
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
