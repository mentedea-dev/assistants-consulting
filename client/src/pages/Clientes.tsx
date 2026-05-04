/*
 * INTERBRAND CRAFT: Clientes — Logo Wall com logos reais + monograma SVG de fallback
 * Padrão McKinsey/Oliver Wyman: grid animado, filtro por setor, hover reveal com tooltip
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

/* ─── Client data with logo paths ─── */
type ClientEntry = {
  name: string;
  category: string;
  logo?: string;
  acronym?: string;
};

const ALL_CLIENTS: ClientEntry[] = [
  // Governo e Estatais
  { name: "Banco Central do Brasil", category: "gov", logo: "/logos/banco-central.png", acronym: "BCB" },
  { name: "Casa da Moeda do Brasil", category: "gov", acronym: "CMB" },
  { name: "SERPRO", category: "gov", logo: "/logos/serpro.png", acronym: "SPR" },
  { name: "Dataprev", category: "gov", logo: "/logos/dataprev.png", acronym: "DTP" },
  { name: "Conab", category: "gov", acronym: "CNB" },
  { name: "CDHU", category: "gov", acronym: "CDH" },
  { name: "CPTM", category: "gov", acronym: "CPT" },
  { name: "Metrô", category: "gov", acronym: "MTR" },
  { name: "Transpetro", category: "gov", acronym: "TRP" },
  { name: "INB", category: "gov", acronym: "INB" },
  { name: "Nuclep", category: "gov", acronym: "NCP" },
  { name: "Eletronuclear", category: "gov", acronym: "ENL" },
  { name: "IPREF", category: "gov", acronym: "IPR" },
  // Energia e Infraestrutura
  { name: "Eletrobras", category: "energy", logo: "/logos/eletrobras.png", acronym: "EBR" },
  { name: "Eletrobras CGT Eletrosul", category: "energy", acronym: "ELS" },
  { name: "CPFL Energia", category: "energy", logo: "/logos/cpfl.png", acronym: "CPF" },
  { name: "Copel", category: "energy", logo: "/logos/copel.png", acronym: "CPL" },
  { name: "Sabesp", category: "energy", logo: "/logos/sabesp.png", acronym: "SBS" },
  { name: "Sanepar", category: "energy", logo: "/logos/sanepar.png", acronym: "SNP" },
  { name: "CAESB", category: "energy", acronym: "CSB" },
  { name: "CESAN", category: "energy", acronym: "CSN" },
  { name: "Embasa", category: "energy", acronym: "EMB" },
  { name: "Compagas", category: "energy", acronym: "CPG" },
  { name: "Amazonas Energia", category: "energy", acronym: "AME" },
  { name: "Roraima Energia", category: "energy", acronym: "RRE" },
  { name: "UEG Araucária", category: "energy", acronym: "UEG" },
  // Saúde
  { name: "Unimed", category: "health", logo: "/logos/unimed.png", acronym: "UNI" },
  { name: "Trasmontano Saúde", category: "health", acronym: "TRS" },
  { name: "São Cristóvão Saúde", category: "health", acronym: "SCS" },
  { name: "IMASF", category: "health", acronym: "IMS" },
  // Financeiro e Previdência
  { name: "Banco do Nordeste", category: "finance", logo: "/logos/banco-nordeste.png", acronym: "BNB" },
  { name: "CapitalPrev", category: "finance", acronym: "CPV" },
  { name: "Sistel", category: "finance", acronym: "SST" },
  { name: "CIEE", category: "finance", acronym: "CIE" },
  { name: "Alvarez & Marsal", category: "finance", logo: "/logos/alvarez-marsal.png", acronym: "A&M" },
  // Indústria e Multinacionais
  { name: "Grupo Carrefour Brasil", category: "industry", logo: "/logos/carrefour.png", acronym: "CRF" },
  { name: "Bridgestone", category: "industry", logo: "/logos/bridgestone.png", acronym: "BRG" },
  { name: "Fujitsu", category: "industry", logo: "/logos/fujitsu.png", acronym: "FJT" },
  { name: "Wacker", category: "industry", logo: "/logos/wacker.png", acronym: "WCK" },
  { name: "Zeppelin", category: "industry", acronym: "ZPP" },
  { name: "Klüber Lubrication", category: "industry", acronym: "KLB" },
  { name: "ChemTrend", category: "industry", acronym: "CHT" },
  { name: "SunChemical", category: "industry", acronym: "SCH" },
  { name: "Huf", category: "industry", acronym: "HUF" },
  { name: "Eternit", category: "industry", acronym: "ETN" },
  { name: "Dorma", category: "industry", acronym: "DRM" },
  { name: "Isringhausen ISRI", category: "industry", acronym: "ISR" },
  { name: "Metalfrio", category: "industry", acronym: "MTF" },
  { name: "Santher", category: "industry", acronym: "STH" },
  { name: "SurTec", category: "industry", acronym: "STC" },
  { name: "Alsco", category: "industry", acronym: "ALS" },
  { name: "Tekfor", category: "industry", acronym: "TKF" },
  { name: "Prolec GE", category: "industry", acronym: "PLG" },
  { name: "Oji Papéis Especiais", category: "industry", acronym: "OJI" },
  { name: "Produquímica", category: "industry", acronym: "PDQ" },
  { name: "Racional", category: "industry", acronym: "RCN" },
  { name: "Leadec Industrial Services", category: "industry", acronym: "LDC" },
  // Serviços e Tecnologia
  { name: "Grupo Silvio Santos", category: "services", acronym: "GSS" },
  { name: "Netshoes", category: "services", acronym: "NTS" },
  { name: "Protege", category: "services", acronym: "PTG" },
  { name: "Dia %", category: "services", acronym: "DIA" },
  { name: "Cultura", category: "services", acronym: "CLT" },
  { name: "ITOCHU Corporation", category: "services", logo: "/logos/itochu.png", acronym: "ITC" },
  // Atuação Internacional
  { name: "Banco de Cabo Verde", category: "international", acronym: "BCV" },
  { name: "ITOCHU Corporation", category: "international", logo: "/logos/itochu.png", acronym: "ITC" },
];

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

