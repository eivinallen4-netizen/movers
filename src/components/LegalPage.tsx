import type { ReactNode } from "react";
import { SiteShell } from "./site";
import { Breadcrumbs, Container } from "./ui";

/* Plain text page for legal/policy content. Have a lawyer review the copy before launch. */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <SiteShell>
      <section className="bg-ink pb-10 pt-8 text-white">
        <Container>
          <Breadcrumbs trail={[{ label: title, href: path }]} />
          <h1 className="mt-6 text-4xl font-bold">{title}</h1>
          <p className="mt-3 text-sm text-white/70">Last updated {updated}</p>
        </Container>
      </section>
      <Container className="py-12 lg:py-16">
        <div className="max-w-[780px] space-y-5 text-[15px] leading-7 text-ink [&_a]:font-semibold [&_a]:text-sky-700 [&_a]:underline [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </Container>
    </SiteShell>
  );
}
