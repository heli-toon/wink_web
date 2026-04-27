import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNav } from "./MobileNav";

export const AppLayout = () => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full bg-gradient-subtle">
      <div className="hidden md:block"><AppSidebar /></div>
      <div className="flex-1 flex min-w-0 flex-col">
        <AppHeader />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
        <MobileNav />
      </div>
    </div>
  </SidebarProvider>
);
