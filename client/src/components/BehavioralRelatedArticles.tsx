/**
 * BehavioralRelatedArticles — Hybrid recommendation engine
 * Priority: behavioral (co-read sessions) → tag-based → recent
 * Design: Oliver Wyman / McKinsey style — editorial, authoritative
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Clock, Tag, TrendingUp } from "lucide-react";

interface BehavioralRelatedArticlesProps {
  currentSlug: string;
  currentTag?: string | null;
  sessionId: string;
}

export default function BehavioralRelatedArticles({
  currentSlug,
  currentTag,
  sessionId,
}: BehavioralRelatedArticlesProps) {
  const { t, locale } = useLanguage();

  // Behavioral recommendations (co-read sessions)
  const { data: behavioral } = trpc.articles.getBehavioral.useQuery(
    { slug: currentSlug, sessionId, limit: 3 },
    { enabled: !!currentSlug && !!sessionId }
  );

  // Tag-based fallback
  const { data: tagBased } = trpc.articles.getRelated.useQuery(
    { slug: currentSlug, tag: currentTag || undefined, limit: 3 },
    { enabled: !!currentSlug }
  );

  const dateLocale = locale === "pt" ? "pt-BR" : "en-US";

  // Merge: behavioral first, then fill with tag-based
  const behavioralSlugs = new Set((behavioral || []).map(a => a.slug));
  const combined = [
    ...(behavioral || []).map(a => ({ ...a, isBehavioral: true })),
    ...(tagBased || [])
      .filter(a => !behavioralSlugs.has(a.slug))
      .map(a => ({ ...a, isBehavioral: false })),
  ].slice(0, 3);

  if (combined.length === 0) return null;

  const hasBehavioral = combined.some(a => a.isBehavioral);

  return (
    <section className="mt-20 pt-12 border-t border-navy/8">
      <FadeIn>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-navy tracking-tight">
              {t("article.relatedTitle")}
            </h2>
            {hasBehavioral && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-2.5 py-1">
                <TrendingUp size={9} />
                {locale === "pt" ? "Personalizado" : "Personalized"}
              </span>
            )}
          </div>
          <Link
            href="/insights"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-medium text-steel-light hover:text-steel transition-colors duration-300"
          >
            <span className="border-b border-transparent group-hover:border-navy/30 transition-colors duration-300 pb-0.5">
              {t("article.viewAll")}
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {combined.map((article, i) => (
          <FadeIn key={article.id} delay={i * 0.1}>
            <Link
              href={`/insights/${article.slug}`}
              className="group block h-full p-6 border border-navy/6 hover:border-navy/15 transition-all duration-500 bg-white hover:shadow-md relative overflow-hidden"
            >
              {/* Behavioral badge */}
              {article.isBehavioral && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-orange/20" />
              )}

              <div className="flex items-center gap-3 mb-4">
                {article.tag && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-navy bg-navy/8 px-2.5 py-1">
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

              <h3 className="text-base font-serif font-medium text-navy group-hover:text-steel transition-colors duration-300 tracking-tight leading-snug mb-3 line-clamp-2">
                {article.title}
              </h3>

              {article.excerpt && (
                <p className="text-sm text-steel-light font-light leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between mt-auto">
                {article.readTime && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-steel-light font-light">
                    <Clock size={10} />
                    {article.readTime} {t("article.readTime")}
                  </span>
                )}
                {"viewCount" in article && article.viewCount > 0 && (
                  <span className="text-[10px] text-steel/50 font-light">
                    {article.viewCount.toLocaleString()} {locale === "pt" ? "leituras" : "reads"}
                  </span>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Recommendation explanation */}
      {hasBehavioral && (
        <FadeIn delay={0.3}>
          <p className="text-[11px] text-steel/50 mt-6 text-right font-light">
            {locale === "pt"
              ? "Recomendações baseadas no comportamento de leitura de outros usuários"
              : "Recommendations based on reading behavior of other users"}
          </p>
        </FadeIn>
      )}
    </section>
  );
}
