/*
 * PENTAGRAM CRAFT: Clientes (i18n)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { Building2, Heart, Landmark, Factory, ShoppingBag, Zap } from "lucide-react";

export default function Clientes() {
  const { t } = useLanguage();

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
    { value: 97, suffix: "%", label: t("clients.stat3") },
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
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("clients.tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                {t("clients.title.1")}
                <br />
                <span className="text-steel-light">{t("clients.title.2")}</span>
              </h1>
            </FadeIn>
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
                  <div className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight">
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

        {/* Sectors */}
        <section className="py-28 md:py-36">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("clients.sectors.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  {t("clients.sectors.title.1")}
                  <br />
                  {t("clients.sectors.title.2")}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sectors.map((sector, i) => (
                <FadeIn key={sector.name} delay={i * 0.08}>
                  <div className="group p-8 md:p-9 bg-white border border-navy/5 hover:border-orange/20 transition-all duration-500 card-lift h-full">
                    <div className="w-11 h-11 bg-navy/4 flex items-center justify-center mb-6">
                      <sector.icon size={20} className="text-navy" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-navy tracking-tight mb-3">
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
        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <FadeIn>
              <div className="max-w-2xl mb-16 md:mb-20">
                <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-5">
                  {t("clients.testimonials.tag")}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  {t("clients.testimonials.title")}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {testimonials.map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="relative p-8 md:p-10 border border-navy/6 h-full flex flex-col card-lift">
                    <span className="absolute top-6 right-8 text-6xl font-serif text-orange/10 leading-none select-none">&ldquo;</span>
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
