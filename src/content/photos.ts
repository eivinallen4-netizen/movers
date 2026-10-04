/*
 * Stock photos for the SEO pages (service, service-area and guide pages).
 * Files live in public/media/pages/<key>.jpg. Swap any of them for a real job photo
 * by dropping in a file with the same name; update the alt text to match.
 *
 * Sources: Unsplash (Unsplash License, no credit required) and Flickr via Openverse.
 * The Flickr ones under CC BY / BY-SA must keep their `credit`, which renders under the photo.
 */

export type PagePhoto = {
  src: string;
  alt: string;
  credit?: { author: string; href: string; license: string; licenseHref: string };
};

const BY_SA_2 = { license: "CC BY-SA 2.0", licenseHref: "https://creativecommons.org/licenses/by-sa/2.0/" };
const BY_2 = { license: "CC BY 2.0", licenseHref: "https://creativecommons.org/licenses/by/2.0/" };

const PHOTOS: Record<string, Omit<PagePhoto, "src">> = {
  /* Moving services */
  "moving-local-moving": { alt: "Movers carefully wheeling wrapped furniture out of a home" },
  "moving-same-day-moving": { alt: "Mover loading boxes into a truck with a hand dolly" },
  "moving-last-minute-moving": { alt: "Mover wheeling a tall stack of boxes to a moving van" },
  "moving-apartment-condo-moving": { alt: "Two people carrying boxes and luggage out of an apartment complex" },
  "moving-house-moving": { alt: "Mover carrying boxes up the front steps of a house" },
  "moving-moving-labor": { alt: "Movers pushing loaded hand trucks down the street" },
  "moving-furniture-wrapping-setup": { alt: "Moving truck loaded with blanket-wrapped furniture and stacked boxes" },
  "moving-packing-services": { alt: "Folding linens into a box with packing paper" },
  "moving-move-and-junk-haul-away": { alt: "Truck loaded with household items and furniture" },

  /* Junk removal services */
  "junk-removal-furniture-removal": { alt: "Old sofas and armchairs lined up at the curb for removal" },
  "junk-removal-appliance-removal": { alt: "Old refrigerator and household junk waiting to be hauled away" },
  "junk-removal-garage-cleanouts": { alt: "Cluttered garage packed with tools, bins and equipment" },
  "junk-removal-estate-cleanouts": { alt: "Attic full of furniture, clothes and stored belongings" },
  "junk-removal-move-out-junk-haul": { alt: "Empty, cleared-out apartment living room after move-out" },
  "junk-removal-same-day-junk-pickup": { alt: "Pickup truck bed piled high with bagged junk" },
  "junk-removal-mattress-removal": { alt: "Person carrying an old mattress down a sidewalk" },
  "junk-removal-hot-tub-removal": { alt: "Backyard hot tub on a patio" },
  "junk-removal-rental-eviction-cleanouts": { alt: "Empty rental kitchen with bare counters after a cleanout" },

  /* Service areas */
  "area-las-vegas": { alt: "Fremont Street Experience canopy in downtown Las Vegas" },
  "area-henderson": {
    alt: "Palm trees overlooking the water at Lake Las Vegas in Henderson",
    credit: { author: "eschipul", href: "https://www.flickr.com/photos/16638697@N00/5719384408", ...BY_SA_2 },
  },
  "area-summerlin": {
    alt: "Palm trees and water feature in Downtown Summerlin",
    credit: { author: "bethon2000", href: "https://www.flickr.com/photos/70768502@N00/20327244786", ...BY_2 },
  },
  "area-paradise": { alt: "Las Vegas Strip resorts in Paradise at sunset" },
  "area-north-las-vegas": {
    alt: "Aerial view of Craig Ranch Regional Park and surrounding North Las Vegas neighborhoods",
    credit: { author: "Ken Lund", href: "https://www.flickr.com/photos/75683070@N00/43355238311", ...BY_SA_2 },
  },
  "area-spring-valley": {
    alt: "Aerial view of Spring Valley, Nevada",
    credit: { author: "formulanone", href: "https://www.flickr.com/photos/30552029@N00/49394824826", ...BY_SA_2 },
  },
  "area-enterprise": {
    alt: "Aerial view of Enterprise, Nevada in the southwest Las Vegas valley",
    credit: { author: "formulanone", href: "https://www.flickr.com/photos/30552029@N00/49394821766", ...BY_SA_2 },
  },

  /* Guides */
  "guide-moving-day-checklist": { alt: "Writing a moving checklist in a notebook" },
  "guide-junk-removal-cost-las-vegas": { alt: "Pickup truck loaded with junk and scrap wood" },
  "guide-garage-cleanout-checklist": { alt: "Garage workshop with shelves full of tools and stored items" },
  "guide-red-flags-hiring-movers": { alt: "Signing a contract with a pen" },
  "guide-how-to-prepare-for-moving-day": { alt: "Couple rolling up a rug next to stacked moving boxes" },
  "guide-how-much-do-movers-cost-las-vegas": { alt: "Packing moving boxes in a living room" },
  "guide-las-vegas-bulk-trash-pickup": { alt: "Old armchair and furniture left at the curb for bulk pickup" },
  "guide-moving-in-las-vegas-summer-heat": { alt: "Bright sun over dry Mojave desert brush" },
};

export function pagePhoto(key: string): PagePhoto | undefined {
  const p = PHOTOS[key];
  return p && { ...p, src: `/media/pages/${key}.jpg` };
}
