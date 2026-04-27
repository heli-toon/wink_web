import { Link } from "react-router-dom";
import { MapPin, Globe2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPrice, initials, timeAgo, TASK_CATEGORIES } from "@/lib/format";

export interface TaskCardData {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: "physical" | "digital";
  category: string;
  location_label: string | null;
  status: string;
  created_at: string;
  poster?: { display_name: string | null; avatar_url: string | null; average_rating?: number | null } | null;
}

export const TaskCard = ({ t }: { t: TaskCardData }) => {
  const cat = TASK_CATEGORIES.find((c) => c.id === t.category)?.label ?? t.category;
  return (
    <Link
      to={`/tasks/${t.id}`}
      className="group block rounded-2xl border border-border bg-card p-5 shadow-sm transition-spring hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="secondary" className="rounded-full">{cat}</Badge>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              {t.type === "physical" ? <><MapPin className="h-3 w-3" /> {t.location_label || "Local"}</> : <><Globe2 className="h-3 w-3" /> Remote</>}
            </span>
            <span className="text-muted-foreground">· {timeAgo(t.created_at)}</span>
          </div>
          <h3 className="mt-2 line-clamp-1 font-display text-lg font-semibold group-hover:text-primary">{t.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-xl font-bold">{formatPrice(Number(t.price), t.currency)}</div>
          {t.status !== "open" && <Badge variant="outline" className="mt-1 capitalize">{t.status.replace("_", " ")}</Badge>}
        </div>
      </div>
      {t.poster && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7"><AvatarImage src={t.poster.avatar_url ?? undefined} /><AvatarFallback className="text-[10px]">{initials(t.poster.display_name)}</AvatarFallback></Avatar>
            <span className="text-sm text-muted-foreground">{t.poster.display_name ?? "User"}</span>
          </div>
          {!!t.poster.average_rating && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-accent text-accent" /> {Number(t.poster.average_rating).toFixed(1)}</span>
          )}
        </div>
      )}
    </Link>
  );
};
