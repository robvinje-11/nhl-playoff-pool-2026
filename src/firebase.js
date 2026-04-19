import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

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
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('Firebase error:', e);
    return [];
  }
}

export async function clearResults() {
  try {
    await deleteDoc(doc(db, 'config', 'results'));
    return { success: true };
  } catch (e) {
    console.error('Firebase error:', e);
    return { success: false };
  }
}

export async function deleteAllEntries() {
  try {
    const snapshot = await getDocs(collection(db, 'entries'));
    const deletes = snapshot.docs.map(d => deleteDoc(doc(db, 'entries', d.id)));
    await Promise.all(deletes);
    return { success: true, count: snapshot.docs.length };
  } catch (e) {
    console.error('Firebase error:', e);
    return { success: false };
  }
}

export async function getLockStatus() {
  try {
    const snap = await getDoc(doc(db, 'config', 'settings'));
    if (snap.exists()) return snap.data().locked || false;
    return false;
  } catch (e) {
    console.error('Firebase error:', e);
    return false;
  }
}

export async function setLockStatus(locked) {
  try {
    await setDoc(doc(db, 'config', 'settings'), { locked }, { merge: true });
    return { success: true };
  } catch (e) {
    console.error('Firebase error:', e);
    return { success: false };
  }
}

export { db, doc, getDoc, setDoc, deleteDoc };

export async function updateEntryName(entryId, firstName, lastName) {
  try {
    const ref = doc(db, 'entries', entryId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      data.player.firstName = firstName;
      data.player.lastName = lastName;
      await setDoc(ref, data);
      return { success: true };
    }
    return { success: false };
  } catch (e) {
    console.error('Firebase error:', e);
    return { success: false };
  }
}
