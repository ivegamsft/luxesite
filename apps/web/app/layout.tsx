import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora Luxe Travel | Award-Winning Private Travel Specialists",
  description: "Bespoke luxury travel by specialists. Curated destinations, 24/7 concierge, journeys for you alone.",
  keywords: [
    "luxury travel",
    "bespoke itineraries",
    "private travel",
    "safaris",
    "travel specialists",
    "curated destinations",
    "24/7 concierge",
  ],
  openGraph: {
    title: "Aurora Luxe Travel | Award-Winning Private Travel Specialists",
    description: "Bespoke luxury travel by specialists. Curated destinations, 24/7 concierge, journeys for you alone.",
    type: "website",
    siteName: "Aurora Luxe Travel",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Aurora Luxe Travel — Bespoke luxury journeys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Luxe Travel | Award-Winning Private Travel Specialists",
    description: "Bespoke luxury travel by specialists. Curated destinations, 24/7 concierge, journeys for you alone.",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-aurora-bg text-aurora-text font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-aurora-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lift">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
