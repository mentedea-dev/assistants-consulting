/*
 * PENTAGRAM CRAFT: Contato
 * - Refined form with animated focus states
 * - Serif headlines, generous spacing
 * - Contact info with subtle animations
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "São Paulo, SP — Brasil",
    detail: "Av. Paulista, 1.000 — Bela Vista",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 (11) 3000-0000",
    detail: "Segunda a sexta, 9h às 18h",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@assistants.com.br",
    detail: "Respondemos em até 24 horas úteis",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg — Sex, 9h às 18h",
    detail: "Horário de Brasília (GMT-3)",
  },
];

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso. Entraremos em contato em breve.");
    setFormData({ nome: "", empresa: "", email: "", telefone: "", assunto: "", mensagem: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-0 py-3.5 bg-transparent border-0 border-b border-navy/12 text-navy text-sm font-light focus:border-orange focus:ring-0 outline-none transition-all duration-300 placeholder:text-steel-light/50";

  return (
    <PageTransition>
      <div className="min-h-screen bg-linen">
        <Header />

        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="container">
            <FadeIn>
              <p className="text-orange text-xs font-sans font-semibold uppercase tracking-[0.25em] mb-6">
                Contato
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-navy tracking-tight leading-[1.05] max-w-4xl">
                Vamos conversar sobre
                <br />
                <span className="text-steel-light">o seu desafio atuarial</span>
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Contact content */}
        <section className="pb-28 md:pb-36">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
              {/* Form */}
              <FadeIn className="md:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="+55 (11) 0000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                      Assunto
                    </label>
                    <select
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      required
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="">Selecione o assunto</option>
                      <option value="saude">Saúde Suplementar</option>
                      <option value="previdencia">Previdência Complementar</option>
                      <option value="beneficios">Benefícios Pós-Emprego (CPC 33)</option>
                      <option value="auditoria">Auditoria Atuarial</option>
                      <option value="due-diligence">Due Diligence</option>
                      <option value="hr">HR Consulting</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-navy/60 uppercase tracking-[0.2em] mb-1">
                      Mensagem
                    </label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Descreva brevemente seu desafio ou necessidade..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 bg-orange text-white px-10 py-4.5 text-sm font-medium tracking-wide hover:bg-orange-light transition-all duration-300"
                    >
                      Enviar mensagem
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              </FadeIn>

              {/* Contact info */}
              <FadeIn delay={0.2} className="md:col-span-5">
                <div className="bg-navy p-10 md:p-12 sticky top-28">
                  <h3 className="text-lg font-serif font-medium text-white tracking-tight mb-10">
                    Informações de contato
                  </h3>
                  <div className="space-y-9">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex gap-5 group">
                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-orange/10 transition-colors duration-300">
                          <info.icon size={17} className="text-orange" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-1.5">
                            {info.label}
                          </p>
                          <p className="text-sm text-white font-medium">{info.value}</p>
                          <p className="text-xs text-white/35 mt-1 font-light">{info.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/8">
                    <p className="text-[11px] text-white/25 leading-relaxed font-light">
                      Todas as informações compartilhadas são tratadas com sigilo
                      absoluto, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
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
