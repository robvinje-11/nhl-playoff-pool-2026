import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitEntry(entry) {
  try {
    const docRef = await addDoc(collection(db, 'entries'), {
      ...entry,
      submittedAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error('Firebase error:', e);
    return { success: false, error: e.message };
  }
}

export async function getEntries() {
  try {
    const snapshot = await getDocs(collection(db, 'entries'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error('Firebase error:', e);
    return [];
  }
}

export { db };
