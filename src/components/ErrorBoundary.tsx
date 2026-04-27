import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props { children: ReactNode }
interface State { error: Error | null }

const ROUTER_HINTS = [
  "useContext",
  "useNavigate",
  "useLocation",
  "useRoutes",
  "useHref",
  "useParams",
  "useSearchParams",
  "basename",
  "Router",
  "react-router",
];

const isRouterError = (err: Error | null) => {
  if (!err) return false;
  const hay = `${err.name} ${err.message} ${err.stack ?? ""}`;
  return ROUTER_HINTS.some((h) => hay.includes(h));
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  goHome = () => {
    window.location.assign("/");
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const routerIssue = isRouterError(error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-subtle px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-elegant md:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">
            {routerIssue ? "Router misconfiguration" : "Something went wrong"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {routerIssue
              ? "A page tried to use a router hook outside of the app's <BrowserRouter>. This usually means a stale module cache or a duplicate react-router-dom version."
              : "An unexpected error crashed this view. You can try reloading or returning home."}
          </p>

          {routerIssue && (
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <p className="font-semibold">Suggested steps</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
                <li>Hard-refresh the preview (Cmd/Ctrl + Shift + R) to clear the cached module graph.</li>
                <li>Make sure every <code className="font-mono text-xs">Link</code>, <code className="font-mono text-xs">NavLink</code>, and router hook is rendered inside the app's <code className="font-mono text-xs">&lt;BrowserRouter&gt;</code>.</li>
                <li>Check that only one copy of <code className="font-mono text-xs">react-router-dom</code> is installed (no duplicate versions).</li>
                <li>If the error persists, restart the dev server so Vite re-bundles dependencies.</li>
              </ol>
            </div>
          )}

          <details className="mt-5 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">Error details</summary>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words font-mono">
{error.name}: {error.message}
            </pre>
          </details>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={this.reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-base hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" /> Reload page
            </button>
            <button
              onClick={this.goHome}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold transition-base hover:bg-muted"
            >
              <Home className="h-4 w-4" /> Go home
            </button>
          </div>
        </div>
      </div>
    );
  }
}