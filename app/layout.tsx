import type { Metadata } from "next";
import { Geist, Geist_Mono, Bowlby_One_SC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bowlbyOneSC = Bowlby_One_SC({
  variable: "--font-bowlby",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movers and Junk Removal | Stress-Free Moving Made Simple",
  description: "Professional moving and junk removal services. Point. We handle the rest. Get your free quote in 60 seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const colorScheme = process.env.NEXT_PUBLIC_COLOR_SCHEME || "navy";

  return (
    <html
      lang="en"
      data-theme={colorScheme}
      className={`${geistSans.variable} ${geistMono.variable} ${bowlbyOneSC.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full flex flex-col bg-navy-950 text-white">{children}</body>
    </html>
  );
}
