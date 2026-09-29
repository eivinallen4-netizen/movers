import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, PHONE, PHONE_HREF } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms and Conditions | Movers and Junk Removal",
  description: "Terms for using the Movers and Junk Removal website and its quote tools.",
  path: "/terms",
});

// TODO: have this reviewed before launch, and link your actual service agreement if you use one.
export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms" updated="September 27, 2026">
      <p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>
      <h2>Estimates and quotes</h2>
      <p>
        Prices shown on this website, including the moving cost calculator and cost guides, are general estimates for planning only
        and are not an offer or a binding quote. Your price is confirmed with you directly, upfront, before any work begins.
      </p>
      <h2>Booking and services</h2>
      <p>
        Moving and junk removal services are provided under the terms we agree with you when you book. Those terms control if they
        differ from anything on this website.
      </p>
      <h2>Your information</h2>
      <p>
        You agree that the information you send us is accurate. See our <a href="/privacy">Privacy Policy</a> for how we use it.
      </p>
      <h2>Website content</h2>
      <p>
        All content on this site belongs to {BUSINESS}. Guides and checklists are provided for general information and can be printed
        for personal use.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is.&rdquo; We aren&apos;t liable for decisions made based on general information on this site.
      </p>
      <h2>Questions</h2>
      <p>
        Call us at <a href={PHONE_HREF}>{PHONE}</a>.
      </p>
    </LegalPage>
  );
}
