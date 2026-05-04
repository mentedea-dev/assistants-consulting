/*
 * SplashScreen — The "A" as the absolute first impression
 * Inspired by: Netflix "N" intro, Accenture ">" reveal, Apple logo boot
 * 
 * The splash shows the geometric "A" drawing itself on screen,
 * then the dot appears with a satisfying spring, and the whole
 * thing scales down and fades to reveal the site.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const A_PATH_FILL =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 Z M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0 Z";

/* Stroke path without bottom horizontal line — prevents the "underline" artifact */
const A_PATH_STROKE =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"draw" | "dot" | "exit">("draw");

  useEffect(() => {
    // After draw completes, show dot
    const dotTimer = setTimeout(() => setPhase("dot"), 1400);
    // After dot, start exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    // Complete and unmount
    const completeTimer = setTimeout(() => onComplete(), 3200);

    return () => {
      clearTimeout(dotTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 0.9 } : { opacity: 1 }}
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

        {/* The A — large and centered */}
        <motion.svg
          viewBox="0 0 605.7 600"
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            phase === "exit"
              ? { scale: 1.5, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={
            phase === "exit"
              ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.6, ease: "easeOut" }
          }
        >
          <g transform="translate(50, 50)">
            {/* Stroke draw animation — uses open path to avoid bottom line */}
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

        {/* Tagline appears after dot */}
        <motion.p
          className="absolute bottom-[25%] text-white/40 text-xs md:text-sm tracking-[0.3em] uppercase font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={phase !== "draw" ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Consultoria Atuarial
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
