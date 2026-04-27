import { Home, Compass, PlusSquare, MessagesSquare, User, Newspaper, ShieldCheck, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";

const main = [
  { title: "Browse", url: "/tasks", icon: Compass },
  { title: "Post a task", url: "/tasks/new", icon: PlusSquare },
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Messages", url: "/messages", icon: MessagesSquare },
  { title: "Profile", url: "/me", icon: User },
];
const secondary = [{ title: "Blog", url: "/blog", icon: Newspaper }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();

  const linkCls = (active: boolean) =>
    cn(
      "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-base",
      active ? "bg-primary/10 text-primary font-semibold" : "text-sidebar-foreground hover:bg-sidebar-accent"
    );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary shadow-elegant">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display text-xl font-bold tracking-tight">Wink</span>}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={i.url} end={i.url === "/dashboard"} className={({ isActive }) => linkCls(isActive || pathname.startsWith(i.url + "/"))}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{i.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={i.url} className={({ isActive }) => linkCls(isActive)}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{i.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin" className={({ isActive }) => linkCls(isActive)}>
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>Admin</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        {!collapsed && <p className="text-xs text-muted-foreground">Built with care · v0.1</p>}
      </SidebarFooter>
    </Sidebar>
  );
}
