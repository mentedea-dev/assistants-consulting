/*
 * Chat Widget — Assistants Consulting
 * Posicionamento: inferior esquerdo (não compete com scroll/CTA à direita)
 * Visual: navy-based, discreto, integrado à identidade da marca
 * Orange usado APENAS no inflection dot do logo
 */
import { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Loader2, User, Bot } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { Streamdown } from "streamdown";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sessionId = useMemo(() => {
    const stored = sessionStorage.getItem("chat-session-id");
    if (stored) return stored;
    const id = `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("chat-session-id", id);
    return id;
  }, []);

  const sendMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.error") },
      ]);
    },
  });

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || sendMutation.isPending) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    sendMutation.mutate({ sessionId, message: trimmed });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const suggestions = [t("chat.suggestion1"), t("chat.suggestion2"), t("chat.suggestion3")];

  return (
    <>
      {/* Chat launcher — bottom-left, navy, understated */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-navy hover:bg-navy-light rounded-full flex items-center justify-center shadow-xl shadow-navy/20 hover:shadow-2xl hover:shadow-navy/30 transition-all duration-300 group ring-2 ring-navy/10 hover:ring-navy/20"
            aria-label={t("chat.open")}
          >
            <MessageCircle size={22} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel — bottom-left, restrained design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-white border border-navy/8 shadow-2xl shadow-navy/8 flex flex-col overflow-hidden rounded-sm"
          >
            {/* Header — navy, minimal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-navy border-b border-navy-light/20">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot size={14} className="text-white/80" />
                </div>
                <div>
                  <h3 className="text-[13px] font-medium text-white tracking-tight">{t("chat.title")}</h3>
                  <p className="text-[10px] text-white/35 tracking-wide">Assistants Consulting</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
                aria-label={t("chat.close")}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bot size={18} className="text-navy/60" />
                  </div>
                  <p className="text-sm font-medium text-navy mb-1.5">{t("chat.greeting")}</p>
                  <p className="text-xs text-steel-light font-light leading-relaxed max-w-[260px] mx-auto">
                    {t("chat.intro")}
                  </p>
                  <div className="mt-4 flex flex-col gap-1.5">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInput(suggestion);
                          setMessages([{ role: "user", content: suggestion }]);
                          sendMutation.mutate({ sessionId, message: suggestion });
                        }}
                        className="text-xs text-left px-3 py-2 border border-navy/6 hover:border-navy/15 hover:bg-navy/2 transition-all duration-200 text-navy/70 rounded-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-5 h-5 bg-navy/6 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Bot size={10} className="text-navy/60" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy text-white/95 rounded-tl-md rounded-tr-sm rounded-b-md"
                        : "bg-linen text-navy border border-navy/5 rounded-tr-md rounded-tl-sm rounded-b-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-navy max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0.5">
                        <Streamdown>{msg.content}</Streamdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-5 h-5 bg-navy/8 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <User size={10} className="text-navy/60" />
                    </div>
                  )}
                </motion.div>
              ))}

              {sendMutation.isPending && (
                <div className="flex gap-2 justify-start">
                  <div className="w-5 h-5 bg-navy/6 rounded-full flex items-center justify-center shrink-0">
                    <Bot size={10} className="text-navy/60" />
                  </div>
                  <div className="bg-linen border border-navy/5 px-3.5 py-3 rounded-tr-md rounded-tl-sm rounded-b-md">
                    <div className="flex gap-1">
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-navy/30" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-navy/30" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-navy/30" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input — clean, minimal */}
            <div className="px-4 py-3 border-t border-navy/6 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder")}
                  rows={1}
                  className="flex-1 resize-none px-3 py-2.5 text-[13px] bg-linen border border-navy/6 focus:border-navy/20 rounded-sm outline-none transition-colors duration-200 max-h-24"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sendMutation.isPending}
                  className="w-8 h-8 flex items-center justify-center bg-navy text-white rounded-sm hover:bg-navy-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  aria-label={t("chat.send")}
                >
                  <Send size={13} />
                </button>
              </div>
              <p className="text-[9px] text-steel-light/50 mt-1.5 text-center tracking-wide">
                {t("chat.disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
