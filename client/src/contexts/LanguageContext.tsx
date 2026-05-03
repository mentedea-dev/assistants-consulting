import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "pt" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

// Lazy load translations
let translations: Record<Locale, Record<string, string>> = { pt: {}, en: {} };

export function registerTranslations(locale: Locale, data: Record<string, string>) {
  translations[locale] = { ...translations[locale], ...data };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("assistants-lang");
    return (stored === "en" || stored === "pt") ? stored : "pt";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("assistants-lang", newLocale);
    document.documentElement.lang = newLocale === "pt" ? "pt-BR" : "en";
  }, []);

  const t = useCallback((key: string): string => {
    return translations[locale][key] || translations["pt"][key] || key;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
