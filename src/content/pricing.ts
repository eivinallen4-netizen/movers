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

/**
 * Typical crew size and on-site hours (load + unload) by home size.
 * `base` is the calculator's flat price: no stairs, under 25 miles, no packing.
 */
export const HOME_SIZES = [
  { value: "studio", label: "Studio", crew: 2, hours: [2, 3], base: 300 },
  { value: "1br", label: "1 bedroom", crew: 2, hours: [3, 4], base: 400 },
  { value: "2br", label: "2 bedrooms", crew: 3, hours: [3.5, 5], base: 600 },
  { value: "3br", label: "3 bedrooms", crew: 3, hours: [5, 7], base: 850 },
  { value: "4br", label: "4+ bedrooms", crew: 4, hours: [6, 9], base: 1200 },
] as const;

/** Distance between the two addresses: flat fee added on top of the base price. */
export const DISTANCES = [
  { value: "under-25", label: "Under 25 miles", hours: 0.5, fee: 0 },
  { value: "over-25", label: "Over 25 miles", hours: 1, fee: 50 },
] as const;

/** Flat fee per staircase (flight of stairs), counted across both homes. */
export const STAIRS_FEE = 50;
export const STAIRS = [
  { value: "0", label: "No stairs / elevator", count: 0 },
  { value: "1", label: "1 staircase", count: 1 },
  { value: "2", label: "2 staircases", count: 2 },
  { value: "3", label: "3 staircases", count: 3 },
  { value: "4", label: "4+ staircases", count: 4 },
] as const;

/** Packing help, as a share of the base price. */
export const PACKING = [
  { value: "none", label: "I'll pack everything", share: 0 },
  { value: "some", label: "Help with the kitchen / fragile stuff", share: 0.25 },
  { value: "full", label: "Pack the whole home", share: 0.6 },
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
