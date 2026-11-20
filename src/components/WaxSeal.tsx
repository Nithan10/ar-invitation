import { seeded } from "@/lib/random";

/** Irregular poured-wax outline, generated deterministically. */
function waxOutline(): string {
  const rand = seeded(27112026);
  const n = 30;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 88 + rand() * 9 - (i % 5 === 0 ? 3 : 0);
    pts.push([100 + Math.cos(a) * r, 100 + Math.sin(a) * r]);
  }
  // Smooth closed curve through points (Catmull-Rom → cubic Bézier)
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

const OUTLINE = waxOutline();
// Jagged fracture line running top → bottom through the monogram
const CRACK = "M104,4 L97,30 L108,52 L95,78 L106,100 L92,124 L104,146 L96,172 L103,196";
const LEFT_CLIP = `M0,0 L104,0 L104,4 L97,30 L108,52 L95,78 L106,100 L92,124 L104,146 L96,172 L103,196 L103,200 L0,200Z`;
const RIGHT_CLIP = `M200,0 L104,0 L104,4 L97,30 L108,52 L95,78 L106,100 L92,124 L104,146 L96,172 L103,196 L103,200 L200,200Z`;

const SHARDS = [
  { d: "M0,0 L9,-3 L6,7Z", x: 100, y: 40 },
  { d: "M0,0 L7,2 L2,9 L-3,4Z", x: 98, y: 70 },
  { d: "M0,0 L6,-4 L8,5Z", x: 103, y: 96 },
  { d: "M0,0 L10,1 L4,8Z", x: 97, y: 120 },
  { d: "M0,0 L5,-5 L9,3 L3,6Z", x: 101, y: 150 },
  { d: "M0,0 L8,3 L1,7Z", x: 99, y: 176 },
];

const BEADED_RING = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  return {
    cx: Number((100 + Math.cos(a) * 58).toFixed(2)),
    cy: Number((100 + Math.sin(a) * 58).toFixed(2)),
  };
});

function SealBody() {
  return (
    <>
      <path d={OUTLINE} fill="url(#wax-body)" />
      {/* poured-edge rim highlight */}
      <path d={OUTLINE} fill="none" stroke="url(#wax-rim)" strokeWidth="5" opacity="0.65" />
      {/* stamped recess */}
      <circle cx="100" cy="100" r="66" fill="url(#wax-recess)" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#2a050b" strokeWidth="3" opacity="0.75" />
      <circle cx="99" cy="99" r="66" fill="none" stroke="#ff8f98" strokeWidth="1.2" opacity="0.45" />
      {/* beaded ring */}
      {BEADED_RING.map((bead, i) => (
        <circle
          key={i}
          cx={bead.cx}
          cy={bead.cy}
          r="1.7"
          fill="#3b050d"
          opacity="0.8"
        />
      ))}
      <circle cx="100" cy="100" r="51" fill="none" stroke="#ffd778" strokeWidth="1" opacity="0.5" />
      {/* laurel sprigs */}
      <g stroke="#ffd778" strokeWidth="1.4" fill="none" opacity="0.65" strokeLinecap="round">
        <path d="M70,138 Q100,152 130,138" />
        <path d="M80,141 q-4,-7 2,-10 M92,145 q-3,-8 3,-10 M108,145 q3,-8 -3,-10 M120,141 q4,-7 -2,-10" />
      </g>
      {/* embossed monogram: shadow, highlight, face in rich gold foil */}
      <g style={{ fontFamily: "var(--font-cinzel), 'Times New Roman', serif" }} fontWeight="700" fontSize="56" textAnchor="middle" letterSpacing="2">
        <text x="101.8" y="121.8" fill="#1f0206" opacity="0.85">AR</text>
        <text x="98.6" y="118.6" fill="#ffe299" opacity="0.55">AR</text>
        <text x="100" y="120" fill="url(#wax-letter)">AR</text>
      </g>
      {/* specular gloss */}
      <ellipse cx="72" cy="58" rx="34" ry="18" fill="url(#wax-gloss)" transform="rotate(-28 72 58)" />
    </>
  );
}

export default function WaxSeal() {
  return (
    <svg viewBox="-20 -20 240 240" className="seal-svg h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="wax-body" cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#e83648" />
          <stop offset="0.42" stopColor="#b31d2c" />
          <stop offset="0.78" stopColor="#7a0e19" />
          <stop offset="1" stopColor="#40040a" />
        </radialGradient>
        <linearGradient id="wax-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb3ad" />
          <stop offset="0.5" stopColor="#a32231" stopOpacity="0" />
          <stop offset="1" stopColor="#250307" />
        </linearGradient>
        <radialGradient id="wax-recess" cx="58%" cy="62%" r="70%">
          <stop offset="0" stopColor="#b82734" />
          <stop offset="0.7" stopColor="#871724" />
          <stop offset="1" stopColor="#550c15" />
        </radialGradient>
        <linearGradient id="wax-letter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe5a3" />
          <stop offset="0.45" stopColor="#f3be57" />
          <stop offset="1" stopColor="#96222c" />
        </linearGradient>
        <radialGradient id="wax-gloss">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="seal-left-clip">
          <path d={LEFT_CLIP} />
        </clipPath>
        <clipPath id="seal-right-clip">
          <path d={RIGHT_CLIP} />
        </clipPath>
      </defs>

      {/* drop shadow under the wax */}
      <ellipse className="seal-shadow" cx="104" cy="110" rx="92" ry="90" fill="#000000" opacity="0.5" filter="blur(7px)" />

      <g className="seal-left" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g clipPath="url(#seal-left-clip)">
          <SealBody />
        </g>
      </g>
      <g className="seal-right" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g clipPath="url(#seal-right-clip)">
          <SealBody />
        </g>
      </g>

      <path
        className="seal-crack"
        d={CRACK}
        fill="none"
        stroke="#150204"
        strokeWidth="2.8"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
      />

      {SHARDS.map((s, i) => (
        <path
          key={i}
          className="seal-shard"
          d={s.d}
          transform={`translate(${s.x} ${s.y})`}
          fill={i % 2 ? "#b82435" : "#7a111e"}
          opacity="0"
        />
      ))}
    </svg>
  );
}
