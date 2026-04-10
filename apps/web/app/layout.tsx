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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-aurora-dark text-aurora-white font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
