# Movers and Junk Removal — Visual Brand Guide

Visual rules only (color, logo, type, shapes, illustration). Copy and layout are out of scope.
Source of truth for tokens: `src/app/globals.css` (`@theme`) and the constants at the top of
`src/components/icons.tsx`. If you change a value, change it in both places and here.

---

## 1. Direction

**Black & Sky.** The logo is a heavy black wordmark with a single hit of bright sky blue: the
arrow on the "V" and the two short rules flanking the tagline. The site follows the same ratio:

- **Black / white carry the page.** Structure, headlines, body text, dark bands.
- **Sky blue is the accent.** It appears on actions, highlights and one or two shapes per view.
  Blue is a *signal*, not a wallpaper. The one full-width blue band (the press marquee) is the
  exception that proves the rule.
- Flat color, hard edges, solid offset blocks. No soft drop shadows, glows or gradients on UI.

---

## 2. Logo

| File | Use on |
|---|---|
| `public/logo.png` | White or light backgrounds (`#FFFFFF`, `sky-100`) |
| `public/logo white.png` | Black (`ink`) or dark photo backgrounds |

- Import statically so Next sizes it: `import logoWhite from "../../public/logo white.png"`, then
  `<Image src={logoWhite} … className="h-[72px] w-auto" />`.
- Size by **height only** (`h-…  w-auto`). Header: 72px. Footer: 80px. Minimum: 40px.
- Never recolor, outline, stretch, rotate, add effects, or put it on sky blue (the blue arrow
  disappears). Never place the dark logo on black or the white logo on white.
- Clear space: keep at least the height of the "O" free on every side.

### Mark (the arrow + "V")

| File | Use |
|---|---|
| `public/mark.png` | The mark cut straight from `logo.png` (two-tone, transparent, square) |
| `<BoxMark className="h-9 w-9 text-…" />` | One-color mark for decoration (marquee, badges, cards). It takes `currentColor`: `text-ink` on sky, `text-sky` on black, `text-white/80` on photos |
| `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | Two-tone mark on a white rounded tile |

Use the mark only where the full logo is too wide. Never redraw it. If the logo changes,
re-cut `mark.png` and the icons from the new file.

---

## 3. Color

### Core

| Token | Hex | Role |
|---|---|---|
| `ink` | `#000000` | Logo black. Text, dark bands (header, hero, foundation, footer), outlines |
| `white` | `#FFFFFF` | Page background, text on ink |
| `sky` | `#31A2FD` | Logo blue. Buttons, marquee band, icon fills, accents **on black** |

### Supporting

| Token | Hex | Role |
|---|---|---|
| `sky-600` | `#1A8CE8` | Button hover. Highlight words inside **large** headlines on white (≥24px, or ≥19px bold) |
| `sky-700` | `#0B72C6` | Links and any **small** blue text on white. Text drawn inside SVGs |
| `sky-300` | `#7CC4FF` | Illustration light side, box flaps, bin lids |
| `sky-200` | `#A9D7FF` | Illustration highlights, windows, blush |
| `sky-100` | `#E8F4FF` | Announcement bar, soft fills, hover on white buttons |
| `ink-800` | `#1C1F24` | Illustration dark fills, gradient ends |
| `ink-600` | `#4B5058` | Placeholder text, muted neutral |
| `ink-200` | `#D9DCE0` | Inactive dots, hairlines |

Tailwind classes follow the token names: `bg-sky`, `text-sky-700`, `border-ink`, `fill-sky`, etc.

### Contrast rules (WCAG AA). These are not optional.

The logo blue is too light for text on white (2.7:1). Pick the blue by *where* it sits:

| Blue on… | Use | Ratio |
|---|---|---|
| Black background | `sky` | 7.7 : 1 ✅ |
| White, small text / links | `sky-700` | 5.0 : 1 ✅ |
| White, large headline highlight | `sky-600` | 3.5 : 1 ✅ (large only) |
| White, `sky` as text | ❌ never | 2.7 : 1 |

| Text on a sky fill | Use | Ratio |
|---|---|---|
| `text-ink` on `bg-sky` | ✅ always | 7.7 : 1 |
| `text-white` on `bg-sky` | ❌ never | 2.7 : 1 |

So **buttons are sky with black text**, never sky with white text.

### Retired: do not reintroduce
`#ff3d9a` pink, `#1d1b58` navy, the pink/purple gradients, `#2c2a7a`. Third-party brand colors
(Google `#4285F4`, Yelp `#d32323`, etc.) are allowed only inside their own review badges.

---

## 4. Typography

