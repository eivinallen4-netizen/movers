/*
 * Site-wide facts and navigation. Every menu, footer and "Learn More" link comes from here,
 * so a renamed page only needs changing once.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://moversandjunkremoval.net").replace(/\/$/, "");
export const BUSINESS = "Movers and Junk Removal";
export const PHONE = "(702) 527-8565";
export const PHONE_HREF = "tel:+17025278565";
export const PHONE_E164 = "+17025278565";
export const DOMAIN = "moversandjunkremoval.net";
export const INSTAGRAM = "https://www.instagram.com/moverandjunkremoval/";

/** Business hours for Google ("movers open today"). Left out of the schema while empty. */
export const HOURS: { days: string[]; opens: string; closes: string }[] = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "22:00" },
];

export const CITIES = ["Las Vegas", "Henderson", "Summerlin", "Paradise", "North Las Vegas"];

export type NavLink = { label: string; href: string };

export const MOVING_LINKS: NavLink[] = [
  { label: "Local Moving", href: "/moving/local-moving" },
  { label: "Same-Day Moving", href: "/moving/same-day-moving" },
  { label: "Last-Minute Moving", href: "/moving/last-minute-moving" },
  { label: "Apartment & Condo Moves", href: "/moving/apartment-condo-moving" },
  { label: "House Moves", href: "/moving/house-moving" },
  { label: "Moving Labor", href: "/moving/moving-labor" },
  { label: "Furniture Wrapping & Setup", href: "/moving/furniture-wrapping-setup" },
  { label: "Packing Services", href: "/moving/packing-services" },
  { label: "Move + Junk Haul-Away", href: "/moving/move-and-junk-haul-away" },
];

export const JUNK_LINKS: NavLink[] = [
  { label: "Furniture Removal", href: "/junk-removal/furniture-removal" },
  { label: "Mattress Removal", href: "/junk-removal/mattress-removal" },
  { label: "Appliance Removal", href: "/junk-removal/appliance-removal" },
  { label: "Garage Cleanouts", href: "/junk-removal/garage-cleanouts" },
  { label: "Estate Cleanouts", href: "/junk-removal/estate-cleanouts" },
  { label: "Rental & Eviction Cleanouts", href: "/junk-removal/rental-eviction-cleanouts" },
  { label: "Move-Out Junk Haul", href: "/junk-removal/move-out-junk-haul" },
  { label: "Same-Day Junk Pickup", href: "/junk-removal/same-day-junk-pickup" },
  { label: "Hot Tub Removal", href: "/junk-removal/hot-tub-removal" },
];

export const AREA_LINKS: NavLink[] = [
  { label: "Las Vegas", href: "/service-areas/las-vegas" },
  { label: "Henderson", href: "/service-areas/henderson" },
  { label: "Summerlin", href: "/service-areas/summerlin" },
  { label: "Paradise", href: "/service-areas/paradise" },
  { label: "North Las Vegas", href: "/service-areas/north-las-vegas" },
  { label: "Spring Valley", href: "/service-areas/spring-valley" },
  { label: "Enterprise", href: "/service-areas/enterprise" },
];

export const TOOL_LINKS: NavLink[] = [
  { label: "Moving Cost Calculator", href: "/free-tools/moving-cost-calculator" },
  { label: "Junk Removal Cost Guide", href: "/guides/junk-removal-cost-las-vegas" },
  { label: "Moving Day Checklist", href: "/guides/moving-day-checklist" },
  { label: "Garage Cleanout Checklist", href: "/guides/garage-cleanout-checklist" },
];

export type NavItem = NavLink & { children?: NavLink[] };

export const NAV: NavItem[] = [
  { label: "Moving", href: "/moving", children: MOVING_LINKS },
  { label: "Junk Removal", href: "/junk-removal", children: JUNK_LINKS },
  { label: "Service Areas", href: "/service-areas", children: AREA_LINKS },
  { label: "Free Tools", href: "/free-tools", children: TOOL_LINKS },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
];

export const FOOTER: Record<string, NavLink[]> = {
  Moving: MOVING_LINKS,
  "Service Areas": AREA_LINKS,
  "Junk Removal": JUNK_LINKS,
  "Free Tools": TOOL_LINKS,
  Resources: [
    { label: "FAQ", href: "/faq" },
    { label: "How to Choose a Moving Company", href: "/guides/how-to-choose-a-moving-company-las-vegas" },
    { label: "7 Red Flags When Hiring Movers", href: "/guides/red-flags-hiring-movers" },
    { label: "How to Prepare for Moving Day", href: "/guides/how-to-prepare-for-moving-day" },
    { label: "How Much Does a Moving Company Cost?", href: "/guides/how-much-do-movers-cost-las-vegas" },
    { label: "Las Vegas Bulk Trash Pickup", href: "/guides/las-vegas-bulk-trash-pickup" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/guides" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Get a Free Quote", href: "/quote" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export const LEGAL_LINKS: NavLink[] = [
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Website Accessibility", href: "/accessibility" },
];