/* ─── Monogram SVG fallback — padrão consultoria premium ─── */
function ClientMonogram({ name, acronym }: { name: string; acronym: string }) {
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  const bg = `hsl(${hue}, 10%, 95%)`;
  const fg = `hsl(${hue}, 22%, 30%)`;
  return (
    <svg viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label={name}>
      <rect width="140" height="70" fill={bg} />
      <text
        x="70" y="43"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontWeight="600"
        fontSize="19"
        letterSpacing="3"
        fill={fg}
      >
        {acronym}
      </text>
    </svg>
  );
}

/* ─── Logo card com fallback gracioso e tooltip ─── */
function ClientLogoCard({ client }: { client: ClientEntry }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showLogo = client.logo && !imgFailed;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="bg-white border border-navy/6 hover:border-orange/30 transition-all duration-400 group overflow-hidden relative"
      style={{ aspectRatio: "2/1" }}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        {showLogo ? (
          <img
            src={client.logo}
            alt={client.name}
            onError={() => setImgFailed(true)}
            className="max-h-9 max-w-[75%] object-contain filter grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ClientMonogram
              name={client.name}
              acronym={client.acronym || client.name.slice(0, 3).toUpperCase()}
            />
          </div>
        )}
      </div>
      {/* Tooltip reveal no hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-navy py-1.5 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[10px] font-medium text-white/90 text-center truncate tracking-wide">
          {client.name}
        </p>
      </div>
    </motion.div>
  );
}

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
              delay={0.2} stagger={0.02} yOffset={22}
            >
              {`${t("clients.title.1")}\n${t("clients.title.2")}`}
            </SplitText>
            <FadeIn delay={0.3}>
              <p className="text-steel text-lg max-w-2xl mt-8 leading-[1.8] font-light">
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
                  <p className="text-xs text-white/70 mt-3 tracking-wide uppercase font-medium">{stat.label}</p>
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
                  {t("clients.logowall.title.1")}<br />{t("clients.logowall.title.2")}
                </h2>
                <p className="text-steel text-base max-w-2xl mt-6 leading-[1.8] font-light">
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
                          : "bg-white text-navy/60 border-navy/15 hover:border-navy/40 hover:text-navy"
                      }`}
                    >
                      {CatIcon && <CatIcon size={11} />}
                      {t(`clients.cat.${cat.key}`)}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* Logo Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredClients.map((client) => (
                  <ClientLogoCard key={client.name} client={client} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Client count */}
            <FadeIn delay={0.2}>
              <div className="mt-10 flex items-center gap-3">
                <div className="h-px flex-1 bg-navy/8" />
                <span className="text-xs text-steel uppercase tracking-[0.2em] font-medium px-4">
                  {filteredClients.length}{" "}
                  {activeCategory === "all" ? "organizações" : "organizações neste setor"}
                </span>
                <div className="h-px flex-1 bg-navy/8" />
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
                  {t("clients.sectors.title.1")}<br />{t("clients.sectors.title.2")}
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
                    <h3 className="text-lg font-serif text-navy tracking-tight mb-3">{sector.name}</h3>
                    <p className="text-steel text-sm leading-[1.8] font-light">{sector.desc}</p>
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
                      <p className="text-xs text-steel mt-1 font-light">{testimonial.company}</p>
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
