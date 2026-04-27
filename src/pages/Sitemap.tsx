import { Link } from "react-router-dom";
import { Globe, Lock, ShieldCheck, FileQuestion } from "lucide-react";

interface RouteGroup {
  title: string;
  icon: React.ElementType;
  routes: { path: string; label: string }[];
}

const groups: RouteGroup[] = [
  {
    title: "Public",
    icon: Globe,
    routes: [
      { path: "/", label: "Landing" },
      { path: "/auth/sign-in", label: "Sign In" },
      { path: "/auth/sign-up", label: "Sign Up" },
      { path: "/blog", label: "Blog" },
      { path: "/blog/:slug", label: "Blog Post" },
      { path: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    title: "Protected",
    icon: Lock,
    routes: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/tasks", label: "Browse Tasks" },
      { path: "/tasks/new", label: "New Task" },
      { path: "/tasks/:id", label: "Task Detail" },
      { path: "/messages", label: "Messages" },
      { path: "/messages/:conversationId", label: "Conversation" },
      { path: "/me", label: "My Profile" },
      { path: "/u/:userId", label: "User Profile" },
    ],
  },
  {
    title: "Admin",
    icon: ShieldCheck,
    routes: [{ path: "/admin", label: "Admin Panel" }],
  },
  {
    title: "System",
    icon: FileQuestion,
    routes: [{ path: "*", label: "Not Found" }],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Wink" className="h-8 w-8" />
            <span className="font-display text-xl font-bold">Wink</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to home
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Sitemap</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A complete overview of all pages and routes in the Wink application.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <g.icon className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold">{g.title}</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {g.routes.map((r) => (
                  <li key={r.path}>
                    {r.path.startsWith("/") ? (
                      <Link
                        to={r.path}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-base hover:bg-primary/5 hover:text-primary"
                      >
                        <span>{r.label}</span>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {r.path}
                        </code>
                      </Link>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground">
                        <span>{r.label}</span>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {r.path}
                        </code>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

