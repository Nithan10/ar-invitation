"use client";

import { motion } from "framer-motion";
import { Corner, Divider, Sparkle } from "./Ornaments";
import { StarField, SoftGlow } from "./Decorations";
import { EASE_LUXE } from "@/lib/animations";

const line = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.3, ease: EASE_LUXE, delay },
});

export default function InvitationLetter() {
  return (
    <section aria-labelledby="invite-heading" className="relative flex min-h-[100dvh] items-center justify-center px-4 py-12 sm:py-20">
      <StarField />
      <SoftGlow className="pointer-events-none absolute -left-16 top-1/4" color="rgba(100,10,140,0.4)" size={380} />
      <SoftGlow className="pointer-events-none absolute -right-10 bottom-1/4" color="rgba(180,110,0,0.3)" size={320} />

      <motion.article
        initial={{ opacity: 0, y: 65, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: EASE_LUXE, delay: 0.15 }}
        className="relative w-full max-w-[680px] rounded-[8px] px-5 py-12 text-center sm:px-14 sm:py-20"
        style={{
          background: "linear-gradient(165deg, #130920 0%, #0c0518 55%, #09040e 100%)",
          border: "1px solid rgba(255,208,96,0.35)",
          boxShadow:
            "0 40px 90px -25px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,208,96,0.25), 0 0 55px rgba(255,208,96,0.08), 0 0 90px rgba(160,20,120,0.12)",
        }}
      >
        {/* Animated shimmer border frame */}
        <div className="shimmer-border absolute inset-0 rounded-[8px]" />

        {/* double gold frame lines */}
        <div className="pointer-events-none absolute inset-3 rounded-sm border border-[#ffd060]/50 sm:inset-5" />
        <div className="pointer-events-none absolute inset-[14px] rounded-sm border border-[#ffd060]/20 sm:inset-[26px]" />

        <Corner className="absolute left-1.5 top-1.5 text-[#ffd060] sm:left-4 sm:top-4" />
        <Corner className="absolute right-1.5 top-1.5 rotate-90 text-[#ffd060] sm:right-4 sm:top-4" />
        <Corner className="absolute bottom-1.5 right-1.5 rotate-180 text-[#ffd060] sm:bottom-4 sm:right-4" />
        <Corner className="absolute bottom-1.5 left-1.5 -rotate-90 text-[#ffd060] sm:bottom-4 sm:left-4" />

        <motion.p {...line(0.5)} className="flex items-center justify-center gap-2 font-royal text-[10px] font-bold tracking-[0.32em] text-[#ffd060] sm:gap-3 sm:text-xs sm:tracking-[0.38em]">
          <Sparkle className="text-[#ffd060]" /> YOU ARE CORDIALLY INVITED <Sparkle className="text-[#ffd060]" />
        </motion.p>

        <motion.h1
          id="invite-heading"
          {...line(0.75)}
          className="gold-text gold-sweep mt-5 font-royal text-[clamp(1.5rem,5vw,2.75rem)] font-bold leading-tight tracking-[0.07em]"
        >
          LET&rsquo;S CELEBRATE TOGETHER!
        </motion.h1>

        <motion.div {...line(1)} className="mt-5 flex justify-center text-[#ffd060]">
          <Divider />
        </motion.div>

        {/* Script title with rose neon glow */}
        <motion.p
          {...line(1.2)}
          className="mt-6 font-script text-[clamp(2.6rem,9vw,4.8rem)] leading-[1.05]"
          style={{
            color: "#ff5680",
            textShadow: "0 0 10px rgba(255,86,128,0.7), 0 0 30px rgba(255,86,128,0.4), 0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          A Night to Remember
        </motion.p>

        <motion.p {...line(1.45)} className="mx-auto mt-5 max-w-md font-serif text-[clamp(1.1rem,2.8vw,1.45rem)] italic leading-relaxed text-[#e8d4c0]">
          Good food, great conversations, unforgettable memories!
        </motion.p>

        {/* Event detail pills */}
        <motion.div {...line(1.65)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {["27 NOVEMBER", "FRIDAY", "7:30 PM"].map((tag, i) => (
            <span
              key={i}
              className="rounded-full px-4 py-1.5 font-royal text-[10px] font-bold tracking-[0.28em] text-[#ffd060] sm:text-[11px]"
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, rgba(255,208,96,0.18), rgba(180,30,100,0.25))"
                  : i === 1
                  ? "linear-gradient(135deg, rgba(255,86,128,0.18), rgba(80,10,100,0.3))"
                  : "linear-gradient(135deg, rgba(80,10,100,0.3), rgba(255,208,96,0.18))",
                border: "1px solid rgba(255,208,96,0.4)",
                boxShadow: "0 0 12px rgba(255,208,96,0.1)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          {...line(2)}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-2 font-royal text-[10px] tracking-[0.4em] text-[#ffd060]"
        >
          <span>SCROLL DOWN</span>
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-9 w-px bg-gradient-to-b from-[#ffd060] via-[#ff5680] to-transparent"
          />
        </motion.div>
      </motion.article>
    </section>
  );
}
