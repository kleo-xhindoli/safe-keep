import { useContext } from "react";
import { SessionContext } from "../components/providers/SessionProvider";

export default function useSession() {
  return useContext(SessionContext);
}
