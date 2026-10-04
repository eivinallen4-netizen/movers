import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../public/logo white.png";
import { ArrowUpRight, Building, Mail, Phone } from "./icons";
import { MobileMenu } from "./interactive";
import { Container } from "./ui";
import { DOMAIN, FOOTER, LEGAL_LINKS, NAV, PHONE, PHONE_HREF } from "@/content/site";

/*
 * Page chrome shared by every public page: announcement bar, header with menus, footer.
 * `quoteHref` is where the header's "Free Quote" button goes: the home hero form (#quote)
 * or the quote card every inner page carries (#get-quote).
 */
export function SiteShell({ children, quoteHref = "#get-quote" }: { children: ReactNode; quoteHref?: string }) {
  return (
    <main className="overflow-x-hidden">
      <AnnouncementBar />
      <Header quoteHref={quoteHref} />
      {children}
      <Footer />
    </main>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-sky-100 px-4 py-2 text-center text-xs leading-5 text-ink print:hidden">
      Booked last minute? We&apos;ve got you. Same-day moves &amp; junk pickup across the valley.{" "}
      <a href={PHONE_HREF} className="font-semibold text-sky-700">
        Call {PHONE}
      </a>
    </div>
  );
}

function Header({ quoteHref }: { quoteHref: string }) {
  return (
    <header className="relative z-40 bg-ink print:hidden">
      {/* Wider than Container so logo, six links and both CTAs never crowd each other */}
      <div className="mx-auto flex h-20 w-full max-w-[1320px] items-center justify-between gap-8 px-4 sm:px-6 lg:h-24">
        <Link href="/" className="flex items-center" aria-label="Movers and Junk Removal home">
          <Image src={logoWhite} alt="Movers and Junk Removal" preload className="h-12 w-auto lg:h-14" />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-7 self-stretch xl:flex">
          {NAV.map((n) => (
            <div key={n.href} className="group relative flex h-full items-center">
              <Link
                href={n.href}
                className="whitespace-nowrap py-2 text-[13px] font-bold uppercase tracking-wide text-white transition hover:text-sky"
              >
                {n.label}
              </Link>
              {n.children && (
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 border border-ink bg-white py-2 opacity-0 offset-sky-sm transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <Link href={n.href} className="block px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-sky-700 hover:bg-sky-100">
                    All {n.label}
                  </Link>
                  {n.children.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm font-semibold text-ink hover:bg-sky-100">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={quoteHref}
            className="hidden h-12 items-center gap-2 whitespace-nowrap bg-sky px-5 text-[13px] font-bold uppercase text-ink transition hover:bg-sky-600 md:flex"
          >
            Free Quote <ArrowUpRight />
          </a>
          <a
            href={PHONE_HREF}
            className="hidden h-12 flex-col justify-center whitespace-nowrap bg-white px-4 text-ink transition hover:bg-sky-100 md:flex"
          >
            <span className="flex items-center gap-2 text-sm font-bold leading-none">
              <Phone width={14} height={14} /> {PHONE}
            </span>
            <span className="mt-1 text-[10px] font-semibold leading-none text-ink-600">Talk to a real local person</span>
          </a>
          <MobileMenu links={NAV} phone={PHONE} phoneHref={PHONE_HREF} quoteHref={quoteHref} />
        </div>
      </div>
    </header>
  );
}

function FooterCol({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-base font-bold uppercase text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {FOOTER[title].map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/90 hover:text-sky">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink pb-12 pt-16 text-white print:hidden">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-8">
            <FooterCol title="Moving" />
            <FooterCol title="Service Areas" />
          </div>
          <div className="space-y-8">
            <FooterCol title="Junk Removal" />
            <FooterCol title="Free Tools" />
          </div>
          <FooterCol title="Resources" />
          <FooterCol title="Company" />
        </div>
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Map of Las Vegas, NV service area"
            src="https://maps.google.com/maps?q=Las%20Vegas%2C%20NV&z=11&output=embed"
            className="block h-64 w-full sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="mt-14 grid items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex justify-center lg:justify-start">
            <Image src={logoWhite} alt="Movers and Junk Removal" className="h-20 w-auto" />
          </div>
          <div className="text-[11px] leading-4">
            <p>
              © {new Date().getFullYear()} Movers and Junk Removal.
              <br />
              All Rights Reserved.
            </p>
            <p className="mt-3">
              Moving Shouldn&apos;t Be a Headache.
              <br />
              God First.
            </p>
          </div>
          <div className="space-y-3 text-xs font-bold">
            <p className="flex gap-2">
              <Building className="shrink-0" /> Serving Las Vegas, Henderson, Summerlin &amp; the whole valley
            </p>
            <a href={PHONE_HREF} className="flex gap-2 hover:text-sky">
              <Phone className="shrink-0" /> {PHONE}
            </a>
            <Link href="/contact" className="flex gap-2 hover:text-sky">
              <Mail className="shrink-0" /> {DOMAIN}
            </Link>
          </div>
          <div className="space-y-2 text-[11px]">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="block hover:text-sky">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
