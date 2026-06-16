import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, TIER_PRICES, type Tier } from "@/lib/stripe";

const TIER_NAMES: Record<Tier, string> = {
  advisor: "CarSoup Advisor — 60-Day Car Buying Coaching",
  personal_shopper: "CarSoup Personal Shopper — 60-Day Dedicated Service",
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { tier } = body as { tier: Tier };

  if (!tier || !(tier in TIER_PRICES)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: TIER_NAMES[tier],
              description:
                "One-time fee per vehicle purchase. Valid for 60 days from purchase date.",
            },
            unit_amount: TIER_PRICES[tier],
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "new",
        tier,
        user_id: user.id,
      },
      success_url: `${appUrl}/app?payment=success`,
      cancel_url: `${appUrl}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
