"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./animations";

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

  useEffect(() => () => void tlRef.current?.kill(), []);

  const open = useCallback(() => {
    const root = scope.current;
    if (!root || opening) return;
    setOpening(true);
    const q = gsap.utils.selector(root);

    if (prefersReducedMotion()) {
      tlRef.current = gsap
        .timeline({ onComplete: onOpened })
        .to(q(".env-seal, .env-flap"), { opacity: 0, duration: 0.2 })
        .to(flash.current, { opacity: 1, duration: 0.25 });
      return;
    }

    const stageH = root.querySelector<HTMLElement>(".env-stage")?.offsetHeight ?? 400;
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: onOpened });
    tlRef.current = tl;

    tl
      // 1. pressure on the seal, then the crack runs through it
      .to(q(".env-seal"), { scale: 0.93, duration: 0.14, ease: "power1.in" })
      .to(q(".env-seal"), { scale: 1, duration: 0.3, ease: "back.out(3)" })
      .to(q(".seal-crack"), { strokeDashoffset: 0, duration: 0.42, ease: "power1.inOut" }, "<-0.05")
      .to(q(".env-seal"), { x: "+=2", duration: 0.05, repeat: 5, yoyo: true, ease: "none" }, "<0.1")
      .add("break", ">+0.05")
      // 2. wax splits and falls away, fragments scatter
      .to(q(".seal-crack, .seal-shadow"), { opacity: 0, duration: 0.2 }, "break")
      .to(q(".seal-left"), { x: -55, y: 120, rotation: -38, opacity: 0, duration: 1, ease: "power2.in" }, "break")
      .to(q(".seal-right"), { x: 55, y: 135, rotation: 32, opacity: 0, duration: 1, ease: "power2.in" }, "break+=0.04")
      .set(q(".seal-shard"), { opacity: 1 }, "break")
      .to(
        q(".seal-shard"),
        {
          x: (i: number) => (i % 2 ? 1 : -1) * (30 + i * 9),
          y: (i: number) => 60 + i * 18,
          rotation: (i: number) => (i % 2 ? 1 : -1) * 220,
          opacity: 0,
          duration: 0.9,
          ease: "power2.in",
          stagger: 0.03,
        },
        "break",
      )
      .to(q(".seal-sparkle"), { opacity: 0, duration: 0.2 }, "break")
      .set(q(".env-seal"), { pointerEvents: "none" }, "break+=0.9")
      // 3. flap swings open in 3D
      .add("flap", "break+=0.45")
      .to(q(".env-flap"), { rotationX: 180, duration: 1.05, ease: "power2.inOut" }, "flap")
      .to(q(".env-flap-shadow"), { opacity: 0, duration: 0.4 }, "flap")
      .set(q(".env-flap"), { zIndex: 1 }, "flap+=0.53")
      // 4. letter rises out of the envelope; envelope settles down
      .add("rise", "flap+=0.95")
      .to(q(".env-body"), { y: stageH * 0.35, duration: 1.3, ease: "power3.inOut" }, "rise")
      .to(q(".env-letter"), { y: -stageH * 0.62, duration: 1.3, ease: "power3.inOut" }, "rise")
      .to(q(".env-letter"), { scale: 1.06, duration: 0.6, ease: "power2.out" }, "rise+=1.0")
      .to(q(".landing-copy"), { opacity: 0, y: 20, duration: 0.5 }, "rise")
      // 5. warm golden flash
      .to(flash.current, { opacity: 1, duration: 0.65, ease: "power2.in" }, "rise+=1.15");
  }, [scope, flash, onOpened, opening]);

  return { open, opening };
}
