"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What does 'one-time fee per vehicle' mean?",
    a: "Each paid engagement (Advisor or Personal Shopper) is tied to a single vehicle purchase. You pay once, and you have 60 days of access to your tier's services. If you buy a second vehicle in the future, you'd start a new engagement. There's no subscription — you only pay when you're actively buying a car.",
  },
  {
    q: "What's included in the Advisor tier?",
    a: "For $99, you get email access to a human advisor for 60 days. They'll help you understand pricing for specific vehicles, coach you through negotiations, review financing offers, and answer questions about the process. You drive the car-buying — they coach you on strategy.",
  },
  {
    q: "What does the Personal Shopper actually do that Advisor doesn't?",
    a: "The Personal Shopper ($499) takes an active role on your behalf. They'll contact dealerships directly to inquire about vehicles, get pricing quotes, and negotiate without you having to make the calls. If you want the process handled as much as possible without being there yourself, Personal Shopper is the right fit.",
  },
  {
    q: "What happens when the 60-day window expires?",
    a: "Your paid engagement ends. You keep your free account, which means continued access to the AI assistant and the buyer's guide. If you still need help after 60 days, you can purchase a new engagement. If you started as Advisor and want to upgrade before your window closes, you can upgrade for $400 (the price difference) — your expiry date stays the same.",
  },
  {
    q: "How does the AI assistant work?",
    a: "The AI assistant is powered by a conversational AI trained on car-buying knowledge — pricing, dealer processes, financing, inspection tips, and the Minnesota market. It's not a search engine. Ask it specific questions and it gives you actionable answers. It's available to all accounts, free and paid, and runs 24/7.",
  },
  {
    q: "Can I upgrade from Advisor to Personal Shopper mid-engagement?",
    a: "Yes. If you're in an active Advisor engagement, you can upgrade to Personal Shopper for $400 (you already paid $99). Your 60-day clock does not reset — the expiry date stays exactly where it was. The upgrade takes effect immediately after payment.",
  },
  {
    q: "What's your refund policy?",
    a: "Given the nature of this service — access to human advisor time from the moment of purchase — refunds are handled case by case. Contact us within 7 days if you haven't used the service and we'll work with you. Once advisor or shopper time has been used, we cannot refund. [TODO: refine refund policy before launch]",
  },
  {
    q: "Is this only for Minnesota buyers?",
    a: "CarSoup Car Concierge is built for Minnesota and the surrounding region. Our advisors know the local market — Minnesota dealership practices, state-specific fees, and local inventory. Buyers outside Minnesota may find the AI assistant useful, but the human tiers are optimized for in-region purchases.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">Frequently asked questions</h2>
          <p className="section-subheading mx-auto">
            What buyers ask before they start.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-navy hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
