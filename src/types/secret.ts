export interface Secret {
  id: string;
  label: string;
  value: string;
  createdAt: firebase.firestore.Timestamp;
}
