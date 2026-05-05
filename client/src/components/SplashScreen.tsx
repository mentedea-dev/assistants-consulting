/*
 * SplashScreen — The "A" as the absolute first impression
 * Inspired by: Netflix "N" intro, Accenture ">" reveal, Apple logo boot
 * 
 * The splash shows the geometric "A" drawing itself on screen,
 * then the dot appears with a satisfying spring, followed by
 * "ssistants" text sliding in and "CONSULTING" fading below.
 * The whole thing scales down and fades to reveal the site.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const A_PATH_FILL =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 Z M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0 Z";

/* Stroke path without bottom horizontal line */
const A_PATH_STROKE =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "dot" | "text" | "exit">("draw");

  useEffect(() => {
    // After draw completes, show dot
    const dotTimer = setTimeout(() => setPhase("dot"), 1400);
    // After dot, show text
    const textTimer = setTimeout(() => setPhase("text"), 2000);
    // After text, start exit
    const exitTimer = setTimeout(() => setPhase("exit"), 3200);
    // Complete and unmount
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(dotTimer);
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 0.92 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={phase === "exit" ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : undefined}
        onAnimationComplete={() => {
          if (phase === "exit") onComplete();
        }}
      >
        {/* Radial glow behind the A */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(230,126,34,0.08) 0%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Main content — A + text lockup */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* The A — large and centered */}
          <motion.svg
            viewBox="0 0 605.7 600"
            className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              phase === "exit"
                ? { scale: 1.3, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === "exit"
                ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.6, ease: "easeOut" }
            }
          >
            <g transform="translate(50, 50)">
              {/* Stroke draw animation */}
              <motion.path
                d={A_PATH_STROKE}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="6"
                transform="translate(0, 500.00) scale(0.354862, -0.354862)"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              {/* Fill appears after stroke */}
              <motion.path
                d={A_PATH_FILL}
                fill="#FFFFFF"
                transform="translate(0, 500.00) scale(0.354862, -0.354862)"
                fillRule="evenodd"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "draw" ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* The inflection dot — appears with spring */}
              <motion.circle
                cx="262.4"
                cy="315.5"
                r="40"
                fill="#E67E22"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  phase !== "draw"
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                }}
              />

              {/* Dot ripple effect */}
              {phase !== "draw" && (
                <motion.circle
                  cx="262.4"
                  cy="315.5"
                  r="40"
                  fill="none"
                  stroke="#E67E22"
                  strokeWidth="3"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              )}
            </g>
          </motion.svg>

          {/* Text: "ssistants" + "CONSULTING" */}
          <motion.div
            className="flex flex-col leading-none"
            initial={{ opacity: 0, x: -20 }}
            animate={
              phase === "text" || phase === "exit"
                ? { opacity: phase === "exit" ? 0 : 1, x: 0 }
                : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[32px] md:text-[48px] lg:text-[56px] font-bold tracking-[0.08em] uppercase text-white"
              style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", letterSpacing: "0.08em" }}
            >
              ssistants
            </span>
            <motion.span
              className="text-[10px] md:text-[13px] lg:text-[15px] font-semibold tracking-[0.35em] uppercase mt-[4px] text-white/70"
              style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 5 }}
              animate={
                phase === "text" || phase === "exit"
                  ? { opacity: phase === "exit" ? 0 : 1, y: 0 }
                  : { opacity: 0, y: 5 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CONSULTING
            </motion.span>
          </motion.div>
        </div>

        {/* Tagline appears after text */}
        <motion.p
          className="mt-10 md:mt-12 text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={
            phase === "text"
              ? { opacity: 1, y: 0 }
              : phase === "exit"
              ? { opacity: 0, y: -10 }
              : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Clareza para decidir
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
