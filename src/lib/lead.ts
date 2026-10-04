/*
 * Short lead form (name, phone, email, service) used on every inner page.
 * Shared by <LeadForm> (browser checks) and /api/leads (the real check). No server-only imports.
 */

import { EMAIL, LIMITS, normalizePhone, type Errors, type Option } from "@/lib/quote";

export const LEAD_SERVICES: Option[] = [
  ["local-move", "Local move"],
  ["same-day-move", "Same-day / last-minute move"],
  ["apartment-move", "Apartment or condo move"],
  ["moving-labor", "Moving labor only (I have a truck)"],
  ["move-and-junk", "Move + junk haul-away"],
  ["junk-removal", "Junk removal"],
  ["garage-cleanout", "Garage cleanout"],
  ["estate-cleanout", "Estate cleanout"],
  ["other", "Something else"],
].map(([value, label]) => ({ value, label }));

export type LeadPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  details: string;
  /** Page the form was sent from, so the office knows which page converted. */
  page: string;
  /** Honeypot: must stay empty. */
  company: string;
};

export const LEAD_DETAILS_LIMIT = 1500;

export function validateLead(input: unknown): Errors {
  const e: Errors = {};
  const q = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof q[k] === "string" ? (q[k] as string).trim() : "");

  const first = str("firstName");
  if (!first) e.firstName = "Enter your first name.";
  else if (first.length > LIMITS.nameLength) e.firstName = "That name is too long.";
  const last = str("lastName");
  if (!last) e.lastName = "Enter your last name.";
  else if (last.length > LIMITS.nameLength) e.lastName = "That name is too long.";
  if (!normalizePhone(str("phone"))) e.phone = "Enter a 10-digit US phone number.";
  const email = str("email");
  if (!EMAIL.test(email) || email.length > 254) e.email = "Enter a valid email address.";
  if (!LEAD_SERVICES.some((o) => o.value === q.service)) e.service = "Pick what you need help with.";
  if (str("details").length > LEAD_DETAILS_LIMIT) e.details = `Keep it under ${LEAD_DETAILS_LIMIT} characters.`;
  if (str("page").length > 200) e.page = "Invalid page.";
  return e;
}
