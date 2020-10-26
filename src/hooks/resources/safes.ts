import * as firebase from "firebase/app";
import "firebase/firestore";
import { Safe } from "../../types/safe";
import { useCollectionData } from "react-firebase-hooks/firestore";
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

export function useAddSafe() {
  const { currentUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSafe = useCallback(
    async (newSafe: Omit<Safe, "id">) => {
      setLoading(true);
      try {
        const result = await firebase
          .firestore()
          .collection(`users/${currentUser?.uid}/safes`)
          .add({ ...newSafe });

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
