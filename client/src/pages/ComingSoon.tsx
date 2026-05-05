/**
 * Coming Soon — Página temporária de modernização
 * Exibe a mensagem "A Assistants está se modernizando e preparando um novo site. Aguarde!"
 * com animação elegante e identidade visual da marca.
 *
 * Layout: Símbolo "A" (grande, destacado) → "Assistants" (wordmark completa) → "CONSULTING"
 */
import { motion } from "framer-motion";
import BrandSymbol from "@/components/BrandSymbol";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#0B1929] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Large A watermark in background */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <BrandSymbol variant="light" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" />
        </motion.div>
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#E67E22]/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#E67E22]/3 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Brand Symbol "A" — destacado, grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BrandSymbol
            variant="light"
            className="w-28 h-28 md:w-36 md:h-36"
            drawReveal
            dotPulse
          />
        </motion.div>

        {/* Wordmark completa: "Assistants" */}
        <motion.h2
          className="mt-5 text-white text-2xl md:text-3xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Assistants
        </motion.h2>

        {/* CONSULTING */}
        <motion.span
          className="text-white/60 text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase mt-1.5 block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          CONSULTING
        </motion.span>

        {/* Divider line */}
        <motion.div
          className="w-16 h-px bg-[#E67E22] mt-10 mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        />

        {/* Main message */}
        <motion.h1
          className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          A <span className="font-semibold">Assistants</span> está se modernizando
          <br className="hidden sm:block" /> e preparando um{" "}
          <span className="text-[#E67E22] font-medium">novo site</span>.
        </motion.h1>

        <motion.p
          className="text-white/50 text-lg md:text-xl mt-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.0 }}
        >
          Aguarde!
        </motion.p>

        {/* Animated dots loader */}
        <motion.div
          className="flex items-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#E67E22]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="mt-16 text-white/30 text-xs tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0 }}
        >
          <p>relacionamento@assistants.com.br</p>
          <p className="mt-1">+55 11 3335-3366</p>
        </motion.div>
      </div>
    </div>
  );
}
