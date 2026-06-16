import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-brand-navy text-white py-20 md:py-28 overflow-hidden">
      {/* Hero background image */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        className="object-cover object-center opacity-30"
        priority
        aria-hidden="true"
      />
      {/* Gradient overlay — stronger on the left so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/40" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange-light border border-brand-orange/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            Powered by CarSoup.com — Minnesota&apos;s Auto Marketplace
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Car buying is stressful.
            <br />
            <span className="text-brand-orange">It doesn&apos;t have to be.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Buying a car is one of the biggest purchases you&apos;ll make — and the
            process can feel overwhelming. Pricing is complex, options are endless,
            and time is short. CarSoup Car Concierge helps you get there faster,
            fully informed, and confident you got a fair deal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
              Start Free — No Credit Card
            </Link>
            <a href="#pricing" className="btn-secondary bg-transparent text-base px-8 py-3.5 border-white/30 text-white hover:bg-white/10">
              See Pricing
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-5">
            Free tier includes AI assistant and buyer&apos;s guide. No payment required.
          </p>
        </div>
      </div>
    </section>
  );
}
