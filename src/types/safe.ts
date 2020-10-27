import { Secret } from "./secret";

export interface Safe {
  id: string;
  name: string;
  createdAt: firebase.firestore.Timestamp;

  secrets: Record<string, Secret>;
}
