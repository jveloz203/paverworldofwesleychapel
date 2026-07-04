import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import { business } from "@/lib/business";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${business.name} | Pavers, Patios, Driveways & Pool Decks`,
    template: `%s | ${business.name}`,
  },
  description: `Family-owned paver experts serving Wesley Chapel and Tampa Bay since ${business.foundedYear}. Patios, driveways, pool decks, walkways, fire pits & retaining walls. Factory-direct materials. Free estimates: ${business.phone.display}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: `${business.name} | Pavers, Patios, Driveways & Pool Decks`,
    description: `Family owned since ${business.foundedYear}. Factory-direct paver installation across Wesley Chapel and Tampa Bay. Free estimates.`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.legalName,
  telephone: business.phone.tel,
  email: business.email,
  url: siteUrl(),
  foundingDate: String(business.foundedYear),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: business.hoursSchema.days,
    opens: business.hoursSchema.opens,
    closes: business.hoursSchema.closes,
  },
  areaServed: business.serviceAreas.map((name) => ({ "@type": "City", name })),
  sameAs: [business.social.instagram, business.social.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
