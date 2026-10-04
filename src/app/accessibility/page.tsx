import { LegalPage } from "@/components/LegalPage";
import { PHONE, PHONE_HREF } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Website Accessibility | Movers and Junk Removal",
  description: "Our commitment to making this website usable for everyone, and how to reach us if something doesn't work for you.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage title="Website Accessibility" path="/accessibility" updated="September 27, 2026">
      <p>
        We want everyone to be able to get a quote and learn about our services, including people who use screen readers, keyboard
        navigation, magnification or other assistive technology.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>We aim to meet WCAG 2.1 Level AA.</li>
        <li>Text and buttons use color combinations that meet AA contrast ratios.</li>
        <li>Forms have labels, clear error messages and work with a keyboard.</li>
        <li>Images have text descriptions, and pages use a logical heading structure.</li>
      </ul>
      <h2>Need help?</h2>
      <p>
        If anything on this site is hard to use, call us at <a href={PHONE_HREF}>{PHONE}</a> and we&apos;ll help you directly and fix
        the problem.
      </p>
    </LegalPage>
  );
}
