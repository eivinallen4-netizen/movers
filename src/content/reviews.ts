// Placeholder reviews: swap in your own real, attributed Google reviews before publishing.
// Don't add review/rating structured data (JSON-LD) until these are real.
export type Review = { src: "G"; text: string; who: string; tags: ("moving" | "junk" | "same-day")[] };

export const REVIEWS: Review[] = [
  { src: "G", tags: ["moving"], text: "They arrived right on time, called when they were on the way and got right to work. Everything was wrapped and nothing was broken. Made what could have been a stressful day smooth and easy.", who: "Sample Customer, Henderson" },
  { src: "G", tags: ["moving"], text: "Fair price and no surprises. The final bill matched what they told me on the phone. Straightforward, honest and worth every penny.", who: "Sample Customer, Summerlin" },
  { src: "G", tags: ["moving", "same-day"], text: "Another company canceled on me the night before. These guys came out the same day and completely saved the day.", who: "Sample Customer, Las Vegas" },
  { src: "G", tags: ["moving"], text: "Every box went to the right room and they put our beds back together. We didn't have to lift a finger.", who: "Sample Customer, North Las Vegas" },
  { src: "G", tags: ["junk", "same-day"], text: "Called in the morning to clear out my garage and it was empty by the afternoon. Friendly, fast and respectful.", who: "Sample Customer, Paradise" },
  { src: "G", tags: ["junk", "moving"], text: "Great attitude, no pressure. They treated my mom's furniture like it was their own.", who: "Sample Customer, Henderson" },
  { src: "G", tags: ["moving"], text: "Fast and efficient. The move took less time than I expected, so it cost less than I expected too.", who: "Sample Customer, Las Vegas" },
  { src: "G", tags: ["junk", "same-day"], text: "Hauled away an old fridge and two couches the same day I called. Easy from start to finish.", who: "Sample Customer, Summerlin" },
];

export const reviewsFor = (tag: Review["tags"][number], n = 3) => REVIEWS.filter((r) => r.tags.includes(tag)).slice(0, n);
