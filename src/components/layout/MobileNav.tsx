import { Compass, PlusSquare, Home, MessagesSquare, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { url: "/tasks", icon: Compass, label: "Browse" },
  { url: "/dashboard", icon: Home, label: "Home" },
  { url: "/tasks/new", icon: PlusSquare, label: "Post", featured: true },
  { url: "/messages", icon: MessagesSquare, label: "Chat" },
  { url: "/me", icon: User, label: "Me" },
];

export const MobileNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden" aria-label="Primary">
    <ul className="grid grid-cols-5">
      {items.map((i) => (
        <li key={i.url}>
          <NavLink
            to={i.url}
            end={i.url === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] transition-base",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {i.featured ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-elegant -mt-3">
                <i.icon className="h-4 w-4 text-primary-foreground" />
              </span>
            ) : (
              <i.icon className="h-5 w-5" />
            )}
            <span>{i.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
