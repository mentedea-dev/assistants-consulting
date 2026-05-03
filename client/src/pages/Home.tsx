/*
 * Design: Swiss Precision Meets Data Narrative
 * Home: Hero com imagem abstrata + proposta de valor, seção de números,
 * serviços em grid assimétrico, CTA final
 * Paleta: Navy #0B1929, Orange #E67E22, Steel #3D4F5F, Linen #FAFAF8
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Shield, BarChart3, Users, FileSearch, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/hero-abstract-3f4orXLiYPo2vZNPLk4ZWi.webp";
const HEALTH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-health-oSYmVgz3SLW5sqUk5brVYQ.webp";
const PENSION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-pension-fRnGwb3JVktfCHfLSH2Qq4.webp";
const BENEFITS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663107262564/aXqadAyEB77qjejS4YWzRV/services-benefits-nBQ6XyP5ZvCghxLMwnwihV.webp";

const services = [
  {
    icon: Shield,
    title: "Saúde Suplementar",
    desc: "Precificação, provisionamento técnico e modelagem de risco para operadoras e autogestões, com aderência integral às normas da ANS.",
    img: HEALTH_IMG,
  },
  {
    icon: TrendingUp,
    title: "Previdência Complementar",
    desc: "Avaliação atuarial de planos BD, CD e CV, estudos de solvência e ALM para entidades fechadas e abertas de previdência complementar.",
    img: PENSION_IMG,
  },
  {
    icon: BarChart3,
    title: "Benefícios Pós-Emprego",
    desc: "Laudos atuariais conforme CPC 33 (R2) / IAS 19, mensuração de obrigações e assessoria para demonstrações financeiras auditadas.",
    img: BENEFITS_IMG,
  },
];

const additionalServices = [
  {
    icon: FileSearch,
    title: "Auditoria Atuarial",
    desc: "Revisão independente de premissas, metodologias e provisões técnicas com rigor analítico e conformidade regulatória.",
  },
  {
    icon: Briefcase,
    title: "Due Diligence Atuarial",
    desc: "Análise de passivos atuariais em operações de M&A, IPO e reestruturações societárias com quantificação precisa de riscos.",
  },
  {
    icon: Users,
    title: "HR Consulting",
    desc: "Desenho e revisão de políticas de benefícios corporativos, benchmarking de mercado e otimização de custos previdenciários.",
  },
];

const stats = [
  { value: 35, suffix: "+", label: "Anos de atuação" },
  { value: 200, suffix: "+", label: "Clientes atendidos" },
  { value: 50, suffix: "bi+", prefix: "R$", label: "Em passivos avaliados" },
  { value: 15, suffix: "+", label: "Setores da economia" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-linen">
      <Header />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/40" />
        </div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            <FadeIn delay={0.2}>
              <p className="text-orange text-sm font-semibold uppercase tracking-[0.2em] mb-6">
                Consultoria Atuarial
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
                O ponto de inflexão
                <br />
                <span className="text-white/60">entre risco e</span>
                <br />
                <span className="text-white">certeza<motion.span
                    className="inline-block w-2.5 h-2.5 rounded-full bg-orange ml-1 align-super"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 400 }}
                  /></span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-10">
                Há 35 anos, a Assistants transforma complexidade atuarial em
                clareza estratégica para os maiores grupos corporativos do Brasil.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/servicos"
                  className="inline-flex items-center gap-2 bg-orange text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-orange/90 transition-colors"
                >
                  Conheça nossos serviços
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors"
                >
                  Fale conosco
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>
      </section>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center md:text-left">
                <div className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <p className="text-sm text-white/40 mt-2 tracking-wide">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MAIN SERVICES ═══════════════════════ */}
      <section className="py-20 md:py-32">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mb-16 md:mb-20">
              <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Áreas de Atuação
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
                Excelência atuarial em
                <br />
                três dimensões estratégicas
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-16 md:space-y-24">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={0.1}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                    i % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-sm aspect-[3/2]">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-sm bg-navy/5 flex items-center justify-center">
                        <service.icon size={20} className="text-navy" />
                      </div>
                      <div className="h-px flex-1 bg-navy/10" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy tracking-tight mb-4">
                      {service.title}
                    </h3>
                    <p className="text-steel-light leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <Link
                      href="/servicos"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors group"
                    >
                      Saiba mais
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ADDITIONAL SERVICES ═══════════════════════ */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mb-16">
              <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Serviços Especializados
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Soluções complementares de
                <br />
                alto valor agregado
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.1}>
                <div className="group p-8 border border-white/10 hover:border-orange/30 transition-colors duration-300">
                  <service.icon size={24} className="text-orange mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ THOUGHT LEADERSHIP TEASER ═══════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="container">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-5">
                <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Insights
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight leading-tight mb-6">
                  Liderança de
                  <br />
                  pensamento atuarial
                </h2>
                <p className="text-steel-light leading-relaxed mb-8">
                  Produzimos análises aprofundadas sobre os temas que definem o futuro
                  da gestão de riscos no Brasil. Nosso conteúdo técnico é referência
                  para decisores do mercado financeiro e de saúde suplementar.
                </p>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors group"
                >
                  Ver todos os insights
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="md:col-span-7">
                <div className="space-y-6">
                  {[
                    {
                      tag: "CPC 33",
                      title: "Impactos da revisão do CPC 33 (R2) nas demonstrações financeiras de 2025",
                      date: "Abril 2026",
                    },
                    {
                      tag: "Saúde",
                      title: "Judicialização na saúde suplementar: impactos atuariais e estratégias de mitigação",
                      date: "Março 2026",
                    },
                    {
                      tag: "Previdência",
                      title: "Reforma da previdência complementar: o que muda para os planos BD em 2026",
                      date: "Fevereiro 2026",
                    },
                  ].map((article, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                      <Link
                        href="/insights"
                        className="group block p-6 border border-navy/10 hover:border-orange/30 transition-all duration-300 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-orange bg-orange/10 px-2.5 py-1">
                            {article.tag}
                          </span>
                          <span className="text-xs text-steel-light">{article.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-navy group-hover:text-orange transition-colors tracking-tight leading-snug">
                          {article.title}
                        </h3>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 text-center">
          <FadeIn>
            <motion.div
              className="w-4 h-4 rounded-full bg-orange mx-auto mb-8"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Encontre o seu ponto de inflexão
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
              Converse com nossos atuários sobre como podemos transformar
              a gestão de riscos da sua organização.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-orange text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-orange/90 transition-colors"
            >
              Agende uma conversa
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
