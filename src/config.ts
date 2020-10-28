// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY as string,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN as string,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL as string,
  projectId: REACT_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: REACT_APP_FIREBASE_APP_ID as string,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID as string,
} as const;

export type Environment = "local" | "dev" | "prod";

export const env = process.env.REACT_APP_ENVIRONMENT as Environment;

if (!env) throw new Error("Could not resolve current environment");

const config = {
  local: {
    firebase: firebaseConfig,
  },
  dev: {
    firebase: firebaseConfig,
  },
  prod: {
    firebase: firebaseConfig,
  },
} as const;

console.log("CONFIG: ", config[env]);

export default config[env];
