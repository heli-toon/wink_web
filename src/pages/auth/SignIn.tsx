import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type FormVals = z.infer<typeof schema>;

export default function SignIn() {
  const nav = useNavigate();
  const loc = useLocation();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormVals>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  const onSubmit = async (vals: FormVals) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(vals);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    const to = (loc.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";
    nav(to, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="Wink" className="h-9 w-9" />
          <span className="font-display text-2xl font-bold">Wink</span>
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-floating">
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue posting and taking tasks.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" autoComplete="current-password" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Wink? <Link to="/auth/sign-up" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
