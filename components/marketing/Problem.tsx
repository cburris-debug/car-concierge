const PAIN_POINTS = [
  {
    icon: "💸",
    title: "Pricing is complex",
    stat: "Prepared buyers save $1,000–$3,000 on average",
    description:
      "MSRP, market value, trade-in, fees, and financing all interact. Most buyers only go through this a few times in their lives. Knowing what a fair price looks like before you start puts you in a much stronger position.",
    source: "Source: Consumer Reports, 2023 Auto Pricing Study",
  },
  {
    icon: "⏱",
    title: "It takes a lot of time",
    stat: "The average car purchase takes 4.5 hours at the dealership",
    description:
      "That's before test drives, financing review, and follow-up. Most buyers visit 2–3 dealerships before deciding. Coming in prepared shortens that process significantly — and makes every conversation more productive.",
    source: "Source: Cox Automotive, Car Buyer Journey 2023",
  },
  {
    icon: "📋",
    title: "A lot happens fast",
    stat: "73% of buyers feel overwhelmed during the financing process",
    description:
      "Extended warranties, protection packages, and financing options come up quickly near the end of the process. Knowing what to expect — and what questions to ask — means you make decisions you feel good about.",
    source: "Source: J.D. Power, 2023 U.S. Sales Satisfaction Index",
  },
];

export default function Problem() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">Why buyers want support</h2>
          <p className="section-subheading mx-auto">
            Most people buy a car only a few times in their lives. We help you
            show up prepared, save time, and get a fair price.
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
