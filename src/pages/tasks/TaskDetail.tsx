import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatPrice, initials, timeAgo, TASK_CATEGORIES } from "@/lib/format";
import { MapPin, Globe2, Star, Loader2, MessageSquare, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string; title: string; description: string; price: number; currency: string;
  type: "physical" | "digital"; category: string; location_label: string | null;
  status: string; created_at: string; posted_by: string; accepted_by: string | null;
}
interface Profile { id: string; display_name: string | null; avatar_url: string | null; average_rating: number | null; review_count: number | null; }
interface Req { id: string; requester_id: string; message: string | null; proposed_price: number | null; status: string; created_at: string; profiles?: Profile | null; }

export default function TaskDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [poster, setPoster] = useState<Profile | null>(null);
  const [requests, setRequests] = useState<Req[]>([]);
  const [myReq, setMyReq] = useState<Req | null>(null);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    if (!id) return;
    const { data: t } = await supabase.from("tasks").select("*").eq("id", id).maybeSingle();
    if (!t) { setTask(null); return; }
    setTask(t as Task);
    const { data: p } = await supabase.from("profiles").select("id,display_name,avatar_url,average_rating,review_count").eq("id", t.posted_by).maybeSingle();
    setPoster(p as Profile);
    const { data: r } = await supabase.from("task_requests").select("*, profiles:requester_id(id,display_name,avatar_url,average_rating,review_count)").eq("task_id", id).order("created_at", { ascending: false });
    const reqs = (r ?? []) as Req[];
    setRequests(reqs);
    setMyReq(reqs.find((x) => x.requester_id === user?.id) ?? null);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id, user?.id]);

  const isOwner = task && user && task.posted_by === user.id;

  const sendRequest = async () => {
    if (!user || !task) { nav("/auth/sign-in"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("task_requests").insert({ task_id: task.id, requester_id: user.id, message: msg || null });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Request sent");
    setMsg("");
    load();
  };

  const decide = async (req: Req, accept: boolean) => {
    if (!task) return;
    const { error } = await supabase.from("task_requests").update({ status: accept ? "accepted" : "rejected" }).eq("id", req.id);
    if (error) return toast.error(error.message);
    if (accept) {
      // create conversation + flip task
      const { data: conv } = await supabase.from("conversations").insert({
        task_id: task.id, poster_id: task.posted_by, worker_id: req.requester_id,
      }).select("id").single();
      await supabase.from("tasks").update({ status: "in_progress", accepted_by: req.requester_id, accepted_request_id: req.id }).eq("id", task.id);
      toast.success("Accepted — chat opened");
      if (conv) nav(`/messages/${conv.id}`); else load();
      return;
    }
    toast.success("Request rejected");
    load();
  };

  const markComplete = async () => {
    if (!task) return;
    const { error } = await supabase.from("tasks").update({ status: "completed" }).eq("id", task.id);
    if (error) return toast.error(error.message);
    toast.success("Task marked complete — leave a review");
    load();
  };

  if (task === null) return <div className="p-8"><Skeleton className="h-64 rounded-2xl" /></div>;

  const cat = TASK_CATEGORIES.find((c) => c.id === task.category)?.label ?? task.category;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary" className="rounded-full">{cat}</Badge>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                {task.type === "physical" ? <><MapPin className="h-3 w-3" /> {task.location_label || "Local"}</> : <><Globe2 className="h-3 w-3" /> Remote</>}
              </span>
              <span className="text-muted-foreground">· {timeAgo(task.created_at)}</span>
              <Badge variant="outline" className="ml-auto capitalize">{task.status.replace("_", " ")}</Badge>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold">{task.title}</h1>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">{task.description}</p>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Budget</div>
                <div className="font-display text-3xl font-bold">{formatPrice(Number(task.price), task.currency)}</div>
              </div>
              {isOwner && task.status === "in_progress" && (
                <Button onClick={markComplete}><Check className="h-4 w-4" /> Mark complete</Button>
              )}
            </div>
          </div>

          {/* Requests / Apply panel */}
          {isOwner ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold">Requests ({requests.length})</h2>
              <div className="mt-4 space-y-3">
                {requests.length === 0 && <p className="text-sm text-muted-foreground">No requests yet.</p>}
                {requests.map((r) => (
                  <div key={r.id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={r.profiles?.avatar_url ?? undefined} /><AvatarFallback>{initials(r.profiles?.display_name)}</AvatarFallback></Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link to={`/u/${r.profiles?.id}`} className="font-semibold hover:underline">{r.profiles?.display_name ?? "User"}</Link>
                        {!!r.profiles?.average_rating && <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-accent text-accent" /> {Number(r.profiles.average_rating).toFixed(1)}</span>}
                        <Badge variant={r.status === "accepted" ? "default" : r.status === "rejected" ? "outline" : "secondary"} className="ml-auto capitalize">{r.status}</Badge>
                      </div>
                      {r.message && <p className="mt-1 text-sm text-muted-foreground">{r.message}</p>}
                      {r.status === "pending" && task.status === "open" && (
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={() => decide(r, true)}><Check className="h-4 w-4" /> Accept</Button>
                          <Button size="sm" variant="outline" onClick={() => decide(r, false)}><X className="h-4 w-4" /> Reject</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : task.status === "open" ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold">Send a request</h2>
              {myReq ? (
                <p className="mt-2 text-sm text-muted-foreground">You've already requested this task — status: <span className="font-semibold capitalize text-foreground">{myReq.status}</span>.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  <Textarea placeholder="Why are you a great fit? (optional)" value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} />
                  <Button onClick={sendRequest} disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />} <MessageSquare className="h-4 w-4" /> Send request
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Posted by</div>
            <Link to={`/u/${poster?.id}`} className="mt-3 flex items-center gap-3">
              <Avatar className="h-12 w-12"><AvatarImage src={poster?.avatar_url ?? undefined} /><AvatarFallback>{initials(poster?.display_name)}</AvatarFallback></Avatar>
              <div>
                <div className="font-semibold">{poster?.display_name ?? "User"}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-accent text-accent" /> {Number(poster?.average_rating ?? 0).toFixed(1)} · {poster?.review_count ?? 0} reviews
                </div>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
