import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  distance?: number;
  duration?: number;
}

const directionMap = (distance: number) => ({
  up: { y: distance, x: 0 },
  down: { y: -distance, x: 0 },
  left: { x: distance, y: 0 },
  right: { x: -distance, y: 0 },
  none: { x: 0, y: 0 },
});

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  distance = 30,
  duration = 0.7,
}: FadeInProps) {
  const offset = directionMap(distance)[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
