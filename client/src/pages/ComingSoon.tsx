/**
 * Coming Soon — Página temporária de modernização
 * Exibe a mensagem "A Assistants está se modernizando e preparando um novo site. Aguarde!"
 * Usa a wordmark oficial (ASSISTANTS + CONSULTING) como imagem SVG.
 */
import { motion } from "framer-motion";

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
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Official Wordmark SVG (ASSISTANTS + CONSULTING) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="/brand/wordmark-inverted.svg"
            alt="Assistants Consulting"
            className="w-[320px] md:w-[480px] lg:w-[580px] h-auto"
          />
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-16 h-px bg-[#E67E22] mt-12 mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Main message */}
        <motion.h1
          className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Em breve, uma nova{" "}
          <span className="text-[#E67E22] font-medium italic">experiência digital</span>.
        </motion.h1>

        <motion.p
          className="text-white/50 text-lg md:text-xl mt-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          A new digital experience, coming soon.
        </motion.p>

        {/* Animated dots loader */}
        <motion.div
          className="flex items-center gap-2 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
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
          className="mt-16 text-white text-lg md:text-xl lg:text-2xl tracking-wide font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <p>relacionamento@assistants.com.br</p>
          <p className="mt-2">+55 11 3335-3366</p>
        </motion.div>
      </div>
    </div>
  );
}
