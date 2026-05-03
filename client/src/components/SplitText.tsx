/**
 * SplitText — Editorial text reveal animation (Pentagram-style)
 * 
 * Splits text into individual characters and animates them sequentially
 * with a staggered fade-in + slight vertical movement.
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
  /** Duration per character (seconds) */
  charDuration?: number;
  /** Stagger between characters (seconds) */
  stagger?: number;
  /** Vertical offset for each character (px) */
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
  charDuration = 0.5,
  stagger = 0.025,
  yOffset = 20,
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

  // Split text into lines (by \n or <br>) then into characters
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

  const charVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
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
          {line.split("").map((char, charIndex) => (
            <motion.span
              key={`${lineIndex}-${charIndex}`}
              variants={charVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {lineIndex === lines.length - 1 && suffix}
        </span>
      ))}
    </MotionTag>
  );
}
