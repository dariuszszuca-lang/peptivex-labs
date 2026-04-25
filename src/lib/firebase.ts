import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAB425oOB3-gnqZqw26-zNK9y6307aepfE',
  authDomain: 'peptivex-labs.firebaseapp.com',
  projectId: 'peptivex-labs',
  storageBucket: 'peptivex-labs.firebasestorage.app',
  messagingSenderId: '151590091023',
  appId: '1:151590091023:web:e0fd5a7f52e1937509267a',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
