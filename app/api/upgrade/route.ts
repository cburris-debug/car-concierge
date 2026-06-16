import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, UPGRADE_PRICE } from "@/lib/stripe";
import { getActiveEngagement } from "@/lib/engagements";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find active advisor engagement
  const engagement = await getActiveEngagement(user.id);

  if (!engagement || engagement.tier !== "advisor") {
    return NextResponse.json(
      { error: "No active Advisor engagement found to upgrade." },
      { status: 400 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Amount is computed server-side — never trust client-sent price
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Upgrade: Advisor → Personal Shopper",
              description:
                "Price difference only ($499 - $99). Your current 60-day expiry date stays the same — the clock does not reset.",
            },
            unit_amount: UPGRADE_PRICE, // $400 server-computed
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "upgrade",
        engagement_id: engagement.id,
        user_id: user.id,
      },
      success_url: `${appUrl}/app?payment=upgraded`,
      cancel_url: `${appUrl}/app`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Upgrade checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create upgrade checkout session." },
      { status: 500 }
    );
  }
}
