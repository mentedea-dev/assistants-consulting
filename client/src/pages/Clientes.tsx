/*
 * PENTAGRAM CRAFT: Clientes — Logo Wall com nomes reais + filtro por setor
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SplitText from "@/components/SplitText";
import CountUp from "@/components/CountUp";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { useState, useMemo } from "react";
import { Building2, Heart, Landmark, Factory, ShoppingBag, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Client data from official presentation ─── */
type ClientEntry = { name: string; category: string };

const ALL_CLIENTS: ClientEntry[] = [
  // Governo e Estatais
  { name: "Banco Central do Brasil", category: "gov" },
  { name: "Casa da Moeda do Brasil", category: "gov" },
  { name: "SERPRO", category: "gov" },
  { name: "Dataprev", category: "gov" },
  { name: "Conab", category: "gov" },
  { name: "CDHU", category: "gov" },
  { name: "CPTM", category: "gov" },
  { name: "Metrô", category: "gov" },
  { name: "Transpetro", category: "gov" },
  { name: "INB", category: "gov" },
  { name: "Nuclep", category: "gov" },
  { name: "Eletronuclear", category: "gov" },
  { name: "IPREF", category: "gov" },
  // Energia e Infraestrutura
  { name: "Eletrobras", category: "energy" },
  { name: "Eletrobras CGT Eletrosul", category: "energy" },
  { name: "CPFL Energia", category: "energy" },
  { name: "Copel", category: "energy" },
  { name: "Sabesp", category: "energy" },
  { name: "Sanepar", category: "energy" },
  { name: "CAESB", category: "energy" },
  { name: "CESAN", category: "energy" },
  { name: "Embasa", category: "energy" },
  { name: "Compagas", category: "energy" },
  { name: "Amazonas Energia", category: "energy" },
  { name: "Roraima Energia", category: "energy" },
  { name: "UEG Araucária", category: "energy" },
  // Saúde
  { name: "Unimed", category: "health" },
  { name: "Trasmontano Saúde", category: "health" },
  { name: "São Cristóvão Saúde", category: "health" },
  { name: "IMASF", category: "health" },
  // Financeiro e Previdência
  { name: "Banco do Nordeste", category: "finance" },
  { name: "CapitalPrev", category: "finance" },
  { name: "Sistel", category: "finance" },
  { name: "CIEE", category: "finance" },
  { name: "Alvarez & Marsal", category: "finance" },
  // Indústria e Multinacionais
  { name: "Grupo Carrefour Brasil", category: "industry" },
  { name: "Bridgestone", category: "industry" },
  { name: "Fujitsu", category: "industry" },
  { name: "Wacker", category: "industry" },
  { name: "Zeppelin", category: "industry" },
  { name: "Klüber Lubrication", category: "industry" },
  { name: "ChemTrend", category: "industry" },
  { name: "SunChemical", category: "industry" },
  { name: "Huf", category: "industry" },
  { name: "Eternit", category: "industry" },
  { name: "Dorma", category: "industry" },
  { name: "Isringhausen ISRI", category: "industry" },
  { name: "Metalfrio", category: "industry" },
  { name: "Santher", category: "industry" },
  { name: "SurTec", category: "industry" },
  { name: "Alsco", category: "industry" },
  { name: "Tekfor", category: "industry" },
  { name: "Prolec GE", category: "industry" },
  { name: "Oji Papéis Especiais", category: "industry" },
  { name: "Produquímica", category: "industry" },
  { name: "Racional", category: "industry" },
  { name: "Leadec Industrial Services", category: "industry" },
  // Serviços e Tecnologia
  { name: "Grupo Silvio Santos", category: "services" },
  { name: "Netshoes", category: "services" },
  { name: "Protege", category: "services" },
  { name: "Dia %", category: "services" },
  { name: "Cultura", category: "services" },
  { name: "ITOCHU Corporation", category: "services" },
  // Atuação Internacional
  { name: "Banco de Cabo Verde", category: "international" },
  { name: "ITOCHU Corporation", category: "international" },
];

// Deduplicate by name
const UNIQUE_CLIENTS = ALL_CLIENTS.filter(
  (c, i, arr) => arr.findIndex((x) => x.name === c.name) === i
);

const CATEGORIES = [
  { key: "all", icon: null },
  { key: "gov", icon: Landmark },
  { key: "energy", icon: Zap },
  { key: "health", icon: Heart },
  { key: "finance", icon: Building2 },
  { key: "industry", icon: Factory },
  { key: "services", icon: ShoppingBag },
  { key: "international", icon: Globe },
] as const;

