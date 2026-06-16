import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// DEV-ONLY route — disabled unless ENABLE_DEV_TOOLS=true
// Used as a demo safety net when Stripe webhooks aren't reachable
// Guards: ENABLE_DEV_TOOLS env flag (also checked in middleware)

export async function POST(request: Request) {
  if (process.env.ENABLE_DEV_TOOLS !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();
  const {
    user_id,
    type,
    tier,
    engagement_id,
  } = body as {
    user_id: string;
    type: "new" | "upgrade";
    tier?: "advisor" | "personal_shopper";
    engagement_id?: string;
  };

  if (!user_id) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  const db = createServiceClient();

  if (type === "new") {
    if (!tier) {
      return NextResponse.json({ error: "tier required for new" }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 60);

    const { data, error } = await db
      .from("engagements")
      .insert({
        user_id,
        tier,
        stripe_payment_id: null, // dev-inserted, no real payment
        purchased_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, engagement: data });
  }

  if (type === "upgrade") {
    if (!engagement_id) {
      return NextResponse.json({ error: "engagement_id required for upgrade" }, { status: 400 });
    }

    const { data, error } = await db
      .from("engagements")
      .update({ tier: "personal_shopper" })
      .eq("id", engagement_id)
      .eq("user_id", user_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, engagement: data });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
