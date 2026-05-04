import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  jobTitle: varchar("jobTitle", { length: 255 }),
  sector: varchar("sector", { length: 255 }),
  subject: varchar("subject", { length: 255 }),
  serviceType: varchar("serviceType", { length: 255 }),
  urgency: mysqlEnum("urgency", ["low", "medium", "high"]).default("medium"),
  howFound: varchar("howFound", { length: 255 }),
  preferredContact: mysqlEnum("preferredContact", ["email", "phone", "whatsapp"]).default("email"),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Articles / Insights
 * Extended with multimodal fields: pdfUrl, podcastUrl, chartData, coverImage
 * Extended with behavioral analytics: viewCount, readCount
 * Extended with multilingual fields: titleEn, excerptEn, contentEn
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  tag: varchar("tag", { length: 100 }),
  readTime: varchar("readTime", { length: 50 }),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  authorId: int("authorId"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  // Multimodal
  pdfUrl: varchar("pdfUrl", { length: 1000 }),
  podcastUrl: varchar("podcastUrl", { length: 1000 }),
  podcastDuration: varchar("podcastDuration", { length: 20 }),
  coverImage: varchar("coverImage", { length: 1000 }),
  chartData: text("chartData"),
  chartType: varchar("chartType", { length: 50 }),
  chartTitle: varchar("chartTitle", { length: 255 }),
  // Behavioral analytics
  viewCount: int("viewCount").default(0).notNull(),
  readCount: int("readCount").default(0).notNull(),
  // Multilingual
  titleEn: varchar("titleEn", { length: 500 }),
  excerptEn: text("excerptEn"),
  contentEn: text("contentEn"),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

/**
 * Article view events — behavioral analytics for recommendation engine
 */
export const articleViews = mysqlTable("article_views", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  sessionId: varchar("sessionId", { length: 100 }).notNull(),
  scrollDepth: int("scrollDepth").default(0),
  timeOnPage: int("timeOnPage").default(0),
  referrerSlug: varchar("referrerSlug", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ArticleView = typeof articleViews.$inferSelect;
export type InsertArticleView = typeof articleViews.$inferInsert;

/**
 * Newsletter subscribers
 */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  active: boolean("active").default(true).notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Chat messages for AI assistant
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 100 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Site settings (key-value store for admin configs)
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
