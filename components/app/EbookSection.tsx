export default function EbookSection() {
  // [EBOOK URL/PATH] — replace /ebook.pdf with actual ebook file path
  // Drop the PDF into /public/ebook.pdf or update this path to a hosted URL
  const ebookPath = "/ebook.pdf";

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-brand-navy">Minnesota Car Buyer&apos;s Guide</h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Free with your account — download or read online
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-32 bg-brand-navy rounded-lg flex items-center justify-center mb-5 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
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

        <h3 className="font-bold text-brand-navy text-lg mb-2">
          Minnesota Car Buyer&apos;s Complete Guide
        </h3>
        <p className="text-gray-600 text-sm mb-6 max-w-xs">
          Every step of the buying process, Minnesota-specific — from budget
          to signed paperwork without surprises.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <a
            href={ebookPath}
            download="Minnesota-Car-Buyers-Guide.pdf"
            className="btn-primary text-sm py-3 text-center"
          >
            Download PDF
          </a>
          <a
            href={ebookPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-3 text-center"
          >
            Read Online
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {/* [EBOOK URL/PATH] — place your PDF at public/ebook.pdf or update ebookPath above */}
          Placeholder: add your PDF to <code className="text-xs">/public/ebook.pdf</code>
        </p>
      </div>
    </div>
  );
}
