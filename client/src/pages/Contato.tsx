/*
 * PENTAGRAM CRAFT: Contato — Formulário Detalhado (i18n)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import SplitText from "@/components/SplitText";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, Loader2, Building2, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contato() {
  const { t } = useLanguage();

  const offices = [
    {
      label: t("contact.info.matrix.label"),
      address: t("contact.info.matrix.address"),
      address2: t("contact.info.matrix.address2"),
      city: t("contact.info.matrix.city"),
      phone: t("contact.info.matrix.phone"),
    },
    {
      label: t("contact.info.branch.label"),
      address: t("contact.info.branch.address"),
      address2: t("contact.info.branch.address2"),
      city: t("contact.info.branch.city"),
      phone: t("contact.info.branch.phone"),
    },
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

  const inputClasses = "w-full px-4 py-3.5 bg-white border border-navy/10 text-navy text-sm font-light focus:border-navy focus:ring-1 focus:ring-navy/20 outline-none transition-all duration-300 placeholder:text-steel-light/50 rounded-sm";
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
              <p className="text-steel text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                {t("contact.tag")}
              </p>
            </FadeIn>
            <SplitText
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-serif text-navy tracking-tight leading-[1.05] max-w-4xl"
              delay={0.2}
              stagger={0.02}
              yOffset={22}
            >
              {`${t("contact.title.1")}\n${t("contact.title.2")}`}
            </SplitText>
            <FadeIn delay={0.25}>
              <p className="text-steel mt-6 max-w-2xl leading-relaxed font-light text-base">
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
                    <h3 className="text-2xl font-serif text-navy mb-3">
                      {t("contact.success.title")}
                    </h3>
                    <p className="text-steel font-light max-w-md">
                      {t("contact.success.desc")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-navy/5 rounded-sm">
                    {/* Step indicator — premium progress bar */}
                    <div className="px-8 md:px-10 pt-8 pb-6 border-b border-navy/5">
                      <div className="flex items-center justify-between mb-4">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className="flex flex-col items-center flex-1">
                            <button
                              type="button"
                              onClick={() => s < step ? setStep(s) : undefined}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                                s === step
                                  ? "bg-navy text-white shadow-md shadow-navy/20"
                                  : s < step
                                  ? "bg-navy/10 text-navy cursor-pointer hover:bg-navy/15"
                                  : "bg-navy/5 text-navy/30"
                              }`}
                            >
                              {s < step ? (
                                <CheckCircle2 size={18} strokeWidth={2} />
                              ) : s}
                            </button>
                            <span className={`text-[10px] mt-2 font-medium uppercase tracking-wider transition-colors duration-300 ${
                              s === step ? "text-navy" : s < step ? "text-navy/50" : "text-navy/25"
                            }`}>
                              {s === 1 && t("contact.step1.label")}
                              {s === 2 && t("contact.step2.label")}
                              {s === 3 && t("contact.step3.label")}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-0.5 bg-navy/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-navy transition-all duration-500 ease-out"
                          style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="px-8 md:px-10 py-8">
                      {/* Step 1: Dados pessoais */}
                      {step === 1 && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <User size={18} className="text-navy" />
                            <h3 className="text-lg font-serif text-navy">{t("contact.step1.title")}</h3>
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
                            <Briefcase size={18} className="text-navy" />
                            <h3 className="text-lg font-serif text-navy">{t("contact.step2.title")}</h3>
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
                                          ? "bg-navy/10 border-navy/30 text-navy"
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
                                        ? "bg-navy/10 border-navy/30 text-navy"
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
                            <Building2 size={18} className="text-navy" />
                            <h3 className="text-lg font-serif text-navy">{t("contact.step3.title")}</h3>
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
              <FadeIn delay={0.2} className="lg:col-span-4 min-w-0">
                <div className="bg-navy p-6 md:p-8 sticky top-28 overflow-hidden">
                  <h3 className="text-lg font-serif text-white tracking-tight mb-8">
                    {t("contact.info.title")}
                  </h3>
                  <div className="space-y-7">
                    {offices.map((office) => (
                      <div key={office.label} className="group">
                        <div className="flex gap-3">
                          <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                            <MapPin size={16} className="text-orange" strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-1">{office.label}</p>
                            <p className="text-sm text-white font-medium break-words">{office.address}</p>
                            {office.address2 && <p className="text-sm text-white font-medium break-words">{office.address2}</p>}
                            <p className="text-xs text-white/70 mt-0.5 font-light">{office.city}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-3 ml-12">
                          <Phone size={13} className="text-white/60 shrink-0 mt-0.5" strokeWidth={1.5} />
                          <p className="text-sm text-white/80 break-words">{office.phone}</p>
                        </div>
                      </div>
                    ))}

                    {/* Email */}
                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                          <Mail size={16} className="text-orange" strokeWidth={1.5} />
                        </div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">{t("contact.info.email.label")}</p>
                      </div>
                      <a href={`mailto:${t("contact.info.email.value")}`} className="block text-sm text-white font-medium hover:text-orange transition-colors duration-300 ml-12">
                        {t("contact.info.email.value")}
                      </a>
                      <p className="text-xs text-white/70 mt-1 font-light ml-12">{t("contact.info.email.detail")}</p>
                    </div>

                    {/* Horário */}
                    <div className="flex gap-3 group">
                      <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                        <Clock size={16} className="text-orange" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-1">{t("contact.hours.title")}</p>
                        <p className="text-sm text-white font-medium">{t("contact.hours.weekdays")}</p>
                        <p className="text-xs text-white/70 mt-0.5 font-light">{t("contact.hours.timezone")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Response time badge */}
                  <div className="mt-8 p-4 bg-white/5 border border-white/8 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">{t("contact.response.badge")}</span>
                    </div>
                    <p className="text-xs text-white/80 font-light leading-relaxed">
                      {t("contact.response.time")}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/8">
                    <p className="text-[11px] text-white/50 leading-relaxed font-light">
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
