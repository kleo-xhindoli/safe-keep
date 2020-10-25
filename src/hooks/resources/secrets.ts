import * as firebase from "firebase/app";
import "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { Secret } from "../../types/secret";

export function useSecrets(safeId: string) {
  const secretsRef = firebase.database().ref(`safes/${safeId}/secrets`);
  const [safes, loading, error] = useListVals<Secret>(secretsRef, {
    keyField: "id",
  });

  return [safes, loading, error] as const;
}
