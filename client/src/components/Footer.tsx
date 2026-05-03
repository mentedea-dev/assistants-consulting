/*
 * PENTAGRAM CRAFT: Footer
 * - Generous spacing, refined typography
 * - Hover states with smooth transitions
 * - Wordmark with inflection dot
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="container py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
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
          <div className="md:col-span-3">
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
          <div className="md:col-span-4">
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
