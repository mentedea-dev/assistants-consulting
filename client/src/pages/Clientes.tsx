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
  { name: "Casa da Moeda do Brasil", category: "gov", logo: "/logos/casa-moeda.png", acronym: "CMB" },
  { name: "SERPRO", category: "gov", logo: "/logos/serpro.png", acronym: "SPR" },
  { name: "Dataprev", category: "gov", logo: "/logos/dataprev.png", acronym: "DTP" },
  { name: "Conab", category: "gov", logo: "/logos/conab.png", acronym: "CNB" },
  { name: "CDHU", category: "gov", logo: "/logos/cdhu.png", acronym: "CDH" },
  { name: "CPTM", category: "gov", logo: "/logos/cptm.png", acronym: "CPT" },
  { name: "Metrô", category: "gov", logo: "/logos/metro-sp.png", acronym: "MTR" },
  { name: "Transpetro", category: "gov", logo: "/logos/transpetro.png", acronym: "TRP" },
  { name: "INB", category: "gov", logo: "/logos/inb.png", acronym: "INB" },
  { name: "Nuclep", category: "gov", acronym: "NCP" },
  { name: "Eletronuclear", category: "gov", logo: "/logos/eletronuclear.png", acronym: "ENL" },
  { name: "IPREF", category: "gov", acronym: "IPR" },
  // Energia e Infraestrutura
  { name: "Eletrobras", category: "energy", logo: "/logos/eletrobras.png", acronym: "EBR" },
  { name: "Eletrobras CGT Eletrosul", category: "energy", logo: "/logos/eletrobras.png", acronym: "ELS" },
  { name: "CPFL Energia", category: "energy", logo: "/logos/cpfl.png", acronym: "CPF" },
  { name: "Copel", category: "energy", logo: "/logos/copel.png", acronym: "CPL" },
  { name: "Sabesp", category: "energy", logo: "/logos/sabesp.png", acronym: "SBS" },
  { name: "Sanepar", category: "energy", logo: "/logos/sanepar.png", acronym: "SNP" },
  { name: "CAESB", category: "energy", logo: "/logos/caesb.png", acronym: "CSB" },
  { name: "CESAN", category: "energy", logo: "/logos/cesan.png", acronym: "CSN" },
  { name: "Embasa", category: "energy", logo: "/logos/embasa.png", acronym: "EMB" },
  { name: "Compagas", category: "energy", logo: "/logos/compagas.png", acronym: "CPG" },
  { name: "Amazonas Energia", category: "energy", acronym: "AME" },
  { name: "Roraima Energia", category: "energy", acronym: "RRE" },
  { name: "UEG Araucária", category: "energy", acronym: "UEG" },
  // Saúde
  { name: "Unimed", category: "health", logo: "/logos/unimed.png", acronym: "UNI" },
  { name: "Trasmontano Saúde", category: "health", logo: "/logos/trasmontano.png", acronym: "TRS" },
  { name: "São Cristóvão Saúde", category: "health", logo: "/logos/sao-cristovao.png", acronym: "SCS" },
  { name: "IMASF", category: "health", acronym: "IMS" },
  // Financeiro e Previdência
  { name: "Banco do Brasil", category: "finance", logo: "/logos/banco-brasil.png", acronym: "BB" },
  { name: "Caixa Econômica Federal", category: "finance", logo: "/logos/caixa.png", acronym: "CEF" },
  { name: "Banco do Nordeste", category: "finance", logo: "/logos/banco-nordeste.png", acronym: "BNB" },
  { name: "Fundação Itaú Unibanco", category: "finance", logo: "/logos/itau-unibanco.png", acronym: "ITU" },
  { name: "Fundação Cesp (Vivest)", category: "finance", logo: "/logos/fundacao-cesp.png", acronym: "VVS" },
  { name: "Real Grandeza", category: "finance", logo: "/logos/real-grandeza.png", acronym: "FRG" },
  { name: "Petros", category: "finance", logo: "/logos/petros.png", acronym: "PTR" },
  { name: "Previ", category: "finance", logo: "/logos/previ.png", acronym: "PRV" },
  { name: "CapitalPrev", category: "finance", acronym: "CPV" },
  { name: "Sistel", category: "finance", logo: "/logos/sistel.png", acronym: "SST" },
  { name: "CIEE", category: "finance", logo: "/logos/ciee.png", acronym: "CIE" },
  { name: "Alvarez & Marsal", category: "finance", logo: "/logos/alvarez-marsal.png", acronym: "A&M" },
  // Indústria e Multinacionais
  { name: "Grupo Carrefour Brasil", category: "industry", logo: "/logos/carrefour.png", acronym: "CRF" },
  { name: "Bridgestone", category: "industry", logo: "/logos/bridgestone.png", acronym: "BRG" },
  { name: "Fujitsu", category: "industry", logo: "/logos/fujitsu.png", acronym: "FJT" },
  { name: "Wacker", category: "industry", logo: "/logos/wacker.png", acronym: "WCK" },
  { name: "Zeppelin", category: "industry", logo: "/logos/zeppelin.png", acronym: "ZPP" },
  { name: "Klüber Lubrication", category: "industry", logo: "/logos/kluber.png", acronym: "KLB" },
  { name: "ChemTrend", category: "industry", logo: "/logos/chem-trend.png", acronym: "CHT" },
  { name: "SunChemical", category: "industry", logo: "/logos/sun-chemical.png", acronym: "SCH" },
  { name: "Huf", category: "industry", logo: "/logos/huf.png", acronym: "HUF" },
  { name: "Eternit", category: "industry", logo: "/logos/eternit.png", acronym: "ETN" },
  { name: "Dorma", category: "industry", logo: "/logos/dorma.png", acronym: "DRM" },
  { name: "Isringhausen ISRI", category: "industry", logo: "/logos/isringhausen.png", acronym: "ISR" },
  { name: "Metalfrio", category: "industry", logo: "/logos/metalfrio.png", acronym: "MTF" },
  { name: "Santher", category: "industry", logo: "/logos/santher.png", acronym: "STH" },
  { name: "SurTec", category: "industry", logo: "/logos/surtec.png", acronym: "STC" },
  { name: "Alsco", category: "industry", logo: "/logos/alsco.png", acronym: "ALS" },
  { name: "Tekfor", category: "industry", logo: "/logos/tekfor.png", acronym: "TKF" },
  { name: "Prolec GE", category: "industry", logo: "/logos/prolec-ge.png", acronym: "PLG" },
  { name: "Goodyear", category: "industry", logo: "/logos/goodyear.png", acronym: "GDY" },
  { name: "Syngenta", category: "industry", logo: "/logos/syngenta.png", acronym: "SYN" },
  { name: "Reckitt Benckiser", category: "industry", logo: "/logos/reckitt.png", acronym: "RKT" },
  { name: "Racional", category: "industry", logo: "/logos/racional.png", acronym: "RCN" },
  { name: "Leadec Industrial Services", category: "industry", logo: "/logos/leadec.png", acronym: "LDC" },
  // Serviços e Tecnologia
  { name: "Grupo Silvio Santos", category: "services", logo: "/logos/grupo-silvio-santos.png", acronym: "GSS" },
  { name: "Netshoes", category: "services", logo: "/logos/netshoes.png", acronym: "NTS" },
  { name: "Protege", category: "services", acronym: "PTG" },
  { name: "Dia %", category: "services", logo: "/logos/dia.png", acronym: "DIA" },
  { name: "ITOCHU Corporation", category: "services", logo: "/logos/itochu.png", acronym: "ITC" },
  // Atuação Internacional
  { name: "Banco de Cabo Verde", category: "international", acronym: "BCV" },
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
                  <p className="text-xs text-white/70 mt-3 tracking-wide uppercase font-medium">
                    {stat.label}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Wall */}
        <section className="py-24 md:py-32">
          <div className="container">
            <SectionDivider className="mb-16" />
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                <div>
                  <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-3">
                    {t("clients.logowall.tag")}
                  </p>
                  <h2 className="text-2xl md:text-4xl font-serif text-navy tracking-tight">
                    {t("clients.logowall.title.1")} {t("clients.logowall.title.2")}
                  </h2>
                </div>
                {/* Category filter */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wider border transition-all duration-300 ${
                          isActive
                            ? "bg-navy text-white border-navy"
                            : "bg-white text-steel border-navy/10 hover:border-navy/30"
                        }`}
                      >
                        {Icon && <Icon size={13} />}
                        {t(`clients.cat.${cat.key}`)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              <AnimatePresence mode="popLayout">
                {filteredClients.map((client) => (
                  <ClientLogoCard key={client.name} client={client} />
                ))}
              </AnimatePresence>
            </motion.div>

            <FadeIn delay={0.2}>
              <p className="text-center text-steel/60 text-xs mt-10 tracking-wide">
                {t("clients.logowall.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <FadeIn>
              <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                {t("clients.sectors.tag")}
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight leading-[1.1] mb-16 max-w-2xl">
                {t("clients.sectors.title.1")} {t("clients.sectors.title.2")}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sectors.map((sector, i) => (
                <FadeIn key={sector.name} delay={i * 0.08}>
                  <div className="group p-8 border border-navy/6 hover:border-orange/20 hover:shadow-lg transition-all duration-500 bg-linen/50">
                    <div className="w-11 h-11 flex items-center justify-center bg-navy/5 group-hover:bg-orange/10 transition-colors duration-500 mb-6">
                      <sector.icon size={20} className="text-navy group-hover:text-orange transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-serif text-navy mb-3 tracking-tight">{sector.name}</h3>
                    <p className="text-steel text-sm leading-[1.7] font-light">{sector.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="container">
            <FadeIn>
              <p className="text-white/60 text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                {t("clients.testimonials.tag")}
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-[1.1] mb-16 max-w-2xl">
                {t("clients.testimonials.title")}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="p-8 md:p-10 border border-white/8 hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                    <p className="text-white/80 text-sm leading-[1.8] font-light flex-1 italic mb-8">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-white font-medium text-sm">{t.author}</p>
                      <p className="text-white/50 text-xs mt-1">{t.company}</p>
                    </div>
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
