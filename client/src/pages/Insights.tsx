/*
 * PENTAGRAM CRAFT: Insights / Notícias (i18n)
 * - Filtros por categoria/tag
 * - Busca por título
 * - Paginação
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SplitText from "@/components/SplitText";
import SectionDivider from "@/components/SectionDivider";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { ArrowRight, Loader2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

const ARTICLES_PER_PAGE = 9;

function getStaticArticles(t: (key: string) => string) {
  return [
    {
      tag: "CPC 33",
      title: t("articles.static.1.title"),
      excerpt: t("articles.static.1.excerpt"),
      date: t("articles.static.1.date"),
      readTime: "12 min",
    },
    {
      tag: t("articles.static.2.tag"),
      title: t("articles.static.2.title"),
      excerpt: t("articles.static.2.excerpt"),
      date: t("articles.static.2.date"),
      readTime: "9 min",
    },
    {
      tag: t("articles.static.3.tag"),
      title: t("articles.static.3.title"),
      excerpt: t("articles.static.3.excerpt"),
      date: t("articles.static.3.date"),
      readTime: "11 min",
    },
    {
      tag: t("articles.static.4.tag"),
      title: t("articles.static.4.title"),
      excerpt: t("articles.static.4.excerpt"),
      date: t("articles.static.4.date"),
      readTime: "14 min",
    },
    {
      tag: "Analytics",
      title: t("articles.static.5.title"),
      excerpt: t("articles.static.5.excerpt"),
      date: t("articles.static.5.date"),
      readTime: "10 min",
    },
    {
      tag: "M&A",
      title: t("articles.static.6.title"),
      excerpt: t("articles.static.6.excerpt"),
      date: t("articles.static.6.date"),
      readTime: "8 min",
    },
  ];
}

export default function Insights() {
  const { t, locale } = useLanguage();
  const { data: dbArticles, isLoading } = trpc.articles.list.useQuery({ status: "published" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success(t("insightsPage.newsletter.success"));
      setNewsletterEmail("");
    },
    onError: () => {
      toast.error(t("insightsPage.newsletter.error"));
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      subscribeMutation.mutate({ email: newsletterEmail });
    }
  };

  const staticArticles = getStaticArticles(t);
  const displayArticles = dbArticles && dbArticles.length > 0
    ? dbArticles.map(a => ({
        tag: a.tag || "Insight",
        title: a.title,
        excerpt: a.excerpt || "",
        date: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "pt-BR", { month: "long", year: "numeric" }) : "",
        readTime: a.readTime || "5 min",
        slug: a.slug,
      }))
    : staticArticles;

  // Extract unique tags for filter
  const allTags = useMemo(() => {
    const tags = displayArticles.map(a => a.tag).filter(Boolean);
    return Array.from(new Set(tags));
  }, [displayArticles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    let articles = displayArticles;
    if (selectedTag !== "all") {
      articles = articles.filter(a => a.tag === selectedTag);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q)
      );
    }
    return articles;
  }, [displayArticles, selectedTag, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const featured = selectedTag === "all" && !searchQuery.trim() && currentPage === 1
    ? paginatedArticles[0]
    : null;
  const gridArticles = featured ? paginatedArticles.slice(1) : paginatedArticles;

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <SEO title={`${t("insightsPage.tag")} — Assistants Consulting`} description={t("insightsPage.subtitle")} />
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-16 md:pb-20">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("insightsPage.tag")}
              </p>
            </FadeIn>
            <SplitText
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-navy tracking-tight leading-[1.05] max-w-4xl"
              delay={0.2}
              stagger={0.02}
              yOffset={22}
            >
              {`${t("insightsPage.title.1")}\n${t("insightsPage.title.2")}`}
            </SplitText>
            <FadeIn delay={0.3}>
              <p className="text-steel-light text-lg max-w-2xl mt-8 leading-[1.8] font-light">
                {t("insightsPage.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="pb-10 md:pb-14">
          <div className="container">
            <FadeIn delay={0.4}>
              <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                {/* Category filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={14} className="text-steel-light mr-1" />
                  <button
                    onClick={() => handleTagChange("all")}
                    className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                      selectedTag === "all"
                        ? "bg-navy text-white"
                        : "bg-white border border-navy/10 text-steel-light hover:border-orange/30 hover:text-navy"
                    }`}
                  >
                    {locale === "pt" ? "Todos" : "All"}
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagChange(tag)}
                      className={`px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                        selectedTag === tag
                          ? "bg-orange text-white"
                          : "bg-white border border-navy/10 text-steel-light hover:border-orange/30 hover:text-navy"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-light" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={locale === "pt" ? "Buscar artigos..." : "Search articles..."}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-navy/10 text-sm text-navy placeholder:text-steel-light/50 focus:border-orange/40 focus:ring-0 outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Featured article */}
        {featured && (
          <section className="pb-20 md:pb-28">
            <div className="container">
              <FadeIn distance={30}>
                <motion.div
                  className="relative bg-navy overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }} />

                  <div className="relative p-10 md:p-16 lg:p-20">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-navy bg-orange px-3 py-1.5">
                          {featured.tag}
                        </span>
                        <span className="text-[11px] text-white/35 font-light">{featured.date}</span>
                        <span className="text-[11px] text-white/35 font-light">{featured.readTime} {t("insightsPage.readTime")}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-[1.1] mb-8">
                        {featured.title}
                      </h2>
                      <p className="text-white/45 leading-[1.8] mb-10 max-w-2xl font-light text-lg">
                        {featured.excerpt}
                      </p>
                      {(featured as any).slug ? (
                        <Link
                          href={`/insights/${(featured as any).slug}`}
                          className="group/btn inline-flex items-center gap-3 text-orange text-sm font-medium hover:text-orange-light transition-colors duration-300"
                        >
                          <span className="border-b border-orange/30 group-hover/btn:border-orange/60 pb-0.5 transition-colors duration-300">
                            {t("insightsPage.readFull")}
                          </span>
                          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      ) : (
                        <span className="group/btn inline-flex items-center gap-3 text-orange text-sm font-medium">
                          <span className="border-b border-orange/30 pb-0.5">
                            {t("insightsPage.readFull")}
                          </span>
                          <ArrowRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          </section>
        )}

        {!featured && <SectionDivider className="mb-16" />}
        {featured && <SectionDivider className="mb-16" />}

        {/* Articles grid */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-orange" />
              </div>
            ) : gridArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-steel-light text-lg font-light">
                  {locale === "pt" ? "Nenhum artigo encontrado." : "No articles found."}
                </p>
                {(selectedTag !== "all" || searchQuery) && (
                  <button
                    onClick={() => { setSelectedTag("all"); setSearchQuery(""); }}
                    className="mt-4 text-orange text-sm font-medium hover:text-orange-light transition-colors"
                  >
                    {locale === "pt" ? "Limpar filtros" : "Clear filters"}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {gridArticles.map((article, i) => (
                  <FadeIn key={i} delay={i * 0.06}>
                    <Link href={(article as any).slug ? `/insights/${(article as any).slug}` : "#"} className="block h-full">
                      <article className="group bg-white border border-navy/5 hover:border-orange/15 transition-all duration-500 card-lift h-full flex flex-col cursor-pointer">
                        <div className="p-8 md:p-9 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-5">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-3 py-1.5">
                              {article.tag}
                            </span>
                            <span className="text-[11px] text-steel-light font-light">{article.date}</span>
                          </div>
                          <h3 className="text-lg font-serif text-navy tracking-tight leading-snug mb-4 group-hover:text-orange transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-steel-light text-sm leading-[1.8] font-light flex-1">
                            {article.excerpt}
                          </p>
                          <div className="mt-7 pt-5 border-t border-navy/5 flex items-center justify-between">
                            <span className="text-[11px] text-steel-light font-light">{article.readTime} {t("insightsPage.readTime")}</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-orange transition-colors duration-300">
                              {t("insightsPage.read")}
                              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-navy text-white"
                        : "bg-white border border-navy/10 text-steel-light hover:border-orange/30 hover:text-navy"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {/* Results count */}
            <div className="text-center mt-6">
              <p className="text-xs text-steel-light font-light">
                {locale === "pt"
                  ? `${filteredArticles.length} artigo${filteredArticles.length !== 1 ? "s" : ""} encontrado${filteredArticles.length !== 1 ? "s" : ""}`
                  : `${filteredArticles.length} article${filteredArticles.length !== 1 ? "s" : ""} found`
                }
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 md:py-28 bg-navy">
          <div className="container text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-5">
                {t("insightsPage.newsletter.title")}
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-10 font-light leading-[1.8]">
                {t("insightsPage.newsletter.desc")}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder={t("insightsPage.newsletter.placeholder")}
                  className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-orange/50 focus:ring-0 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="inline-flex items-center justify-center gap-2 bg-orange text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300 disabled:opacity-60"
                >
                  {subscribeMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    t("insightsPage.newsletter.button")
                  )}
                </button>
              </form>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
