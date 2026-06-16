export default function Trust() {
  return (
    <section className="py-20 bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built by CarSoup — Minnesota&apos;s automotive marketplace
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              CarSoup.com has connected Minnesota car buyers and sellers since 1999.
              We&apos;re not a national aggregator. We&apos;re local — and that matters when
              you&apos;re buying in this market.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              CarSoup Car Concierge is an extension of that same mission: give
              Minnesota buyers the tools and expertise to buy the right car at a
              fair price, without the stress.
            </p>
            <a
              href="https://www.carsoup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-orange-light font-semibold hover:text-white transition-colors"
            >
              Visit CarSoup.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { stat: "25+", label: "Years in Minnesota automotive" },
              { stat: "10,000+", label: "Minnesota listings at any time" },
              { stat: "Trusted", label: "By local buyers and dealers" },
              { stat: "Local", label: "Minnesota-focused, not national" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-brand-navy-light rounded-2xl p-6 border border-white/10"
              >
                <div className="text-3xl font-bold text-brand-orange mb-2">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
