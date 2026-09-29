import { createHmac, timingSafeEqual } from "node:crypto";
import type { Address } from "@/lib/quote";

/*
 * Addresses only count if they came from our /api/autocomplete. That route signs each
 * suggestion; /api/quotes and the /quote page re-check the signature. A hand-typed address
 * (or one pasted into the URL) has no valid token, so it's rejected.
 */

let warned = false;
function secret() {
  const s = process.env.ADDRESS_SIGNING_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production" && !warned) {
    warned = true;
    console.warn("[address-token] ADDRESS_SIGNING_SECRET is not set; using an insecure fallback.");
  }
  return "dev-only-address-secret";
}

const canonical = (a: Omit<Address, "token">) =>
  JSON.stringify([a.label, a.street, a.city, a.state, a.zip, a.lat.toFixed(6), a.lon.toFixed(6)]);

export function signAddress(a: Omit<Address, "token">): Address {
  const token = createHmac("sha256", secret()).update(canonical(a)).digest("base64url");
  return { ...a, token };
}

export function verifyAddress(a: unknown): a is Address {
  if (!a || typeof a !== "object") return false;
  const x = a as Address;
  const fieldsOk =
    ["label", "street", "city", "state", "zip", "token"].every((k) => typeof x[k as keyof Address] === "string") &&
    Number.isFinite(x.lat) &&
    Number.isFinite(x.lon);
  if (!fieldsOk) return false;
  const expected = Buffer.from(signAddress(x).token);
  const given = Buffer.from(x.token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Addresses travel from the homepage to /quote as base64url JSON in the `fromRef`/`toRef` params. */
export const encodeAddressRef = (a: Address) => Buffer.from(JSON.stringify(a)).toString("base64url");

export function decodeAddressRef(ref: string | undefined): Address | null {
  if (!ref || ref.length > 2000) return null;
  try {
    const a = JSON.parse(Buffer.from(ref, "base64url").toString("utf8"));
    return verifyAddress(a) ? a : null;
  } catch {
    return null;
  }
}
