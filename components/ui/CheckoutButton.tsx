"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  tier: "advisor" | "personal_shopper";
  label: string;
  primary?: boolean;
  className?: string;
}

export default function CheckoutButton({
  tier,
  label,
  primary = false,
  className,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      if (res.status === 401) {
        // Not logged in — send to signup first
        window.location.href = `/signup?next=/app&intent=${tier}`;
        return;
      }

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

  const base = `w-full py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className ?? ""}`;
  const style = primary
    ? `${base} bg-brand-orange text-white hover:bg-brand-orange-dark`
    : `${base} border-2 border-brand-navy text-brand-navy hover:bg-gray-50`;

  return (
    <button onClick={handleClick} disabled={loading} className={style}>
      {loading ? "Redirecting…" : label}
    </button>
  );
}
