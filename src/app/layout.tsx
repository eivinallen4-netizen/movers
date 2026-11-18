import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { MetaPixelEvents } from "@/components/MetaPixelEvents";
import { BUSINESS, SITE_URL } from "@/content/site";
import "./globals.css";

// Self-hosted (Montserrat, Latin, variable weight, OFL, from @fontsource-variable/montserrat 5.3.0) so a
// build never has to reach Google Fonts; a failed fetch there broke a production deploy on Nov 18, 2026.
const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
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
        <Suspense fallback={null}>
          <MetaPixelEvents />
        </Suspense>
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
fbq('init', '1605571614173809');
fbq('track', 'PageView');}`}
        </Script>
        {/* Google Tag Manager. Same Global Privacy Control opt-out as the Meta Pixel. */}
        <Script id="gtm" strategy="afterInteractive">
          {`if(!navigator.globalPrivacyControl){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W434GBD9');}`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W434GBD9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1605571614173809&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
