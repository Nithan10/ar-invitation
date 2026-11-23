"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { HOST } from "@/lib/invitation";
import { EASE_LUXE } from "@/lib/animations";
import { Reveal, RevealItem } from "./Reveal";
import { StarField, SoftGlow } from "./Decorations";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * Unique Royal Art-Deco Portal Frame for Host Portrait.
 * Features:
 * - Stepped Art-Deco chamfered silhouette
 * - Radiating sunburst crown crest with ruby cabochon jewel
 * - Intricate geometric gold corner filigree brackets
 * - Slender fluted side pillars with diamond studs
 * - Suspended brushed-gold engraved cartouche nameplate with "ARUN R"
 * - Museum-grade glass sheen reflection overlay
 */
function UniqueRoyalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: "min(78vw, 275px)" }}>
      {/* 1. Ambient Golden-Rose Backglow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(255,208,96,0.22) 0%, rgba(225,29,72,0.14) 38%, transparent 68%)",
          transform: "translateZ(0)",
        }}
      />

      {/* 2. Top Sunburst Crest Ornament */}
      <div className="relative flex justify-center" style={{ marginBottom: "-14px", zIndex: 20 }}>
        <div className="relative flex flex-col items-center">
          {/* Gilded sunburst rays */}
          <svg className="h-9 w-36 text-[#ffd060]" viewBox="0 0 144 36" fill="none">
            {/* Rays */}
            <line x1="72" y1="28" x2="72" y2="4" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
            <line x1="72" y1="28" x2="56" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <line x1="72" y1="28" x2="88" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <line x1="72" y1="28" x2="42" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <line x1="72" y1="28" x2="102" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            <line x1="72" y1="28" x2="30" y2="22" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
            <line x1="72" y1="28" x2="114" y2="22" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />

            {/* Winged arched scroll crest */}
            <path
              d="M18 32 C38 22, 54 26, 72 32 C90 26, 106 22, 126 32"
              stroke="url(#crest-gold)"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M32 35 C48 29, 60 31, 72 35 C84 31, 96 29, 112 35"
              stroke="#ffd060"
              strokeWidth="0.8"
              fill="none"
              opacity="0.6"
            />
            {/* Top star sparkle */}
            <polygon points="72,0 74,5 79,7 74,9 72,14 70,9 65,7 70,5" fill="#fff4a0" />

            <defs>
              <linearGradient id="crest-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9a6b10" />
                <stop offset="50%" stopColor="#ffe888" />
                <stop offset="100%" stopColor="#9a6b10" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Ruby Medallion with Diamond Star */}
          <div
            className="relative -mt-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, #f43f5e 0%, #be123c 45%, #881337 75%, #3f0415 100%)",
              boxShadow:
                "0 0 0 2px #ffd060, 0 0 0 4px rgba(10,5,15,0.9), 0 0 16px rgba(244,63,94,0.7), 0 4px 12px rgba(0,0,0,0.8)",
              border: "1px solid rgba(255,240,160,0.7)",
            }}
          >
            <span className="text-[#fff4cc] text-xs leading-none drop-shadow-[0_0_4px_#ffd060]">✦</span>
            {/* Gloss reflection */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.4) 0%, transparent 55%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Main Frame Body */}
      <div
        className="relative rounded-2xl p-[6px]"
        style={{
          background: "linear-gradient(145deg, #442a0a 0%, #ffd060 25%, #8a5812 50%, #ffeaa0 75%, #3a2005 100%)",
          boxShadow:
            "0 25px 60px -10px rgba(0,0,0,0.95), 0 0 40px rgba(255,208,96,0.25), inset 0 0 15px rgba(0,0,0,0.8)",
        }}
      >
        {/* Dark Obsidian Inset Channel */}
        <div
          className="relative rounded-[11px] p-[8px]"
          style={{
            background: "linear-gradient(160deg, #180d24 0%, #0a0410 50%, #150920 100%)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.9), inset 0 -1px 6px rgba(255,208,96,0.2)",
          }}
        >
          {/* Inner Hairline Gold Border */}
          <div
            className="relative overflow-hidden rounded-lg p-[3px]"
            style={{
              background: "linear-gradient(135deg, #c08418 0%, #fff4c0 35%, #8a5810 70%, #ffd060 100%)",
              boxShadow: "0 0 10px rgba(255,208,96,0.3)",
            }}
          >
            {/* 4. Photo Viewport Container */}
            <div
              className="relative overflow-hidden rounded-[6px]"
              style={{
                aspectRatio: "3/3.8",
                background: "#08040d",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.85)",
              }}
            >
              {children}

              {/* Museum glass gloss highlight */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 28%, transparent 55%, rgba(255,208,96,0.06) 100%)",
                }}
              />

              {/* Vignette edge shadows */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: "inset 0 0 24px rgba(10,5,15,0.7), inset 0 0 8px rgba(0,0,0,0.9)",
                }}
              />
            </div>
          </div>

          {/* Art Deco Geometric Corner Brackets (Four Corners) */}
          {/* Top-Left */}
          <svg className="pointer-events-none absolute left-2 top-2 h-7 w-7 text-[#ffd060]" viewBox="0 0 28 28" fill="none">
            <path d="M2 18 V6 C2 3.8 3.8 2 6 2 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 14 V8 C5 6.3 6.3 5 8 5 H14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </svg>
          {/* Top-Right */}
          <svg className="pointer-events-none absolute right-2 top-2 h-7 w-7 text-[#ffd060]" viewBox="0 0 28 28" fill="none" style={{ transform: "scaleX(-1)" }}>
            <path d="M2 18 V6 C2 3.8 3.8 2 6 2 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 14 V8 C5 6.3 6.3 5 8 5 H14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </svg>
          {/* Bottom-Left */}
          <svg className="pointer-events-none absolute bottom-2 left-2 h-7 w-7 text-[#ffd060]" viewBox="0 0 28 28" fill="none" style={{ transform: "scaleY(-1)" }}>
            <path d="M2 18 V6 C2 3.8 3.8 2 6 2 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 14 V8 C5 6.3 6.3 5 8 5 H14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </svg>
          {/* Bottom-Right */}
          <svg className="pointer-events-none absolute bottom-2 right-2 h-7 w-7 text-[#ffd060]" viewBox="0 0 28 28" fill="none" style={{ transform: "scale(-1,-1)" }}>
            <path d="M2 18 V6 C2 3.8 3.8 2 6 2 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 14 V8 C5 6.3 6.3 5 8 5 H14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </svg>

          {/* Left & Right Fluted Diamond Accent Studs */}
          <div className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <div className="h-1.5 w-1.5 rotate-45 rounded-sm bg-[#ffd060] shadow-[0_0_6px_#ffd060]" />
          </div>
          <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <div className="h-1.5 w-1.5 rotate-45 rounded-sm bg-[#ffd060] shadow-[0_0_6px_#ffd060]" />
          </div>
        </div>
      </div>

      {/* 5. Suspended Gilded Cartouche Nameplate */}
      <div className="relative -mt-4 flex justify-center" style={{ zIndex: 20 }}>
        <div
          className="relative flex items-center gap-1.5 sm:gap-2 rounded-full px-4 py-1 sm:px-5 sm:py-1.5 font-royal text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#ffd060]"
          style={{
            background: "linear-gradient(135deg, #1f1105 0%, #2f1c08 50%, #170d04 100%)",
            border: "1.5px solid #ffd060",
            boxShadow:
              "0 0 15px rgba(255,208,96,0.45), 0 8px 18px rgba(0,0,0,0.85), inset 0 1px 3px rgba(255,240,160,0.4)",
          }}
        >
          {/* Left rivet screw */}
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd060] opacity-80 shadow-[0_0_4px_#ffd060]" />
          <span className="text-[#ffd060]">✦</span>
          <span className="font-extrabold tracking-[0.25em] text-[#fff2cc] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            ARUN R
          </span>
          <span className="text-[#ffd060]">✦</span>
          {/* Right rivet screw */}
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd060] opacity-80 shadow-[0_0_4px_#ffd060]" />
        </div>
      </div>
    </div>
  );
}

