import * as firebase from "firebase/app";
import "firebase/database";
import { Safe } from "../../types/safe";
import { useList } from "react-firebase-hooks/database";
import { useComputed } from "../utils";
import useSession from "../useSession";
import { useState } from "react";

export function useSafes() {
  const { currentUser } = useSession();
  const safesRef = firebase.database().ref(`users/${currentUser?.uid}/safes`);
  const [snapshot, loading, error] = useList(safesRef);

  const safes: Safe[] | undefined = useComputed(() => {
    return snapshot?.map((el) => ({ id: el.key, ...el.val() }));
  }, [snapshot]);

  return [safes, loading, error] as const;
}

export function useAddSafe() {
  const { currentUser } = useSession();
  const safesRef = firebase.database().ref(`users/${currentUser?.uid}/safes`);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSafe = async (newSafe: Omit<Safe, "id">) => {
    setLoading(true);
    try {
      const pushedObject = await safesRef.push({ ...newSafe });
      return pushedObject?.key;
    } catch (e) {
      setError("Could not add a new secret at this time.");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return [addSafe, loading, error] as const;
}