export default function Clientes() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredClients = useMemo(() => {
    if (activeCategory === "all") return UNIQUE_CLIENTS;
    return ALL_CLIENTS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const sectors = [
    { icon: Landmark, name: t("clients.sector1.name"), desc: t("clients.sector1.desc") },
    { icon: Heart, name: t("clients.sector2.name"), desc: t("clients.sector2.desc") },
    { icon: Factory, name: t("clients.sector3.name"), desc: t("clients.sector3.desc") },
    { icon: Building2, name: t("clients.sector4.name"), desc: t("clients.sector4.desc") },
    { icon: ShoppingBag, name: t("clients.sector5.name"), desc: t("clients.sector5.desc") },
    { icon: Zap, name: t("clients.sector6.name"), desc: t("clients.sector6.desc") },
  ];

  const testimonials = [
    { quote: t("clients.testimonial1.quote"), author: t("clients.testimonial1.author"), company: t("clients.testimonial1.company") },
    { quote: t("clients.testimonial2.quote"), author: t("clients.testimonial2.author"), company: t("clients.testimonial2.company") },
    { quote: t("clients.testimonial3.quote"), author: t("clients.testimonial3.author"), company: t("clients.testimonial3.company") },
  ];

  const stats = [
    { value: 200, suffix: "+", label: t("clients.stat1") },
    { value: 12, suffix: "+", label: t("clients.stat2") },
    { value: 90, suffix: "%", label: t("clients.stat3") },
    { value: 35, suffix: "+", label: t("clients.stat4") },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <SEO title={`${t("clients.tag")} — Assistants Consulting`} description={t("clients.subtitle")} />
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("clients.tag")}
              </p>
            </FadeIn>
            <SplitText
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-navy tracking-tight leading-[1.05] max-w-4xl"
              delay={0.2}
              stagger={0.02}
              yOffset={22}
            >
              {`${t("clients.title.1")}\n${t("clients.title.2")}`}
            </SplitText>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                {t("clients.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-navy py-20 md:py-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.12} className="text-center md:text-left">
                  <div className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight">
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

        {/* ═══════ CLIENT LOGO WALL ═══════ */}
        <section className="py-28 md:py-36">
          <div className="container">
            <FadeIn>
              <div className="max-w-3xl mb-12 md:mb-16">
                <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("clients.logowall.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight leading-[1.1]">
                  {t("clients.logowall.title.1")}
                  <br />
                  {t("clients.logowall.title.2")}
                </h2>
                <p className="text-steel-light text-base max-w-2xl mt-6 leading-[1.8] font-light">
                  {t("clients.logowall.subtitle")}
                </p>
              </div>
            </FadeIn>

            {/* Category filter */}
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wide transition-all duration-300 border ${
                        isActive
                          ? "bg-navy text-white border-navy"
                          : "bg-transparent text-steel border-navy/10 hover:border-navy/25 hover:text-navy"
                      }`}
                    >
                      {CatIcon && <CatIcon size={13} strokeWidth={1.5} />}
                      {t(`clients.cat.${cat.key}`)}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* Client name grid */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-navy/6"
            >
              <AnimatePresence mode="popLayout">
                {filteredClients.map((client) => (
                  <motion.div
                    key={client.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white p-5 md:p-6 flex items-center justify-center text-center group hover:bg-navy/[0.02] transition-colors duration-300"
                  >
                    <span className="text-[13px] md:text-sm font-medium text-navy/70 group-hover:text-navy transition-colors duration-300 leading-snug">
                      {client.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Client count badge */}
            <FadeIn delay={0.2}>
              <div className="mt-8 text-center">
                <span className="text-xs text-steel-light uppercase tracking-wide font-medium">
                  {filteredClients.length} {activeCategory === "all" ? "organizações" : "organizações neste setor"}
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("clients.sectors.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight leading-[1.1]">
                  {t("clients.sectors.title.1")}
                  <br />
                  {t("clients.sectors.title.2")}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sectors.map((sector, i) => (
                <FadeIn key={sector.name} delay={i * 0.08}>
                  <div className="group p-8 md:p-9 bg-linen border border-navy/5 hover:border-navy/15 transition-all duration-500 card-lift h-full">
                    <div className="w-11 h-11 bg-navy/4 flex items-center justify-center mb-6">
                      <sector.icon size={20} className="text-navy" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-serif text-navy tracking-tight mb-3">
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
        <section className="py-24 md:py-32 bg-linen">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("clients.testimonials.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight leading-[1.1]">
                  {t("clients.testimonials.title")}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {testimonials.map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="relative p-8 md:p-10 bg-white border border-navy/6 h-full flex flex-col card-lift">
                    <span className="absolute top-6 right-8 text-6xl font-serif text-navy/8 leading-none select-none">&ldquo;</span>
                    <p className="text-navy/75 text-[15px] leading-[1.9] font-light flex-1 relative z-10 italic">
                      &ldquo;{testimonial.quote}&rdquo;
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
