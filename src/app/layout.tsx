import { Cormorant_Garamond, Jost } from "next/font/google";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalyticsScripts } from "@/components/GoogleAnalyticsScripts";
import { JsonLd } from "@/components/JsonLd";
import { HOME_SEO } from "@/data/page-seo";
import { SITE_URL } from "@/data/site";
import { getLocalBusinessJsonLd } from "@/data/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO.title,
    template: "%s | Balloons by H",
  },
  description: HOME_SEO.description,
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
        <JsonLd data={getLocalBusinessJsonLd()} />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <GoogleAnalyticsScripts />
      </body>
    </html>
  );
}
