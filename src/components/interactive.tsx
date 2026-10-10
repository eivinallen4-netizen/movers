"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Chevron, Phone } from "./icons";
import { MediaFill, hasMedia, type ResolvedMedia } from "./media-fill";
import { beforeAfterSrc, type BeforeAfterPair } from "@/content/before-after";

/* ---------- Mobile navigation toggle ---------- */
type MenuLink = { label: string; href: string; children?: { label: string; href: string }[] };

export function MobileMenu({
  links,
  phone,
  phoneHref,
  quoteHref,
}: {
  links: MenuLink[];
  phone: string;
  phoneHref: string;
  quoteHref: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="xl:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="-mr-2 flex h-12 w-12 flex-col items-center justify-center gap-1.5"
      >
        <span className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full z-40 border-t border-white/10 bg-ink shadow-lg">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-6 sm:px-6">
            <ul className="divide-y divide-white/10">
              {links.map((l) =>
                l.children ? (
                  <li key={l.href}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-bold uppercase tracking-wide text-white hover:text-sky [&::-webkit-details-marker]:hidden">
                        {l.label}
                        <span aria-hidden className="text-xl leading-none text-sky transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <ul className="pb-4 pl-3">
                        {[{ label: `All ${l.label}`, href: l.href }, ...l.children].map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} onClick={close} className="block py-2 text-sm font-semibold text-white/85 hover:text-sky">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="block py-4 text-sm font-bold uppercase tracking-wide text-white hover:text-sky"
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            {/* Header CTAs are hidden below md, so phones get them here */}
            <div className="mt-2 grid gap-3 sm:grid-cols-2 md:hidden">
              <a
                href={quoteHref}
                onClick={close}
                className="flex h-12 items-center justify-center bg-sky text-sm font-bold uppercase text-ink"
              >
                Free Quote
              </a>
              <a
                href={phoneHref}
                className="flex h-12 items-center justify-center gap-2 bg-white text-sm font-bold text-ink"
              >
                <Phone width={16} height={16} /> {phone}
              </a>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

function Silhouette() {
  return (
    <svg viewBox="0 0 100 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
      <circle cx="50" cy="62" r="20" fill="#fff" opacity=".35" />
      <path d="M14 160c0-34 16-52 36-52s36 18 36 52z" fill="#fff" opacity=".35" />
    </svg>
  );
}

/* ---------- Flat-fee accordion ---------- */
export function Accordion({ items }: { items: { title: string; points: string[] }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-4">
      {items.map((item, i) => (
        <div key={item.title} className="py-3">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-start justify-between gap-4 text-left text-lg font-semibold text-ink"
            aria-expanded={open === i}
          >
            {item.title}
            <Chevron open={open === i} className="mt-1 shrink-0" />
          </button>
          {open === i && (
            <ul className="mt-4 space-y-3">
              {item.points.map((p) => (
                <li key={p} className="flex gap-2 text-[15px] text-ink">
                  <Check className="mt-1 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Paged review cards ---------- */
export function ReviewPager({ pages }: { pages: ReactNode[][] }) {
  const [page, setPage] = useState(0);
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-9 md:gap-y-10">{pages[page]}</div>
      <div className="mt-12 flex justify-center gap-3">
        {pages.length > 1 && pages.map((_, i) => (
          <button
            key={i}
            aria-label={`Reviews page ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-3 w-3 rounded-full ${i === page ? "bg-sky" : "bg-ink-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Photo strip with arrows ---------- */
export function PhotoStrip({ items }: { items: ResolvedMedia[] }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  return (
    <div className="relative">
      <div ref={track} className="no-scrollbar flex gap-2 overflow-x-auto">
        {items.map((m, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] w-[46%] shrink-0 overflow-hidden rounded-md sm:w-[23%] lg:w-[15.8%]"
            style={{ background: m.tone }}
          >
            {hasMedia(m) ? <MediaFill media={m} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 23vw, 46vw" /> : <Silhouette />}
          </div>
        ))}
      </div>
      <button
        aria-label="Previous photos"
        onClick={() => scroll(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-5xl font-light text-white"
      >
        ‹
      </button>
      <button
        aria-label="Next photos"
        onClick={() => scroll(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-5xl font-light text-white"
      >
        ›
      </button>
    </div>
  );
}

/* ---------- Before / after slider ---------- */
export function BeforeAfter({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pair = pairs[active];
  const sizes = "(min-width: 1024px) 760px, 100vw";
  const select = (i: number) => {
    setActive(i);
    setPos(50);
    // Keep the active room pill visible in the horizontally scrolling row on mobile.
    const tab = tabsRef.current?.children[i] as HTMLElement | undefined;
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };
  return (
    <div>
      <div className="relative aspect-[3/2] select-none overflow-hidden rounded-lg bg-ink-200 offset-sky">
        <Image src={beforeAfterSrc(pair.key, "after")} alt={pair.after} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={beforeAfterSrc(pair.key, "before")} alt={pair.before} fill sizes={sizes} className="object-cover" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-sky px-2 py-1 text-xs font-bold uppercase tracking-wide text-ink">
          After
        </span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-bold text-ink shadow-lg">
            ‹›
          </span>
        </div>
        {/* A native range input drives the divider: free touch, mouse and keyboard support. */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${pair.room}: drag to compare before and after`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span
          key={pair.key}
          aria-live="polite"
          className="pointer-events-none absolute bottom-3 left-3 animate-[fade-in_300ms_ease-out] rounded bg-ink/80 px-2.5 py-1 text-xs font-bold tracking-wide text-white"
        >
          {active + 1} / {pairs.length} · {pair.room}
        </span>
      </div>
      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {pairs.map((p, i) => (
          <button
            key={p.key}
            tabIndex={-1}
            onClick={() => select(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-2 bg-ink-200 hover:bg-ink/40"}`}
          />
        ))}
      </div>
      <div ref={tabsRef} className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap">
        {pairs.map((p, i) => (
          <button
            key={p.key}
            onClick={() => select(i)}
            aria-pressed={i === active}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              i === active ? "bg-ink text-white" : "bg-ink-200/60 text-ink hover:bg-ink-200"
            }`}
          >
            {p.room}
          </button>
        ))}
      </div>
    </div>
  );
}
