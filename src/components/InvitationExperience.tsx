"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      <main className="relative z-[1] w-full max-w-full overflow-x-hidden">
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
          /* the golden flash fades away to reveal the letter */
          <motion.div
            key={`flash-${run}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-50 [background:radial-gradient(circle_at_50%_40%,#fffdf6_0%,#fbe9c2_45%,#e8cf98_100%)]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
