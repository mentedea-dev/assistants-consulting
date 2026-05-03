/*
 * Design: Swiss Precision Meets Data Narrative
 * Clientes: Setores atendidos + depoimentos + logos
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
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
    <div className="min-h-screen bg-linen">
      <Header />

      {/* Page header */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Clientes
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight max-w-3xl">
              A confiança dos maiores
              <br />
              <span className="text-steel">grupos do Brasil</span>
            </h1>
            <p className="text-steel-light text-lg max-w-2xl mt-6 leading-relaxed">
              Atendemos organizações de todos os portes e setores que compartilham
              uma exigência comum: excelência técnica sem concessões.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy py-14">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 200, suffix: "+", label: "Clientes atendidos" },
              { value: 15, suffix: "+", label: "Setores da economia" },
              { value: 95, suffix: "%", label: "Taxa de retenção" },
              { value: 35, suffix: "+", label: "Anos de confiança" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/40 mt-2">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Setores de Atuação
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-16">
              Presença em todos os setores estratégicos
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, i) => (
              <FadeIn key={sector.name} delay={i * 0.08}>
                <div className="p-8 bg-white border border-navy/5 hover:border-orange/20 transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-sm bg-navy/5 flex items-center justify-center mb-5">
                    <sector.icon size={20} className="text-navy" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy tracking-tight mb-3">
                    {sector.name}
                  </h3>
                  <p className="text-steel-light text-sm leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Depoimentos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-16">
              O que dizem nossos clientes
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 border-l-2 border-orange bg-linen h-full flex flex-col">
                  <p className="text-navy/80 text-sm leading-relaxed italic flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-navy/10">
                    <p className="text-sm font-semibold text-navy">{testimonial.author}</p>
                    <p className="text-xs text-steel-light mt-0.5">{testimonial.company}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
