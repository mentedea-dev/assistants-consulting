/*
 * PENTAGRAM CRAFT: Footer
 * - Generous spacing, refined typography
 * - Newsletter subscription form
 * - Wordmark with inflection dot
 */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Inscrito com sucesso!");
      setEmail("");
    },
    onError: () => {
      toast.error("Erro ao inscrever. Tente novamente.");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) subscribeMutation.mutate({ email });
  };

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
              Consultoria atuarial com 35 anos de excelência. Transformamos complexidade
              analítica em clareza estratégica para os maiores grupos corporativos do Brasil.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-6">
              Navegação
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { href: "/servicos", label: "Serviços" },
                { href: "/sobre", label: "Sobre" },
                { href: "/clientes", label: "Clientes" },
                { href: "/insights", label: "Insights" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
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
              Áreas de Atuação
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                "Saúde Suplementar",
                "Previdência Complementar",
                "Benefícios Pós-Emprego",
                "Auditoria Atuarial",
                "Due Diligence",
              ].map((item) => (
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
              Receba análises atuariais exclusivas no seu e-mail.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
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
                  "Inscrever-se"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 font-light">
            &copy; {new Date().getFullYear()} Assistants Consulting. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[11px] text-white/25 font-light">
              São Paulo, SP — Brasil
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
