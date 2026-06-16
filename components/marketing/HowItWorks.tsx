const STEPS = [
  {
    number: "01",
    title: "Create your free account",
    description:
      "Sign up in under a minute. No credit card. You immediately get access to the AI car-buying assistant and the Minnesota Car Buyer's Complete Guide — practical tools you can use today.",
  },
  {
    number: "02",
    title: "Choose the help level you need",
    description:
      "If you want a human expert, upgrade to Advisor ($99) for email coaching, or Personal Shopper ($499) for a dedicated guide who handles dealer communication on your behalf. Both are one-time fees per vehicle, valid for 60 days.",
  },
  {
    number: "03",
    title: "Buy with confidence",
    description:
      "Walk into every conversation prepared. Know what to offer, what to skip, and when to walk away. Your CarSoup concierge is in your corner from first search to signed paperwork.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading">How it works</h2>
          <p className="section-subheading mx-auto">
            From sign-up to keys in hand — three steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 -translate-y-1/2 z-0"
                  style={{ width: "calc(100% - 3rem)", left: "calc(3rem)" }}
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-brand-navy text-white flex items-center justify-center text-2xl font-bold mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
