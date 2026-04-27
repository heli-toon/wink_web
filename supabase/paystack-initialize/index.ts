// Initialize a Paystack transaction. Auth required.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const PAYSTACK_SECRET = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!PAYSTACK_SECRET) return json({ error: "PAYSTACK_SECRET_KEY not configured" }, 500);

    const auth = req.headers.get("Authorization");
    if (!auth) return json({ error: "Unauthorized" }, 401);

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: auth } },
    });
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const { task_id, amount, email } = body as { task_id?: string; amount?: number; email?: string };
    if (!task_id || !amount || amount <= 0 || !email) return json({ error: "task_id, amount, email required" }, 400);

    // Verify task exists & user is poster (the payer)
    const { data: task } = await sb.from("tasks").select("id, posted_by, accepted_by, price, status").eq("id", task_id).maybeSingle();
    if (!task) return json({ error: "Task not found" }, 404);
    if (task.posted_by !== user.id) return json({ error: "Only the task poster can pay" }, 403);

    const reference = `wink_${task_id.slice(0, 8)}_${Date.now()}`;
    const r = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email, reference,
        amount: Math.round(amount * 100), // kobo
        currency: "NGN",
        metadata: { task_id, payer_id: user.id, payee_id: task.accepted_by },
        callback_url: `${new URL(req.url).origin}/dashboard`,
      }),
    });
    const data = await r.json();
    if (!r.ok || !data.status) return json({ error: data.message || "Paystack init failed" }, 400);

    // Insert pending transaction (RLS allows payer_id = auth.uid())
    await sb.from("transactions").insert({
      task_id, payer_id: user.id, payee_id: task.accepted_by,
      amount, currency: "NGN", paystack_reference: reference, status: "pending",
      metadata: { authorization_url: data.data.authorization_url },
    });

    return json({ authorization_url: data.data.authorization_url, reference, access_code: data.data.access_code });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
