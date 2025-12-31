import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as dotenv from "dotenv";

// Esta linha diz: "Se estivermos testando, use o .env.test. Se não, use o .env comum."
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// O Analytics só liga se não estivermos em ambiente de teste (para não poluir meus dados)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };