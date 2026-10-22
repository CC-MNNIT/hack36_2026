// Line icons drawn on a 48px grid. Paths carry pathLength=1 so they can be
// "drawn" with stroke-dashoffset from CSS or GSAP.
const PATHS = {
  chip: "M14 14h20v20H14zM20 20h8v8h-8zM18 8v6M24 8v6M30 8v6M18 34v6M24 34v6M30 34v6M8 18h6M8 24h6M8 30h6M34 18h6M34 24h6M34 30h6",
  shield: "M24 6l15 6v11c0 9.5-6.4 16.5-15 19-8.6-2.5-15-9.5-15-19V12zM17 24l5 5 9-10",
  chain: "M20 28l8-8M17 22l-5 5a6 6 0 008.5 8.5l5-5M31 26l5-5a6 6 0 00-8.5-8.5l-5 5",
  coin: "M24 6a18 18 0 110 36 18 18 0 010-36zM29 17h-7a3.5 3.5 0 000 7h4a3.5 3.5 0 010 7h-8M24 13v4M24 31v4",
  circuit: "M6 24h10l4-8 8 16 4-8h10M16 24a2 2 0 11-.01 0M36 24a2 2 0 11-.01 0M24 6v6M24 36v6",
  spark: "M24 6v10M24 32v10M6 24h10M32 24h10M11 11l7 7M30 30l7 7M37 11l-7 7M18 30l-7 7",
};

export default function Icon({ name, className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d={PATHS[name]}
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
