const GUIDES = [
  {
    title: "Minnesota Car Buyer's Quick Start Guide",
    description:
      "A focused primer on what to know before you start — pricing basics, timing, and what to watch out for at the dealership.",
    path: "/quick-start-guide.pdf",
    filename: "Minnesota-Car-Buyers-Quick-Start-Guide.pdf",
    badge: "Quick read",
  },
  {
    title: "Minnesota Car Buyer's Complete Guide",
    description:
      "Every step of the buying process, Minnesota-specific — from setting a budget to signing paperwork without surprises.",
    path: "/complete-guide.pdf",
    filename: "Minnesota-Car-Buyers-Complete-Guide.pdf",
    badge: "In-depth",
  },
];

export default function EbookSection() {
  return (
    <div className="card flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-brand-navy">Minnesota Car Buyer&apos;s Guides</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Free with your account — download or read online
        </p>
      </div>

      <div className="flex-1 divide-y divide-gray-100">
        {GUIDES.map((guide) => (
          <div key={guide.path} className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-14 bg-brand-navy rounded flex items-center justify-center flex-shrink-0 shadow">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-brand-orange bg-brand-orange/10 rounded-full px-2 py-0.5">
                    {guide.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-brand-navy text-sm leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={guide.path}
                download={guide.filename}
                className="btn-primary text-xs py-2 px-4 flex-1 text-center"
              >
                Download
              </a>
              <a
                href={guide.path}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4 flex-1 text-center"
              >
                Read Online
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
