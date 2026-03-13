import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const hasValidConfig =
  typeof firebaseConfig.projectId === "string" &&
  firebaseConfig.projectId.length > 0 &&
  typeof firebaseConfig.appId === "string" &&
  firebaseConfig.appId.length > 0;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (hasValidConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps()[0] as FirebaseApp);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "auth/already-initialized" && app) {
      auth = getAuth(app);
    } else {
      console.warn("Firebase init failed, auth disabled:", err);
      auth = null;
    }
  }
}

const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
