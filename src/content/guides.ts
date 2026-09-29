import type { Faq } from "@/components/ui";
import { JUNK_ITEM_PRICES, JUNK_LOAD_PRICES } from "./pricing";

/*
 * Guides / blog posts (/guides/<slug>). Each one answers a real question people search for,
 * gives them something useful for free, then offers to do the job for them.
 */

export type Block = {
  h2: string;
  paras?: string[];
  list?: string[];
  checklist?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  updated: string; // YYYY-MM-DD
  printable?: boolean;
  intro: string[];
  blocks: Block[];
  faqs?: Faq[];
  leadService: string;
  ctaHeading: string;
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "moving-day-checklist",
    title: "Moving Day Checklist (Free Printable)",
    metaTitle: "Moving Day Checklist: Free Printable for Las Vegas Moves",
    metaDescription:
      "A free printable moving checklist: what to do 8 weeks out, 4 weeks out, 1 week out and on moving day. Written by Las Vegas movers so nothing gets missed.",
    excerpt: "Everything to do eight weeks out, one week out and on moving day so nothing gets missed.",
    updated: "2026-09-01",
    printable: true,
    intro: [
      "Moving shouldn't be a headache, and most of the headache comes from things that get remembered too late: the utilities, the elevator reservation, the box with the bed bolts in it. This is the same checklist we give our own customers.",
      "Print it, stick it on the fridge and check things off as you go. Hit the print button and it comes out clean on paper.",
    ],
    blocks: [
      {
        h2: "8 weeks before",
        checklist: [
          "Pick your moving date (mid-month is easier to book than the 1st or 30th)",
          "Get 2–3 upfront quotes and ask each mover what could change the price",
          "Start a moving folder for quotes, leases, receipts and closing papers",
          "Walk through every room and decide what's not coming with you",
          "Book junk removal or schedule donation pickups for the stuff that's going",
        ],
      },
      {
        h2: "4 weeks before",
        checklist: [
          "Book your movers and get your price in writing",
          "Ask your HOA or building about move hours, elevator reservations and insurance paperwork",
          "Order boxes, tape, markers and packing paper",
          "Start packing rooms you rarely use: guest room, garage, closets",
          "Submit a USPS change of address",
          "Schedule utilities: NV Energy, Southwest Gas, water, internet. Start at the new place, stop at the old one",
        ],
      },
      {
        h2: "1 week before",
        checklist: [
          "Confirm your mover's arrival time and give them gate codes or parking notes",
          "Pack everything but the essentials. Label each box with the room it goes to",
          "Pack an overnight bag: chargers, meds, toiletries, a change of clothes",
          "Defrost and clean the fridge if it's moving",
          "Take photos of how your electronics are wired",
          "Measure big furniture and the doorways at the new place",
        ],
      },
      {
        h2: "The day before",
        checklist: [
          "Strip the beds and bag the bedding",
          "Set aside a \"do not load\" zone for valuables, documents and your overnight bag",
          "Charge your phone. Your mover will call when they're on the way",
          "Reserve a parking spot or clear the driveway for the truck",
          "In summer: fill a cooler with water for everyone",
        ],
      },
      {
        h2: "Moving day",
        checklist: [
          "Do a walk-through with the crew lead: what's going, what's fragile, what's staying",
          "Keep kids and pets in one closed room or with a sitter",
          "Check every room, closet, cabinet and the garage before the truck leaves",
          "At the new place, point the crew to each room",
          "Make sure beds and tables are put back together before the crew leaves",
          "Check that the final price matches your quote",
        ],
      },
      {
        h2: "First week in your new home",
        checklist: [
          "Unpack the kitchen and bedrooms first",
          "Change the locks and garage codes",
          "Update your address with the DMV (Nevada gives new residents 30 days), banks and insurance",
          "Book a pickup for empty boxes and anything that didn't fit",
        ],
      },
    ],
    faqs: [
      { q: "How far in advance should I book movers in Las Vegas?", a: "Two to four weeks is ideal, longer for the last or first days of the month. If you're short on time, we also do same-day and last-minute moves." },
      { q: "What should I not pack in the moving truck?", a: "Keep important documents, medications, jewelry, cash, and anything heat-sensitive (in summer) with you. Movers can't transport hazardous materials like propane, paint or fuel." },
    ],
    leadService: "local-move",
    ctaHeading: "Want us to handle the heavy part?",
    related: ["/guides/how-to-prepare-for-moving-day", "/free-tools/moving-cost-calculator", "/guides/red-flags-hiring-movers"],
  },
  {
    slug: "junk-removal-cost-las-vegas",
    title: "How Much Does Junk Removal Cost in Las Vegas?",
    metaTitle: "Junk Removal Cost in Las Vegas (2026 Prices)",
    metaDescription:
      "What junk removal costs in Las Vegas in 2026: single items, quarter, half and full truckloads, plus what drives the price and how to save.",
    excerpt: "Typical prices for furniture, appliances and full garage cleanouts, and what drives the cost.",
    updated: "2026-09-01",
    intro: [
      "Most junk removal companies in Las Vegas price by how much space your stuff takes up in the truck, plus extra for very heavy items. The problem is that a lot of them won't tell you a number until the truck is already in your driveway.",
      "Here are typical Las Vegas price ranges so you know what's fair before you call anyone. We always confirm your exact price on-site before we load a single thing.",
    ],
    blocks: [
      {
        h2: "Junk removal cost by truckload",
        paras: ["This is how most junk jobs are priced. One full truck is roughly a packed two-car garage's worth of stuff."],
        table: { head: ["Load size", "What it usually covers", "Typical price"], rows: JUNK_LOAD_PRICES.map((r) => [r.load, r.covers, r.range]) },
      },
      {
        h2: "Junk removal cost by item",
        table: { head: ["Item", "Typical price"], rows: JUNK_ITEM_PRICES.map((r) => [r.item, r.range]) },
      },
      {
        h2: "What makes junk removal cost more",
        list: [
          "Volume: the more truck space it takes, the more it costs",
          "Weight: concrete, dirt, roofing and pianos are heavy and cost more to dump",
          "Access: stairs, long carries and tight hallways add time",
          "Disassembly: hot tubs, swing sets and sheds need to be taken apart",
          "Special disposal: tires, mattresses and appliances can carry extra fees at the transfer station",
        ],
      },
      {
        h2: "How to save on junk removal",
        list: [
          "Bundle it: one bigger load costs less than two small visits",
          "Break down boxes and bag loose junk so it packs tighter",
          "Set aside anything you can sell or donate yourself",
          "Moving soon? Add haul-away to your move so the same crew and truck handle both",
          "Get the price upfront. If a company won't give you one before loading, call someone else",
        ],
      },
      {
        h2: "What junk removal can't take",
        paras: ["No junk hauler in Nevada can take hazardous waste in a regular truck. That includes:"],
        list: ["Paint, stains and solvents", "Motor oil, fuel and propane tanks", "Pool chemicals and pesticides", "Asbestos", "Medical waste"],
      },
    ],
    faqs: [
      { q: "Is it cheaper to take junk to the dump myself?", a: "For a few bags, yes. For furniture and appliances, once you count a truck rental, dump fees, gas and a sore back, a hauler is often close in price and a lot easier." },
      { q: "Do you charge by the hour or by volume?", a: "We price junk removal by volume and heavy items, confirmed upfront before we start. You're never paying for us to stand around." },
      { q: "Can I get a price over the phone?", a: "Yes. Describe what's going or send a couple of photos and we'll give you a ballpark. The crew confirms the exact price on-site before loading." },
    ],
    leadService: "junk-removal",
    ctaHeading: "Get your exact junk removal price",
    related: ["/junk-removal/same-day-junk-pickup", "/junk-removal/garage-cleanouts", "/guides/garage-cleanout-checklist"],
  },
  {
    slug: "garage-cleanout-checklist",
    title: "Garage Cleanout Checklist (Free Printable)",
    metaTitle: "Garage Cleanout Checklist: Clear Your Garage in One Weekend",
    metaDescription:
      "A free printable garage cleanout checklist from Las Vegas junk removal pros. Sort keep/donate/toss, handle hazardous waste and get your parking spot back.",
    excerpt: "Keep, donate or toss: a step-by-step plan to get your car back in the garage in one weekend.",
    updated: "2026-09-01",
    printable: true,
    intro: [
      "Your garage called. It wants to be a garage again. This checklist is the same process our crew uses on garage cleanouts all over Las Vegas. Print it out and work top to bottom.",
      "Las Vegas tip: in summer, start at sunrise. Garages hit 120 degrees by the afternoon.",
    ],
    blocks: [
      {
        h2: "Before you start",
        checklist: [
          "Pick a day and block off 4–6 hours",
          "Set up three zones on the driveway: KEEP, DONATE, TOSS",
          "Grab heavy-duty trash bags, gloves, a marker and a broom",
          "Book a junk pickup for the end of the day so the TOSS pile doesn't sit",
        ],
      },
      {
        h2: "Sort it",
        checklist: [
          "Pull everything off the floor first, starting nearest the door",
          "Open every box. If you haven't opened it in two years, it's probably DONATE or TOSS",
          "Test tools, bikes and appliances. Broken goes to TOSS",
          "Check holiday decorations: keep what you used last year",
          "Kids' stuff they've outgrown goes to DONATE",
          "Old paint, oil and chemicals get their own pile (see below)",
        ],
      },
      {
        h2: "Handle the hazardous stuff",
        paras: ["These can't go in your trash can or on a junk truck. Clark County runs household hazardous waste drop-off events and sites."],
        checklist: [
          "Old paint and stains",
          "Motor oil, antifreeze and fuel",
          "Pool chemicals and pesticides",
          "Propane tanks",
          "Batteries and fluorescent bulbs",
        ],
      },
      {
        h2: "Put it back better",
        checklist: [
          "Sweep and hose down the floor",
          "Install wall shelving or ceiling racks to get things off the ground",
          "Use clear, labeled bins",
          "Keep everyday items near the door, seasonal items up high",
          "Mark a parking outline on the floor so the clutter doesn't creep back",
        ],
      },
      {
        h2: "Haul it away",
        checklist: [
          "Drop off DONATE items or schedule a charity pickup",
          "Have a junk crew haul the TOSS pile. Get the price upfront",
          "Recycle cardboard",
        ],
      },
    ],
    leadService: "garage-cleanout",
    ctaHeading: "Rather skip the sweaty part? We'll clear it for you.",
    related: ["/junk-removal/garage-cleanouts", "/guides/junk-removal-cost-las-vegas", "/junk-removal/same-day-junk-pickup"],
  },
  {
    slug: "red-flags-hiring-movers",
    title: "7 Red Flags When Hiring Las Vegas Movers",
    metaTitle: "7 Red Flags When Hiring Movers in Las Vegas",
    metaDescription:
      "Hidden fees, no-shows and slow crews on the clock. Seven red flags to spot a bad Las Vegas mover before you book, from 200+ real local reviews.",
    excerpt: "Hidden fees, no-shows and slow crews on the clock. How to spot a bad mover before you book.",
    updated: "2026-09-01",
    intro: [
      "We read more than 200 real Google reviews of Las Vegas moving companies. The bad ones all tell the same seven stories. Here's how to spot each problem before you book, and what to ask instead.",
    ],
    blocks: [
      {
        h2: "1. They won't explain the price upfront",
        paras: [
          "\"The final bill was more than double the original quote.\" It's the most common complaint we saw. If a mover gives you a number but can't explain what's in it or what could change it, expect a surprise on moving day.",
          "Ask: \"What exactly could make my price go up, and will you tell me before it does?\"",
        ],
      },
      {
        h2: "2. Fees show up at the end",
        paras: [
          "Fuel fees, stair fees, \"long carry\" fees, blanket rental. When they're mentioned for the first time at the end of the move, you have no choice but to pay.",
          "Ask for every possible fee in writing before you book.",
        ],
      },
      {
        h2: "3. Nobody calls back",
        paras: [
          "If the office is hard to reach before you've paid them, it won't get easier after. Rude phone calls, hang-ups and \"we'll get back to you\" are a preview of moving day.",
          "Test it: call during business hours and see if a real person picks up.",
        ],
      },
      {
        h2: "4. They're vague about arrival time",
        paras: [
          "\"Had an 11am estimate… they showed up at 5pm, and nobody called me.\" A good mover gives you a real arrival window and calls when they're on the way.",
        ],
      },
      {
        h2: "5. The crew stands around on your dime",
        paras: [
          "On hourly moves, slow crews cost you money: long breaks, gas station stops, standing around. Ask how the crew is sized for your home and whether drive time is billed.",
        ],
      },
      {
        h2: "6. They don't mention damage protection",
        paras: [
          "If a mover doesn't talk about blanket-wrapping furniture, padding door frames or what happens when something breaks, assume it isn't a priority.",
          "Ask: \"If something gets damaged, what happens?\" The right answer starts with \"we tell you right away.\"",
        ],
      },
      {
        h2: "7. \"Moving\" means dumping it in the garage",
        paras: [
          "\"Everything left in the garage for me to move into the house. That's why I pay movers.\" Make sure your quote includes placing boxes in the right rooms and reassembling beds and tables.",
        ],
      },
      {
        h2: "Quick questions to ask any mover",
        checklist: [
          "What's included in my price, and what could change it?",
          "Is drive time billed? Is there a truck or travel fee?",
          "Do you wrap furniture and protect floors and door frames?",
          "Will you put boxes in the right rooms and reassemble furniture?",
          "Will you call when you're on the way?",
          "What happens if something is damaged?",
        ],
      },
    ],
    leadService: "local-move",
    ctaHeading: "Ask us all seven. We'll answer.",
    related: ["/moving/local-moving", "/moving/furniture-wrapping-setup", "/guides/moving-day-checklist"],
  },
  {
    slug: "how-to-prepare-for-moving-day",
    title: "How to Prepare for Moving Day in Las Vegas",
    metaTitle: "How to Prepare for Moving Day (Las Vegas Tips From Movers)",
    metaDescription:
      "How to prepare for moving day in Las Vegas: packing, heat, HOAs, parking and what to set aside, from a local crew that moves families every week.",
    excerpt: "Packing tips, heat, HOAs and parking. What to do so moving day goes fast and costs less.",
    updated: "2026-09-01",
    intro: [
      "A well-prepared move goes faster, and on an hourly move, faster means cheaper. Here's what we wish every customer knew before we showed up.",
    ],
    blocks: [
      {
        h2: "Pack smart, not just fast",
        list: [
          "Heavy things in small boxes (books, dishes), light things in big boxes (linens, pillows)",
          "Fill boxes all the way. Half-empty boxes crush when stacked",
          "Label the top and one side with the room and contents",
          "Tape the bed and table hardware in a bag to the piece it came from",
          "Leave dresser drawers empty unless your mover says otherwise",
        ],
      },
      {
        h2: "Plan for Las Vegas heat",
        list: [
          "In summer, book the earliest start you can get",
          "Move electronics, vinyl records, candles, makeup and medications in your air-conditioned car",
          "Have water ready for everyone, including the crew",
          "Turn the AC on at the new place the day before if you can",
        ],
      },
      {
        h2: "Sort out access and parking",
        list: [
          "Get your mover on the guard-gate list for gated communities",
          "Reserve elevators and loading docks in apartment and condo buildings",
          "Ask your HOA about move hours and where trucks can park",
          "Clear the driveway at both homes so the truck can get close. Long carries add time",
        ],
      },
      {
        h2: "Set aside a do-not-load zone",
        paras: [
          "Pick one closet or a bathroom and put everything that rides with you in it: documents, medications, jewelry, laptops, chargers, keys, and your first-night bag. Tell the crew it's off-limits.",
        ],
      },
      {
        h2: "Get rid of stuff before you move it",
        paras: [
          "Every item you move costs time. If you won't use it at the new place, don't pay to move it. Schedule junk removal before moving day, or have your movers haul it away the same trip.",
        ],
      },
      {
        h2: "On the day",
        list: [
          "Walk the crew lead through the home before they start",
          "Point out anything fragile or valuable",
          "Keep pets and kids in a closed room",
          "At the new home, stand at the door and direct boxes to rooms",
          "Check every closet and cabinet before the truck leaves",
        ],
      },
    ],
    leadService: "local-move",
    ctaHeading: "Prepared? Now let us do the lifting.",
    related: ["/guides/moving-day-checklist", "/moving/move-and-junk-haul-away", "/free-tools/moving-cost-calculator"],
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
