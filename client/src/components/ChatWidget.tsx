/*
 * PENTAGRAM CRAFT: Chat Widget (i18n)
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
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange hover:bg-orange-light rounded-full flex items-center justify-center shadow-lg shadow-orange/20 transition-colors duration-300"
            aria-label={t("chat.open")}
          >
            <MessageCircle size={22} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white border border-navy/10 shadow-2xl shadow-navy/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-orange" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{t("chat.title")}</h3>
                  <p className="text-[10px] text-white/40">Assistants Consulting</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label={t("chat.close")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot size={22} className="text-orange" />
                  </div>
                  <p className="text-sm font-medium text-navy mb-2">{t("chat.greeting")}</p>
                  <p className="text-xs text-steel-light font-light leading-relaxed max-w-[260px] mx-auto">
                    {t("chat.intro")}
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInput(suggestion);
                          setMessages([{ role: "user", content: suggestion }]);
                          sendMutation.mutate({ sessionId, message: suggestion });
                        }}
                        className="text-xs text-left px-3 py-2 border border-navy/8 hover:border-orange/20 hover:bg-orange/3 transition-all duration-200 text-navy/70"
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 bg-orange/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-orange" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy text-white rounded-tl-lg rounded-tr-sm rounded-b-lg"
                        : "bg-gray-50 text-navy border border-navy/5 rounded-tr-lg rounded-tl-sm rounded-b-lg"
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
                    <div className="w-6 h-6 bg-navy/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <User size={12} className="text-navy" />
                    </div>
                  )}
                </motion.div>
              ))}

              {sendMutation.isPending && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-6 h-6 bg-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-orange" />
                  </div>
                  <div className="bg-gray-50 border border-navy/5 px-4 py-3 rounded-tr-lg rounded-tl-sm rounded-b-lg">
                    <div className="flex gap-1.5">
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-orange" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-orange" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-orange" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-navy/8 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder")}
                  rows={1}
                  className="flex-1 resize-none px-3 py-2.5 text-sm bg-gray-50 border border-navy/8 focus:border-orange/40 rounded-md outline-none transition-colors duration-200 max-h-24"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sendMutation.isPending}
                  className="w-9 h-9 flex items-center justify-center bg-orange text-white rounded-md hover:bg-orange-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label={t("chat.send")}
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[9px] text-steel-light/60 mt-2 text-center">
                {t("chat.disclaimer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
