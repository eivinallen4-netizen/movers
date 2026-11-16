import { LegalPage } from "@/components/LegalPage";
import { BUSINESS, DOMAIN, LEGAL_NAME, PHONE, PHONE_HREF, PRIVACY_EMAIL } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Movers and Junk Removal",
  description:
    "What Movers and Junk Removal collects when you request a quote or get our texts, how we use and share it, and your choices.",
  path: "/privacy",
});

const UPDATED = "November 15, 2026";

/*
 * Written to cover: Nevada NRS 603A.340 (online privacy notice + sale opt-out), California CalOPPA
 * (applies to any site California residents use), the FTC Act (no promises we don't keep), and the
 * privacy wording carriers check before approving a business texting number (CTIA / A2P 10DLC).
 * If a tracking script, form field or service provider is added, add it here too.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated={UPDATED}>
      <p>
        This policy explains how {LEGAL_NAME} (&ldquo;{BUSINESS},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses and
        shares information when you use {DOMAIN}, fill out one of our forms, or get text messages from us. We&apos;re a local moving
        and junk removal company in Las Vegas, Nevada.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you request a quote or claim an offer, we collect what you type or upload:
      </p>
      <ul>
        <li>Your name, phone number and email address.</li>
        <li>Pickup and drop-off addresses, move date, move size, stairs or elevator details, and the rooms and items you list.</li>
        <li>Photos you upload, including photos of a quote from another company, and any notes you add.</li>
        <li>How you heard about us, and whether you agreed to get text messages.</li>
      </ul>
      <p>
        <strong>Information collected automatically.</strong> When you visit the site, your browser sends things like your IP address,
        browser and device type, the pages you view, the site that sent you here, and ad tracking details in the link you clicked (for
        example, a campaign name or click ID). Some of this is collected with cookies and similar tools, explained below.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To prepare your price, plan the job and send the right crew.</li>
        <li>To contact you about your request by phone or email, and by text if you opted in.</li>
        <li>To schedule, confirm and carry out your move or junk removal, and keep records of the work.</li>
        <li>To see which pages and ads bring in customers, so we can improve the site and our advertising.</li>
        <li>To keep the site secure and stop spam and abuse of our forms.</li>
        <li>To follow the law and protect our rights.</li>
      </ul>

      <h2 id="sms">Text messages</h2>
      <p>
        We only send text messages if you check the optional SMS box on one of our forms. You don&apos;t have to agree to texts to get a
        quote or hire us. Texts are about your quote and job: pricing, scheduling, reminders and arrival updates. Message frequency
        varies. Message and data rates may apply. Reply <strong>STOP</strong> to any text to opt out, or <strong>HELP</strong> for
        help. See the <a href="/terms#sms">SMS Terms</a> for details.
      </p>
      <p>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging
          opt-in data and consent are excluded from all sharing described in this policy and will not be shared with any third
          parties.
        </strong>{" "}
        The only exception is the service providers that help us send and manage texts for you, such as our scheduling software, who
        may use it only to provide that service.
      </p>

      <h2>Cookies, analytics and ads</h2>
      <p>We use these tools on the site:</p>
      <ul>
        <li>
          <strong>Vercel Web Analytics</strong> and <strong>Ahrefs Web Analytics</strong>, to count visits and see which pages
          people use.
        </li>
        <li>
          <strong>Meta Pixel</strong> (Facebook and Instagram), to measure our ads and show ads to people who visited our site. Meta
          may use cookies and collect information about your activity on our site and on other websites over time. Meta&apos;s use
          of that information is covered by{" "}
          <a href="https://www.facebook.com/privacy/policy/" rel="noopener noreferrer" target="_blank">
            Meta&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Google Maps</strong>, for the service area map. Google may set its own cookies when the map loads.
        </li>
        <li>
          <strong>Offer timer</strong>: some special-offer pages remember the date of your first visit (in a cookie of our own and
          in your browser&apos;s storage) so the countdown shows how long your offer price is held. It holds only that date and is
          deleted after 60 days.
        </li>
      </ul>
      <p>
        <strong>Your choices:</strong> you can block or delete cookies in your browser settings. You can control the ads Meta shows you
        in your{" "}
        <a href="https://accountscenter.facebook.com/ad_preferences" rel="noopener noreferrer" target="_blank">
          Meta ad preferences
        </a>{" "}
        and opt out of interest-based ads from many companies at{" "}
        <a href="https://optout.aboutads.info/" rel="noopener noreferrer" target="_blank">
          optout.aboutads.info
        </a>
        . If your browser sends a <strong>Global Privacy Control</strong> signal, we don&apos;t load the Meta Pixel. Our site
        doesn&apos;t respond to &ldquo;Do Not Track&rdquo; signals, because there&apos;s no common standard for them.
      </p>

      <h2>Who we share it with</h2>
      <p>
        <strong>We do not sell your personal information.</strong> We share it only:
      </p>
      <ul>
        <li>
          With service providers who help us run the business, and only so they can do that work for us: our scheduling and customer
          management software (Housecall Pro), website hosting (Vercel), our database (Turso), photo storage (Cloudinary) and address
          lookup (Geoapify or Photon). The address you type is sent to the lookup service to suggest matches.
        </li>
        <li>With the analytics and advertising tools listed above, through the scripts on our site.</li>
        <li>When the law requires it, or to protect the safety, rights or property of our customers, our crew or the public.</li>
        <li>With a buyer or successor if our business is sold or merged, under the same protections in this policy.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep quote and job records as long as we need them to serve you, handle any claims, and meet tax, accounting and legal
        requirements. After that we delete them. You can ask us to delete your information sooner (see below).
      </p>

      <h2>How we protect it</h2>
      <p>
        We use reasonable security measures to protect your information, including encrypted connections (HTTPS) and access limited to
        the people who need it. No website or system is completely secure, so we can&apos;t promise that information will never be
        lost or misused.
      </p>

      <h2>Your choices and rights</h2>
      <ul>
        <li>
          <strong>See, correct or delete your information:</strong> contact us using the details below. We may need to confirm
          it&apos;s really you first. We&apos;ll reply within 45 days.
        </li>
        <li>
          <strong>Stop texts:</strong> reply STOP to any text, or ask us. Stopping texts won&apos;t cancel a booked job.
        </li>
        <li>
          <strong>Stop calls or emails:</strong> tell us and we&apos;ll stop, apart from messages needed for a job you&apos;ve booked.
        </li>
      </ul>
      <p>
        <strong>Nevada residents:</strong> we don&apos;t sell covered information as defined by Nevada law (NRS 603A). You can still
        send us a request to opt out of any future sale at{" "}
        {PRIVACY_EMAIL ? <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> : "the contact details below"}, and we&apos;ll
        confirm it within 60 days.
      </p>
      <p>
        Residents of some other states have privacy rights under their state&apos;s law. Contact us and we&apos;ll honor any rights
        that apply to you.
      </p>

      <h2>Children</h2>
      <p>
        This site is for adults arranging a move or junk removal. It isn&apos;t meant for children under 13, and we don&apos;t knowingly
        collect information from them. If you think a child sent us information, contact us and we&apos;ll delete it.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Our site links to other websites, like review sites and social media. Their privacy practices are their own, so please read their
        policies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When we change this policy, we&apos;ll post the new version here and update the date at the top. If a change affects how we use
        information you already gave us, we&apos;ll also post a notice on the site before it takes effect.
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
      <p>This policy is effective as of {UPDATED}.</p>
    </LegalPage>
  );
}
