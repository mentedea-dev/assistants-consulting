/*
 * Design: Swiss Precision Meets Data Narrative
 * Serviços: Detalhamento completo das áreas de atuação
 * Paleta: Navy #0B1929, Orange #E67E22, Steel #3D4F5F, Linen #FAFAF8
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Link } from "wouter";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  BarChart3,
  FileSearch,
  Briefcase,
  Users,
  CheckCircle2,
} from "lucide-react";

const HEALTH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-health-oSYmVgz3SLW5sqUk5brVYQ.webp";
const PENSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-pension-fRnGwb3JVktfCHfLSH2Qq4.webp";
const BENEFITS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-benefits-nBQ6XyP5ZvCghxLMwnwihV.webp";

const mainServices = [
  {
    id: "saude",
    icon: Shield,
    title: "Saúde Suplementar",
    subtitle: "Inteligência atuarial para o ecossistema de saúde",
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
    id: "previdencia",
    icon: TrendingUp,
    title: "Previdência Complementar",
    subtitle: "Solidez técnica para a gestão previdenciária",
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
    id: "beneficios",
    icon: BarChart3,
    title: "Benefícios Pós-Emprego",
    subtitle: "Conformidade contábil com rigor atuarial",
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
    description:
      "Revisão independente de premissas atuariais, metodologias de cálculo e provisões técnicas. Nosso parecer oferece segurança adicional para conselhos de administração, comitês de auditoria e órgãos reguladores.",
  },
  {
    icon: Briefcase,
    title: "Due Diligence Atuarial",
    description:
      "Análise aprofundada de passivos atuariais em operações de fusões e aquisições, ofertas públicas iniciais e reestruturações societárias. Quantificamos riscos ocultos e projetamos cenários de impacto financeiro.",
  },
  {
    icon: Users,
    title: "HR Consulting",
    description:
      "Desenho e revisão de políticas de benefícios corporativos, benchmarking de mercado, otimização de custos previdenciários e assessoria na negociação de acordos coletivos com impacto em passivos atuariais.",
  },
];

export default function Servicos() {
  return (
    <div className="min-h-screen bg-linen">
      <Header />

      {/* Page header */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Serviços
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight max-w-3xl">
              Soluções atuariais de
              <br />
              <span className="text-steel">alta complexidade</span>
            </h1>
            <p className="text-steel-light text-lg max-w-2xl mt-6 leading-relaxed">
              Cada engajamento é conduzido por atuários seniores com profundo conhecimento
              regulatório e visão estratégica de negócios, garantindo entregas que
              transcendem o laudo técnico e se tornam instrumentos de decisão.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main services */}
      {mainServices.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-16 md:py-24 ${i % 2 === 0 ? "bg-white" : "bg-linen"}`}
        >
          <div className="container">
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start`}>
              <FadeIn className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-sm aspect-[3/2] mb-6 md:mb-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>

              <FadeIn
                delay={0.1}
                className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-navy/5 flex items-center justify-center">
                    <service.icon size={20} className="text-navy" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange">
                    {service.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-5">
                  {service.title}
                </h2>

                <p className="text-steel-light leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-orange mt-0.5 shrink-0" />
                      <span className="text-sm text-navy/80">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* Specialized services */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Serviços Especializados
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16">
              Soluções complementares
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specializedServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="p-8 border border-white/10 hover:border-orange/30 transition-colors duration-300 h-full">
                  <service.icon size={24} className="text-orange mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-linen">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-6">
              Precisa de uma solução sob medida?
            </h2>
            <p className="text-steel-light max-w-lg mx-auto mb-10 leading-relaxed">
              Cada organização possui desafios atuariais únicos. Converse com
              nossos especialistas para desenhar a abordagem ideal.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-navy-light transition-colors"
            >
              Fale com um especialista
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
