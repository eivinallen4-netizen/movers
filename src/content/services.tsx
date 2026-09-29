import type { ReactNode } from "react";
import {
  IconBin,
  IconBuildings,
  IconDiamond,
  IconGloves,
  IconHourglass,
  IconPins,
  IconSofa,
  IconTapeBox,
  IconTruckRoute,
} from "@/components/icons";
import type { Faq } from "@/components/ui";

/*
 * Every service page (/moving/<slug> and /junk-removal/<slug>) is built from this file.
 * Copy follows the brand brief: customer pain → how we fix it. Keywords come from the brief's
 * Local SEO list. Prices are never promised here; they live in src/content/pricing.ts.
 */

export type Category = "moving" | "junk-removal";

export type Service = {
  slug: string;
  category: Category;
  name: string;
  /** One or two sentences for cards and hub pages. */
  short: string;
  icon: ReactNode;
  /** Pre-selected option in the lead form (see LEAD_SERVICES). */
  leadService: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  heroPoints: string[];
  intro: string[];
  problems: { pain: string; fix: string }[];
  included: string[];
  priceFactors: string[];
  idealFor: string[];
  faqs: Faq[];
  related: string[];
  steps?: { title: string; body: string }[];
};

export const MOVING_STEPS = [
  { title: "Tell us about your move", body: "Fill out the short form or call. Where from, where to, when, and anything big or tricky." },
  { title: "Get an honest, upfront price", body: "We explain exactly what you'll pay and why before moving day. No \"double the quote\" surprises." },
  { title: "We show up on time", body: "We call when we're on the way, arrive when we said and get right to work. No standing around on your dime." },
  { title: "Done, not half done", body: "Every box in the right room, beds and tables put back together. You don't lift a finger." },
];

export const JUNK_STEPS = [
  { title: "Call or send the details", body: "Tell us what's going. A quick description or a few photos is all we need for a ballpark." },
  { title: "Upfront price before we lift", body: "We confirm the price on-site before we load a single thing. You say yes, or we leave. No pressure." },
  { title: "We do all the lifting", body: "From the back bedroom, the attic, the backyard. We carry it out without scratching walls or floors." },
  { title: "Gone, and swept up", body: "We load it, sweep the spot it came from and haul it off. Usable items go to donation when we can." },
];

