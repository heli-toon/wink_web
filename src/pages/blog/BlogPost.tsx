import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Post { id: string; title: string; content: string; cover_url: string | null; published_at: string | null; excerpt: string | null; }

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("id,title,content,cover_url,published_at,excerpt").eq("slug", slug).eq("published", true).maybeSingle();
      setPost((data as Post) ?? null);
    })();
  }, [slug]);

  if (post === undefined) return <div className="container py-10"><Skeleton className="h-96 rounded-2xl" /></div>;
  if (post === null) return <div className="container py-20 text-center"><h1 className="font-display text-3xl font-bold">Post not found</h1><Link to="/blog" className="mt-4 inline-block text-primary">← Back to blog</Link></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border"><div className="container flex h-16 items-center justify-between">
        <Link to="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Blog</Link>
        <Link to="/" className="flex items-center gap-2"><div className="h-7 w-7 rounded-md bg-gradient-primary flex items-center justify-center"><Sparkles className="h-3 w-3 text-primary-foreground" /></div><span className="font-display font-bold">Wink</span></Link>
      </div></header>
      <article className="container max-w-3xl py-12">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{post.title}</h1>
        {post.cover_url && <img src={post.cover_url} alt={post.title} loading="lazy" className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />}
        <div className="prose prose-lg mt-8 max-w-none whitespace-pre-wrap text-foreground">{post.content}</div>
      </article>
    </div>
  );
}
