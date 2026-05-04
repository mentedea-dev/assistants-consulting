/*
 * BrandSymbol — The iconic "A" with inflection dot
 * Used as brand mark throughout the site.
 * The "A" is a geometric sans-serif letter with an orange dot
 * replacing the crossbar — the "inflection point" of the brand.
 *
 * Animations:
 * - hover: glow + scale + dot orbit
 * - draw: SVG path draw-on reveal when entering viewport
 * - pulse: subtle dot breathing animation
 * - interactive: full hover response with glow filter
 */
import { motion, useReducedMotion } from "framer-motion";

interface BrandSymbolProps {
  /** "dark" = navy A on transparent, "light" = white A on transparent */
  variant?: "dark" | "light";
  /** CSS class for sizing (use w-* h-* or text-based sizing) */
  className?: string;
  /** Whether to animate the dot on mount */
  animate?: boolean;
  /** Whether to show only the dot (for decorative use) */
  dotOnly?: boolean;
  /** Custom dot color override */
  dotColor?: string;
  /** Enable interactive hover effects (glow, scale, dot orbit) */
  interactive?: boolean;
  /** Enable SVG draw-on reveal animation when entering viewport */
  drawReveal?: boolean;
  /** Enable subtle dot pulse/breathing animation */
  dotPulse?: boolean;
}

/* ─── The "A" letter path (geometric sans-serif) ─── */
const A_PATH =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 Z M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0 Z";

/* Stroke-only path without bottom horizontal line — prevents "underline" artifact */
const A_PATH_STROKE =
  "M 51 0 L 565 1409 L 913 1409 L 1425 0 M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0";

export default function BrandSymbol({
  variant = "dark",
  className = "w-16 h-16",
  animate = false,
  dotOnly = false,
  dotColor,
  interactive = false,
  drawReveal = false,
  dotPulse = false,
}: BrandSymbolProps) {
  const letterColor = variant === "dark" ? "#0B1929" : "#FFFFFF";
  const dot = dotColor || "#E67E22";
  const prefersReducedMotion = useReducedMotion();

  /* ─── Dot-only mode (decorative circles) ─── */
  if (dotOnly) {
    return (
      <motion.div
        className={`rounded-full ${className}`}
        style={{ backgroundColor: dot }}
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={
          animate
            ? { type: "spring", stiffness: 300, damping: 15, delay: 0.3 }
            : undefined
        }
      />
    );
  }

  /* ─── Determine glow color based on variant ─── */
  const glowColor = variant === "dark" ? "rgba(230,126,34,0.35)" : "rgba(230,126,34,0.25)";

  /* ─── Draw reveal animation variants ─── */
  const letterVariants = drawReveal && !prefersReducedMotion
    ? {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: 1.8, ease: "easeInOut" as const },
            opacity: { duration: 0.3 },
          },
        },
      }
    : undefined;

  const dotVariants = drawReveal && !prefersReducedMotion
    ? {
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 15,
            delay: 1.2,
          },
        },
      }
    : animate && !prefersReducedMotion
      ? {
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring" as const,
              stiffness: 300,
              damping: 15,
              delay: 0.8,
            },
          },
        }
      : undefined;

  /* ─── Dot pulse (breathing) animation ─── */
  const dotPulseAnimation =
    dotPulse && !prefersReducedMotion
      ? {
          scale: [1, 1.15, 1],
          opacity: [1, 0.8, 1],
        }
      : undefined;

  const dotPulseTransition =
    dotPulse && !prefersReducedMotion
      ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }
      : undefined;

  /* ─── Interactive wrapper (hover effects) ─── */
  const Wrapper = interactive ? motion.div : "div";
  const wrapperProps = interactive && !prefersReducedMotion
    ? {
        className: `inline-block cursor-pointer ${className}`,
        whileHover: { scale: 1.08 },
        whileTap: { scale: 0.96 },
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }
    : { className: `inline-block ${className}` };

  /* ─── SVG content ─── */
  const svgContent = (
    <motion.svg
      viewBox="0 0 605.7 600"
      className={interactive ? "w-full h-full" : className}
      aria-label="Assistants"
      role="img"
      initial={drawReveal ? "hidden" : undefined}
      whileInView={drawReveal ? "visible" : undefined}
      viewport={{ once: true, amount: 0.3 }}
      style={interactive ? { filter: "drop-shadow(0 0 0px transparent)" } : undefined}
      whileHover={
        interactive && !prefersReducedMotion
          ? {
              filter: `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor})`,
            }
          : undefined
      }
    >
      {/* Glow filter definition for interactive mode */}
      {interactive && (
        <defs>
          <filter id="brand-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      <g transform="translate(50, 50)">
        {/* The "A" letter */}
        {drawReveal && !prefersReducedMotion ? (
          <>
            {/* Fill version (appears after stroke draws) */}
            <motion.path
              d={A_PATH}
              fill={letterColor}
              transform="translate(0, 500.00) scale(0.354862, -0.354862)"
              fillRule="evenodd"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1.0 },
                },
              }}
            />
            {/* Stroke version (draws on) — uses open path to avoid bottom line */}
            <motion.path
              d={A_PATH_STROKE}
              fill="none"
              stroke={letterColor}
              strokeWidth="8"
              transform="translate(0, 500.00) scale(0.354862, -0.354862)"
              variants={letterVariants}
            />
          </>
        ) : (
          <path
            d={A_PATH}
            fill={letterColor}
            transform="translate(0, 500.00) scale(0.354862, -0.354862)"
            fillRule="evenodd"
          />
        )}

        {/* The inflection dot */}
        <motion.circle
          cx="262.4"
          cy="315.5"
          r="40"
          fill={dot}
          variants={dotVariants}
          initial={dotVariants ? "hidden" : undefined}
          animate={
            dotPulseAnimation
              ? dotVariants
                ? undefined
                : dotPulseAnimation
              : dotVariants
                ? undefined
                : undefined
          }
          whileInView={dotVariants ? "visible" : undefined}
          viewport={{ once: true }}
          transition={dotPulseTransition}
          /* Interactive hover: dot orbits slightly */
          whileHover={
            interactive && !prefersReducedMotion
              ? {
                  scale: 1.3,
                  y: -5,
                  transition: { type: "spring", stiffness: 500, damping: 15 },
                }
              : undefined
          }
        />

        {/* Dot pulse overlay (additive glow ring) */}
        {dotPulse && !prefersReducedMotion && (
          <motion.circle
            cx="262.4"
            cy="315.5"
            r="40"
            fill="none"
            stroke={dot}
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 1.8, 2.2],
              opacity: [0.6, 0.15, 0],
              strokeWidth: [2, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </g>
    </motion.svg>
  );

  /* ─── Return with or without interactive wrapper ─── */
  if (interactive) {
    return <Wrapper {...(wrapperProps as any)}>{svgContent}</Wrapper>;
  }

  return svgContent;
}
