import * as firebase from "firebase/app";
import "firebase/firestore";
import { useCallback, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Secret } from "../../types/secret";
import { awaitableOffline } from "../../utils/network";
import useSession from "../useSession";

export function useSecrets(safeId: string) {
  const { currentUser } = useSession();
  const [safes, loading, error] = useCollectionData<Secret>(
    firebase
      .firestore()
      .collection(`users/${currentUser?.uid}/safes/${safeId}/secrets`)
      .orderBy("createdAt", "desc"),
    { idField: "id" }
  );

  return [safes, loading, error] as const;
}

export function useAddSecret(safeId: string) {
  const { currentUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSecret = useCallback(
    async (newSecret: Omit<Secret, "id" | "createdAt">) => {
      setLoading(true);
      try {
        const result = await awaitableOffline(
          firebase
            .firestore()
            .collection(`users/${currentUser?.uid}/safes/${safeId}/secrets`)
            .add({
              ...newSecret,
              createdAt: firebase.firestore.Timestamp.now(),
            })
        );

        setLoading(false);
        return result?.id;
      } catch (e) {
        setError(e.message);
        setLoading(false);

        throw e;
      }
    },
    [currentUser, safeId]
  );

  return [addSecret, loading, error] as const;
}

export function useUpdateSecret(safeId: string) {
  const { currentUser } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSecret = useCallback(
    async (secretId: string, { label, value }: Partial<Secret>) => {
      setLoading(true);
      try {
        await awaitableOffline(
          firebase
            .firestore()
            .doc(
              `users/${currentUser?.uid}/safes/${safeId}/secrets/${secretId}`
            )
            .update({ label, value })
        );

        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);

        throw e;
      }
    },
    [currentUser, safeId]
  );

  return [updateSecret, loading, error] as const;
}

export function useDeleteSecret(safeId: string) {
  const { currentUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSecret = useCallback(
    async (secretId: string) => {
      setLoading(true);
      try {
        await awaitableOffline(
          firebase
            .firestore()
            .doc(
              `users/${currentUser?.uid}/safes/${safeId}/secrets/${secretId}`
            )
            .delete()
        );

        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
    },
    [currentUser, safeId]
  );

  return [deleteSecret, loading, error] as const;
}
