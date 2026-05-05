/**
 * Scheduled task routes — custom Express endpoints for automated publishing.
 * These endpoints are called by the Manus scheduled task agent.
 * Auth: requires valid session cookie (user role allowed).
 * 
 * Features:
 * - Publish news/insights automatically
 * - Track newsletter dispatch: every 7 new published articles triggers a newsletter
 */
import type { Express, Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { getDb } from "./db";
import { articles, newsletterSubscribers, siteSettings } from "../drizzle/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

/**
 * Check if newsletter should be sent (every 7 new articles since last dispatch)
 * Returns the articles to include in the newsletter, or null if threshold not met
 */
async function checkNewsletterThreshold(db: any): Promise<{ shouldSend: boolean; recentArticles: any[] }> {
  // Get the last newsletter dispatch timestamp from settings
  const lastDispatchSetting = await db.select().from(siteSettings)
    .where(eq(siteSettings.key, "newsletter_last_dispatch"))
    .limit(1);

  const lastDispatchDate = lastDispatchSetting.length > 0 && lastDispatchSetting[0].value
    ? new Date(lastDispatchSetting[0].value)
    : new Date(0); // If never sent, count all articles

  // Count published articles since last dispatch
  const recentArticles = await db.select({
    id: articles.id,
    title: articles.title,
    slug: articles.slug,
    excerpt: articles.excerpt,
    tag: articles.tag,
    publishedAt: articles.publishedAt,
  }).from(articles)
    .where(and(
      eq(articles.status, "published"),
      gte(articles.publishedAt, lastDispatchDate)
    ))
    .orderBy(desc(articles.publishedAt))
    .limit(20);

  return {
    shouldSend: recentArticles.length >= 7,
    recentArticles: recentArticles.slice(0, 7),
  };
}

/**
 * Build newsletter HTML content
 */
function buildNewsletterContent(articlesList: any[], siteUrl: string): { subject: string; text: string } {
  const subject = `Assistants Consulting — ${articlesList.length} novos insights para você`;

  const articleLines = articlesList.map((a, i) => {
    const tag = a.tag ? `[${a.tag}]` : "";
    const url = `${siteUrl}/insights/${a.slug}`;
    return `${i + 1}. ${tag} ${a.title}\n   ${a.excerpt ? a.excerpt.slice(0, 120) + "..." : ""}\n   Leia mais: ${url}`;
  }).join("\n\n");

  const text = `Prezado(a) assinante,

Compartilhamos os mais recentes insights da Assistants Consulting sobre o mercado atuarial brasileiro:

${articleLines}

---

Acesse todos os nossos insights em: ${siteUrl}/insights

Atenciosamente,
Assistants Consulting
Consultoria Atuarial

---
Para cancelar sua inscrição, responda este e-mail com o assunto "CANCELAR".
www.assistants.com.br`;

  return { subject, text };
}

export function registerScheduledRoutes(app: Express) {
  /**
   * POST /api/scheduled/publish-news
   * Publishes articles and checks newsletter threshold
   */
  app.post("/api/scheduled/publish-news", async (req: Request, res: Response) => {
    try {
      // Authenticate the request (accepts user role)
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      // user.role can be "user" or "admin" — both allowed for scheduled tasks
      if (user.role !== "user" && user.role !== "admin") {
        res.status(403).json({ error: "Insufficient permissions" });
        return;
      }

      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      const { items } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: "items array is required and must not be empty" });
        return;
      }

      if (items.length > 20) {
        res.status(400).json({ error: "Maximum 20 articles per request" });
        return;
      }

      const results: Array<{ title: string; slug: string; status: string }> = [];

      for (const item of items) {
        const { title, excerpt, content, tag } = item;

        if (!title || typeof title !== "string") {
          results.push({ title: title || "unknown", slug: "", status: "skipped - missing title" });
          continue;
        }

        const slug = generateSlug(title);
        const readTime = content ? estimateReadTime(content) : "3 min";

        try {
          await db.insert(articles).values({
            title: title.slice(0, 500),
            slug,
            excerpt: excerpt ? String(excerpt).slice(0, 1000) : null,
            content: content || null,
            tag: tag || "Notícia",
            readTime,
            status: "published",
            authorId: user.id,
            publishedAt: new Date(),
          });

          results.push({ title, slug, status: "published" });
        } catch (insertError: any) {
          console.error(`[Scheduled] Failed to insert article "${title}":`, insertError?.message);
          results.push({ title, slug, status: `error - ${insertError?.message || "unknown"}` });
        }
      }

      const published = results.filter(r => r.status === "published").length;
      console.log(`[Scheduled] Published ${published}/${items.length} articles`);

      // Check newsletter threshold after publishing
      let newsletterStatus = "not_triggered";
      try {
        const { shouldSend, recentArticles } = await checkNewsletterThreshold(db);
        if (shouldSend) {
          // Get all active subscribers
          const subscribers = await db.select().from(newsletterSubscribers)
            .where(eq(newsletterSubscribers.active, true));

          if (subscribers.length > 0) {
            const siteUrl = "https://assistants.com.br";
            const { subject, text } = buildNewsletterContent(recentArticles, siteUrl);

            // Notify owner to send newsletter (the actual sending happens via Gmail MCP)
            await notifyOwner({
              title: `Newsletter pronta: ${recentArticles.length} novos insights`,
              content: `${subscribers.length} assinantes aguardam.\n\nAssunto: ${subject}\n\nConteúdo:\n${text}`,
            }).catch(() => { /* non-blocking */ });

            // Update last dispatch timestamp
            const existing = await db.select().from(siteSettings)
              .where(eq(siteSettings.key, "newsletter_last_dispatch"))
              .limit(1);

            if (existing.length > 0) {
              await db.update(siteSettings)
                .set({ value: new Date().toISOString() })
                .where(eq(siteSettings.key, "newsletter_last_dispatch"));
            } else {
              await db.insert(siteSettings).values({
                key: "newsletter_last_dispatch",
                value: new Date().toISOString(),
              });
            }

            newsletterStatus = `triggered_for_${subscribers.length}_subscribers`;
          } else {
            newsletterStatus = "threshold_met_no_subscribers";
          }
        } else {
          newsletterStatus = "threshold_not_met";
        }
      } catch (nlError: any) {
        console.error("[Scheduled] Newsletter check error:", nlError?.message);
        newsletterStatus = `error: ${nlError?.message}`;
      }

      res.status(200).json({
        success: true,
        published,
        total: items.length,
        results,
        newsletter: newsletterStatus,
      });
    } catch (error: any) {
      console.error("[Scheduled] publish-news error:", error?.message);
      if (error?.message?.includes("session") || error?.message?.includes("Forbidden")) {
        res.status(401).json({ error: "Authentication failed" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  /**
   * POST /api/scheduled/check-newsletter
   * Standalone endpoint to check and trigger newsletter if threshold is met
   */
  app.post("/api/scheduled/check-newsletter", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      const { shouldSend, recentArticles } = await checkNewsletterThreshold(db);

      if (!shouldSend) {
        res.status(200).json({
          success: true,
          newsletter: "threshold_not_met",
          articlesCount: recentArticles.length,
          threshold: 7,
        });
        return;
      }

      // Get subscribers
      const subscribers = await db.select().from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.active, true));

      if (subscribers.length === 0) {
        res.status(200).json({
          success: true,
          newsletter: "no_active_subscribers",
          articlesCount: recentArticles.length,
        });
        return;
      }

      const siteUrl = "https://assistants.com.br";
      const { subject, text } = buildNewsletterContent(recentArticles, siteUrl);

      // Notify owner
      await notifyOwner({
        title: `Newsletter pronta: ${recentArticles.length} novos insights`,
        content: `${subscribers.length} assinantes.\n\nAssunto: ${subject}\n\nConteúdo:\n${text}\n\nE-mails dos assinantes:\n${subscribers.map(s => s.email).join(", ")}`,
      }).catch(() => { /* non-blocking */ });

      // Update dispatch timestamp
      const existing = await db.select().from(siteSettings)
        .where(eq(siteSettings.key, "newsletter_last_dispatch"))
        .limit(1);

      if (existing.length > 0) {
        await db.update(siteSettings)
          .set({ value: new Date().toISOString() })
          .where(eq(siteSettings.key, "newsletter_last_dispatch"));
      } else {
        await db.insert(siteSettings).values({
          key: "newsletter_last_dispatch",
          value: new Date().toISOString(),
        });
      }

      res.status(200).json({
        success: true,
        newsletter: "dispatched",
        subscriberCount: subscribers.length,
        articlesIncluded: recentArticles.length,
        subscriberEmails: subscribers.map(s => s.email),
        newsletterSubject: subject,
        newsletterContent: text,
      });
    } catch (error: any) {
      console.error("[Scheduled] check-newsletter error:", error?.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
