/**
 * Scheduled task routes — custom Express endpoints for automated publishing.
 * These endpoints are called by the Manus scheduled task agent.
 * Auth: requires valid session cookie (user role allowed).
 * 
 * Features:
 * - Publish news/insights automatically
 * - Track newsletter dispatch: every 7 new published articles triggers a newsletter
 * - Send newsletter via SMTP from relacionamento@assistants.com.br
 */
import type { Express, Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { getDb } from "./db";
import { articles, newsletterSubscribers, siteSettings } from "../drizzle/schema";
import { eq, desc, and, gte } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { sendNewsletter, sendTestNewsletter, buildNewsletterHTML } from "./emailService";

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
 */
async function checkNewsletterThreshold(db: any): Promise<{ shouldSend: boolean; recentArticles: any[] }> {
  const lastDispatchSetting = await db.select().from(siteSettings)
    .where(eq(siteSettings.key, "newsletter_last_dispatch"))
    .limit(1);

  const lastDispatchDate = lastDispatchSetting.length > 0 && lastDispatchSetting[0].value
    ? new Date(lastDispatchSetting[0].value)
    : new Date(0);

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
 * Update the newsletter dispatch timestamp in database
 */
async function updateDispatchTimestamp(db: any): Promise<void> {
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
}

/**
 * Dispatch newsletter to all active subscribers via SMTP
 * Sends from: relacionamento@assistants.com.br
 */
async function dispatchNewsletter(db: any, recentArticles: any[]): Promise<{
  status: string;
  sent?: number;
  failed?: number;
  subscriberCount?: number;
  errors?: string[];
}> {
  const subscribers = await db.select().from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.active, true));

  if (subscribers.length === 0) {
    return { status: "threshold_met_no_subscribers" };
  }

  const siteUrl = "https://www.assistants.com.br";

  // Send newsletter via SMTP (from relacionamento@assistants.com.br)
  const result = await sendNewsletter(subscribers, recentArticles, siteUrl);

  if (result.success) {
    // Update dispatch timestamp only on successful send
    await updateDispatchTimestamp(db);

    // Notify owner about the dispatch
    await notifyOwner({
      title: `Newsletter enviada: ${recentArticles.length} insights para ${result.sent} assinantes`,
      content: `A newsletter foi enviada com sucesso de relacionamento@assistants.com.br.\n\nEnviados: ${result.sent}\nFalhas: ${result.failed}\n\nArtigos incluídos:\n${recentArticles.map((a: any, i: number) => `${i + 1}. ${a.title}`).join("\n")}`,
    }).catch(() => { /* non-blocking */ });

    return {
      status: `dispatched_${result.sent}_of_${subscribers.length}`,
      sent: result.sent,
      failed: result.failed,
      subscriberCount: subscribers.length,
      errors: result.errors.length > 0 ? result.errors : undefined,
    };
  } else {
    // SMTP not configured — fallback to notifying owner
    await notifyOwner({
      title: `Newsletter pronta (SMTP n\u00e3o configurado): ${recentArticles.length} novos insights`,
      content: `SMTP n\u00e3o configurado. Configure as vari\u00e1veis SMTP_HOST, SMTP_USER, SMTP_PASS para envio autom\u00e1tico.\n\n${subscribers.length} assinantes aguardam.\n\nE-mails: ${subscribers.map((s: any) => s.email).join(", ")}`,
    }).catch(() => { /* non-blocking */ });

    return {
      status: "smtp_not_configured_owner_notified",
      subscriberCount: subscribers.length,
      errors: result.errors,
    };
  }
}

export function registerScheduledRoutes(app: Express) {
  /**
   * POST /api/scheduled/publish-news
   * Publishes articles and checks newsletter threshold
   */
  app.post("/api/scheduled/publish-news", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

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
            tag: tag || "Not\u00edcia",
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
      let newsletterResult: any = { status: "not_triggered" };
      try {
        const { shouldSend, recentArticles } = await checkNewsletterThreshold(db);
        if (shouldSend) {
          newsletterResult = await dispatchNewsletter(db, recentArticles);
        } else {
          newsletterResult = { status: "threshold_not_met" };
        }
      } catch (nlError: any) {
        console.error("[Scheduled] Newsletter check error:", nlError?.message);
        newsletterResult = { status: `error: ${nlError?.message}` };
      }

      res.status(200).json({
        success: true,
        published,
        total: items.length,
        results,
        newsletter: newsletterResult,
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

      const newsletterResult = await dispatchNewsletter(db, recentArticles);

      res.status(200).json({
        success: true,
        newsletter: newsletterResult,
      });
    } catch (error: any) {
      console.error("[Scheduled] check-newsletter error:", error?.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * POST /api/scheduled/send-test-newsletter
   * Send a test newsletter to a specific email address (for preview/testing)
   */
  app.post("/api/scheduled/send-test-newsletter", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        res.status(401).json({ error: "Authentication required" });
        return;
      }

      const { email } = req.body as { email?: string };
      if (!email) {
        res.status(400).json({ error: "Email address required" });
        return;
      }

      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      // Get latest published articles for the test
      const latestArticles = await db.select({
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        tag: articles.tag,
        publishedAt: articles.publishedAt,
      }).from(articles)
        .where(eq(articles.status, "published"))
        .orderBy(desc(articles.publishedAt))
        .limit(7);

      if (latestArticles.length === 0) {
        res.status(400).json({ error: "No published articles available for test" });
        return;
      }

      const result = await sendTestNewsletter(email, latestArticles);

      res.status(200).json({
        success: result.success,
        message: result.success
          ? `Newsletter de teste enviada para ${email}`
          : `Falha no envio: ${result.error}`,
        articlesIncluded: latestArticles.length,
      });
    } catch (error: any) {
      console.error("[Scheduled] send-test-newsletter error:", error?.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * GET /api/scheduled/newsletter-preview
   * Returns the HTML of the newsletter for preview (no sending)
   */
  app.get("/api/scheduled/newsletter-preview", async (req: Request, res: Response) => {
    try {
      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      const latestArticles = await db.select({
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        tag: articles.tag,
        publishedAt: articles.publishedAt,
      }).from(articles)
        .where(eq(articles.status, "published"))
        .orderBy(desc(articles.publishedAt))
        .limit(7);

      const { subject, html } = buildNewsletterHTML(latestArticles);

      // Return the HTML directly for preview in browser
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch (error: any) {
      console.error("[Scheduled] newsletter-preview error:", error?.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
