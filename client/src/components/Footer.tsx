/*
 * PENTAGRAM CRAFT: Footer (i18n)
 */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success(t("newsletter.success"));
      setEmail("");
    },
    onError: () => {
      toast.error(t("newsletter.error"));
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) subscribeMutation.mutate({ email });
  };

  const navLinks = [
    { href: "/servicos", label: t("nav.services") },
    { href: "/sobre", label: t("nav.about") },
    { href: "/clientes", label: t("nav.clients") },
    { href: "/insights", label: t("nav.insights") },
    { href: "/contato", label: t("nav.contact") },
  ];

  const serviceAreas = [
    t("service.health.title"),
    t("service.pension.title"),
    t("service.benefits.title"),
    t("service.audit.title"),
    t("service.duediligence.title"),
  ];

  return (
    <footer className="bg-navy text-white/70">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-7">
              <span className="text-lg font-semibold text-white tracking-[0.2em] uppercase">
                <span className="relative inline-block">
                  A
                  <span
                    className="absolute w-[5px] h-[5px] rounded-full bg-orange"
                    style={{ top: '42%', left: '46%', transform: 'translate(-50%, -50%)' }}
                  />
                </span>
                SSISTANTS
              </span>
            </div>
            <p className="text-sm leading-[1.9] max-w-sm text-white/40 font-light">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-6">
              {t("footer.nav")}
            </h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-orange transition-colors duration-300 font-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-6">
              {t("footer.areas")}
            </h4>
            <nav className="flex flex-col gap-4">
              {serviceAreas.map((item) => (
                <span key={item} className="text-sm text-white/50 font-light">
                  {item}
                </span>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-white/40 font-light mb-5 leading-relaxed">
              {t("newsletter.desc")}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t("newsletter.placeholder")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:border-orange/50 focus:ring-0 outline-none transition-all duration-300"
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="inline-flex items-center justify-center gap-2 bg-orange text-white px-5 py-3 text-xs font-medium tracking-wide hover:bg-orange-light transition-all duration-300 disabled:opacity-60"
              >
                {subscribeMutation.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  t("newsletter.subscribe")
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 font-light">
            &copy; {new Date().getFullYear()} Assistants Consulting. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[11px] text-white/25 font-light">
              {t("footer.location")}
            </span>
            <a
              href="mailto:contato@assistants.com.br"
              className="text-[11px] text-white/30 hover:text-orange transition-colors duration-300 font-light"
            >
              contato@assistants.com.br
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
