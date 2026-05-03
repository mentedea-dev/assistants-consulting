/*
 * BrandSymbol — The iconic "A" with inflection dot
 * Used as brand mark throughout the site.
 * The "A" is a geometric sans-serif letter with an orange dot
 * replacing the crossbar — the "inflection point" of the brand.
 */
import { motion } from "framer-motion";

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
}

export default function BrandSymbol({
  variant = "dark",
  className = "w-16 h-16",
  animate = false,
  dotOnly = false,
  dotColor,
}: BrandSymbolProps) {
  const letterColor = variant === "dark" ? "#0B1929" : "#FFFFFF";
  const dot = dotColor || "#E67E22";

  if (dotOnly) {
    return (
      <motion.div
        className={`rounded-full ${className}`}
        style={{ backgroundColor: dot }}
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={animate ? { type: "spring", stiffness: 300, damping: 15, delay: 0.3 } : undefined}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 605.7 600"
      className={className}
      aria-label="Assistants"
      role="img"
    >
      <g transform="translate(50, 50)">
        <path
          d="M 51 0 L 565 1409 L 913 1409 L 1425 0 Z M 346 0 L 537 582 L 676 987 Q 688 1022 711 1093 Q 728 1151 739 1192 Q 740 1190 751 1152 Q 768 1093 791 1022 L 803 987 L 942 582 L 1133 0 Z"
          fill={letterColor}
          transform="translate(0, 500.00) scale(0.354862, -0.354862)"
          fillRule="evenodd"
        />
        {animate ? (
          <motion.circle
            cx="262.4"
            cy="315.5"
            r="40"
            fill={dot}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.8 }}
          />
        ) : (
          <circle cx="262.4" cy="315.5" r="40" fill={dot} />
        )}
      </g>
    </svg>
  );
}
