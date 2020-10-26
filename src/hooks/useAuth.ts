import * as firebase from "firebase/app";
import "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";
import useSession from "./useSession";

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase.auth().signInWithRedirect(provider);
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
      await signInWithGoogle();
      setIsSigning(false);
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
