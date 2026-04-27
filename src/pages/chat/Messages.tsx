import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";
import { PageHeader } from "@/components/wink/PageHeader";
import { EmptyState } from "@/components/wink/EmptyState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { initials, timeAgo } from "@/lib/format";
import { Send, MessagesSquare, ArrowLeft } from "lucide-react";

interface Conv { id: string; task_id: string; poster_id: string; worker_id: string; last_message_at: string;
  task?: { title: string } | null; other?: { id: string; display_name: string | null; avatar_url: string | null } | null; }
interface Msg { id: string; conversation_id: string; sender_id: string; body: string; created_at: string; }

export default function Messages() {
  const { user } = useAuth();
  const { conversationId } = useParams();
  const nav = useNavigate();
  const [convs, setConvs] = useState<Conv[] | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("conversations")
        .select("id, task_id, poster_id, worker_id, last_message_at, tasks(title)")
        .or(`poster_id.eq.${user.id},worker_id.eq.${user.id}`)
        .order("last_message_at", { ascending: false });
      const list = (data ?? []) as any[];
      const ids = Array.from(new Set(list.map((c) => (c.poster_id === user.id ? c.worker_id : c.poster_id))));
      const { data: profs } = await supabase.from("profiles").select("id,display_name,avatar_url").in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
      const profMap = new Map((profs ?? []).map((p: any) => [p.id, p]));
      setConvs(list.map((c: any) => ({
        ...c, task: c.tasks,
        other: profMap.get(c.poster_id === user.id ? c.worker_id : c.poster_id) ?? null,
      })));
    })();
  }, [user]);

  useEffect(() => {
    if (!conversationId) { setMessages([]); return; }
    let active = true;
    (async () => {
      const { data } = await supabase.from("messages").select("*").eq("conversation_id", conversationId).order("created_at");
      if (active) setMessages((data ?? []) as Msg[]);
    })();
    const channel = supabase
      .channel(`conv:${conversationId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => setMessages((m) => [...m, payload.new as Msg]))
      .subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, [conversationId]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !conversationId || !body.trim()) return;
    const text = body.trim();
    setBody("");
    // optimistic
    const optimistic: Msg = { id: `tmp-${Date.now()}`, conversation_id: conversationId, sender_id: user.id, body: text, created_at: new Date().toISOString() };
    setMessages((m) => [...m, optimistic]);
    const { error } = await supabase.from("messages").insert({ conversation_id: conversationId, sender_id: user.id, body: text });
    if (error) {
      setMessages((m) => m.filter((x) => x.id !== optimistic.id));
      setBody(text);
    }
  };

  const active = convs?.find((c) => c.id === conversationId) ?? null;

  return (
    <div>
      <PageHeader title="Messages" subtitle="Chat with people on your tasks." />
      <div className="px-4 pb-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          {/* conv list */}
          <div className={`rounded-2xl border border-border bg-card ${conversationId ? "hidden md:block" : ""}`}>
            <div className="border-b border-border p-3 text-sm font-semibold">Conversations</div>
            <div className="max-h-[70vh] overflow-y-auto">
              {convs === null && <div className="space-y-2 p-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-14 rounded-md"/>)}</div>}
              {convs?.length === 0 && <div className="p-3"><EmptyState icon={MessagesSquare} title="No conversations" body="They'll appear once a request is accepted." /></div>}
              {convs?.map((c) => (
                <Link key={c.id} to={`/messages/${c.id}`} className={`flex items-center gap-3 border-b border-border p-3 transition-base hover:bg-muted/50 ${c.id === conversationId ? "bg-primary/5" : ""}`}>
                  <Avatar className="h-10 w-10"><AvatarImage src={c.other?.avatar_url ?? undefined} /><AvatarFallback>{initials(c.other?.display_name)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{c.other?.display_name ?? "User"}</div>
                    <div className="truncate text-xs text-muted-foreground">{c.task?.title}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{timeAgo(c.last_message_at)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* thread */}
          <div className={`flex h-[75vh] flex-col rounded-2xl border border-border bg-card ${!conversationId ? "hidden md:flex" : "flex"}`}>
            {!conversationId ? (
              <div className="m-auto p-6 text-center text-muted-foreground">Select a conversation</div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-border p-3">
                  <Button size="icon" variant="ghost" className="md:hidden" onClick={() => nav("/messages")}><ArrowLeft className="h-4 w-4" /></Button>
                  <Avatar className="h-9 w-9"><AvatarImage src={active?.other?.avatar_url ?? undefined} /><AvatarFallback>{initials(active?.other?.display_name)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{active?.other?.display_name ?? "User"}</div>
                    {active?.task && <Link to={`/tasks/${active.task_id}`} className="truncate text-xs text-muted-foreground hover:text-primary">Task: {active.task.title}</Link>}
                  </div>
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto p-4">
                  {messages.map((m) => {
                    const mine = m.sender_id === user?.id;
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                          {m.body}
                          <div className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{timeAgo(m.created_at)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
                  <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Type a message" />
                  <Button type="submit" size="icon" aria-label="Send"><Send className="h-4 w-4" /></Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
