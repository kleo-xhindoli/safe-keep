import * as firebase from "firebase/app";
import "firebase/firestore";
import { Safe } from "../../types/safe";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import useSession from "../useSession";
import { useCallback, useState } from "react";

export function useSafes() {
  const { currentUser } = useSession();

  const [safes, loading, error] = useCollectionData<Safe>(
    firebase.firestore().collection(`users/${currentUser?.uid}/safes`),
    { idField: "id" }
  );

  return [safes, loading, error] as const;
}

export function useSafe(safeId: string) {
  const { currentUser } = useSession();

  const [safe, loading, error] = useDocumentData<Safe>(
    firebase.firestore().doc(`users/${currentUser?.uid}/safes/${safeId}`),
    { idField: "id" }
  );

  return [safe, loading, error] as const;
}

export function useAddSafe() {
  const { currentUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSafe = useCallback(
    async (newSafe: Omit<Safe, "id" | "createdAt">) => {
      setLoading(true);
      try {
        const result = await firebase
          .firestore()
          .collection(`users/${currentUser?.uid}/safes`)
          .add({ ...newSafe, createdAt: firebase.firestore.Timestamp.now() });

        return result.id;
      } catch (e) {
        setError("Could not add a new secret at this time.");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [currentUser]
  );

  return [addSafe, loading, error] as const;
}
