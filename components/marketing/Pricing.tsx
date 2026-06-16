import Link from "next/link";
import CheckoutButton from "@/components/ui/CheckoutButton";

const TIERS = [
  {
    id: "free",
    name: "Self-Guided",
    price: "$0",
    priceSub: "Free forever",
    description: "Research tools to go at your own pace.",
    features: [
      "AI car-buying assistant",
      "Minnesota Car Buyer's Complete Guide (ebook)",
      "Unlimited chat sessions",
      "CarSoup marketplace access",
    ],
    notIncluded: ["Human advisor access", "Dealer communication support"],
    cta: "Start Free",
    ctaLink: "/signup",
    highlight: false,
  },
  {
    id: "advisor",
    name: "Advisor",
    price: "$99",
    priceSub: "One-time · per vehicle · 60 days",
    description: "A human expert coaching you by email through your purchase.",
    features: [
      "Everything in Self-Guided",
      "Email access to a human advisor",
      "Personalized pricing guidance",
      "Negotiation scripts and coaching",
      "Financing review and advice",
      "60-day engagement window",
    ],
    notIncluded: ["Advisor contacts dealers on your behalf"],
    cta: "Get Advisor",
    tier: "advisor",
    highlight: false,
  },
  {
    id: "personal_shopper",
    name: "Personal Shopper",
    price: "$499",
    priceSub: "One-time · per vehicle · 60 days",
    description:
      "A dedicated expert who handles the legwork and dealer contact for you.",
    badge: "Most Hands-Off",
    features: [
      "Everything in Advisor",
      "Dedicated personal shopper",
      "Shopper contacts dealers on your behalf",
      "Full-service negotiation support",
      "Vehicle history and inspection guidance",
      "Financing and trade-in optimization",
      "60-day engagement window",
    ],
    notIncluded: [],
    cta: "Get Personal Shopper",
    tier: "personal_shopper",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">Simple, transparent pricing</h2>
          <p className="section-subheading mx-auto">
            One-time fee per vehicle purchase. No subscriptions. No surprises.
            Paid tiers are valid for 60 days from purchase — one car, one engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`card p-8 flex flex-col relative ${
                tier.highlight
                  ? "border-brand-orange ring-2 ring-brand-orange shadow-lg"
                  : ""
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-brand-navy mb-1">
                  {tier.name}
                </h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold text-brand-navy">
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{tier.priceSub}</p>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {tier.ctaLink ? (
                  <Link
                    href={tier.ctaLink}
                    className={`block text-center w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      tier.highlight
                        ? "bg-brand-orange text-white hover:bg-brand-orange-dark"
                        : "border-2 border-brand-navy text-brand-navy hover:bg-gray-50"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <CheckoutButton
                    tier={tier.tier as "advisor" | "personal_shopper"}
                    label={tier.cta}
                    primary={tier.highlight}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Paid tiers are a one-time payment per vehicle purchase, not a subscription.
          Each engagement is valid for 60 days. You can purchase again for a future vehicle.
        </p>
      </div>
    </section>
  );
}
