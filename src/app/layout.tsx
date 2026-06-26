import { Cormorant_Garamond, Jost } from "next/font/google";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BRAND, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const defaultMetadata = createPageMetadata({
  title: "Luxury Balloon Delivery | Balloons by H | Beverly Hills",
  description:
    "Luxury handcrafted balloon bouquets delivered throughout Beverly Hills, Bel Air, Brentwood, Santa Monica and Los Angeles.",
  path: "/",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luxury Balloon Delivery | Balloons by H | Beverly Hills",
    template: `%s | ${BRAND.name}`,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
