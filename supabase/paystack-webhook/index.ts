// Paystack webhook — verifies HMAC signature & updates transaction status.
// No auth required (Paystack server-to-server). verify_jwt is false.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { createHmac } from "node:crypto";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const PAYSTACK_SECRET = Deno.env.get("PAYSTACK_SECRET_KEY");
  if (!PAYSTACK_SECRET) return new Response("Server misconfigured", { status: 500 });

  const raw = await req.text();
  const sig = req.headers.get("x-paystack-signature") ?? "";
  const expected = createHmac("sha512", PAYSTACK_SECRET).update(raw).digest("hex");
  if (sig !== expected) return new Response("Invalid signature", { status: 401 });

  let event: any;
  try { event = JSON.parse(raw); } catch { return new Response("Invalid JSON", { status: 400 }); }

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (event.event === "charge.success") {
    const reference: string = event.data.reference;
    await admin.from("transactions").update({ status: "success", metadata: event.data }).eq("paystack_reference", reference);
  } else if (event.event === "charge.failed") {
    const reference: string = event.data.reference;
    await admin.from("transactions").update({ status: "failed", metadata: event.data }).eq("paystack_reference", reference);
  }

  return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
});
