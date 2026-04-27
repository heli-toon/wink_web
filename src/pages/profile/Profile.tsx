import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { initials, timeAgo } from "@/lib/format";
import { Star, Edit3, Check } from "lucide-react";
import { toast } from "sonner";

interface Profile { id: string; display_name: string | null; username: string | null; avatar_url: string | null; bio: string | null; location_label: string | null; average_rating: number | null; review_count: number | null; }
interface Review { id: string; rating: number; comment: string | null; created_at: string; reviewer_id: string; reviewer?: { display_name: string | null; avatar_url: string | null } | null; }

export default function Profile() {
  const { userId } = useParams();
  const { user, profile: me, setProfile } = useAuth();
  const id = userId ?? user?.id ?? null;
  const isMe = !!user && id === user.id;
  const [p, setP] = useState<Profile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ display_name: "", bio: "", location_label: "" });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
      setP(data as Profile);
      if (data) setForm({ display_name: data.display_name ?? "", bio: data.bio ?? "", location_label: data.location_label ?? "" });
      const { data: rv } = await supabase.from("reviews").select("*, reviewer:reviewer_id(display_name,avatar_url)").eq("reviewee_id", id).order("created_at", { ascending: false }).limit(20);
      setReviews((rv ?? []) as any);
    })();
  }, [id]);

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(form).eq("id", user.id);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
    setP((prev) => prev ? { ...prev, ...form } : prev);
    if (me) setProfile({ ...me, display_name: form.display_name });
    setEditing(false);
  };

  if (!p) return <div className="p-8"><Skeleton className="h-48 rounded-2xl" /></div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20"><AvatarImage src={p.avatar_url ?? undefined} /><AvatarFallback className="text-xl">{initials(p.display_name)}</AvatarFallback></Avatar>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold">{p.display_name ?? "User"}</h1>
            <p className="text-sm text-muted-foreground">@{p.username ?? "user"}{p.location_label ? ` · ${p.location_label}` : ""}</p>
            <div className="mt-1 inline-flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" /> {Number(p.average_rating ?? 0).toFixed(1)}
              <span className="text-muted-foreground">({p.review_count ?? 0} reviews)</span>
            </div>
          </div>
          {isMe && (
            <Button variant={editing ? "default" : "outline"} onClick={() => editing ? save() : setEditing(true)}>
              {editing ? <><Check className="h-4 w-4" /> Save</> : <><Edit3 className="h-4 w-4" /> Edit</>}
            </Button>
          )}
        </div>

        {editing ? (
          <div className="mt-6 grid gap-3">
            <div><Label>Display name</Label><Input value={form.display_name} onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))} /></div>
            <div><Label>Location</Label><Input value={form.location_label} onChange={(e) => setForm((f) => ({ ...f, location_label: e.target.value }))} /></div>
            <div><Label>Bio</Label><Textarea rows={4} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} /></div>
          </div>
        ) : (
          p.bio && <p className="mt-5 whitespace-pre-wrap text-sm text-muted-foreground">{p.bio}</p>
        )}
      </div>

      <h2 className="mt-8 font-display text-xl font-bold">Reviews</h2>
      <div className="mt-3 space-y-3">
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8"><AvatarImage src={r.reviewer?.avatar_url ?? undefined} /><AvatarFallback>{initials(r.reviewer?.display_name)}</AvatarFallback></Avatar>
              <Link to={`/u/${r.reviewer_id}`} className="font-semibold hover:underline">{r.reviewer?.display_name ?? "User"}</Link>
              <span className="text-xs text-muted-foreground">{timeAgo(r.created_at)}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-accent text-accent" /> {r.rating}</span>
            </div>
            {r.comment && <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
