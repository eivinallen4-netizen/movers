import Link from "next/link";
import { BUSINESS } from "@/content/site";

/*
 * The one SMS opt-in checkbox, shared by every form that asks for a phone number.
 * Carriers (CTIA / A2P 10DLC) check this wording when approving the texting number, so keep it
 * identical everywhere: unchecked by default, optional, brand name, what we send, frequency,
 * rates, STOP/HELP, and links to the SMS terms and privacy policy. If it changes here, change the
 * "Text messages" section in /terms and /privacy to match.
 */
export function SmsConsent({
  checked,
  onChange,
  tone = "light",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const link = dark ? "underline hover:text-sky" : "font-semibold text-sky-700 underline";
  return (
    <label
      className={`flex cursor-pointer items-start gap-2.5 text-[11px] leading-4 ${dark ? "text-white/75" : "text-ink-600"}`}
    >
      <input
        type="checkbox"
        name="smsConsent"
        checked={checked}
        onChange={(ev) => onChange(ev.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-sky"
      />
      <span>
        <strong className={dark ? "text-white" : "text-ink"}>Optional: text me about my quote.</strong> I agree to get texts
        from {BUSINESS} at the number above about my quote and job, like pricing, scheduling and arrival updates. Msg
        frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent isn&apos;t a
        condition of purchase. See our{" "}
        <Link href="/terms#sms" className={link}>
          SMS Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}

/** Line under a form's submit button: sending the form accepts the terms and allows calls and emails about it. */
export function FormAgreement({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const link = dark ? "underline hover:text-sky" : "underline hover:text-sky-700";
  return (
    <p className={`text-[11px] leading-4 ${dark ? "text-white/70" : "text-ink-600"} ${className}`}>
      By sending this form you agree to our{" "}
      <Link href="/terms" className={link}>
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className={link}>
        Privacy Policy
      </Link>
      , and that we may call or email you about your request.
    </p>
  );
}
