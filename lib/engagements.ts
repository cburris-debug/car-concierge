import { createServiceClient } from "./supabase/server";

export interface Engagement {
  id: string;
  user_id: string;
  tier: "advisor" | "personal_shopper";
  stripe_payment_id: string | null;
  purchased_at: string;
  expires_at: string;
  vehicle_note: string | null;
}

// Returns the most recent active engagement for a user, or null
export async function getActiveEngagement(
  userId: string
): Promise<Engagement | null> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("engagements")
    .select("*")
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as Engagement | null;
}

export function daysRemaining(expiresAt: string): number {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const TIER_LABELS: Record<string, string> = {
  advisor: "Advisor",
  personal_shopper: "Personal Shopper",
};
