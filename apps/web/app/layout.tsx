import type { Metadata } from "next";
import { Bodoni_Moda, Libre_Franklin } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
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
      className={`${bodoni.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-aurora-dark text-aurora-white font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
