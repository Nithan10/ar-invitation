/** Decorative SVG flourishes in antique gold. */

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 24" className={`h-5 w-56 sm:w-72 ${className}`} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M8 12 H118" />
        <path d="M202 12 H312" />
        <path d="M118 12 c10 -10 22 -10 30 0 c-8 10 -20 10 -30 0Z" />
        <path d="M202 12 c-10 -10 -22 -10 -30 0 c8 10 20 10 30 0Z" />
        <path d="M60 12 q12 -8 24 0 q-12 8 -24 0" opacity=".7" />
        <path d="M236 12 q12 -8 24 0 q-12 8 -24 0" opacity=".7" />
      </g>
      <path d="M160 3 L166 12 L160 21 L154 12Z" fill="currentColor" />
      <circle cx="8" cy="12" r="2" fill="currentColor" />
      <circle cx="312" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`h-12 w-12 sm:h-16 sm:w-16 ${className}`} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 76 V20 Q4 4 20 4 H76" />
        <path d="M10 76 V24 Q10 10 24 10 H76" opacity=".6" />
        <path d="M18 18 q14 2 16 16 q-14 -2 -16 -16Z" />
        <path d="M18 34 q6 8 2 18" opacity=".7" />
        <path d="M34 18 q8 6 18 2" opacity=".7" />
      </g>
      <circle cx="18" cy="18" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-3 w-3 ${className}`} aria-hidden="true">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" fill="currentColor" />
    </svg>
  );
}
