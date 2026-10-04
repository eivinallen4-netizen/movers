import type { Faq } from "@/components/ui";

/*
 * Service-area pages (/service-areas/<slug>). Each one needs genuinely local detail
 * (neighborhoods, building types, local quirks) so Google doesn't treat them as duplicates.
 */

export type Area = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  intro: string[];
  neighborhoods: string[];
  zips: string[];
  localTips: { title: string; body: string }[];
  faqs: Faq[];
};

export const AREAS: Area[] = [
  {
    slug: "las-vegas",
    name: "Las Vegas",
    metaTitle: "Las Vegas Movers & Junk Removal | Local, Honest, On Time",
    metaDescription:
      "Local Las Vegas movers and junk removal. Apartments, houses and high-rises across the city. Upfront pricing, no hidden fees, same-day available. (702) 527-8565.",
    h1: "Movers & Junk Removal in Las Vegas, NV",
    tagline: "We live here too. From downtown lofts to west-side houses, one local crew for your move or your junk.",
    intro: [
      "Las Vegas is our home base. We move families, renters and business owners all over the city every week, and we haul away furniture, appliances and garage junk the same day in a lot of cases.",
      "Moving in Las Vegas has its own quirks: end-of-month lease rush, gated communities with strict move-in hours, high-rise elevators you have to reserve, and summer afternoons that hit 115. We plan around all of it so your move stays on schedule.",
      "Whether you're moving from a Spring Valley apartment to a house in the northwest, clearing out a downtown condo, or just getting rid of an old couch, you'll get an honest, upfront price and a crew that shows up on time.",
    ],
    neighborhoods: ["Downtown & Arts District", "Spring Valley", "Centennial Hills", "The Lakes", "Enterprise", "Southwest", "Sunrise Manor", "Whitney", "Mountain's Edge", "Rhodes Ranch", "Silverado Ranch", "Peccole Ranch"],
    zips: ["89101", "89102", "89103", "89104", "89106", "89107", "89108", "89113", "89117", "89118", "89123", "89128", "89129", "89130", "89131", "89134", "89139", "89141", "89148", "89149"],
    localTips: [
      { title: "Beat the heat", body: "From June to September, book early-morning starts. We keep electronics, candles and anything heat-sensitive out of the back of the truck." },
      { title: "Plan around the month-end rush", body: "The last and first few days of the month are the busiest for Las Vegas movers because of lease turnovers. Mid-month dates are easier to book." },
      { title: "Check your HOA or building rules", body: "Many gated communities and high-rises limit move hours and require elevator reservations or proof of insurance. Tell us and we'll plan around it." },
    ],
    faqs: [
      { q: "Do you move within Las Vegas city limits and Clark County?", a: "Yes. We cover the whole Las Vegas valley, including unincorporated Clark County areas like Spring Valley, Enterprise and Paradise." },
      { q: "Can you move me into a high-rise near the Strip?", a: "Yes. Send us your building's loading dock and elevator rules and we'll schedule inside your reserved window." },
      { q: "Do you do same-day junk removal in Las Vegas?", a: "Often, yes. Call in the morning for the best chance at a same-day pickup." },
    ],
  },
  {
    slug: "henderson",
    name: "Henderson",
    metaTitle: "Henderson Movers & Junk Removal | Honest Local Crew",
    metaDescription:
      "Henderson, NV movers and junk removal. Green Valley, Anthem, Inspirada & more. On-time crew, careful handling, upfront pricing. Free quote today.",
    h1: "Movers & Junk Removal in Henderson, NV",
    tagline: "Green Valley to Anthem to Inspirada. A careful local crew that respects your home and your HOA.",
    intro: [
      "Henderson is one of our busiest areas, from established Green Valley neighborhoods to newer builds in Inspirada and Cadence. A lot of our Henderson customers are families moving up to a bigger house, or downsizing and clearing out a garage after years in the same home.",
      "Henderson HOAs take move days seriously: gate access, trucks on the street, move-in hours. We plan the truck, the time and the crew so there are no letters from the HOA afterward.",
      "We also do a lot of junk removal in Henderson: garage cleanouts, old patio furniture, and estate cleanouts for families settling a loved one's home.",
    ],
    neighborhoods: ["Green Valley", "Green Valley Ranch", "Anthem", "Seven Hills", "MacDonald Highlands", "Inspirada", "Cadence", "Lake Las Vegas", "Whitney Ranch", "Silver Springs"],
    zips: ["89002", "89011", "89012", "89014", "89015", "89044", "89052", "89074"],
    localTips: [
      { title: "Get your gate access sorted", body: "Guard-gated communities like Anthem and MacDonald Highlands need our crew on the access list. Give the guard our company name the day before." },
      { title: "Hillside homes take more time", body: "Homes in Anthem, Seven Hills and MacDonald Highlands often have steep driveways and multi-level layouts. Mention it so we bring the right crew." },
      { title: "Lake Las Vegas condos", body: "Many Lake Las Vegas buildings require elevator reservations and certificates of insurance. We'll help you get it all lined up." },
    ],
    faqs: [
      { q: "Do you move between Henderson and Las Vegas?", a: "All the time. Henderson to Summerlin, Las Vegas to Henderson, and everywhere in between." },
      { q: "Can you work with my Henderson HOA's move rules?", a: "Yes. Tell us your HOA's hours and truck rules and we'll schedule around them." },
      { q: "Do you do estate cleanouts in Henderson?", a: "Yes. We clear whole homes respectfully, set aside keepsakes and handle donation where possible." },
    ],
  },
  {
    slug: "summerlin",
    name: "Summerlin",
    metaTitle: "Summerlin Movers & Junk Removal | Careful Local Crew",
    metaDescription:
      "Summerlin movers and junk removal. The Ridges, Red Rock, Sun City and more. Careful handling, gated-community experience, honest upfront pricing.",
    h1: "Movers & Junk Removal in Summerlin",
    tagline: "The Ridges to Sun City Summerlin. Careful, respectful movers for homes you've put a lot into.",
    intro: [
      "Summerlin homes tend to be bigger, fuller and nicer, which means more furniture that needs real care: solid-wood dining sets, big TVs, glass tables and art. That's exactly where our wrapping-first approach matters most.",
      "We know the Summerlin villages and their guard gates, and we plan around the HOA rules that come with them. Our crew protects floors, banisters and door frames on the way out and on the way in.",
      "Downsizing from a family home into Sun City Summerlin or an apartment? We can move what you're keeping and haul away what you're not, in one trip.",
    ],
    neighborhoods: ["The Ridges", "Red Rock Country Club", "Sun City Summerlin", "The Paseos", "Stonebridge", "The Trails", "The Hills", "Kestrel", "Siena", "Downtown Summerlin area"],
    zips: ["89134", "89135", "89138", "89144", "89145"],
    localTips: [
      { title: "Guard-gated villages", body: "Most Summerlin villages have guard gates. Add us to the list before moving day so the truck isn't waiting outside on the clock." },
      { title: "Downsizing into Sun City", body: "Moving into a smaller home? Measure your new rooms first. We'll move what fits and haul away the rest with Move + Junk Haul-Away." },
      { title: "Protect the nice stuff", body: "Point out heirlooms, art and anything fragile during your quote so the crew plans extra padding and handling." },
    ],
    faqs: [
      { q: "Do you move into and out of Sun City Summerlin?", a: "Yes. We move a lot of downsizing customers into Sun City and help clear out what they don't need." },
      { q: "Do you handle expensive furniture carefully?", a: "Every piece gets blanket-wrapped. Tell us about heirlooms or high-value items and we'll give them extra care." },
      { q: "Can you remove old furniture from my Summerlin home?", a: "Yes. We carry it from any room, confirm the price before loading and haul it away, often the same day." },
    ],
  },
  {
    slug: "paradise",
    name: "Paradise",
    metaTitle: "Paradise, NV Movers & Junk Removal | Near the Strip & UNLV",
    metaDescription:
      "Movers and junk removal in Paradise, NV, near the Strip and UNLV. Apartments, condos and houses. Upfront pricing, on-time crew, same-day available.",
    h1: "Movers & Junk Removal in Paradise, NV",
    tagline: "Near the Strip, UNLV and the airport. Apartment, condo and house moves done fast and done right.",
    intro: [
      "Paradise covers a lot of the valley: the Strip, UNLV, the airport and the neighborhoods around them. It's full of apartments, condos and high-rises, and a lot of people move here on short notice for work.",
      "We handle quick apartment moves, student moves near UNLV and high-rise condo moves with elevator reservations and loading docks. Booked last minute? We've got you.",
      "Clearing out an apartment at the end of a lease? We'll haul away everything you're not taking so you get your deposit back.",
    ],
    neighborhoods: ["University District (UNLV)", "Paradise Palms", "Strip-area high-rises", "Hughes Center", "Tropicana corridor", "Winchester border", "Eastern & Flamingo"],
    zips: ["89109", "89119", "89120", "89121", "89169"],
    localTips: [
      { title: "Student moves near UNLV", body: "May and August are the rush months for student moves. Book early, or call us for a last-minute slot." },
      { title: "High-rise loading docks", body: "Most Strip-area towers require a loading dock booking and a certificate of insurance. Get the rules from your building and send them to us." },
      { title: "Parking near the Strip", body: "Street parking is tight. Let us know where the truck can go so we're not paying for a long carry in time." },
    ],
    faqs: [
      { q: "Is Paradise part of Las Vegas?", a: "Paradise is an unincorporated town in Clark County that includes the Strip and UNLV. Most people just call it Las Vegas, and we serve all of it." },
      { q: "Do you do small moves for students?", a: "Yes. Dorm and studio moves, a few pieces of furniture, or labor to load a rental truck." },
      { q: "Can you move me out of a high-rise condo?", a: "Yes. We coordinate the loading dock and elevator time and protect the hallways and elevator." },
    ],
  },
  {
    slug: "north-las-vegas",
    name: "North Las Vegas",
    metaTitle: "North Las Vegas Movers & Junk Removal | Upfront Pricing",
    metaDescription:
      "North Las Vegas movers and junk removal. Aliante, Eldorado, Tule Springs & more. On-time crew, careful handling, honest upfront pricing. Free quote.",
    h1: "Movers & Junk Removal in North Las Vegas",
    tagline: "Aliante to Tule Springs. Honest, affordable moves and junk removal for North Las Vegas families.",
    intro: [
      "North Las Vegas is one of the fastest-growing parts of the valley, with lots of new-build communities and families moving up from apartments into their first homes. That's a big move, and it should feel good, not stressful.",
      "We move North Las Vegas families into new homes and protect the brand-new floors and walls while we do it. We set up beds, put boxes in the right rooms and leave you with a home that's ready to live in.",
      "New house, old junk? We haul away the old couch, the mattress and the moving boxes after you unpack.",
    ],
    neighborhoods: ["Aliante", "Eldorado", "Tule Springs", "Valley Vista", "Shadow Creek area", "Craig Ranch", "Villages at Tule Springs", "Northern Terrace"],
    zips: ["89030", "89031", "89032", "89081", "89084", "89085", "89086"],
    localTips: [
      { title: "New-build move-ins", body: "Builder closing dates can slip. Book a date, and if closing moves, call us and we'll do our best to shift your move." },
      { title: "Protect new floors", body: "New LVP and tile scratch easily. We use floor runners and door-frame padding on every move-in." },
      { title: "Clear the boxes after", body: "Once you unpack, we can haul away the empty boxes, packing paper and old furniture in one trip." },
    ],
    faqs: [
      { q: "Do you serve all of North Las Vegas?", a: "Yes, from Craig Ranch up to Aliante and Tule Springs, and everything in between." },
      { q: "Can you move me into a new-build home?", a: "Yes. We protect new floors and walls and set up your furniture room by room." },
      { q: "Do you pick up moving boxes after I unpack?", a: "Yes. Boxes, packing paper and any old furniture you're replacing." },
    ],
  },
  {
    slug: "spring-valley",
    name: "Spring Valley",
    metaTitle: "Spring Valley NV Movers & Junk Removal | Upfront Pricing",
    metaDescription:
      "Movers and junk removal in Spring Valley, NV. Apartments, condos and houses from Chinatown to Spanish Trail. On-time crew, upfront pricing, same-day available.",
    h1: "Movers & Junk Removal in Spring Valley, NV",
    tagline: "Just west of the Strip. Apartment turnovers, gated communities and family homes, handled by a crew that knows the area.",
    intro: [
      "Spring Valley sits right in the middle of the valley, west of the Strip and I-15, and it's one of the busiest places we work. It's packed with apartment and condo complexes, so a lot of our Spring Valley jobs are end-of-lease moves, roommate move-outs and quick one-bedroom moves across town.",
      "It's also home to established neighborhoods and guard-gated communities like Spanish Trail, where the homes are bigger, the furniture is heavier and the HOA wants the truck in and out on schedule. We plan the crew and the timing around both.",
      "Moving out of a Spring Valley apartment and leaving the old couch behind? We can move what you're keeping and haul away the rest, so you hand back the keys to an empty unit and get your deposit back.",
    ],
    neighborhoods: ["Chinatown / Spring Mountain Rd", "Spanish Trail", "Rancho Nevada area", "Desert Inn corridor", "Flamingo & Rainbow", "Tropicana & Jones", "Sahara West", "Spring Valley Parkway area"],
    zips: ["89102", "89103", "89117", "89146", "89147", "89148"],
    localTips: [
      { title: "Apartment move windows", body: "Many Spring Valley complexes limit move hours and want the truck in a specific spot. Ask your leasing office before moving day and send us the rules." },
      { title: "Spanish Trail gate access", body: "Guard-gated communities need our company name on the list the day before, so the crew isn't waiting at the gate on the clock." },
      { title: "Beat the Spring Mountain traffic", body: "Spring Mountain, Flamingo and Tropicana back up in the afternoon. Morning starts keep your move faster and cheaper." },
    ],
    faqs: [
      { q: "Is Spring Valley part of Las Vegas?", a: "Spring Valley is an unincorporated town in Clark County, just west of the Strip. It has a Las Vegas mailing address, and we serve all of it." },
      { q: "Do you do small apartment moves in Spring Valley?", a: "All the time. Studios, one-bedrooms and a few pieces of furniture across town. You get an upfront price either way." },
      { q: "Can you pick up junk from my Spring Valley apartment?", a: "Yes. We carry it out from your unit, even from upper floors, and haul it away. Often the same day." },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    metaTitle: "Enterprise NV Movers & Junk Removal | Southwest Las Vegas",
    metaDescription:
      "Movers and junk removal in Enterprise, NV: Mountain's Edge, Southern Highlands, Rhodes Ranch & more. New-build move-ins, careful crew, honest upfront pricing.",
    h1: "Movers & Junk Removal in Enterprise, NV",
    tagline: "Mountain's Edge to Southern Highlands. Careful moves into the southwest valley's newest homes.",
    intro: [
      "Enterprise covers the southwest corner of the valley, south of Spring Valley and west of I-15, and it's still growing fast. A lot of our Enterprise customers are moving into new-build homes in Mountain's Edge, Rhodes Ranch and the communities along Blue Diamond Road, often from an apartment across town.",
      "New homes need extra care. Fresh paint, new flooring and door frames that have never had a dresser bumped into them. We lay floor runners, pad the door frames and put every box in the right room, so your new place still looks new when we leave.",
      "The southwest also has plenty of established homes in Southern Highlands and Silverado Ranch. When those families downsize or clear out a garage, we handle the move and the junk in one trip.",
    ],
    neighborhoods: ["Mountain's Edge", "Southern Highlands", "Rhodes Ranch", "Silverado Ranch", "Southwest Ranch", "Blue Diamond Rd corridor", "Durango & Warm Springs", "Cactus Ave area"],
    zips: ["89113", "89123", "89139", "89141", "89148", "89178", "89179", "89183"],
    localTips: [
      { title: "Builder closing dates slip", body: "New-build closings in Enterprise often move by a few days. Book your date early and call us if it changes. We'll do our best to shift your move." },
      { title: "Southern Highlands gates", body: "Southern Highlands has guard gates and HOA move rules. Get us on the gate list and check your HOA's move hours ahead of time." },
      { title: "Clear the boxes after", body: "Once you unpack, we can pick up the empty boxes, packing paper and any old furniture you replaced in one trip." },
    ],
    faqs: [
      { q: "Where is Enterprise, NV?", a: "Enterprise is an unincorporated town in Clark County covering the southwest valley, including Mountain's Edge, Southern Highlands and Rhodes Ranch. It has Las Vegas mailing addresses, and we serve all of it." },
      { q: "Can you move me into a brand-new home?", a: "Yes. We protect new floors and walls with runners and padding, set up beds and place every box in the right room." },
      { q: "Do you do junk removal in Enterprise?", a: "Yes. Furniture, appliances, garage cleanouts and leftover moving boxes, with an upfront price before we load." },
    ],
  },
];

export const findArea = (slug: string) => AREAS.find((a) => a.slug === slug);
