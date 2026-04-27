import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

const schema = z.object({
  display_name: z.string().min(2, "At least 2 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Min 6 characters"),
});
type FormVals = z.infer<typeof schema>;

export default function SignUp() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormVals>({ resolver: zodResolver(schema), defaultValues: { display_name: "", email: "", password: "" } });

  const onSubmit = async (vals: FormVals) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: vals.email,
      password: vals.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: vals.display_name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — you're in!");
    nav("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="h-9 w-9 rounded-md bg-gradient-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">Wink</span>
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-floating">
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Post tasks or earn by completing them.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <FormField control={form.control} name="display_name" render={({ field }) => (
                <FormItem><FormLabel>Display name</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" autoComplete="new-password" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create account
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/auth/sign-in" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
