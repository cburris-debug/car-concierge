import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/carsoup-logo.png"
            alt="CarSoup logo"
            width={120}
            height={36}
            className="h-8 w-auto"
            priority
          />
          <span className="text-sm font-medium text-gray-400 hidden sm:inline border-l border-gray-200 pl-3">
            Car Concierge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-brand-navy transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-brand-navy transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-brand-navy transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary text-sm px-4 py-2">
            Start Free
          </Link>
        </div>
      </div>
    </header>
  );
}
