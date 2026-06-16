import Link from "next/link";

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* AI Assistant */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-sm font-medium mb-5">
              Included Free
            </div>
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Your AI car-buying assistant
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ask anything about the buying process — pricing strategy, what to inspect
              on a test drive, how to read a Carfax, what dealer fees are negotiable.
              The assistant knows Minnesota&apos;s market and gives you direct, practical answers.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Answers questions about specific vehicles and pricing",
                "Explains every line on a dealer worksheet",
                "Prepares you for common questions and conversations",
                "Available any time — no appointment needed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-brand-orange font-bold mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="btn-primary">
              Try It Free
            </Link>
          </div>

          {/* Chat preview mockup */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <span className="font-semibold text-brand-navy text-sm">
                CarSoup Assistant
              </span>
              <span className="ml-auto text-xs text-green-500 font-medium">
                ● Online
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-200 rounded-xl rounded-tl-none p-3 text-sm text-gray-800 max-w-xs">
                What should I offer on a 2022 Honda CR-V with 28k miles?
              </div>
              <div className="bg-brand-navy rounded-xl rounded-tr-none p-3 text-sm text-white max-w-xs ml-auto">
                For a 2022 CR-V EX with 28k miles, current market data puts retail around $28,500–$30,000 in MN. A strong opening offer is $27,200. Here&apos;s why...
              </div>
              <div className="bg-brand-navy rounded-xl rounded-tr-none p-3 text-sm text-white max-w-xs ml-auto">
                Used inventory in MN is elevated right now, so market value is closer to $27,500–$28,000. Want to walk through what a fair offer looks like?
              </div>
            </div>
          </div>
        </div>

        {/* Ebook section */}
        <div className="mt-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-brand-navy rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full -translate-y-8 translate-x-8" aria-hidden="true" />
              <div className="relative">
                <p className="text-brand-orange-light text-sm font-semibold uppercase tracking-wider mb-2">
                  Free with account
                </p>
                <h3 className="text-2xl font-bold mb-3">
                  Minnesota Car Buyer&apos;s Complete Guide
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  A practical, no-fluff guide covering every step of the car-buying process in Minnesota — from setting a budget to signing the paperwork without surprises.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {[
                    "How to research fair market value",
                    "What dealer fees are standard vs. negotiable in MN",
                    "How to evaluate a trade-in offer",
                    "Financing: what to compare and what to avoid",
                    "The 5-day inspection period explained",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-brand-orange">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange rounded-full px-3 py-1 text-sm font-medium mb-5">
              Included Free
            </div>
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              The complete buyer&apos;s guide, free
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Built from CarSoup&apos;s years in the Minnesota automotive market. The guide
              covers what most buyers wish they knew before walking into a dealership.
              It&apos;s yours the moment you create a free account.
            </p>
            <Link href="/signup" className="btn-primary">
              Get the Guide Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
