/*
 * PENTAGRAM CRAFT: Serviços (i18n)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SplitText from "@/components/SplitText";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, TrendingUp, BarChart3,
  FileSearch, Briefcase, Users, Scale, Calculator, PieChart,
} from "lucide-react";

const HEALTH_IMG = "/manus-storage/v2_03_saude_550a80a3.webp";
const PENSION_IMG = "/manus-storage/v2_02_previdencia_cb4d1913.webp";
const BENEFITS_IMG = "/manus-storage/v2_06_beneficios_712e1ff4.webp";

export default function Servicos() {
  const { t } = useLanguage();

  const mainAreas = [
    {
      icon: Shield,
      title: t("service.health.title"),
      subtitle: t("servicesPage.health.subtitle"),
      img: HEALTH_IMG,
      description: t("servicesPage.health.desc"),
      items: [
        t("servicesPage.health.item1"), t("servicesPage.health.item2"),
        t("servicesPage.health.item3"), t("servicesPage.health.item4"),
        t("servicesPage.health.item5"), t("servicesPage.health.item6"),
      ],
    },
    {
      icon: TrendingUp,
      title: t("service.pension.title"),
      subtitle: t("servicesPage.pension.subtitle"),
      img: PENSION_IMG,
      description: t("servicesPage.pension.desc"),
      items: [
        t("servicesPage.pension.item1"), t("servicesPage.pension.item2"),
        t("servicesPage.pension.item3"), t("servicesPage.pension.item4"),
        t("servicesPage.pension.item5"), t("servicesPage.pension.item6"),
      ],
    },
    {
      icon: BarChart3,
      title: t("service.benefits.title"),
      subtitle: t("servicesPage.benefits.subtitle"),
      img: BENEFITS_IMG,
      description: t("servicesPage.benefits.desc"),
      items: [
        t("servicesPage.benefits.item1"), t("servicesPage.benefits.item2"),
        t("servicesPage.benefits.item3"), t("servicesPage.benefits.item4"),
        t("servicesPage.benefits.item5"), t("servicesPage.benefits.item6"),
      ],
    },
  ];

  const specializedServices = [
    { icon: FileSearch, title: t("service.audit.title"), desc: t("service.audit.desc") },
    { icon: Briefcase, title: t("service.duediligence.title"), desc: t("service.duediligence.desc") },
    { icon: Users, title: t("service.hr.title"), desc: t("service.hr.desc") },
    { icon: Scale, title: t("servicesPage.expertise.title"), desc: t("servicesPage.expertise.desc") },
    { icon: Calculator, title: t("servicesPage.stochastic.title"), desc: t("servicesPage.stochastic.desc") },
    { icon: PieChart, title: t("servicesPage.risk.title"), desc: t("servicesPage.risk.desc") },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <SEO title={`${t("servicesPage.tag")} — Assistants Consulting`} description={t("servicesPage.subtitle")} />
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("servicesPage.tag")}
              </p>
            </FadeIn>
            <SplitText
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-navy tracking-tight leading-[1.05] max-w-4xl"
              delay={0.2}
              stagger={0.02}
              yOffset={22}
            >
              {`${t("servicesPage.title.1")}\n${t("servicesPage.title.2")}`}
            </SplitText>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                {t("servicesPage.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Main Areas */}
        <section className="pb-28 md:pb-40">
          <div className="container">
            <div className="space-y-24 md:space-y-36">
              {mainAreas.map((area, i) => (
                <FadeIn key={i} delay={0.1} distance={40}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
                    <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden aspect-[3/2] mb-6 md:mb-0 group"
                      >
                        <img src={area.img} alt={area.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </div>
                    <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-navy/5 flex items-center justify-center">
                          <area.icon size={22} className="text-navy" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange">
                          {area.subtitle}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-normal text-navy tracking-tight mb-4 leading-tight">
                        {area.title}
                      </h2>
                      <p className="text-steel-light leading-[1.8] mb-8 font-light">{area.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                        {area.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-3 py-2.5 border-b border-navy/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                            <span className="text-sm text-navy/80 leading-relaxed font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-24">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("additionalServices.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1]">
                  {t("additionalServices.title.1")}
                  <br />
                  {t("additionalServices.title.2")}
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {specializedServices.map((service, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="group p-8 md:p-10 border border-white/6 hover:border-orange/20 transition-all duration-500 card-lift h-full">
                    <service.icon size={20} className="text-orange mb-7" strokeWidth={1.5} />
                    <h3 className="text-lg font-serif font-normal text-white mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-white/40 text-sm leading-[1.8] font-light">{service.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 md:py-36">
          <div className="container text-center">
            <SectionDivider className="mb-14" />
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif font-normal text-navy tracking-tight mb-6 leading-[1.1]">
                {t("servicesPage.cta.title")}
                <span className="inflection-dot" />
              </h2>
              <p className="text-steel-light max-w-lg mx-auto mb-12 leading-[1.8] font-light">
                {t("servicesPage.cta.desc")}
              </p>
              <Link
                href="/contato"
                className="group inline-flex items-center gap-3 bg-orange text-white px-10 py-4.5 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300"
              >
                {t("servicesPage.cta.button")}
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
