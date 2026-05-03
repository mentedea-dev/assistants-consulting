/**
 * Scheduled task routes — custom Express endpoints for automated publishing.
 * These endpoints are called by the Manus scheduled task agent.
 * Auth: requires valid session cookie (user role allowed).
 */
import type { Express, Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { getDb } from "./db";
import { articles } from "../drizzle/schema";

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

export function registerScheduledRoutes(app: Express) {
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

      res.status(200).json({
        success: true,
        published,
        total: items.length,
        results,
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
}
