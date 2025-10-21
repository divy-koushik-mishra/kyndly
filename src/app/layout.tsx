import "@/styles/globals.css";

import { type Metadata } from "next";
import { Manrope } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "@/components/providers/session-provider";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: {
    default: "Kyndly - Review Management Software",
    template: "%s | Kyndly"
  },
  description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
  keywords: "review management, customer reviews, testimonial software, review widget, customer feedback, review analytics, testimonial management, social proof, review collection",
  authors: [{ name: "Kyndly" }],
  creator: "Kyndly",
  publisher: "Kyndly",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kyndly.online",
    siteName: "Kyndly",
    title: "Kyndly - Review Management Software | Collect & Showcase Customer Reviews",
    description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
    images: [
      {
        url: "https://kyndly.online/images/kyndly-social.png",
        width: 1200,
        height: 630,
        alt: "Kyndly - Review Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyndly - Review Management Software | Collect & Showcase Customer Reviews",
    description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
    images: ["https://kyndly.online/images/kyndly-social.png"],
    creator: "@kyndly",
  },
  icons: {
    icon: [
      { url: "/images/kyndly-logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/images/kyndly-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://kyndly.online",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="bg-black/93 text-white">
        <SessionProvider session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
