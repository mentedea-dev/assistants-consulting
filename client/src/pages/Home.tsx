/*
 * PENTAGRAM CRAFT: Home
 * - Hero with parallax, serif headline, inflection dot motif
 * - Stats with golden ratio spacing
 * - Services with card-lift hover, asymmetric grid
 * - Section dividers with animated inflection dots
 * - CTA with depth and texture
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Shield, BarChart3, Users, FileSearch, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
          {/* Parallax background */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src={HERO_IMG}
              alt=""
              className="w-full h-[120%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/50 to-navy/30" />
          </motion.div>

          <motion.div className="container relative z-10 pt-24 pb-16" style={{ opacity: heroOpacity }}>
            <div className="max-w-3xl">
              <FadeIn delay={0.3} distance={20}>
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-8">
                  Consultoria Atuarial
                </p>
              </FadeIn>

              <FadeIn delay={0.5} distance={30}>
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-medium text-white leading-[1.05] tracking-tight mb-10">
                  O ponto de inflexão
                  <br />
                  <span className="text-white/50">entre risco e</span>
                  <br />
                  <span className="text-white">certeza</span>
                  <motion.span
                    className="inline-block w-3 h-3 rounded-full bg-orange ml-2 align-super"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 15 }}
                  />
                </h1>
              </FadeIn>

              <FadeIn delay={0.7} distance={20}>
                <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 font-light">
                  Há 35 anos, a Assistants transforma complexidade atuarial em
                  clareza estratégica para os maiores grupos corporativos do Brasil.
                </p>
              </FadeIn>

              <FadeIn delay={0.9} distance={15}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/servicos"
                    className="group inline-flex items-center gap-3 bg-orange text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300"
                  >
                    Conheça nossos serviços
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center gap-3 border border-white/25 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                  >
                    Fale conosco
                  </Link>
                </div>
              </FadeIn>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Scroll</span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        </section>

        {/* ═══════════════════════ STATS ═══════════════════════ */}
        <section className="bg-navy py-20 md:py-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.12} className="text-center md:text-left">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight">
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <p className="text-xs text-white/35 mt-3 tracking-wide uppercase font-medium">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ MAIN SERVICES ═══════════════════════ */}
        <section className="py-28 md:py-40">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-20 md:mb-28">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Áreas de Atuação
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  Excelência atuarial em
                  <br />
                  três dimensões estratégicas
                </h2>
              </div>
            </FadeIn>

            <div className="space-y-24 md:space-y-36">
              {services.map((service, i) => (
                <FadeIn key={service.title} delay={0.1} distance={40}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center`}
                  >
                    <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="relative overflow-hidden group">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="aspect-[3/2] overflow-hidden"
                        >
                          <img
                            src={service.img}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </motion.div>
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                    <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-11 h-11 bg-navy/5 flex items-center justify-center">
                          <service.icon size={20} className="text-navy" strokeWidth={1.5} />
                        </div>
                        <div className="h-px flex-1 bg-navy/8" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-serif font-medium text-navy tracking-tight mb-5 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-steel-light leading-[1.8] mb-8 font-light">
                        {service.desc}
                      </p>
                      <Link
                        href="/servicos"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-orange transition-colors duration-300"
                      >
                        <span className="border-b border-navy/20 group-hover:border-orange/40 transition-colors duration-300 pb-0.5">
                          Saiba mais
                        </span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ ADDITIONAL SERVICES ═══════════════════════ */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  Serviços Especializados
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight leading-[1.1]">
                  Soluções complementares de
                  <br />
                  alto valor agregado
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {additionalServices.map((service, i) => (
                <FadeIn key={service.title} delay={i * 0.12}>
                  <div className="group p-8 md:p-10 border border-white/8 hover:border-orange/25 transition-all duration-500 card-lift h-full">
                    <service.icon size={22} className="text-orange mb-7" strokeWidth={1.5} />
                    <h3 className="text-xl font-serif font-medium text-white mb-4 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-[1.8] font-light">
                      {service.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ THOUGHT LEADERSHIP ═══════════════════════ */}
        <section className="py-28 md:py-36">
          <div className="container">
            <SectionDivider className="mb-20" />

            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                <div className="md:col-span-5">
                  <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                    Insights
                  </p>
                  <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1] mb-8">
                    Liderança de
                    <br />
                    pensamento atuarial
                  </h2>
                  <p className="text-steel-light leading-[1.8] mb-10 font-light">
                    Produzimos análises aprofundadas sobre os temas que definem o futuro
                    da gestão de riscos no Brasil. Nosso conteúdo técnico é referência
                    para decisores do mercado financeiro e de saúde suplementar.
                  </p>
                  <Link
                    href="/insights"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-orange transition-colors duration-300"
                  >
                    <span className="border-b border-navy/20 group-hover:border-orange/40 transition-colors duration-300 pb-0.5">
                      Ver todos os insights
                    </span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                <div className="md:col-span-7">
                  <div className="space-y-5">
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
                      <FadeIn key={i} delay={i * 0.1} direction="left" distance={20}>
                        <Link
                          href="/insights"
                          className="group block p-7 border border-navy/6 hover:border-orange/20 transition-all duration-500 card-lift bg-white"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-3 py-1.5">
                              {article.tag}
                            </span>
                            <span className="text-[11px] text-steel-light font-light">{article.date}</span>
                          </div>
                          <h3 className="text-lg font-serif font-medium text-navy group-hover:text-orange transition-colors duration-300 tracking-tight leading-snug">
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
        <section className="py-28 md:py-36 bg-navy relative overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.04]">
            <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/50" />

          <div className="container relative z-10 text-center">
            <FadeIn>
              <SectionDivider variant="dark" className="mb-12" />
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight mb-8 leading-[1.1]">
                Encontre o seu ponto
                <br />
                de inflexão
                <span className="inflection-dot" />
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-12 leading-[1.8] font-light">
                Converse com nossos atuários sobre como podemos transformar
                a gestão de riscos da sua organização.
              </p>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-3 bg-orange text-white px-10 py-4.5 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300"
              >
                Agende uma conversa
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
