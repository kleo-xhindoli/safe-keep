import * as firebase from "firebase/app";
import "firebase/auth";
import { useCallback, useState } from "react";

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase.auth().signInWithRedirect(provider);
}

async function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("email");
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  await firebase.auth().signInWithRedirect(provider);
}

async function _signOut() {
  return firebase.auth().signOut();
}

export default function useAuth() {
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState("");

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

  const withGithub = useCallback(async () => {
    try {
      setIsSigning(true);
      await signInWithGithub();
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
    withGithub,
    signOut: _signOut,
    isSigning,
    error,
  };
}
