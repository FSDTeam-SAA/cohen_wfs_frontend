import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";
import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "WITKLIP Farm",
  description:
    "Manage your orders, track shipments, and configure products easily",
  verification: {
    google: "9jKwmmUTezBeCrDpzxJtpDoj6pY-qVjU9-JtjkKm4h4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Witklip Farm",
    url: "https://witklipfarm.com/",
    description:
      "Witklip Farm is a long-established agricultural operation in Graafwater, South Africa...",
    logo: "https://witklipfarm.com/wp-content/uploads/2026/01/witklip-logo.png",
    email: "admin@witklipfarm.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Witklip Farm, Graafwater",
      addressLocality: "Graafwater",
      postalCode: "8120",
      addressCountry: "ZA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+27 123 456 789",
      contactType: "customer service",
    },
    founder: [
      { "@type": "Person", name: "Gysbert Burger" },
      { "@type": "Person", name: "Cohen Van der Berg" },
    ],
    foundingDate: "1860",
    areaServed: { "@type": "Place", name: "Western Cape, South Africa" },
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
