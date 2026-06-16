import type { Metadata } from "next";
import Nav from "@/components/marketing/Nav";
import Hero from "@/components/marketing/Hero";
import Problem from "@/components/marketing/Problem";
import HowItWorks from "@/components/marketing/HowItWorks";
import Pricing from "@/components/marketing/Pricing";
import Features from "@/components/marketing/Features";
import Trust from "@/components/marketing/Trust";
import FAQ from "@/components/marketing/FAQ";
import Footer from "@/components/marketing/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CarSoup Car Concierge — Expert Car Buying Help in Minnesota",
  description:
    "Stop overpaying. CarSoup Car Concierge gives Minnesota car buyers expert guidance, AI research tools, and a dedicated personal shopper — so you buy smarter, faster, and with confidence.",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://concierge.carsoup.com/#org",
      name: "CarSoup Car Concierge",
      url: "https://concierge.carsoup.com",
      logo: "https://concierge.carsoup.com/carsoup-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        email: "concierge@carsoup.com",
        contactType: "customer service",
        areaServed: "US-MN",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "CarSoup",
        url: "https://www.carsoup.com",
      },
    },
    {
      "@type": "Service",
      "@id": "https://concierge.carsoup.com/#service",
      name: "CarSoup Car Concierge",
      description:
        "Expert car-buying assistance for Minnesota buyers. Includes AI assistant, buyer guides, human advisors, and personal shoppers.",
      provider: { "@id": "https://concierge.carsoup.com/#org" },
      areaServed: { "@type": "State", name: "Minnesota" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Car Concierge Service Tiers",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Self-Guided (Free)",
            description: "AI assistant and complete buyer's guide. No payment required.",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Advisor",
            description:
              "60-day email access to a human car-buying advisor. One-time fee per vehicle.",
            price: "99",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Personal Shopper",
            description:
              "60-day dedicated personal shopper who contacts dealers on your behalf. One-time fee per vehicle.",
            price: "499",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does 'one-time fee per vehicle' mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each paid engagement is tied to a single vehicle purchase. You pay once and have 60 days of access. No subscription — you only pay when you're actively buying a car.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Personal Shopper do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Personal Shopper ($499) contacts dealerships directly, gets pricing quotes, and negotiates on your behalf. They handle as much of the process as possible without you making the calls.",
          },
        },
        {
          "@type": "Question",
          name: "Can I upgrade from Advisor to Personal Shopper mid-engagement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You pay $400 (the difference). Your 60-day expiry date stays the same — the clock does not reset on upgrade.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Pricing />
        <Features />
        <Trust />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
