import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, PHONE, PHONE_HREF } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Movers and Junk Removal",
  description: "How Movers and Junk Removal collects, uses and protects the information you share when you request a quote.",
  path: "/privacy",
});

// TODO: have this reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="September 27, 2026">
      <p>
        {BUSINESS} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy explains what we collect when you use this
        website and how we use it.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Information you give us in a quote or contact form: your name, phone number, email, addresses, move details, notes and any photos you upload.</li>
        <li>Basic technical information your browser sends, such as IP address and device type, used to keep the site secure and working.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To contact you about your quote and schedule your move or junk removal by phone, text or email.</li>
        <li>To prepare an accurate price and plan the job.</li>
        <li>To keep records of the work we do for you.</li>
        <li>To prevent spam and abuse of our forms.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>Who we share it with</h2>
      <p>
        We use trusted service providers to run our business, for example our scheduling and customer management software, database
        hosting, photo storage and address lookup. They only use your information to provide those services to us.
      </p>
      <h2>Texts and calls</h2>
      <p>
        When you send a form, you agree we can call, text or email you about your request. Message and data rates may apply. Reply STOP
        to any text to opt out.
      </p>
      <h2>Your choices</h2>
      <p>
        To see, correct or delete the information we have about you, call <a href={PHONE_HREF}>{PHONE}</a>.
      </p>
      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
