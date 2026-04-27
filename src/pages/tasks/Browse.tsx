import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TaskCard, type TaskCardData } from "@/components/wink/TaskCard";
import { PageHeader } from "@/components/wink/PageHeader";
import { EmptyState } from "@/components/wink/EmptyState";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Compass } from "lucide-react";
import { TASK_CATEGORIES } from "@/lib/format";

export default function Browse() {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const [tasks, setTasks] = useState<TaskCardData[] | null>(null);
  const [q, setQ] = useState(params.get("q") ?? "");

  const category = params.get("category") ?? "all";
  const type = params.get("type") ?? "all";

  useEffect(() => {
    let active = true;
    setTasks(null);
    (async () => {
      let qb = supabase
        .from("tasks")
        .select("id,title,description,price,currency,type,category,location_label,status,created_at, posted_by, profiles:posted_by(display_name,avatar_url,average_rating)")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(50);
      if (category !== "all") qb = qb.eq("category", category);
      if (type !== "all") qb = qb.eq("type", type as "physical" | "digital");
      const { data, error } = await qb;
      if (!active) return;
      if (error) { setTasks([]); return; }
      const mapped = (data ?? []).map((d: any) => ({ ...d, poster: d.profiles })) as TaskCardData[];
      setTasks(mapped);
    })();
    return () => { active = false; };
  }, [category, type]);

  const filtered = useMemo(() => {
    if (!tasks) return null;
    const s = q.trim().toLowerCase();
    if (!s) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s));
  }, [tasks, q]);

  const setFilter = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v === "all") next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  return (
    <div>
      <PageHeader
        title="Browse tasks"
        subtitle="Find work that fits your skills, schedule, and price."
        action={<Button onClick={() => nav("/tasks/new")}><Plus className="h-4 w-4" /> Post a task</Button>}
      />
      <div className="px-4 md:px-8">
        <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tasks..." className="pl-9" />
          </div>
          <Select value={category} onValueChange={(v) => setFilter("category", v)}>
            <SelectTrigger className="w-[170px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {TASK_CATEGORIES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={(v) => setFilter("type", v)}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 grid gap-3 pb-10 md:grid-cols-2">
          {filtered === null && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
          {filtered?.length === 0 && (
            <div className="md:col-span-2">
              <EmptyState icon={Compass} title="No tasks here yet" body="Try a different filter, or be the first to post." action={{ label: "Post a task", onClick: () => nav("/tasks/new") }} />
            </div>
          )}
          {filtered?.map((t) => <TaskCard key={t.id} t={t} />)}
        </div>
      </div>
    </div>
  );
}
