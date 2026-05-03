/*
 * PENTAGRAM CRAFT: Clientes
 * - Serif headlines, staggered sector cards
 * - Testimonials with editorial treatment
 * - Stats with golden ratio spacing
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { Building2, Heart, Landmark, Factory, ShoppingBag, Zap } from "lucide-react";

const sectors = [
  {
    icon: Landmark,
    name: "Instituições Financeiras",
    desc: "Bancos, seguradoras e entidades de previdência complementar que demandam rigor regulatório e conformidade com SUSEP e PREVIC.",
  },
  {
    icon: Heart,
    name: "Saúde Suplementar",
    desc: "Operadoras de planos de saúde, autogestões e cooperativas médicas com necessidades complexas de provisionamento e precificação.",
  },
  {
    icon: Factory,
    name: "Indústria e Energia",
    desc: "Grandes grupos industriais e empresas de energia com passivos atuariais significativos em benefícios pós-emprego e previdência privada.",
  },
  {
    icon: Building2,
    name: "Setor Público",
    desc: "Estatais, autarquias e fundações públicas com regimes próprios de previdência e obrigações atuariais de longo prazo.",
  },
  {
    icon: ShoppingBag,
    name: "Varejo e Serviços",
    desc: "Corporações com grandes bases de colaboradores e programas de benefícios que exigem gestão atuarial especializada.",
  },
  {
    icon: Zap,
    name: "Tecnologia e Telecomunicações",
    desc: "Empresas de tecnologia e telecomunicações com planos de benefícios diferenciados e necessidades de compliance contábil internacional.",
  },
];

const testimonials = [
  {
    quote:
      "A Assistants trouxe um nível de rigor técnico e clareza que transformou a forma como nosso conselho de administração compreende e gerencia os passivos atuariais da companhia.",
    author: "Diretor Financeiro",
    company: "Grupo do setor de energia",
  },
  {
    quote:
      "Em mais de uma década de parceria, a Assistants demonstrou consistência na qualidade de seus laudos e uma capacidade singular de antecipar impactos regulatórios antes que se tornem problemas.",
    author: "Superintendente de Previdência",
    company: "Entidade fechada de previdência complementar",
  },
  {
    quote:
      "O trabalho de due diligence atuarial conduzido pela Assistants foi determinante para a precificação adequada da operação de M&A. A profundidade da análise superou nossas expectativas.",
    author: "Sócio de M&A",
    company: "Escritório de advocacia empresarial",
  },
];

export default function Clientes() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                Clientes
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                A confiança dos maiores
                <br />
                <span className="text-steel-light">grupos do Brasil</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                Atendemos organizações de todos os portes e setores que compartilham
                uma exigência comum: excelência técnica sem concessões.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-navy py-20 md:py-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {[
                { value: 200, suffix: "+", label: "Clientes atendidos" },
                { value: 12, suffix: "+", label: "Setores da economia" },
                { value: 97, suffix: "%", label: "Taxa de retenção" },
                { value: 35, suffix: "+", label: "Anos de confiança" },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.12} className="text-center md:text-left">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <p className="text-xs text-white/35 mt-3 tracking-wide uppercase font-medium">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-28 md:py-36">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Setores de Atuação
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  Presença em todos os
                  <br />
                  setores estratégicos
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sectors.map((sector, i) => (
                <FadeIn key={sector.name} delay={i * 0.08}>
                  <div className="group p-8 md:p-9 bg-white border border-navy/5 hover:border-orange/20 transition-all duration-500 card-lift h-full">
                    <div className="w-11 h-11 bg-navy/4 flex items-center justify-center mb-6">
                      <sector.icon size={20} className="text-navy" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-navy tracking-tight mb-3">
                      {sector.name}
                    </h3>
                    <p className="text-steel-light text-sm leading-[1.8] font-light">
                      {sector.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Depoimentos
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  O que dizem nossos clientes
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {testimonials.map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="relative p-8 md:p-10 border border-navy/6 h-full flex flex-col card-lift">
                    {/* Quote mark */}
                    <span className="absolute top-6 right-8 text-6xl font-serif text-orange/10 leading-none select-none">"</span>
                    
                    <p className="text-navy/75 text-[15px] leading-[1.9] font-light flex-1 relative z-10 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-8 pt-6 border-t border-navy/6">
                      <p className="text-sm font-medium text-navy">{testimonial.author}</p>
                      <p className="text-xs text-steel-light mt-1 font-light">{testimonial.company}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider className="py-4" />

        <Footer />
      </div>
    </PageTransition>
  );
}
