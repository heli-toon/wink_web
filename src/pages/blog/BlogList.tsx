import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/lib/format";
import { ArrowRight } from "lucide-react";

interface Post { id: string; slug: string; title: string; excerpt: string | null; cover_url: string | null; published_at: string | null; }

export default function BlogList() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("id,slug,title,excerpt,cover_url,published_at").eq("published", true).order("published_at", { ascending: false });
      setPosts((data ?? []) as Post[]);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><img src="/logo.svg" alt="Wink" className="h-8 w-8" /><span className="font-display text-xl font-bold">Wink Blog</span></Link>
          <Link to="/tasks" className="text-sm text-muted-foreground hover:text-foreground">Browse tasks</Link>
        </div>
      </header>
      <div className="container py-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Stories from the marketplace</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Tips, guides, and ideas to help you post better tasks and earn more.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts === null && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          {posts?.length === 0 && <p className="text-muted-foreground">No posts yet.</p>}
          {posts?.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card transition-spring hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/9] bg-gradient-primary" style={p.cover_url ? { backgroundImage: `url(${p.cover_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined} />
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{p.published_at ? timeAgo(p.published_at) : ""}</div>
                <h2 className="mt-1 font-display text-xl font-bold group-hover:text-primary">{p.title}</h2>
                {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