export const SERVICES: Service[] = [
  /* ============================ MOVING ============================ */
  {
    slug: "local-moving",
    category: "moving",
    name: "Local Moving",
    short: "Houses, apartments and condos anywhere in the valley. On time, careful and finished right.",
    icon: <IconPins />,
    leadService: "local-move",
    metaTitle: "Local Movers Las Vegas | Honest Pricing, No Surprises",
    metaDescription:
      "Local Las Vegas movers who show up on time, wrap every piece and finish the job. Upfront pricing, no hidden fees. Henderson, Summerlin & the whole valley. Free quote.",
    h1: "Local Movers in Las Vegas Who Actually Show Up",
    tagline: "Moving across town shouldn't be a headache. On time, fast and careful, with the price explained upfront.",
    heroPoints: ["Upfront price, no hidden fees", "We call when we're on the way", "Every piece wrapped and protected"],
    intro: [
      "Most local moves in Las Vegas go wrong in the same few ways: the crew shows up late, the clock runs while they stand around, something gets scratched and nobody mentions it, and the final bill looks nothing like the quote. We built our whole company around not doing any of that.",
      "We're a local crew. We move families, renters and homeowners between Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas and everywhere in between. Because we know the valley, we plan around traffic on the 15 and the 215, HOA gate rules and the summer heat, so your move moves.",
      "You'll know what you're paying before we lift a thing. Our crew wraps furniture in moving blankets, protects floors and door frames, and doesn't leave until the last box is in the right room and your beds are back together.",
    ],
    problems: [
      { pain: "\"The final bill was double the quote.\"", fix: "Your price is explained upfront, before moving day. If something changes, we tell you before we do it, not after." },
      { pain: "\"They stood around on my dime.\"", fix: "Our crew arrives on time and works steadily until it's done. Fast and efficient means your move costs less." },
      { pain: "\"They broke it and didn't even tell us.\"", fix: "Everything is wrapped before it leaves the room. If anything ever goes wrong, we tell you right away and make it right." },
    ],
    included: [
      "Friendly, uniformed crew and a clean moving truck",
      "Furniture wrapped in moving blankets and secured in the truck",
      "Floor, door frame and banister protection",
      "Disassembly and reassembly of beds, tables and cribs",
      "Every box placed in the right room at your new home",
      "A call when we're on the way, and a heads-up on any change",
      "Optional haul-away of anything you don't want to move",
    ],
    priceFactors: [
      "How much you're moving (studio vs. 4-bedroom house)",
      "Stairs, elevators and long walks from the door to the truck",
      "Drive time between your old and new place",
      "Heavy or specialty items like safes, pianos or gun cabinets",
      "Whether you want packing help or haul-away added",
    ],
    idealFor: [
      "Moving to a new house or apartment anywhere in the Las Vegas valley",
      "Families who don't want to do any of the heavy lifting",
      "Anyone burned by a mover who showed up late or overcharged",
      "Moves with a lot of furniture that needs to be wrapped and reassembled",
    ],
    faqs: [
      { q: "How much do local movers cost in Las Vegas?", a: "It depends mostly on how much you have, stairs or elevators, and drive time. A studio or 1-bedroom is usually a few hours of work; a 4-bedroom house can take most of a day. Try our free moving cost calculator for a ballpark, or send the form and we'll give you an exact, upfront price." },
      { q: "Do you charge hidden fees?", a: "No. We explain your price before moving day, including anything that could change it. No fees snuck in at the end and no pushy tip requests." },
      { q: "How far ahead should I book?", a: "Two to three weeks is ideal, especially at the end of the month when leases turn over. But we also do same-day and last-minute moves, so call even if your date is tomorrow." },
      { q: "Do you disassemble and reassemble furniture?", a: "Yes. Beds, tables, cribs and most flat-pack furniture come apart for the move and go back together at your new place at no surprise charge." },
      { q: "Will you move just a few items?", a: "Yes. A couch, a bedroom set or a few boxes across town. Tell us what's going and we'll give you a price for exactly that." },
      { q: "Do you move in the summer heat?", a: "All year. In summer we like early starts, keep heat-sensitive things like electronics and candles in the cab or your car, and move fast so nothing sits in a hot truck." },
    ],
    related: ["/moving/apartment-condo-moving", "/moving/house-moving", "/moving/furniture-wrapping-setup", "/moving/move-and-junk-haul-away"],
  },
  {
    slug: "same-day-moving",
    category: "moving",
    name: "Same-Day Moving",
    short: "Need to move today? Call in the morning and we can often be there the same day.",
    icon: <IconHourglass />,
    leadService: "same-day-move",
    metaTitle: "Same Day Movers Las Vegas | Moving Today? Call Now",
    metaDescription:
      "Same-day movers in Las Vegas, Henderson & Summerlin. Call in the morning, moved today. Honest upfront pricing, careful crew, no surprise fees. (702) 527-8565.",
    h1: "Same-Day Movers in Las Vegas",
    tagline: "Need to move today? Call us. We've saved plenty of moving days on a few hours' notice.",
    heroPoints: ["Often there within hours", "Same honest pricing, no rush markup games", "Same careful wrapping, even in a hurry"],
    intro: [
      "Sometimes moving day isn't on the calendar. A lease falls through, a landlord changes plans, a closing moves up, or your movers just don't show. When you need a crew today, calling around and getting voicemail is the last thing you need.",
      "Call us first. A real local person picks up, asks a few quick questions and tells you straight whether we can be there today and what it will cost. No runaround, no \"we'll call you back.\"",
      "Same-day doesn't mean sloppy. The crew still wraps furniture, protects your floors and puts everything in the right room. We just get moving faster.",
    ],
    problems: [
      { pain: "\"They didn't even show up and I had to scramble.\"", fix: "When we say we're coming, we come, and we call when we're on the way so you're never guessing." },
      { pain: "\"Nobody picked up the phone.\"", fix: "Call (702) 527-8565 and you'll talk to a real person who can actually book your move." },
      { pain: "\"They charged extra because I was desperate.\"", fix: "Your price is explained upfront before we start. No surprise add-ons because you're in a tight spot." },
    ],
    included: [
      "Fast answer on whether we can do it today",
      "Upfront price before the crew arrives",
      "Full furniture wrapping and floor protection",
      "Loading, driving, unloading and placing everything by room",
      "Bed and table reassembly",
      "Optional haul-away of anything you don't want to take",
    ],
    priceFactors: [
      "Size of the move and how much is already packed",
      "Stairs, elevators and parking at both addresses",
      "Distance across the valley",
      "Time of day we can start",
    ],
    idealFor: [
      "Your movers canceled or didn't show",
      "Last-day-of-lease emergencies",
      "Sudden closings, evictions or relocations",
      "Small moves you just want done today",
    ],
    faqs: [
      { q: "Can you really move me today?", a: "Often, yes. It depends on how big the move is and what's already booked. Call as early in the day as you can and we'll tell you honestly within a few minutes." },
      { q: "Do same-day moves cost more?", a: "We give you an upfront price before we start, same as any move. Big jobs late in the day may need an extra mover to finish on time, and we'll tell you that before you book." },
      { q: "What if I'm not packed?", a: "Tell us when you call. We can bring extra hands to help box up the last things, and we'll wrap all the furniture either way." },
      { q: "What's the difference between same-day and last-minute moving?", a: "Same-day means we move you today. Last-minute usually means within the next few days, like when your lease ends sooner than planned or your first mover backed out." },
      { q: "What areas do you cover for same-day moves?", a: "The whole Las Vegas valley: Las Vegas, Henderson, Summerlin, Paradise, North Las Vegas and the areas around them." },
    ],
    related: ["/moving/last-minute-moving", "/moving/local-moving", "/junk-removal/same-day-junk-pickup", "/moving/moving-labor"],
  },
  {
    slug: "last-minute-moving",
    category: "moving",
    name: "Last-Minute Moving",
    short: "Other movers canceled? Lease ending sooner than planned? Booked last minute, we've got you.",
    icon: <IconHourglass />,
    leadService: "same-day-move",
    metaTitle: "Last Minute Movers Las Vegas | Booked Last Minute? We've Got You",
    metaDescription:
      "Last-minute movers in Las Vegas for canceled movers, early lease ends and rushed closings. Upfront pricing, on-time crew, no hidden fees. Get a quote in minutes.",
    h1: "Last-Minute Movers in Las Vegas",
    tagline: "Booked last minute? We've got you. A dependable local crew when your plans change fast.",
    heroPoints: ["Moves booked with days, not weeks, of notice", "Real people answer the phone", "Honest pricing, even on short notice"],
    intro: [
      "Your mover canceled the night before. Your lease ends Friday instead of the 30th. The buyer wants the keys early. Last-minute moves are stressful because you're out of time and out of options, and a lot of companies know it.",
      "We don't take advantage of a tight spot. You get the same upfront price and the same careful crew as a move booked a month ahead. We'll tell you honestly what days we have open and what it will take.",
      "Our customers tell us the same thing again and again: \"Another company canceled on me and these guys saved the day.\" That's the job.",
    ],
    problems: [
      { pain: "\"They canceled the night before.\"", fix: "We don't overbook and we don't bail. If we're on your calendar, we're there." },
      { pain: "\"I got a quote but they never called back.\"", fix: "Send the form and a real local person calls you back fast, usually within minutes during business hours." },
      { pain: "\"They knew I was desperate and raised the price.\"", fix: "Same honest, upfront pricing whether you book a month out or two days out." },
    ],
    included: [
      "Quick callback and an honest answer on availability",
      "Upfront price before moving day",
      "Help packing the last-minute stuff if you need it",
      "Furniture wrapping, loading, transport and unloading",
      "Beds and tables put back together",
      "Optional junk haul-away in the same trip",
    ],
    priceFactors: [
      "Size of the move",
      "How much still needs packing",
      "Stairs, elevators and parking",
      "Drive time between addresses",
    ],
    idealFor: [
      "Replacing movers who canceled or no-showed",
      "Leases that end early or overlap badly",
      "Home sales and closings that moved up",
      "Military, work and family moves on short notice",
    ],
    faqs: [
      { q: "How last-minute can I book?", a: "Tomorrow is often fine, and today is sometimes possible. See our same-day moving page or just call. The sooner you reach out, the more options you'll have." },
      { q: "My other mover canceled. Can you take over their quote?", a: "We'll give you our own honest quote based on your move. Send us whatever inventory you gave the other company and we'll turn it around fast." },
      { q: "Do you charge a rush fee?", a: "We quote every move upfront. If a short-notice job needs an extra crew member to get done in time, we'll tell you before you book, never after." },
      { q: "Can you help me pack?", a: "Yes. Let us know what's not packed yet and we'll plan the crew and time around it." },
    ],
    related: ["/moving/same-day-moving", "/moving/local-moving", "/guides/how-to-prepare-for-moving-day", "/moving/move-and-junk-haul-away"],
  },
  {
    slug: "apartment-condo-moving",
    category: "moving",
    name: "Apartment & Condo Moves",
    short: "Stairs, elevators and tight hallways don't slow us down. Walls and floors protected.",
    icon: <IconBuildings />,
    leadService: "apartment-move",
    metaTitle: "Apartment Movers Las Vegas | Condo & High-Rise Moves",
    metaDescription:
      "Apartment and condo movers in Las Vegas. Stairs, elevators, gated complexes and high-rises handled with care. Upfront pricing, no hidden fees. Free quote today.",
    h1: "Apartment & Condo Movers in Las Vegas",
    tagline: "Third-floor walk-up, high-rise with an elevator reservation, or a gated complex with a strict move-in window. We've got it.",
    heroPoints: ["Stairs and elevators, no drama", "Walls, floors and door frames protected", "We work with your building's rules"],
    intro: [
      "Apartment moves are all about the details: the walk from the parking lot, the third-floor stairs, the elevator you have to reserve, the gate code that doesn't work, the leasing office that wants a certificate of insurance before you move in.",
      "We handle apartment and condo moves across Las Vegas every week, from garden-style complexes in Henderson and North Las Vegas to high-rise condos near the Strip. We plan the parking, pad the elevator and protect the hallways so you get your deposit back.",
      "Small space doesn't mean small effort. Your couch still gets wrapped, your bed still gets put back together and every box still ends up in the right room.",
    ],
    problems: [
      { pain: "\"They put two holes in my wall.\"", fix: "We pad corners, door frames and elevator walls before the first piece moves. Careful is the whole point." },
      { pain: "\"Took forever because of the stairs.\"", fix: "We bring the right size crew for stairs, so the job moves steadily instead of dragging out on your dime." },
      { pain: "\"The building almost didn't let them in.\"", fix: "Tell us your building's rules up front. We plan around elevator reservations, move windows and parking." },
    ],
    included: [
      "Hallway, door frame and elevator padding",
      "Crew sized for stairs and long carries",
      "Furniture wrapping and careful loading",
      "Bed, table and desk disassembly and reassembly",
      "Boxes placed in the right rooms",
      "Help with building paperwork. Ask us about proof of insurance for your property manager.",
    ],
    priceFactors: [
      "Floor level and whether there's an elevator",
      "Distance from the unit to where the truck can park",
      "Size of the apartment and how much furniture",
      "Elevator reservation windows or move-time limits",
    ],
    idealFor: [
      "Walk-up apartments on the 2nd floor and above",
      "High-rise condos with loading docks and elevator bookings",
      "Moving from an apartment into your first house",
      "Renters who want to protect their deposit",
    ],
    faqs: [
      { q: "Do you charge more for stairs?", a: "Stairs add time, and your price reflects the real job. We ask about floors and elevators up front so there are no surprises on moving day." },
      { q: "Can you move me into a high-rise with an elevator reservation?", a: "Yes. Tell us your reserved window and loading dock rules. We'll plan the arrival and crew so we finish inside it." },
      { q: "My building needs a certificate of insurance. Can you provide one?", a: "Ask when you book and we'll get your property manager what they need before moving day." },
      { q: "How long does a 1-bedroom apartment move take?", a: "Usually a few hours, depending on stairs, the walk to the truck and drive time. Our cost calculator gives you a quick estimate." },
      { q: "Will you protect the floors and walls?", a: "Yes. We pad door frames, corners and elevators and use floor runners so you don't lose your deposit over a scrape." },
    ],
    related: ["/moving/local-moving", "/moving/furniture-wrapping-setup", "/moving/moving-labor", "/junk-removal/move-out-junk-haul"],
  },
  {
    slug: "house-moving",
    category: "moving",
    name: "House Moves",
    short: "Whole-home moves done right: wrapped, loaded carefully and set up in the right rooms.",
    icon: <IconTruckRoute />,
    leadService: "local-move",
    metaTitle: "House Movers Las Vegas | Whole-Home Moves Done Right",
    metaDescription:
      "Las Vegas house movers for 2, 3 and 4+ bedroom homes. Everything wrapped, loaded carefully and set up in the right rooms. Upfront pricing. Henderson & Summerlin too.",
    h1: "House Movers in Las Vegas",
    tagline: "A whole house, moved in a day, with nothing dumped in the garage for you to finish.",
    heroPoints: ["Right-sized crew for big homes", "Every room labeled and placed", "Beds and furniture set back up"],
    intro: [
      "Moving a whole house is a big job, and it's where most movers cut corners: boxes left stacked in the garage, furniture still in pieces, and you doing the heavy lifting at 10pm. We hire movers so our family doesn't have to, and so should you.",
      "We plan house moves around your home, not a one-size-fits-all crew. Bigger homes get a bigger crew so the job stays fast and efficient. Everything is wrapped, loaded tight so nothing shifts on the road, and unloaded straight into the room it belongs in.",
      "From two-story homes in Summerlin to single-story ranches in Henderson and new builds in North Las Vegas, we've moved them all.",
    ],
    problems: [
      { pain: "\"Everything was left in the garage for me to move in.\"", fix: "Every box goes to the room it's labeled for. That's what you pay movers for." },
      { pain: "\"We ended up doing the heavy lifting ourselves.\"", fix: "You don't lift a finger. We bring enough crew to carry the whole house." },
      { pain: "\"Our dresser got scratched and nobody said a word.\"", fix: "Every piece is blanket-wrapped. If anything ever happens, we tell you and make it right." },
    ],
    included: [
      "Crew and truck sized to your home",
      "Full furniture wrapping and padding",
      "Disassembly and reassembly of beds, tables and cribs",
      "Careful loading so nothing shifts on the road",
      "Room-by-room unloading at the new house",
      "Optional packing help and junk haul-away",
    ],
    priceFactors: [
      "Number of bedrooms and how full the house is",
      "Two-story homes and long carries",
      "Garage, patio and shed contents",
      "Heavy specialty items (safes, pianos, gym equipment)",
      "Drive time between homes",
    ],
    idealFor: [
      "2, 3 and 4+ bedroom homes",
      "Families moving between neighborhoods in the valley",
      "Downsizing: move what you keep, haul away the rest",
      "Anyone who wants the job finished, not half done",
    ],
    faqs: [
      { q: "How long does it take to move a 3-bedroom house?", a: "Most 3-bedroom local moves take most of a day with a 3-person crew, depending on how packed you are, stairs and drive time. Use the cost calculator for a ballpark." },
      { q: "Do you move garage and patio items?", a: "Yes. Tools, bikes, patio sets and storage shelves. Let us know about them when you book so we bring enough truck space." },
      { q: "Can you move heavy items like a safe or a piano?", a: "Tell us exactly what it is (brand, size, which floor) when you request a quote and we'll let you know how we'll handle it." },
      { q: "Can you get rid of stuff we don't want to move?", a: "Yes. Our Move + Junk Haul-Away service moves what you keep and hauls the rest away in the same trip." },
    ],
    related: ["/moving/local-moving", "/moving/move-and-junk-haul-away", "/moving/furniture-wrapping-setup", "/guides/moving-day-checklist"],
  },
  {
    slug: "moving-labor",
    category: "moving",
    name: "Moving Labor",
    short: "Already have a truck? Our crew does the heavy lifting, loading and unloading.",
    icon: <IconGloves />,
    leadService: "moving-labor",
    metaTitle: "Moving Labor Las Vegas | Loading & Unloading Help",
    metaDescription:
      "Hire moving labor in Las Vegas to load or unload your rental truck, PODS or container. Careful, fast crew, honest hourly pricing. Same-day help available.",
    h1: "Moving Labor in Las Vegas",
    tagline: "You've got the truck. We've got the muscle. Loading, unloading and rearranging, done right.",
    heroPoints: ["Load or unload rental trucks and containers", "Packed tight so nothing shifts", "Fast crew, no standing around"],
    intro: [
      "Renting a truck or a container saves money, but loading it is where furniture gets damaged and backs get hurt. A badly loaded truck means broken dressers and cracked TVs by the time you get there.",
      "Our moving labor crews load and unload rental trucks, portable containers and trailers all over the Las Vegas valley. We pad and wrap furniture, stack heavy to light and tie it off so nothing slides, even on a long drive out of state.",
      "Only need help with part of the job? We also move heavy furniture between rooms, help stage a home for sale, or carry things into storage units.",
    ],
    problems: [
      { pain: "\"Paying by the hour and they're standing around?\"", fix: "We show up ready and keep moving until the last item is loaded. Faster work means a smaller bill." },
      { pain: "\"Everything shifted and broke on the drive.\"", fix: "We wrap every piece and load tight, heavy to light, tied off in sections." },
      { pain: "\"We ended up helping them carry everything.\"", fix: "You don't have to lift a thing. Point and we carry." },
    ],
    included: [
      "Loading and unloading rental trucks, containers and trailers",
      "Blanket wrapping and securing furniture",
      "Disassembly and reassembly of beds and tables",
      "Moving heavy items between rooms or floors",
      "Carrying items in or out of storage units",
    ],
    priceFactors: [
      "How much needs to be loaded or unloaded",
      "Number of crew members",
      "Stairs and distance from the door to the truck",
      "Whether you need wrapping supplies from us",
    ],
    idealFor: [
      "Long-distance DIY moves with a rental truck or container",
      "Unloading when you arrive in Las Vegas",
      "Rearranging furniture or staging a home",
      "Storage unit loading and unloading",
    ],
    faqs: [
      { q: "Do you provide the truck for moving labor?", a: "No, labor-only means you supply the truck or container and we do the lifting. If you'd rather we bring the truck, see our local moving service." },
      { q: "Can you unload a container that's already at my new home?", a: "Yes. We'll unload it, put everything in the right rooms and reassemble furniture." },
      { q: "Is there a minimum?", a: "We'll tell you any minimum upfront when you request a quote. No surprises at the end." },
      { q: "Can you load my truck for a move out of state?", a: "Yes. We load for long drives by wrapping everything and tying it off in sections so it arrives the way it left." },
    ],
    related: ["/moving/local-moving", "/moving/apartment-condo-moving", "/moving/furniture-wrapping-setup", "/free-tools/moving-cost-calculator"],
  },
  {
    slug: "furniture-wrapping-setup",
    category: "moving",
    name: "Furniture Wrapping & Setup",
    short: "Every piece wrapped and protected. Beds and tables go back together in the right room.",
    icon: <IconSofa />,
    leadService: "local-move",
    metaTitle: "Furniture Wrapping & Setup | Careful Movers Las Vegas",
    metaDescription:
      "Careful Las Vegas movers who blanket-wrap every piece, protect TVs and mirrors, and set your furniture back up. Handled with care, like it's our own.",
    h1: "Furniture Wrapping & Setup, Handled Like It's Our Own",
    tagline: "The #1 complaint about movers is broken stuff. Here's exactly how we make sure yours arrives the way it left.",
    heroPoints: ["Every piece blanket-wrapped", "TVs, mirrors and glass kept upright", "Beds and tables reassembled"],
    intro: [
      "Dropped bed frames. Scratched dining tables. Cracked TVs. Holes in the wall on the way out. And worst of all, finding the damage yourself because nobody said anything. That's the story in almost every bad moving review in Las Vegas.",
      "Careful isn't an add-on with us, it's how every move works. Furniture is wrapped in thick moving blankets before it leaves the room. TVs, mirrors and framed art are protected and stay upright. Hardware goes in labeled bags so everything goes back together.",
      "At your new place, beds get set up, tables get their legs back and pieces go where you want them. You don't have to figure out which bolt goes where at midnight.",
    ],
    problems: [
      { pain: "\"They broke my bed frame and put holes in the wall.\"", fix: "We pad furniture and the house. Corners, door frames and banisters get covered before anything moves." },
      { pain: "\"They knew they broke it and didn't tell me.\"", fix: "If anything ever goes wrong, we tell you right away. No hiding it." },
      { pain: "\"The bed was still in pieces when they left.\"", fix: "Reassembly is part of the job. We don't leave until your furniture is set up." },
    ],
    included: [
      "Moving blankets on every piece of furniture",
      "Stretch wrap for upholstery to keep dust and scuffs off",
      "TVs, mirrors, glass and art protected and kept upright",
      "Hardware bagged and labeled per piece",
      "Bed, table, desk and crib reassembly",
      "Furniture placed where you want it",
    ],
    priceFactors: [
      "How many pieces need disassembly and reassembly",
      "Large or delicate items (glass tops, oversized mirrors, big TVs)",
      "Overall size of the move",
    ],
    idealFor: [
      "Nice furniture you actually care about",
      "Families who don't want to spend the first night building beds",
      "Anyone who's had a mover break something before",
    ],
    faqs: [
      { q: "Is furniture wrapping included in every move?", a: "Yes. Every move includes blanket wrapping. It's the difference between a careful move and a costly one." },
      { q: "Do you take TVs off the wall?", a: "We'll pack and move TVs safely. Let us know about wall-mounted TVs when you book and we'll talk through what's included." },
      { q: "What if something gets damaged?", a: "We tell you right away and work with you to make it right. We don't hide it or hope you won't notice." },
      { q: "Do I need to take my bed apart before you arrive?", a: "No, leave it to us. Just strip the bedding and we'll handle the rest." },
    ],
    related: ["/moving/local-moving", "/moving/house-moving", "/guides/red-flags-hiring-movers", "/moving/apartment-condo-moving"],
  },
  {
    slug: "move-and-junk-haul-away",
    category: "moving",
    name: "Move + Junk Haul-Away",
    short: "Don't pay to move stuff you don't want. We move what you keep and haul away the rest.",
    icon: <IconTruckRoute />,
    leadService: "move-and-junk",
    metaTitle: "Movers + Junk Removal Las Vegas | One Crew, One Trip",
    metaDescription:
      "Move and junk removal in one trip. We move what you keep and haul away the rest. One Las Vegas crew, one honest price, no second company to call.",
    h1: "Move + Junk Haul-Away in One Trip",
    tagline: "Why pay to move a couch you're going to throw out? One crew moves what you keep and hauls off the rest.",
    heroPoints: ["One crew, one price, one day", "Stop paying to move junk", "Old place left empty and swept"],
    intro: [
      "Almost every move turns up stuff nobody wants: the broken recliner, the old mattress, the garage shelves full of mystery boxes. Most people either pay to move it and toss it later, or scramble to book a separate junk company.",
      "Because we're movers and junk removal, you don't have to do either. Tell us what's staying and what's going. We move your things to the new place and haul the rest away, on the same day, with one upfront price.",
      "It's the easiest way to downsize, clear out before a sale, or just start fresh without dragging the clutter along.",
    ],
    problems: [
      { pain: "\"We paid to move stuff we threw out a week later.\"", fix: "Sort as you go. What you don't want goes on our junk load, not your moving bill." },
      { pain: "\"We had to find a second company for the junk.\"", fix: "One call, one crew, one price for the move and the haul-away." },
      { pain: "\"The landlord charged us for stuff left behind.\"", fix: "We clear out what's left so you hand back the keys to an empty place." },
    ],
    included: [
      "Full local move of everything you keep",
      "Haul-away of furniture, appliances, boxes and junk you don't want",
      "Donation of usable items when possible",
      "Old place left empty and swept",
      "One upfront price for both",
    ],
    priceFactors: [
      "Size of the move",
      "How much junk is going (by truck space)",
      "Heavy items like appliances or hot tubs",
      "Stairs and access at both places",
    ],
    idealFor: [
      "Downsizing to a smaller home or apartment",
      "Moving out of a rental and leaving it empty",
      "Selling a home and clearing it out",
      "Combining two households into one",
    ],
    faqs: [
      { q: "How do you price the junk part?", a: "Junk is priced by how much truck space it takes plus any heavy items. We confirm it upfront, before we load." },
      { q: "Can I decide what goes on moving day?", a: "Yes. Just point it out. We'll confirm any change to the price before we load it." },
      { q: "What can't you take?", a: "Hazardous materials like paint, chemicals, fuel and propane can't go on the truck. Ask about anything you're unsure of." },
      { q: "Is this cheaper than hiring two companies?", a: "Usually, because it's one crew and one trip, and you don't pay to move things you're getting rid of anyway." },
    ],
    related: ["/moving/local-moving", "/junk-removal/move-out-junk-haul", "/junk-removal/furniture-removal", "/moving/house-moving"],
  },

  /* ============================ JUNK REMOVAL ============================ */
  {
    slug: "furniture-removal",
    category: "junk-removal",
    name: "Furniture Removal",
    short: "Old couches, mattresses, dressers and tables. Point to it and it's gone.",
    icon: <IconSofa />,
    leadService: "junk-removal",
    metaTitle: "Furniture Removal Las Vegas | Couch & Mattress Pickup",
    metaDescription:
      "Furniture removal in Las Vegas: couches, mattresses, sectionals, dressers and more. We do all the lifting. Upfront price, same-day pickup available.",
    h1: "Furniture Removal in Las Vegas",
    tagline: "Point to it and it's gone. Couches, mattresses, dressers and more, carried out without scratching a wall.",
    heroPoints: ["We carry it from any room", "Upfront price before we lift", "Same-day pickup available"],
    intro: [
      "Getting rid of old furniture in Las Vegas usually means wrestling a sectional down the stairs, borrowing a truck and waiting at the dump. Or leaving it by the curb and hoping someone takes it before the HOA letter shows up.",
      "We'll take it from wherever it is: the upstairs bedroom, the back patio, the garage. You don't have to move it to the curb first. We carry it out carefully so your walls, floors and door frames stay in one piece.",
      "One item or a whole house of furniture, you get a clear price before we load anything. Pieces that are still in good shape go to donation when possible.",
    ],
    problems: [
      { pain: "\"I have to drag it to the curb myself?\"", fix: "Nope. We carry it out from wherever it's sitting." },
      { pain: "\"They scraped the walls getting it out.\"", fix: "We move slow through tight spots and protect corners and door frames." },
      { pain: "\"The price changed once they showed up.\"", fix: "Your price is confirmed on-site before we lift. You say yes, or we leave. No pressure." },
    ],
    included: [
      "Couches, sectionals, recliners and chairs",
      "Mattresses and box springs",
      "Dressers, nightstands and bed frames",
      "Dining tables, desks and bookcases",
      "Patio furniture and outdoor sets",
      "Office furniture and cubicles",
    ],
    priceFactors: [
      "How many pieces, and how much truck space they take",
      "Very heavy items like sleeper sofas or solid-wood armoires",
      "Stairs and long carries",
    ],
    idealFor: [
      "Replacing an old couch or mattress",
      "Clearing a spare room",
      "Getting ready to list or rent a home",
      "HOA or landlord deadlines",
    ],
    faqs: [
      { q: "Do I need to bring the furniture outside?", a: "No. We take it from wherever it is in your home, garage or yard." },
      { q: "Do you take mattresses?", a: "Yes. Mattresses and box springs are one of our most common pickups." },
      { q: "Do you donate furniture?", a: "When pieces are in good, usable shape we try to donate them rather than send them to the landfill." },
      { q: "Can you come today?", a: "Often, yes. See our same-day junk pickup page or call and we'll tell you right away." },
    ],
    related: ["/junk-removal/appliance-removal", "/junk-removal/same-day-junk-pickup", "/guides/junk-removal-cost-las-vegas", "/junk-removal/garage-cleanouts"],
  },
  {
    slug: "appliance-removal",
    category: "junk-removal",
    name: "Appliance Removal",
    short: "Fridges, washers, dryers and water heaters hauled out without scratching your floors.",
    icon: <IconDiamond />,
    leadService: "junk-removal",
    metaTitle: "Appliance Removal Las Vegas | Fridge, Washer & Dryer Pickup",
    metaDescription:
      "Appliance removal in Las Vegas & Henderson. Refrigerators, washers, dryers, water heaters and more hauled away safely. Upfront pricing, same-day service.",
    h1: "Appliance Removal in Las Vegas",
    tagline: "Heavy, awkward and easy to scratch the floor with. Let us haul out the old fridge, washer or dryer.",
    heroPoints: ["Heavy lifting handled", "Floors and doorways protected", "Recycled responsibly when possible"],
    intro: [
      "New appliances are exciting until you realize the old one has to go somewhere. Refrigerators are heavy and top-heavy, washers still have water in them, and dragging a dryer across new tile is how you crack it.",
      "We remove old appliances from kitchens, laundry rooms, garages and backyards across the Las Vegas valley. We use dollies and floor protection, get it out without dinging the walls and haul it away to be recycled where possible.",
      "Getting an appliance delivered but the store won't take the old one? Call us and we'll time the pickup around it.",
    ],
    problems: [
      { pain: "\"They gouged my new floors pulling the fridge out.\"", fix: "We protect floors and use the right dollies for heavy appliances." },
      { pain: "\"The delivery guys wouldn't take the old one.\"", fix: "We'll haul it away, the same day if you need it." },
      { pain: "\"Hidden fees for the heavy stuff.\"", fix: "Heavy items are priced upfront so you know before we lift." },
    ],
    included: [
      "Refrigerators and freezers",
      "Washers and dryers",
      "Stoves, ovens and dishwashers",
      "Water heaters (disconnected)",
      "Microwaves, window AC units and small appliances",
      "Hot tubs and exercise equipment (ask for a quote)",
    ],
    priceFactors: [
      "Type and number of appliances",
      "Stairs or tight access",
      "Whether the appliance is already disconnected",
    ],
    idealFor: [
      "Kitchen or laundry upgrades",
      "Landlords turning over a rental",
      "Clearing the garage fridge that died years ago",
    ],
    faqs: [
      { q: "Do you disconnect appliances?", a: "Please have appliances disconnected from gas, water and electric before we arrive. We handle everything after that." },
      { q: "What happens to my old appliance?", a: "We take appliances to be recycled where possible, since most of the metal can be reused." },
      { q: "Can you take a water heater?", a: "Yes, once it's disconnected and drained." },
      { q: "Can you pick up just one appliance?", a: "Yes. One fridge or a whole laundry room. You get an upfront price either way." },
    ],
    related: ["/junk-removal/furniture-removal", "/junk-removal/garage-cleanouts", "/junk-removal/same-day-junk-pickup", "/guides/junk-removal-cost-las-vegas"],
  },
  {
    slug: "garage-cleanouts",
    category: "junk-removal",
    name: "Garage Cleanouts",
    short: "Your garage called. It wants to be a garage again. We clear it top to bottom.",
    icon: <IconTapeBox />,
    leadService: "garage-cleanout",
    metaTitle: "Garage Cleanout Las Vegas | Park in Your Garage Again",
    metaDescription:
      "Garage cleanouts in Las Vegas, Henderson & Summerlin. Boxes, old furniture, tools, shelves and junk cleared top to bottom. Upfront pricing, same-day available.",
    h1: "Garage Cleanouts in Las Vegas",
    tagline: "Your garage called. It wants to be a garage again. We clear it top to bottom so you can park in it.",
    heroPoints: ["You point, we carry", "Keep, donate or haul, your call", "Swept clean when we're done"],
    intro: [
      "In Las Vegas the garage becomes everything: storage unit, workshop, gym, and the place boxes go to be forgotten. Add 115-degree summers and nobody wants to spend a weekend sorting it.",
      "Our crew does the heavy part. You tell us what stays and we carry out the rest: old furniture, broken shelving, boxes, exercise equipment, yard stuff, the works. We load it, sweep the floor and haul it away the same day.",
      "Want to sort first? Grab our free garage cleanout checklist. It walks you through keep, donate and toss in one afternoon.",
    ],
    problems: [
      { pain: "\"It's too hot to spend a weekend in the garage.\"", fix: "We do the lifting and carrying. You just point at what goes." },
      { pain: "\"Don't know what it'll cost until they're done.\"", fix: "You get the price upfront, based on how much truck space it takes." },
      { pain: "\"They left a mess behind.\"", fix: "We sweep up when we're done. Your garage is ready to park in." },
    ],
    included: [
      "Boxes, bins and old storage",
      "Old furniture and mattresses",
      "Shelving, workbenches and cabinets",
      "Exercise equipment and bikes",
      "Yard tools, holiday decorations and sports gear",
      "Sweeping up when we're done",
    ],
    priceFactors: [
      "How full the garage is (quarter, half or full truckload)",
      "Heavy items like treadmills, safes or workbenches",
      "Anything hazardous that needs separate disposal (paint, chemicals)",
    ],
    idealFor: [
      "Getting the car back in the garage",
      "Pre-sale or pre-move cleanouts",
      "Turning the garage into a gym or workshop",
      "Clearing a rental between tenants",
    ],
    faqs: [
      { q: "How long does a garage cleanout take?", a: "Most garages take a few hours. A packed 3-car garage can take most of a day." },
      { q: "Do I need to sort everything first?", a: "No. Just tell us what to keep. You can sort alongside the crew, or use our free checklist to sort ahead of time." },
      { q: "Can you take paint and chemicals?", a: "We can't haul paint, oil, pool chemicals, fuel or propane. Clark County has household hazardous waste drop-offs for those, and we'll point you to them." },
      { q: "Can you donate usable stuff?", a: "Yes, when possible. Set aside what you want donated, or ask the crew." },
    ],
    related: ["/guides/garage-cleanout-checklist", "/junk-removal/estate-cleanouts", "/junk-removal/furniture-removal", "/guides/junk-removal-cost-las-vegas"],
  },
  {
    slug: "estate-cleanouts",
    category: "junk-removal",
    name: "Estate Cleanouts",
    short: "A respectful, patient crew for a hard time. We clear the whole home with care.",
    icon: <IconBuildings />,
    leadService: "estate-cleanout",
    metaTitle: "Estate Cleanout Las Vegas | Respectful Whole-Home Cleanouts",
    metaDescription:
      "Estate cleanouts in Las Vegas handled with patience and respect. Whole-home clear-outs, keepsakes set aside, donations handled. Honest, upfront pricing.",
    h1: "Estate Cleanouts in Las Vegas",
    tagline: "A respectful, patient crew for a hard time. We clear the whole home and treat every room with care.",
    heroPoints: ["Patient and respectful", "Keepsakes and papers set aside", "Whole home cleared, start to finish"],
    intro: [
      "Clearing out a loved one's home is emotional and exhausting, and often has to happen on a deadline: a sale, a lease, an estate settlement. The last thing your family needs is a crew that rushes, jokes around or treats a lifetime of belongings like trash.",
      "We slow down. We work room by room, set aside photos, papers, jewelry and anything that looks personal, and check with you before anything leaves. What your family wants to keep gets moved. What can be donated goes to donation when possible. The rest is hauled away.",
      "We work directly with families, executors, realtors and property managers across the Las Vegas valley, including when family members are out of state.",
    ],
    problems: [
      { pain: "\"They were disrespectful in my mother's home.\"", fix: "Our crew is kind, patient and respectful. We treat every room like it belonged to our own family." },
      { pain: "\"Important papers got thrown out.\"", fix: "We set aside documents, photos and keepsakes and check with you before anything goes." },
      { pain: "\"We had to hire three different companies.\"", fix: "We move what the family keeps, arrange donation and haul the rest. One crew." },
    ],
    included: [
      "Room-by-room clear-out of the whole home",
      "Personal items, photos and papers set aside for family",
      "Moving kept items to a family member's home or storage",
      "Donation of usable furniture and household goods when possible",
      "Haul-away of everything else",
      "Home left broom-clean, ready for sale or turnover",
    ],
    priceFactors: [
      "Size of the home and how full it is",
      "Items being moved vs. donated vs. hauled",
      "Garage, shed and yard contents",
      "Timeline and access",
    ],
    idealFor: [
      "Families settling a loved one's estate",
      "Executors and estate attorneys",
      "Realtors preparing a home for sale",
      "Out-of-state families who can't be there every day",
    ],
    faqs: [
      { q: "Do we need to be there for the cleanout?", a: "Not necessarily. Many families walk through with us once, mark what to keep, and let us handle the rest. We keep you updated along the way." },
      { q: "What do you do with valuables or papers you find?", a: "We set aside anything that looks personal or important (documents, photos, jewelry, cash) and give it to the family." },
      { q: "Can you move some items to family members?", a: "Yes. As movers too, we can deliver kept furniture and boxes anywhere in the valley." },
      { q: "How fast can you clear a whole house?", a: "Most homes take one to two days depending on size and how full they are. We'll give you a timeline with your quote." },
    ],
    related: ["/junk-removal/garage-cleanouts", "/moving/move-and-junk-haul-away", "/junk-removal/furniture-removal", "/moving/local-moving"],
  },
  {
    slug: "move-out-junk-haul",
    category: "junk-removal",
    name: "Move-Out Junk Haul",
    short: "Leaving stuff behind? We haul away everything that isn't coming to the new place.",
    icon: <IconBin />,
    leadService: "junk-removal",
    metaTitle: "Move-Out Junk Removal Las Vegas | Leave It Empty",
    metaDescription:
      "Move-out junk removal in Las Vegas. We haul away everything left behind so you get your deposit back. Tenants, landlords and sellers. Upfront pricing.",
    h1: "Move-Out Junk Removal in Las Vegas",
    tagline: "Leaving stuff behind? We haul away everything that isn't coming to the new place, so you hand back the keys to an empty home.",
    heroPoints: ["Protect your deposit", "Tenants, landlords and sellers", "Done fast, swept clean"],
    intro: [
      "The last day of a move is always the worst: you're exhausted, the truck is full, and there's still a couch, a broken TV and a pile of bags in the garage. Leave it and the landlord bills you for removal. Or the buyer's walkthrough goes badly.",
      "We come in at the end and clear it all: furniture, mattresses, appliances, boxes and trash bags. We sweep up and you hand back the keys to an empty place.",
      "Landlords and property managers use us between tenants to clear out what the last renter left, fast, so the unit can be cleaned and listed.",
    ],
    problems: [
      { pain: "\"Landlord kept my deposit for stuff I left.\"", fix: "We clear everything out so the place is empty and ready for the walkthrough." },
      { pain: "\"No time left on moving day.\"", fix: "Book us for the end of the day or the next morning. We'll finish it." },
      { pain: "\"Tenants left a mess and I need to relist.\"", fix: "Fast turnover cleanouts for landlords and property managers." },
    ],
    included: [
      "Furniture, mattresses and appliances left behind",
      "Trash bags, boxes and loose junk",
      "Garage, patio and closet leftovers",
      "Sweeping up after",
      "Donation of usable items when possible",
    ],
    priceFactors: ["How much is left (by truck space)", "Heavy items and appliances", "Stairs and access"],
    idealFor: [
      "Renters protecting their deposit",
      "Landlords and property managers between tenants",
      "Home sellers before closing",
      "Anyone who ran out of time on moving day",
    ],
    faqs: [
      { q: "Can you come after my movers leave?", a: "Yes. Or save a step and have us do the move and the haul-away together with Move + Junk Haul-Away." },
      { q: "Do you work with property managers?", a: "Yes. We do turnover cleanouts across the valley and can work with lockbox or gate-code access." },
      { q: "Will you clean the unit?", a: "We haul everything out and sweep up. For a deep clean you'll want a cleaning company after us." },
    ],
    related: ["/moving/move-and-junk-haul-away", "/junk-removal/furniture-removal", "/moving/apartment-condo-moving", "/junk-removal/same-day-junk-pickup"],
  },
  {
    slug: "same-day-junk-pickup",
    category: "junk-removal",
    name: "Same-Day Junk Pickup",
    short: "Call in the morning, junk gone today. Upfront pricing before we load a single thing.",
    icon: <IconHourglass />,
    leadService: "junk-removal",
    metaTitle: "Same Day Junk Removal Las Vegas | Junk Gone Today",
    metaDescription:
      "Same-day junk removal in Las Vegas, Henderson & Summerlin. Call in the morning, junk gone today. Furniture, appliances, garage junk. Upfront price. (702) 527-8565.",
    h1: "Same-Day Junk Removal in Las Vegas",
    tagline: "Junk gone today. Call in the morning and it's usually gone by the afternoon.",
    heroPoints: ["Often there within hours", "Upfront price before we load", "You don't lift a thing"],
    intro: [
      "Junk doesn't wait for a convenient week. The HOA sent a notice, the new couch is arriving tomorrow, the house lists Friday, or you're just done looking at it.",
      "Call us in the morning and we can often be there the same day. A real person answers, gets a quick description (or photos) and gives you a ballpark on the phone. The crew confirms the price on-site before anything goes on the truck.",
      "One item or a truckload, from anywhere in your home or yard, gone today.",
    ],
    problems: [
      { pain: "\"Every company said next week.\"", fix: "We keep room in the schedule for same-day pickups. Call early for the best chance." },
      { pain: "\"The window was 8 to 5 and nobody called.\"", fix: "We call when we're on the way so you're not stuck waiting all day." },
      { pain: "\"The price went up when they arrived.\"", fix: "Upfront, on-site price before we load. You say yes, or we leave." },
    ],
    included: [
      "Same-day pickup across the Las Vegas valley",
      "Furniture, appliances, mattresses, boxes and yard junk",
      "All lifting and loading",
      "Sweep-up after",
      "Donation and recycling when possible",
    ],
    priceFactors: ["How much truck space the junk takes", "Heavy items", "Stairs and access", "Time of day"],
    idealFor: [
      "HOA or code deadlines",
      "New furniture arriving",
      "Listing a home fast",
      "Anyone who wants it gone today",
    ],
    faqs: [
      { q: "What time do I need to call for same-day pickup?", a: "The earlier the better. Morning calls have the best chance of a same-day slot." },
      { q: "Can you send a price before you come?", a: "Yes. Send photos or describe what's going and we'll give you a ballpark. The crew confirms the exact price before loading." },
      { q: "What can't you take?", a: "Hazardous materials like paint, chemicals, fuel, propane and asbestos. Ask if you're not sure." },
    ],
    related: ["/junk-removal/furniture-removal", "/junk-removal/appliance-removal", "/moving/same-day-moving", "/guides/junk-removal-cost-las-vegas"],
  },
];

export const servicesIn = (c: Category) => SERVICES.filter((s) => s.category === c);
export const findService = (c: Category, slug: string) => SERVICES.find((s) => s.category === c && s.slug === slug);
export const serviceHref = (s: Service) => `/${s.category}/${s.slug}`;
