/*
 * RelatedArticles — Shows related articles based on same tag
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface RelatedArticlesProps {
  currentSlug: string;
  currentTag?: string | null;
}

export default function RelatedArticles({ currentSlug, currentTag }: RelatedArticlesProps) {
  const { t, locale } = useLanguage();
  const { data: related, isLoading } = trpc.articles.getRelated.useQuery(
    { slug: currentSlug, tag: currentTag || undefined, limit: 3 },
    { enabled: !!currentSlug }
  );

  if (isLoading || !related || related.length === 0) return null;

  const dateLocale = locale === "pt" ? "pt-BR" : "en-US";

  return (
    <section className="mt-20 pt-12 border-t border-navy/8">
      <FadeIn>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-navy tracking-tight">
            {t("article.relatedTitle")}
          </h2>
          <Link
            href="/insights"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-medium text-steel-light hover:text-orange transition-colors duration-300"
          >
            <span className="border-b border-transparent group-hover:border-orange/40 transition-colors duration-300 pb-0.5">
              {t("article.viewAll")}
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article, i) => (
          <FadeIn key={article.id} delay={i * 0.1}>
            <Link
              href={`/insights/${article.slug}`}
              className="group block h-full p-6 border border-navy/6 hover:border-orange/20 transition-all duration-500 bg-white hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                {article.tag && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-2.5 py-1">
                    <Tag size={8} />
                    {article.tag}
                  </span>
                )}
                {article.publishedAt && (
                  <span className="text-[10px] text-steel-light font-light">
                    {new Date(article.publishedAt).toLocaleDateString(dateLocale, {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <h3 className="text-base font-serif font-medium text-navy group-hover:text-orange transition-colors duration-300 tracking-tight leading-snug mb-3 line-clamp-2">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-sm text-steel-light font-light leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
              )}
              <div className="flex items-center gap-2 mt-auto">
                {article.readTime && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-steel-light font-light">
                    <Clock size={10} />
                    {article.readTime} {t("article.readTime")}
                  </span>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
