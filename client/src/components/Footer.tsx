/*
 * Design: Swiss Precision Meets Data Narrative
 * Footer: Abyssal Navy background, clean grid, minimal information
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-semibold text-white tracking-[0.15em] uppercase">
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
            <p className="text-sm leading-relaxed max-w-sm text-white/50">
              Consultoria atuarial com 35 anos de excelência. Transformamos complexidade
              analítica em clareza estratégica para os maiores grupos corporativos do Brasil.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
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
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
              Áreas de Atuação
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                "Saúde Suplementar",
                "Previdência Complementar",
                "Benefícios Pós-Emprego",
                "Auditoria Atuarial",
                "Due Diligence",
              ].map((item) => (
                <span key={item} className="text-sm text-white/60">
                  {item}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Assistants Consulting. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30">
              São Paulo, SP — Brasil
            </span>
            <a
              href="mailto:contato@assistants.com.br"
              className="text-xs text-white/40 hover:text-orange transition-colors"
            >
              contato@assistants.com.br
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
