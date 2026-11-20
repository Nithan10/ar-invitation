"use client";

import { RotateCcw } from "lucide-react";
import DustParticles from "./DustParticles";
import { Reveal, RevealItem } from "./Reveal";
import { Sparkle } from "./Ornaments";
import { motion } from "framer-motion";
import { StarField, SoftGlow } from "./Decorations";

export default function FinalFooter({ onRestart }: { onRestart: () => void }) {
  return (
    <footer className="relative overflow-hidden px-4 pb-14 pt-20 text-center"
      style={{
        background: "linear-gradient(to bottom, transparent 0%, rgba(14,5,22,0.9) 40%, #060409 100%)",
      }}
    >
      <DustParticles count={35} seed={99} gold />

      {/* Ambient final glow */}
      <StarField opacity={0.4} />
      <SoftGlow className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2" color="rgba(90,10,112,0.5)" size={450} />

      <Reveal className="relative flex flex-col items-center">
        <RevealItem>
          {/* Logo crest with pulse rings */}
          <div className="relative inline-block">
            <span className="pulse-ring" />
            <span className="pulse-ring r2" />
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full font-royal text-xl font-bold text-[#fff1cf]"
              style={{
                background: "radial-gradient(circle at 35% 30%, #e11d48, #9f1239 55%, #4c0519 85%, #200010)",
                boxShadow: "0 0 30px rgba(225,29,72,0.6), 0 0 60px rgba(225,29,72,0.25), 0 8px 25px rgba(0,0,0,0.6)",
                border: "3px solid #ffd060",
              }}
            >
              AR
            </div>
          </div>
        </RevealItem>

        <RevealItem>
          <p className="mt-8 flex items-center gap-3 font-royal text-[11px] tracking-[0.5em] text-[#e8d4c0]">
            <Sparkle className="text-[#ffd060]" /> 27 · 11 · 2026 <Sparkle className="text-[#ffd060]" />
          </p>
        </RevealItem>

        <RevealItem>
          <p className="mt-3 font-serif text-xl italic text-[#e8d4c0]">See you at the table.</p>
        </RevealItem>

        {/* Closing rule */}
        <RevealItem>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[#ffd060] to-transparent" style={{ boxShadow: "0 0 10px rgba(255,208,96,0.4)" }} />
        </RevealItem>

        <RevealItem>
          <motion.button
            type="button"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 font-royal text-[11px] font-bold tracking-[0.28em] text-[#ffd060]"
            style={{
              background: "linear-gradient(135deg, rgba(255,208,96,0.1), rgba(120,10,100,0.25), rgba(255,208,96,0.1))",
              border: "1px solid rgba(255,208,96,0.6)",
              boxShadow: "0 0 20px rgba(255,208,96,0.15)",
            }}
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#ffd060]" aria-hidden="true" /> RESEAL &amp; REPLAY
          </motion.button>
        </RevealItem>
      </Reveal>
    </footer>
  );
}
