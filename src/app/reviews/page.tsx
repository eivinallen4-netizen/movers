import { SiteShell } from "@/components/site";
import { PageHero } from "@/components/templates";
import { Container, CtaBand, ReviewCard, ReviewSourceLinks } from "@/components/ui";
import { REVIEWS } from "@/content/reviews";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Reviews | What Las Vegas Customers Say About Our Movers",
  description:
    "Read what Las Vegas, Henderson and Summerlin customers say about our movers and junk removal: on time, careful, honest pricing and no surprises.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <SiteShell>
      <PageHero
        trail={[{ label: "Reviews", href: "/reviews" }]}
        h1="Moving Shouldn't Be a Headache. Here's What Customers Say."
        tagline="On time, careful and honest. Don't take our word for it."
        lead={{ heading: "Ready for a stress-free move?" }}
      />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-9 md:gap-y-10">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={r.text} r={r} i={i % 6} />
            ))}
          </div>
          <ReviewSourceLinks className="mt-10" />
        </Container>
      </section>
      <CtaBand title="Want to be our next 5-star review?" />
    </SiteShell>
  );
}
