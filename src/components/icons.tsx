import type { SVGProps } from "react";

// Brand tokens — keep in sync with globals.css / BRAND.md
const INK = "#000000";
const SKY = "#31a2fd";
const SKY_700 = "#0b72c6";

type P = SVGProps<SVGSVGElement>;

const base = {
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight(props: P) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" {...props}>
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Phone(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

export function Mail(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7l-8 5z" />
    </svg>
  );
}

export function Building(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M4 22V3h11v5h5v14h-7v-4h-2v4zm3-16v2h2V6zm4 0v2h2V6zM7 10v2h2v-2zm4 0v2h2v-2zm5 2v2h2v-2zM7 14v2h2v-2zm4 0v2h2v-2zm5 2v2h2v-2z" />
    </svg>
  );
}

export function Chevron({ open, ...props }: P & { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      {...props}
    >
      <path d="m5 9 7 7 7-7" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Check(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
      <path d="m4 12 5 5L20 6" fill="none" stroke={SKY} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Lock(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function Camera(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.8l1.5-2.2h6.4L16.7 7h2.8A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Star(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={SKY} {...props}>
      <path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18.2 5.5 22l1.7-7.4-5.7-5 7.5-.7z" />
    </svg>
  );
}

export function Play(props: P) {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" {...props}>
      <circle cx="24" cy="24" r="24" fill="currentColor" />
      <path d="M19 15v18l14-9z" fill="white" />
    </svg>
  );
}

export function Instagram(props: P) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" {...props}>
      <rect x="3" y="3" width="42" height="42" rx="12" fill="none" stroke={SKY} strokeWidth="4" />
      <circle cx="24" cy="24" r="9" fill="none" stroke={SKY} strokeWidth="4" />
      <circle cx="35" cy="13" r="2.6" fill={SKY} />
    </svg>
  );
}

/* ---------- Brand mark: the logo's arrow + "V", one color (currentColor) ---------- */
export function BoxMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ mask: "url(/mark.png) center / contain no-repeat" }}
    />
  );
}

/* ---------- Service illustrations (ink line + sky fill) ---------- */
export function IconCalendar(props: P) {
  return (
    <svg viewBox="0 0 120 100" width="110" height="92" {...props}>
      <path d="M22 18h82l-8 76H6z" fill="white" {...base} />
      <path d="M22 18h82l-3 20H18z" fill={SKY} {...base} />
      {[30, 44, 58, 72, 86].map((x) => (
        <path key={x} d={`M${x} 10v16`} fill="none" {...base} />
      ))}
      <text x="36" y="72" fontSize="22" fontWeight="800" fill={SKY_700} fontFamily="Montserrat, sans-serif">
        24/7
      </text>
    </svg>
  );
}

