import { useParams } from "react-router-dom";

export default function useCurrentSafeId() {
  const { safeId } = useParams<{ safeId?: string }>();
  return safeId;
}
