"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { EVENT } from "@/lib/invitation";
import { Divider } from "./Ornaments";
import { StarField, SoftGlow } from "./Decorations";
import { Reveal, RevealItem } from "./Reveal";

function getTimeRemaining(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const rem = Math.max(0, target - now);
  return {
    d: Math.floor(rem / 86400000),
    h: Math.floor((rem % 86400000) / 3600000),
    m: Math.floor((rem % 3600000) / 60000),
    s: Math.floor((rem % 60000) / 1000),
  };
}

/** Live countdown to the event — always visible and responsive on all mobile devices */
function Countdown({ targetISO }: { targetISO: string }) {
  const [diff, setDiff] = useState(() => getTimeRemaining(targetISO));

  useEffect(() => {
    setDiff(getTimeRemaining(targetISO));
    const id = setInterval(() => {
      setDiff(getTimeRemaining(targetISO));
    }, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const Unit = ({ v, label }: { v: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="pulse-ring" />
        <span className="pulse-ring r2" />
        <div
          className="relative flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(145deg, #1f0a2a 0%, #2d0535 100%)",
            border: "1px solid rgba(255,208,96,0.4)",
            boxShadow: "0 0 18px rgba(255,86,128,0.2), inset 0 1px 0 rgba(255,208,96,0.15)",
          }}
        >
          <span
            className="font-serif text-xl sm:text-3xl font-bold text-[#ffd060]"
            style={{ textShadow: "0 0 12px rgba(255,208,96,0.6)" }}
          >
            {String(v).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-1.5 font-royal text-[8px] sm:text-[10px] font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[#c8a0d0]/80">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mt-8 sm:mt-10 flex items-start justify-center gap-1.5 sm:gap-4" aria-label="Countdown to event">
      <Unit v={diff.d} label="DAYS" />
      <span className="mt-2.5 sm:mt-4 font-serif text-xl sm:text-2xl font-bold text-[#ffd060]/60">:</span>
      <Unit v={diff.h} label="HRS" />
      <span className="mt-2.5 sm:mt-4 font-serif text-xl sm:text-2xl font-bold text-[#ffd060]/60">:</span>
      <Unit v={diff.m} label="MIN" />
      <span className="mt-2.5 sm:mt-4 font-serif text-xl sm:text-2xl font-bold text-[#ffd060]/60">:</span>
      <Unit v={diff.s} label="SEC" />
    </div>
  );
}

export default function DateReveal() {
  return (
    <section aria-labelledby="date-heading" className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* Background decorations */}
      <StarField opacity={0.6} />
      <SoftGlow
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        color="rgba(60,10,100,0.35)"
        size={550}
      />

      <Reveal className="relative mx-auto max-w-3xl text-center" gap={0.16}>
        <RevealItem>
          <h2
            id="date-heading"
            className="font-royal text-[10px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.55em] text-[#ffd060]"
          >
            ✦&nbsp; SAVE THE DATE &nbsp;✦
          </h2>
          <p className="sr-only">
            {EVENT.weekday}, {EVENT.day} {EVENT.month} {EVENT.year} at {EVENT.time}
          </p>
        </RevealItem>

        <RevealItem>
          {/* Month label with neon glow */}
          <div className="mt-6 sm:mt-8 font-royal text-[clamp(1.2rem,4vw,2rem)] font-bold tracking-[0.25em] sm:tracking-[0.42em] neon-rose">
            {EVENT.month}
          </div>
        </RevealItem>

        <RevealItem>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-10">
            {/* Weekday with gold accent rules */}
            <div className="flex flex-col items-end gap-2">
              <span
                className="block h-px w-full"
                style={{ background: "linear-gradient(to left, #ffd060, rgba(255,208,96,0.2))" }}
              />
              <span className="font-royal text-[clamp(0.72rem,2.5vw,1.2rem)] tracking-[0.18em] sm:tracking-[0.32em] text-[#e8d8f0] font-bold">
                {EVENT.weekday}
              </span>
              <span
                className="block h-px w-full"
                style={{ background: "linear-gradient(to left, #ffd060, rgba(255,208,96,0.2))" }}
              />
            </div>

            {/* Giant day number "27" */}
            <div className="relative">
              <span className="gold-text gold-sweep font-serif text-[clamp(5.5rem,22vw,10rem)] font-bold leading-[0.9] block">
                {EVENT.day}
              </span>
              {/* Underline glow */}
              <div
                className="mt-1 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#ffd060] to-transparent"
                style={{ boxShadow: "0 0 12px rgba(255,208,96,0.7)" }}
              />
            </div>

            {/* Year with gold accent rules */}
            <div className="flex flex-col items-start gap-2">
              <span
                className="block h-px w-full"
                style={{ background: "linear-gradient(to right, #ffd060, rgba(255,208,96,0.2))" }}
              />
              <span className="font-royal text-[clamp(0.72rem,2.5vw,1.2rem)] tracking-[0.18em] sm:tracking-[0.32em] text-[#e8d8f0] font-bold">
                {EVENT.year}
              </span>
              <span
                className="block h-px w-full"
                style={{ background: "linear-gradient(to right, #ffd060, rgba(255,208,96,0.2))" }}
              />
            </div>
          </div>
        </RevealItem>

        <RevealItem>
          {/* Time pill */}
          <div
            className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 sm:px-7 sm:py-3 font-royal text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.28em] text-[#ffd060]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,208,96,0.12) 0%, rgba(120,10,100,0.35) 50%, rgba(255,208,96,0.12) 100%)",
              border: "1px solid rgba(255,208,96,0.6)",
              boxShadow: "0 0 24px rgba(255,208,96,0.18), inset 0 1px 0 rgba(255,208,96,0.15)",
            }}
          >
            <Clock className="h-4 w-4 text-[#ffd060]" aria-hidden="true" />
            {EVENT.time}
          </div>
        </RevealItem>

        <RevealItem>
          {/* Live countdown */}
          <Countdown targetISO={EVENT.dateISO} />
        </RevealItem>

        <RevealItem>
          <div className="mt-14 flex justify-center text-[#ffd060]">
            <Divider />
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}
