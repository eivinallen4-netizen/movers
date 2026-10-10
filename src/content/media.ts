/*
 * Every photo slot on the site, in one place.
 *
 * To add media: drop a file into `public/media/` named after the slot key, e.g.
 *   public/media/hero.jpg               -> photo
 *   public/media/pricing-photo.webp     -> photo
 * Supported: .jpg .jpeg .png .webp .avif (photos), .mp4 .webm (videos).
 * No code changes needed; until a file exists, the gradient/illustration placeholder shows.
 * `alt` is the description screen readers and Google see, so keep it accurate.
 */

export type MediaSlot = { alt: string; tone: string };

export const MEDIA = {
  /* Hero (left of the quote form) */
  hero: { alt: "Movers and Junk Removal crew with truck in Las Vegas", tone: "transparent" },

  /* Section photos */
  "pricing-photo": {
    alt: "Las Vegas living room mid-move with packed boxes and a plastic-wrapped chair",
    tone: "linear-gradient(135deg,#31a2fd 0%,#0b72c6 55%,#000000 100%)",
  },
  "calculator-photo": { alt: "Bedroom stacked with packed moving boxes, a bookcase and a wrapped mattress", tone: "linear-gradient(135deg,#f3e6da,#d9b996)" },
  "junk-photo": { alt: "Bedroom crowded with bins, a wrapped mattress and boxes waiting to be cleared out", tone: "linear-gradient(135deg,#f5f1ec,#cfc6bb)" },

  /* Guide / blog card thumbnails */
  "guide-1": { alt: "Moving cost calculator", tone: "linear-gradient(160deg,#31a2fd,#0b72c6)" },
  "guide-2": { alt: "Moving day checklist", tone: "linear-gradient(160deg,#7cc4ff,#1c1f24)" },
  "guide-3": { alt: "Junk removal cost guide", tone: "linear-gradient(160deg,#31a2fd,#000000)" },
  "guide-4": { alt: "Red flags when hiring movers", tone: "linear-gradient(160deg,#a9d7ff,#4b5058)" },

  /* Photo strip above the Instagram section */
  "gallery-1": { alt: "Crew photo", tone: "linear-gradient(160deg,#31a2fd,#000000)" },
  "gallery-2": { alt: "Crew photo", tone: "linear-gradient(160deg,#7cc4ff,#1c1f24)" },
  "gallery-3": { alt: "Crew photo", tone: "linear-gradient(160deg,#9aa0a6,#3a3f45)" },
  "gallery-4": { alt: "Crew photo", tone: "linear-gradient(160deg,#31a2fd,#0b72c6)" },
  "gallery-5": { alt: "Crew photo", tone: "linear-gradient(160deg,#f1ece6,#bca894)" },
  "gallery-6": { alt: "Crew photo", tone: "linear-gradient(160deg,#31a2fd,#000000)" },
  "gallery-7": { alt: "Crew photo", tone: "linear-gradient(160deg,#7cc4ff,#0b72c6)" },
  "gallery-8": { alt: "Crew photo", tone: "linear-gradient(160deg,#1a8ce8,#1c1f24)" },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof MEDIA;
