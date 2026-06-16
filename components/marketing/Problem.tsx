const PAIN_POINTS = [
  {
    icon: "💸",
    title: "Price opacity",
    stat: "Buyers overpay by $1,000–$3,000 on average",
    description:
      "Invoice pricing, dealer markup, and add-on fees are deliberately opaque. Most buyers have no idea what a fair offer looks like — so they pay more than they should.",
    source: "Source: Consumer Reports, 2023 Auto Pricing Study",
  },
  {
    icon: "⏱",
    title: "Time cost",
    stat: "The average car purchase takes 4.5 hours at the dealership",
    description:
      "That's before test drives, financing back-and-forth, and follow-up calls. Most buyers visit 2–3 dealerships before committing. The process is built to wear you down.",
    source: "Source: Cox Automotive, Car Buyer Journey 2023",
  },
  {
    icon: "🤝",
    title: "Dealer pressure",
    stat: "73% of buyers feel pressure during the financing process",
    description:
      "Extended warranties, protection packages, and financing upsells happen fast in a small room. Without preparation, it's easy to agree to hundreds of dollars in unnecessary add-ons.",
    source: "Source: J.D. Power, 2023 U.S. Sales Satisfaction Index",
  },
];

export default function Problem() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">Why car buying feels broken</h2>
          <p className="section-subheading mx-auto">
            The dealership has information, experience, and time on their side.
            Most buyers don&apos;t.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point) => (
            <div key={point.title} className="card p-8">
              <div className="text-4xl mb-4" aria-hidden="true">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-navy mb-2">
                {point.title}
              </h3>
              <p className="text-brand-orange font-semibold text-sm mb-3">
                {point.stat}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {point.description}
              </p>
              <p className="text-xs text-gray-400">{point.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
