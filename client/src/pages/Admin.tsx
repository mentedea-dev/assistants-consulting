/*
 * Admin Panel — Assistants Consulting
 * - Protected by auth (admin role)
 * - Dashboard with metrics
 * - Manage articles (create, edit, publish) with markdown preview
 * - View contact submissions
 * - View newsletter subscribers
 * - Site settings (Google Search Console, etc.)
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { FileText, MessageSquare, Mail, Plus, Edit, Trash2,
  Eye, Clock, ArrowLeft, Loader2, CheckCircle2,
  Columns2, PenLine, Settings, LayoutDashboard,
  Users, TrendingUp, Search, ExternalLink, Save,
  Globe, BarChart3, Upload, Headphones, Download,
  LineChart, Languages, Activity, BookOpen
} from "lucide-react";
import { Streamdown } from "streamdown";

type Tab = "dashboard" | "articles" | "contacts" | "newsletter" | "settings" | "analytics";

interface ImportArticle {
  title: string;
  excerpt?: string;
  content?: string;
  tag?: string;
  readTime?: string;
  status?: "draft" | "published";
  publishedAt?: string;
}

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tag: "",
    readTime: "",
    status: "draft" as "draft" | "published",
    // Multimodal
    pdfUrl: "",
    podcastUrl: "",
    podcastDuration: "",
    coverImage: "",
    chartData: "",
    chartType: "bar",
    chartTitle: "",
    // Multilingual
    titleEn: "",
    excerptEn: "",
    contentEn: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importPreview, setImportPreview] = useState<ImportArticle[]>([]);

  // Settings state
  const [googleVerification, setGoogleVerification] = useState("");
  const [chatBrief, setChatBrief] = useState("");
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Queries
  const articlesQuery = trpc.articles.list.useQuery({ status: "all" });
  const contactsQuery = trpc.contacts.list.useQuery();
  const newsletterQuery = trpc.newsletter.list.useQuery();
  const settingsQuery = trpc.settings.getAll.useQuery(undefined, {
    enabled: activeTab === "settings",
  });

  useEffect(() => {
    if (!settingsLoaded && settingsQuery.data) {
      const gv = settingsQuery.data.find((s) => s.key === "google_verification");
      if (gv) setGoogleVerification(gv.value || "");
      const cb = settingsQuery.data.find((s) => s.key === "chat_brief");
      if (cb) setChatBrief(cb.value || "");
      setSettingsLoaded(true);
    }
  }, [settingsQuery.data, settingsLoaded]);

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

  const saveSetting = trpc.settings.set.useMutation({
    onSuccess: () => {
      toast.success("Configuração salva com sucesso");
      settingsQuery.refetch();
    },
    onError: () => toast.error("Erro ao salvar configuração"),
  });

  const resetForm = () => {
    setShowEditor(false);
    setEditingId(null);
    setForm({
      title: "", excerpt: "", content: "", tag: "", readTime: "", status: "draft",
      pdfUrl: "", podcastUrl: "", podcastDuration: "", coverImage: "",
      chartData: "", chartType: "bar", chartTitle: "",
      titleEn: "", excerptEn: "", contentEn: "",
    });
    setShowPreview(false);
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
      pdfUrl: (article as any).pdfUrl || "",
      podcastUrl: (article as any).podcastUrl || "",
      podcastDuration: (article as any).podcastDuration || "",
      coverImage: (article as any).coverImage || "",
      chartData: (article as any).chartData || "",
      chartType: (article as any).chartType || "bar",
      chartTitle: (article as any).chartTitle || "",
      titleEn: (article as any).titleEn || "",
      excerptEn: (article as any).excerptEn || "",
      contentEn: (article as any).contentEn || "",
    });
    setShowEditor(true);
  };

  const handleSaveGoogleVerification = () => {
    saveSetting.mutate({ key: "google_verification", value: googleVerification });
  };

  const handleSaveChatBrief = () => {
    saveSetting.mutate({ key: "chat_brief", value: chatBrief });
  };

  const importArticles = trpc.articles.importBatch.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.imported} artigos importados com sucesso!`);
      articlesQuery.refetch();
      setShowImport(false);
      setImportJson("");
      setImportPreview([]);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleParseImport = () => {
    try {
      const parsed = JSON.parse(importJson);
      const arr = Array.isArray(parsed) ? parsed : parsed.articles || [];
      setImportPreview(arr);
    } catch {
      toast.error("JSON inv\u00e1lido. Verifique o formato.");
    }
  };

  const handleConfirmImport = () => {
    if (importPreview.length === 0) {
      toast.error("Nenhum artigo para importar.");
      return;
    }
    importArticles.mutate({ articles: importPreview });
  };

  // Dashboard metrics
  const metrics = useMemo(() => {
    const totalArticles = articlesQuery.data?.length || 0;
    const publishedArticles = articlesQuery.data?.filter((a: any) => a.status === "published").length || 0;
    const totalContacts = contactsQuery.data?.length || 0;
    const unreadContacts = contactsQuery.data?.filter((c: any) => !c.read).length || 0;
    const totalSubscribers = newsletterQuery.data?.length || 0;
    return { totalArticles, publishedArticles, totalContacts, unreadContacts, totalSubscribers };
  }, [articlesQuery.data, contactsQuery.data, newsletterQuery.data]);

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

  const tabs = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "articles" as Tab, label: "Artigos", icon: FileText, badge: metrics.totalArticles },
    { id: "contacts" as Tab, label: "Mensagens", icon: MessageSquare, badge: metrics.unreadContacts },
    { id: "newsletter" as Tab, label: "Newsletter", icon: Mail, badge: metrics.totalSubscribers },
    { id: "settings" as Tab, label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/50 hover:text-white transition-colors" title="Voltar ao site">
            <ArrowLeft size={18} />
          </a>
          <div className="h-5 w-px bg-white/15" />
          <h1 className="text-sm font-semibold tracking-wide uppercase">
            Painel Administrativo
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            <ExternalLink size={12} /> Ver site
          </a>
          <div className="h-4 w-px bg-white/15" />
          <span className="text-xs text-white/40">{user?.name || user?.email}</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-56px)] py-4 hidden md:block">
          <nav className="space-y-0.5 px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowEditor(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-orange/8 text-orange"
                    : "text-gray-600 hover:bg-gray-50 hover:text-navy"
                }`}
              >
                <tab.icon size={16} />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-orange text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 overflow-x-auto w-full fixed top-[56px] z-10">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowEditor(false); }}
                className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-orange text-navy"
                    : "border-transparent text-gray-500"
                }`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 md:pt-8 pt-20 max-w-5xl">

          {/* ═══ DASHBOARD TAB ═══ */}
          {activeTab === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-serif font-medium text-navy">Visão geral</h2>
                  <p className="text-xs text-gray-400 mt-1">Bem-vindo ao painel. Aqui você gerencia todo o conteúdo do site.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveTab("articles"); setShowEditor(true); }}
                    className="inline-flex items-center gap-1.5 bg-orange text-white px-4 py-2 text-xs font-medium rounded-lg hover:bg-orange-light transition-colors shadow-sm"
                  >
                    <Plus size={13} /> Novo artigo
                  </button>
                </div>
              </div>
              {/* Quick Help Banner */}
              <div className="bg-gradient-to-r from-navy/5 to-orange/5 border border-navy/10 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen size={14} className="text-orange" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy mb-1">Como usar o painel</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <strong>Artigos:</strong> Crie e publique insights sobre temas atuariais. A cada 7 artigos publicados, uma newsletter é enviada automaticamente aos inscritos. &nbsp;
                      <strong>Mensagens:</strong> Veja os contatos recebidos pelo formulário do site. &nbsp;
                      <strong>Newsletter:</strong> Gerencie os inscritos. &nbsp;
                      <strong>Configurações:</strong> Ajuste o SEO e o chat IA.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Artigos</span>
                  </div>
                  <div className="text-2xl font-serif font-medium text-navy">{metrics.totalArticles}</div>
                  <p className="text-xs text-gray-400 mt-1">{metrics.publishedArticles} publicados</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-orange/10 rounded-lg flex items-center justify-center">
                      <MessageSquare size={16} className="text-orange" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagens</span>
                  </div>
                  <div className="text-2xl font-serif font-medium text-navy">{metrics.totalContacts}</div>
                  <p className="text-xs text-gray-400 mt-1">
                    {metrics.unreadContacts > 0 ? (
                      <span className="text-orange font-medium">{metrics.unreadContacts} não lidas</span>
                    ) : "Todas lidas"}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                      <Users size={16} className="text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Newsletter</span>
                  </div>
                  <div className="text-2xl font-serif font-medium text-navy">{metrics.totalSubscribers}</div>
                  <p className="text-xs text-gray-400 mt-1">inscritos ativos</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                      <TrendingUp size={16} className="text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                  </div>
                  <div className="text-2xl font-serif font-medium text-green-600">Online</div>
                  <p className="text-xs text-gray-400 mt-1">Site ativo</p>
                </div>
              </div>

              {/* Recent activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-navy">Mensagens recentes</h3>
                    <button
                      onClick={() => setActiveTab("contacts")}
                      className="text-xs text-orange hover:text-orange-light transition-colors"
                    >
                      Ver todas
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {contactsQuery.data?.slice(0, 4).map((contact: any) => (
                      <div key={contact.id} className="px-5 py-3 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${!contact.read ? "bg-orange" : "bg-gray-200"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy truncate">{contact.name}</p>
                          <p className="text-xs text-gray-400 truncate">{contact.message}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {new Date(contact.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    )) || (
                      <div className="p-8 text-center text-gray-400 text-sm">Nenhuma mensagem</div>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-navy">Últimos artigos</h3>
                    <button
                      onClick={() => setActiveTab("articles")}
                      className="text-xs text-orange hover:text-orange-light transition-colors"
                    >
                      Ver todos
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {articlesQuery.data?.slice(0, 4).map((article: any) => (
                      <div key={article.id} className="px-5 py-3 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${
                          article.status === "published" ? "bg-green-500" : "bg-gray-300"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy truncate">{article.title}</p>
                          <p className="text-xs text-gray-400">{article.tag || "Sem tag"}</p>
                        </div>
                        <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                          article.status === "published"
                            ? "text-green-600 bg-green-50"
                            : "text-gray-500 bg-gray-100"
                        }`}>
                          {article.status === "published" ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    )) || (
                      <div className="p-8 text-center text-gray-400 text-sm">Nenhum artigo</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ ARTICLES TAB ═══ */}
          {activeTab === "articles" && !showEditor && !showImport && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-medium text-navy">Artigos</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowImport(true)}
                    className="inline-flex items-center gap-2 border border-gray-300 text-navy px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Upload size={14} /> Importar
                  </button>
                  <button
                    onClick={() => setShowEditor(true)}
                    className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-orange-light transition-colors shadow-sm"
                  >
                    <Plus size={14} /> Novo artigo
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {articlesQuery.data?.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <FileText size={40} className="mx-auto mb-4 opacity-30" />
                    <p className="text-sm font-medium mb-1">Nenhum artigo criado ainda</p>
                    <p className="text-xs text-gray-400">Clique em "Novo artigo" para começar</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {articlesQuery.data?.map((article: any) => (
                      <div key={article.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
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
                          {article.excerpt && (
                            <p className="text-xs text-gray-400 mt-1 truncate">{article.excerpt}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <button
                            onClick={() => startEdit(article)}
                            className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded transition-all"
                            title="Editar"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Excluir este artigo permanentemente?")) {
                                deleteArticle.mutate({ id: article.id });
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
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

          {/* ═══ IMPORT ARTICLES ═══ */}
          {activeTab === "articles" && showImport && (
            <div>
              <button
                onClick={() => { setShowImport(false); setImportJson(""); setImportPreview([]); }}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
              >
                <ArrowLeft size={14} /> Voltar aos artigos
              </button>

              <h2 className="text-xl font-serif font-medium text-navy mb-4">Importar Artigos</h2>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Cole o JSON com os artigos a importar. O formato aceito é um array de objetos com os campos:
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px] ml-1">title, excerpt, content, tag, readTime, status, publishedAt</code>
              </p>

              {importPreview.length === 0 ? (
                <div className="space-y-4">
                  <textarea
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    rows={14}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-mono focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-y"
                    placeholder='[{"title": "Meu Artigo", "excerpt": "Resumo...", "tag": "Sa\u00fade", "status": "published", "publishedAt": "2025-06-01"}]'
                  />
                  <button
                    onClick={handleParseImport}
                    disabled={!importJson.trim()}
                    className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
                  >
                    <Eye size={14} /> Pré-visualizar
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800">
                      <CheckCircle2 size={14} className="inline mr-1.5" />
                      {importPreview.length} artigo(s) prontos para importa\u00e7\u00e3o
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {importPreview.map((article, i) => (
                      <div key={i} className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-orange bg-orange/10 px-2 py-0.5 rounded">
                            {article.tag || "Sem tag"}
                          </span>
                          <span className="text-[10px] text-gray-400">{article.publishedAt || "Sem data"}</span>
                        </div>
                        <p className="text-sm font-medium text-navy mt-1">{article.title}</p>
                        {article.excerpt && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{article.excerpt}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleConfirmImport}
                      disabled={importArticles.isPending}
                      className="inline-flex items-center gap-2 bg-orange text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-orange-light transition-colors disabled:opacity-60"
                    >
                      {importArticles.isPending ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      Confirmar importa\u00e7\u00e3o
                    </button>
                    <button
                      onClick={() => setImportPreview([])}
                      className="text-sm text-gray-500 hover:text-navy transition-colors"
                    >
                      Voltar e editar JSON
                    </button>
                  </div>
                </div>
              )}
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
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-serif font-medium text-navy">
                    {editingId ? "Editar artigo" : "Novo artigo"}
                  </h2>
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    Dica: Use Markdown no conteúdo (## para títulos, **negrito**, etc.)
                  </span>
                </div>
                {!editingId && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-700 leading-relaxed">
                      <strong>Como funciona:</strong> Preencha o título, escolha uma tag (ex: Saúde, Previdência, CPC 33), escreva o conteúdo e publique.
                      O artigo aparecerá automaticamente na seção "Insights" do site. Após 7 artigos publicados, uma newsletter é enviada aos inscritos.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Título</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
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
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                      placeholder="Ex: CPC 33, Saúde"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Tempo de leitura</label>
                    <input
                      type="text"
                      value={form.readTime}
                      onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                      placeholder="Ex: 10 min"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
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
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-none"
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
                      {showPreview ? "Apenas editor" : "Split preview"}
                    </button>
                  </div>
                  {showPreview ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={16}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-y"
                        placeholder="Escreva o conteúdo do artigo em Markdown..."
                      />
                      <div className="border border-gray-200 rounded-lg px-5 py-4 overflow-y-auto max-h-[420px] prose prose-sm prose-headings:text-navy prose-a:text-orange bg-gray-50/50">
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
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-y"
                      placeholder="Escreva o conteúdo do artigo em Markdown..."
                    />
                  )}
                </div>

                {/* ── Multimodal Section ── */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-orange/10 flex items-center justify-center rounded">
                      <Activity size={11} className="text-orange" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Formatos Multimodais
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                        <Download size={11} /> URL do PDF (relatório)
                      </label>
                      <input
                        type="url"
                        value={form.pdfUrl}
                        onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                        <Headphones size={11} /> URL do Podcast (mp3)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={form.podcastUrl}
                          onChange={(e) => setForm({ ...form, podcastUrl: e.target.value })}
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                          placeholder="https://..."
                        />
                        <input
                          type="text"
                          value={form.podcastDuration}
                          onChange={(e) => setForm({ ...form, podcastDuration: e.target.value })}
                          className="w-20 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                          placeholder="24:35"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                        <Eye size={11} /> URL da imagem de capa
                      </label>
                      <input
                        type="url"
                        value={form.coverImage}
                        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                        <LineChart size={11} /> Tipo de gráfico
                      </label>
                      <select
                        value={form.chartType}
                        onChange={(e) => setForm({ ...form, chartType: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                      >
                        <option value="bar">Barras</option>
                        <option value="line">Linhas</option>
                        <option value="area">Área</option>
                        <option value="pie">Pizza</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Título do gráfico
                    </label>
                    <input
                      type="text"
                      value={form.chartTitle}
                      onChange={(e) => setForm({ ...form, chartTitle: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                      placeholder="Ex: Evolução das provisões técnicas 2020–2024"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Dados do gráfico (JSON)
                    </label>
                    <textarea
                      value={form.chartData}
                      onChange={(e) => setForm({ ...form, chartData: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-none"
                      placeholder='[{"name":"2020","valor":100},{"name":"2021","valor":120}]'
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Formato: array de objetos com campo "name" e valores numéricos. Ex: [{`{"name":"2024","Saúde":120,"Previdência":85}`}]
                    </p>
                  </div>
                </div>

                {/* ── English Translation Section ── */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-blue-50 flex items-center justify-center rounded">
                      <Languages size={11} className="text-blue-500" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Versão em Inglês
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Título (EN)</label>
                      <input
                        type="text"
                        value={form.titleEn}
                        onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Article title in English"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Resumo (EN)</label>
                      <textarea
                        value={form.excerptEn}
                        onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition-all resize-none"
                        placeholder="Brief summary in English..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Conteúdo (EN — Markdown)
                      </label>
                      <textarea
                        value={form.contentEn}
                        onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition-all resize-y"
                        placeholder="Write the article content in English using Markdown..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={createArticle.isPending || updateArticle.isPending}
                    className="inline-flex items-center gap-2 bg-orange text-white px-6 py-2.5 text-sm font-medium rounded-lg hover:bg-orange-light transition-colors disabled:opacity-60 shadow-sm"
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-medium text-navy">Mensagens recebidas</h2>
                {metrics.unreadContacts > 0 && (
                  <span className="text-xs font-medium text-orange bg-orange/10 px-3 py-1 rounded-full">
                    {metrics.unreadContacts} não lidas
                  </span>
                )}
              </div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {contactsQuery.data?.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
                    <p className="text-sm font-medium mb-1">Nenhuma mensagem recebida</p>
                    <p className="text-xs text-gray-400">As mensagens do formulário de contato aparecerão aqui</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {contactsQuery.data?.map((contact: any) => (
                      <div
                        key={contact.id}
                        className={`px-5 py-5 transition-colors ${!contact.read ? "bg-orange/[0.02] border-l-2 border-l-orange" : "border-l-2 border-l-transparent"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="text-sm font-medium text-navy">{contact.name}</span>
                              {contact.urgency === "high" && (
                                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Urgente</span>
                              )}
                              {!contact.read && (
                                <span className="text-[10px] font-bold text-orange bg-orange/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Novo</span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
                              <span>{contact.email}</span>
                              {contact.company && <span>· {contact.company}</span>}
                              {contact.jobTitle && <span>· {contact.jobTitle}</span>}
                              {contact.phone && <span>· {contact.phone}</span>}
                            </div>
                            {/* Detail tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {contact.serviceType && (
                                <span className="text-[10px] font-medium text-navy bg-navy/5 px-2 py-1 rounded">{contact.serviceType}</span>
                              )}
                              {contact.sector && (
                                <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{contact.sector}</span>
                              )}
                              {contact.urgency && (
                                <span className={`text-[10px] font-medium px-2 py-1 rounded ${
                                  contact.urgency === "high" ? "text-red-700 bg-red-50" :
                                  contact.urgency === "medium" ? "text-orange bg-orange/10" :
                                  "text-green-700 bg-green-50"
                                }`}>
                                  {contact.urgency === "high" ? "Alta" : contact.urgency === "medium" ? "Média" : "Baixa"}
                                </span>
                              )}
                              {contact.preferredContact && (
                                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Contato: {contact.preferredContact}</span>
                              )}
                              {contact.howFound && (
                                <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">Via: {contact.howFound}</span>
                              )}
                            </div>
                            {contact.subject && (
                              <p className="text-xs font-medium text-navy/70 mb-2">Assunto: {contact.subject}</p>
                            )}
                            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{contact.message}</p>
                            <p className="text-[10px] text-gray-400 mt-2">
                              {new Date(contact.createdAt).toLocaleString("pt-BR")}
                            </p>
                          </div>
                          {!contact.read && (
                            <button
                              onClick={() => markRead.mutate({ id: contact.id })}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              title="Marcar como lido"
                            >
                              <CheckCircle2 size={18} />
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-medium text-navy">Inscritos na newsletter</h2>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {metrics.totalSubscribers} inscritos
                </span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {newsletterQuery.data?.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <Mail size={40} className="mx-auto mb-4 opacity-30" />
                    <p className="text-sm font-medium mb-1">Nenhum inscrito ainda</p>
                    <p className="text-xs text-gray-400">Os inscritos via formulário de newsletter aparecerão aqui</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    <div className="px-5 py-3 bg-gray-50 flex items-center gap-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex-1">E-mail</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 w-32">Nome</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 w-40">Data</span>
                    </div>
                    {newsletterQuery.data?.map((sub: any) => (
                      <div key={sub.id} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
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

          {/* ═══ ANALYTICS TAB ═══ */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif font-medium text-navy mb-2">Analytics de Conteúdo</h2>
                <p className="text-sm text-gray-500 font-light">Métricas de engajamento e comportamento de leitura dos Insights.</p>
              </div>
              {/* Top articles by views */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                  <BookOpen size={15} className="text-orange" />
                  <h3 className="text-sm font-semibold text-navy">Artigos mais lidos</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {(articlesQuery.data || [])
                    .filter(a => a.status === "published")
                    .sort((a, b) => ((b as any).viewCount || 0) - ((a as any).viewCount || 0))
                    .slice(0, 10)
                    .map((article, i) => (
                      <div key={article.id} className="px-6 py-4 flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-300 w-5 text-right">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy truncate">{article.title}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            {article.tag && (
                              <span className="text-[10px] text-steel bg-navy/5 px-2 py-0.5">{article.tag}</span>
                            )}
                            <span className="text-[11px] text-gray-400 font-light">
                              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" }) : "—"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-navy">{((article as any).viewCount || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">visualizações</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-steel">{((article as any).readCount || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">leituras completas</p>
                        </div>
                        <div className="w-24 flex-shrink-0">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange rounded-full"
                              style={{
                                width: `${(article as any).viewCount > 0
                                  ? Math.round(((article as any).readCount / (article as any).viewCount) * 100)
                                  : 0}%`
                              }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 text-right">
                            {(article as any).viewCount > 0
                              ? `${Math.round(((article as any).readCount / (article as any).viewCount) * 100)}% conclusão`
                              : "—"}
                          </p>
                        </div>
                      </div>
                    ))}
                  {(articlesQuery.data || []).filter(a => a.status === "published").length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                      <BarChart3 size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Nenhum artigo publicado ainda</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Summary metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total de visualizações",
                    value: (articlesQuery.data || []).reduce((s, a) => s + ((a as any).viewCount || 0), 0).toLocaleString(),
                    icon: Eye,
                    color: "text-navy"
                  },
                  {
                    label: "Leituras completas",
                    value: (articlesQuery.data || []).reduce((s, a) => s + ((a as any).readCount || 0), 0).toLocaleString(),
                    icon: BookOpen,
                    color: "text-orange"
                  },
                  {
                    label: "Artigos publicados",
                    value: (articlesQuery.data || []).filter(a => a.status === "published").length.toString(),
                    icon: FileText,
                    color: "text-steel"
                  },
                  {
                    label: "Assinantes newsletter",
                    value: (newsletterQuery.data || []).filter((s: any) => s.active).length.toString(),
                    icon: Mail,
                    color: "text-green-600"
                  },
                ].map((metric) => (
                  <div key={metric.label} className="bg-white border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <metric.icon size={14} className={metric.color} />
                      <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">{metric.label}</p>
                    </div>
                    <p className={`text-2xl font-serif font-medium ${metric.color}`}>{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ SETTINGS TAB ═══ */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-serif font-medium text-navy mb-6">Configurações</h2>

              {/* Google Search Console */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Search size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy">Google Search Console</h3>
                    <p className="text-xs text-gray-400">Verificação de propriedade do site no Google</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Meta tag de verificação
                    </label>
                    <input
                      type="text"
                      value={googleVerification}
                      onChange={(e) => setGoogleVerification(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all"
                      placeholder="google-site-verification=XXXXXXXXXXXXXXXX"
                    />
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Cole o valor do atributo <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]">content</code> da meta tag fornecida pelo Google Search Console.
                      Acesse <a href="https://search.google.com/search-console" target="_blank" className="text-orange hover:underline">search.google.com/search-console</a> para obter.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveGoogleVerification}
                    disabled={saveSetting.isPending}
                    className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-60"
                  >
                    {saveSetting.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Salvar
                  </button>
                </div>
              </div>

              {/* Chat IA — Roteiro Editável */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange/10 rounded-lg flex items-center justify-center">
                    <MessageSquare size={18} className="text-orange" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy">Roteiro do Chat IA</h3>
                    <p className="text-xs text-gray-400">Personalize as instruções e contexto do assistente virtual</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Instruções adicionais para o assistente
                    </label>
                    <textarea
                      value={chatBrief}
                      onChange={(e) => setChatBrief(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-y"
                      placeholder={`Exemplo:\n- Nosso diferencial é a experiência de 35 anos no mercado\n- Temos sede em São Paulo e atendemos todo o Brasil\n- Nossos principais clientes são empresas do setor financeiro e saúde\n- Horário de atendimento: seg-sex, 9h às 18h\n- E-mail de contato: contato@assistants.com.br\n- Telefone: (11) 1234-5678`}
                    />
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Escreva informações específicas sobre a empresa que o assistente deve usar nas respostas.
                      O roteiro base (áreas de atuação, diretrizes de resposta) já está configurado automaticamente.
                      Use este campo para adicionar detalhes como endereço, telefone, diferenciais, horários, etc.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveChatBrief}
                    disabled={saveSetting.isPending}
                    className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-60"
                  >
                    {saveSetting.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Salvar roteiro
                  </button>
                </div>
              </div>

              {/* Google Analytics info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <BarChart3 size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy">Analytics</h3>
                    <p className="text-xs text-gray-400">Métricas de acesso ao site</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  O site já possui analytics integrado via Manus. Acesse o <strong>Dashboard</strong> no painel de gerenciamento
                  do Manus para visualizar métricas de visitantes únicos (UV), visualizações de página (PV) e outras estatísticas.
                </p>
              </div>

              {/* SEO info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Globe size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-navy">SEO e Meta Tags</h3>
                    <p className="text-xs text-gray-400">Otimização para mecanismos de busca</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Cada página do site já possui meta tags dinâmicas (Open Graph e Twitter Cards) configuradas automaticamente.
                  Os artigos publicados geram meta tags individuais com título, resumo e imagem para compartilhamento em redes sociais.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Checklist SEO:</p>
                  <ul className="space-y-1.5">
                    {[
                      "Meta tags Open Graph em todas as páginas",
                      "Twitter Cards configurados",
                      "Sitemap XML (gerar após publicação)",
                      "Robots.txt configurado",
                      "Títulos e descrições únicos por página",
                      "Internacionalização PT/EN com hreflang",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
