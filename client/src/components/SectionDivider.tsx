import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function SectionDivider({ variant = "light", className = "" }: SectionDividerProps) {
  const lineColor = variant === "light" ? "bg-navy/8" : "bg-white/10";
  const dotColor = "bg-orange";

  return (
    <div className={`flex items-center justify-center gap-0 py-2 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-16 ${lineColor} origin-right`}
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`w-[6px] h-[6px] rounded-full ${dotColor} mx-3`}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-px w-16 ${lineColor} origin-left`}
      />
    </div>
  );
}
