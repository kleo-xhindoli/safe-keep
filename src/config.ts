// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const devFirebaseConfig = {
  apiKey: "AIzaSyCKTYunaLtZylKdHxV-0pjTUG5yDvTheQ8",
  authDomain: "safe-keep-dev.firebaseapp.com",
  databaseURL: "https://safe-keep-dev.firebaseio.com",
  projectId: "safe-keep-dev",
  storageBucket: "safe-keep-dev.appspot.com",
  messagingSenderId: "510279258299",
  appId: "1:510279258299:web:2af2de1bcd2f493ca1999e",
  measurementId: "G-J03PLVBLMB",
} as const;

export type Environment = "local" | "dev" | "prod";

export const env = process.env.REACT_APP_ENVIRONMENT as Environment;

if (!env) throw new Error("Could not resolve current environment");

const config = {
  local: {
    firebase: devFirebaseConfig,
  },
  dev: {
    firebase: devFirebaseConfig,
  },
  prod: {
    firebase: devFirebaseConfig,
  },
} as const;

export default config[env];
