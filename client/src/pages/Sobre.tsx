/*
 * PENTAGRAM CRAFT: Sobre
 * - Serif headlines, editorial narrative
 * - Animated timeline with stagger
 * - Values with refined spacing
 * - Credentials as subtle proof points
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Target, Eye, Gem, Scale, Award, BookOpen } from "lucide-react";

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
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                Sobre
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                35 anos definindo o
                <br />
                <span className="text-steel-light">padrão atuarial brasileiro</span>
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Narrative + Stats */}
        <section className="pb-28 md:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
              <FadeIn className="md:col-span-7">
                <div className="space-y-7">
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">
                    Fundada em 1991, a Assistants Consulting nasceu com a missão de elevar
                    o padrão da consultoria atuarial no Brasil. Ao longo de mais de três
                    décadas, construímos uma reputação sólida fundamentada na precisão
                    técnica, na independência de nossos pareceres e na capacidade de
                    transformar análises complexas em instrumentos claros de decisão.
                  </p>
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">
                    Nossa equipe é composta por atuários certificados pelo Instituto
                    Brasileiro de Atuária (IBA), com formação multidisciplinar que abrange
                    ciências atuariais, economia, estatística e finanças. Essa diversidade
                    de competências nos permite abordar cada projeto com uma perspectiva
                    integrada, conectando a modelagem técnica às implicações estratégicas
                    e regulatórias de cada decisão.
                  </p>
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">
                    Atendemos desde grandes corporações listadas em bolsa até entidades
                    fechadas de previdência complementar, operadoras de saúde e órgãos
                    governamentais. Em cada engajamento, nosso compromisso é o mesmo:
                    entregar trabalho de excelência que resista ao escrutínio dos mais
                    rigorosos auditores e reguladores.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="md:col-span-5">
                <div className="relative">
                  {/* Background texture */}
                  <div className="absolute inset-0 opacity-30 overflow-hidden">
                    <img src={TEXTURE_IMG} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative p-10 md:p-12 border border-navy/8">
                    <div className="space-y-10">
                      {[
                        { value: 35, suffix: "+", label: "Anos de mercado" },
                        { value: 200, suffix: "+", label: "Clientes corporativos" },
                        { value: 50, suffix: "bi+", prefix: "R$", label: "Em passivos avaliados" },
                      ].map((stat, i) => (
                        <div key={stat.label}>
                          <div className="text-4xl md:text-5xl font-serif font-medium text-navy tracking-tight">
                            <CountUp
                              end={stat.value}
                              prefix={stat.prefix || ""}
                              suffix={stat.suffix}
                              duration={2.5}
                            />
                          </div>
                          <p className="text-xs text-steel-light mt-2 uppercase tracking-wide font-medium">
                            {stat.label}
                          </p>
                          {i < 2 && <div className="h-px bg-navy/6 mt-6" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Valores
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  Os princípios que nos definem
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {values.map((value, i) => (
                <FadeIn key={value.title} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-navy/4 flex items-center justify-center shrink-0">
                      <value.icon size={20} className="text-navy" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-medium text-navy tracking-tight mb-3">
                        {value.title}
                      </h3>
                      <p className="text-steel-light text-sm leading-[1.8] font-light">
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
        <section className="py-24 md:py-32 bg-navy">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Trajetória
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight leading-[1.1]">
                  Marcos de nossa história
                </h2>
              </div>
            </FadeIn>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/8 md:-translate-x-px" />

              <div className="space-y-14">
                {milestones.map((milestone, i) => (
                  <FadeIn key={milestone.year} delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"} distance={20}>
                    <div className={`relative flex items-start ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}>
                      {/* Dot */}
                      <motion.div
                        className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-orange -translate-x-1/2 mt-1.5 z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                      />

                      <div className={`ml-14 md:ml-0 md:w-1/2 ${
                        i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                      }`}>
                        <span className="text-2xl font-serif font-medium text-orange">{milestone.year}</span>
                        <p className="text-white/50 text-sm mt-2 leading-relaxed font-light">{milestone.event}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-16 md:py-20">
          <div className="container">
            <SectionDivider className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {credentials.map((cred, i) => (
                <FadeIn key={cred.label} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-7 border border-navy/6 card-lift">
                    <cred.icon size={18} className="text-orange shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm text-navy/70 leading-relaxed font-light">{cred.label}</span>
                  </div>
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
