/*
 * PENTAGRAM CRAFT: Header
 * - Brand symbol "A" (large) + "ssistants" (smaller) + "CONSULTING" below
 * - Scroll-aware: transparent on top, solid with shadow on scroll
 * - Language toggle (PT/EN)
 * - Mobile: full-screen overlay with staggered animation
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import BrandSymbol from "./BrandSymbol";

const navKeys = [
  { href: "/", key: "nav.home" },
  { href: "/servicos", key: "nav.services" },
  { href: "/sobre", key: "nav.about" },
  { href: "/clientes", key: "nav.clients" },
  { href: "/insights", key: "nav.insights" },
  { href: "/contato", key: "nav.contact" },
];

function Wordmark({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "dark" ? "text-navy" : "text-white";
  const subtitleColor = variant === "dark" ? "text-navy/60" : "text-white/70";
  return (
    <Link href="/" className="select-none group flex items-center gap-2.5">
      {/* The "A" — large brand symbol */}
      <BrandSymbol
        variant={variant}
        className="w-12 h-12 md:w-[56px] md:h-[56px]"
        interactive
        dotPulse
      />
      {/* "Assistants" full wordmark + "CONSULTING" below */}
      <div className="flex flex-col leading-none">
        <span
          className={`text-[20px] md:text-[26px] font-bold tracking-[0.08em] uppercase ${textColor} transition-opacity duration-300 group-hover:opacity-80`}
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", letterSpacing: "0.08em" }}
        >
          Assistants
        </span>
        <span
          className={`text-[9px] md:text-[11px] font-semibold tracking-[0.35em] uppercase mt-[3px] ${subtitleColor} transition-opacity duration-300 group-hover:opacity-80`}
          style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
        >
          CONSULTING
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const headerBg = scrolled
    ? "bg-linen/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(11,25,41,0.06)]"
    : isHome
    ? "bg-transparent"
    : "bg-linen/80 backdrop-blur-md";

  const navColor = scrolled || !isHome ? "text-steel" : "text-white/80";
  const navActiveColor = scrolled || !isHome ? "text-navy" : "text-white";
  const navHoverColor = scrolled || !isHome ? "hover:text-navy" : "hover:text-white";
  const navUnderlineColor = scrolled || !isHome ? "bg-navy" : "bg-white";
  const wordmarkVariant = scrolled || !isHome ? "dark" : "light";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container flex items-center justify-between h-20 md:h-24">
          <Wordmark variant={wordmarkVariant} />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 py-1 ${
                  location === link.href ? navActiveColor : navColor
                } ${navHoverColor}`}
              >
                {t(link.key)}
                {location === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute -bottom-0.5 left-0 right-0 h-[2px] ${navUnderlineColor}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <LanguageToggle />
          </nav>

          {/* Mobile/Tablet menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled || !isHome ? "text-navy" : "text-white"}`}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile/Tablet nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-linen lg:hidden"
          >
            <nav className="flex flex-col items-start pt-28 px-8">
              {navKeys.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 text-3xl font-serif font-normal border-b border-navy/5 ${
                      location === link.href ? "text-navy" : "text-steel"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle in mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 flex items-center gap-3"
              >
                <span className="text-xs uppercase tracking-widest text-steel">Idioma</span>
                <LanguageToggle className="[&_button]:!text-navy [&_button]:!text-sm" />
              </motion.div>

              {/* Contact info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <p className="text-xs uppercase tracking-widest text-steel mb-3">{t("nav.contact")}</p>
                <a href="mailto:relacionamento@assistants.com.br" className="text-sm text-navy">
                  relacionamento@assistants.com.br
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
