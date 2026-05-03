/*
 * Admin Panel — Assistants Consulting
 * - Protected by auth (admin role)
 * - Manage articles (create, edit, publish)
 * - View contact submissions
 * - View newsletter subscribers
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import {
  FileText, MessageSquare, Mail, Plus, Edit, Trash2,
  Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2, Clock, Columns2, PenLine
} from "lucide-react";
import { Streamdown } from "streamdown";

type Tab = "articles" | "contacts" | "newsletter";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tag: "",
    readTime: "",
    status: "draft" as "draft" | "published",
  });
  const [showPreview, setShowPreview] = useState(false);

  // Queries
  const articlesQuery = trpc.articles.list.useQuery({ status: "all" });
  const contactsQuery = trpc.contacts.list.useQuery(undefined, { enabled: activeTab === "contacts" });
  const newsletterQuery = trpc.newsletter.list.useQuery(undefined, { enabled: activeTab === "newsletter" });

  // Mutations
  const createArticle = trpc.articles.create.useMutation({
    onSuccess: () => {
      toast.success("Artigo criado com sucesso");
      articlesQuery.refetch();
      resetForm();
    },
    onError: () => toast.error("Erro ao criar artigo"),
  });

  const updateArticle = trpc.articles.update.useMutation({
    onSuccess: () => {
      toast.success("Artigo atualizado");
      articlesQuery.refetch();
      resetForm();
    },
    onError: () => toast.error("Erro ao atualizar"),
  });

  const deleteArticle = trpc.articles.delete.useMutation({
    onSuccess: () => {
      toast.success("Artigo excluído");
      articlesQuery.refetch();
    },
    onError: () => toast.error("Erro ao excluir"),
  });

  const markRead = trpc.contacts.markRead.useMutation({
    onSuccess: () => contactsQuery.refetch(),
  });

  const resetForm = () => {
    setShowEditor(false);
    setEditingId(null);
    setForm({ title: "", excerpt: "", content: "", tag: "", readTime: "", status: "draft" });
  };

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateArticle.mutate({ id: editingId, ...form });
    } else {
      createArticle.mutate(form);
    }
  };

  const startEdit = (article: any) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content || "",
      tag: article.tag || "",
      readTime: article.readTime || "",
      status: article.status,
    });
    setShowEditor(true);
  };

  // Auth guard
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linen">
        <Loader2 className="animate-spin text-orange" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linen">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-serif font-medium text-navy mb-4">Acesso restrito</h1>
          <p className="text-steel-light mb-8 font-light">
            Faça login para acessar o painel administrativo.
          </p>
          <a
            href={getLoginUrl()}
            className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 text-sm font-medium hover:bg-orange-light transition-colors"
          >
            Fazer login
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linen">
        <div className="text-center max-w-md px-6">
          <h1 className="text-2xl font-serif font-medium text-navy mb-4">Acesso negado</h1>
          <p className="text-steel-light mb-8 font-light">
            Você não possui permissão de administrador.
          </p>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-navy hover:text-orange transition-colors">
            <ArrowLeft size={14} /> Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </a>
          <h1 className="text-sm font-semibold tracking-wide uppercase">
            Painel Administrativo
          </h1>
        </div>
        <span className="text-xs text-white/40">{user?.name || user?.email}</span>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex gap-1">
          {[
            { id: "articles" as Tab, label: "Artigos", icon: FileText },
            { id: "contacts" as Tab, label: "Mensagens", icon: MessageSquare },
            { id: "newsletter" as Tab, label: "Newsletter", icon: Mail },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowEditor(false); }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-orange text-navy"
                  : "border-transparent text-gray-500 hover:text-navy"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* ═══ ARTICLES TAB ═══ */}
        {activeTab === "articles" && !showEditor && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-navy">Artigos</h2>
              <button
                onClick={() => setShowEditor(true)}
                className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 text-sm font-medium hover:bg-orange-light transition-colors"
              >
                <Plus size={14} /> Novo artigo
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {articlesQuery.data?.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <FileText size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhum artigo criado ainda.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {articlesQuery.data?.map((article) => (
                    <div key={article.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          {article.status === "published" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              <Eye size={10} /> Publicado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              <Clock size={10} /> Rascunho
                            </span>
                          )}
                          {article.tag && (
                            <span className="text-[10px] font-medium text-orange bg-orange/10 px-2 py-0.5 rounded">
                              {article.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-navy truncate">{article.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => startEdit(article)}
                          className="p-2 text-gray-400 hover:text-navy transition-colors"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Excluir este artigo?")) {
                              deleteArticle.mutate({ id: article.id });
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ ARTICLE EDITOR ═══ */}
        {activeTab === "articles" && showEditor && (
          <div>
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Voltar à lista
            </button>

            <form onSubmit={handleSubmitArticle} className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
              <h2 className="text-lg font-medium text-navy">
                {editingId ? "Editar artigo" : "Novo artigo"}
              </h2>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Título</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange focus:ring-0 outline-none transition-colors"
                  placeholder="Título do artigo"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tag</label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange focus:ring-0 outline-none transition-colors"
                    placeholder="Ex: CPC 33, Saúde"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tempo de leitura</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange focus:ring-0 outline-none transition-colors"
                    placeholder="Ex: 10 min"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange focus:ring-0 outline-none transition-colors"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Resumo</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange focus:ring-0 outline-none transition-colors resize-none"
                  placeholder="Breve resumo do artigo..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-gray-600">
                    Conteúdo (Markdown)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-orange transition-colors"
                  >
                    {showPreview ? <PenLine size={12} /> : <Columns2 size={12} />}
                    {showPreview ? "Editor" : "Preview"}
                  </button>
                </div>
                {showPreview ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      rows={16}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm font-mono focus:border-orange focus:ring-0 outline-none transition-colors resize-y"
                      placeholder="Escreva o conteúdo do artigo em Markdown..."
                    />
                    <div className="border border-gray-200 rounded px-5 py-4 overflow-y-auto max-h-[420px] prose prose-sm prose-headings:text-navy prose-a:text-orange">
                      {form.content ? (
                        <Streamdown>{form.content}</Streamdown>
                      ) : (
                        <p className="text-gray-300 italic text-sm">Preview aparecerá aqui...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm font-mono focus:border-orange focus:ring-0 outline-none transition-colors resize-y"
                    placeholder="Escreva o conteúdo do artigo em Markdown..."
                  />
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={createArticle.isPending || updateArticle.isPending}
                  className="inline-flex items-center gap-2 bg-orange text-white px-6 py-2.5 text-sm font-medium hover:bg-orange-light transition-colors disabled:opacity-60"
                >
                  {(createArticle.isPending || updateArticle.isPending) && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  {editingId ? "Salvar alterações" : "Criar artigo"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 text-sm text-gray-500 hover:text-navy transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ═══ CONTACTS TAB ═══ */}
        {activeTab === "contacts" && (
          <div>
            <h2 className="text-lg font-medium text-navy mb-6">Mensagens recebidas</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {contactsQuery.data?.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhuma mensagem recebida ainda.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {contactsQuery.data?.map((contact) => (
                    <div
                      key={contact.id}
                      className={`px-5 py-4 ${!contact.read ? "bg-orange/3" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-medium text-navy">{contact.name}</span>
                            {!contact.read && (
                              <span className="w-2 h-2 rounded-full bg-orange" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {contact.email} {contact.company && `• ${contact.company}`}
                            {contact.subject && ` • ${contact.subject}`}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">{contact.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2">
                            {new Date(contact.createdAt).toLocaleString("pt-BR")}
                          </p>
                        </div>
                        {!contact.read && (
                          <button
                            onClick={() => markRead.mutate({ id: contact.id })}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Marcar como lido"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ NEWSLETTER TAB ═══ */}
        {activeTab === "newsletter" && (
          <div>
            <h2 className="text-lg font-medium text-navy mb-6">Inscritos na newsletter</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {newsletterQuery.data?.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <Mail size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhum inscrito ainda.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <div className="px-5 py-3 bg-gray-50 flex items-center gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex-1">
                      E-mail
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 w-32">
                      Nome
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 w-40">
                      Data
                    </span>
                  </div>
                  {newsletterQuery.data?.map((sub) => (
                    <div key={sub.id} className="px-5 py-3 flex items-center gap-4">
                      <span className="text-sm text-navy flex-1 truncate">{sub.email}</span>
                      <span className="text-sm text-gray-500 w-32 truncate">{sub.name || "—"}</span>
                      <span className="text-xs text-gray-400 w-40">
                        {new Date(sub.subscribedAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
