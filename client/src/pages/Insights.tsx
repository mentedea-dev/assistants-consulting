/*
 * PENTAGRAM CRAFT: Insights
 * - Editorial featured article with premium treatment
 * - Cards with hover lift and stagger
 * - Serif headlines, generous spacing
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const featuredArticle = {
  tag: "CPC 33",
  title: "Impactos da revisão do CPC 33 (R2) nas demonstrações financeiras de 2025",
  excerpt:
    "A recente atualização do Pronunciamento Técnico CPC 33 introduz alterações significativas na mensuração de obrigações com benefícios pós-emprego. Analisamos os impactos quantitativos e as estratégias de transição para empresas brasileiras listadas.",
  date: "Abril 2026",
  readTime: "12 min",
};

const articles = [
  {
    tag: "Saúde",
    title: "Judicialização na saúde suplementar: impactos atuariais e estratégias de mitigação",
    excerpt:
      "O crescimento exponencial de demandas judiciais contra operadoras de saúde exige a incorporação de provisões específicas nos modelos atuariais.",
    date: "Março 2026",
    readTime: "9 min",
  },
  {
    tag: "Previdência",
    title: "Reforma da previdência complementar: o que muda para os planos BD em 2026",
    excerpt:
      "As novas diretrizes da PREVIC para planos de benefício definido impactam diretamente os estudos de solvência e as políticas de equacionamento.",
    date: "Fevereiro 2026",
    readTime: "11 min",
  },
  {
    tag: "Regulatório",
    title: "IFRS 17 e seus reflexos na avaliação atuarial de seguradoras brasileiras",
    excerpt:
      "A adoção plena do IFRS 17 representa uma transformação estrutural na contabilidade de contratos de seguro.",
    date: "Janeiro 2026",
    readTime: "14 min",
  },
  {
    tag: "Analytics",
    title: "Machine learning aplicado à modelagem de sinistralidade em saúde",
    excerpt:
      "A integração de técnicas de aprendizado de máquina com modelos atuariais tradicionais permite projeções mais granulares e acuradas.",
    date: "Dezembro 2025",
    readTime: "10 min",
  },
  {
    tag: "M&A",
    title: "Due diligence atuarial em operações de M&A: armadilhas e melhores práticas",
    excerpt:
      "Passivos atuariais subestimados são uma das principais fontes de destruição de valor em fusões e aquisições.",
    date: "Novembro 2025",
    readTime: "8 min",
  },
  {
    tag: "Governança",
    title: "O papel do atuário independente na governança de fundos de pensão",
    excerpt:
      "A atuação do atuário independente como terceira linha de defesa fortalece a governança das entidades de previdência complementar.",
    date: "Outubro 2025",
    readTime: "7 min",
  },
];

export default function Insights() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                Insights
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                Liderança de pensamento
                <br />
                <span className="text-steel-light">atuarial</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                Análises aprofundadas sobre os temas que definem o futuro da gestão
                de riscos, previdência e saúde suplementar no Brasil.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Featured article */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            <FadeIn distance={30}>
              <motion.div
                className="relative bg-navy overflow-hidden group"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />

                <div className="relative p-10 md:p-16 lg:p-20">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-navy bg-orange px-3 py-1.5">
                        {featuredArticle.tag}
                      </span>
                      <span className="text-[11px] text-white/35 font-light">{featuredArticle.date}</span>
                      <span className="text-[11px] text-white/35 font-light">{featuredArticle.readTime} de leitura</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight leading-[1.1] mb-8">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-white/45 leading-[1.8] mb-10 max-w-2xl font-light text-lg">
                      {featuredArticle.excerpt}
                    </p>
                    <button className="group/btn inline-flex items-center gap-3 text-orange text-sm font-medium hover:text-orange-light transition-colors duration-300">
                      <span className="border-b border-orange/30 group-hover/btn:border-orange/60 pb-0.5 transition-colors duration-300">
                        Ler artigo completo
                      </span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </section>

        <SectionDivider className="mb-16" />

        {/* Articles grid */}
        <section className="pb-28 md:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <article className="group bg-white border border-navy/5 hover:border-orange/15 transition-all duration-500 card-lift h-full flex flex-col">
                    <div className="p-8 md:p-9 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-3 py-1.5">
                          {article.tag}
                        </span>
                        <span className="text-[11px] text-steel-light font-light">{article.date}</span>
                      </div>
                      <h3 className="text-lg font-serif font-medium text-navy tracking-tight leading-snug mb-4 group-hover:text-orange transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-steel-light text-sm leading-[1.8] font-light flex-1">
                        {article.excerpt}
                      </p>
                      <div className="mt-7 pt-5 border-t border-navy/5 flex items-center justify-between">
                        <span className="text-[11px] text-steel-light font-light">{article.readTime} de leitura</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-orange transition-colors duration-300">
                          Ler
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
