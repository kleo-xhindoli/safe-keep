import * as firebase from "firebase/app";
import "firebase/database";
import { Safe } from "../../types/safe";
import { useList } from "react-firebase-hooks/database";
import { useComputed } from "../utils";

export function useSafes() {
  const safesRef = firebase.database().ref("safes");
  const [snapshot, loading, error] = useList(safesRef);

  const safes: Safe[] | undefined = useComputed(() => {
    return snapshot?.map((el) => ({ id: el.key, ...el.val() }));
  }, [snapshot]);

  return [safes, loading, error] as const;
}
