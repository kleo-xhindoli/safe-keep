import * as firebase from "firebase/app";
import "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";
import useSession from "./useSession";

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const result = await firebase.auth().signInWithPopup(provider);

  // @ts-expect-error (bad typings)
  const accessToken = result.credential?.accessToken as string;
  const user = result.user;

  return {
    accessToken,
    user,
  };
}

async function _signOut() {
  return firebase.auth().signOut();
}

export default function useAuth() {
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useSession();

  useEffect(() => {
    const callback = (state: User | null) => {
      setCurrentUser(state);
    };
    firebase.auth().onAuthStateChanged(callback);
  }, [setCurrentUser]);

  const withGoogle = useCallback(async () => {
    try {
      setIsSigning(true);
      const result = await signInWithGoogle();
      setIsSigning(false);
      return result;
    } catch (e) {
      console.log(e);
      setIsSigning(false);
      setError(e.message);
      throw e;
    }
  }, []);

  return {
    withGoogle,
    signOut: _signOut,
    isSigning,
    error,
  };
}
