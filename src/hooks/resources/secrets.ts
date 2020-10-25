import * as firebase from "firebase/app";
import "firebase/database";
import { useState } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { Secret } from "../../types/secret";

export function useSecrets(safeId: string) {
  const secretsRef = firebase.database().ref(`safes/${safeId}/secrets`);
  const [safes, loading, error] = useListVals<Secret>(secretsRef, {
    keyField: "id",
  });

  return [safes, loading, error] as const;
}

export function useAddSecret(safeId: string) {
  const secretsRef = firebase.database().ref(`safes/${safeId}/secrets`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSecret = (newSecret: Omit<Secret, "id">) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      secretsRef.push({ ...newSecret }, (err) => {
        setLoading(false);
        if (err) {
          setError("Could not add a new secret at this time.");
          return reject(err);
        }
        resolve();
      });
    });
  };

  return [addSecret, loading, error] as const;
}

export function useUpdateSecret(safeId: string) {
  const secretsRef = firebase.database().ref(`safes/${safeId}/secrets`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSecret = (id: string, { label, value }: Partial<Secret>) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const secretRef = secretsRef.child(id);
      secretRef.update({ label, value }, (err) => {
        setLoading(false);
        if (err) {
          setError("Could not add a new secret at this time.");
          return reject(err);
        }
        resolve();
      });
    });
  };

  return [updateSecret, loading, error] as const;
}

export function useDeleteSecret(safeId: string) {
  const secretsRef = firebase.database().ref(`safes/${safeId}/secrets`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSecret = (secretId: string) => {
    return new Promise((resolve, reject) => {
      const secretRef = secretsRef.child(secretId);

      setLoading(true);
      secretRef.remove((err) => {
        setLoading(false);
        if (err) {
          setError("Could not add a new secret at this time.");
          console.log(err);
          return reject(err);
        }
        resolve();
      });
    });
  };

  return [deleteSecret, loading, error] as const;
}
