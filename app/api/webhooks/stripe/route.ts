import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type Stripe from "stripe";

// App Router reads the raw body via request.text() — no bodyParser config needed

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata as {
    type?: string;
    tier?: string;
    user_id?: string;
    engagement_id?: string;
  };

  const db = createServiceClient();
  const paymentId = session.payment_intent as string;

  if (metadata.type === "new") {
    await handleNewPurchase(db, session, metadata, paymentId);
  } else if (metadata.type === "upgrade") {
    await handleUpgrade(db, metadata, paymentId);
  }

  return NextResponse.json({ received: true });
}

async function handleNewPurchase(
  db: ReturnType<typeof createServiceClient>,
  session: Stripe.Checkout.Session,
  metadata: { tier?: string; user_id?: string },
  paymentId: string
) {
  const { tier, user_id } = metadata;
  if (!tier || !user_id) {
    console.error("Webhook: missing tier or user_id in metadata", metadata);
    return;
  }

  // Idempotency guard: skip if this payment_intent was already processed
  const { data: existing } = await db
    .from("engagements")
    .select("id")
    .eq("stripe_payment_id", paymentId)
    .maybeSingle();

  if (existing) {
    console.log("Webhook: duplicate new-purchase event, skipping", paymentId);
    return;
  }

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 60);

  const { error } = await db.from("engagements").insert({
    user_id,
    tier,
    stripe_payment_id: paymentId,
    purchased_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("Webhook: failed to insert engagement", error);
  } else {
    console.log(`Webhook: created ${tier} engagement for user ${user_id}`);
  }

  // TODO (POC cut): if user_id not found, fall back to matching by session.customer_email
  // and store in pending_payments for later attachment on signup.
}

async function handleUpgrade(
  db: ReturnType<typeof createServiceClient>,
  metadata: { engagement_id?: string; user_id?: string },
  paymentId: string
) {
  const { engagement_id, user_id } = metadata;
  if (!engagement_id || !user_id) {
    console.error("Webhook: missing engagement_id or user_id for upgrade", metadata);
    return;
  }

  // Idempotency guard: check if upgrade payment already applied
  // We repurpose stripe_payment_id for the upgrade payment too
  const { data: existing } = await db
    .from("engagements")
    .select("id, tier")
    .eq("id", engagement_id)
    .maybeSingle();

  if (!existing) {
    console.error("Webhook: engagement not found for upgrade", engagement_id);
    return;
  }

  if (existing.tier === "personal_shopper") {
    // Already upgraded — idempotent no-op
    console.log("Webhook: upgrade already applied, skipping", engagement_id);
    return;
  }

  // Update tier only — DO NOT change expires_at
  // Race condition note (TODO): if engagement expired between Checkout creation
  // and webhook arrival, we still apply the upgrade (they paid) but expiry stays as-is.
  const { error } = await db
    .from("engagements")
    .update({
      tier: "personal_shopper",
      stripe_payment_id: paymentId, // store upgrade payment id
    })
    .eq("id", engagement_id)
    .eq("user_id", user_id); // belt-and-suspenders user check

  if (error) {
    console.error("Webhook: failed to upgrade engagement", error);
  } else {
    console.log(`Webhook: upgraded engagement ${engagement_id} to personal_shopper`);
  }
}
