"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";
import { EVENT } from "@/lib/invitation";
import { prefersReducedMotion } from "@/lib/animations";
import { Divider } from "./Ornaments";
import { StarField, SoftGlow } from "./Decorations";

/** Split text into masked characters for a cinematic roll-up. */
function Chars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`} aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="date-char inline-block will-change-transform">
          {c === " " ? "\u00a0" : c}
        </span>
      ))}
    </span>
  );
}

/** Live countdown to the event */
function Countdown({ targetISO }: { targetISO: string }) {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetISO).getTime();
    const tick = () => {
      const now = Date.now();
      const rem = Math.max(0, target - now);
      setDiff({
        d: Math.floor(rem / 86400000),
        h: Math.floor((rem % 86400000) / 3600000),
        m: Math.floor((rem % 3600000) / 60000),
        s: Math.floor((rem % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (!mounted) return null;

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
          <span className="font-serif text-xl sm:text-3xl font-bold text-[#ffd060]" style={{ textShadow: "0 0 12px rgba(255,208,96,0.6)" }}>
            {String(v).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-1.5 font-royal text-[8px] sm:text-[10px] font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[#c8a0d0]/80">{label}</span>
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
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
      tl.from(".date-label", { opacity: 0, y: 24, duration: 0.9, ease: "power2.out" })
        .from(".date-rule", { scaleX: 0, duration: 1.1, ease: "power3.inOut", stagger: 0.1 }, "<0.2")
        .from(".date-day .date-char", { yPercent: 115, rotationX: -60, duration: 1.2, ease: "expo.out", stagger: 0.14 }, "<0.3")
        .from(".date-side .date-char", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.04 }, "<0.15")
        .from(".date-time", { opacity: 0, y: 16, scale: 0.9, duration: 0.9, ease: "back.out(1.5)" }, "-=0.4")
        .from(".date-countdown", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.2")
        .fromTo(".date-sweep", { xPercent: -120, opacity: 1 }, { xPercent: 340, duration: 1.8, ease: "power2.inOut" }, "-=0.6")
        .set(".date-sweep", { opacity: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="date-heading" className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* Background decorations */}
      <StarField opacity={0.6} />
      <SoftGlow className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(60,10,100,0.35)" size={550} />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 id="date-heading" className="date-label font-royal text-[10px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.55em] text-[#ffd060]">
          ✦&nbsp; SAVE THE DATE &nbsp;✦
        </h2>
        <p className="sr-only">
          {EVENT.weekday}, {EVENT.day} {EVENT.month} {EVENT.year} at {EVENT.time}
        </p>

        <div className="relative mt-6 sm:mt-8 overflow-hidden" aria-hidden="true">
          <div className="date-sweep pointer-events-none opacity-0 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)] absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#ffd060]/50 to-transparent" />

          {/* Month label with neon glow */}
          <Chars
            text={EVENT.month}
            className="date-side font-royal text-[clamp(1.1rem,3.8vw,1.9rem)] font-bold tracking-[0.25em] sm:tracking-[0.42em] neon-rose"
          />

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-10">
            <div className="flex flex-col items-end gap-2">
              <span className="date-rule block h-px w-full origin-right" style={{ background: "linear-gradient(to left, #ffd060, rgba(255,208,96,0.2))" }} />
              <Chars text={EVENT.weekday} className="date-side font-royal text-[clamp(0.72rem,2.5vw,1.2rem)] tracking-[0.18em] sm:tracking-[0.32em] text-[#e8d8f0] font-bold" />
              <span className="date-rule block h-px w-full origin-right" style={{ background: "linear-gradient(to left, #ffd060, rgba(255,208,96,0.2))" }} />
            </div>

            {/* Giant animated day number */}
            <div className="relative">
              <Chars
                text={EVENT.day}
                className="date-day gold-text gold-sweep font-serif text-[clamp(5.5rem,22vw,10rem)] font-bold leading-[0.9]"
              />
              {/* underline glow */}
              <div className="mt-1 h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-[#ffd060] to-transparent" style={{ boxShadow: "0 0 12px rgba(255,208,96,0.7)" }} />
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="date-rule block h-px w-full origin-left" style={{ background: "linear-gradient(to right, #ffd060, rgba(255,208,96,0.2))" }} />
              <Chars text={EVENT.year} className="date-side font-royal text-[clamp(0.72rem,2.5vw,1.2rem)] tracking-[0.18em] sm:tracking-[0.32em] text-[#e8d8f0] font-bold" />
              <span className="date-rule block h-px w-full origin-left" style={{ background: "linear-gradient(to right, #ffd060, rgba(255,208,96,0.2))" }} />
            </div>
          </div>
        </div>

        {/* Time pill */}
        <div className="date-time mt-10 inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-royal text-xs sm:text-sm tracking-[0.28em] text-[#ffd060]"
          style={{
            background: "linear-gradient(135deg, rgba(255,208,96,0.12) 0%, rgba(120,10,100,0.35) 50%, rgba(255,208,96,0.12) 100%)",
            border: "1px solid rgba(255,208,96,0.6)",
            boxShadow: "0 0 24px rgba(255,208,96,0.18), inset 0 1px 0 rgba(255,208,96,0.15)",
          }}
        >
          <Clock className="h-4 w-4 text-[#ffd060]" aria-hidden="true" />
          {EVENT.time}
        </div>

        {/* Live countdown */}
        <div className="date-countdown">
          <Countdown targetISO={EVENT.dateISO} />
        </div>

        <div className="mt-14 flex justify-center text-[#ffd060]">
          <Divider />
        </div>
      </div>
    </section>
  );
}
