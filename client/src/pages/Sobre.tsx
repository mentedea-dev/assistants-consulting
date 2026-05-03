/*
 * Design: Swiss Precision Meets Data Narrative
 * Sobre: História, valores, diferenciais e equipe
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import { Target, Eye, Gem, Award, BookOpen, Scale } from "lucide-react";

const TEXTURE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/about-texture-KGggM3VhLLJWdcbHSdSMLp.webp";

const values = [
  {
    icon: Target,
    title: "Precisão Analítica",
    desc: "Cada premissa é validada com rigor estatístico. Cada modelo é testado sob múltiplos cenários. A precisão não é meta — é pré-requisito.",
  },
  {
    icon: Eye,
    title: "Visão Estratégica",
    desc: "Transcendemos o laudo técnico para entregar inteligência que orienta decisões de negócio, investimento e governança corporativa.",
  },
  {
    icon: Scale,
    title: "Independência",
    desc: "Nossos pareceres são fundamentados exclusivamente em evidências técnicas, livres de conflitos de interesse ou pressões comerciais.",
  },
  {
    icon: Gem,
    title: "Excelência",
    desc: "Investimos continuamente na formação de nossos profissionais e na evolução de nossas metodologias para manter o mais alto padrão de entrega.",
  },
];

const milestones = [
  { year: "1991", event: "Fundação da Assistants Consulting em São Paulo" },
  { year: "2000", event: "Expansão para o mercado de previdência complementar" },
  { year: "2008", event: "Início da prática de benefícios pós-emprego (CPC 33)" },
  { year: "2015", event: "Consolidação como referência em saúde suplementar" },
  { year: "2020", event: "Adoção de modelagem preditiva e analytics avançado" },
  { year: "2026", event: "35 anos de atuação contínua e mais de 200 clientes" },
];

const credentials = [
  { icon: Award, label: "Membros do IBA — Instituto Brasileiro de Atuária" },
  { icon: BookOpen, label: "Conformidade com normas PREVIC, ANS e SUSEP" },
  { icon: Scale, label: "Aderência aos pronunciamentos CPC e IFRS" },
];

export default function Sobre() {
  return (
    <div className="min-h-screen bg-linen">
      <Header />

      {/* Page header */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Sobre
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight max-w-3xl">
              35 anos definindo o
              <br />
              <span className="text-steel">padrão atuarial brasileiro</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About text */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <FadeIn className="md:col-span-7">
              <div className="prose prose-lg max-w-none">
                <p className="text-steel-light leading-relaxed text-lg">
                  Fundada em 1991, a Assistants Consulting nasceu com a missão de elevar
                  o padrão da consultoria atuarial no Brasil. Ao longo de mais de três
                  décadas, construímos uma reputação sólida fundamentada na precisão
                  técnica, na independência de nossos pareceres e na capacidade de
                  transformar análises complexas em instrumentos claros de decisão.
                </p>
                <p className="text-steel-light leading-relaxed text-lg mt-6">
                  Nossa equipe é composta por atuários certificados pelo Instituto
                  Brasileiro de Atuária (IBA), com formação multidisciplinar que abrange
                  ciências atuariais, economia, estatística e finanças. Essa diversidade
                  de competências nos permite abordar cada projeto com uma perspectiva
                  integrada, conectando a modelagem técnica às implicações estratégicas
                  e regulatórias de cada decisão.
                </p>
                <p className="text-steel-light leading-relaxed text-lg mt-6">
                  Atendemos desde grandes corporações listadas em bolsa até entidades
                  fechadas de previdência complementar, operadoras de saúde e órgãos
                  governamentais. Em cada engajamento, nosso compromisso é o mesmo:
                  entregar trabalho de excelência que resista ao escrutínio dos mais
                  rigorosos auditores e reguladores.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="md:col-span-5">
              <div
                className="relative p-8 md:p-10 bg-cover bg-center rounded-sm"
                style={{ backgroundImage: `url(${TEXTURE_IMG})` }}
              >
                <div className="space-y-8">
                  {[
                    { value: 35, suffix: "+", label: "Anos de mercado" },
                    { value: 200, suffix: "+", label: "Clientes corporativos" },
                    { value: 50, suffix: "bi+", prefix: "R$", label: "Em passivos avaliados" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl md:text-5xl font-bold text-navy tracking-tight">
                        <CountUp
                          end={stat.value}
                          prefix={stat.prefix || ""}
                          suffix={stat.suffix}
                        />
                      </div>
                      <p className="text-sm text-steel mt-1">{stat.label}</p>
                      <div className="h-px bg-navy/10 mt-4" />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Valores
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight mb-16">
              Os princípios que nos definem
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center shrink-0">
                    <value.icon size={22} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy tracking-tight mb-2">
                      {value.title}
                    </h3>
                    <p className="text-steel-light text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Trajetória
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16">
              Marcos de nossa história
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <FadeIn key={milestone.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-orange -translate-x-1/2 mt-1.5 z-10" />

                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}>
                      <span className="text-orange font-bold text-lg">{milestone.year}</span>
                      <p className="text-white/60 text-sm mt-1">{milestone.event}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-20 bg-linen">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentials.map((cred, i) => (
              <FadeIn key={cred.label} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-6 border border-navy/10">
                  <cred.icon size={20} className="text-orange shrink-0 mt-0.5" />
                  <span className="text-sm text-navy/80 leading-relaxed">{cred.label}</span>
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
