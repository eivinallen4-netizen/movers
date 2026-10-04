/*
 * ⚠️  BALLPARK NUMBERS: SET THESE TO YOUR REAL RATES BEFORE LAUNCH.
 *
 * Used by the moving cost calculator (/free-tools/moving-cost-calculator) and the junk removal
 * cost guide. They're typical Las Vegas local ranges, shown to visitors as estimates only.
 * The site always says "exact price given upfront before we start".
 */

/** Price per mover, per hour (low / high). */
export const HOURLY_PER_MOVER = { low: 55, high: 70 };

/** Flat truck + travel fee added to every move (low / high). */
export const TRUCK_FEE = { low: 99, high: 149 };

/** Typical crew size and on-site hours (load + unload) by home size. */
export const HOME_SIZES = [
  { value: "studio", label: "Studio", crew: 2, hours: [2, 3] },
  { value: "1br", label: "1 bedroom", crew: 2, hours: [3, 4] },
  { value: "2br", label: "2 bedrooms", crew: 3, hours: [3.5, 5] },
  { value: "3br", label: "3 bedrooms", crew: 3, hours: [5, 7] },
  { value: "4br", label: "4+ bedrooms", crew: 4, hours: [6, 9] },
] as const;

/** Drive time between the two addresses, one way. */
export const DISTANCES = [
  { value: "same-area", label: "Same neighborhood (under 5 mi)", hours: 0.25 },
  { value: "across-town", label: "Across town (5–15 mi)", hours: 0.5 },
  { value: "across-valley", label: "Across the valley (15–30 mi)", hours: 0.75 },
] as const;

/** Extra time for stairs, as a share of on-site hours. */
export const STAIRS = [
  { value: "none", label: "No stairs / elevator", factor: 0 },
  { value: "one", label: "Stairs at one place", factor: 0.15 },
  { value: "both", label: "Stairs at both places", factor: 0.3 },
] as const;

/** Extra on-site hours for packing help. */
export const PACKING = [
  { value: "none", label: "I'll pack everything", hours: 0 },
  { value: "some", label: "Help with the kitchen / fragile stuff", hours: 1.5 },
  { value: "full", label: "Pack the whole home", hours: 4 },
] as const;

/** Junk haul-away add-on, by how much truck space it takes. */
export const JUNK_LOADS = [
  { value: "none", label: "None", low: 0, high: 0 },
  { value: "few", label: "A few items", low: 100, high: 200 },
  { value: "quarter", label: "About a quarter truck", low: 200, high: 325 },
  { value: "half", label: "About half a truck", low: 350, high: 500 },
  { value: "full", label: "A full truck", low: 550, high: 800 },
] as const;

/** Typical single-item and load prices for the junk removal cost guide. */
export const JUNK_ITEM_PRICES: { item: string; range: string }[] = [
  { item: "Single couch or loveseat", range: "$100 – $175" },
  { item: "Sectional sofa", range: "$150 – $250" },
  { item: "Mattress + box spring", range: "$100 – $175" },
  { item: "Refrigerator or freezer", range: "$125 – $200" },
  { item: "Washer or dryer (each)", range: "$100 – $150" },
  { item: "Hot tub (small, drained)", range: "$350 – $600" },
  { item: "Treadmill or elliptical", range: "$125 – $200" },
];

export const JUNK_LOAD_PRICES: { load: string; covers: string; range: string }[] = [
  { load: "Minimum / a few items", covers: "1–3 pieces of furniture or a few bags", range: "$100 – $200" },
  { load: "Quarter truck", covers: "A room's worth, small garage corner", range: "$200 – $325" },
  { load: "Half truck", covers: "Half a garage, a small apartment", range: "$350 – $500" },
  { load: "Full truck", covers: "Full garage, most of a house", range: "$550 – $800" },
];
