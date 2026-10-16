"use client";

import { PHONE, PHONE_HREF } from "@/content/site";
import "./globals.css";

/* Replaces the root layout when it fails itself, so it brings its own <html> and <body>. */

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-full bg-ink font-sans text-white antialiased">
        <main className="mx-auto max-w-[1200px] px-5 py-16 lg:py-24">
          <h1 className="text-4xl font-bold sm:text-5xl">Something went wrong.</h1>
          <p className="mt-4 max-w-[560px] text-lg text-white/85">
            Please try again, or call us at {PHONE} for a free quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex h-[52px] items-center bg-sky px-9 text-sm font-bold uppercase text-ink"
            >
              Try again
            </button>
            <a href={PHONE_HREF} className="inline-flex h-[52px] items-center bg-white px-6 text-sm font-bold text-ink">
              Call {PHONE}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
