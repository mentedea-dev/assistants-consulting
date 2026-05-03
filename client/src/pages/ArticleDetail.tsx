/*
 * PENTAGRAM CRAFT: Article Detail
 * - Individual article page with markdown rendering
 * - Loads article by slug from database
 * - Editorial layout with serif typography
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import PageTransition from "@/components/PageTransition";
import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { ArrowLeft, Loader2, Clock, Tag } from "lucide-react";
import { Streamdown } from "streamdown";

export default function ArticleDetail() {
  const params = useParams<{ slug: string }>();
  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery(
    { slug: params.slug || "" },
    { enabled: !!params.slug }
  );

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-linen">
          <Header />
          <div className="pt-40 flex justify-center">
            <Loader2 className="animate-spin text-orange" size={32} />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-linen">
          <Header />
          <section className="pt-40 pb-28">
            <div className="container text-center">
              <h1 className="text-3xl font-serif font-medium text-navy mb-4">
                Artigo não encontrado
              </h1>
              <p className="text-steel-light mb-8 font-light">
                O artigo que você procura não existe ou foi removido.
              </p>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-orange transition-colors"
              >
                <ArrowLeft size={14} /> Voltar aos Insights
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        <article className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container max-w-3xl">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm text-steel-light hover:text-navy transition-colors mb-12"
              >
                <ArrowLeft size={14} /> Voltar aos Insights
              </Link>
            </FadeIn>

            {/* Article header */}
            <FadeIn delay={0.1}>
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  {article.tag && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-orange bg-orange/8 px-3 py-1.5">
                      <Tag size={10} />
                      {article.tag}
                    </span>
                  )}
                  {article.readTime && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-steel-light font-light">
                      <Clock size={11} />
                      {article.readTime} de leitura
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-navy tracking-tight leading-[1.1]">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="text-lg text-steel-light mt-6 leading-[1.8] font-light">
                    {article.excerpt}
                  </p>
                )}
                <div className="mt-8 pt-6 border-t border-navy/8">
                  <span className="text-xs text-steel-light font-light">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Article content */}
            <FadeIn delay={0.2}>
              <div className="prose prose-lg prose-navy max-w-none font-light leading-[1.9]
                prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-steel-light prose-p:mb-6
                prose-a:text-orange prose-a:no-underline hover:prose-a:underline
                prose-strong:text-navy prose-strong:font-medium
                prose-ul:text-steel-light prose-ol:text-steel-light
                prose-blockquote:border-l-orange prose-blockquote:text-navy prose-blockquote:font-serif prose-blockquote:italic
              ">
                <Streamdown>{article.content || ""}</Streamdown>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.3}>
              <div className="mt-16 pt-10 border-t border-navy/8">
                <p className="text-sm text-steel-light font-light mb-4">
                  Precisa de uma análise personalizada sobre este tema?
                </p>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 bg-orange text-white px-7 py-3 text-sm font-medium hover:bg-orange-light transition-colors"
                >
                  Fale com nossos atuários
                </Link>
              </div>
            </FadeIn>
          </div>
        </article>

        <Footer />
      </div>
    </PageTransition>
  );
}
