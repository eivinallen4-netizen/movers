"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "@/content/site";

/* Catch-all for anything that throws while rendering a page. Keeps the phone number in front of them. */

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-ink py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5">
        <p className="text-xs font-extrabold uppercase tracking-widest text-sky">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">We dropped that one.</h1>
        <p className="mt-4 max-w-[560px] text-lg text-white/85">
          This page hit a snag. Try again, or call us and we&apos;ll get you a quote over the phone.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-[52px] items-center bg-sky px-9 text-sm font-bold uppercase text-ink transition hover:bg-sky-600"
          >
            Try again
          </button>
          <a
            href={PHONE_HREF}
            className="inline-flex h-[52px] items-center bg-white px-6 text-sm font-bold text-ink transition hover:bg-sky-100"
          >
            Call {PHONE}
          </a>
          <Link href="/" className="inline-flex h-[52px] items-center px-2 text-sm font-bold underline">
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
