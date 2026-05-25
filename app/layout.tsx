import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Food Theatre | An experiential gastronomic stage",
    template: "%s | Food Theatre"
  },
  description:
    "Food Theatre is a platform for food, culture, and experiences where Food Characters bring story-led gastronomy to life across theatres, stages, and hosted spaces.",
  keywords: [
    "Food Theatre",
    "Food Characters",
    "culinary experiences",
    "gastronomic stage",
    "food culture",
    "Future Food Institute"
  ],
  openGraph: {
    title: "Food Theatre | An experiential gastronomic stage",
    description:
      "A platform for food, culture, and experiences where Food Characters bring story-led gastronomy to life.",
    type: "website",
    siteName: "Food Theatre"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${righteous.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
