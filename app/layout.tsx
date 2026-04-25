import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import { generateOrganizationJsonLd } from "../lib/seo";
import AnalyticsTracker from "../components/AnalyticsTracker";
import WhatsAppButton from "../components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itech - Luxury High-End Fashion & Designer Clothing",
  description: "Discover luxury high-end fashion at Itech. Shop premium designer clothing, elegant dresses, sophisticated accessories, and timeless pieces crafted for the modern wardrobe.",
  keywords: "luxury fashion, high-end clothing, designer wear, premium apparel, elegant dresses, sophisticated style, luxury brand, designer fashion, exclusive clothing, Itech",
  authors: [{ name: "Itech" }],
  openGraph: {
    title: "Itech - Luxury High-End Fashion & Designer Clothing",
    description: "Discover luxury high-end fashion at Itech. Shop premium designer clothing, elegant dresses, sophisticated accessories, and timeless pieces.",
    url: "https://Itech.com",
    siteName: "Itech",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itech - Luxury High-End Fashion",
    description: "Shop premium designer clothing and luxury fashion at Itech",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsTracker />
        <NavbarWrapper />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
