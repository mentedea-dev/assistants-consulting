/*
 * PENTAGRAM CRAFT: Contato — Formulário Detalhado (i18n)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, Loader2, Building2, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contato() {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, label: t("contact.info.address.label"), value: t("contact.info.address.value"), detail: t("contact.info.address.detail") },
    { icon: Phone, label: t("contact.info.phone.label"), value: "+55 (11) 3000-0000", detail: t("contact.info.phone.detail") },
    { icon: Mail, label: t("contact.info.email.label"), value: "contato@assistants.com.br", detail: t("contact.info.email.detail") },
    { icon: Clock, label: t("contact.hours.title"), value: t("contact.hours.weekdays"), detail: t("contact.hours.timezone") },
  ];

  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    cargo: "",
    setor: "",
    assunto: "",
    tipoServico: "",
    urgencia: "medium" as "low" | "medium" | "high",
    comoConheceu: "",
    contatoPreferido: "email" as "email" | "phone" | "whatsapp",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form

  const submitMutation = trpc.contacts.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(t("contact.success"));
      setFormData({
        nome: "", empresa: "", email: "", telefone: "", cargo: "", setor: "",
        assunto: "", tipoServico: "", urgencia: "medium", comoConheceu: "",
        contatoPreferido: "email", mensagem: "",
      });
      setStep(1);
      setTimeout(() => setSubmitted(false), 8000);
    },
    onError: () => {
      toast.error(t("contact.error"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      name: formData.nome,
      company: formData.empresa || undefined,
      email: formData.email,
      phone: formData.telefone || undefined,
      jobTitle: formData.cargo || undefined,
      sector: formData.setor || undefined,
      subject: formData.assunto || undefined,
      serviceType: formData.tipoServico || undefined,
      urgency: formData.urgencia,
      howFound: formData.comoConheceu || undefined,
      preferredContact: formData.contatoPreferido,
      message: formData.mensagem,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-navy/10 text-navy text-sm font-light focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all duration-300 placeholder:text-steel-light/50 rounded-sm";
  const selectClasses = `${inputClasses} appearance-none cursor-pointer`;
  const labelClasses = "block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-2";

  const canProceedStep1 = formData.nome && formData.email && formData.empresa;
  const canProceedStep2 = formData.assunto || formData.tipoServico;

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <SEO title={`${t("contact.tag")} — Assistants Consulting`} description={t("contact.title.1") + " " + t("contact.title.2")} />
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-16 md:pb-20">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("contact.tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-navy tracking-tight leading-[1.05] max-w-4xl">
                {t("contact.title.1")}
                <br />
                <span className="text-steel-light">{t("contact.title.2")}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-steel-light mt-6 max-w-2xl leading-relaxed font-light text-base">
                {t("contact.form.intro")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact content */}
        <section className="pb-28 md:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Form */}
              <FadeIn className="lg:col-span-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-navy/5 rounded-sm">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-normal text-navy mb-3">
                      {t("contact.success.title")}
                    </h3>
                    <p className="text-steel-light font-light max-w-md">
                      {t("contact.success.desc")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-navy/5 rounded-sm">
                    {/* Step indicator */}
                    <div className="px-8 md:px-10 pt-8 pb-6 border-b border-navy/5">
                      <div className="flex items-center gap-3">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => s < step ? setStep(s) : undefined}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                                s === step
                                  ? "bg-orange text-white"
                                  : s < step
                                  ? "bg-orange/10 text-orange cursor-pointer"
                                  : "bg-navy/5 text-navy/30"
                              }`}
                            >
                              {s < step ? "✓" : s}
                            </button>
                            {s < 3 && (
                              <div className={`w-12 md:w-20 h-px transition-colors duration-300 ${s < step ? "bg-orange/30" : "bg-navy/8"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-steel-light mt-3 font-light">
                        {step === 1 && t("contact.step1.label")}
                        {step === 2 && t("contact.step2.label")}
                        {step === 3 && t("contact.step3.label")}
                      </p>
                    </div>

                    <div className="px-8 md:px-10 py-8">
                      {/* Step 1: Dados pessoais */}
                      {step === 1 && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <User size={18} className="text-orange" />
                            <h3 className="text-lg font-serif font-normal text-navy">{t("contact.step1.title")}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className={labelClasses}>{t("contact.form.name")} *</label>
                              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder={t("contact.form.name.placeholder")} className={inputClasses} />
                            </div>
                            <div>
                              <label className={labelClasses}>{t("contact.form.email")} *</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t("contact.form.email.placeholder")} className={inputClasses} />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className={labelClasses}>{t("contact.form.company")} *</label>
                              <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required placeholder={t("contact.form.company.placeholder")} className={inputClasses} />
                            </div>
                            <div>
                              <label className={labelClasses}>{t("contact.form.jobTitle")}</label>
                              <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder={t("contact.form.jobTitle.placeholder")} className={inputClasses} />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className={labelClasses}>{t("contact.form.phone")}</label>
                              <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder={t("contact.form.phone.placeholder")} className={inputClasses} />
                            </div>
                            <div>
                              <label className={labelClasses}>{t("contact.form.sector")}</label>
                              <select name="setor" value={formData.setor} onChange={handleChange} className={selectClasses}>
                                <option value="">{t("contact.form.sector.select")}</option>
                                <option value="Saúde">{t("contact.form.sector.health")}</option>
                                <option value="Financeiro">{t("contact.form.sector.finance")}</option>
                                <option value="Previdência">{t("contact.form.sector.pension")}</option>
                                <option value="Seguros">{t("contact.form.sector.insurance")}</option>
                                <option value="Indústria">{t("contact.form.sector.industry")}</option>
                                <option value="Serviços">{t("contact.form.sector.services")}</option>
                                <option value="Governo">{t("contact.form.sector.government")}</option>
                                <option value="Outro">{t("contact.form.sector.other")}</option>
                              </select>
                            </div>
                          </div>

                          <div className="pt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              disabled={!canProceedStep1}
                              className="group inline-flex items-center gap-2 bg-navy text-white px-7 py-3 text-sm font-medium tracking-wide hover:bg-navy-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {t("contact.form.next")}
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Sobre o projeto */}
                      {step === 2 && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <Briefcase size={18} className="text-orange" />
                            <h3 className="text-lg font-serif font-normal text-navy">{t("contact.step2.title")}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className={labelClasses}>{t("contact.form.serviceType")}</label>
                              <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} className={selectClasses}>
                                <option value="">{t("contact.form.serviceType.select")}</option>
                                <option value="Saúde Suplementar">{t("service.health.title")}</option>
                                <option value="Previdência Complementar">{t("service.pension.title")}</option>
                                <option value="Benefícios Pós-Emprego (CPC 33)">{t("service.benefits.title")}</option>
                                <option value="Auditoria Atuarial">{t("service.audit.title")}</option>
                                <option value="Due Diligence Atuarial">{t("service.duediligence.title")}</option>
                                <option value="HR Consulting">{t("service.hr.title")}</option>
                                <option value="Perícia Atuarial">{t("contact.form.serviceType.pericia")}</option>
                                <option value="Modelagem Estocástica">{t("contact.form.serviceType.modelagem")}</option>
                                <option value="Gestão de Riscos">{t("contact.form.serviceType.riscos")}</option>
                                <option value="Outro">{t("contact.form.other")}</option>
                              </select>
                            </div>
                            <div>
                              <label className={labelClasses}>{t("contact.form.subject")}</label>
                              <input type="text" name="assunto" value={formData.assunto} onChange={handleChange} placeholder={t("contact.form.subject.placeholder")} className={inputClasses} />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className={labelClasses}>{t("contact.form.urgency")}</label>
                              <div className="flex gap-3">
                                {(["low", "medium", "high"] as const).map((level) => (
                                  <button
                                    key={level}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, urgencia: level })}
                                    className={`flex-1 py-3 px-3 text-xs font-medium border rounded-sm transition-all duration-300 ${
                                      formData.urgencia === level
                                        ? level === "high"
                                          ? "bg-red-50 border-red-300 text-red-700"
                                          : level === "medium"
                                          ? "bg-orange/10 border-orange/40 text-orange"
                                          : "bg-green-50 border-green-300 text-green-700"
                                        : "bg-white border-navy/10 text-navy/50 hover:border-navy/25"
                                    }`}
                                  >
                                    {t(`contact.form.urgency.${level}`)}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className={labelClasses}>{t("contact.form.preferredContact")}</label>
                              <div className="flex gap-3">
                                {(["email", "phone", "whatsapp"] as const).map((method) => (
                                  <button
                                    key={method}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, contatoPreferido: method })}
                                    className={`flex-1 py-3 px-3 text-xs font-medium border rounded-sm transition-all duration-300 ${
                                      formData.contatoPreferido === method
                                        ? "bg-orange/10 border-orange/40 text-orange"
                                        : "bg-white border-navy/10 text-navy/50 hover:border-navy/25"
                                    }`}
                                  >
                                    {t(`contact.form.preferredContact.${method}`)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className={labelClasses}>{t("contact.form.howFound")}</label>
                            <select name="comoConheceu" value={formData.comoConheceu} onChange={handleChange} className={selectClasses}>
                              <option value="">{t("contact.form.howFound.select")}</option>
                              <option value="Google">{t("contact.form.howFound.google")}</option>
                              <option value="LinkedIn">{t("contact.form.howFound.linkedin")}</option>
                              <option value="Indicação">{t("contact.form.howFound.referral")}</option>
                              <option value="Evento">{t("contact.form.howFound.event")}</option>
                              <option value="Publicação">{t("contact.form.howFound.publication")}</option>
                              <option value="Outro">{t("contact.form.howFound.other")}</option>
                            </select>
                          </div>

                          <div className="pt-4 flex justify-between">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-300"
                            >
                              ← {t("contact.form.back")}
                            </button>
                            <button
                              type="button"
                              onClick={() => setStep(3)}
                              disabled={!canProceedStep2}
                              className="group inline-flex items-center gap-2 bg-navy text-white px-7 py-3 text-sm font-medium tracking-wide hover:bg-navy-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {t("contact.form.next")}
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Mensagem */}
                      {step === 3 && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <Building2 size={18} className="text-orange" />
                            <h3 className="text-lg font-serif font-normal text-navy">{t("contact.step3.title")}</h3>
                          </div>

                          {/* Summary of previous steps */}
                          <div className="bg-navy/[0.02] border border-navy/5 rounded-sm p-5 mb-4">
                            <p className="text-[10px] font-semibold text-navy/40 uppercase tracking-[0.2em] mb-3">{t("contact.form.summary")}</p>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                              <span className="text-navy/40">{t("contact.form.name")}:</span>
                              <span className="text-navy font-medium">{formData.nome}</span>
                              <span className="text-navy/40">{t("contact.form.company")}:</span>
                              <span className="text-navy font-medium">{formData.empresa}</span>
                              {formData.tipoServico && (
                                <>
                                  <span className="text-navy/40">{t("contact.form.serviceType")}:</span>
                                  <span className="text-navy font-medium">{formData.tipoServico}</span>
                                </>
                              )}
                              {formData.assunto && (
                                <>
                                  <span className="text-navy/40">{t("contact.form.subject")}:</span>
                                  <span className="text-navy font-medium">{formData.assunto}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className={labelClasses}>{t("contact.form.message")} *</label>
                            <textarea
                              name="mensagem"
                              value={formData.mensagem}
                              onChange={handleChange}
                              required
                              rows={6}
                              placeholder={t("contact.form.message.placeholder")}
                              className={`${inputClasses} resize-none`}
                            />
                            <p className="text-[10px] text-navy/30 mt-2 font-light">{t("contact.form.message.hint")}</p>
                          </div>

                          <div className="pt-4 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors duration-300"
                            >
                              ← {t("contact.form.back")}
                            </button>
                            <button
                              type="submit"
                              disabled={submitMutation.isPending || !formData.mensagem}
                              className="group inline-flex items-center gap-3 bg-orange text-white px-10 py-4 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {submitMutation.isPending ? (
                                <>
                                  <Loader2 size={15} className="animate-spin" />
                                  {t("contact.form.sending")}
                                </>
                              ) : (
                                <>
                                  {t("contact.form.submit")}
                                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </FadeIn>

              {/* Contact info sidebar */}
              <FadeIn delay={0.2} className="lg:col-span-4">
                <div className="bg-navy p-8 md:p-10 sticky top-28">
                  <h3 className="text-lg font-serif font-normal text-white tracking-tight mb-8">
                    {t("contact.info.title")}
                  </h3>
                  <div className="space-y-7">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex gap-4 group">
                        <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange/10 transition-colors duration-300">
                          <info.icon size={16} className="text-orange" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-1">{info.label}</p>
                          <p className="text-sm text-white font-medium">{info.value}</p>
                          <p className="text-xs text-white/35 mt-0.5 font-light">{info.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Response time badge */}
                  <div className="mt-8 p-4 bg-white/5 border border-white/8 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">{t("contact.response.badge")}</span>
                    </div>
                    <p className="text-xs text-white/70 font-light leading-relaxed">
                      {t("contact.response.time")}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/8">
                    <p className="text-[11px] text-white/25 leading-relaxed font-light">
                      {t("contact.lgpd")}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
