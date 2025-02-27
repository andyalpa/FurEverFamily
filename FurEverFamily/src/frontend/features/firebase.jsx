import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhtL-G7FEJrRiUmijSnFqQoiw4QZOPlys",
  authDomain: "fureverfriend-9f1e0.firebaseapp.com",
  projectId: "fureverfriend-9f1e0",
  storageBucket: "fureverfriend-9f1e0.firebasestorage.app",
  messagingSenderId: "224587128948",
  appId: "1:224587128948:web:9ffec0c863d4ddefc4f121",
  measurementId: "G-31F9X93LPE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export async function saveFavoritePet(userId, petId) {
  await setDoc(doc(db, 'users', userId, 'favorites', petId.toString()), { petId });
}

export async function getFavoritePets(userId) {
  const snapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
  return snapshot.docs.map((doc) => doc.id);
}

export async function saveRecipe(userId, recipeId) {
  await setDoc(doc(db, 'users', userId, 'savedRecipes', recipeId.toString()), { recipeId });
}

export async function getSavedRecipes(userId) {
  const snapshot = await getDocs(collection(db, 'users', userId, 'savedRecipes'));
  return snapshot.docs.map((doc) => doc.id);
}