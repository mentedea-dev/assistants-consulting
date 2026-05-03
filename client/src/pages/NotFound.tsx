/*
 * PENTAGRAM CRAFT: 404 (i18n)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />
        <section className="pt-40 md:pt-52 pb-28 md:pb-36">
          <div className="container text-center">
            <FadeIn>
              <div className="text-[10rem] md:text-[16rem] font-serif text-navy/[0.03] leading-none select-none">
                404
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-3xl md:text-5xl font-serif text-navy tracking-tight -mt-16 md:-mt-24 relative z-10">
                {t("notFound.title")}
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-steel-light mt-5 max-w-md mx-auto leading-[1.8] font-light">
                {t("notFound.desc")}
              </p>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-navy text-white px-8 py-4 text-sm font-medium tracking-wide mt-10 hover:bg-navy-light transition-all duration-300"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-300" />
                {t("notFound.back")}
              </Link>
            </FadeIn>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
}
