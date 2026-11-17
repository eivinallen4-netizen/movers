import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
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
    default: "Las Vegas Movers & Junk Removal | Local Moving Company",
    template: `%s | ${BUSINESS}`,
  },
  description:
    "Las Vegas movers and junk removal for apartments, houses and same-day moves. Upfront pricing, no hidden fees. Henderson, Summerlin & the whole valley. (702) 527-8565.",
  openGraph: { siteName: BUSINESS, locale: "en_US", type: "website", images: ["/logo.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Kl3dGi6e8AlgspesLbbErw"
          strategy="afterInteractive"
        />
        {/* Skipped for visitors whose browser sends a Global Privacy Control opt-out (the privacy policy promises this). */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`if(!navigator.globalPrivacyControl){!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1700787861671112');
fbq('init', '1160527763156914');
fbq('track', 'PageView');}`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1700787861671112&ev=PageView&noscript=1"
            alt=""
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1160527763156914&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
