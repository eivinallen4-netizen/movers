import { signAddress } from "@/lib/server/address-token";
import { clientIp, rateLimit, tooMany } from "@/lib/server/rate-limit";
import type { Address } from "@/lib/quote";

/*
 * Address suggestions, signed so /api/quotes can tell they came from here.
 * - GEOAPIFY_API_KEY set → Geoapify (free: 3,000 lookups/day, no card).
 * - Not set → Photon by Komoot (free, no key, fair-use only). Fine for dev and light traffic.
 * Results are biased toward Las Vegas and limited to US addresses.
 */

const VEGAS = { lat: 36.1699, lon: -115.1398 };

type Raw = Omit<Address, "token">;

// Photon returns full state names; HouseCall Pro wants the 2-letter code.
const STATES: Record<string, string> = Object.fromEntries(
  (
    "AL Alabama|AK Alaska|AZ Arizona|AR Arkansas|CA California|CO Colorado|CT Connecticut|DE Delaware|DC District of Columbia|" +
    "FL Florida|GA Georgia|HI Hawaii|ID Idaho|IL Illinois|IN Indiana|IA Iowa|KS Kansas|KY Kentucky|LA Louisiana|ME Maine|" +
    "MD Maryland|MA Massachusetts|MI Michigan|MN Minnesota|MS Mississippi|MO Missouri|MT Montana|NE Nebraska|NV Nevada|" +
    "NH New Hampshire|NJ New Jersey|NM New Mexico|NY New York|NC North Carolina|ND North Dakota|OH Ohio|OK Oklahoma|" +
    "OR Oregon|PA Pennsylvania|RI Rhode Island|SC South Carolina|SD South Dakota|TN Tennessee|TX Texas|UT Utah|VT Vermont|" +
    "VA Virginia|WA Washington|WV West Virginia|WI Wisconsin|WY Wyoming"
  )
    .split("|")
    .map((s) => [s.slice(3), s.slice(0, 2)]),
);

async function geoapify(q: string, key: string): Promise<Raw[]> {
  const url = new URL("https://api.geoapify.com/v1/geocode/autocomplete");
  url.search = new URLSearchParams({
    text: q,
    filter: "countrycode:us",
    bias: `proximity:${VEGAS.lon},${VEGAS.lat}`,
    format: "json",
    limit: "6",
    apiKey: key,
  }).toString();
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`Geoapify ${res.status}`);
  const data = (await res.json()) as { results?: Record<string, string | number | undefined>[] };
  return (data.results ?? []).map((r) => ({
    label: String(r.formatted ?? ""),
    street: [r.housenumber, r.street].filter(Boolean).join(" ") || String(r.address_line1 ?? ""),
    city: String(r.city ?? r.town ?? r.village ?? ""),
    state: String(r.state_code ?? r.state ?? ""),
    zip: String(r.postcode ?? ""),
    lat: Number(r.lat),
    lon: Number(r.lon),
  }));
}

// Southern Nevada (Las Vegas valley out to Mesquite, Pahrump, Laughlin). Searched first so local
// addresses aren't crowded out by matches elsewhere in the world.
const SO_NV_BBOX = "-116.05,35.0,-114.0,36.9";
// Lower 48 + Alaska + Hawaii, used as a fallback for long-distance moves.
const US_BBOX = "-179.2,18.9,-66.9,71.4";

type PhotonFeature = { geometry: { coordinates: [number, number] }; properties: Record<string, string | undefined> };

async function photonSearch(q: string, bbox: string): Promise<PhotonFeature[]> {
  const url = new URL("https://photon.komoot.io/api/");
  const params = new URLSearchParams({ q, limit: "10", lang: "en", lat: `${VEGAS.lat}`, lon: `${VEGAS.lon}`, bbox });
  // Only addresses and streets: skip shops, casinos and other points of interest.
  params.append("layer", "house");
  params.append("layer", "street");
  url.search = params.toString();
  const res = await fetch(url, {
    headers: { "User-Agent": "movers-junk-removal-quote-form/1.0" },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Photon ${res.status}`);
  const data = (await res.json()) as { features?: PhotonFeature[] };
  return (data.features ?? []).filter((f) => f.properties.countrycode === "US");
}

async function photon(q: string): Promise<Raw[]> {
  let features = await photonSearch(q, SO_NV_BBOX);
  if (features.length === 0) features = await photonSearch(q, US_BBOX);

  // OpenStreetMap is missing house numbers for many homes. If the customer typed one ("6000 w char…")
  // and we only matched the street, carry their number onto it so they can still pick their address.
  const typedNumber = q.match(/^\s*(\d+[a-z]?)\s+\S/i)?.[1];

  return features
    .filter(({ properties: p }) =>
      p.type === "street"
        ? true
        : // Real addresses only (no unnumbered schools etc.), and the number must match what was typed.
          Boolean(p.housenumber && p.street) &&
          (!typedNumber || p.housenumber!.toLowerCase().startsWith(typedNumber.toLowerCase())),
    )
    .map(({ geometry, properties: p }) => {
      const housenumber = p.housenumber ?? typedNumber;
      const street = [housenumber, p.street ?? p.name].filter(Boolean).join(" ");
      const city = p.city ?? p.district ?? p.county ?? "";
      const state = (p.state && STATES[p.state]) ?? p.state ?? "";
      const label = [street, city, [state, p.postcode].filter(Boolean).join(" ")]
        .filter(Boolean)
        .join(", ");
      return {
        label,
        street,
        city,
        state,
        zip: p.postcode ?? "",
        lat: geometry.coordinates[1],
        lon: geometry.coordinates[0],
      };
    });
}

export async function GET(req: Request) {
  if (!rateLimit(`ac:${clientIp(req)}`, 60, 60_000)) return tooMany();

  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 3 || q.length > 200) return Response.json({ results: [] });

  try {
    const key = process.env.GEOAPIFY_API_KEY;
    const raw = key ? await geoapify(q, key) : await photon(q);
    const seen = new Set<string>();
    const results = raw
      .filter((r) => r.label && Number.isFinite(r.lat) && Number.isFinite(r.lon))
      .filter((r) => !seen.has(r.label) && seen.add(r.label))
      .slice(0, 6)
      .map(signAddress);
    return Response.json({ results }, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (err) {
    console.error("[autocomplete]", err);
    return Response.json({ results: [], error: "Address lookup is unavailable right now." }, { status: 502 });
  }
}
