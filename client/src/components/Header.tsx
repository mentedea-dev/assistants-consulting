/*
 * PENTAGRAM CRAFT: Header
 * - Scroll-aware: transparent on top, solid with shadow on scroll
 * - Wordmark with inflection dot
 * - Nav links with animated underline on hover
 * - Mobile: full-screen overlay with staggered animation
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/clientes", label: "Clientes" },
  { href: "/insights", label: "Insights" },
  { href: "/contato", label: "Contato" },
];

function Wordmark({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "dark" ? "text-navy" : "text-white";
  return (
    <Link href="/" className="select-none group">
      <span className={`text-base md:text-lg font-semibold tracking-[0.18em] uppercase ${textColor} transition-colors duration-300`}>
        <span className="relative inline-block">
          A
          <span
            className="absolute w-[5px] h-[5px] rounded-full bg-orange group-hover:scale-150 transition-transform duration-300"
            style={{ top: '38%', left: '48%', transform: 'translate(-50%, -50%)' }}
          />
        </span>
        SSISTANTS
      </span>
    </Link>
  );
}

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if we're on the homepage (hero has dark bg)
  const isHome = location === "/";
  const headerBg = scrolled
    ? "bg-linen/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(11,25,41,0.06)]"
    : isHome
    ? "bg-transparent"
    : "bg-linen/80 backdrop-blur-md";

  const navColor = scrolled || !isHome ? "text-steel" : "text-white/70";
  const navActiveColor = scrolled || !isHome ? "text-navy" : "text-white";
  const wordmarkVariant = scrolled || !isHome ? "dark" : "light";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container flex items-center justify-between h-18 md:h-22">
          <Wordmark variant={wordmarkVariant} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors duration-300 py-1 ${
                  location === link.href ? navActiveColor : navColor
                } hover:${navActiveColor}`}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-orange"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled || !isHome ? "text-navy" : "text-white"}`}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-linen md:hidden"
          >
            <nav className="flex flex-col items-start pt-28 px-8">
              {navLinks.map((link, i) => (
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
                    className={`block py-4 text-3xl font-serif font-medium border-b border-navy/5 ${
                      location === link.href ? "text-navy" : "text-steel"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Contact info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12"
              >
                <p className="text-xs uppercase tracking-widest text-steel-light mb-3">Contato</p>
                <a href="mailto:contato@assistants.com.br" className="text-sm text-navy">
                  contato@assistants.com.br
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