- **Montserrat** (via `next/font`, `--font-montserrat`) for everything. Weights 400–800.
- The logo wordmark is a heavy humanist sans. Echo it with **800 / extrabold** for display
  and uppercase labels, and **700** for headlines.
- Uppercase + wide tracking (`tracking-wider` or more) mirrors the "AND JUNK REMOVAL" tagline:
  use it for buttons, nav and small labels, never for body text.
- Text color: `ink` on light, `white` on dark. Blue text only per the contrast table above.

---

## 5. Shapes & surfaces

- **Corners:** square for buttons, inputs and bands. `rounded-lg` (8px) only on photos/cards.
- **Offset block shadow** (brand signature): a solid, hard 15px (or 8px `-sm`) block offset
  down-right. Classes are `offset-sky`, `offset-ink`, `offset-sky-sm` and `offset-ink-sm`. Alternate sky
  and ink when several sit together. No blur, ever.
- **Buttons**
  - Primary: `bg-sky text-ink font-bold uppercase` → hover `bg-sky-600`.
  - Secondary on black: `bg-white text-ink` → hover `bg-sky-100`.
  - Heights: 48px (`h-12`) or 52px. No rounded corners.
- **Inputs:** white fill, ink text, `ink-600` placeholder, `ring-2 ring-sky` on focus.
- **Focus + selection:** global `:focus-visible` is a 2px sky outline; `::selection` is sky with ink text.

---

## 6. Illustration & SVG rules

Use the constants in `icons.tsx` (`INK`, `SKY`, `SKY_700`) or the hex values above. Never
introduce a new hex in an SVG.

- **Line:** `INK` (`#000`), 3–5px, round caps/joins.
- **Primary fill:** `SKY`. **Light side / lids / flaps:** `sky-300`. **Highlights:** `sky-200`.
- **Dark fills** (wheels, lids, shadows): `#000` or `ink-800`.
- **Text inside an SVG** on white: `SKY_700`, never `SKY`.
- **Cardboard** is the only warm color allowed: `#D2A679` / `#C8955F` fill, `#A87C51` / `#9C6D3E`
  edge. Box tape is `sky`.
- **Ground shadows:** `sky` at ~18% opacity, or black at ≤15%.
- `currentColor` icons (`BoxMark`, arrows, etc.) take `text-sky` on black, `text-ink` on sky,
  `text-sky-700` on white.

### Photo placeholder tones
Gradients at 135° or 160° using only the palette:
`sky → sky-700`, `sky → ink`, `sky-300 → ink-800`, `sky-200 → sky-600`, `ink-200 → ink-600`.
Swap for real photography as it arrives; photos need no color treatment.

---

## 7. Section rhythm

| Band | Background | Text | Accent |
|---|---|---|---|
| Announcement | `sky-100` | `ink` | `sky-700` link |
| Header + hero | `ink` | `white` | `sky` |
| Content sections | `white` | `ink` | `sky-600` / `sky-700` |
| Press marquee | `sky` | `ink` | `ink` marks |
| Foundation band | `ink` | `white` | `sky` |
| Footer | `ink` | `white` | `sky` on hover |

Avoid two sky bands in a row, and avoid sky next to sky-100.

---

## 8. Type scale & section kit (locked)

Every content section is built from the primitives in `src/components/ui.tsx`. Don't hand-roll
heading sizes, paragraph styles or section padding. If one of these needs to change, change it in
`ui.tsx` and the whole site follows. (The hero is the only exception.)

| Role | Component | Style |
|---|---|---|
| Section wrapper | `<Section tone="light \| soft \| dark">` | `py-12 lg:py-16`; `soft` = `sky-100`, `dark` = `ink` + white text |
| Section heading (h2) | `<SectionTitle sub? eyebrow? tone?>` | 30px → 40px, bold, `leading-tight`, sentence case |
| Highlight words in an h2 | `<Highlight tone?>` | `sky-600` on light, `sky` on dark. No underline |
| Intro / lead paragraph | `<Lead>` (or `SectionTitle sub`) | `text-lg font-medium leading-snug` |
| Body copy | `<Body>` | 15px, `leading-7` |
| Card title (h3) | — | `text-2xl` in service grids, `text-lg` in article cards, bold |
| Text link CTA | `<LearnMore>` | `sm` bold `sky-700` + arrow |
| Button CTA | `<BrandButton>` | see §5 |

Layout rules:

- Two-column splits use `gap-12`. Photos sit in `<Photo>` with `lg:mr-4` so the offset block clears the container.
- Photo offsets alternate `sky` / `ink` down the page.
- Headings are sentence case. Uppercase is for buttons, nav and eyebrows only.
- One highlight phrase per heading, at most.
