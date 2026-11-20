"use client";

import { MessageCircle } from "lucide-react";
import { whatsappRsvpUrl } from "@/lib/invitation";
import { Reveal, RevealItem } from "./Reveal";
import { motion } from "framer-motion";
import { StarField, SoftGlow } from "./Decorations";

export default function ClosingNote() {
  const url = whatsappRsvpUrl();
  return (
    <section aria-label="A note from your host" className="relative overflow-hidden px-4 py-16 sm:py-24">
      <StarField opacity={0.55} />
      <SoftGlow className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(50,8,80,0.5)" size={500} />

      <Reveal className="relative mx-auto max-w-xl text-center" gap={0.2}>
        <RevealItem>
          <p
            className="font-serif text-[clamp(1.5rem,4.5vw,2.2rem)] font-medium italic leading-snug"
            style={{
              color: "#ff5680",
              textShadow: "0 0 12px rgba(255,86,128,0.5), 0 0 30px rgba(255,86,128,0.25)",
            }}
          >
            Your presence will make it more special!
          </p>
        </RevealItem>
        <RevealItem>
          <p className="mt-8 font-serif text-lg sm:text-xl text-[#e8d4c0]">With warm regards,</p>
        </RevealItem>
        <RevealItem>
          <div className="mt-3 flex flex-col items-center">
            <p
              className="font-royal text-[clamp(2.4rem,8.5vw,4.5rem)] font-extrabold tracking-[0.2em] leading-tight gold-text gold-sweep"
              style={{
                textShadow: "0 0 25px rgba(255,208,96,0.45), 0 4px 15px rgba(0,0,0,0.8)",
              }}
            >
              ARUN R
            </p>
          </div>
        </RevealItem>

        {/* Decorative rule */}
        <RevealItem>
          <div className="mx-auto mt-8 h-px w-48 bg-gradient-to-r from-transparent via-[#ffd060] to-transparent" style={{ boxShadow: "0 0 12px rgba(255,208,96,0.4)" }} />
        </RevealItem>

        <RevealItem>
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 font-royal text-sm font-bold tracking-[0.25em] text-white"
            style={{
              background: "linear-gradient(135deg, #064e35 0%, #047857 40%, #10b981 70%, #047857 100%)",
              backgroundSize: "200% 100%",
              boxShadow: "0 0 28px rgba(16,185,129,0.5), 0 10px 30px rgba(0,0,0,0.5)",
              border: "1px solid rgba(16,185,129,0.6)",
            }}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            RSVP ON WHATSAPP
          </motion.a>
        </RevealItem>

        {/* Sub-label */}
        <RevealItem>
          <p className="mt-4 font-royal text-[10px] tracking-[0.4em] text-[#c8b0d0]/70">
            WE LOOK FORWARD TO SEEING YOU
          </p>
        </RevealItem>
      </Reveal>
    </section>
  );
}
