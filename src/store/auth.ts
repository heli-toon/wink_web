import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: { id: string; display_name: string | null; username: string | null; avatar_url: string | null } | null;
  isAdmin: boolean;
  loading: boolean;
  setSession: (s: Session | null) => void;
  setProfile: (p: AuthState["profile"]) => void;
  setIsAdmin: (b: boolean) => void;
  setLoading: (b: boolean) => void;
  reset: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setProfile: (profile) => set({ profile }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ session: null, user: null, profile: null, isAdmin: false }),
}));
