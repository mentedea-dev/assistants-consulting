/*
 * PENTAGRAM CRAFT: Sobre (i18n)
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
import { motion } from "framer-motion";
import { Target, Eye, Gem, Scale, Award, BookOpen } from "lucide-react";
import BrandSymbol from "@/components/BrandSymbol";

const TEXTURE_IMG = "/manus-storage/v2_10_institucional_42ba4921.webp";
const EQUIPE_IMG = "/manus-storage/v2_09_equipe_0ae78527.webp";

export default function Sobre() {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: t("about.value1.title"), desc: t("about.value1.desc") },
    { icon: Eye, title: t("about.value2.title"), desc: t("about.value2.desc") },
    { icon: Scale, title: t("about.value3.title"), desc: t("about.value3.desc") },
    { icon: Gem, title: t("about.value4.title"), desc: t("about.value4.desc") },
  ];

  const milestones = [
    { year: "1991", event: t("about.milestone1") },
    { year: "2000", event: t("about.milestone2") },
    { year: "2008", event: t("about.milestone3") },
    { year: "2015", event: t("about.milestone4") },
    { year: "2020", event: t("about.milestone5") },
    { year: "2026", event: t("about.milestone6") },
  ];

  const credentials = [
    { icon: Award, label: t("about.credential1") },
    { icon: BookOpen, label: t("about.credential2") },
    { icon: Scale, label: t("about.credential3") },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <SEO title={`${t("about.tag")} — Assistants Consulting`} description={t("about.para1").slice(0, 160)} />
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("about.tag")}
              </p>
            </FadeIn>
            <SplitText
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-navy tracking-tight leading-[1.05] max-w-4xl"
              delay={0.2}
              stagger={0.02}
              yOffset={22}
            >
              {`${t("about.title.1")}\n${t("about.title.2")}`}
            </SplitText>
          </div>
        </section>

        {/* Narrative + Stats */}
        <section className="pb-28 md:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
              <FadeIn className="md:col-span-7">
                <div className="space-y-7">
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">{t("about.para1")}</p>
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">{t("about.para2")}</p>
                  <p className="text-lg text-navy/80 leading-[1.9] font-light">{t("about.para3")}</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="md:col-span-5">
                <div className="relative">
                  <div className="absolute inset-0 opacity-30 overflow-hidden">
                    <img src={TEXTURE_IMG} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative p-10 md:p-12 border border-navy/8">
                    <div className="space-y-10">
                      {[
                        { value: 35, suffix: "+", label: t("stats.years") },
                        { value: 200, suffix: "+", label: t("stats.clients") },
                        { value: 50, suffix: "bi+", prefix: "R$", label: t("stats.assets") },
                      ].map((stat, i) => (
                        <div key={stat.label}>
                          <div className="text-4xl md:text-5xl font-serif text-navy tracking-tight">
                            <CountUp end={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} duration={2.5} />
                          </div>
                          <p className="text-xs text-steel-light mt-2 uppercase tracking-wide font-medium">{stat.label}</p>
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
                <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("about.values.title")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight leading-[1.1]">
                  {t("about.values.heading")}
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {values.map((value, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-navy/4 flex items-center justify-center shrink-0">
                      <value.icon size={20} className="text-navy" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-navy tracking-tight mb-3">{value.title}</h3>
                      <p className="text-steel-light text-sm leading-[1.8] font-light">{value.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Team Image */}
        <section className="py-16 md:py-20">
          <div className="container">
            <FadeIn>
              <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
                <img
                  src={EQUIPE_IMG}
                  alt={t("about.team.alt")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
          {/* Brand Symbol — DOMINANT */}
          <div className="absolute right-[-10%] md:right-[2%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
            <div className="relative">
              <div className="absolute inset-0 blur-[60px] bg-orange/6 rounded-full scale-75" />
              <BrandSymbol variant="light" className="w-[300px] md:w-[420px] lg:w-[500px] h-auto opacity-[0.10]" drawReveal dotPulse />
            </div>
          </div>
          <div className="container relative z-10">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("about.timeline.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-[1.1]">
                  {t("about.timeline.title")}
                </h2>
              </div>
            </FadeIn>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/8 md:-translate-x-px" />
              <div className="space-y-14">
                {milestones.map((milestone, i) => (
                  <FadeIn key={milestone.year} delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"} distance={20}>
                    <div className={`relative flex items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <motion.div
                        className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-navy -translate-x-1/2 mt-1.5 z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                      />
                      <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                        <span className="text-2xl font-serif text-navy">{milestone.year}</span>
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
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-7 border border-navy/6 card-lift">
                    <cred.icon size={18} className="text-navy shrink-0 mt-0.5" strokeWidth={1.5} />
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
