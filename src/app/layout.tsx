import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingContact } from "@/components/korta/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KORTA - Outdoor Wellness Design",
  description:
    "KORTA creates timeless outdoor showers, kitchens, fire pieces and outdoor wellness objects in natural stone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
