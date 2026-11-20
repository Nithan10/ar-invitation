"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnvelopeLanding from "./EnvelopeLanding";
import InvitationLetter from "./InvitationLetter";
import DateReveal from "./DateReveal";
import VenueSection from "./VenueSection";
import PhotoUpload from "./PhotoUpload";
import ClosingNote from "./ClosingNote";
import FinalFooter from "./FinalFooter";

type Stage = "sealed" | "revealed";

export default function InvitationExperience() {
  const [stage, setStage] = useState<Stage>("sealed");
  const [run, setRun] = useState(0);

  // No scrolling while the envelope is sealed
  useEffect(() => {
    document.body.classList.toggle("locked", stage === "sealed");
    if (stage === "sealed") {
      window.scrollTo({ top: 0 });
    } else {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => document.body.classList.remove("locked");
  }, [stage]);

  const handleOpened = useCallback(() => setStage("revealed"), []);
  const restart = useCallback(() => {
    setRun((r) => r + 1);
    setStage("sealed");
  }, []);

  return (
    <>
      <div className="vignette" aria-hidden="true" />
      <main className="relative z-[1]">
        {stage === "sealed" ? (
          <EnvelopeLanding key={run} onOpened={handleOpened} />
        ) : (
          <div key={`open-${run}`}>
            <InvitationLetter />
            <DateReveal />
            <VenueSection />
            <PhotoUpload />
            <ClosingNote />
            <FinalFooter onRestart={restart} />
          </div>
        )}
      </main>

      <AnimatePresence>
        {stage === "revealed" && (
          <>
            {/* the golden flash fades away to reveal the letter */}
            <motion.div
              key={`flash-${run}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="pointer-events-none fixed inset-0 z-50 [background:radial-gradient(circle_at_50%_40%,#fffdf6_0%,#fbe9c2_45%,#e8cf98_100%)]"
            />
            <motion.button
              key="restart"
              type="button"
              onClick={restart}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 2.2 } }}
              exit={{ opacity: 0 }}
              aria-label="Reseal the envelope and replay the invitation"
              title="Replay the invitation"
              className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-[#160d15]/80 text-[#ffd778] shadow-lg backdrop-blur transition hover:bg-[#251422] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
