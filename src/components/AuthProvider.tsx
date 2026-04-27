import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setSession, setProfile, setIsAdmin, setLoading, reset } = useAuth();

  useEffect(() => {
    // 1) Listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) { reset(); setLoading(false); return; }
      // defer DB calls
      setTimeout(async () => {
        const [{ data: profile }, { data: roles }] = await Promise.all([
          supabase.from("profiles").select("id, display_name, username, avatar_url").eq("id", session.user.id).maybeSingle(),
          supabase.from("user_roles").select("role").eq("user_id", session.user.id),
        ]);
        setProfile(profile ?? null);
        setIsAdmin(!!roles?.some((r) => r.role === "admin"));
        setLoading(false);
      }, 0);
    });

    // 2) Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) setLoading(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
