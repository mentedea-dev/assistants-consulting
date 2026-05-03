import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { contacts, articles, newsletterSubscribers, chatMessages, siteSettings } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ═══════════════════════ CONTACTS ═══════════════════════
  contacts: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        company: z.string().optional(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.insert(contacts).values({
          name: input.name,
          company: input.company || null,
          email: input.email,
          phone: input.phone || null,
          subject: input.subject || null,
          message: input.message,
        });

        // Notify owner about new contact
        await notifyOwner({
          title: `Novo contato: ${input.name}`,
          content: `Nome: ${input.name}\nEmpresa: ${input.company || "N/A"}\nE-mail: ${input.email}\nAssunto: ${input.subject || "N/A"}\n\nMensagem:\n${input.message}`,
        }).catch(() => { /* non-blocking */ });

        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(contacts).orderBy(desc(contacts.createdAt));
    }),

    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(contacts).set({ read: true }).where(eq(contacts.id, input.id));
        return { success: true };
      }),
  }),

  // ═══════════════════════ ARTICLES ═══════════════════════
  articles: router({
    list: publicProcedure
      .input(z.object({ status: z.enum(["draft", "published", "all"]).optional() }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const status = input?.status || "published";
        if (status === "all") {
          return db.select().from(articles).orderBy(desc(articles.createdAt));
        }
        return db.select().from(articles)
          .where(eq(articles.status, status))
          .orderBy(desc(articles.publishedAt));
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(articles)
          .where(eq(articles.slug, input.slug))
          .limit(1);
        return result[0] || null;
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(3),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        tag: z.string().optional(),
        readTime: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const slug = input.title
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          + "-" + nanoid(6);

        await db.insert(articles).values({
          title: input.title,
          slug,
          excerpt: input.excerpt || null,
          content: input.content || null,
          tag: input.tag || null,
          readTime: input.readTime || null,
          status: input.status || "draft",
          authorId: ctx.user.id,
          publishedAt: input.status === "published" ? new Date() : null,
        });

        return { success: true, slug };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(3).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        tag: z.string().optional(),
        readTime: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        const updateData: Record<string, unknown> = {};
        if (input.title !== undefined) updateData.title = input.title;
        if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
        if (input.content !== undefined) updateData.content = input.content;
        if (input.tag !== undefined) updateData.tag = input.tag;
        if (input.readTime !== undefined) updateData.readTime = input.readTime;
        if (input.status !== undefined) {
          updateData.status = input.status;
          if (input.status === "published") {
            updateData.publishedAt = new Date();
          }
        }

        await db.update(articles).set(updateData).where(eq(articles.id, input.id));
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(articles).where(eq(articles.id, input.id));
        return { success: true };
      }),
  }),

  // ═══════════════════════ NEWSLETTER ═══════════════════════
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        try {
          await db.insert(newsletterSubscribers).values({
            email: input.email,
            name: input.name || null,
          });
        } catch (e: any) {
          // Duplicate email — silently succeed
          if (e?.code === "ER_DUP_ENTRY") {
            return { success: true, message: "Já inscrito" };
          }
          throw e;
        }

        return { success: true, message: "Inscrito com sucesso" };
      }),

    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.active, true))
        .orderBy(desc(newsletterSubscribers.subscribedAt));
    }),
  }),

  // ═══════════════════════ SETTINGS ═══════════════════════
  settings: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(siteSettings)
          .where(eq(siteSettings.key, input.key))
          .limit(1);
        return result[0] || null;
      }),

    getAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(siteSettings);
    }),

    set: adminProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const existing = await db.select().from(siteSettings)
          .where(eq(siteSettings.key, input.key))
          .limit(1);
        if (existing.length > 0) {
          await db.update(siteSettings)
            .set({ value: input.value })
            .where(eq(siteSettings.key, input.key));
        } else {
          await db.insert(siteSettings).values({
            key: input.key,
            value: input.value,
          });
        }
        return { success: true };
      }),
  }),

  // ═══════════════════════ CHAT ═══════════════════════
  chat: router({
    send: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Save user message
        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "user",
          content: input.message,
        });

        // Get conversation history for context
        const history = await db.select().from(chatMessages)
          .where(eq(chatMessages.sessionId, input.sessionId))
          .orderBy(chatMessages.createdAt);

        const systemPrompt = `Você é o assistente virtual da Assistants Consulting, uma empresa de consultoria atuarial com 35 anos de mercado no Brasil. 

Áreas de atuação:
- Saúde Suplementar: precificação de planos, provisionamento técnico (PEONA, IBNR), modelagem de sinistralidade, notas técnicas (NTARP), estudos de reajuste, pareceres para ANS
- Previdência Complementar: avaliação atuarial de planos BD/CD/CV, estudos de solvência, ALM, equacionamento de déficits, conformidade PREVIC/SUSEP
- Benefícios Pós-Emprego: laudos CPC 33 (R2) / IAS 19, mensuração de obrigações OPEB, análise de sensibilidade, suporte a auditores
- Auditoria Atuarial: revisão independente de premissas e provisões
- Due Diligence Atuarial: análise de passivos em M&A, IPO, reestruturações
- HR Consulting: políticas de benefícios, benchmarking, otimização de custos
- Perícia Atuarial: laudos periciais e assistência técnica judicial
- Modelagem Estocástica: modelos probabilísticos, stress testing
- Gestão de Riscos: frameworks ERM, ICA, ORSA

Diretrizes de resposta:
- Responda em português formal e técnico, com precisão
- Seja conciso mas informativo
- Quando a pergunta exigir análise específica do caso do cliente, sugira agendar uma conversa com os atuários da equipe
- Nunca invente dados ou números específicos sobre a empresa
- Oriente o usuário a entrar em contato pelo formulário ou e-mail contato@assistants.com.br para assuntos que exijam sigilo ou análise detalhada
- Se a pergunta não for relacionada a atuária, seguros, previdência ou saúde suplementar, redirecione educadamente para os temas de competência da empresa`;

        const messages = [
          { role: "system" as const, content: systemPrompt },
          ...history.slice(-20).map(msg => ({
            role: msg.role as "user" | "assistant" | "system",
            content: msg.content,
          })),
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices?.[0]?.message?.content;
        const assistantContent = typeof rawContent === "string" ? rawContent : "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente ou entre em contato pelo e-mail contato@assistants.com.br.";

        // Save assistant response
        await db.insert(chatMessages).values({
          sessionId: input.sessionId,
          role: "assistant",
          content: assistantContent,
        });

        return { content: assistantContent };
      }),

    history: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(chatMessages)
          .where(eq(chatMessages.sessionId, input.sessionId))
          .orderBy(chatMessages.createdAt);
      }),
  }),
});

export type AppRouter = typeof appRouter;
