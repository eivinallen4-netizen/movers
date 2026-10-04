/*
 * Before/after pairs for the homepage slider. Files live in public/media/before-after/<key>-before.jpg
 * and <key>-after.jpg (3:2). Sources: public/Photo-edits-and-unfurnished. The "after" shots are
 * AI-edited from the same photo to show the empty room, so the section carries a short disclosure.
 */

/** `before` / `after` are the alt text for each photo. */
export type BeforeAfterPair = { key: string; room: string; before: string; after: string };

export const BEFORE_AFTER: BeforeAfterPair[] = [
  {
    key: "living-room",
    room: "Living room",
    before: "Living room packed for a move: sofa, boxes, stacked tables and a plastic-wrapped chair",
    after: "The same living room completely empty, with sunlight across the floor",
  },
  {
    key: "kitchen",
    room: "Kitchen",
    before: "Kitchen counters covered in jars and supplies with open moving boxes on the floor",
    after: "The same kitchen with bare counters and a clear floor",
  },
  {
    key: "great-room",
    room: "Great room",
    before: "Great room filled with stacked chairs, tables and moving boxes",
    after: "The same great room emptied out, ready for walkthrough",
  },
  {
    key: "bedroom",
    room: "Bedroom",
    before: "Bedroom crowded with a wrapped mattress, bookcase and stacked moving boxes",
    after: "The same bedroom empty, with clean carpet and a blue accent wall",
  },
  {
    key: "hallway",
    room: "Hallway",
    before: "Hallway lined with tall stacks of labeled moving boxes",
    after: "The same hallway clear from end to end",
  },
  {
    key: "kids-room",
    room: "Kids' room",
    before: "Kids' room with toy bins, a wrapped mattress and plastic-wrapped furniture",
    after: "The same kids' room empty, with pink walls and fresh carpet",
  },
];

export const beforeAfterSrc = (key: string, side: "before" | "after") => `/media/before-after/${key}-${side}.jpg`;
