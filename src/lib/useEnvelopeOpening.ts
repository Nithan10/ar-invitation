"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./animations";
import { unlockAudio, preloadSounds, playSealCrack, playFlapSwish, playFlash } from "./sounds";

/**
 * Coordinates the cinematic opening: seal cracks → wax breaks apart →
 * flap swings open in 3D → letter rises → golden flash → onOpened().
 */
export function useEnvelopeOpening(
  scope: RefObject<HTMLElement | null>,
  flash: RefObject<HTMLElement | null>,
  onOpened: () => void,
) {
  const [opening, setOpening] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  // Sync guard: a tap on the seal also bubbles to the envelope's own click
  // handler and state updates are async, so `opening` alone can't stop a
  // second (doubled) timeline + sound.
  const startedRef = useRef(false);

  useEffect(() => {
    preloadSounds();
    return () => void tlRef.current?.kill();
  }, []);

  const open = useCallback(() => {
    const root = scope.current;
    if (!root || opening || startedRef.current) return;
    startedRef.current = true;
    setOpening(true);
    // Must run synchronously inside the tap for mobile browsers to allow audio
    unlockAudio();
    const q = gsap.utils.selector(root);

    if (prefersReducedMotion()) {
      tlRef.current = gsap
        .timeline({ onComplete: onOpened })
        .call(playSealCrack)
        .to(q(".env-seal, .env-flap"), { opacity: 0, duration: 0.2 })
        .call(playFlash)
        .to(flash.current, { opacity: 1, duration: 0.25 });
      return;
    }

    const stageH = root.querySelector<HTMLElement>(".env-stage")?.offsetHeight ?? 400;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: onOpened });
    tlRef.current = tl;

    tl
      // 1. Quick, responsive pressure & crack (0.2s)
      .to(q(".env-seal"), { scale: 0.94, duration: 0.1, ease: "power1.in" })
      .to(q(".env-seal"), { scale: 1, duration: 0.18, ease: "back.out(2)" })
      .call(playSealCrack, [], "<-0.05")
      .to(q(".seal-crack"), { strokeDashoffset: 0, duration: 0.22, ease: "power1.inOut" }, "<")
      .add("break", "+=0.04")
      // 2. Wax splits and falls away cleanly (0.5s)
      .to(q(".seal-crack, .seal-shadow"), { opacity: 0, duration: 0.15 }, "break")
      .to(q(".seal-left"), { x: -45, y: 80, rotation: -25, opacity: 0, duration: 0.55, ease: "power2.in" }, "break")
      .to(q(".seal-right"), { x: 45, y: 90, rotation: 25, opacity: 0, duration: 0.55, ease: "power2.in" }, "break+=0.02")
      .set(q(".seal-shard"), { opacity: 1 }, "break")
      .to(
        q(".seal-shard"),
        {
          x: (i: number) => (i % 2 ? 1 : -1) * (24 + i * 6),
          y: (i: number) => 40 + i * 12,
          rotation: (i: number) => (i % 2 ? 1 : -1) * 150,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          stagger: 0.02,
        },
        "break",
      )
      .to(q(".seal-sparkle"), { opacity: 0, duration: 0.15 }, "break")
      .set(q(".env-seal"), { pointerEvents: "none" }, "break+=0.3")
      // 3. Flap swings open smoothly in 3D (0.6s)
      .add("flap", "break+=0.15")
      .call(playFlapSwish, [], "flap")
      .to(q(".env-flap"), { rotationX: 180, duration: 0.6, ease: "power2.inOut" }, "flap")
      .to(q(".env-flap-shadow"), { opacity: 0, duration: 0.25 }, "flap")
      .set(q(".env-flap"), { zIndex: 1 }, "flap+=0.3")
      // 4. Letter rises out of envelope (0.7s)
      .add("rise", "flap+=0.3")
      .to(q(".env-body"), { y: stageH * 0.28, duration: 0.7, ease: "power2.out" }, "rise")
      .to(q(".env-letter"), { y: -stageH * 0.55, duration: 0.7, ease: "power2.out" }, "rise")
      .to(q(".landing-copy"), { opacity: 0, y: 14, duration: 0.3 }, "rise")
      // 5. Warm golden flash into reveal
      .call(playFlash, [], "rise+=0.3")
      .to(flash.current, { opacity: 1, duration: 0.4, ease: "power2.in" }, "rise+=0.35");
  }, [scope, flash, onOpened, opening]);

  return { open, opening };
}
