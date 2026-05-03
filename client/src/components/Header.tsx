/*
 * Design: Swiss Precision Meets Data Narrative
 * Header: Sticky, minimal, Abyssal Navy wordmark with Inflection Orange dot on first "A"
 * Navigation: Clean horizontal links, DM Sans 500 weight
 */
import { useState } from "react";
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

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`select-none ${className}`}>
      <span className="text-lg md:text-xl font-semibold tracking-[0.15em] uppercase">
        <span className="relative inline-block">
          A
          <span
            className="absolute w-[5px] h-[5px] rounded-full bg-orange"
            style={{ top: '42%', left: '46%', transform: 'translate(-50%, -50%)' }}
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-linen/90 backdrop-blur-md border-b border-navy/5">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Wordmark className="text-navy" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location === link.href
                    ? "text-navy"
                    : "text-steel hover:text-navy"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="h-0.5 bg-orange mt-0.5 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-navy"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-linen/98 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-start gap-6 pt-24 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-medium ${
                      location === link.href ? "text-navy" : "text-steel"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
