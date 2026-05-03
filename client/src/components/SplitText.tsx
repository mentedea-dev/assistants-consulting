/**
 * SplitText — Editorial text reveal animation (Pentagram-style)
 * 
 * Splits text into WORDS and animates them sequentially
 * with a staggered fade-in + slight vertical movement + blur.
 * Words stay together — no orphan letters on line breaks.
 * 
 * Respects prefers-reduced-motion for accessibility.
 * Only triggers when element enters viewport (IntersectionObserver via Framer Motion).
 */
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration per word (seconds) */
  charDuration?: number;
  /** Stagger between words (seconds) */
  stagger?: number;
  /** Vertical offset for each word (px) */
  yOffset?: number;
  /** HTML tag to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Additional content after animated text (e.g., inflection dot) */
  suffix?: ReactNode;
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  charDuration = 0.45,
  stagger = 0.07,
  yOffset = 16,
  as: Tag = "h1",
  suffix,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {children}
        {suffix}
      </Tag>
    );
  }

  // Split text into lines (by \n) then into words
  const lines = children.split("\n");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: charDuration,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  // Use MotionTag for the container
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(" ").map((word, wordIndex, arr) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              variants={wordVariants}
              className="inline-block"
            >
              {word}{wordIndex < arr.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
          {lineIndex === lines.length - 1 && suffix}
        </span>
      ))}
    </MotionTag>
  );
}
