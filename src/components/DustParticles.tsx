import { seeded } from "@/lib/random";
import type { CSSProperties } from "react";

type Props = { count?: number; seed?: number; className?: string; gold?: boolean };

/** Lightweight CSS-only floating dust / golden motes. */
export default function DustParticles({ count = 12, seed = 11, className = "", gold = false }: Props) {
  const rand = seeded(seed);
  const motes = Array.from({ length: count }, () => {
    const size = Math.round((2 + rand() * (gold ? 5 : 4)) * 10) / 10;
    const left = Math.round(rand() * 1000) / 10;
    const top = Math.round((15 + rand() * 85) * 10) / 10;
    const dur = Math.round((9 + rand() * 12) * 10) / 10;
    const del = Math.round(-rand() * 180) / 10;
    const dx = Math.round((rand() - 0.5) * 80);
    const o = Math.round(((gold ? 0.55 : 0.35) + rand() * 0.4) * 100) / 100;
    return {
      left: `${left}%`,
      top: `${top}%`,
      width: size,
      height: size,
      animationDuration: `${dur}s`,
      animationDelay: `${del}s`,
      "--dx": `${dx}px`,
      "--o": o,
    } as CSSProperties;
  });
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {motes.map((style, i) => (
        <span key={i} className="dust" style={style} />
      ))}
    </div>
  );
}
