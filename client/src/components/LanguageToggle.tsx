import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLocale("pt")}
        className={`text-[11px] font-medium tracking-wide px-2 py-1 transition-all duration-300 relative ${
          locale === "pt"
            ? "text-orange"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        PT
        {locale === "pt" && (
          <motion.div
            layoutId="lang-indicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-orange"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
      <span className="text-white/15 text-[10px]">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`text-[11px] font-medium tracking-wide px-2 py-1 transition-all duration-300 relative ${
          locale === "en"
            ? "text-orange"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        EN
        {locale === "en" && (
          <motion.div
            layoutId="lang-indicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-orange"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
