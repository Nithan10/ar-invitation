import WaxSeal from "./WaxSeal";
import { Sparkle } from "./Ornaments";

type Props = {
  onSealClick: () => void;
  disabled: boolean;
};

const FLAP = "polygon(0 0, 100% 0, 50.6% 100%, 49.4% 100%)";

/**
 * Layered CSS/SVG envelope. Class names (env-*) are animation targets for the
 * opening timeline in useEnvelopeOpening.
 */
export default function Envelope({ onSealClick, disabled }: Props) {
  return (
    <div
      onClick={!disabled ? onSealClick : undefined}
      className={`env-stage relative mx-auto aspect-[3/2] w-[min(92vw,580px,calc((100dvh-260px)*1.5))] min-w-[270px] max-w-[94vw] [perspective:1400px] ${
        !disabled ? "cursor-pointer" : ""
      }`}
    >
      <div className="env-body absolute inset-0">
        {/* ground shadow */}
        <div className="absolute -bottom-6 left-[6%] right-[6%] h-9 rounded-[50%] bg-black/60 blur-xl" />

        {/* back panel / interior */}
        <div className="absolute inset-0 z-[1] overflow-hidden rounded-[8px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85),0_0_35px_rgba(229,193,88,0.15)] ring-1 ring-[#ffd778]/40">
          <div className="paper absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5c1324]/40 via-[#22070e]/20 to-transparent" />
        </div>

        {/* the letter tucked inside */}
        <div className="env-letter absolute z-[2] left-[5%] right-[5%] top-[5%] h-[88%] rounded-[4px] bg-gradient-to-b from-[#fffefb] via-[#f7eedf] to-[#e8d7be] shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-[4%] sm:inset-[5%] flex flex-col items-center justify-start border border-[#b89354] pt-[5%] text-center">
            <div className="absolute inset-[3px] border border-[#d4af37]/40" />
            <p className="font-royal text-[clamp(8px,1.8vw,12px)] font-bold tracking-[0.3em] text-[#846328]">
              YOU ARE CORDIALLY INVITED
            </p>
            <p className="mt-[2%] font-script text-[clamp(20px,5.5vw,42px)] leading-none text-[#982e35]">
              A Night to Remember
            </p>
            <p className="mt-[2%] font-royal text-[clamp(8px,1.6vw,11px)] font-semibold tracking-[0.3em] text-[#523724]">
              27 · XI · MMXXVI
            </p>
          </div>
        </div>

        {/* front pocket: side + bottom flaps */}
        <div className="env-pocket pointer-events-none absolute inset-0 z-[3] [filter:drop-shadow(0_-1px_3px_rgba(0,0,0,0.5))]">
          <div
            className="paper absolute inset-0 rounded-[8px] brightness-[1.04]"
            style={{ clipPath: "polygon(0 0, 51% 56%, 51% 58%, 0 100%)" }}
          />
          <div
            className="paper absolute inset-0 rounded-[8px] brightness-[0.96]"
            style={{ clipPath: "polygon(100% 0, 49% 56%, 49% 58%, 100% 100%)" }}
          />
        </div>
        <div className="env-pocket pointer-events-none absolute inset-0 z-[3] [filter:drop-shadow(0_-2px_4px_rgba(0,0,0,0.6))]">
          <div
            className="paper absolute inset-0 rounded-b-[8px] brightness-[1.08]"
            style={{ clipPath: "polygon(0 100%, 0 99%, 50% 47%, 100% 99%, 100% 100%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-[#ffd778]/15" />
          </div>
          {/* crease lines in rich gold */}
          <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M0 200 L150 94 L300 200" fill="none" stroke="#ffd778" strokeOpacity=".55" strokeWidth="1" />
            <path d="M0 199 L150 95.5 L300 199" fill="none" stroke="#000000" strokeOpacity=".45" strokeWidth="1" />
          </svg>
          <p className="absolute bottom-[7%] left-0 right-0 text-center font-royal text-[clamp(7px,1.6vw,11px)] tracking-[0.45em] text-[#ffd778] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            A PERSONAL INVITATION
          </p>
        </div>

        {/* top flap (3D) */}
        <div className="env-flap absolute inset-x-0 top-0 h-[60%] origin-top [transform-style:preserve-3d]" style={{ zIndex: 4 }}>
          {/* soft shadow cast by the flap */}
          <div className="env-flap-shadow absolute inset-0 translate-y-[3px] blur-[3px] [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-black/55" style={{ clipPath: FLAP }} />
          </div>
          {/* outer face */}
          <div className="paper absolute inset-0 rounded-t-[8px] [backface-visibility:hidden]" style={{ clipPath: FLAP }}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffd778]/25 via-transparent to-black/35" />
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M2 2 L150 118 L298 2" fill="none" stroke="#ffd778" strokeOpacity=".6" strokeWidth="1.2" />
            </svg>
          </div>
          {/* inner face (seen once the flap is open) */}
          <div
            className="paper absolute inset-0 rounded-t-[8px] brightness-[0.85] [backface-visibility:hidden] [transform:rotateX(180deg)]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50.6% 100%, 49.4% 100%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-[#4a101d]/30 to-transparent" />
          </div>
        </div>

        {/* wax seal */}
        <div className="env-seal absolute left-1/2 top-[60%] z-10 aspect-square w-[26%] min-w-[76px] max-w-[125px] -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onSealClick}
            disabled={disabled}
            aria-label="Break the AR wax seal to open your invitation"
            className="seal-button group/seal relative block h-full w-full cursor-pointer rounded-full transition-transform duration-500 ease-out hover:scale-[1.08] active:scale-95 disabled:cursor-default"
          >
            {!disabled && (
              <>
                <span className="seal-ripple" />
                <span className="seal-ripple delay" />
              </>
            )}
            <span className="seal-halo" />
            <span className="block h-full w-full transition-[filter] duration-500 [filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.6))] group-hover/seal:[filter:drop-shadow(0_0_18px_rgba(255,215,120,0.95))_drop-shadow(0_8px_16px_rgba(0,0,0,0.6))]">
              <WaxSeal />
            </span>
          </button>
          <Sparkle className="seal-sparkle pointer-events-none absolute -right-[6%] top-[4%] h-3.5 w-3.5 animate-pulse text-[#ffd778]" />
        </div>
      </div>
    </div>
  );
}
