import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://concierge.carsoup.com"
  ),
  title: {
    default: "CarSoup Car Concierge — Expert Car Buying Help in Minnesota",
    template: "%s | CarSoup Car Concierge",
  },
  description:
    "Stop overpaying. CarSoup Car Concierge gives Minnesota car buyers expert guidance, AI-powered research tools, and a dedicated personal shopper — so you buy smarter, faster, and with confidence.",
  keywords: [
    "car buying help Minnesota",
    "car concierge",
    "auto advisor",
    "CarSoup",
    "used car buying guide",
    "Minnesota car dealer",
    "car negotiation help",
  ],
  openGraph: {
    type: "website",
    siteName: "CarSoup Car Concierge",
    title: "CarSoup Car Concierge — Expert Car Buying Help in Minnesota",
    description:
      "Expert guidance, AI research tools, and a personal shopper for Minnesota car buyers. Stop overpaying.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarSoup Car Concierge",
    description: "Expert car buying help for Minnesota buyers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
