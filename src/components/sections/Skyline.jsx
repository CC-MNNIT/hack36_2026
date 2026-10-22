// Procedural city skyline. A seeded PRNG keeps the output identical on server
// and client, so the SVG is static markup with zero runtime cost.

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(seed, { width, height, minH, maxH, minW, maxW, windows }) {
  const r = mulberry32(seed);
  let x = 0;
  let body = `M0 ${height}`;
  let lights = "";
  while (x < width) {
    const w = minW + r() * (maxW - minW);
    const h = minH + r() * (maxH - minH);
    const top = height - h;
    body += `L${x.toFixed(1)} ${top.toFixed(1)}`;
    // Occasional antenna
    if (r() > 0.78) {
      const ax = x + w / 2;
      body += `L${(ax - 1).toFixed(1)} ${top.toFixed(1)}L${(ax - 1).toFixed(1)} ${(top - 18).toFixed(1)}L${(ax + 1).toFixed(1)} ${(top - 18).toFixed(1)}L${(ax + 1).toFixed(1)} ${top.toFixed(1)}`;
    }
    body += `L${(x + w).toFixed(1)} ${top.toFixed(1)}`;
    if (windows) {
      for (let wy = top + 8; wy < height - 8; wy += 9) {
        for (let wx = x + 4; wx < x + w - 6; wx += 7) {
          if (r() > 0.88) lights += `M${wx.toFixed(1)} ${wy.toFixed(1)}h3v3h-3z`;
        }
      }
    }
    x += w;
  }
  body += `L${width} ${height}Z`;
  return { body, lights };
}

const W = 1600;
const H = 320;
const back = build(36, { width: W, height: H, minH: 90, maxH: 280, minW: 40, maxW: 110, windows: false });
const front = build(10, { width: W, height: H, minH: 50, maxH: 190, minW: 30, maxW: 90, windows: true });

export default function Skyline({ className }) {
  return (
    <div className={className} data-skyline aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-layer="back">
        <path d={back.body} fill="#1a1030" />
      </svg>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" data-layer="front">
        <path d={front.body} fill="#0a0812" />
        <path d={front.lights} fill="#f7e600" opacity="0.55" />
      </svg>
    </div>
  );
}
