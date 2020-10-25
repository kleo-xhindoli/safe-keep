import { useContext } from "react";
import { NotificationContext } from "../components/providers/NotificationProvider";

export default function useNotification() {
  return useContext(NotificationContext);
}
