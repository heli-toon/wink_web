import { Bell, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/store/auth";
import { supabase } from "@/integrations/supabase/client";
import { initials } from "@/lib/format";
import { useNavigate, NavLink } from "react-router-dom";

export const AppHeader = () => {
  const { profile, user, isAdmin } = useAuth();
  const nav = useNavigate();
  const signOut = async () => { await supabase.auth.signOut(); nav("/"); };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur">
      <SidebarTrigger className="hidden md:inline-flex" />
      <div className="md:hidden flex items-center gap-2">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Wink" className="h-7 w-7" />
          <span className="font-display text-lg font-bold">Wink</span>
        </NavLink>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="h-5 w-5" /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0" aria-label="Account">
              <Avatar className="h-9 w-9">
                <AvatarImage src={profile?.avatar_url ?? undefined} />
                <AvatarFallback>{initials(profile?.display_name ?? user?.email)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-semibold">{profile?.display_name ?? "You"}</div>
              <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => nav("/me")}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => nav("/dashboard")}>Dashboard</DropdownMenuItem>
            {isAdmin && <DropdownMenuItem onClick={() => nav("/admin")}>Admin</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
