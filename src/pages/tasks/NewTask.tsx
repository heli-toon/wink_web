import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/store/auth";
import { PageHeader } from "@/components/wink/PageHeader";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TASK_CATEGORIES } from "@/lib/format";
import { toast } from "sonner";
import { Loader2, MapPin, Globe2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(5, "Min 5 characters").max(120),
  description: z.string().min(20, "Add a bit more detail (20+ chars)"),
  category: z.string().min(1),
  type: z.enum(["physical", "digital"]),
  price: z.coerce.number().min(0),
  location_label: z.string().optional(),
  radius_km: z.coerce.number().min(0.5).max(50).optional(),
});
type FormVals = z.infer<typeof schema>;

export default function NewTask() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", category: "errand", type: "physical", price: 1000, radius_km: 5, location_label: "" },
  });
  const type = form.watch("type");

  const onSubmit = async (vals: FormVals) => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase.from("tasks").insert({
      posted_by: user.id,
      title: vals.title,
      description: vals.description,
      category: vals.category,
      type: vals.type,
      price: vals.price,
      currency: "GHS",
      location_label: vals.type === "physical" ? vals.location_label || null : null,
      radius_km: vals.type === "physical" ? vals.radius_km ?? 5 : null,
    }).select("id").single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Task posted");
    nav(`/tasks/${data.id}`);
  };

  return (
    <div>
      <PageHeader title="Post a task" subtitle="Describe what you need and set your price." />
      <div className="mx-auto max-w-2xl px-4 pb-16 md:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g. Help me move a couch" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={5} placeholder="Share the details, deadlines, and what success looks like." {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{TASK_CATEGORIES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Your price (GHS)</FormLabel><FormControl><Input type="number" min={0} step={5} {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem><FormLabel>Task type</FormLabel>
                <FormControl>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="grid gap-3 md:grid-cols-2">
                    {[
                      { v: "physical", t: "Physical", d: "In-person · within a radius", icon: MapPin },
                      { v: "digital", t: "Digital", d: "Remote · global reach", icon: Globe2 },
                    ].map((o) => (
                      <Label key={o.v} htmlFor={o.v} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-base ${field.value === o.v ? "border-primary bg-primary/5" : "border-border"}`}>
                        <RadioGroupItem id={o.v} value={o.v} />
                        <o.icon className="h-5 w-5 text-primary" />
                        <div><div className="font-semibold">{o.t}</div><div className="text-xs text-muted-foreground">{o.d}</div></div>
                      </Label>
                    ))}
                  </RadioGroup>
                </FormControl><FormMessage />
              </FormItem>
            )}/>
            {type === "physical" && (
              <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
                <FormField control={form.control} name="location_label" render={({ field }) => (
                  <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g. Lekki Phase 1" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="radius_km" render={({ field }) => (
                  <FormItem><FormLabel>Radius (km)</FormLabel><FormControl><Input type="number" step={0.5} min={0.5} max={50} {...field} /></FormControl>
                    <FormDescription>Default is 5km — only people nearby will see this task.</FormDescription><FormMessage /></FormItem>
                )}/>
              </div>
            )}
            <Button type="submit" size="lg" disabled={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Post task
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