export function IconPins(props: P) {
  return (
    <svg viewBox="0 0 120 100" width="110" height="92" {...props}>
      <path d="M8 94 22 58h76l14 36z" fill="white" {...base} />
      <path d="M46 58 40 94M76 58l6 36" fill="none" {...base} strokeWidth={2} opacity=".35" />
      <path d="M34 80c10-2 20-12 40-10" fill="none" {...base} strokeDasharray="5 6" />
      {[
        [30, 46],
        [80, 26],
      ].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y + 30}c-10-12-16-20-16-28a16 16 0 0 1 32 0c0 8-6 16-16 28z`} fill={SKY} {...base} />
          <circle cx={x} cy={y - 2} r="6" fill="white" {...base} strokeWidth={2.5} />
        </g>
      ))}
      <path d="M100 8l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={SKY} {...base} strokeWidth={2} />
    </svg>
  );
}

export function IconTruckRoute(props: P) {
  return (
    <svg viewBox="0 0 140 100" width="128" height="92" {...props}>
      <path d="M10 30c20-18 60-22 110-8 6 20 2 44-12 60-30 8-70 6-96-6C6 60 4 44 10 30z" fill={SKY} {...base} />
      <path d="M26 48c20 10 50 12 84-2" fill="none" {...base} stroke="white" strokeDasharray="6 7" />
      <rect x="92" y="54" width="30" height="26" fill="white" {...base} />
      <path d="M92 62h30M107 54v8" fill="none" {...base} />
      <path d="M2 72 15 60l13 12v18H2z" fill="white" {...base} />
      <rect x="11" y="78" width="8" height="12" fill={SKY} {...base} strokeWidth={2} />
    </svg>
  );
}

export function IconBuildings(props: P) {
  return (
    <svg viewBox="0 0 120 100" width="110" height="92" {...props}>
      <rect x="10" y="10" width="28" height="84" fill="white" {...base} />
      <rect x="38" y="30" width="36" height="64" fill="white" {...base} />
      <rect x="74" y="46" width="36" height="48" fill="white" {...base} />
      {[18, 30, 42, 54, 66].map((y) =>
        [16, 26].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="6" height="6" fill={SKY} />),
      )}
      {[38, 50, 62, 74].map((y) =>
        [44, 54, 64].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="6" height="6" fill={SKY} />),
      )}
      {[54, 66, 78].map((y) =>
        [80, 90, 100].map((x) => <rect key={`${x}${y}`} x={x} y={y} width="5" height="6" fill={SKY} />),
      )}
      <path d="M24 10V2" fill="none" {...base} />
      <rect x="50" y="80" width="12" height="14" fill={SKY} {...base} strokeWidth={2} />
      <path d="M10 94V82" fill="none" {...base} />
      <circle cx="10" cy="74" r="9" fill={SKY} {...base} />
      <path d="M4 94h112" fill="none" {...base} />
    </svg>
  );
}

export function IconSofa(props: P) {
  return (
    <svg viewBox="0 0 140 100" width="140" height="100" {...props}>
      <path d="M30 40h80v30H30z" fill={SKY} {...base} />
      <path d="M22 44a8 8 0 0 1 16 0v26H22zM102 44a8 8 0 0 1 16 0v26h-16z" fill={SKY} {...base} />
      <path d="M40 52h60M70 40v30" fill="none" {...base} />
      <path d="M30 70v8M110 70v8" fill="none" {...base} />
      <circle cx="16" cy="30" r="10" fill="white" {...base} />
      <circle cx="124" cy="30" r="10" fill="white" {...base} />
      <path d="M16 40v28l-8 26M16 68l10 26M124 40v28l8 26M124 68l-10 26" fill="none" {...base} />
      <path d="M52 40l-8 30M88 40l-8 30" fill="none" stroke="white" strokeWidth="3" strokeDasharray="4 5" />
      <path d="M60 22q10-8 20 0M54 14q16-12 32 0" fill="none" {...base} strokeWidth={2.5} />
    </svg>
  );
}

export function IconHourglass(props: P) {
  return (
    <svg viewBox="0 0 100 100" width="92" height="92" {...props}>
      <rect x="18" y="6" width="64" height="12" rx="5" fill={SKY} {...base} />
      <rect x="18" y="84" width="64" height="12" rx="5" fill="white" {...base} />
      <path d="M26 18c0 22 22 24 22 32S26 62 26 84h48c0-22-22-26-22-34s22-10 22-32z" fill="white" {...base} />
      <path d="M32 84c2-12 14-18 18-18s16 6 18 18z" fill={SKY} />
      <path d="M36 28h28c-4 8-10 12-14 14-4-2-10-6-14-14z" fill={SKY} />
      <path d="M50 46v16" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 4" />
      <path d="M88 34h8M90 46h6M86 58h8" fill="none" {...base} strokeWidth={2.5} />
    </svg>
  );
}

export function IconOpenBox(props: P) {
  return (
    <svg viewBox="0 0 110 110" width="100" height="100" {...props}>
      <path d="M44 20l8-12 12 2-2 12" fill={SKY} {...base} />
      <circle cx="54" cy="44" r="14" fill={INK} />
      <path d="M36 30v20" fill="none" {...base} />
      <path d="M16 46l38-14 38 14-38 14z" fill="white" {...base} />
      <path d="M16 46v40l38 16 38-16V46M54 60v42" fill="white" {...base} />
      <path d="M16 46 4 62l38 14 12-16M92 46l12 16-38 14-12-16" fill="white" {...base} />
    </svg>
  );
}

export function IconGloves(props: P) {
  return (
    <svg viewBox="0 0 100 110" width="90" height="100" {...props}>
      {[0, 22].map((dx) => (
        <path
          key={dx}
          transform={`translate(${dx} ${dx ? -4 : 6})`}
          d="M14 96 8 58c-2-8 6-10 8-2l4 12V20c0-6 8-6 8 0v30-38c0-6 8-6 8 0v38-34c0-6 8-6 8 0v34-26c0-6 8-6 8 0v48c0 16-6 24-12 32z"
          fill={SKY}
          {...base}
        />
      ))}
      {[0, 22].map((dx) => (
        <path
          key={`cuff${dx}`}
          transform={`translate(${dx} ${dx ? -4 : 6})`}
          d="M16 84h32l-2 12H18z"
          fill="white"
          {...base}
        />
      ))}
    </svg>
  );
}

export function IconBin(props: P) {
  return (
    <svg viewBox="0 0 130 100" width="120" height="92" {...props}>
      <path d="M6 14h118l-6 12H12z" fill={SKY} {...base} />
      <path d="M12 26h106l-10 64H22z" fill={SKY} {...base} />
      <path d="M12 26l40 64M118 26 78 90" fill="none" {...base} />
      <path d="M54 14V8h22v6" fill="none" {...base} />
      <circle cx="30" cy="92" r="6" fill="white" {...base} />
      <circle cx="100" cy="92" r="6" fill="white" {...base} />
      <g transform="translate(55 38) scale(.35)">
        <BoxMarkPaths />
      </g>
    </svg>
  );
}
function BoxMarkPaths() {
  return (
    <g fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round">
      <path d="M8 22 32 10l24 12-24 12z" />
      <path d="M8 22v26l24 12 24-12V22M32 34v26" />
    </g>
  );
}

export function IconTapeBox(props: P) {
  return (
    <svg viewBox="0 0 130 100" width="120" height="92" {...props}>
      <path d="M8 30 50 14l42 16-42 16z" fill={SKY} {...base} />
      <path d="M8 30v40l42 18 42-18V30M50 46v42" fill={SKY} {...base} />
      <path d="M8 30 24 18M92 30 76 18" fill="none" {...base} />
      <path d="M29 22l42 16" fill="none" stroke="white" strokeWidth="7" />
      <path d="M26 20.5l42 16" fill="none" {...base} strokeWidth={1.5} />
      <path d="M32 23.5l42 16" fill="none" {...base} strokeWidth={1.5} />
      <ellipse cx="96" cy="72" rx="20" ry="14" fill="white" {...base} />
      <ellipse cx="96" cy="72" rx="8" ry="5" fill="white" {...base} />
      <path d="M116 72l8 8-6 6-10-4" fill="white" {...base} />
    </svg>
  );
}

export function IconDiamond(props: P) {
  return (
    <svg viewBox="0 0 110 100" width="100" height="92" {...props}>
      <path d="M28 18h54l20 22-47 54L8 40z" fill="white" {...base} />
      <path d="M42 18h26l12 22H30z" fill="#a9d7ff" />
      <path d="M8 40h94M42 18l-12 22 25 54 25-54-12-22" fill="none" {...base} />
      <path d="M28 18h54l20 22-47 54L8 40z" fill="none" {...base} />
      <path d="M90 2l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM14 66l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill={SKY} {...base} strokeWidth={2} />
      <path d="M94 66l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={SKY} {...base} strokeWidth={1.5} />
    </svg>
  );
}

export function IconPiano(props: P) {
  return (
    <svg viewBox="0 0 100 100" width="92" height="92" {...props}>
      <path d="M10 60V30C10 14 22 6 34 6c16 0 18 16 32 24 10 6 22 10 22 30z" fill={SKY} {...base} />
      <rect x="10" y="60" width="78" height="34" fill="white" {...base} />
      {[22, 34, 52, 64, 76].map((x) => (
        <rect key={x} x={x - 3} y="60" width="7" height="20" fill={INK} />
      ))}
      {[23, 36, 49, 62, 75].map((x) => (
        <path key={x} d={`M${x + 6} 80v14`} fill="none" {...base} strokeWidth={2} />
      ))}
    </svg>
  );
}

/* ---------- Original mascot: "Boxy", a cheerful sky-blue moving box ---------- */
export function BoxyMascot(props: P) {
  return (
    <svg viewBox="0 0 240 240" {...props}>
      <ellipse cx="120" cy="226" rx="70" ry="8" fill="#000" opacity=".15" />
      {/* legs */}
      <path d="M96 190v28M144 190v28" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="90" cy="220" rx="14" ry="7" fill={SKY} />
      <ellipse cx="150" cy="220" rx="14" ry="7" fill={SKY} />
      {/* arms */}
      <path d="M52 120c-22 0-26-26-18-40" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M188 120c20 4 30-10 30-28" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <circle cx="34" cy="76" r="10" fill="white" stroke={INK} strokeWidth="4" />
      <circle cx="218" cy="88" r="10" fill="white" stroke={INK} strokeWidth="4" />
      {/* body */}
      <path d="M52 70 120 40l68 30v110l-68 22-68-22z" fill={SKY} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M52 70l68 26 68-26" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M120 96v106" stroke={INK} strokeWidth="3" opacity=".35" />
      {/* flaps */}
      <path d="M52 70 30 50l68-26 22 16M188 70l22-20-68-26-22 16" fill="#7cc4ff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      {/* face */}
      <ellipse cx="96" cy="124" rx="15" ry="19" fill="white" stroke={INK} strokeWidth="4" />
      <ellipse cx="144" cy="124" rx="15" ry="19" fill="white" stroke={INK} strokeWidth="4" />
      <circle cx="100" cy="128" r="7" fill={INK} />
      <circle cx="140" cy="128" r="7" fill={INK} />
      <circle cx="102" cy="125" r="2.2" fill="white" />
      <circle cx="142" cy="125" r="2.2" fill="white" />
      <path d="M92 158c10 18 46 18 56 0z" fill="white" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="78" cy="150" r="7" fill="#a9d7ff" />
      <circle cx="162" cy="150" r="7" fill="#a9d7ff" />
    </svg>
  );
}

/* ---------- Trust badges (small, ink line + sky fill) ---------- */
export function BadgePriceTag(props: P) {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" {...props}>
      <path d="M32 6h24v24L30 58 6 34z" fill={SKY} {...base} />
      <circle cx="46" cy="16" r="4" fill="white" {...base} strokeWidth={2.5} />
      <path d="M36 28c-1-3-8-4-9 0s9 3 8 7-8 3-9 0M31 23v2M31 38v2" fill="none" {...base} stroke="white" strokeWidth={3} />
    </svg>
  );
}

export function BadgeOnTime(props: P) {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" {...props}>
      <path d="M26 4h10M31 4v6M48 14l4-4" fill="none" {...base} />
      <circle cx="31" cy="35" r="24" fill="white" {...base} />
      <path d="M31 17v4M49 35h-4M31 53v-4M13 35h4" fill="none" {...base} strokeWidth={2.5} />
      <path d="M31 35V24M31 35l8 5" fill="none" {...base} stroke={SKY_700} />
      <circle cx="50" cy="51" r="11" fill={SKY} {...base} />
      <path d="m45 51 4 4 7-8" fill="none" {...base} stroke="white" />
    </svg>
  );
}

export function BadgeCareBox(props: P) {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" {...props}>
      <path d="M6 32 32 22l26 10-26 10z" fill="#7cc4ff" {...base} />
      <path d="M6 32v18l26 11 26-11V32M32 42v19" fill={SKY} {...base} />
      <path d="M32 20c-9-5-13-9-13-13a6 6 0 0 1 13-2 6 6 0 0 1 13 2c0 4-4 8-13 13z" fill="white" {...base} />
    </svg>
  );
}

export function BadgeSameDay(props: P) {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" {...props}>
      <path d="M2 24h8M4 32h7M2 40h8" fill="none" {...base} />
      <rect x="15" y="16" width="30" height="28" rx="2" fill={SKY} {...base} />
      <path d="M45 26h8l7 9v9H45z" fill="white" {...base} />
      <path d="M33 20l-8 11h6l-3 9 9-12h-6l3-8z" fill="white" {...base} strokeWidth={2} />
      <circle cx="24" cy="46" r="5.5" fill="white" {...base} />
      <circle cx="52" cy="46" r="5.5" fill="white" {...base} />
    </svg>
  );
}
