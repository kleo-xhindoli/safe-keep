import { Secret } from "./secret";

export interface Safe {
  id: string;
  name: string;

  secrets: Secret[];
}
