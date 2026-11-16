import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, DOMAIN, LEGAL_NAME, PHONE, PHONE_HREF, PRIVACY_EMAIL } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms and Conditions | Movers and Junk Removal",
  description: "Terms for using the Movers and Junk Removal website, its quote tools and our text messages.",
  path: "/terms",
});

const UPDATED = "November 15, 2026";

/*
 * The "Text messages" section is the SMS program terms carriers check when approving our texting
 * number (CTIA / A2P 10DLC). Keep it in step with <SmsConsent> and the privacy policy.
 * Moving jobs themselves run on the written agreement the customer signs when booking.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" path="/terms" updated={UPDATED}>
      <p>
        These terms cover your use of {DOMAIN}, its quote forms and tools, and the text messages we send. The site is run by{" "}
        {LEGAL_NAME} (&ldquo;{BUSINESS},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the site you agree to these terms. If
        you don&apos;t agree, please don&apos;t use it.
      </p>

      <h2>Estimates and quotes</h2>
      <p>
        Prices on this website, including the moving cost calculator, cost guides and offers, are general estimates for planning. They
        aren&apos;t a binding quote. Your price is confirmed with you directly, upfront, before any work begins. Offers shown on the
        site may have their own conditions, which we&apos;ll explain when we confirm your price.
      </p>

      <h2>Booking and services</h2>
      <p>
        Moving and junk removal services are provided under the written agreement and terms we give you when you book. If those terms
        differ from anything on this website, the booking terms control. Nothing on this site changes the rights you have under
        Nevada law as a moving customer.
      </p>

      <h2>Calls and emails</h2>
      <p>
        When you send one of our forms, you agree that we may call or email you about that request, including to give you a price and
        schedule the job. These are not marketing calls. Ask us at any time and we&apos;ll stop.
      </p>

      <h2 id="sms">Text messages (SMS terms)</h2>
      <ul>
        <li>
          <strong>Program:</strong> {BUSINESS} customer texts. If you opt in, we text you about your quote and job: pricing,
          scheduling, reminders and arrival updates. We don&apos;t send marketing texts through this program.
        </li>
        <li>
          <strong>How to opt in:</strong> check the optional SMS box on one of our forms. Agreeing to texts is never required to get a
          quote or hire us.
        </li>
        <li>
          <strong>Message frequency</strong> varies, based on your quote and job.
        </li>
        <li>
          <strong>Message and data rates may apply.</strong> Check your mobile plan for details.
        </li>
        <li>
          <strong>To stop:</strong> reply <strong>STOP</strong> to any text. We&apos;ll send one message confirming you&apos;re
          unsubscribed, and then no more texts unless you opt in again.
        </li>
        <li>
          <strong>For help:</strong> reply <strong>HELP</strong> to any text, or call us at <a href={PHONE_HREF}>{PHONE}</a>.
        </li>
        <li>
          Carriers aren&apos;t liable for delayed or undelivered messages.
        </li>
        <li>
          You must be 18 or older and the account holder for the phone number, or have the account holder&apos;s permission, to opt
          in. If you change or give up your number, reply STOP first or let us know.
        </li>
        <li>
          See our <a href="/privacy#sms">Privacy Policy</a> for how we handle your information. We don&apos;t share your mobile number
          or opt-in with anyone for marketing.
        </li>
      </ul>

      <h2>Your information and photos</h2>
      <p>
        You agree that the information you send us is accurate and that you have the right to share it. Your photos stay yours. By
        uploading them, you let us use them to prepare your quote, plan and carry out the job, and keep records of it. We won&apos;t use
        your photos in our advertising without asking you first. See our <a href="/privacy">Privacy Policy</a> for how we handle your
        information.
      </p>

      <h2>Using the site</h2>
      <p>
        Please don&apos;t misuse the site. That includes sending false or spam requests, using bots or scrapers, trying to get into
        parts of the site or our systems you aren&apos;t meant to, or uploading anything unlawful, harmful or that you don&apos;t have
        the right to share.
      </p>

      <h2>Website content</h2>
      <p>
        The content on this site, including text, photos, logos and tools, belongs to {LEGAL_NAME} or is used with permission. You can
        print our guides and checklists for your own personal use. Please don&apos;t copy or republish them without our permission.
      </p>
      <p>
        Guides, checklists and cost information are general information to help you plan. They aren&apos;t legal, financial or other
        professional advice.
      </p>

      <h2>Other websites</h2>
      <p>
        The site links to other websites, such as review sites and social media, and uses tools from other companies. We aren&apos;t
        responsible for their content or practices.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We work to keep it accurate and running, but we
        don&apos;t promise it will always be error-free or available. To the fullest extent the law allows, we aren&apos;t liable for
        indirect or consequential losses from using the website, and our total liability for anything related to your use of the
        website is limited to $100. This section is about the website only. Our responsibility for your belongings and the work we do
        is set by your booking agreement and Nevada law, and nothing here limits rights you have that can&apos;t be waived by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Nevada. Any dispute about them will be handled in the state or federal
        courts in Clark County, Nevada.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. We&apos;ll post the new version here and update the date at the top. Using the site after a change
        means you accept the updated terms.
      </p>

      <h2>Contact us</h2>
      <p>
        {LEGAL_NAME}
        <br />
        Las Vegas, Nevada
        <br />
        Phone: <a href={PHONE_HREF}>{PHONE}</a>
        {PRIVACY_EMAIL && (
          <>
            <br />
            Email: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
          </>
        )}
      </p>
    </LegalPage>
  );
}
