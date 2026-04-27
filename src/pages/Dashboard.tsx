import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";
import { PageHeader } from "@/components/wink/PageHeader";
import { TaskCard, type TaskCardData } from "@/components/wink/TaskCard";
import { EmptyState } from "@/components/wink/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus, ListTodo, Briefcase, Star, Wallet } from "lucide-react";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [posted, setPosted] = useState<TaskCardData[] | null>(null);
  const [working, setWorking] = useState<TaskCardData[] | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const sel = "id,title,description,price,currency,type,category,location_label,status,created_at, posted_by, profiles:posted_by(display_name,avatar_url,average_rating)";
      const [{ data: a }, { data: b }] = await Promise.all([
        supabase.from("tasks").select(sel).eq("posted_by", user.id).order("created_at", { ascending: false }),
        supabase.from("tasks").select(sel).eq("accepted_by", user.id).order("created_at", { ascending: false }),
      ]);
      setPosted(((a ?? []) as any).map((d: any) => ({ ...d, poster: d.profiles })));
      setWorking(((b ?? []) as any).map((d: any) => ({ ...d, poster: d.profiles })));
    })();
  }, [user]);

  return (
    <div>
      <PageHeader
        title={`Hey, ${profile?.display_name?.split(" ")[0] ?? "there"} 👋`}
        subtitle="Your tasks at a glance."
        action={<Button asChild><Link to="/tasks/new"><Plus className="h-4 w-4" /> Post a task</Link></Button>}
      />
      <div className="px-4 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ListTodo, label: "Posted", value: posted?.length ?? "—" },
            { icon: Briefcase, label: "Working on", value: working?.length ?? "—" },
            { icon: Star, label: "Rating", value: "—" },
            { icon: Wallet, label: "Earnings", value: "GH₵0" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-display text-2xl font-bold">{s.value as any}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="posted" className="mt-8">
          <TabsList>
            <TabsTrigger value="posted">Tasks I posted</TabsTrigger>
            <TabsTrigger value="working">Tasks I'm working on</TabsTrigger>
          </TabsList>
          <TabsContent value="posted" className="mt-4 grid gap-3 pb-10 md:grid-cols-2">
            {posted === null && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
            {posted?.length === 0 && <div className="md:col-span-2"><EmptyState icon={ListTodo} title="No tasks yet" body="Post your first task in seconds." action={{ label: "Post a task", onClick: () => (window.location.href = "/tasks/new") }} /></div>}
            {posted?.map((t) => <TaskCard key={t.id} t={t} />)}
          </TabsContent>
          <TabsContent value="working" className="mt-4 grid gap-3 pb-10 md:grid-cols-2">
            {working === null && Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
            {working?.length === 0 && <div className="md:col-span-2"><EmptyState icon={Briefcase} title="No active work" body="Browse the feed and send your first request." action={{ label: "Browse tasks", onClick: () => (window.location.href = "/tasks") }} /></div>}
            {working?.map((t) => <TaskCard key={t.id} t={t} />)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
