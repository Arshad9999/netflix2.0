import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseConfigured = Object.values(config).every(Boolean);
const auth = firebaseConfigured ? getAuth(getApps()[0] ?? initializeApp(config)) : null;
const unavailable = () => Promise.reject(new Error('Sign-in is unavailable until Firebase is configured.'));

export const subscribeToUser = callback => {
  if (!auth) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback);
};
export const registerAccount = (email, password) => auth ? createUserWithEmailAndPassword(auth, email, password) : unavailable();
export const signIn = (email, password) => auth ? signInWithEmailAndPassword(auth, email, password) : unavailable();
export const signOutUser = () => auth ? signOut(auth) : unavailable();
