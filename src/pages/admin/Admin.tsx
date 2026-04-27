import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/wink/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Admin() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [posts, setPosts] = useState<any[] | null>(null);
  const [editing, setEditing] = useState<any>({ slug: "", title: "", excerpt: "", content: "", cover_url: "", published: false });

  const refresh = async () => {
    const [u, t, p] = await Promise.all([
      supabase.from("profiles").select("id,display_name,username,average_rating,review_count,created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("tasks").select("id,title,status,price,created_at,posted_by").order("created_at", { ascending: false }).limit(50),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
    ]);
    setUsers(u.data ?? []);
    setTasks(t.data ?? []);
    setPosts(p.data ?? []);
  };
  useEffect(() => { refresh(); }, []);

  const savePost = async () => {
    const payload = { ...editing, slug: editing.slug || slugify(editing.title), published_at: editing.published ? new Date().toISOString() : null };
    if (!payload.title || !payload.content) return toast.error("Title and content required");
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing({ slug: "", title: "", excerpt: "", content: "", cover_url: "", published: false });
    refresh();
  };

  const delPost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refresh();
  };

  return (
    <div>
      <PageHeader title="Admin" subtitle="Manage users, tasks, and blog content." />
      <div className="px-4 pb-12 md:px-8">
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4 rounded-2xl border border-border bg-card">
            {users === null ? <Skeleton className="m-4 h-40" /> : (
              <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Username</TableHead><TableHead>Rating</TableHead><TableHead>Joined</TableHead></TableRow></TableHeader>
                <TableBody>{users.map((u) => <TableRow key={u.id}><TableCell>{u.display_name}</TableCell><TableCell>@{u.username}</TableCell><TableCell>{Number(u.average_rating ?? 0).toFixed(1)} ({u.review_count})</TableCell><TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell></TableRow>)}</TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="mt-4 rounded-2xl border border-border bg-card">
            {tasks === null ? <Skeleton className="m-4 h-40" /> : (
              <Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Price</TableHead><TableHead>Created</TableHead></TableRow></TableHeader>
                <TableBody>{tasks.map((t) => <TableRow key={t.id}><TableCell className="max-w-xs truncate">{t.title}</TableCell><TableCell className="capitalize">{t.status}</TableCell><TableCell>GH₵{Number(t.price).toLocaleString()}</TableCell><TableCell>{new Date(t.created_at).toLocaleDateString()}</TableCell></TableRow>)}</TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="blog" className="mt-4 grid gap-4 md:grid-cols-[1fr_360px]">
            <div className="rounded-2xl border border-border bg-card">
              {posts === null ? <Skeleton className="m-4 h-40" /> : (
                <Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Slug</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
                  <TableBody>{posts.map((p) => <TableRow key={p.id}>
                    <TableCell className="max-w-xs truncate">{p.title}</TableCell>
                    <TableCell className="text-muted-foreground">/{p.slug}</TableCell>
                    <TableCell>{p.published ? "Published" : "Draft"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => delPost(p.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>)}</TableBody>
                </Table>
              )}
            </div>
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <h3 className="font-display text-lg font-bold">{editing.id ? "Edit post" : "New post"}</h3>
              <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated" /></div>
              <div><Label>Excerpt</Label><Textarea rows={2} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
              <div><Label>Cover URL</Label><Input value={editing.cover_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} /></div>
              <div><Label>Content</Label><Textarea rows={8} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
              <div className="flex items-center gap-2"><Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
              <div className="flex gap-2">
                <Button onClick={savePost} className="flex-1">{editing.id ? "Update" : "Create"}</Button>
                {editing.id && <Button variant="outline" onClick={() => setEditing({ slug: "", title: "", excerpt: "", content: "", cover_url: "", published: false })}>Clear</Button>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
