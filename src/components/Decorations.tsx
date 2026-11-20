/**
 * Decorative background elements — SVG constellation lines, twinkling stars,
 * and soft radial gradients. No solid-square blobs anywhere.
 */

import type { CSSProperties } from "react";
import { seeded } from "@/lib/random";

/** Pre-computed star positions (deterministic, SSR-safe) */
const STARS = Array.from({ length: 55 }, (_, i) => {
  const r = seeded(i * 7 + 3);
  return {
    x: Math.round(r() * 10000) / 100,         // 0–100 %
    y: Math.round(r() * 10000) / 100,
    size: Math.round((0.8 + r() * 2.2) * 10) / 10,
    delay: Math.round(r() * 60) / 10,
    dur: Math.round((3 + r() * 5) * 10) / 10,
    bright: Math.round((0.3 + r() * 0.65) * 100) / 100,
  };
});

/** Constellation line pairs (index into STARS) */
const LINES: [number, number][] = [
  [0, 4], [4, 9], [9, 14], [14, 2],
  [7, 11], [11, 18], [18, 23],
  [30, 35], [35, 40], [40, 45],
  [3, 8], [8, 13],
];

type StarFieldProps = {
  /** Extra wrapper className (position/size, e.g. "absolute inset-0") */
  className?: string;
  /** Opacity of the whole layer */
  opacity?: number;
};

export function StarField({ className = "pointer-events-none absolute inset-0", opacity = 1 }: StarFieldProps) {
  return (
    <div className={className} aria-hidden="true" style={{ opacity }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Constellation lines */}
        {LINES.map(([a, b], i) => (
          <line
            key={i}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
            stroke="rgba(255,208,96,0.18)"
            strokeWidth="0.12"
          />
        ))}

        {/* Stars */}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.size * 0.012}
            fill={i % 7 === 0 ? "#ff9fc8" : i % 5 === 0 ? "#ffd060" : "#e8e0ff"}
            opacity={s.bright}
            style={{
              animation: `star-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
            } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}

/** Four decorative corner flourishes in gold */
export function CornerFlourishes({ className = "pointer-events-none absolute inset-0" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      {/* Top-left */}
      <svg className="absolute left-3 top-3 h-16 w-16 text-[#ffd060]/30 sm:left-5 sm:top-5 sm:h-20 sm:w-20" viewBox="0 0 80 80" fill="none">
        <path d="M4 76 V18 Q4 4 18 4 H76" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M12 68 V24 Q12 12 24 12 H68" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="18" cy="18" r="2.5" fill="currentColor"/>
        <path d="M18 32 Q22 24 30 20" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
        <path d="M32 18 Q24 22 20 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
      </svg>
      {/* Top-right */}
      <svg className="absolute right-3 top-3 h-16 w-16 text-[#ffd060]/30 sm:right-5 sm:top-5 sm:h-20 sm:w-20" viewBox="0 0 80 80" fill="none" style={{ transform: "scaleX(-1)" }}>
        <path d="M4 76 V18 Q4 4 18 4 H76" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M12 68 V24 Q12 12 24 12 H68" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="18" cy="18" r="2.5" fill="currentColor"/>
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-3 left-3 h-16 w-16 text-[#ffd060]/30 sm:bottom-5 sm:left-5 sm:h-20 sm:w-20" viewBox="0 0 80 80" fill="none" style={{ transform: "scaleY(-1)" }}>
        <path d="M4 76 V18 Q4 4 18 4 H76" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M12 68 V24 Q12 12 24 12 H68" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="18" cy="18" r="2.5" fill="currentColor"/>
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-3 right-3 h-16 w-16 text-[#ffd060]/30 sm:bottom-5 sm:right-5 sm:h-20 sm:w-20" viewBox="0 0 80 80" fill="none" style={{ transform: "scale(-1,-1)" }}>
        <path d="M4 76 V18 Q4 4 18 4 H76" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M12 68 V24 Q12 12 24 12 H68" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"/>
        <circle cx="18" cy="18" r="2.5" fill="currentColor"/>
      </svg>
    </div>
  );
}

/** Soft radial glow (no hard edges, fully blurred — safe replacement for orbs) */
export function SoftGlow({
  className = "pointer-events-none absolute",
  color = "rgba(180,30,120,0.35)",
  size = 400,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        transform: "translateZ(0)",
      }}
    />
  );
}
