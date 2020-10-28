import * as firebase from "firebase/app";
import "firebase/auth";
import { useCallback, useState } from "react";
import { useComputed } from "./utils";

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
  const [isGoogleSigning, setIsGoogleSigning] = useState(false);
  const [isGithubSigning, setIsGithubSigning] = useState(false);
  const [error, setError] = useState("");

  const isSigning = useComputed(() => {
    return isGoogleSigning || isGithubSigning;
  }, [isGithubSigning, isGoogleSigning]);

  const withGoogle = useCallback(async () => {
    try {
      setIsGoogleSigning(true);
      await signInWithGoogle();
      setIsGoogleSigning(false);
    } catch (e) {
      console.log(e);
      setIsGoogleSigning(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const withGithub = useCallback(async () => {
    try {
      setIsGithubSigning(true);
      await signInWithGithub();
      setIsGithubSigning(false);
    } catch (e) {
      console.log(e);
      setIsGithubSigning(false);
      setError(e.message);
      throw e;
    }
  }, []);

  return {
    withGoogle,
    withGithub,
    signOut: _signOut,
    isSigning,
    isGoogleSigning,
    isGithubSigning,
    error,
  };
}
