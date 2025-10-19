import "@/styles/globals.css";

import { type Metadata } from "next";
import { Manrope } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "@/components/providers/session-provider";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Kyndly",
  description: "Turn kind words into growth.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
