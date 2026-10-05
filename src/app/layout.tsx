import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS, SITE_URL } from "@/content/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Movers and Junk Removal | Las Vegas Movers & Junk Removal",
    template: `%s | ${BUSINESS}`,
  },
  description:
    "Local Las Vegas movers and junk removal serving Henderson, Summerlin and the whole valley. Honest pricing, no surprises. Free quote: (702) 527-8565.",
  openGraph: { siteName: BUSINESS, locale: "en_US", type: "website", images: ["/logo.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
