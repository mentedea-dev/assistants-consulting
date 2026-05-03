/*
 * Design: Swiss Precision Meets Data Narrative
 * Contato: Formulário limpo + informações de contato
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-linen">
      <Header />

      {/* Page header */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="container">
          <FadeIn>
            <p className="text-orange text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Contato
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-navy tracking-tight leading-tight max-w-3xl">
              Vamos conversar sobre
              <br />
              <span className="text-steel">o seu desafio atuarial</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Contact content */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Form */}
            <FadeIn className="md:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors"
                      placeholder="+55 (11) 0000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                    Assunto
                  </label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors"
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
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-navy/10 text-navy text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-colors resize-none"
                    placeholder="Descreva brevemente seu desafio ou necessidade..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-navy text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-navy-light transition-colors"
                >
                  Enviar mensagem
                </button>
              </form>
            </FadeIn>

            {/* Contact info */}
            <FadeIn delay={0.2} className="md:col-span-5">
              <div className="bg-navy p-8 md:p-10">
                <h3 className="text-lg font-semibold text-white tracking-tight mb-8">
                  Informações de contato
                </h3>
                <div className="space-y-8">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center shrink-0">
                        <info.icon size={18} className="text-orange" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
                          {info.label}
                        </p>
                        <p className="text-sm text-white font-medium">{info.value}</p>
                        <p className="text-xs text-white/40 mt-0.5">{info.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs text-white/30 leading-relaxed">
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
  );
}
