import { useAuth } from "@/components/AuthProvider";

/** Back-compat wrapper around the global AuthProvider context. */
export function useSession() {
  const { session, user, loading } = useAuth();
  return { session, user, loading };
}