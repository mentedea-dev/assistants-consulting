/*
 * PENTAGRAM CRAFT: Serviços
 * - Serif headlines, asymmetric layout
 * - Cards with hover lift
 * - Generous whitespace with golden ratio
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  BarChart3,
  FileSearch,
  Briefcase,
  Users,
  Scale,
  Calculator,
  PieChart,
} from "lucide-react";

const HEALTH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-health-oSYmVgz3SLW5sqUk5brVYQ.webp";
const PENSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-pension-fRnGwb3JVktfCHfLSH2Qq4.webp";
const BENEFITS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-benefits-nBQ6XyP5ZvCghxLMwnwihV.webp";

const mainAreas = [
  {
    icon: Shield,
    title: "Saúde Suplementar",
    subtitle: "Operadoras, autogestões e seguradoras",
    img: HEALTH_IMG,
    description:
      "Atuamos junto a operadoras de planos de saúde, autogestões e seguradoras especializadas, oferecendo soluções atuariais que garantem a sustentabilidade financeira e a conformidade regulatória perante a Agência Nacional de Saúde Suplementar.",
    items: [
      "Precificação de planos individuais, coletivos e empresariais",
      "Constituição e teste de adequação de provisões técnicas (PEONA, IBNR)",
      "Modelagem de sinistralidade e análise de variação de custos",
      "Nota Técnica Atuarial de Registro de Produto (NTARP)",
      "Estudos de reajuste e revisão técnica de carteiras",
      "Parecer atuarial para processos regulatórios e judiciais",
    ],
  },
  {
    icon: TrendingUp,
    title: "Previdência Complementar",
    subtitle: "Entidades fechadas e abertas",
    img: PENSION_IMG,
    description:
      "Prestamos assessoria atuarial completa para Entidades Fechadas de Previdência Complementar, fundos de pensão e entidades abertas, com foco na sustentabilidade de longo prazo e na aderência às exigências da PREVIC e SUSEP.",
    items: [
      "Avaliação atuarial anual de planos BD, CD e CV",
      "Estudos de solvência e equilíbrio técnico-atuarial",
      "Asset Liability Management (ALM) e política de investimentos",
      "Desenho e redesenho de planos de benefícios",
      "Equacionamento de déficits e superávits",
      "Estudos de migração e portabilidade entre planos",
    ],
  },
  {
    icon: BarChart3,
    title: "Benefícios Pós-Emprego",
    subtitle: "CPC 33 (R2) / IAS 19 / IFRS",
    img: BENEFITS_IMG,
    description:
      "Elaboramos laudos atuariais para mensuração de obrigações com benefícios pós-emprego em conformidade com os pronunciamentos CPC 33 (R2) e IAS 19, atendendo às exigências de auditores independentes e órgãos reguladores.",
    items: [
      "Laudos atuariais CPC 33 (R2) / IAS 19 para demonstrações financeiras",
      "Mensuração de obrigações com assistência médica a aposentados (OPEB)",
      "Avaliação de planos de aposentadoria, pensão e benefícios de longo prazo",
      "Análise de sensibilidade e testes de estresse de premissas",
      "Assessoria para notas explicativas e divulgações contábeis",
      "Suporte técnico para comitês de auditoria e conselhos fiscais",
    ],
  },
];

const specializedServices = [
  {
    icon: FileSearch,
    title: "Auditoria Atuarial",
    desc: "Revisão independente de premissas, metodologias e provisões técnicas. Emitimos pareceres com rigor analítico e conformidade regulatória para conselhos e comitês.",
  },
  {
    icon: Briefcase,
    title: "Due Diligence Atuarial",
    desc: "Análise aprofundada de passivos atuariais em operações de M&A, IPO e reestruturações societárias. Quantificamos riscos ocultos e projetamos cenários de impacto.",
  },
  {
    icon: Users,
    title: "HR Consulting",
    desc: "Desenho e revisão de políticas de benefícios corporativos, benchmarking de mercado e otimização de custos previdenciários com visão estratégica.",
  },
  {
    icon: Scale,
    title: "Perícia Atuarial",
    desc: "Elaboração de laudos periciais e assistência técnica em processos judiciais e arbitrais envolvendo matéria atuarial, com fundamentação técnica robusta.",
  },
  {
    icon: Calculator,
    title: "Modelagem Estocástica",
    desc: "Desenvolvimento de modelos probabilísticos avançados para projeção de cenários, stress testing e quantificação de incertezas em passivos de longo prazo.",
  },
  {
    icon: PieChart,
    title: "Gestão de Riscos",
    desc: "Estruturação de frameworks de ERM com foco em riscos atuariais, subscrição e reservas. Alinhamento com melhores práticas internacionais (ICA, ORSA).",
  },
];

export default function Servicos() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                Serviços
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                Soluções atuariais para
                <br />
                <span className="text-steel-light">cada dimensão do risco</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                Cada engajamento é conduzido por atuários seniores com profundo conhecimento
                regulatório e visão estratégica de negócios, garantindo entregas que
                transcendem o laudo técnico e se tornam instrumentos de decisão.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Main Areas */}
        <section className="pb-28 md:pb-40">
          <div className="container">
            <div className="space-y-24 md:space-y-36">
              {mainAreas.map((area, i) => (
                <FadeIn key={area.title} delay={0.1} distance={40}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
                    <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden aspect-[3/2] mb-6 md:mb-0 group"
                      >
                        <img
                          src={area.img}
                          alt={area.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </div>

                    <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-navy/5 flex items-center justify-center">
                          <area.icon size={22} className="text-navy" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange">
                          {area.subtitle}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-serif font-medium text-navy tracking-tight mb-4 leading-tight">
                        {area.title}
                      </h2>

                      <p className="text-steel-light leading-[1.8] mb-8 font-light">
                        {area.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                        {area.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-3 py-2.5 border-b border-navy/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                            <span className="text-sm text-navy/80 leading-relaxed font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-24">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Serviços Especializados
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight leading-[1.1]">
                  Capacidades complementares
                  <br />
                  de alto valor agregado
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {specializedServices.map((service, i) => (
                <FadeIn key={service.title} delay={i * 0.08}>
                  <div className="group p-8 md:p-10 border border-white/6 hover:border-orange/20 transition-all duration-500 card-lift h-full">
                    <service.icon size={20} className="text-orange mb-7" strokeWidth={1.5} />
                    <h3 className="text-lg font-serif font-medium text-white mb-4 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-[1.8] font-light">
                      {service.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 md:py-36">
          <div className="container text-center">
            <SectionDivider className="mb-14" />
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight mb-6 leading-[1.1]">
                Cada desafio exige uma
                <br />
                abordagem sob medida
                <span className="inflection-dot" />
              </h2>
              <p className="text-steel-light max-w-lg mx-auto mb-12 leading-[1.8] font-light">
                Converse com nossos atuários para entender como podemos estruturar
                a solução adequada ao seu contexto regulatório e estratégico.
              </p>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-3 bg-orange text-white px-10 py-4.5 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300"
              >
                Fale com um especialista
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
