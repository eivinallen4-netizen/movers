import Link from "next/link";
import { FunnelShell, IconTile } from "@/components/funnel";
import { PrintButton } from "@/components/PrintButton";
import { Container } from "@/components/ui";
import { RED_FLAGS } from "@/content/offers";
import { PHONE, PHONE_HREF } from "@/content/site";
import { pageMeta } from "@/lib/seo";

// The free bonus from the second-opinion ad page. Printable; kept out of search like the other /offers pages.
export const metadata = {
  ...pageMeta({
    title: "5 Red Flags in a Moving Quote | Movers and Junk Removal",
    description: "A quick checklist to spot a bad moving quote before you sign.",
    path: "/offers/red-flags",
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <FunnelShell>
      <section className="bg-ink py-12 text-white print:bg-white print:text-ink lg:py-16">
        <Container className="max-w-[820px]">
          <p className="text-xs font-extrabold uppercase tracking-widest text-sky print:text-sky-700">Free checklist</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">5 Red Flags in a Moving Quote</h1>
          <p className="mt-4 text-lg text-white/85 print:text-ink">
            Check your quote against these five before you sign anything.
          </p>
          <div className="mt-6 print:hidden">
            <PrintButton />
          </div>
        </Container>
      </section>
      <section className="py-12 lg:py-16">
        <Container className="max-w-[820px]">
          <ol className="space-y-6">
            {RED_FLAGS.map((f, i) => (
              <li key={f.title} className="flex gap-4 border border-ink p-5 offset-sky-sm print:shadow-none">
                <span className="relative shrink-0">
                  <IconTile name={f.icon} size={40} className="h-16 w-16 bg-sky-100 print:bg-white" />
                  <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center bg-ink text-xs font-bold text-sky">
                    {i + 1}
                  </span>
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink">{f.title}</span>
                  <span className="mt-1.5 block text-[15px] leading-7 text-ink">{f.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[15px] leading-7 text-ink">
            Spotted one in your quote? Send it to us and we&apos;ll tell you what&apos;s really in it, free.{" "}
            <Link href="/offers/second-opinion" className="font-bold text-sky-700 underline">
              Get a free second opinion
            </Link>{" "}
            or call{" "}
            <a href={PHONE_HREF} className="font-bold text-sky-700 underline">
              {PHONE}
            </a>
            .
          </p>
        </Container>
      </section>
    </FunnelShell>
  );
}
