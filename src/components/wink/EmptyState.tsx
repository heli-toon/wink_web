import { Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptyState = ({ icon: Icon = Inbox, title, body, action }: { icon?: LucideIcon; title: string; body?: string; action?: { label: string; onClick: () => void } }) => (
  <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground"><Icon className="h-5 w-5" /></div>
    <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
    {body && <p className="mt-1 text-sm text-muted-foreground">{body}</p>}
    {action && <Button onClick={action.onClick} className="mt-5">{action.label}</Button>}
  </div>
);