const photoReveal = {
  initial: { opacity: 0, scale: 1.1, filter: "blur(10px) sepia(0.4)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px) sepia(0.05)" },
  exit: { opacity: 0, scale: 0.95, filter: "blur(6px)", transition: { duration: 0.45 } },
  transition: { duration: 1.6, ease: EASE_LUXE },
};

export default function PhotoUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const accept = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Please choose a JPG, PNG, WebP or GIF image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is larger than 10 MB — please pick a smaller one.");
      return;
    }
    setError(null);
    setUrl(URL.createObjectURL(file));
  }, []);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files?.[0]);
  };

  if (HOST.photoSrc) {
    return (
      <section aria-label="Photo of your host" className="relative overflow-hidden px-4 py-20 sm:py-28">
        {/* Background decorations */}
        <StarField opacity={0.5} />
        <SoftGlow className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(58,8,80,0.45)" size={550} />

        <Reveal className="relative flex flex-col items-center text-center">
          <RevealItem>
            <p className="whitespace-nowrap font-royal text-[10px] sm:text-xs font-semibold tracking-[0.22em] sm:tracking-[0.45em] text-[#ffd060]">
              ✦ &nbsp;AN EXCLUSIVE EVENING&nbsp; ✦
            </p>
          </RevealItem>
          <RevealItem>
            <h2
              className="mb-7 sm:mb-10 mt-2.5 font-royal text-[clamp(1.3rem,4.2vw,2.2rem)] font-bold tracking-[0.06em] gold-text gold-sweep"
            >
              LOOKING FORWARD TO CELEBRATING
            </h2>
          </RevealItem>
          <RevealItem>
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotateY: -12 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.6, ease: EASE_LUXE }}
            >
              <UniqueRoyalFrame>
                <Image
                  src={HOST.photoSrc}
                  alt={HOST.photoAlt}
                  fill
                  sizes="(max-width: 640px) 86vw, 320px"
                  className="object-cover object-top"
                  unoptimized
                  priority
                />
              </UniqueRoyalFrame>
            </motion.div>
          </RevealItem>

          {/* Elegant quote below frame (no redundant name repetitions) */}
          <RevealItem>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div
                className="h-px w-36"
                style={{
                  background: "linear-gradient(to right, transparent, #ffd060, transparent)",
                  boxShadow: "0 0 10px rgba(255,208,96,0.35)",
                }}
              />
              <p className="font-serif text-sm sm:text-base italic text-[#e8d4c0]/85">
                Honored to celebrate this evening with you
              </p>
            </div>
          </RevealItem>
        </Reveal>
      </section>
    );
  }

  return (
    <section aria-labelledby="photo-heading" className="px-4 py-14">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
        <RevealItem>
          <h2 id="photo-heading" className="font-royal text-xs font-semibold tracking-[0.5em] text-[#ffd060] sm:text-sm">
            A PORTRAIT FOR THE EVENING
          </h2>
        </RevealItem>

        <AnimatePresence mode="wait">
          {url ? (
            <motion.div key={url} {...photoReveal} className="mt-10">
              <UniqueRoyalFrame>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="Uploaded portrait preview" className="h-full w-full object-cover object-top" />
              </UniqueRoyalFrame>
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => input.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-[#ffd060]/60 bg-[#ffd060]/10 px-5 py-2 font-royal text-[11px] font-semibold tracking-[0.2em] text-[#ffd060] transition hover:bg-[#ffd060]/20"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> CHANGE
                </button>
                <button
                  type="button"
                  onClick={() => setUrl(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#ff5680]/50 bg-[#ff5680]/10 px-5 py-2 font-royal text-[11px] font-semibold tracking-[0.2em] text-[#ff5680] transition hover:bg-[#ff5680]/20"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> REMOVE
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: EASE_LUXE }}
              className="mt-8 w-full max-w-sm"
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => input.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
                className={`group flex cursor-pointer flex-col items-center rounded-[10px] border-2 border-dashed p-8 transition ${
                  dragging
                    ? "border-[#ffd060] bg-[#ffd060]/12 scale-[1.02]"
                    : "border-[#ffd060]/40 bg-[#120a1e] hover:border-[#ffd060] hover:bg-[#ffd060]/8"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ffd060]/60 bg-[#ffd060]/12 text-[#ffd060] transition group-hover:scale-110">
                  <ImagePlus className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-4 font-royal text-xs font-bold tracking-[0.28em] text-[#ffd060]">ADD YOUR PHOTO</p>
                <p className="mt-1 font-serif text-sm italic text-[#e8d4c0]/80">Tap to browse or drop an image</p>
                <p className="mt-2 text-[10px] tracking-wider text-[#ffd060]/60">Stays in your browser only</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={input}
          type="file"
          accept={ACCEPTED.join(",")}
          className="sr-only"
          onChange={(e) => accept(e.target.files?.[0])}
        />
        {error && (
          <p role="alert" className="mt-4 font-serif text-sm text-[#ff5680]">{error}</p>
        )}
      </Reveal>
    </section>
  );
}
