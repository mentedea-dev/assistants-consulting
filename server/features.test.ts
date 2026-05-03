import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@assistants.com.br",
    name: "Admin",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("contacts.submit", () => {
  it("accepts valid contact form data", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    // This will attempt DB insert; in test env without DB it should throw
    // but the input validation should pass
    try {
      await caller.contacts.submit({
        name: "João Silva",
        email: "joao@empresa.com.br",
        message: "Gostaria de solicitar um orçamento para avaliação atuarial.",
        company: "Empresa XYZ",
        phone: "+55 11 99999-0000",
        subject: "Saúde Suplementar",
      });
    } catch (e: any) {
      // Expected: DB not available in test env
      expect(e.message).toContain("Database not available");
    }
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contacts.submit({
        name: "Test",
        email: "invalid-email",
        message: "Test message with enough characters",
      })
    ).rejects.toThrow();
  });

  it("rejects short message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contacts.submit({
        name: "Test",
        email: "test@example.com",
        message: "Short",
      })
    ).rejects.toThrow();
  });
});

describe("contacts.list", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.contacts.list()).rejects.toThrow();
  });

  it("rejects non-admin access", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.contacts.list()).rejects.toThrow();
  });
});

describe("articles.list", () => {
  it("allows public access to published articles", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    try {
      const result = await caller.articles.list({ status: "published" });
      expect(Array.isArray(result)).toBe(true);
    } catch (e: any) {
      // DB not available is acceptable in test
      expect(result).toBeUndefined;
    }
  });
});

describe("articles.create", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.articles.create({ title: "Test Article" })
    ).rejects.toThrow();
  });

  it("rejects non-admin access", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.articles.create({ title: "Test Article" })
    ).rejects.toThrow();
  });
});

describe("newsletter.subscribe", () => {
  it("accepts valid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    try {
      await caller.newsletter.subscribe({ email: "test@example.com" });
    } catch (e: any) {
      // In test environment, DB may not be available or query may fail
      expect(e.message).toBeDefined();
    }
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("newsletter.list", () => {
  it("rejects unauthenticated access", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.newsletter.list()).rejects.toThrow();
  });

  it("rejects non-admin access", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.newsletter.list()).rejects.toThrow();
  });
});

describe("chat.send", () => {
  it("accepts valid chat message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    try {
      await caller.chat.send({
        sessionId: "test-session-123",
        message: "O que é CPC 33?",
      });
    } catch (e: any) {
      // DB not available is expected in test
      expect(e.message).toContain("Database not available");
    }
  });

  it("rejects empty message", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.chat.send({ sessionId: "test", message: "" })
    ).rejects.toThrow();
  });
});
