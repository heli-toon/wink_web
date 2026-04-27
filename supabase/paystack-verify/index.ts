// Verify a Paystack transaction & flip transaction status. Auth required.
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

    const url = new URL(req.url);
    const reference = url.searchParams.get("reference") || (await req.json().catch(() => ({}))).reference;
    if (!reference) return json({ error: "reference required" }, 400);

    const r = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });
    const data = await r.json();
    if (!r.ok || !data.status) return json({ error: data.message || "Verify failed" }, 400);

    const ok = data.data.status === "success";
    // service-role client to bypass RLS for status update
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await admin.from("transactions").update({ status: ok ? "success" : "failed", metadata: data.data }).eq("paystack_reference", reference);

    return json({ status: data.data.status, amount: data.data.amount / 100, reference });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
