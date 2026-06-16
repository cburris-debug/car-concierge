import { createClient } from "@/lib/supabase/server";
import { getActiveEngagement, daysRemaining, TIER_LABELS } from "@/lib/engagements";
import ChatInterface from "@/components/app/ChatInterface";
import EbookSection from "@/components/app/EbookSection";
import EngagementStatus from "@/components/app/EngagementStatus";
import UpgradeButton from "@/components/app/UpgradeButton";
import Link from "next/link";

export default async function AppDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // user is guaranteed by layout, but TS needs the check
  if (!user) return null;

  const engagement = await getActiveEngagement(user.id);
  const days = engagement ? daysRemaining(engagement.expires_at) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Your Dashboard</h1>
          <p className="text-gray-600 text-sm mt-0.5">{user.email}</p>
        </div>

        {engagement ? (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
              {TIER_LABELS[engagement.tier]} — {days} day{days !== 1 ? "s" : ""} left
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
              Free Account
            </span>
            <Link href="/#pricing" className="btn-primary text-sm px-4 py-2">
              Upgrade
            </Link>
          </div>
        )}
      </div>

      {/* Engagement status card */}
      <EngagementStatus engagement={engagement} />

      {/* Upgrade CTA for Advisor users */}
      {engagement?.tier === "advisor" && days !== null && days > 0 && (
        <UpgradeButton expiresAt={engagement.expires_at} />
      )}

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Chatbot */}
        <div className="lg:col-span-1">
          <ChatInterface userId={user.id} />
        </div>

        {/* Ebook */}
        <div className="lg:col-span-1">
          <EbookSection />
        </div>
      </div>
    </div>
  );
}
