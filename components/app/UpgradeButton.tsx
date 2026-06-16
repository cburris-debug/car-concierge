"use client";

import { useState } from "react";

interface UpgradeButtonProps {
  expiresAt: string;
}

export default function UpgradeButton({ expiresAt }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const expiresFormatted = new Date(expiresAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/upgrade", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6 border-brand-orange/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-brand-navy mb-1">
            Upgrade to Personal Shopper for $400
          </h3>
          <p className="text-gray-600 text-sm">
            Your expiry date stays the same ({expiresFormatted}) — the 60-day
            clock does not reset on upgrade. You pay only the $400 difference.
          </p>
        </div>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="btn-primary whitespace-nowrap text-sm px-5 py-2.5 disabled:opacity-60"
        >
          {loading ? "Redirecting…" : "Upgrade — $400"}
        </button>
      </div>
    </div>
  );
}
