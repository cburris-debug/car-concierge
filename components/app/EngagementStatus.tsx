import type { Engagement } from "@/lib/engagements";
import { daysRemaining, TIER_LABELS } from "@/lib/engagements";
import Link from "next/link";

interface Props {
  engagement: Engagement | null;
}

export default function EngagementStatus({ engagement }: Props) {
  if (!engagement) {
    return (
      <div className="card p-6 border-brand-orange/30 bg-brand-orange/5">
        <h2 className="text-lg font-bold text-brand-navy mb-2">
          You&apos;re on the free plan
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          You have full access to the AI assistant and buyer&apos;s guide.
          Upgrade to get a human advisor or personal shopper in your corner.
        </p>
        <Link href="/#pricing" className="btn-primary text-sm px-5 py-2.5">
          See Upgrade Options
        </Link>
      </div>
    );
  }

  const days = daysRemaining(engagement.expires_at);
  const expiresFormatted = new Date(engagement.expires_at).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="card p-6 border-green-200 bg-green-50/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-600 font-bold text-lg">
              {TIER_LABELS[engagement.tier]}
            </span>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            {days} day{days !== 1 ? "s" : ""} remaining — expires {expiresFormatted}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-brand-navy">{days}</div>
          <div className="text-xs text-gray-500">days left</div>
        </div>
      </div>

      {days <= 7 && days > 0 && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
          Your engagement expires in {days} day{days !== 1 ? "s" : ""}. Purchase
          a new engagement when you&apos;re ready for your next vehicle.
        </div>
      )}
    </div>
  );
}
