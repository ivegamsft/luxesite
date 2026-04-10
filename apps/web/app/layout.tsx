import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora Luxe Travel | Beyond First Class",
  description: "Ultra-premium concierge travel experiences. Private jets, superyachts, Michelin trails, and bespoke itineraries for the world's most discerning travelers.",
  keywords: [
    "luxury travel",
    "concierge travel",
    "private jet charter",
    "superyacht charter",
    "bespoke travel",
    "ultra-luxury travel",
    "Michelin dining experiences",
    "exclusive destinations",
    "premium travel services",
  ],
  openGraph: {
    title: "Aurora Luxe Travel | Beyond First Class",
    description: "Ultra-premium concierge travel experiences. Private jets, superyachts, Michelin trails, and bespoke itineraries for the world's most discerning travelers.",
    type: "website",
    siteName: "Aurora Luxe Travel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Luxe Travel | Beyond First Class",
    description: "Ultra-premium concierge travel experiences. Private jets, superyachts, Michelin trails, and bespoke itineraries for the world's most discerning travelers.",
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
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-aurora-dark text-aurora-white font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
