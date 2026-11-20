"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Copy, ExternalLink, MapPin, Navigation } from "lucide-react";
import { VENUE } from "@/lib/invitation";
import { prefersReducedMotion } from "@/lib/animations";
import LocationQRCode from "./LocationQRCode";
import { Divider, Sparkle } from "./Ornaments";
import { Reveal, RevealItem } from "./Reveal";
import { StarField, SoftGlow } from "./Decorations";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function VenueSection() {
  const card = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  useEffect(() => {
    if (!card.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(card.current, {
        opacity: 0,
        y: 80,
        rotateX: 10,
        transformPerspective: 1100,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: card.current, start: "top 82%", once: true },
        onComplete: () => {
          if (card.current) {
            card.current.style.boxShadow =
              "0 0 0 1px rgba(255,208,96,0.4), 0 30px 70px -20px rgba(0,0,0,0.9), 0 0 50px rgba(255,86,128,0.12), 0 0 100px rgba(120,10,100,0.12)";
          }
        },
      });
      gsap.fromTo(
        ".venue-sweep",
        { xPercent: -150, opacity: 1 },
        {
          xPercent: 460,
          onComplete: () => gsap.set(".venue-sweep", { opacity: 0 }),
          duration: 2.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: card.current, start: "top 60%", once: true },
        },
      );
    }, card);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (copied === "idle") return;
    const t = setTimeout(() => setCopied("idle"), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <section aria-labelledby="venue-heading" className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* Background decorations */}
      <StarField opacity={0.5} />
      <SoftGlow className="pointer-events-none absolute -left-24 top-1/3" color="rgba(80,10,110,0.4)" size={380} />
      <SoftGlow className="pointer-events-none absolute -right-20 bottom-1/3" color="rgba(160,80,0,0.3)" size={350} />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <RevealItem>
          <p className="font-royal text-xs font-semibold tracking-[0.5em] text-[#ffd060] sm:text-sm">
            ✦&nbsp; THE DINNER DESTINATION &nbsp;✦
          </p>
        </RevealItem>
        <RevealItem>
          <h2 id="venue-heading" className="mt-4 font-royal text-[clamp(1.7rem,5.5vw,3rem)] font-bold tracking-[0.08em] gold-text gold-sweep">
            ARABIAN MAJLIS LYF
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-4 max-w-md font-serif text-[clamp(1.1rem,2.8vw,1.35rem)] italic leading-relaxed text-[#e8d4c0]">
            An evening filled with delicious food, laughter, and wonderful company.
          </p>
        </RevealItem>
      </Reveal>

      <div
        ref={card}
        className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[10px] p-6 sm:p-10"
        style={{
          background: "linear-gradient(145deg, #130920 0%, #0d0614 55%, #080410 100%)",
          border: "1px solid rgba(255,208,96,0.35)",
          boxShadow: "0 30px 70px -20px rgba(0,0,0,0.9), 0 0 45px rgba(255,208,96,0.08)",
        }}
      >
        <div className="venue-sweep pointer-events-none opacity-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[#ffd060]/40 to-transparent" />

        {/* Inner double frame */}
        <div className="pointer-events-none absolute inset-3 rounded-[7px] border border-[#ffd060]/25" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center gap-2 font-royal text-[11px] tracking-[0.4em] text-[#ffd060] md:justify-start">
              <Sparkle className="text-[#ffd060]" /> VENUE
            </p>

            <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[#fff4e0]" style={{ textShadow: "0 0 20px rgba(255,208,96,0.2)" }}>
              {VENUE.displayName}
            </h3>

            <address className="mt-4 flex items-start justify-center gap-2.5 font-serif text-base sm:text-lg not-italic leading-relaxed text-[#e8d4c0] md:justify-start">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ff5680]" aria-hidden="true" style={{ filter: "drop-shadow(0 0 6px rgba(255,86,128,0.6))" }} />
              <span>
                {VENUE.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </span>
            </address>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
              {/* Get Directions — exact URL */}
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-anim inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-royal text-xs font-bold tracking-[0.22em] text-white"
                style={{
                  background: "linear-gradient(to right, #c0132a, #e11d48, #ff3060, #c0132a)",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 0 24px rgba(225,29,72,0.5), 0 8px 20px rgba(0,0,0,0.5)",
                }}
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                GET DIRECTIONS
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>

              {/* Copy address */}
              <button
                type="button"
                onClick={async () => setCopied((await copyText(VENUE.address)) ? "ok" : "fail")}
                className="btn-gradient-anim inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-royal text-xs font-bold tracking-[0.22em] text-[#ffd060]"
                style={{
                  background: "linear-gradient(to right, rgba(255,208,96,0.12), rgba(120,10,100,0.3), rgba(255,208,96,0.12))",
                  backgroundSize: "200% 100%",
                  border: "1px solid rgba(255,208,96,0.55)",
                  boxShadow: "0 0 18px rgba(255,208,96,0.1)",
                }}
              >
                {copied === "ok" ? (
                  <Check className="h-4 w-4 text-[#34d399]" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4 text-[#ffd060]" aria-hidden="true" />
                )}
                {copied === "ok" ? "COPIED!" : copied === "fail" ? "COPY FAILED" : "COPY ADDRESS"}
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {copied === "ok" ? "Address copied to clipboard" : ""}
            </p>
          </div>

          <LocationQRCode url={VENUE.mapsUrl} />
        </div>
      </div>

      <div className="mt-16 flex justify-center text-[#ffd060]">
        <Divider />
      </div>
    </section>
  );
}
