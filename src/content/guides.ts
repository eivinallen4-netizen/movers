import type { Faq } from "@/components/ui";
import { DISTANCES, HOME_SIZES, HOURLY_PER_MOVER, JUNK_ITEM_PRICES, JUNK_LOAD_PRICES, TRUCK_FEE } from "./pricing";

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
  /** Outside websites worth visiting (store pages, city services, free listings). Open in a new tab. */
  links?: ExternalLink[];
};

export type ExternalLink = { label: string; href: string; note?: string };

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

/** Price range for a typical across-town move with no stairs, using the same math as the moving cost calculator. */
function moveRange(h: (typeof HOME_SIZES)[number]) {
  const drive = DISTANCES[1].hours;
  const round = (n: number) => Math.round(n / 10) * 10;
  const low = round(h.crew * HOURLY_PER_MOVER.low * Math.max(2, h.hours[0] + drive) + TRUCK_FEE.low);
  const high = round(h.crew * HOURLY_PER_MOVER.high * Math.max(2, h.hours[1] + drive) + TRUCK_FEE.high);
  return `$${low.toLocaleString("en-US")} – $${high.toLocaleString("en-US")}`;
}

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
      {
        h2: "Helpful links",
        links: [
          { label: "USPS change of address", href: "https://www.usps.com/manage/forward.htm", note: "Forward your mail. Do it at least two weeks out." },
          { label: "NV Energy", href: "https://www.nvenergy.com/", note: "Start, stop or transfer electric service." },
          { label: "Southwest Gas", href: "https://www.swgas.com/", note: "Start or stop gas service." },
          { label: "Nevada DMV: new residents", href: "https://dmv.nv.gov/newresident.htm", note: "License and registration rules if you're new to Nevada." },
        ],
      },
    ],
    faqs: [
      { q: "How far in advance should I book movers in Las Vegas?", a: "Two to four weeks is ideal, longer for the last or first days of the month. If you're short on time, we also do same-day and last-minute moves." },
      { q: "What should I not pack in the moving truck?", a: "Keep important documents, medications, jewelry, cash, and anything heat-sensitive (in summer) with you. Movers can't transport hazardous materials like propane, paint or fuel." },
    ],
    leadService: "local-move",
    ctaHeading: "Want us to handle the heavy part?",
    related: ["/guides/where-to-get-moving-boxes-las-vegas", "/guides/how-to-prepare-for-moving-day", "/free-tools/moving-cost-calculator", "/guides/red-flags-hiring-movers"],
  },
  {
    slug: "where-to-get-moving-boxes-las-vegas",
    title: "Where to Get Moving Boxes in Las Vegas (Free & Cheap)",
    metaTitle: "Where to Get Free & Cheap Moving Boxes in Las Vegas",
    metaDescription:
      "Where to find free moving boxes in Las Vegas, the cheapest places to buy them, and how many you actually need. Local spots, free listings and store links from Las Vegas movers.",
    excerpt: "Free boxes from local stores and neighbors, the cheapest places to buy them, and how many you'll actually need.",
    updated: "2026-10-04",
    intro: [
      "Boxes add up fast. A two-bedroom move can take 40 or more, and buying them all new can cost more than people expect. The good news: Las Vegas has a lot of places that give boxes away, and a few spots that sell them cheap.",
      "Here's where our customers actually find boxes, plus links so you can check stock before you drive over. Store policies change by location and manager, so call ahead before you make a trip.",
    ],
    blocks: [
      {
        h2: "Where to find free moving boxes",
        paras: [
          "These are the places commonly known for giving boxes away. Ask nicely, ask early in the day and ask when their trucks come in. Many stores break down boxes right after restocking.",
        ],
        list: [
          "Liquor stores: wine and liquor boxes are small, strong and have dividers that are perfect for glasses and dishes",
          "Grocery stores: produce and paper-goods boxes are sturdy. Ask the stocking crew or customer service",
          "Costco and Sam's Club: free empty boxes are usually stacked near the registers for carrying out your purchase",
          "Big-box and dollar stores: Walmart, Target and dollar stores often have boxes from overnight stocking",
          "Bookstores: book boxes are small and built for weight, great for books, files and records",
          "Coffee shops and restaurants: ask for the boxes cups and supplies came in",
          "Your office or building: mailrooms and front desks get boxes all week",
          "Friends who just moved: most people are happy to hand off a garage full of flattened boxes",
        ],
      },
      {
        h2: "Free boxes from neighbors online",
        paras: [
          "Lots of people around the valley finish a move and just want their boxes gone. Search \"moving boxes\" on these and you'll usually find someone nearby giving away a whole stack:",
        ],
        links: [
          { label: "Facebook Marketplace: Free in Las Vegas", href: "https://www.facebook.com/marketplace/lasvegas/free", note: "The fastest way to find free boxes. Search \"moving boxes\" and sort by distance." },
          { label: "Craigslist Las Vegas: Free Stuff", href: "https://lasvegas.craigslist.org/search/zip", note: "People post \"free moving boxes, come get them\" here every week." },
          { label: "Nextdoor", href: "https://nextdoor.com/", note: "Post in your neighborhood asking for boxes. Someone on your street just moved." },
          { label: "Buy Nothing Project", href: "https://buynothingproject.org/", note: "Hyper-local giving groups. Find the one for your part of town." },
          { label: "Freecycle", href: "https://www.freecycle.org/", note: "Free-only listings. Search for your local Las Vegas or Henderson group." },
          { label: "U-Haul Box Exchange", href: "https://www.uhaul.com/Exchange/", note: "A free board where people list used boxes they're giving away, or post that they need some." },
        ],
      },
      {
        h2: "Cheapest places to buy moving boxes",
        paras: [
          "If you want matching sizes that stack well, buying is worth it, at least for some of your boxes. These all have locations around Las Vegas and Henderson, and most let you check stock online or order for pickup:",
        ],
        links: [
          { label: "Home Depot moving boxes", href: "https://www.homedepot.com/s/moving%20boxes", note: "Usually among the cheapest per box. Good for small and medium boxes in bulk." },
          { label: "Lowe's moving boxes", href: "https://www.lowes.com/search?searchTerm=moving%20boxes", note: "Similar pricing to Home Depot. Sells moving kits too." },
          { label: "U-Haul moving boxes", href: "https://www.uhaul.com/MovingSupplies/Boxes/", note: "Wardrobe, dish-pack and TV boxes. Ask your store about buying back unused boxes with a receipt." },
          { label: "Walmart moving boxes", href: "https://www.walmart.com/search?q=moving+boxes", note: "Handy if you're already shopping. Bundles of boxes and tape." },
          { label: "Staples moving boxes", href: "https://www.staples.com/moving+boxes/directory_moving+boxes", note: "Good for file boxes and small heavy-duty boxes." },
          { label: "The UPS Store", href: "https://www.theupsstore.com/", note: "Pricier, but good for odd sizes, picture boxes and bubble wrap." },
        ],
      },
      {
        h2: "How many boxes you'll need",
        paras: ["Rough counts for a typical home. If you have a lot of books, a full kitchen or a packed garage, plan for more."],
        table: {
          head: ["Home size", "Small", "Medium", "Large", "Total"],
          rows: [
            ["Studio", "8", "6", "3", "15 – 20"],
            ["1 bedroom", "12", "10", "5", "25 – 30"],
            ["2 bedroom", "20", "15", "8", "40 – 50"],
            ["3 bedroom", "30", "25", "12", "65 – 75"],
            ["4+ bedroom", "40", "35", "18", "90+"],
          ],
        },
      },
      {
        h2: "Tips for using free boxes",
        list: [
          "Skip boxes that are wet, stained or soft at the corners. They'll fail when stacked",
          "Avoid produce boxes with food residue. They can bring bugs into your new home",
          "Re-tape the bottom of every used box with an H pattern",
          "Put heavy things in small boxes and light things in big ones",
          "Mix in some new boxes the same size so the truck stacks tight and nothing shifts",
          "Don't forget tape, markers, packing paper and a few heavy-duty boxes for dishes",
        ],
      },
      {
        h2: "What to do with the boxes after",
        paras: [
          "Pass them on. List them for free on Marketplace or Nextdoor and they'll usually be gone in a day. Otherwise, break them down flat for your recycling cart. If you have more than fits, our junk removal crew can haul away the whole pile.",
        ],
      },
    ],
    faqs: [
      { q: "Where can I get free moving boxes in Las Vegas?", a: "Liquor stores, grocery stores, Costco, big-box retailers, bookstores and your office are the most common spots. Online, check Facebook Marketplace, Craigslist free, Nextdoor and Buy Nothing groups. Call stores ahead, since policies vary by location." },
      { q: "What's the cheapest place to buy moving boxes?", a: "Home Depot and Lowe's are usually the cheapest for new boxes, especially small and medium sizes. Mixing free boxes with a few new ones keeps costs down." },
      { q: "Do your movers bring boxes?", a: "If you book our packing service, the crew brings the boxes, tape and paper and packs everything for you. Ask when you get your quote." },
      { q: "Are liquor boxes good for moving?", a: "Yes, for small, heavy or fragile things. They're strong, and the dividers protect glasses and bottles. They're too small for bulky items like bedding." },
    ],
    leadService: "local-move",
    ctaHeading: "Don't want to pack? We can do it for you",
    related: ["/moving/packing-services", "/guides/moving-day-checklist", "/guides/how-to-prepare-for-moving-day", "/free-tools/moving-cost-calculator"],
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
    related: ["/junk-removal/same-day-junk-pickup", "/junk-removal/mattress-removal", "/junk-removal/hot-tub-removal", "/guides/las-vegas-bulk-trash-pickup"],
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
      {
        h2: "Where to check a mover",
        links: [
          { label: "Nevada Transportation Authority", href: "https://nta.nv.gov/", note: "Regulates household goods movers within Nevada. Check that a mover is licensed." },
          { label: "Better Business Bureau", href: "https://www.bbb.org/", note: "Look up complaints and how the company responded." },
          { label: "FMCSA: Protect Your Move", href: "https://www.fmcsa.dot.gov/protect-your-move", note: "For moves out of state. Look up a mover's USDOT number and know your rights." },
        ],
      },
    ],
    leadService: "local-move",
    ctaHeading: "Ask us all seven. We'll answer.",
    related: ["/guides/how-to-choose-a-moving-company-las-vegas", "/moving/local-moving", "/moving/furniture-wrapping-setup", "/guides/moving-day-checklist"],
  },
  {
    slug: "how-to-choose-a-moving-company-las-vegas",
    title: "How to Choose a Moving Company in Las Vegas (Free Checklist)",
    metaTitle: "How to Choose a Moving Company in Las Vegas: 7-Step Checklist",
    metaDescription:
      "How to find a reliable, trustworthy local moving company in Las Vegas: check the license, read reviews the right way, compare written quotes and ask these questions before you hire.",
    excerpt: "How to find a reliable local mover: check the license, read reviews the right way and ask the right questions before you hire.",
    updated: "2026-10-05",
    printable: true,
    intro: [
      "To choose a moving company in Las Vegas, check that it's licensed with the Nevada Transportation Authority, read its recent reviews, get two or three upfront quotes in writing and ask each mover exactly what could change the price. The one that answers clearly, picks up the phone and puts it in writing is usually the one to hire.",
      "Here's how to do each step, plus a checklist you can print and take on your calls.",
    ],
    blocks: [
      {
        h2: "1. Check that the mover is licensed",
        paras: [
          "Moves within Nevada are regulated by the Nevada Transportation Authority (NTA). Ask for the company's NTA number and look it up. For a move out of state, the company also needs a USDOT number you can check with the FMCSA.",
          "If a mover dodges the question or only gives you a cell number and a first name, keep looking.",
        ],
      },
      {
        h2: "2. Read the reviews the right way",
        paras: [
          "Don't stop at the star rating. Sort by newest and read the 1- and 2-star reviews. One bad day happens to everyone. The same complaint over and over (surprise fees, late crews, damage nobody owned up to) is a pattern.",
          "Then look at how the company replies. A mover that responds calmly and fixes problems is a safer bet than one with a perfect score and no replies at all. Check Google, Yelp and the BBB, not just the reviews on the mover's own site.",
        ],
      },
      {
        h2: "3. Get 2–3 upfront quotes in writing",
        paras: [
          "A reliable mover will give you a clear price before moving day and tell you what's included. Be careful with a quote that's far below the others. The most common complaint about Las Vegas movers is a final bill that's double the quote, and it almost always starts with a lowball number over the phone.",
          "Compare the total, not just the hourly rate: crew size, estimated hours, truck or travel fee and anything billed for stairs, long carries or heavy items.",
        ],
      },
      {
        h2: "4. Ask how they handle your move",
        paras: [
          "A trustworthy mover will answer these without hesitating. If you get vague answers now, you'll get vague answers on moving day.",
        ],
        checklist: [
          "What's included in my price, and what could change it?",
          "How many movers are you sending, and how long will it take?",
          "Is drive time billed? Is there a truck or travel fee?",
          "Do you wrap furniture and protect floors and door frames?",
          "Will you take beds apart, put them back together and put boxes in the right rooms?",
          "Will you call when you're on the way?",
          "What happens if something is damaged?",
        ],
      },
      {
        h2: "5. Make sure they know the area",
        paras: [
          "A local Las Vegas moving company knows which HOAs need a guard-gate list, which high-rises need a loading dock reservation and why you don't start a July move at 2pm. That local knowledge saves hours, and on an hourly move, hours are money.",
        ],
      },
      {
        h2: "6. Test how easy they are to reach",
        paras: [
          "Call during business hours. Does a real person answer? Do they call back when they say they will? How a company treats you before you've paid is the best preview of how it'll treat you on moving day.",
        ],
      },
      {
        h2: "7. Don't pick on price alone",
        paras: [
          "The cheapest moving company near you is rarely the cheapest move. A slow crew on an hourly rate, surprise fees and a broken dresser all cost more than the difference between quotes. Pick the movers that are clear, reachable and careful, then compare prices among those.",
        ],
      },
      {
        h2: "Your mover checklist",
        checklist: [
          "Licensed with the Nevada Transportation Authority (and USDOT for out-of-state moves)",
          "Recent reviews read, including the 1- and 2-star ones",
          "2–3 written quotes, compared on the total price",
          "Every possible fee listed in writing",
          "Crew size and estimated hours confirmed",
          "Furniture wrapping and reassembly included",
          "Arrival window confirmed, with a call on the way",
          "Damage policy explained",
        ],
      },
      {
        h2: "Where to check a mover",
        links: [
          { label: "Nevada Transportation Authority", href: "https://nta.nv.gov/", note: "Regulates household goods movers within Nevada. Check that a mover is licensed." },
          { label: "Better Business Bureau", href: "https://www.bbb.org/", note: "Look up complaints and how the company responded." },
          { label: "FMCSA: Protect Your Move", href: "https://www.fmcsa.dot.gov/protect-your-move", note: "For moves out of state. Look up a mover's USDOT number and know your rights." },
        ],
      },
    ],
    faqs: [
      { q: "How do I find a reliable local moving company?", a: "Check the mover's Nevada Transportation Authority license, read its recent reviews on Google and Yelp, get two or three written quotes and ask what could change the price. Reliable movers answer clearly and put it in writing." },
      { q: "How do I find a reputable moving company near me?", a: "Look for a local company with a license you can verify, a steady record of recent reviews and replies to complaints, and a real person who answers the phone. Avoid movers that won't give you a written quote." },
      { q: "Which local moving company has the best reviews?", a: "Look past the star rating to the recent reviews and the bad ones. A company with lots of recent reviews, consistent praise for being on time and careful, and calm replies to complaints is a better sign than a perfect score from a handful of reviews." },
      { q: "Can I find a moving company that's open today?", a: "Yes. Some Las Vegas movers, including us, do same-day and last-minute moves. Call as early in the day as you can so there's time to send a crew." },
      { q: "How far ahead should I hire a moving company?", a: "Two to four weeks is ideal, longer if you're moving at the end or start of the month when leases turn over." },
    ],
    leadService: "local-move",
    ctaHeading: "Ask us every question on the list.",
    related: ["/guides/red-flags-hiring-movers", "/guides/how-much-do-movers-cost-las-vegas", "/moving/local-moving", "/moving/same-day-moving"],
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
    related: ["/guides/where-to-get-moving-boxes-las-vegas", "/guides/moving-day-checklist", "/moving/move-and-junk-haul-away", "/free-tools/moving-cost-calculator"],
  },
  {
    slug: "how-much-do-movers-cost-las-vegas",
    title: "How Much Does a Moving Company Cost in Las Vegas?",
    metaTitle: "How Much Does a Moving Company Cost in Las Vegas? (2026 Prices)",
    metaDescription:
      "What it costs to hire a local moving company in Las Vegas in 2026, by home size: studio to 4-bedroom. Hourly rates, crew sizes, what drives the price and how to avoid a surprise bill.",
    excerpt: "Typical 2026 prices to hire a local Las Vegas moving company by home size, plus what makes a move cost more and how to keep it down.",
    updated: "2026-10-05",
    intro: [
      `A local moving company in Las Vegas usually costs ${moveRange(HOME_SIZES[0])} for a studio and ${moveRange(HOME_SIZES[4])} for a 4+ bedroom home. Most charge $${HOURLY_PER_MOVER.low}–$${HOURLY_PER_MOVER.high} per mover, per hour, plus a $${TRUCK_FEE.low}–$${TRUCK_FEE.high} truck fee.`,
      "Most local movers in Las Vegas charge by the hour, per mover, plus a truck or travel fee. That means the real question isn't the hourly rate. It's how many hours your move will take and whether the crew actually works the whole time.",
      "Below are typical price ranges for local moves across the valley, from Henderson to Summerlin to North Las Vegas. They're planning numbers, not a quote. We always give you an exact, upfront price before moving day.",
    ],
    blocks: [
      {
        h2: "Las Vegas moving cost by home size",
        paras: [
          `Most local movers here charge about $${HOURLY_PER_MOVER.low}–$${HOURLY_PER_MOVER.high} per mover, per hour, plus a truck fee. These ranges assume a move across town with no stairs and you doing your own packing.`,
        ],
        table: {
          head: ["Home size", "Typical crew", "Typical hours", "Typical price"],
          rows: HOME_SIZES.map((h) => [h.label, `${h.crew} movers`, `${h.hours[0]}–${h.hours[1]} hrs`, moveRange(h)]),
        },
      },
      {
        h2: "Is it cheaper to hire a moving company by the hour or a flat rate?",
        paras: [
          "For a local move, hourly is the norm and usually the better deal if you're packed and ready. You pay for the time the crew actually works. A flat rate protects you from a slow crew, but it's padded to cover the mover's risk.",
          "Either way, the number that matters is the total. Ask for an upfront price in writing and ask exactly what could change it.",
        ],
      },
      {
        h2: "What makes a Las Vegas move cost more",
        list: [
          "Stairs and elevators: a third-floor walk-up can add 15–30% to on-site time",
          "Long carries: parking far from the door at big apartment complexes adds up",
          "Drive time: Henderson to Centennial Hills takes longer than a move across the street",
          "Packing: if the kitchen isn't packed when the crew arrives, the clock runs while it gets done",
          "Heavy items: safes, pianos, gun cabinets and gym equipment need extra hands",
          "Month-end dates: the last and first days of the month are the busiest for lease turnovers",
        ],
      },
      {
        h2: "How to keep your moving cost down",
        list: [
          "Be fully packed before the crew arrives, with boxes taped and labeled by room",
          "Get rid of what you're not keeping before the move, not after",
          "Reserve the elevator and a parking spot close to the door",
          "Take beds apart ahead of time if you're comfortable doing it",
          "Book a mid-month, weekday, morning start if you can",
          "Get the price upfront, in writing, and ask what could change it",
        ],
      },
      {
        h2: "Watch out for the \"double the quote\" move",
        paras: [
          "The most common complaint we hear about Las Vegas movers is a final bill that's far higher than the quote. It usually comes from a lowball estimate over the phone, then extra hours, fees for stairs or \"heavy items,\" and a slow crew on the clock.",
          "Ask any mover you're considering exactly what's included, what could change the price and how they bill time. If they won't give you a straight answer before moving day, move on.",
        ],
      },
    ],
    faqs: [
      { q: "How much does it cost to hire a moving company?", a: `For a local Las Vegas move, most people pay ${moveRange(HOME_SIZES[1])} for a 1-bedroom and ${moveRange(HOME_SIZES[3])} for a 3-bedroom home. The price depends on crew size, hours, stairs and drive time.` },
      { q: "How much is a local moving company per hour?", a: `Most local moving companies in Las Vegas charge $${HOURLY_PER_MOVER.low}–$${HOURLY_PER_MOVER.high} per mover, per hour. A 2-person crew runs about $${HOURLY_PER_MOVER.low * 2}–$${HOURLY_PER_MOVER.high * 2} an hour, plus a truck fee.` },
      { q: "How much does it cost to move a 2-bedroom apartment in Las Vegas?", a: `A local 2-bedroom move usually runs ${moveRange(HOME_SIZES[2])} with a 3-person crew, depending on stairs, drive time and how packed you are.` },
      { q: "Do Las Vegas movers charge by the hour?", a: "Most local movers do, per mover, plus a truck or travel fee. Long-distance moves are usually priced by weight or volume instead." },
      { q: "Should I tip movers in Las Vegas?", a: "Tipping is up to you and should never be pressured. Many people tip for a job done well, but a good crew won't ask." },
      { q: "What is the cheapest way to hire movers?", a: "Rent your own truck and hire moving labor for loading and unloading. If you'd rather not drive a truck, book a full-service mover mid-month on a weekday morning and be fully packed when they arrive. Our moving cost calculator shows both options." },
    ],
    leadService: "local-move",
    ctaHeading: "Get your exact moving price",
    related: ["/free-tools/moving-cost-calculator", "/guides/how-to-choose-a-moving-company-las-vegas", "/moving/local-moving", "/moving/moving-labor"],
  },
  {
    slug: "las-vegas-bulk-trash-pickup",
    title: "Las Vegas Bulk Trash Pickup: Rules, Limits & When to Call a Hauler",
    metaTitle: "Las Vegas Bulk Trash Pickup: Rules & What They Won't Take",
    metaDescription:
      "How bulk trash pickup works in Las Vegas, Henderson and North Las Vegas: size limits, what goes to the curb, what's not allowed, and when a junk hauler makes more sense.",
    excerpt: "How bulk item pickup works around the valley, what they won't take, and when it's easier to call a junk hauler.",
    updated: "2026-09-29",
    intro: [
      "Most homes in the Las Vegas valley can put bulky items out for pickup with their regular trash service, and for a lot of things it's the cheapest way to get rid of them. But the rules trip people up, and items that don't follow them just sit at the curb.",
      "Here's how bulk pickup generally works in Las Vegas, Henderson, North Las Vegas and unincorporated Clark County, and when a junk removal crew is the better call. Rules and schedules can change and differ by address, so always check your hauler's schedule for your street before setting anything out.",
    ],
    blocks: [
      {
        h2: "How bulk pickup works",
        paras: [
          "Most of the valley's residential trash is collected by Republic Services. Bulk items, meaning anything too big for your cart, are picked up on a set bulk day for your route. You can look up your schedule by address on the Republic Services website.",
          "Items go out at the curb on your bulk day, not before. Stuff left out early or on the wrong day can get you a notice from code enforcement or your HOA.",
        ],
      },
      {
        h2: "The common bulk pickup rules",
        list: [
          "Items generally need to be about 6 feet long or less",
          "Everything has to be at the curb. Crews won't come onto your property or into your garage",
          "No loose trash. Small stuff has to be bagged or boxed",
          "Soiled mattresses usually need to be wrapped in plastic",
          "Branches need to be bundled and tied, and kept light enough for one person to lift",
          "No boards with protruding nails or screws",
        ],
      },
      {
        h2: "What bulk pickup won't take",
        paras: ["These usually need a special drop-off, a paid pickup or a junk hauler:"],
        list: [
          "Refrigerators, freezers and AC units (anything with Freon)",
          "Hot tubs, sheds and swing sets that haven't been taken apart",
          "Construction debris, concrete, dirt and rock",
          "Paint, chemicals, motor oil, propane tanks and other hazardous waste",
          "Anything too heavy or too big to lift safely",
        ],
      },
      {
        h2: "When a junk hauler makes more sense",
        paras: ["Bulk pickup is great if you can get the item to the curb and wait. A junk removal crew is worth it when:"],
        list: [
          "The item is upstairs or in the back of the house and you can't carry it",
          "It's a fridge, washer, hot tub or anything bulk pickup won't take",
          "Your bulk day is too far away, or the HOA won't let it sit out",
          "You have a whole garage or room of stuff, not one or two pieces",
          "You're moving out and need it gone before the walkthrough",
        ],
      },
      {
        h2: "Helpful links",
        links: [
          { label: "Republic Services: Las Vegas", href: "https://www.republicservices.com/municipality/las-vegas-nv", note: "Look up your trash, recycling and bulk day by address." },
          { label: "Clark County", href: "https://www.clarkcountynv.gov/", note: "Rules and services for unincorporated Clark County addresses." },
        ],
      },
    ],
    faqs: [
      { q: "How do I find my bulk trash day in Las Vegas?", a: "Look up your address on the Republic Services website, or call the number on your bill. Schedules are set by route, so neighbors a few streets away can have a different day." },
      { q: "Will bulk pickup take a couch?", a: "Usually, yes, if it's at the curb on your bulk day and fits the size limit. If it's a big sectional or you can't get it outside, a junk hauler can take it from inside your home." },
      { q: "Will bulk pickup take a refrigerator?", a: "Generally no. Appliances with Freon need special handling. Our appliance removal service takes fridges, freezers and AC units." },
      { q: "Can I put stuff out early?", a: "It's best not to. Items set out before your scheduled day can draw a code enforcement or HOA notice." },
    ],
    leadService: "junk-removal",
    ctaHeading: "Skip the curb. Get a junk removal quote",
    related: ["/junk-removal/furniture-removal", "/junk-removal/mattress-removal", "/junk-removal/appliance-removal", "/guides/junk-removal-cost-las-vegas"],
  },
  {
    slug: "moving-in-las-vegas-summer-heat",
    title: "Moving in the Las Vegas Summer Heat: Tips From Local Movers",
    metaTitle: "Moving in Las Vegas Summer Heat: Tips From Local Movers",
    metaDescription:
      "How to move in Las Vegas when it's 110°F: best start times, what not to put in the truck, protecting electronics and keeping everyone safe. Tips from a local crew.",
    excerpt: "Best start times, what can't ride in a hot truck and how to keep your crew, pets and stuff safe when it's 110 outside.",
    updated: "2026-09-29",
    intro: [
      "From June through September, moving in Las Vegas is a different job. The inside of a truck parked in the sun gets far hotter than the air outside, candles melt, electronics overheat and everyone wears out faster.",
      "We move families all summer long. Here's what we tell every customer booking a July move.",
    ],
    blocks: [
      {
        h2: "Start as early as you can",
        paras: [
          "The best time to move in a Las Vegas summer is first thing in the morning. A 7am start means most of the heavy lifting is done before the worst of the afternoon heat. Early slots book first, so reserve yours ahead.",
        ],
      },
      {
        h2: "What not to put in a hot moving truck",
        paras: ["Pack these in a box that rides with you in the air-conditioned car:"],
        list: [
          "Candles, crayons, lipstick and anything made of wax",
          "Medications and vitamins",
          "Laptops, tablets, phones and hard drives",
          "Vinyl records, photos and important documents",
          "Aerosol cans, propane and anything pressurized",
          "Wine, food and anything that can spoil",
          "Houseplants, and never pets",
        ],
      },
      {
        h2: "Get the new place cool before the truck arrives",
        paras: [
          "Make sure power is on at the new home a day early and set the AC low the night before. Unloading into a 95-degree house is slow and miserable, and it's harder on furniture, candles and electronics too.",
        ],
      },
      {
        h2: "Keep everyone safe",
        list: [
          "Keep cold water and sports drinks at both homes",
          "Plan for kids and pets to be somewhere cool all day",
          "Leave the front door propped with a door stop, not wide open with the AC blasting outside",
          "Watch for heat exhaustion: dizziness, nausea, headache and heavy sweating mean stop and cool down",
        ],
      },
      {
        h2: "Move faster, spend less time in the heat",
        paras: [
          "The best thing you can do in summer is make the move shorter: be fully packed, get rid of junk beforehand and have beds taken apart. A shorter move means less time in the heat and a smaller bill.",
        ],
      },
      {
        h2: "Helpful links",
        links: [
          { label: "National Weather Service: Las Vegas", href: "https://www.weather.gov/vef/", note: "Check for excessive heat warnings before you lock in your date and start time." },
          { label: "NV Energy", href: "https://www.nvenergy.com/", note: "Get power on at the new place a day early so the AC is running." },
        ],
      },
    ],
    faqs: [
      { q: "What is the best month to move in Las Vegas?", a: "Spring (March to May) and fall (October to November) have the most comfortable weather. Mid-month dates in any season are easier to book than the 1st or the 30th." },
      { q: "Do movers work in the Las Vegas summer?", a: "Yes, all summer. Good crews start early, move steadily and keep heat-sensitive items out of the back of the truck." },
      { q: "Will the heat damage my furniture?", a: "Short trips across town are usually fine for furniture. Wood, leather and upholstery handle a few hours, but candles, electronics and anything with wax or batteries should ride with you." },
    ],
    leadService: "local-move",
    ctaHeading: "Book an early-morning summer move",
    related: ["/guides/how-to-prepare-for-moving-day", "/moving/local-moving", "/guides/moving-day-checklist", "/moving/packing-services"],
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
