export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold text-white mb-3">
              Car<span className="text-brand-orange">Soup</span>{" "}
              <span className="text-gray-300">Car Concierge</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Expert car-buying help for Minnesota buyers. AI research tools,
              human advisors, and a personal shopper — so you buy smarter.
            </p>
            <a
              href="mailto:concierge@carsoup.com"
              className="text-sm text-brand-orange-light hover:text-white transition-colors"
            >
              concierge@carsoup.com
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li>
                <a
                  href="https://www.carsoup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  CarSoup.com →
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/signup" className="hover:text-white transition-colors">Create Account</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Sign In</a></li>
              <li><a href="/app" className="hover:text-white transition-colors">Member Dashboard</a></li>
            </ul>
          </div>
        </div>

        {/* Email capture */}
        <div className="border-t border-gray-700 pt-10 mb-10">
          <div className="max-w-md">
            <h4 className="text-white font-semibold mb-2">
              Get car-buying tips in your inbox
            </h4>
            <p className="text-sm mb-4">
              Minnesota market updates, negotiation tips, and guides. No spam.
            </p>
            <form
              action="/api/email-capture"
              method="POST"
              className="flex gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-brand-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-orange-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p>© {year} CarSoup, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
