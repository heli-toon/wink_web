import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Globe2, MessageSquare, Star, ArrowRight, ShieldCheck, Wallet, Zap } from "lucide-react";
import { TASK_CATEGORIES } from "@/lib/format";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Wink" className="h-8 w-8" />
            <span className="font-display text-xl font-bold">Wink</span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link to="/tasks" className="text-muted-foreground hover:text-foreground">Browse tasks</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
            <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/auth/sign-in">Sign in</Link></Button>
            <Button asChild><Link to="/auth/sign-up">Get started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container relative grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> A new way to get things done
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Tasks, done <span className="text-gradient">in a wink.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Post any task — from a quick errand around the corner to a full design project anywhere in the world. Set your price. Get matched. Get it done.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="shadow-elegant"><Link to="/auth/sign-up">Post your first task <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/tasks">Browse tasks</Link></Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> Verified profiles</span>
              <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Paystack escrow</span>
              <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> Instant matching</span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative grid gap-3">
              {[
                { icon: MapPin, title: "Pick up dry cleaning", price: "GH₵40", tag: "Errand · 1.2km", color: "bg-primary/10 text-primary" },
                { icon: Globe2, title: "Design a logo for a coffee brand", price: "GH₵650", tag: "Digital · Remote", color: "bg-accent/15 text-accent-foreground" },
                { icon: MessageSquare, title: "Write a 1,200-word blog post", price: "GH₵250", tag: "Digital · Remote", color: "bg-success/10 text-success" },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-elegant transition-spring hover:-translate-y-1 hover:shadow-floating">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color}`}><c.icon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold truncate">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.tag}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold">{c.price}</div>
                      <div className="flex items-center justify-end gap-0.5 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-accent text-accent" /> 4.9</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-card">
        <div className="container py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Anything. Anywhere.</h2>
              <p className="mt-2 text-muted-foreground">Pick a category to get started — physical tasks within 5km, digital tasks worldwide.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:inline-flex"><Link to="/tasks">All tasks <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {TASK_CATEGORIES.map((c) => (
              <Link key={c.id} to={`/tasks?category=${c.id}`} className="group rounded-xl border border-border bg-background px-4 py-5 text-center transition-base hover:border-primary hover:bg-primary/5">
                <div className="text-sm font-semibold">{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container py-20">
        <h2 className="font-display text-center text-3xl font-bold md:text-4xl">How Wink works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">A two-sided marketplace built around trust, speed, and simple money.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", title: "Post or browse", body: "Post a task with your own price, or scroll the feed and find work that fits.", color: "from-primary to-primary-glow" },
            { n: "02", title: "Match & chat", body: "Send a request, accept the right person, and chat in real time to align on details.", color: "from-accent to-warning" },
            { n: "03", title: "Complete & rate", body: "Pay safely with Paystack, mark the task done, and leave a review.", color: "from-success to-primary-glow" },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} font-display text-lg font-bold text-primary-foreground shadow-elegant`}>{s.n}</div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-primary-foreground shadow-floating md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to get something done?</h2>
            <p className="mt-3 text-primary-foreground/90">Free to join. Set your own price. Keep what you earn.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" asChild><Link to="/auth/sign-up">Create free account</Link></Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/tasks">Browse tasks</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Wink" className="h-7 w-7" />
            <span className="font-display text-lg font-bold">Wink</span>
            <span className="text-sm text-muted-foreground">— WorkLink, the task marketplace</span>
          </div>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <Link to="/blog" className="hover:text-foreground">Blog</Link>
            <Link to="/tasks" className="hover:text-foreground">Tasks</Link>
            <Link to="/auth/sign-up" className="hover:text-foreground">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
