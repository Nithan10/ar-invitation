"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import Envelope from "./Envelope";
import DustParticles from "./DustParticles";
import { Sparkle } from "./Ornaments";
import { StarField, SoftGlow, CornerFlourishes } from "./Decorations";
import { EASE_LUXE } from "@/lib/animations";
import { useEnvelopeOpening } from "@/lib/useEnvelopeOpening";

type Props = { onOpened: () => void };

export default function EnvelopeLanding({ onOpened }: Props) {
  const scope = useRef<HTMLElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const { open, opening } = useEnvelopeOpening(scope, flash, onOpened);

  return (
    <section
      ref={scope}
      aria-label="Sealed invitation"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-6 sm:py-10"
    >
      {/* ── Background layer ── */}
      {/* Constellation starfield */}
      <StarField />

      {/* Soft glow blobs (radial-gradient only, no solid bg — no squares) */}
      <SoftGlow
        className="pointer-events-none absolute"
        color="rgba(140,20,80,0.45)"
        size={420}
        style={{ top: "8%", left: "-8%" } as React.CSSProperties}
      />
      <SoftGlow
        className="pointer-events-none absolute"
        color="rgba(200,140,0,0.28)"
        size={360}
        style={{ bottom: "10%", right: "-5%" } as React.CSSProperties}
      />
      <SoftGlow
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        color="rgba(80,10,120,0.3)"
        size={500}
      />

      {/* Corner flourishes */}
      <CornerFlourishes />

      <DustParticles count={32} seed={5} gold />

      {/* Title above envelope */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE_LUXE, delay: 0.1 }}
        className="relative z-10 mb-6 text-center sm:mb-8"
      >
        <p className="font-royal text-[10px] font-semibold tracking-[0.55em] text-[#ffd060]/70 sm:text-xs">
          ✦ &nbsp;AN EXCLUSIVE EVENING&nbsp; ✦
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 35, rotateX: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.8, ease: EASE_LUXE, delay: 0.25 }}
        className="relative w-full [perspective:1200px]"
      >
        <div className={opening ? "" : "float-soft"}>
          <div className="transition-transform duration-700 ease-out hover:-translate-y-2">
            <Envelope onSealClick={open} disabled={opening} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="landing-copy relative mt-8 flex flex-col items-center text-center sm:mt-10"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 1.2 } } }}
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_LUXE } } }}
          className="gold-text font-serif text-[clamp(1.65rem,5vw,2.9rem)] font-bold leading-tight"
        >
          You&rsquo;ve Received a Special Invitation
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_LUXE } } }}
          className="mt-2 font-serif text-[clamp(1.05rem,2.8vw,1.4rem)] italic text-[#ecd8c8]"
        >
          A little celebration awaits&hellip;
        </motion.p>

        <motion.button
          type="button"
          onClick={open}
          disabled={opening}
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 1.3 } } }}
          className="relative mt-6 overflow-hidden rounded-full px-7 py-3 font-royal text-[11px] font-bold tracking-[0.38em] text-white sm:text-xs shimmer-border"
          style={{
            background: "linear-gradient(135deg, #7a1040 0%, #3a0a60 50%, #7a1040 100%)",
            backgroundSize: "200% 100%",
            boxShadow: "0 0 24px rgba(255,86,128,0.35), 0 0 48px rgba(120,20,160,0.2)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkle className="text-[#ffd060]" />
            <span className="shimmer-hint">CLICK THE SEAL TO OPEN</span>
            <Sparkle className="text-[#ffd060]" />
          </span>
        </motion.button>

        <motion.p
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.3 } } }}
          className="mt-3 flex items-center gap-2 text-xs text-[#d4c0b0]/80"
        >
          <MousePointerClick className="h-3.5 w-3.5 animate-bounce text-[#ffd060]" aria-hidden="true" />
          <span className="hidden sm:inline">Move your cursor over the seal to discover the magic</span>
          <span className="sm:hidden font-semibold text-[#ffd060]">Tap the red AR seal to open</span>
        </motion.p>
      </motion.div>

      {/* golden flash */}
      <div
        ref={flash}
        className="pointer-events-none fixed inset-0 z-50 opacity-0 [background:radial-gradient(circle_at_50%_40%,#fffdf6_0%,#fbe9c2_45%,#e8cf98_100%)]"
      />
    </section>
  );
}
