/*
 * Design: Swiss Precision Meets Data Narrative
 * Insights: Artigos técnicos e liderança de pensamento
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

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
      "O crescimento exponencial de demandas judiciais contra operadoras de saúde exige a incorporação de provisões específicas nos modelos atuariais. Apresentamos uma metodologia para quantificação desse risco.",
    date: "Março 2026",
    readTime: "9 min",
  },
  {
    tag: "Previdência",
    title: "Reforma da previdência complementar: o que muda para os planos BD em 2026",
    excerpt:
      "As novas diretrizes da PREVIC para planos de benefício definido impactam diretamente os estudos de solvência e as políticas de equacionamento. Detalhamos as principais mudanças e seus efeitos práticos.",
    date: "Fevereiro 2026",
    readTime: "11 min",
  },
  {
    tag: "Regulatório",
    title: "IFRS 17 e seus reflexos na avaliação atuarial de seguradoras brasileiras",
    excerpt:
      "A adoção plena do IFRS 17 representa uma transformação estrutural na contabilidade de contratos de seguro. Examinamos as implicações para as reservas técnicas e a mensuração de passivos.",
    date: "Janeiro 2026",
    readTime: "14 min",
  },
  {
    tag: "Analytics",
    title: "Machine learning aplicado à modelagem de sinistralidade em saúde",
    excerpt:
      "A integração de técnicas de aprendizado de máquina com modelos atuariais tradicionais permite projeções mais granulares e acuradas de sinistralidade. Apresentamos resultados de um estudo piloto.",
    date: "Dezembro 2025",
    readTime: "10 min",
  },
  {
    tag: "M&A",
    title: "Due diligence atuarial em operações de M&A: armadilhas e melhores práticas",
    excerpt:
      "Passivos atuariais subestimados são uma das principais fontes de destruição de valor em fusões e aquisições. Compartilhamos nossa experiência em mais de 50 operações.",
    date: "Novembro 2025",
    readTime: "8 min",
  },
  {
    tag: "Governança",
    title: "O papel do atuário independente na governança de fundos de pensão",
    excerpt:
      "A atuação do atuário independente como terceira linha de defesa fortalece a governança das entidades de previdência complementar e protege os interesses dos participantes.",
    date: "Outubro 2025",
    readTime: "7 min",
  },
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-linen">
      <Header />

      {/* Page header */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Insights
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight max-w-3xl">
              Liderança de pensamento
              <br />
              <span className="text-steel">atuarial</span>
            </h1>
            <p className="text-steel-light text-lg max-w-2xl mt-6 leading-relaxed">
              Análises aprofundadas sobre os temas que definem o futuro da gestão
              de riscos, previdência e saúde suplementar no Brasil.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured article */}
      <section className="pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <div className="bg-navy p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-navy bg-orange px-3 py-1">
                    {featuredArticle.tag}
                  </span>
                  <span className="text-xs text-white/40">{featuredArticle.date}</span>
                  <span className="text-xs text-white/40">{featuredArticle.readTime} de leitura</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/50 leading-relaxed mb-8 max-w-2xl">
                  {featuredArticle.excerpt}
                </p>
                <button className="inline-flex items-center gap-2 text-orange text-sm font-semibold hover:text-orange/80 transition-colors group">
                  Ler artigo completo
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <article className="bg-white border border-navy/5 hover:border-orange/20 transition-all duration-300 hover:shadow-sm h-full flex flex-col">
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-orange bg-orange/10 px-2.5 py-1">
                        {article.tag}
                      </span>
                      <span className="text-xs text-steel-light">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-navy tracking-tight leading-snug mb-3">
                      {article.title}
                    </h3>
                    <p className="text-steel-light text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-6 pt-4 border-t border-navy/5 flex items-center justify-between">
                      <span className="text-xs text-steel-light">{article.readTime} de leitura</span>
                      <button className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-orange transition-colors group">
                        Ler
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
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
  );
}
