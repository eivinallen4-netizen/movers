import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../../public/logo white.png";
import { Phone } from "@/components/icons";
import { decodeAddressRef } from "@/lib/server/address-token";
import { QuoteWizard } from "./QuoteWizard";

export const metadata: Metadata = {
  title: "Get Your Free Moving Quote",
  description: "Tell us about your move and get an honest, upfront quote from a local Las Vegas crew.",
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  // Only addresses carrying a valid signature from /api/autocomplete count as picked.
  // Anything else typed into the URL just pre-fills the text box and must be re-picked.
  const from = decodeAddressRef(one(sp.fromRef));
  const to = decodeAddressRef(one(sp.toRef));

  return (
    <main className="min-h-screen bg-sky-100/40">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[1164px] items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" aria-label="Back to home">
            <Image src={logoWhite} alt="Movers and Junk Removal" className="h-12 w-auto sm:h-[60px]" priority />
          </Link>
          <a
            href="tel:+17025278565"
            className="flex h-11 items-center gap-2 whitespace-nowrap bg-white px-4 text-sm font-bold text-ink hover:bg-sky-100"
          >
            <Phone width={16} height={16} /> <span className="hidden sm:inline">(702) 527-8565</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>
      <QuoteWizard
        initialFrom={{ text: from?.label ?? one(sp.from).slice(0, 200), selected: from }}
        initialTo={{ text: to?.label ?? one(sp.to).slice(0, 200), selected: to }}
      />
    </main>
  );
}
